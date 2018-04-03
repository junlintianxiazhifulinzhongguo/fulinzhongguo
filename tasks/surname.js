const nanoid=require('nanoid')
const mongoose=require('mongoose')
const puppeteer = require('puppeteer');
const querystring = require('querystring')
const { uploadQiNiu }=require('./qiniu');
const {SurnameModel}=require('../models/surname')

 module.exports={
    crawler: async (url) => 
    {       
        const browser = await puppeteer.launch({
            args:['--no-sandbox'],
            dumpio:false,
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(url,{
            waitUntil:'networkidle2'
        });
        await page.waitFor(2000)       
        const imageSrc = await page.evaluate(() => {          
            const images=Array()
            let ps = document.getElementById('js_content').getElementsByTagName('p');
            for(let i=0;i<ps.length;i++)
            {                
                if(i<4)continue                
                if(ps[i].getElementsByTagName("img").length)
                {
                    if(ps[i].getElementsByTagName("img")[0].dataset.ratio==1 &&!ps[i].getElementsByTagName("img")[0].dataset.s)
                    {
                        images.push(ps[i].getElementsByTagName("img")[0].dataset.src)
                    } 
                }
                else
                {
                    if(ps[i].innerText.includes('头像'))
                    {
                        images.push(ps[i].innerText.replace('-头像',''))
                    }
                }
            }            
            return images
        });
    
        let all=''
        for (let [index, val] of imageSrc.entries()) 
        {
            if(val.length<5 && index<imageSrc.length-1)
            {
                all+=val+') '
            }
            else
            {
                all+=val+'('
            }
        }
        all=all.substr(0, all.length - 1);      
        const data= querystring.parse(all,') ','(')
        console.log(data)
        for (let key in data)
        {   
            console.log(data[key])
            let url=key 
            let imgName='Surname_'+nanoid()+'.jpg'
            await uploadQiNiuAndSaveDataBase(data[key],url,imgName)
        }
        await browser.close();
    }
 }




 export const uploadQiNiuAndSaveDataBase=async (key,url,imgName) =>
 {
     try{
         const Surname=new SurnameModel()         
         let result=await uploadQiNiu(url,imgName)
         if(result.key)
         {
            //如果没有该姓氏就保存到数据库中
             let results=await Surname.find({'surname': key})
             if(results.error)
             {
                 console.error(results.error);  
             }
             else
             {                                                     
                 if(!results.doc.length)
                 {
                     let length=key.length
                     let res=await Surname.add({surname:key,length:length,cover:result.key})
                     if (res.error)
                     {  
                       console.log(res.error);  
                     }
                     else
                     {
                       if(res.doc.meta.createdAt)
                       {
                          console.log(res.doc); 
                       }
                       else
                       {
                         console.log('插入失败，未知错误');
                       }
                     }
                 }
                 else
                 {
                    let conditions = {surname: key};  
                    let updates = {$set: {cover:result.key}};//将用户名更新为“tiny”  
                    let res=await Surname.update(conditions, updates)
                    if (res.error)
                    {  
                        console.log(res.error);  
                    } 
                    else 
                    {  
                        if(res.doc.nModified)
                        {
                            console.log("数据更新成功")  
                            console.log(res.doc)
                        }
                        else
                        {
                            console.log("更新失败或者没有找到匹配的记录")  
                        }
                         
                    } 
                 }                                               
             }
         }
     }catch(err)
     {
         console.log(err)
     }
 }





