const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

const jwt = require('jsonwebtoken')

const Candidate = require('../models/Candidate')

// GENERATE TOKEN FUNCTION
const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  )
}

// REGISTER
router.post('/register', async (req, res) => {

  try {

    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      addressLine1,
      addressLine2,
      pincode,
      city
    } = req.body

    const existingCandidate = await Candidate.findOne({
      email
    })

    if (existingCandidate) {

      return res.status(400).json({
        message: 'Email already registered'
      })
    }

    const newCandidate = new Candidate({
      name: `${firstname} ${lastname}`,
      email,
      password,
      phone,
      addressLine1,
      addressLine2,
      pincode,
      city
    })

    await newCandidate.save()

    // TOKEN
    const token = generateToken(newCandidate._id)

    res.status(201).json({

      message: 'Registration successful',

      token,

      Candidate: {
        id: newCandidate._id,
        name: newCandidate.name,
        email: newCandidate.email
      }
    })

  } catch (error) {

    console.log('REGISTER ERROR:', error)

    // VALIDATION ERROR
    if (error.name === 'ValidationError') {

      const firstError =
        Object.values(error.errors)[0].message

      return res.status(400).json({
        message: firstError
      })
    }


    if (error.code === 11000) {

      return res.status(400).json({
        message: 'Email already exists'
      })
    }

    res.status(500).json({
      message: 'Registration failed',
      error: error.message
    })
  }
})


// LOGIN
router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body

    const candidate = await Candidate.findOne({ email })

    if (!candidate) {

      return res.status(404).json({
        message: 'Candidate not found'
      })
    }

    // COMPARE HASHED PASSWORD
    const isMatch = await candidate.matchPassword(password)

    if (!isMatch) {

      return res.status(401).json({
        message: 'Incorrect password'
      })
    }

    // TOKEN
    const token = generateToken(candidate._id)

    res.json({

      message: 'Login successful',

      Candidate: {
        id: candidate._id,
        name: candidate.name,
        email: candidate.email
      },

      token,
    })

  } catch (error) {

    console.log('LOGIN ERROR:', error)

    res.status(500).json({
      message: 'Login failed',
      error: error.message
    })
  }
})

router.get('/profile/:email', protect ,async (req, res) => {

  try {

    const candidate = await Candidate
      .findOne({
        email: req.params.email
      })
      .select('-password')

    if (!candidate) {

      return res.status(404).json({
        message: 'Candidate not found'
      })
    }

    res.json(candidate)

  } catch (error) {

    console.log('PROFILE ERROR:', error)

    res.status(500).json({
      message: 'Failed to fetch profile',
      error: error.message
    })
  }
})

module.exports = router