import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Notes from './pages/notes'
import ProtectedRoute from './components/protectedroute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
