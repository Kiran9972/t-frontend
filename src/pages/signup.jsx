import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form)
      alert('Signup successful! Please login.')
      navigate('/signin')
    } catch (err) {
      alert('Signup failed! Try again.')
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/signin">Login</a>
      </p>
    </div>
  )
}

export default Signup
