hmd.extend(hmd.service,{
    //port:"http://www.10000dai.com",
//  port:"http://10.166.97.177:8802",
    port:"http://10.166.97.110:8802",
    // port:"10.167.200.153",
	getData : function(callback){
		hmd.send({
			url : './../script/Json/data.json',
			dataType : 'json'
		},callback)
	},
	/*发送验证码接口*/
    checkForm:function (callback) {
		var obj = {
			url:this.port+"/repayment/security_code",
			type:"POST",
			data:{
                idNumber:$.trim($("#idCard").val()),
                phoneNumber:$.trim($("#tel_num").val())
			},
			dataType:"json"
		};
		hmd.send(obj,callback);
    },
	/*登录接口*/
	login:function (callback) {
		var obj = {
			url:this.port+"/repayment/login",
			type:"POST",
			data:{
                idNumber:$.trim($("#idCard").val()),
                phoneNumber:$.trim($("#tel_num").val()),
                securityCode:$.trim($("#check_num").val())
			},
			dataType:"json"
		};
		hmd.send(obj,callback);
    },
	/*合同信息页面接口*/
    contract:function (callback) {
		var obj = {
			url:this.port+"/repayment/contract",
			type:"POST",
			data:{
				token:$.cookie("data_token")
			},
			dataType:"json"
		};
		hmd.send(obj,callback);
    },
	/*合同信息操作充值-获取跳转URL*/
    generateUrl:function (_data,callback) {
        var obj = {
            url:this.port+"/repayment/generate_url",
            type:"POST",
            data:_data,
            dataType:"json"
        };
        hmd.send(obj,callback);
    },
    /*充值明细页面接口*/
    payDetail:function (_data,callback) {
		var obj = {
			url:this.port+"/repayment/pay_detail",
			type:"POST",
			data:_data,
			dataType:"json"
		};
		hmd.send(obj,callback);
    },
	/*注销接口*/
    logout:function (callback) {
		var obj = {
			url:this.port+"/repayment/logout",
			type:"POST",
			data:{
                token:$.cookie("data_token")
			},
			dataType:"json"
		};
		hmd.send(obj,callback);
    },
	/*验证是否已经登录的接口*/
	hasLogin:function (callback) {
		var obj = {
			url:this.port+"/repayment/has_login",
			type:"POST",
			data:{
                token:$.cookie("data_token"),
				loginFlag:$.cookie("login_flag")
			},
			dataType:"json"
		};
		hmd.send(obj,callback);
    },
    /*生成首页的TOKEN接口*/
    generateToken:function (callback) {
        var obj = {
            url:this.port+"/repayment/generateToken",
            type:"POST",
            dataType:"json"
        };
        hmd.send(obj,callback);
    },
	/*生成图片验证码接口*/
    verificationCode:function (callback) {
		var obj = {
            url: this.port+"/repayment/verificationCode?token="+$.cookie("daichang_data_token"),
            dataType: "text"
        };
		hmd.send(obj,callback);
    },
	/*代偿2.0登录*/
    hcLogin:function (_data,callback) {
		var obj = {
            url: this.port+"/repayment/hclogin",
            type: "POST",
            dataType: "json",
            data: _data
        };
		hmd.send(obj,callback);
    },
	/*代偿2.0合同信息*/
    hcContract:function (_data,callback) {
		var obj = {
			url: this.port+"/repayment/hcContract",
			type:"POST",
			dataType:"json",
			data:_data
		};
        hmd.send(obj,callback);
    },
	/*代偿2.0充值明细*/
    hcPayDetail:function (_data,callback){
        var obj = {
            url:this.port+"/repayment/hcPay_detail",
            type:"POST",
            data:_data,
            dataType:"json"
        };
        hmd.send(obj,callback);
	},
	/*获取认证按钮跳转URL*/
	checkUrl:function (_data,callback){
		var obj = {
            url:this.port+"/repayment/check_url",
            type:"POST",
            data:_data,
            dataType:"json"
        };
        hmd.send(obj,callback);
	}
});
