const mongoose=require("mongoose")

const connect=async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("Connect To the db");
}

module.exports=connect