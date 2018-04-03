新增成功
{ doc: { 
            meta: { createdAt: 2018-04-03T02:29:52.005Z,
                    updatedAt: 2018-04-03T02:29:52.005Z 
                  },
            pinyin: '',
            length: 1,
            cover: '',
            ps: '',
            _id: 5ac2e71fb326d40892f0cc30,
            surname: '临',
            __v: 0 
        }
}


删除成功
{ doc: { ok: 1, n: 1 } }
//判断 n 值，为真则删除成功，为0则没有找到条件匹配的记录
更新成功
{ doc: { ok: 1, nModified: 1, n: 1 } }
//判断 nModified 值，为真则更新成功，为0则没有找到条件匹配的记录

find查询成功
{ doc: 
   [ { meta: [Object],
       pinyin: '',
       length: 2,
       cover: '',
       ps: '',
       _id: 5ac0aef67949111082390ffa,
       surname: '福林',
       __v: 0 } ] }
//返回的是数组，判断 doc.length 值，为真则查询成功，为0则没有找到条件匹配的记录

findOne查询成功
{ meta: 
   { createdAt: 2018-04-01T09:55:38.063Z,
     updatedAt: 2018-04-01T09:55:38.063Z },
  pinyin: '',
  length: 2,
  cover: '',
  ps: '',
  _id: 5ac0ac9a5ec22f1036e8a341,
  surname: '君临',
  __v: 0 }


