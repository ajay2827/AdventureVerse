const mongoose=require('mongoose');
const DEFAULT_POSTPIC='http://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/01/shutterstock_391535467-Copy.jpg';

var PostSchema= new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:[true,"Please provide name of Post"],
            unique:[true,"Provide unique name of Post"]
        },
        desc:
        {
            type:String,
            required:[true,"Please provide description of Post"],
        },
        photo:
        {
            type:String,
            default:DEFAULT_POSTPIC
        },
        username:
        {
            type:String,
            require:true
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Post",PostSchema);