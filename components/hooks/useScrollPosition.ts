import { useState, useEffect } from "react"

const useScrollPosition = () => {
  // Store the state
  const [scrollPos, setScrollPos] = useState(window.pageYOffset ?? 500)

  const [height] = useState(window.screen.height ?? 500)

  // On Scroll
  const onScroll = () => {
    setScrollPos(window.pageYOffset)
  }

  // Add and remove the window listener
  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  })

  return { scrollPos, height }
}

export default useScrollPosition
