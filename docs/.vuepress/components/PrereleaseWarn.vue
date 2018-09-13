<template>
  <div class="prerelease-warn" ref="warn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PrereleaseWarn',
  mounted () {
    /**
     * @type {HTMLAnchorElement}
     */
    const actionBtn = document.querySelector('.action a')
    const prereleaseWarn = actionBtn.querySelector('.prerelease-warn')
    if (prereleaseWarn) {
      prereleaseWarn.remove()
    }
    actionBtn.appendChild(this.$refs.warn)
  }
}
</script>

<style scoped>
.prerelease-warn {
  font-size: small;
  color: yellow;
  width: 280px;
}
</style>
