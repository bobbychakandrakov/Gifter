var mongoose=require('mongoose');
var Schema = mongoose.Schema;
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






