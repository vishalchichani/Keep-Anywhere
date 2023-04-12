import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const host = "http://localhost:3001"

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json();


    if (json.success) {
      //Redirect to Home
      localStorage.setItem('token', json.authtoken);
      navigate('/')
    }

  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-4'>
      <h2>Login to continue to iNoteBook!</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
