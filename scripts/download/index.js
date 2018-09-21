const semver = require('semver')
const { default: axios } = require('axios')
const { parseFile } = require('azuki')
const bytes = require('bytes')
const { readFileSync } = require('fs')
const { parse: parseTOML } = require('@iarna/toml')
const { resolve: resolvePath } = require('path')
const _pick = require('lodash.pick')

const data = {}

const {
  MAX_DISPLAY_RELEASES
} = require('./config')
const args = require('mri')(process.argv.slice(2))

process.on('unhandledRejection', function (err) {
  console.error('Error!')
  console.error(err)
  process.exit(1)
})

/**
 * @return {Promise<Array>}
 */
async function fetchReleases () {
  const releases = await axios.get(`https://api.github.com/repos/${args._[0]}/releases`)
  if (releases.status !== 200) {
    throw new Error(
      `API responses a non-200 code (code=${releases.status}, msg=${releases.statusText})`)
  }

  if (!Array.isArray(releases.data)) {
    throw new TypeError(`Expect the response to be an array. "${typeof releases.data}" is received`)
  }

  return releases.data
}

/**
 * @param {Array} releases
 */
function trimReleases (releases) {
  return releases.map(r => {
    let trimmed = _pick(r,
      'tag_name',
      'draft',
      'prerelease',
      'published_at',
      'assets'
    )
    trimmed.assets = trimmed.assets
      .map(a => {
        const asset = _pick(a,
          'name',
          'size',
          'browser_download_url'
        )
        asset.size = bytes(parseInt(asset.size))
        return asset
      })
      .filter(a => {
        if (a.name.includes('-win.')) {
          a.platform = 'win32'
          return true
        }
        if (a.name.includes('-linux.')) {
          a.platform = 'linux'
          return true
        }
        return false
      })
    return trimmed
  })
}

/**
 * @param {Array} releases
 */
function parseLatest (releases) {
  data.latest = releases[0]

  const prelease = semver.prerelease(data.latest.tag_name)
  data.latest.prerelease_type = prelease ? prelease[0] : ''
  return releases
}

/**
 * @param {Array} releases
 */
function parseStable (releases) {
  data.stable = releases.filter(r => !r.prerelease &&
    !r.draft &&
    semver.prerelease(r.tag_name) === null &&
    semver.gte(r.tag_name, '1.0.0')
  )[0]
  return releases
}

/**
 * All head version according to the major version
 * @param {Array} releases
 */
function parseAllReleases (releases) {
  /**
   * @type {Map<numebr, object>}
   */
  const majorMap = new Map()
  releases.forEach(r => {
    const major = semver.major(r.tag_name)
    const latestMajor = majorMap.get(major)
    if (!latestMajor || semver.gt(r.tag_name, latestMajor.tag_name)) {
      majorMap.set(major, r)
    }
  })
  if (data.latest) {
    majorMap.delete(semver.major(data.latest.tag_name))
  }
  if (data.stable) {
    majorMap.delete(semver.major(data.stable.tag_name))
  }
  data.releases = Array.from(majorMap.values())
  return releases
}

function readTOML (file) {
  return parseTOML(readFileSync(file, 'utf8'))
}

fetchReleases()
  .then(releases => trimReleases(releases))
  .then($releases => parseLatest($releases))
  .then($releases => parseStable($releases))
  .then($releases => parseAllReleases($releases))
  .then(() => readTOML(resolvePath(__dirname, './i18n/i18n.toml')))
  .then(i18n => Object.keys(i18n).map(k => ({ pathname: k, langfile: i18n[k] })))
  .then(i18nArr => {
    i18nArr.forEach(({ pathname, langfile }) => {
      const dict = Object.assign({},
        data, readTOML(resolvePath(__dirname, 'i18n', langfile)))
      parseFile(
        resolvePath(__dirname, 'template.md'),
        resolvePath(__dirname, '../../docs', `.${pathname}`, 'download', 'README.md'),
        dict
      )
    })
  })
