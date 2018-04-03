const bodyParser=require('koa-bodyparser');
const staticServer=require('koa-static');
const nunjucks=require('koa-nunjucks-2');
const { resolve } = require('path')
const R=require('ramda')
const MIDDLEWARES=['router']
module.exports=app=>{
    app.use(nunjucks({
        ext: 'html',
        path: resolve(__dirname, '../view'),
        nunjucksConfig: {
          trimBlocks: true
        }
      }));

    app.use(bodyParser())
    
    R.map(
      R.compose(
        R.forEachObjIndexed(
          initWith=>initWith(app)
        ),
        require,
        name=>resolve(__dirname,`./${name}`)
      )
    )(MIDDLEWARES)
    
    app.use(staticServer(resolve(__dirname,'../public')))
}