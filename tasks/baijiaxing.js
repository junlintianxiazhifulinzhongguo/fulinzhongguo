const fs = require('fs');
const querystring = require('querystring');
const { resolve }=require('path')
const path=resolve(__dirname,'../public/百家姓.txt')
const mongoose=require('mongoose')
const {SurnameModel}=require('../models/surname')
module.exports={
  addSurname:async()=>{
    fs.readFile(path, async(err, data) => {
      if (err) throw err;
      const baijiaxing=data.toString()
      const bjx=querystring.parse(baijiaxing,') ','(')
      for (let key in bjx)
      {
        const Surname=new SurnameModel()
        let result=await Surname.find({'surname': key,'pinyin':bjx[key]})
        if (result.error)
        {  
          console.log(error);  
        }
        else
        {  
          if(!result.doc.length)
          {
              let ps=bjx[key].charAt(0)
              let length=key.length
              let result=await Surname.add({surname:key,pinyin:bjx[key],ps:ps,length:length})
              if (result.error)
              {  
                console.log(error);  
              }
              else
              {
                if(result.doc.meta.createdAt)
                {
                   console.log(result.doc); 
                }
                else
                {
                  console.log('插入失败，未知错误');
                }
              }
          } 
        }   
      }
    });
  }
}




