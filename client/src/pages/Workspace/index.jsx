import React, { useState } from 'react'

/* Style */
import {
  Container,
  WorkspaceContainer,
  CodeContainer,
  SidebarContainer,
} from './style'

/* Components */
import {
  SyntaxEditor,
  PdfViewerContainer,
  HorizontalMenu,
  Logo,
  ToggleScreens,
  VerticalMenu,
  ToggleSubMenus,
  ExplorerMenu,
  // SearchMenu,
} from '../../components/Workspace'

const Workspace = () => {
  const [explorerMenu, setExplorerMenu] = useState(false)
  // const [searchMenu, setSearchMenu] = useState(false)

  const [sections, setSections] = useState({
    verticalMenu: true,
    sidebar: true,
    terminal: true,
    pdfReader: true,
  })

  const { verticalMenu, sidebar, terminal, pdfReader } = sections

  const toggleSection = (section) => {
    setSections({
      ...sections,
      [section]: !sections[section],
    })
  }

  return (
    <Container>
      <HorizontalMenu>
        <Logo />
        <ToggleScreens handle={{ sections, toggleSection }} />
      </HorizontalMenu>

      <WorkspaceContainer>
        <VerticalMenu open={verticalMenu}>
          <ToggleSubMenus
            handle={{
              explorerMenu,
              // searchMenu,
              // setSearchMenu,
              setExplorerMenu,
            }}
          />
        </VerticalMenu>

        <SidebarContainer open={sidebar}>
          <ExplorerMenu open={explorerMenu} isVerticalHidden={!verticalMenu} />
          {/* <SearchMenu open={searchMenu} isVerticalHidden={!verticalMenu} /> */}
        </SidebarContainer>

        <CodeContainer
          style={{
            resize: `${pdfReader ? 'horizontal' : 'none'}`,
          }}
        >
          <SyntaxEditor terminal={terminal} />
        </CodeContainer>

        {pdfReader && <PdfViewerContainer />}
      </WorkspaceContainer>
    </Container>
  )
}

export default Workspace
