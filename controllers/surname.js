
module.exports={
    getSurname:async(ctx,next)=>{
        await ctx.render('home/index', {title: '首页'});
    },

    getSurnameOne:async(id)=>{
        return {'title':'lijun'}
    }



}