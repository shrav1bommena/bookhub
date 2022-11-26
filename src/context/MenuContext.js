import React from 'react'

const MenuContext = React.createContext({
  showMenu: false,
  handleShowMenu: () => {},
})

export default MenuContext
