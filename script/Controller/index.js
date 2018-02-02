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
			$root = $('#root');
		
		function routerToLoginOrNo(){
			$root.load(methods.loadUrl('login'),function(){
				hmd.require(['./../script/Controller/login.js'])
			})
		}

		var init = (function(){
			return function(){
				methods.addKeyUpToInput();
				routerToLoginOrNo()
			}
		}());

		init();
	})
}()