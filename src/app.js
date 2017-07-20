
import { camelCase } from 'lodash';

App({
	onLaunch() {

		console.log(camelCase('OnLaunch'));

		// 调用API从本地缓存中获取数据
		const logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
	},
	getUserInfo(cb) {
		if (this.globalData.userInfo) {
			typeof cb === 'function' && cb(this.globalData.userInfo);
		} else {
			// 调用登录接口
			wx.login({
				success: () => {
					wx.getUserInfo({
						success: (res) => {
							this.globalData.userInfo = res.userInfo;
							typeof cb === 'function' && cb(this.globalData.userInfo);
						},
					});
				},
			});
		}
	},
	globalData: {
		userInfo: null,
		// 分享
		shareMessage: function (obj) {
			return {
				title: pbj.title || '分享的标题',
				path: obj.path || '/pages/index/index'
			}
		},
		// 回到首页
		goToIndex: function (url) {
			wx.switchTab({
				url: '/pages/index/index'
			})
		},
		navigateTo(obj) {
			// 获取当前页面栈的实例
			var routers = getCurrentPages(),
				routerLen = routers.length;

			if (routerLen == 5) {
				wx.redirectTo(obj);
			}
			else {
				wx.navigateTo(obj);
			}
		},
	},
});
