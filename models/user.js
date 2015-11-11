var mongoose=require('mongoose');
var Schema = mongoose.Schema;





// set up a mongoose model and pass it using module.exports
var UserSchema = mongoose.model('User', new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token:{type:String}

}));
module.exports = mongoose.model('User', UserSchema);






