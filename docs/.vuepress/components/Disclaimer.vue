<template>
  <div>
    <div class="prerelease-warn" ref="warn">※目前處於早期開發階段, 請自行斟酌使用。</div>
    <div class="tukiyomi-dimmer hidden" ref="dimmer">
      <div class="tukiyomi-disclaimer" ref="disclaimer">
        <h3>免責聲明</h3>
        <p>各位提督好！這裡有些<span class="red">重要的訊息</span>必須讓提督們知道。</p>
        <p>
          <span>夜月海瀏覽器(以下簡稱本瀏覽器)定位上為興趣使然的專案，目前仍處於早期開發階段，功能尚未穩定，故無法進行任何程度的保證，</span>
          <span class="red">使用者須自行承擔可能的風險。</span>
        </p>
        <p>
          <span>本瀏覽器如同其他 KanColle 瀏覽器一樣，遵守一個共同原則，</span>
          <span>就是我們絕不主動向 KanColle 伺服器發送任何請求，</span>
          <span>而是在遊戲進行的同時，透過<span class="blue">本地代理的技術</span>，被動「觀察」使用者與 KanColle 之間的通訊。</span>
          <span>關於本地代理的技術，本瀏覽器與知名的 KanColle 瀏覽器── <a href="https://github.com/poooi/poi">Poi</a> 採用了相同的實現。</span>
        </p>
        <p>
          <span>此外，本瀏覽器會在網頁中 (DOM) 植入我們的腳本，用以實現諸如</span>
          <span><span class="blue">遊戲影音截錄</span>和<span class="blue">修改 DMM 區域餅乾</span>‧‧‧等等。</span>
        </p>
        <p>以上，祝各位武運蒼龍！</p>
        <div class="button-group">
          <a class="button accept" @click="openExternalLink">我同意</a>
          <a class="button cancel" @click="closeDisclaimer">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openExternalLink () {
      this.closeDisclaimer()
      window.open(this.externalLink, '_blank')
    },
    closeDisclaimer () {
      this.$refs.dimmer.classList.add('animated', 'fadeOut', 'faster')
      this.$refs.disclaimer.classList.add('animated', 'fadeOutUp', 'faster')
      this.$refs.dimmer.addEventListener(this.animationEnd, () => {
        this.$refs.dimmer.classList.add('hidden')
      }, {
        once: true
      })
    },
    showDisclaimer () {
      this.$refs.dimmer.classList.remove('hidden')
      this.$refs.dimmer.classList.add('animated', 'fadeIn', 'faster')
      this.$refs.disclaimer.classList.add('animated', 'fadeInDown', 'faster')
    }
  },
  created () {
    if (!this.animationEnd) {
      this.animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        }
  
        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t]
          }
        }
      })(document.createElement('div'))
    }
  },
  mounted () {
    /**
     * @type {HTMLAnchorElement}
     */
    const actionBtn = document.querySelector('.action a')
    if (!actionBtn.querySelector('.prerelease-warn')) {
      actionBtn.appendChild(this.$refs.warn)
      this.externalLink = actionBtn.href
      actionBtn.href = "javascript:void(0)"
      actionBtn.addEventListener('click', () => {
        this.showDisclaimer()
      })

      this.$refs.disclaimer.addEventListener(this.animationEnd, () => {
        this.$refs.disclaimer.classList.remove('animated', 'fadeInDown', 'fadeOutUp', 'faster')
      })

      this.$refs.dimmer.addEventListener(this.animationEnd, () => {
        this.$refs.dimmer.classList.remove('animated', 'fadeIn', 'fadeOut', 'faster')
      })
    }
  }
}
</script>

<style scoped>
.tukiyomi-dimmer.hidden {
  opacity: 0;
  z-index: -50;
}
.prerelease-warn {
  font-size: small;
  color: yellow;
}
.tukiyomi-dimmer {
  position: fixed;
  background-color: #00000088;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  left: 0;
  top: 0;
}
.tukiyomi-disclaimer {
  position: relative;
  top: calc((100vh - 560px)/2);
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 4px;
  width: 620px;
  height: 480px;
  padding: 40px 120px;
}
.tukiyomi-disclaimer p {
  text-indent: 2em;
}
span.red {
  color: red;
}
span.blue {
  color: blue;
}
.button-group {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 40px;
  left: 0;
}
.button {
  cursor: pointer;
  display: inline-block;
  font-size: 1em;
  padding: .8rem 1.6rem;
  border-radius: 4px;
  transition: background-color .1s ease;
  box-sizing: border-box;
  margin: 0 5px;
}
.button.accept {
  color: #fff;
  background-color: #3eaf7c;
  border-bottom: 1px solid #389d70;
}
.button.accept:hover {
  background-color: #4abf8a;
}
.button.cancel {
  color: #2c3e50;
  background-color: white;
  border: 1px solid #aaa;
}
.button.cancel:hover {
  background-color: #eee;
}
</style>
