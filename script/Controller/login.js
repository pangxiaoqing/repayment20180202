!function(methods){
	var service = hmd.service,
	    methods = hmd.methods;
    var $root = $('#root');
    var $contentBox = $("#contentBox");
    var $idCard= $("#idCard");
    var $telNum = $("#tel_num");
    var $checkNum = $("#check_num");
    var $daichangContractCode = $("#daichangContractCode");
    var $daichangIdCard = $("#daichangIdCard");
    var $daichangTelNum = $("#telNum");
    var $info = $("#info");
    var $loginSubmit = $("#login_submit");
    var $sentCheckBtn = $("#send_check_num");
    var $daichangLoginSubmit = $("#daichangLoginSubmit");
    var $daichangImg = $("#daichangImg");
    var $daichangInfo = $("#daichangInfo");
    var $refresh = $("#refresh");
    attrDisabled($sentCheckBtn,true);
    var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//     var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}$)/;
    var regTelNum = /^1[1-9]\d{9}$/;
    var obj = {
        regIdCard:regIdCard,
        regTelNum:regTelNum
    };

    /*登录页tab切换*/
    $("#contentBox").find(".box:first").show();
    $("#nav a").on("click",function(){
        var index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parent().next().find(".box").hide().eq(index).show();
        $(this).addClass("active").siblings().removeClass("active");
    });

    /*代偿2.0登录按钮点击事件（登陆方式一）*/
    function daichangContractCode() {
        var contractCode = $daichangContractCode.val();
        if(contractCode === ""){
            $daichangInfo.show().html("请输入您的合同编号！");
            return false;
        }
        if(contractCode){
            $daichangInfo.hide();
            return true;
        }
        return true;
    }
    function daichangIdCard() {
        var idCard = $daichangIdCard.val();
        if(idCard === ""){
            // $telNum.focus();
            $daichangInfo.show().html("请输入身份证号码！");
            return false;
        }
        if(idCard && !(obj.regIdCard.test(idCard))){
            // $telNum.focus();
            $daichangInfo.show().html("请输入正确的身份证号码！");
            return false;
        }
        if(idCard && obj.regIdCard.test(idCard)){
            $daichangInfo.hide();
            return true;
        }
        return true;
    }
    function imgCode() {
        var imgCode = $daichangTelNum.val();
        if(imgCode === ""){
            $daichangInfo.show().html("请输入验证码！");
            return false;
        }
        if(imgCode){
            $daichangInfo.hide();
            return true;
        }
        return true;
    }
    /*代偿2.0点击图形验证码*/
    function daichangImg(){
        $refresh.click(function () {
            $daichangImg.attr("src",service.port+"/repayment/verificationCode?token="+$.cookie("daichang_data_token")+'&time='+new Date());
        });
    }
    function daichangLoginSubmit(){
        $daichangLoginSubmit.click(function(){
            daichangContractCode();
            daichangIdCard();
            imgCode();
            if(daichangContractCode() && daichangIdCard() && imgCode()){
                service.hcLogin({
                    customerCertNum:$("#daichangIdCard").val(),
                    contractCode:$("#daichangContractCode").val(),
                    verificationCode:$("#telNum").val().toUpperCase(),
                    token:$.cookie("daichang_data_token")
                },function (data) {
                    if(data.code === "2000"){
                        // data.loginFlag = "0"
                        $.cookie("login_flag",data.loginFlag);
                        methods.logout(function(){
                            $.cookie("data_token",data.token);
                            $.cookie("data_customerName",data.customerName);
                            hmd.component({
                                temp : 'content',
                                id : 'root'
                            })
                        });
                    } else {
                        $daichangInfo.show().html(data.desc);
                    }
                })
            }
        });
    }

    /*点击登录事件*/
    function submit() {
        $('#login_submit').click(function(){
            // attrDisabled($loginSubmit,false);
            if($("#check_num").val()==="" || $("#check_num").val()===null){
                console.log(11123);
                $info.show().html("验证码不能为空！");
                // attrDisabled($loginSubmit,true);
            }else{
                // attrDisabled($loginSubmit,false);
                console.log(222);
                service.login(function (data) {
                    if(data.code==="2000"){
                        $.cookie("login_flag",data.loginFlag);
                        methods.logout(function(){
                            $.cookie("data_token",data.token);
                            $.cookie("data_customerName",data.customerName);
                            hmd.component({
                                temp : 'content',
                                id : 'root'
                            })
                        });
                    }else{
                        $info.show().html("验证码填写错误，请重新输入！");
                    }
                });
            }
        });
    }


    /*---------点击发送验证码事件-----------*/

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
    var objKeyUp = {
        0:$idCard,
        1:$telNum
    };
    function initInputEvent(){
        for(key in objKeyUp){
            objKeyUp[key].keyup(function () {
                checkForm();
            })
        }
    }

    /*disabled*/
    function attrDisabled(id,boolean) {
        id.attr("disabled",boolean);
    }
    /*所有表单的判断*/
    function checkForm() {
        if(idCard() && telNum()){
            attrDisabled($sentCheckBtn,false);
            $sentCheckBtn.addClass("code_button_cur");
            /*attrDisabled($idCard,true);
            attrDisabled($telNum,true);*/
        }else{
            attrDisabled($sentCheckBtn,true);
            $sentCheckBtn.removeClass("code_button_cur");
        }
    }
    /*验证码定时器*/
    var InterValObj; /*timer变量，控制时间*/
    var curCount = 180;
    function SetRemainTime() {
        if(curCount == 0){
            window.clearInterval(InterValObj);/*停止计时器*/
            $sentCheckBtn.addClass("code_button_cur");
            $sentCheckBtn.removeClass("code_button_cur_disabled");
            $sentCheckBtn.attr("disabled",false);
            $sentCheckBtn.text("发送验证码");
            curCount = 180;
        }else{
            curCount --;
            /*console.log(curCount);*/
            $sentCheckBtn.removeClass("code_button_cur");
            $sentCheckBtn.addClass("code_button_cur_disabled");
            $sentCheckBtn.attr("disabled",true);
            $sentCheckBtn.text('('+curCount+')s');
        }
    }

    /*发送验证码事件*/
    function submitCheckForm() {
        $sentCheckBtn.click(function(){
            /*发送验证码的接口*/
            service.checkForm(function (data) {
                if(data.code === "2000"){
                    /*启动计时器timer处理函数，1秒执行一次*/
                    InterValObj = window.setInterval(SetRemainTime, 1000);
                    /*验证码60s重新发送*/
                    /*methods.setTime("#send_check_num",60);*/
                    $info.show().html("验证码发送成功！");
                }else{

                    /*$info.show().html("身份证号不存在或手机号不匹配，请重新输入！");*/
                    $info.show().html(data.desc);
                    /*attrDisabled($idCard,false);
                    attrDisabled($telNum,false);*/
                    attrDisabled($sentCheckBtn,true);
                    $sentCheckBtn.removeClass("code_button_cur");
                }
            });
        })
    }

    /*判断在文本框输入时，键盘松开时其他符号输入为空*/
    function keyUpEvent() {
        $idCard.keyup(function () {
            this.value = this.value.replace(/[^\dxX]/g,'');
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
    var objFocusBlur = {
        0:$idCard,
        1:$telNum,
        2:$checkNum,
        3:$daichangContractCode,
        4:$daichangIdCard,
        5:$daichangTelNum
    };
    function focusBlur() {
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
        }
    }


    /*初始化*/
    function init(){
        focusBlur();
        keyUpEvent();
        initInputEvent();
        submit();
        submitCheckForm();
        service.generateToken(function (data) {
            if(data.code === "2000"){
                $.cookie("daichang_data_token",data.token);
                daichangImg();
                daichangLoginSubmit();
                $daichangImg.attr('src',service.port+'/repayment/verificationCode?token='+$.cookie("daichang_data_token"))
            }
        })
    }
    init();
}(hmd.methods);
