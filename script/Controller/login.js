!function(methods){
    var url_arr = [
      '../script/Service/AppCommonService.js',
      '../script/Method/AppCommonMethod.js',
      '../script/Router/AppCommonRouter.js'
    ];

    var service = hmd.service;
    hmd.require(url_arr,function () {
        /*点击登录事件*/
        var $root = $('#root');
        var $idCard= $("#idCard");
        var $telNum = $("#tel_num");
        var $checkNum = $("#check_num");
        /*点击登录事件*/
        function submit() {
            $('#login_submit').click(function(){
                /*点击登录接口*/
                service.login(function (data) {
                    console.log(data);
                });

                hmd.component({
                    temp : 'content',
                    id : 'root'
                })
            });
        }


        /*点击发送验证码事件*/
        function checkForm() {

        }
        /*var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var regTelNum = /^1[1-9]\d{9}$/;
        var obj = {
            regIdCard:regIdCard,
            regTelNum:regTelNum
        }

        function idCard() {
            var id = $("#idCard").val();
            // console.log(id);
            // console.log(obj.regIdCard.test(id));
            if(id === ""){
                $("#idCard").focus();
                $("#info").show().html("请输入您的身份证号码！");
                return false;
            }
            if(id && !(obj.regIdCard.test(id))){
                $("#idCard").focus();
                $("#info").show().html("请输入正确的身份证号码！");
                return false;
            }
            if(id && obj.regIdCard.test(id)){
                $("#info").hide();
                return true;
            }
            flag = true;
            return true;
        }
        function telNum() {
            var tel = $("#tel_num").val();
            if(tel === ""){
                $("#tel_num").focus();
                $("#info").show().html("请输入您手机号！");
                return false;
            }
            if(tel && !(obj.regTelNum.test(tel))){
                $("#tel_num").focus();
                $("#info").show().html("请输入正确的手机号！");
                return false;
            }
            if(tel && obj.regTelNum.test(tel)){
                $("#info").hide();
                return true;
            }
            flag2 = true;
            return true;
        }*/
        /*判断表单身份证号和手机号正确之后发送验证码可点击，否则不可点击*/

        // console.log(idCard());
        /*function checkForm(){
            $("#send_check_num").attr("disabled",true);

            $("#idCard").blur(function () {
                idCard();
            });
            $("#tel_num").blur(function () {
                telNum();
            });
            console.log(typeof flag);
            console.log(flag2);
            if(flag && flag2){
                $("#send_check_num").addClass("code_button_cur");
                $("#send_check_num").attr("disabled",false);
            }
            /!*if(idCard()){
                if(telNum()){
                    $("#send_check_num").addClass("code_button_cur");
                    $("#send_check_num").attr("disabled",false);
                }
            }*!/
        }*/

        /*function checkForm() {
            $("#send_check_num").click(function () {
                $("#send_check_num").addClass("code_button_cur");
                if(idCard()){
                    if(telNum()){
                        $("#idCard").attr("disabled",true);
                        /!*发送验证码接口*!/
                        service.checkForm(function (data) {
                            console.log(data);
                        })
                    }
                }
            });
        }*/
        /*判断在文本框输入时，键盘松开时其他符号输入为空*/
        function keyUpEvent() {
            $idCard.keyup(function () {
                this.value = this.value.replace(/[^\da-z]/g,'');
            });
            function keyUp(id) {
                id.keyup(function () {
                    this.value = this.value.replace(/[^\d]/g,'');
                });
            }
            keyUp($telNum);
            keyUp($checkNum);
        }
        /*鼠标输入时value消失，鼠标离开时value显示*/
        function focusBlur(id) {
            id.focus(function () {
                this.value = '';
            });
            id.blur(function () {
                if(this.value === ''){
                    this.value = id.attr("value");
                }
            });
        }







        /*初始化*/
        function init(){
            focusBlur($idCard);
            focusBlur($telNum);
            focusBlur($checkNum);
            keyUpEvent();
            checkForm();
            submit();
        }
        init();
    })
}(hmd.methods);