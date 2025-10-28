
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type : String , required : true , unique : true} ,
    password : {type : String , required : true , unique : true},
    followers : [{username : {type : String , required : true}}],
    following : [{username : {type : String , required : true}}],
    gameScore: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    }
    , { timestamps: true }
)

export default mongoose.model("User" , userSchema);