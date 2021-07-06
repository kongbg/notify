const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const bodyparser = new BodyParser();
const cors = require('koa2-cors');
const config = require('./config')

// 引入路由
const routes = require('./routes');
const app = new Koa();

app.use(bodyparser);

app.use(cors());

app.use(routes.routes(), routes.allowedMethods()) 
app.listen(config.port);
console.log(`koa is running: http://localhost:${config.port}`);
console.log(`信息推送get方法: http://localhost:${config.port}/send?msg=你的信息字符串`);
console.log(`信息推送post方法，传入对象: http://localhost:${config.port}/send`);
