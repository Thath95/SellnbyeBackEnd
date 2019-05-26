const mongoose  = require('mongoose');

let PaySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    lname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    paymentamount: {
        type: Number,
        default: 0
    },
    nameoncard: {
        type: String,
        default: ''
    },
    cardnumber: {
        type: Number,
        default: 0
    }


});

module.exports = mongoose.model( 'Pay' , PaySchema);