const mongoose=require('mongoose')
const Schema=mongoose.Schema
const surnameSchema=new Schema({
    surname:{
        type:String,
        required:true
    },
    pinyin:{
        type:String,
        default:''
    },
    length:{
        type:Number,
        default:1
    },
    cover:{
        type:String,
        default:''
    },
    ps:{
        type:String,
        default:''
    },
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }  
})

surnameSchema.pre('save',function(next) {
    if(this.isNew)
    {
        this.meta.createdAt=this.meta.updatedAt=Date.now()
    }
    else
    {
        this.meta.updatedAt=Date.now()
    }
    next()   
})

mongoose.model('Surname',surnameSchema)