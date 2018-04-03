const mongoose=require('mongoose')
export class CommonModel
{
    constructor(model)
    {
        this.model= mongoose.model(model)
    }
    async add(querys)
    {
        return new Promise((resolve,reject)=>{
            let query=new this.model(querys)
            query.save(function(error,docs) 
            {  
                if (error)
                {  
                    console.log(error)
                    reject({error:error});  
                }
                else
                { 
                    console.log('新增成功')
                    resolve({doc:docs});  
                }
            })
        })
    }
    async remove(conditions)
    {
        return new Promise((resolve,reject)=>{    
            this.model.remove(conditions, function(error, docs){
                if (error)
                {  
                    console.log(error)
                    reject({error:error});  
                }
                else
                { 
                    console.log('删除成功')
                    resolve({doc:docs});  
                }
            })
        })
    }
    async update(conditions, updates)
    {
        return new Promise((resolve,reject)=>{
            this.model.update(conditions, updates, function (error,docs) {  
                if (error)
                {  
                    console.log(error)
                    reject({error:error});  
                }
                else
                { 
                    console.log('更新成功')
                    resolve({doc:docs});  
                }
            })
        })
    }
    async find(conditions)
    {
        return new Promise((resolve,reject)=>{
            this.model.find(conditions,function (error,docs)
            {  
                if (error)
                {  
                    console.log(error)
                    reject({error:error});  
                }
                else
                { 
                    console.log('查询成功')
                    resolve({doc:docs});  
                }
            })
        })
    }
    
}