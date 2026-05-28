import { useState } from 'react'
import API from '../api'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/login.css'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] =
    useState(false)

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

  e.preventDefault()

  try {

    const response = await API.post(
      '/auth/login',
      formData
    )

    console.log('LOGIN RESPONSE:', response.data)

    // STORE CANDIDATE
    localStorage.setItem(
      'Candidate',
      JSON.stringify(response.data.Candidate)
    )

    // STORE TOKEN
    localStorage.setItem(
      'token',
      response.data.token
    )

    alert('Login Successful')

    navigate('/home')

  } catch (error) {

    console.log('LOGIN ERROR:', error)

    alert(
      error.response?.data?.message ||
      'Login Failed'
    )
  }
}

  return (

    <div className='auth-container'>

      <h3 className='titel'>TMDB.in</h3>

      <form
        className='auth-form'
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>

        <input
          type='email'
          name='email'
          placeholder='Enter Email'
          onChange={handleChange}
          required
        />

        <div className='password-box'>

          <input className='pass'
            type={
              showPassword
                ? 'text'
                : 'password'
            }
            name='password'
            placeholder='Password'
            onChange={handleChange}
            required
          />

          <button
            type='button'
            className='but'
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? '🙈' : '👁️'}
          </button>

        </div>

        <button type='submit'>
          Login
        </button>


      </form>

    </div>
  )
}

export default Login



// shashikumar2004@gmail.com
// Shashi@2004