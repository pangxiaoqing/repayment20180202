!function(){
	var url_arr = [	
		'./../script/Libs/jquery-ui.min.js',
		'./../script/Libs/timePicker/jquery-ui-timepicker-addon.js',
		'./../script/Libs/timePicker/jquery-ui-timepicker-zh-CN.js',
		'./../script/Libs/bootstrap.js',
		'./../script/Libs/jqPaginator.js',
		'./../script/Router/AppCommonRouter.js',
		'./../script/Service/AppCommonService.js',
		'./../script/Method/AppCommonMethod.js'

	];

	hmd.require(url_arr,function(){
		var methods = hmd.methods,
			$root = $('#root'),
			service = hmd.service;
		
		function routerToLoginOrNo(){
			if($.cookie("data_token")===""){
                $root.load(methods.loadUrl('login'),function(){
                    hmd.require(['./../script/Controller/login.js'])
                })
			}
		}
		/*验证是否已经登录的接口*/
		function hasLogin() {
            service.hasLogin(function(data){
                // if(data.code === "2000") {
                    if (data.token) {
                        hmd.component({
                            temp: 'content',
                            id: 'root'
                        })
                    } else {
                        hmd.component({
                            temp: '_login_temp',
                            id: 'root'
                        })
                    }
                // }
            });
        }

		function init() {
            hasLogin();
            methods.addKeyUpToInput();
            routerToLoginOrNo();
        }

		init();
	})
}()