const router = require('koa-router')();
const notify = require('../../controllers/notify');

router.get('/send',async  ctx => {
	const params = ctx.request.query
	const result = await notify.sct_send(params.msg);
	if (result.code == 0) {
		ctx.body = {
			code: 0,
			msg: result.msg,
			data: result.data
		}
	} else {
		ctx.body = {
			code: -1,
			msg: result.msg
		}
	}
})
router.post('/send',async  ctx => {
	const params = ctx.request.body;
	const result = await notify.sct_send(params);
	if (result.code == 0) {
		ctx.body = {
			code: 0,
			msg: result.msg,
			data: result.data
		}
	} else {
		ctx.body = {
			code: -1,
			msg: result.msg
		}
	}
})

module.exports = router;
