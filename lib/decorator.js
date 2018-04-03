const Router=require('koa-router')
const glob=require('glob')
const { resolve }=require('path')
const symbolPrefix=Symbol('prefix')

const _ = require('lodash')
const isArray = c => _.isArray(c) ? c : [c]
const routerMap=new Map()
export class Route
{
    constructor(app,apiPath)
    {
        this.app=app
        this.apiPath=apiPath
        this.router=new Router()
    }
    init()
    {
        glob.sync(resolve(this.apiPath,'./**/*.js')).forEach(require)
        for(let [config,controller] of routerMap)
        {
            const controllers = isArray(controller)
            const prefix= config.target[symbolPrefix]
            if (prefix) prefix = normalizePath(prefix)
            const path=prefix+config.path
            this.router[config.method](path,...controllers)
        }
        this.app.use(this.router.routes())
                .use(this.router.allowedMethods())
    }
}


export const controller=path=>target=>(target.prototype[symbolPrefix]=path)

const normalizePath=path=>path.startsWith('/') ? path : `/${path}`
const router=config=>(target,key,descriptor)=>{
    config.path=normalizePath(config.path)
    routerMap.set({
        target:target,
        ...config
    },target[key])
}
export const get=path=>router({
    method:'get',
    path:path
})

export const post=path=>router({
    method:'post',
    path:path
})

export const all=path=>router({
    method:'all',
    path:path
})