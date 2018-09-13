const semver = require('semver')
const { default: axios } = require('axios')
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
function getLatest (releases) {
  return releases[0]
}

function getStable (releases) {
  return releases.filter(r =>
    !r.prerelease &&
    !r.draft &&
    semver.prerelease(r.tag_name) === null
  )[0]
}

fetchReleases()
  .then(r => getLatest(releases))
