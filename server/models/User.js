const mongoose=require('mongoose');
const validator=require('validator')

const DEFAULT_PIC='https://beebom.com/wp-content/uploads/2022/02/Featured.jpg?w=750&quality=75';

const UserSchema= new mongoose.Schema(
    {
        username:
        {
            type:String,
            require:[true,"Please provide name"],
            minlength:[4,'Name must be atleast 4 characters long'],
            maxlength:[20,'Name cannot exceed 30 characters']
        },
        password:
        {
            type:String,
            require:true,
            minlength:[8,"Password must be atleast 4 characters long"]
        },
        email:
        {
            type:String,
            require:true,
            unique:true,
            validate:[validator.isEmail, 'Please enter a valid email']
        },
        profilepic:
        {
            type:String,
            default:DEFAULT_PIC
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("User",UserSchema);