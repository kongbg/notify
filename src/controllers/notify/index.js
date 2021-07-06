const axios = require('axios');
const config = require('../../config')

const ID = config.notify.ID;
const SECRET = config.notify.SECRET;
const AGENTID = config.notify.AGENTID;

// 获取access_token
const getToken = async () => {
    return new Promise( async (resolve) => {
        const url = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${ID}&corpsecret=${SECRET}`
        await axios({
            url: url,
            method: 'get',
        }).then((data) => {
            const body = {
                code: data.data.errcode,
                msg: data.data.errcode == 0 ? '获取成功！' : '获取失败！',
                data: {
                    access_token:data.data.access_token
                },
            };
            resolve(body);
        })
    })
}

// 发送信息
const sendMsg = async (access_token, params) => {
    return new Promise( async (resolve) => {

        let message = initMsg(params);

        const url = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${access_token}`
        await axios({
            url: url,
            method: 'post',
            data: JSON.stringify(message),
        }).then((data) => {
            const body = {
                code: data.data.errcode,
                msg: data.data.errcode == 0 ? '发送成功！' : '发送失败！',
                data: data.data,
            };
            resolve(body);
        })
    })
}

function initMsg (params) {
    let message;
    if (Object.prototype.toString.call(params) === '[object String]') {
        // get方法，自行用转义后的 \n 进行换行
        message = {
            touser: "@all",
            msgtype: "text",
            agentid: AGENTID,
            text: {
                content: params
            },
            safe: 0
        };
    }
    if (Object.prototype.toString.call(params) === '[object Object]') {
        if (params.msgtype == 'textcard') {
            message = {
                touser: "@all",
                msgtype: "textcard",
                agentid: AGENTID,
                textcard: {
                    title: params.title,
                    description: `<div class=\"gray\">${params.date || ''}</div> <div class=\"normal\">${params.content}</div>`,
                    url: `http://notify.timor.3344love.cn?params=${encodeURI(JSON.stringify(params))}`,
                    btntxt:"详情"
                }
             }
        } else {
            message = {
                touser: "@all",
                msgtype: "text",
                agentid: AGENTID,
                text: {
                    content: `标题：${params.title} \n内容：${params.content} \n来源：${params.from || 'timor酱'}`
                },
                safe: 0
            };
        }
    }
    return message;
}

// 暴露对外的发送信息方法
const sct_send = async (params) => {
    return new Promise ( async (resolve) => {
        if ((Object.prototype.toString.call(params) === '[object Object]' && !Object.keys(params).length) || (Object.prototype.toString.call(params) == "[object String]" && !params.length)) {
            resolve({code:-1, msg:'信息不能为空！'})
        } else {
            let result = await getToken();
            if (result.code == 0) {
                let access_token = result.data.access_token;
                let sendResult = await sendMsg(access_token, params);
                resolve({
                    code: sendResult.code, 
                    msg: sendResult.msg,
                    data: sendResult.data
                })
            } else {
                resolve({
                    code: result.code, 
                    msg: result.msg
                })
            }
        }
    })
}

exports.sct_send = sct_send; 