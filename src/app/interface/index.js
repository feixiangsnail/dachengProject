import { showErrMsg} from "../common/utils.js";
export default {
    data() {
        return {
            selectIndex: 0,
            interfaces: [],
            curInterface:{},
            inerfaceAdress: '接口地址',
            callResult:''
        }
    },
    created() {
        this.getInterfaces();
    },
    methods: {
        downloadDemo() {           
        location.href=location.href.substring(0,location.href.indexOf('#')-1)+this.curInterface.IDemo  },
        getInterfaces() {
            let that = this;
            $.ajax({
                type: "post",
                data: null,
                url: "/application/getclientjson",
                dataType: "json",
                timeout: 20000,
                success: function (d) {
                    if (d.code == 55) {
                        showErrMsg(that, 55, "token验证失效，请重新登录");
                        that.$router.push({ path: "/login" });
                        return;
                    }
                    that.interfaces = d.data ||[];
                    if(that.interfaces.length) that.curInterface = that.interfaces[0];
                    console.log(d, 'interface')
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                    showErrMsg(that, textStatus);
                }
            });



        },
        callInterface(){
            let that = this;
            let curInterface = this.curInterface;
            console.log('https://'+curInterface.IIP+":"+curInterface.IPort+curInterface.IPath,'ddd2')
            $.ajax({
                type: this.callInterface.Type,
                data: null,
                url: 'https://'+curInterface.IIP+":"+curInterface.IPort+curInterface.IPath,
                dataType: "json",
                timeout: 20000,
                success: function (d) {
                    alert(111)
                    that.callResult = d;
                  
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(222)
                    that.callResult = errorThrown;
                   
                }
            });

        },
        chooseInterface(){
           
            this.curInterface = this.interfaces[this.selectIndex];
           
        }
    }
}

