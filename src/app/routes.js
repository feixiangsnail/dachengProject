import Vue from 'vue';
import VueRouter from 'vue-router';
import { setCookie, getCookie, clearCookie } from './common/utils.js'
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/', name: '', component: resolve => require(['./home/index.vue'], resolve),
            children: [
                { path: '/', component: resolve => require(['./operator/index.vue'], resolve), name: '服务申请商管理', meta: { requiresAuth: true } },
                { path: '/index', component: resolve => require(['./operator/index.vue'], resolve), name: '服务申请方管理',  meta: { requiresAuth: true } },
                { path: '/application', component: resolve => require(['./application/index.vue'], resolve), name: '应用管理' },
                { path: '/logs', component: resolve => require(['./logs/index.vue'], resolve), name: '日志查询' },                
                { path: '/charts', component: resolve => require(['./charts/index.vue'], resolve), name: '应用统计' },
                // { path: '/interface', component: resolve => require(['./interface/index.vue'], resolve), name: '接口管理' },
                { path: '/opsLogs', component: resolve => require(['./opslogs/index.vue'], resolve), name: '运维日志' }
            ]
        },
        { path: '/login', component: resolve => require(['./login/login.vue'], resolve), name: '登录' },
        // { path: '/signup', component: resolve => require(['./login/signup.vue'], resolve), name: '注册' },
        { path: '/test', component: resolve => require(['./test/index.vue'], resolve), name: '测试页' }
        
    ]
});
router.beforeEach((to, from, next) => {
    if (to.path === '/login') { next() }
    else {
        let state = router.app.$options.store.state;
        try {
            let usr_info = JSON.parse(getCookie('usr_info'));
            
            state.usr_token = usr_info.usr_token;
            state.operator_name = usr_info.operator_name;
            state.is_super = usr_info.is_super;
            state.userId = usr_info.userId;
            state.OPId = usr_info.OPId;
            if (to.meta.requiresAuth && (!state.is_super)) {
                next({ path: '/application' })
            } else {
                next();
            }
        }
        catch (err) {
            console.log(err,'err')
            state.usr_token = '';
            state.operator_name = '';
            state.is_super = '';
            next({ path: '/login' });
        }

    }







});
export default router
