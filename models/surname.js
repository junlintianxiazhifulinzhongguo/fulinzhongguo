import { CommonModel } from "./common";

export class SurnameModel extends CommonModel
{
    constructor()
    {
        super('Surname');
    }
    async findOne(conditions)
    {
        return new Promise((resolve,reject)=>{
            this.model.findOne(conditions,function (error,doc)
            {  
                if (error)
                {  
                    console.log(error)
                    reject(error);  
                }
                else
                { 
                    console.log('查询成功')
                    resolve(doc);  
                }
            })
        })
    }



}