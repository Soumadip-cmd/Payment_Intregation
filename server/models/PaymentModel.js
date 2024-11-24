const mongoose =require('mongoose')
const { Schema } = mongoose;

const paySchema = new Schema({
  
  
});

module.exports= mongoose.model('Payment', paySchema);