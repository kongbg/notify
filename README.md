# 操作手册

## 安装
> 安装全部项目依赖
```js
npm install 或者 cnpm install
```

## 参数
>
1.进入该链接，注册企业微信：https://work.weixin.qq.com/wework_admin/register_wx  
2.进入该链接，复制底部的企业ID：https://work.weixin.qq.com/wework_admin/frame#profile  
3.进入该链接，微信扫码邀请关注二维码：https://work.weixin.qq.com/wework_admin/frame#profile/wxPlugin  
4.进入该链接，创建应用：https://work.weixin.qq.com/wework_admin/frame#apps/createApiApp  
5.创建后，进入该链接，找到创建的应用：https://work.weixin.qq.com/wework_admin/frame#apps 进入应用，复制AgentId和Secret  
以上操作已获取到需要的全部参数  

## 配置参数
>
按提示修改/src/config/index.js  
填入上面获取的参数即可  
## 本地运行
> notify
```js
npm run start
```
## 部署
1.拉取代码  
到服务器运行：git clone https://github.com/kongbg/notify.git  
2.安装依赖  
运行命令 cd /notify && npm install  
3.安装pm2  
运行命令：npm install -g pm2  
进入项目目录  
运行命令：npm run pm2

## 信息推送
> get方法
```js
http://localhost:3000/send?msg=我是信息  
msg后的参数，可以用转义后的换行符进行换行  
例如：http://localhost:3000/send?msg=标题:123%0A%20内容:456  
转义后的换行符： %0A%20
```

> post方法
```js
http://localhost:3000/send  
参数： {
    title:'我是标题',
    content:'我是内容',
    date:'我是日期',
    msgtype:'text' // 我是消息类型
}
信息类型参数：msgtype 有两种类型 text-文本 textcard-卡片文本 默认为text
```
## 效果图
![avatar](/picture/notify.jpg)


