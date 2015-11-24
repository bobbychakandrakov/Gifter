var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var PersonSchema = mongoose.model('Person', new Schema({
    owner_id:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true
    }

}));
module.exports = mongoose.model('Person', PersonSchema);








