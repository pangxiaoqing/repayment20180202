!function(methods){

        var service = hmd.service;
        var $root = $('#root');
        var $contentBox = $("#contentBox");
        var $idCard= $("#idCard");
        var $telNum = $("#tel_num");
        var $checkNum = $("#check_num");
        var $info = $("#info");
        var $sentCheckBtn = $("#send_check_num");
        var inputReg = $contentBox.find('input[inputReg="reg"]');

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


        /*---------点击发送验证码事件-----------*/
        var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var regTelNum = /^1[1-9]\d{9}$/;
        var obj = {
            regIdCard:regIdCard,
            regTelNum:regTelNum
        };
        /*判断身份证号格式是否正确的idCard方法*/
        function idCard() {
            var id = $idCard.val();
            if(id === ""){
                $info.show().html("请输入您的身份证号码！");
                return false;
            }
            if(id && !(obj.regIdCard.test(id))){
                $info.show().html("请输入正确的身份证号码！");
                return false;
            }
            if(id && obj.regIdCard.test(id)){
                $info.hide();
                return true;
            }
            return true;
        }
        /*判断手机号格式是否正确的telNum方法*/
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
        /*一个表单实时判断所有表单的值是否为true*/
        function initInputEvent(){
            $idCard.keyup(function () {
                checkForm();
            });

            $telNum.keyup(function () {
                checkForm();
            })
        }
        /*disabled*/
        function attrDisabled(id,boolean) {
            id.attr("disabled",boolean);
        }
        /*所有表单的判断*/
        function checkForm() {
            console.log(idCard());
            console.log(telNum());

            if(idCard() && telNum()){
                attrDisabled($sentCheckBtn,false);
                $sentCheckBtn.addClass("code_button_cur");
                attrDisabled($idCard,true);
                attrDisabled($telNum,true);
                $sentCheckBtn.click(function(){


                    alert($telNum.val());
                })
            }
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
                if(this.value === id.attr("value")){
                    this.value = '';
                }else {
                    this.value = this.value;
                }
            });
            id.blur(function () {
                if(this.value === ''){
                    this.value = id.attr("value");
                }else {
                    this.value = this.value;
                }
            });
        }

        for(var i=0,len=inputReg.length;i<len;i++){
            focusBlur($(inputReg[i]));
        }



        /*初始化*/
        function init(){
            keyUpEvent();
            initInputEvent();
            submit();
        }
        init();
}(hmd.methods);
/*
for(key in objFocusBlur){
    objFocusBlur[key].focus(function () {
        var labelIdCard = $(this).siblings('label');
        labelIdCard.hide();
    });
    objFocusBlur[key].blur(function () {
        var labelIdCard = $(this).siblings('label');
        if(this.value === ""){
            labelIdCard.show();
        }
    })
}*/
