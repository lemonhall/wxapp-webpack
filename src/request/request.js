const utils = require('../utils/util.js');
/**
 * 
 * @param {any} url  请求url
 * @param {any} type 请求类型 GET POST
 * @param {any} data  请求参数
 * @param {any} success 成功回调
 * @param {any} text  加载文字提示
 * @param {any} fail    失败回调
 */
function ajax(url, type, data, success, text, fail) {
    if (typeof (data) === "object") {
        data = JSON.stringify(data);
    }
    if (text != undefined && text != '') {
        wx.showToast({
            title: text,
            icon: "loading",
            duration: 10000
        });
    }
    wx.request({
        url:  url,
        data: data,
        method: type,
        header: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        success: function (res) {
            wx.hideToast();

            /*微信状态码*/
            if (res.statusCode.toString().indexOf('2') == 0) {
                if (res.data.status == -1) {
                    fail && fail();
                    utils.alert('服务器异常');
                } else if (res.data.errcode == 0 && (res.data.result.status == 0)) {
                    success(res.data);
                }
                else {
                    fail && fail();
                    utils.alert(res.data.msg);
                }
            } else {
                fail && fail();
                utils.alert('服务器异常');
            }
        },
        fail: function (res) {
            wx.hideToast();
            utils.alert('哎哟，网络打了个盹');
            fail && fail();
        }
    })
}

module.exports = {
    ajax: ajax
}