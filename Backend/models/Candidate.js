const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const candidateSchema = new mongoose.Schema(
{
    
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [20, 'Name cannot exceed 50 characters'],
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s]+$/.test(v);
            },
            message: 'Name should contain only alphabets'
        }
    },

    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Please enter a valid email address in this format test@domine.com'
        }
    },

    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        maxlength: [20, 'Password cannot exceed 20 characters'],
        validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(v);
            },
            message: 'Password must contain uppercase, lowercase, number and special character'
        }
    },

    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^[6-9]\d{9}$/.test(v);
            },
            message: 'Please enter a valid 10-digit Indian phone number'
        }
    },

    addressLine1: {
        type: String,
        required: [true, 'Address Line 1 is required'],
        trim: true
    },

    addressLine2: {
        type: String,
        trim: true,
        maxlength: [100, 'Address cannot exceed 100 characters']
    },

    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^[1-9][0-9]{5}$/.test(v);
            },
            message: 'Please enter a valid 6-digit pincode'
        }
    },

    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        minlength: [2, 'City name must be at least 2 characters'],
        maxlength: [50, 'City name cannot exceed 50 characters'],
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s]+$/.test(v);
            },
            message: 'City should contain only alphabets'
        }
    }

},
{
    timestamps: true
});


candidateSchema.pre('save', async function () {

    // HASH ONLY IF PASSWORD MODIFIED
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(
        this.password,
        salt
    );
});


// METHOD TO COMPARE PASSWORD
candidateSchema.methods.matchPassword = async function(enteredPassword) {

    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};


const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;