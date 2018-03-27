import Vue from 'vue';
import router from './routes.js';
import '../assets/css/base.scss';
import request from './common/request.js';
import store from './vuex/store.js'
import $ from 'jquery';
Vue.prototype.$http = request;


var app = new Vue({
    router,
    store
}).$mount('#app');

//根据不同设备设置字体大小
let elWidth = document.documentElement.clientWidth;
//document.documentElement.style.fontSize = elWidth / 15 + 'px';
//document.body.style.fontSize='16px';

// window.onbeforeunload=function (){ 
//     alert("===onbeforeunload==="); 
//     if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){ 
//     alert("你关闭了浏览器"); 
//     }else{ 
//     alert("你正在刷新页面"); 
//     } 
//     } 

