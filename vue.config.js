module.exports={
    devServer:{
        open:true,
        port:8888
    },
    //配置rem自动转换rem的
    css: {
              loaderOptions: {
             css: {},
                   postcss: {
                 plugins: [
                   require('postcss-px2rem')({
                       //ren的单位，
                        remUnit: 36
                      })
                  ]
               }
             }
         }
}