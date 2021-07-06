
//引入并实例化
const router = require('koa-router')(); 
const fs = require('fs');
const path = require('path');

//封装递归
function loadRoutes(filePath) { 
  //将当前目录下 都读出来
	const files = fs.readdirSync(filePath); 

	files.filter(file => { // 过滤
		return file !== 'index.js'
	}) // 将 index.js 过滤掉，路由名字一律不能用 index.js 命名，否则不生效，我这里边的 index.js 如果拿到外面就不用添加这个判断了 ...
		.forEach(file => {
			
			let newFilePath = path.join(filePath,file);
			
			if(fs.statSync(newFilePath).isDirectory()){ // 是目录
			  // 递归
				loadRoutes(newFilePath); 
				
			}else{ // 是文件
			
				let route = require(newFilePath);
				
				//注册路由
				router.use(route.routes())
				router.use(route.allowedMethods())
			}
		})
        

}

//启动
loadRoutes(__dirname);

module.exports = router;