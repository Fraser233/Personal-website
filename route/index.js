const express = require('express');
const router = express.Router();
const sd = require('silly-datetime');


// 模拟首页留言列表数据
var comments = {"comments":[
    {name:"Fraser", message:"Hello!", num: 1, datetime:"2022-1-11 10:49"}
]}

let floorNumber = 1;

/* by zhengkai.blog.csdn.net - 静态路由托管 */
router.get('/', function(req, res, next) {
    res.render('index', comments);
});
router.get('/post', function(req, res, next) {
    res.render('post', comments);
});
router.get('/say', function(req, res, next) {
    const comment = req.query;

    floorNumber++;
    comment.datetime = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    comment.num = floorNumber;
    console.log(comment.num);
    comments.comments.unshift(comment);
    //重定向到首页，没有url后缀 localhost
    res.redirect('/');
    //直接渲染首页，有url后缀 localhost/say?xxxx=xxx
    //res.render('index', comments);
});

module.exports = router;
