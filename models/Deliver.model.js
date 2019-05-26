const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Deliver = new Schema({

    contact_name:{
        type:String
    },

    email:{
        type:String
    },

    contact_number:{
        type:String
    },

    address:{
        type:String
    },

    zip_code:{
        type:String
    },

    deliver_completed:{
        type: Boolean
    }

});



module.exports = mongoose.model('Deliver', Deliver);













