import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const API_URL = import.meta.env.VITE_API_URL
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('${API_URL}/api/auth/signin', form)
      localStorage.setItem('token', res.data.token)
      navigate('/notes')
    } catch (err) {
      alert('Invalid credentials!')
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign In</button>
      </form>
      <p>
        New here? <a href="/signup">Create an account</a>
      </p>
    </div>
  )
}

export default Signin
