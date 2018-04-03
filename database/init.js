const mongoose=require('mongoose')
const { mongodb }=require('../config/index')
const glob=require('glob')
const { resolve }=require('path')
mongoose.Promise=global.Promise
module.exports={
    connect:()=>{
        let maxConnectTimes=0
        return new Promise((resolve,reject)=>{
            if(process.env!='production')
            {
                mongoose.set('debug',true)
            }
            mongoose.connect(mongodb.db)
            mongoose.connection.on('disconnected',()=>{
                maxConnectTimes++
                if(maxConnectTimes<5)
                {
                    mongoose.connect(mongodb.db)
                }
                else
                {
                    throw new Error('数据库挂了，请维修')
                }
            })
            mongoose.connection.on('error',(err)=>{
                maxConnectTimes++
                if(maxConnectTimes<5)
                {
                    mongoose.connect(mongodb.db)
                }
                else
                {
                    throw new Error('数据库挂了，请维修')
                }
            })
            mongoose.connection.once('open',()=>{
                maxConnectTimes=0
                resolve('连接成功')
                console.log('Mongodb connected succsefully')
            })
        })       
    },
    iniSchema:()=>{
        glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)              
    }
}
