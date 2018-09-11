<template>
  <div></div>
</template>

<script>
export default {
  name: 'NeverForget',
  mounted () {
    let memo = document.getElementById('memo')
    if (memo) {
      memo.remove()
    }

    memo = document.createElement('a')
    memo.id = 'memo'
    memo.target = '_blank'
    memo.href = 'https://gist.github.com/momocow/595b1e5805abb2b961820a29ea6a88b1#file-md'
    memo.innerHTML = `
    <span class="hidden">忘れない。</span>
    <span class="hidden">忘れない。</span>
    <span class="hidden">ずっと。</span>`

    const animationEnd = (function(el) {
      const animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (let t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    function fadeInMsg (index) {
      index = index || 0
      const child = memo.children[index]
      child.classList.remove('hidden')
      child.classList.add('animated', 'fadeIn', 'memo-delay')
      child.addEventListener(animationEnd, function () {
        index++
        if (index < memo.children.length) fadeInMsg(index)
      },{
        once: true
      })
    }

    const timer = setInterval(function appendMemo () {
      try {
        document.querySelector('.hero').appendChild(memo)
        clearInterval(timer)
        setTimeout(fadeInMsg, 600)
      } catch (e) {}
    }, 200)
  }
}
</script>
