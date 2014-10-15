/**
 * @author lin
 * Javascript Utils 工具类
 */

ju = jUtils = {};
/// 版本信息
ju.Version = function() {
	console.info('version 1.0');
}
///添 加收藏，title为收藏标题，url为收藏网址
ju.AddFavorite = function(title, url) {
	if (title == "") {
		title = document.title;
	}
	if (url == "") {
		url = location.href;
	}
	if (document.all) {
		try {
			window.external.addFavorite(url, title);
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	} else if (window.sidebar) {
		window.sidebar.addPanel(title, url, "");
	} else {
		alert("加入收藏失败，请使用Ctrl+D进行添加");
	}
}
/// 设为首页，url为设置对象
ju.SetHome = function(url) {
	if (url == "") {
		url = location.href;
	}
	if (document.all) {
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(url);
	} else if (window.sidebar) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("该操作被浏览器拒绝。");
			}
		}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage', url);
	} else {
		alert('您的浏览器不支持自动自动设置首页，请使用浏览器菜单手动设置。');
	}
}
/// 设置 Cookie
/// name 为 cookie 名称
/// value 为 cookie 的值
/// expireTime 为过期时间，如1表示1天或1小时，依据 IsDay 的真假来做选择
/// IsDay 条件判断，如果为真 则expireTime 表示天数，如为假则表示小时
ju.SetCookie = function(name, value, expireTime, IsDay) {
	var exdate = new Date();
	if (IsDay)
		exdate.setDate(exdate.getDate() + expireTime);
	else
		exdate.setHours(exdate.getHours() + expireTime);
	cookieVal = name + "=" + escape(value) + ((expireTime == null) ? "" : ";expires=" + exdate.toGMTString());
	document.cookie = cookieVal;
}
/// 获取 Cookie,name为cookie名称
ju.GetCookie = function(name) {
	var cs = document.cookie.split(";");
	for (var i = 0; i < cs.length; i++) {
		var c = cs[i].split("=");
		if (name.trim() == c[0].trim())
			return unescape(c[1]);
	}
	return null;
}
/// 判断对象是否为空
ju.IsNullOrUndefined = function(input) {
	return input == "" || input.trim() == "" || input == null || input == undefined;
};
/// 返回URL相应参数的值，paras为相应的参数名
ju.Request = function(paras) {
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {}
	for ( i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if ( typeof (returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
}
/// 获取文件扩展名
ju.GetFileExtension = function(fileName) {
	var reg = /\.[^\.]+$/;
	return reg.exec(fileName);
}
/// 判断是否是手机号码
ju.IsMobile = function(mobile) {
	var reg = /^1[3,5,8]\d{9}$/;
	return reg.test(mobile);
}
/// 判断是否是电话号码
ju.IsPhone = function(phone) {
	var reg = /^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$/;
	return reg.test(phone);
}
/// 验证是否是邮箱地址
ju.IsEmail = function(email) {
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return reg.test(email);
}
/// 验证是否是中文
ju.IsChinese = function(input) {
	var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
	return reg.test(input);
}
/// 验证是否是URL地址
ju.IsUrl = function(url) {
	var reg = /^http[s]?:\/\/[\w-]+(\.[\w-]+)+([\w-\.\/?%&=]*)?$/;
	return reg.test(url);
}
/// 验证是否是邮编
ju.IsZipCode = function(input) {
	var reg = /^\d{6}$/;
	return reg.test(input);
}
///校验字符串：只能输入6-20个字母、数字、下划线(常用手校验用户名和密码)
ju.IsString6_20 = function(input) {
	var reg = /^(\w){6,20}$/;
	return reg.test(input);
}
/// 验证是否是图片
ju.IsImage = function(input) {
	var reg = /[.]+(jpg|jpeg|png|gif)$/;
	return reg.test(input);
}
/// 验证是否是IP
ju.IsIP = function(ip) {
	var reg = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
	return reg.test(ip);
}
/// 验证是否是日期
ju.IsDate = function(date) {
	var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
	return reg.test(date);
}
/// 验证是否是QQ号码
ju.IsQQ = function(qq) {
	var reg = /^\d{5,9}$/;
	return reg.test(qq);
}
/// 创建脚本引用
ju.CreateJScript = function(id,url){
	if (document.getElementById(id) != null) {
        ju.DeleteJScript(id);
    }
    var obj = document.createElement("script");
    obj.setAttribute("src", url);
    obj.setAttribute("id", id);
    obj.setAttribute("type", "text/javascript");
    document.getElementsByTagName("head")[0].appendChild(obj);
    obj = null;
}
/// 删除脚本
ju.DeleteJScript = function(id){
	var obj = document.getElementById(id);
    if (obj != null) {
        var parent = obj.parentNode;
        parent.removeChild(obj);
        obj = null;
    }
}
