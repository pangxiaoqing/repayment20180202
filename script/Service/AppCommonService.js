hmd.extend(hmd.service,{	
	getData : function(callback){
		hmd.send({
			url : './../script/Json/data.json',
			dataType : 'json'
		},callback)
	},
    checkForm:function (callback) {
		var obj = {
			url:"http://ip/repayment/security_code",
			type:"POST",
			data:{
                idNumber:$.trim($("#idCard").val()),
                phoneNumber:$.trim($("#tel_num").val())
			},
			dataType:"json"
		};
		hmd.send(obj,callback);
    },
	login:function (callback) {
		var obj = {
			url:"http://ip/repayment/login",
			type:"POST",
			data:{
                idNumber:$.trim($("#idCard").val()),
                phoneNumber:$.trim($("#tel_num").val()),
                securityCode:$.trim($("#check_num").val())
			},
			dataType:"json"
		};
		hmd.send(obj,callback);
    }
});