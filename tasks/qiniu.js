const qiniu=require('qiniu')
const config=require('../config/index')
var accessKey = config.qiniu.AK
var secretKey = config.qiniu.SK
var bucket=config.qiniu.bucket
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var configQiNiu = new qiniu.conf.Config();
configQiNiu.zone = qiniu.zone.Zone_z2;
var bucketManager = new qiniu.rs.BucketManager(mac, configQiNiu);
module.exports={
    uploadQiNiu:async (url,key)=>{
        return new Promise((resolve,reject)=>{
          bucketManager.fetch(url, bucket, key, function(err, respBody, respInfo) {
            if (err) 
            {
              reject(err);
            } 
            else 
            {
              if (respInfo.statusCode == 200) 
              {
                resolve({key});
              } 
              else 
              {
                reject(respBody);
              }
            }
          })
        })
      }
}