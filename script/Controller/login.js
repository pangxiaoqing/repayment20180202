!function(methods){

        var service = hmd.service;
        var $root = $('#root');
        var $idCard= $("#idCard");
        var $telNum = $("#tel_num");
        var $checkNum = $("#check_num");
        var $info = $("#info");
        var $sentCheckBtn = $("#send_check_num");

        $sentCheckBtn.attr("disabled",false);
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
        var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var regTelNum = /^1[1-9]\d{9}$/;
        var obj = {
            regIdCard:regIdCard,
            regTelNum:regTelNum
        }
        function idCard() {
            var id = $idCard.val();
            // console.log(id);
            // console.log(obj.regIdCard.test(id));
            if(id === ""){
                // $idCard.focus();
                $info.show().html("请输入您的身份证号码！");
                return false;
            }
            if(id && !(obj.regIdCard.test(id))){
                // $idCard.focus();
                $info.show().html("请输入正确的身份证号码！");
                return false;
            }
            if(id && obj.regIdCard.test(id)){
                $info.hide();
                return true;
            }
            return true;
        }
        function telNum() {
            var tel = $telNum.val();
            if(tel === ""){
                // $telNum.focus();
                $info.show().html("请输入您手机号！");
                return false;
            }
            if(tel && !(obj.regTelNum.test(tel))){
                // $telNum.focus();
                $info.show().html("请输入正确的手机号！");
                return false;
            }
            if(tel && obj.regTelNum.test(tel)){
                $info.hide();
                return true;
            }
            return true;
        }
        function initInputEvent(){
            $idCard.on('input propertychange',function(){
                checkForm();
            });
            $telNum.on('input propertychange',function(){
                checkForm();
            });
        }
        
        /*$("#idCard").on('change',function(){
            console.log(12);
        })*/

        function checkForm() {
            console.log(idCard());
                console.log(telNum());
            if(idCard() && telNum()){
                $sentCheckBtn.attr("disabled",false);
                $sentCheckBtn.addClass("code_button_cur");
                $sentCheckBtn.click(function(){
                    $idCard.attr("disabled",true);
                    $telNum.attr("disabled",true);
                    alert($telNum.val());
                })
            };
        }
        
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
            initInputEvent();
            // checkForm();
            submit();
        }
        init();
}(hmd.methods);