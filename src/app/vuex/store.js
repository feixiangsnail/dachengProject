import Vue from 'vue';
import Vuex from 'vuex';
import {setCookie,getCookie,clearCookie} from '../common/utils.js'
Vue.use(Vuex);
const state ={
    count:32,
    operator_name:'',
    usr_token:'',
    is_super:''
}
const mutations = {
    logOut(state){
        state.operator_name = '';
        state.usr_token = '';
        state.is_super = '';
        clearCookie('usr_info');
    },
    logIn(state,operator_name,use_token,is_super){
        state.operator_name = operator_name;
        state.use_token = use_token;
        state.is_super = is_super;
    }
}
export default new Vuex.Store({
    state,
    mutations
})







