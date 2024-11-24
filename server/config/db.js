const mongoose =require('mongoose')
const mongoUrl="mongodb://localhost:27017/Payment"

const connectedDb=()=>{
      mongoose.connect(mongoUrl);
      console.log("DB conneted Successfully..!")
}

module.exports=connectedDb