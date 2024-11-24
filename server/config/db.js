const mongoose =require('mongoose')
const mongoUrl="mongodb+srv://soumadipsantra2004:s5iZmx5gbkM2u21y@portfolio.mkxd3.mongodb.net/Payment"

const connectedDb=()=>{
      mongoose.connect(mongoUrl);
      console.log("DB conneted Successfully..!")
}

module.exports=connectedDb