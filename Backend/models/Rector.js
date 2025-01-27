const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const RectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  idProof: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["rector", "guard","warden"], required: true },
}, { timestamps: true });


// bcrypt password
// pre method has diff methods like save
// save(method) means before middleware stores data into db, these method will run
RectorSchema.pre("save", async function(next){
    // console.log("pre method", this);  //data will show on terminal
    const user = this;

    if(!user.isModified('password')){
        next(); //next() is middleware which means if password is not changed, go to next step
    }
    try{
        // const saltRound = 10;// when we hash psswrd we have to set it, more large now. more complex the passowrd is 
        const saltRound = await bcrypt.genSalt(10); //2nd method
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }catch(error){
        next(error);
    }
})


module.exports = mongoose.model("Rector", RectorSchema);
