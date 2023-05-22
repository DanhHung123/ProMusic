import React from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const dataImgSlide = [
  'https://photo-zmp3.zmdcdn.me/banner/5/7/4/0/57408963b27277d478fd073a832f932c.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/3/d/1/4/3d1484d5295c8a20f07715ab9ca4f714.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/c/0/c/e/c0cece3b884aa9277a9e0f4b6b7becda.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/3/6/7/d/367d5143a557356c74049b57e2b80c8c.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/b/a/b/3/bab330212b5b0a83eb9405664a76605c.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/5/2/3/3/52334c3b7a639026b978e6e1fa66fb6e.jpg'
]

export default function Slider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3, spacing: 10 },
        },
      },
      slides: { perView: 1 },
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2500)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )
  return (
    <section className='w-full overflow-hidden'>
      <div ref={sliderRef} className="keen-slider py-6">
        {
          dataImgSlide.map((srcImg: string, index: number) => {
            return (
              <div className="keen-slider__slide" key={index}>
                <img className='w-full h-full object-cover rounded-2xl' src={srcImg} alt="slider" />
              </div>
            )
          })
        }
      </div>
    </section>
  )
}
