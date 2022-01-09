import React, { createContext, useContext } from "react"
import { useToggle } from "../hooks"

export const AppContext = createContext(null)

export const PageWrapper = ({ children }) => {
  const { isToggled, toggle, closeToggle } = useToggle()

  return (
    <AppContext.Provider
      value={{
        isMenuOpen: isToggled,
        toggleMenu: toggle,
        closeMenu: closeToggle,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppState = () => useContext(AppContext)
