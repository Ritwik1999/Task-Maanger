const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,     
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        //Our custom validator
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error("Password shouldn't contain the word password");
            }
        }
    },
    //If you create a schema with an array of objects, mongoose will automatically convert the object to a schema for you, and hence, will add an _id path to each subdoc
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }

}, {
    timestamps: true
});

//set up a virtual Schema Type to find all tasks for a particular user.
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// the res.send method internally invokes JSON.stringify, which in turn invokes the toJSON method if it is available.
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();     //converts mongoose docs to plain JS objects

    delete userObject.password;     // The JS delete operator removes a property from an object
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to login 2');
    }
    return user;
}

//Delete user tasks when the user is deleted.
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });    
    next();
})

// Hash the plain text password before saving it
userSchema.pre('save', async function (next) {
    const user = this;

    //the isModified method would return true even while creating a new user.
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();     /* The whole point of using this "pre" hook is to run some code "before" a user gets saved.
                * But how do we know that our job is done and pass the control, because we'd be doing some async task even in the pre hook.
                * So waiting till the pre hook gets completed and then passing the control is not an option.
                * That's where the next method comes in, it indicates that our async task is done, and the control can be passed.
                * In newer versions you can return Promises instead of calling next method.
                */ 
});

const User = mongoose.model('User', userSchema);

module.exports = User;