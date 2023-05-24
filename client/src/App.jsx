import AppRoutes from './routes'

import AuthProvider from './contexts/auth'

import GlobalStyle from './assets/styles/global'
import { Theme } from 'react-daisyui'

const App = () => {
  return (
    <AuthProvider>
      <Theme dataTheme={'mytheme'}>
        <GlobalStyle>
          <AppRoutes />
        </GlobalStyle>
      </Theme>
    </AuthProvider>
  )
}

export default App
