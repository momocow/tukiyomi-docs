<template>
  <div class="prerelease-warn" ref="warn">※目前處於早期開發階段, 請斟酌使用。</div>
</template>

<script>
export default {
  mounted () {
    /**
     * @type {HTMLAnchorElement}
     */
    const actionBtn = document.querySelector('.action a')
    if (!actionBtn.querySelector('.prerelease-warn')) {
      actionBtn.appendChild(this.$refs.warn)
    }
  }
}
</script>

<style scoped>
.prerelease-warn {
  font-size: small;
  color: yellow;
}
</style>
