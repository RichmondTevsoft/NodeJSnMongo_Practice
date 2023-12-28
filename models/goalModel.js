const mongoose = require('mongoose');


const goalSchema = mongoose.Schema ({
        text : {
            type: String,
            required: [true, 'Please provide a text value for processing yeah']
    }
},
    {
        timestamps : true
    }
);


module.exports = mongoose.model('Goal', goalSchema)