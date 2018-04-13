let pagesNum = (document.documentElement.clientHeight - 150) / 60;
module.exports.pagesNum=parseInt(pagesNum)-5;

export function is_weixn() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
export function is_phone(name){
    var u = navigator.userAgent;
    switch(name){
        case 'android':
            return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        case 'ios':
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }
}
export function is_pc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
export function urlData(name)
{
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    if(name)
        return theRequest[name];
    return theRequest;
}
/**
 * 计算时间差
 * startTime、endTime均为时间戳
 * @param startTime 开始时间
 * @param endTime   结束时间
 * @returns {string}
 */
export function timeDiff(startTime, endTime) {
    let date3 = endTime - startTime;
    //计算出相差天数
    let days = Math.floor(date3 / (24 * 3600 * 1000))
    //计算出小时数
    let leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)
    let format = null;
    if (days > 30) {
        let date = new Date();
        format = (date.getMonth() + 1) + "月" + date.getDate() + "日";
    } else if (days >= 1) {
        format = days + ' 天前';
    } else if (hours >= 1) {
        format = hours + ' 小时前';
    } else if (minutes >= 1) {
        format = minutes + ' 分前';
    } else {
        format = seconds + ' 秒前';
    }
    return format;
}
/**
 * 时间戳转成时间格式    1326256200000  =>  '2012-01-11 12:30:00'
 * @param value
 * @param showTime  是否显示时分秒
 * @returns {*}
 */
export function formatDate(value, showTime=true) {
    if (!value) return null;
    let _date = new Date(value),
        year = _date.getFullYear(),
        month = _date.getMonth() + 1,
        date = _date.getDate(),
        hours = _date.getHours(),
        mins = _date.getMinutes(),
        second = _date.getSeconds(),
        _dateTime = null;

    month < 10 && (month = "0" + month);
    date < 10 && (date = "0" + date);
    hours < 10 && (hours = "0" + hours);
    mins < 10 && (mins = "0" + mins);
    second < 10 && (second = "0" + second);
    _dateTime = year + "-" + month + "-" + date;
    if (showTime) {
        _dateTime += " " + hours + ":" + mins + ":" + second;
    }
    return _dateTime;
}

export function splitPhoto(photo){
    if(!photo) return '';
    return photo.split(',')[0];
}
//设置cookie
export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
   // d.setTime(d.getTime() + exdays *  1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
   
  }
  export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }
  export function clearCookie(name) {
    setCookie(name, "", -1);
  }
//提示请求失败信息框

export function showErrMsg(that,textStatus,msg){
    
    if (textStatus == "timeout") {
        that.$message({
          showClose: true,
          message: msg || "请求超时",
          type: "error",
          duration: 1000
        });
      } else {
        that.$message({
          showClose: true,
          message: msg ||("请求失败," + textStatus),
          type: "error",
          duration: 1000
        });
      }
}
//对象深拷贝
export function deepClone(obj) {
    var newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    }
    for(var i in obj){
       newobj[i] = typeof obj[i] === 'object' ?
       deepClone(obj[i]) : obj[i];
    }
    return newobj
}

export function isPattern(name,that,word) {
    var pattern = /^\S{3,20}$/g;
    if (name === "") {
        that.$message({ showClose: true, message:word+"不能为空", duration: 1000 });
       return false;
    }
    if (!pattern.test(name)) {
        that.$message({ showClose: true, message:word+"应为3-20个非空白字符", duration: 1000});
        return false;
    }
    return true;
  }

  
