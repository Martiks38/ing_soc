const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9
}

const observer = new IntersectionObserver((entries) => {
  const main = document.querySelector('main')

  entries.forEach((entry) => {
    const { isIntersecting, target } = entry
    const $video = target.querySelector('video')
    const mustStop = target.getAttribute('data-section') === 'stop'

    if (isIntersecting && mustStop) {
      const prelist = target.querySelectorAll('.containerComic__item')

      const $items = Array.from(
        prelist.length !== 0 ? prelist : target.querySelectorAll('.item')
      ).slice(1)

      main.style.overflow = 'hidden'
      window.addEventListener('keydown', bloquearScroll, { passive: false })

      setTimeout(() => {
        $items[0].setAttribute('data-show', 'true')

        setTimeout(() => {
          $items[1].setAttribute('data-show', 'true')

          if ($video) {
            $video.play()
          }

          setTimeout(() => {
            main.style.overflow = 'auto'
            target.setAttribute('data-section', 'continue')

            window.removeEventListener('keydown', bloquearScroll)
            $nextPage = target.querySelector('.nextPage')
            $nextPage.classList.toggle('visible')
          }, 1800)
        }, 2500)
      }, 1500)
    } else if ($video && !$video.paused && !$video.ended) {
      $video.pause()
    }
  })
}, observerOptions)

function bloquearScroll(e) {
  const keys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End']
  if (keys.includes(e.code) || keys.includes(e.key)) {
    e.preventDefault()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const $sections = document.querySelectorAll('[data-section="stop"]')
  $sections.forEach((section) => observer.observe(section))
})
