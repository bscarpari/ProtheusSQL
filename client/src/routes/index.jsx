import React, { Suspense } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom'

import { Loading } from '../components/Utils/Loading/Loading'

import useAuth from '../hooks/useAuth'

const NotFound = React.lazy(() => import('../pages/NotFound'))
const Home = React.lazy(() => import('../pages/Home'))

const Login = React.lazy(() => import('../pages/Auth/Login'))
const RegisterVoluntario = React.lazy(() =>
  import('../pages/Auth/Register/RegisterVoluntary')
)
const Register = React.lazy(() => import('../pages/Auth/Register'))
const SendResetEmail = React.lazy(() =>
  import('../pages/Auth/ForgotPassword/SendResetEmail')
)
const ResetPassword = React.lazy(() =>
  import('../pages/Auth/ForgotPassword/ResetPassword')
)

const Workspace = React.lazy(() => import('../pages/Workspace'))
const Dashboard = React.lazy(() => import('../pages/Dashboard'))
const Schedule = React.lazy(() => import('../pages/Schedule'))

/* Forum */
const Forum = React.lazy(() => import('../pages/Forum'))
const ForumCategory = React.lazy(() => import('../pages/Forum/ForumCategory'))
const ForumPost = React.lazy(() => import('../pages/Forum/ForumPost'))
const SubmitPost = React.lazy(() => import('../pages/Forum/SubmitPost'))

const Private = () => {
  const { authenticated } = useAuth()

  return authenticated > 0 ? (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Register />
  )
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path='/login'
          element={
            <Suspense>
              <Login />
            </Suspense>
          }
        />

        <Route
          path='/register'
          element={
            <Suspense>
              <Register />
            </Suspense>
          }
        />

        <Route
          path='/registerVoluntary'
          element={
            <Suspense>
              <RegisterVoluntario />
            </Suspense>
          }
        />

        <Route
          path='/forgotPassword'
          element={
            <Suspense>
              <SendResetEmail />
            </Suspense>
          }
        />

        <Route
          path='/resetPassword/:id/:token'
          element={
            <Suspense>
              <ResetPassword />
            </Suspense>
          }
        />

        <Route element={<Private />}>
          <Route path='/workspace' element={<Workspace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/forum/:category' element={<ForumCategory />} />
          <Route path='/forum/:category/:id' element={<ForumPost />} />
          <Route path='/forum/submit' element={<SubmitPost />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes

// REFERÊNCIAS
// https://reactrouter.com/en/main/components/outlet da uma olhada nessa pagina
// https://youtu.be/G7hHdcW4kQY
// https://youtu.be/-4fyyyQjsz8 video de referencia
