import React, { useState } from 'react'

/* Components */
import {
  HorizontalMenu,
  VerticalMenu,
  Logo,
  ToggleScreens,
  ToggleSubMenus,
  ExplorerMenu,
} from '..'

export const Menu = () => {
  const [open, setOpen] = useState([true, 'sidebar']) // screen toggle state
  const [openMenu, setOpenMenu] = useState([false, 'explorer']) // sidebar's submenus state

  return (
    <>
      <HorizontalMenu>
        <Logo />
        <ToggleScreens handle={{ open, setOpen }} />
      </HorizontalMenu>
      <VerticalMenu handle={{ open }}>
        <ToggleSubMenus handle={{ openMenu, setOpenMenu }} />
      </VerticalMenu>
      <ExplorerMenu handle={{ openMenu }} vMenuIsHidden={open} />
    </>
  )
}
