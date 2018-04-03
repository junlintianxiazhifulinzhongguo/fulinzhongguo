const path = require('path');
const router=require('koa-router')()
const { getSurname,getSurnameOne }=require('../controllers/surname')
const { controller,get }=require('../lib/decorator')
@controller('api/v0/surname')
export class surnameController
{
    @get('/')
    async getSurname(ctx,next){
        await getSurname(ctx,next)
    }

    @get('/:id')
    async getSurnameOne(ctx,next){
        const { id } = ctx.params.id
        const title=await getSurnameOne(id)
        ctx.body = {
            title
          }
    }

}



