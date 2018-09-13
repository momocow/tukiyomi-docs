<template>
  <a class='tukiyomi-memo' ref='memo' target="_blank" @click="animate">
    <span class="hidden">忘れない。</span>
    <span class="hidden">忘れない。</span>
    <span class="hidden">ずっと。</span>
    <span class="hidden tukiyomi-lyric">
      ―――<a target="_blank" :href="lyric">《<u>月夜海</u>》</a>
    </span>
  </a>
</template>

<style lang="stylus" scoped>
.hidden
  visibility hidden
</style>

<style lang="stylus">
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

.memo-animate
  vendor('animation-delay', 0s)
  vendor('animation-duration', 1s)

.tukiyomi-memo {
  cursor pointer;
}
.tukiyomi-lyric, .tukiyomi-lyric * {
  color: cyan;
}
</style>


<script>
export default {
  name: 'NeverForget',
  data () {
    return {
      lyric: 'https://gist.github.com/momocow/595b1e5805abb2b961820a29ea6a88b1#file-md'
    }
  },
  methods: {
    run (schedule) {
      /**
       * @type {number|function}
       */
      let cur = schedule.shift()
      while (typeof cur === 'function') {
        cur()
        cur = schedule.shift()
      }

      if (typeof cur === 'number') {
        setTimeout(() => {
          this.run(schedule)
        }, cur)
      }
    },

    reset (index) {
      this.$refs.memo.children[index].classList.remove('memo-animate', 'animated', 'fadeIn')
      this.$refs.memo.children[index].classList.add('hidden')
    },

    fadeIn (index) {
      this.$refs.memo.children[index].classList.remove('hidden')
      this.$refs.memo.children[index].classList.add('memo-animate', 'animated', 'fadeIn')
    },

    animate () {
      if (this.lock) return
      this.lock = true

      // reset
      this.reset(3)
      this.reset(2)
      this.reset(1)
      this.reset(0)

      const schedule = [
        600,
        this.fadeIn.bind(this, 0),
        1200,
        this.fadeIn.bind(this, 1),
        1200,
        this.fadeIn.bind(this, 2),
        1200,
        this.fadeIn.bind(this, 3),
        () => {
          this.lock = false
        }
      ]

      this.run(schedule)
    }
  },
  mounted () {
    const hero = document.querySelector('.hero')
    const memo = hero.querySelector('.tukiyomi-memo')
    if (memo) {
      memo.remove()
    }
    hero.appendChild(this.$refs.memo)
    this.animate()
  }
}
</script>
