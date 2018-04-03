# fulinzhongguo
福邻忠帼
在根目录下新建config文件夹，在comfig文件夹下新建index.js文件，
在index.js文件中配置如下代码：
module.exports={
    qiniu:{
        AK:'你在七牛网上的AK',
        SK:'你在七牛网上的SK',
        bucket:'你在七牛网上的存储对象'
    },
    mongodb:{
        db:'mongodb://localhost:27017/lijun'
    },
    domainName:'你的域名'
}

克隆该项目后，需要安装一些中间件，使用 :
cnpm i