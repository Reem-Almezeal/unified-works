
import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const previousPathname = useRef(pathname)

  useLayoutEffect(() => {
    const pathnameChanged = previousPathname.current !== pathname
    previousPathname.current = pathname

    // Leave same-page anchors and native history restoration alone.
    if (!pathnameChanged || navigationType === 'POP') return

    if (hash) {
      let id = hash.slice(1)
      try {
        id = decodeURIComponent(id)
      } catch {
        // A malformed URL fragment can still match a literal element ID.
      }
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'instant' })
        return
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname, hash, navigationType])

  return null
}
