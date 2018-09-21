<style>
span.red {
  color: #f44141;
}
span.blue {
  color: #4286f4;
}
</style>

### {% disclaimer %}
{% disclaimer_msg %}

### {% stable_release %} <Badge text="{% recommended %}" type="tip" />
{%
  !stable ? '> {% unavailable %}'
    : `#### {% stable.tag_name %}
> {% published_at %}: {% new Date(stable.published_at).toLocaleString() %}

Windows

{% filename %}|{% size %}
---|---
{%
  stable.assets
    .filter(a => a.platform === 'win32')
    .map(a => `[${a.name}](${a.browser_download_url})|${a.size}`)
    .join('\n')
%}

Linux

{% filename %}|{% size %}
---|---
{%
  stable.assets
    .filter(a => a.platform === 'linux')
    .map(a => `[${a.name}](${a.browser_download_url})|${a.size}`)
    .join('\n')
%}`
%}

### {% latest_release %} {% latest && latest.prerelease_type ? '<Badge text="{% {% latest.prerelease_type %} %}" type="warn" />' : '' %}
{%
  !latest ? '> {% unavailable %}'
    : `#### {% latest.tag_name %}
> {% published_at %}: {% new Date(latest.published_at).toLocaleString() %}

Windows

{% filename %}|{% size %}
---|---
{%
  latest.assets
    .filter(a => a.platform === 'win32')
    .map(a => `[${a.name}](${a.browser_download_url})|${a.size}`)
    .join('\n')
%}

Linux

{% filename %}|{% size %}
---|---
{%
  latest.assets
    .filter(a => a.platform === 'linux')
    .map(a => `[${a.name}](${a.browser_download_url})|${a.size}`)
    .join('\n')
%}`
%}

### {% all_releases %}
{%
  !releases || releases.length === 0 ? '> {% unavailable %}'
    : releases.map(r => `#### ${r.tag_name}
> {% published_at %}: ${new Date(r.published_at).toLocaleString()}

Windows

{% filename %}|{% size %}
---|---
${
  r.assets
    .filter(a => a.platform === 'win32')
    .map(a => `[${a.name}](${a.browser_download_url})|${a.size}`)
    .join('\n')
}

Linux

{% filename %}|{% size %}
---|---
${
  r.assets
    .filter(a => a.platform === 'linux')
    .map(a => `[${a.name}](${a.browser_download_url})|${a.size}`)
    .join('\n')
}`)
  .join('\n\n')
%}
