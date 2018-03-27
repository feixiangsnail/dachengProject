/**
 * request.js
 * @date Created on 2017/5/12
 * @author Jamie
 *
 */
import axios from 'axios';
import Vue from 'vue';

// 添加一个请求拦截器
let deposit = [];
axios.interceptors.request.use(config => {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
// 添加一个响应拦截器
axios.interceptors.response.use(response => {
    // deposit[response.config.url] = false;
    // if(response.data.returncode){
    //     if(response.config.isMessage)
    //         Toast({
    //             message: response.data.message,
    //             duration: 500
    //         });
    //     if(response.data.returncode==3)
    //         return [{isSign:true}];
    //     return Promise.reject(response.data);
    // }
    return response.data.data
}, function (error) {
    return Promise.reject(error)
})
export default {
    g (url, params) {
        return axios({
            method: 'get',
            url:  url,           
            params,
            withCredentials: true,
            timeout: 30000
        })
    },
    p (url, data) {
        
        return axios({
            method: 'post',
            url: url,
            data: data,
            timeout: 30000,
            withCredentials: true,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    }
}
