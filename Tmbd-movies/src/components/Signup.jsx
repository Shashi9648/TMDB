import { useState } from 'react'
import API from '../api'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/login.css'

function Register() {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] =
    useState(false)

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    city: ''
  })
  const [message, setMessage] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setErrorMessage('')

      const response = await API.post(
        '/auth/register',
        formData
      )

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      )

      localStorage.setItem(
        'token',
        response.data.token
      )

      setMessage('Registration Successful')

      setTimeout(() => {

        navigate('/login')

      }, 1000)

    } catch (error) {

      setMessage('')

      setErrorMessage(

        error.response?.data?.message ||

        'Registration Failed'
      )
    }
  }
  return (

    <div className='auth-container'>

      <form
        className='auth-form'
        onSubmit={handleSubmit}
      >

        <h2>Create Account</h2>
        <label className='label' htmlFor="firstname">First Name</label>
        <input
          type='text'
          name='firstname'
          placeholder='First Name'
          onChange={handleChange}
          required
        />
        <label className='label' htmlFor="lastname">Last Name</label>
        <input
          type='text'
          name='lastname'
          placeholder='Last Name'
          onChange={handleChange}
          required
        />
        <label className='label' htmlFor="email">Email</label>
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <label className='label' htmlFor="Password">Password</label>
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
        <label className='label' htmlFor="phone">Phone</label>
        <input
          type='text'
          name='phone'
          placeholder='Phone Number'
          onChange={handleChange}
          required
        />
        <label className='label' htmlFor="firstname">First Name</label>
        <input
          type='text'
          name='addressLine1'
          placeholder='Address Line 1'
          onChange={handleChange}
          required
        />

        <input
          type='text'
          name='addressLine2'
          placeholder='Address Line 2'
          onChange={handleChange}
        />

        <input
          type='text'
          name='pincode'
          placeholder='Pincode'
          onChange={handleChange}
          required
        />

        <input
          type='text'
          name='city'
          placeholder='City'
          onChange={handleChange}
          required
        />

        <button type='submit'>
          Register
        </button>

        {message && (
          <p className='success-message'>
            {message}
          </p>
        )}

        {errorMessage && (
          <p className='error-message'>
            {errorMessage}
          </p>
        )}

        <p>
          Already have account?
          <Link to='/Login'>
            Login
          </Link>
        </p>

      </form>

    </div>
  )
}

export default Register