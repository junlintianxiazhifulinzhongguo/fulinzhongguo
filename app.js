const Koa=require('koa')
const middleware=require('./middleware/index')
const { connect,iniSchema}=require('./database/init')
;(async () =>{
    await connect()
    iniSchema(); 
    console.log('wwo')
})()
const app=new Koa()
middleware(app)
app.listen(80);