const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    fName: {
        type: String,
        default: ''
    },
    lName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    pwd: {
        type: String,
        default: ''
    }
});

userSchema.methods.validPassword = function (password, dbPassword) {
    if (password === dbPassword) {
        return true;
    } else {
        return false;
    }
};
module.exports = mongoose.model('user', userSchema);
