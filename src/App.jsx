/*import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Main/Dashboard'
import CreatePiggy from './pages/Main/CreatePiggy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreatePiggy />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App*/

import Layout from './components/Layout/Layout'
import Dashboard from './pages/Main/Dashboard'

function App() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

export default App