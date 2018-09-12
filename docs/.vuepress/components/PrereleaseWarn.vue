<template>
  <div class="prerelease-warn" ref="warn">※目前處於早期開發階段, 請自行斟酌使用。</div>
</template>

<script>
export default {
  mounted () {
    document.querySelector('.action a').appendChild(this.$refs.warn)
  }
}
</script>

<style scoped>
.prerelease-warn {
  font-size: small;
  color: yellow;
}
</style>
