const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    name : {
        type: String,
        required: [true, 'Please provide a name for processing yeah']
},
    email : {
        type: String,
        required: [true, 'Please provide a email for processing yeah'],
        unique: true
},
    password : {
        type: String,
        required: [true, 'Please provide a password for processing yeah']
},
    phone : {
        type: String,
        required: [true, 'Please provide a phone for processing yeah']
}
},
{
    timestamps : true
}
);


module.exports = mongoose.model('User', userSchema)