/*
 * @description 本库只做模板和模板相关的一些方法
 * @version hmd v3.0.0
 * @author 冀海云
*/

!function(global,factory){
	typeof module === 'object' && module.exports === 'object' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.hmd = factory());
}(this,function(){
	'use strict';
	var __obj = {},
		toString = __obj.toString,
		version = '3.0.0',
		__fn = function(){};
	function _Class(selector){
		return new _Class.fn.init(selector);
	}
	_Class.fn = _Class.prototype = {
		constructor : _Class,
		each : function(callback){
			var selector = this.selector;
			if(selector){				
				for(var index in selector){
					callback.call(selector[index],index,selector[index]);
				}
			}
		}
	};

	_Class.extend = _Class.fn.extend = function(){
		var obj = arguments[0] || {},
			i = 1,
			len = arguments.length;
		if(arguments.length == i){
			obj = this;
			i--;
		}

		for(;i<len;i++){
			var args = arguments[i];
			for(var index in args){
				obj[index] = args[index];
			}
		}
		return obj;
	}
	/*
	 * @description 为构造函数添加方法
	 */
	_Class.extend({
		//键值对的一个版本
		expando : 'hmd'+(version+Math.random()).replace(/\D/g,''),
		each : function(selector,callback){
			selector = selector || [];
			callback = callback || _fn;
			if(typeof callback !== 'function'){
				callback = _fn;
			}
			
			for(var index in selector){
				callback.call(selector[index],index,selector[index]);
			}
		},
		send : function(obj,callback){
			var url = obj.url,
				type = obj.type || 'get',
				data = obj.data || {},
				async = obj.async == 1 ? false : true,
				dataType = obj.dataType || 'string',
				self = this;
			if(!!$("#customerName")[0]){
                data.token = $("#customerName").attr("_token")
			}

			$.ajax({
				url : url,
				type : type,
				data : data,
				async : async,
				dataType : dataType,
				success : function(msg){
					self.valdateLogin(msg,self,callback)
					//callback.call(self,msg);
				},
				error : function(e,t){
					console.log(e,t)
				}
			});
		},
		/*验证登录超时*/
        valdateLogin:function(data,context,callback){
            if(data.code === "104001"){
                hmd.component({
                    temp: '_login_temp',
                    id: 'root'
                })
            }else{
            	callback.call(context,data);
            }
        },
		ws : function(url,callback){
			var self = this;
			if ("WebSocket" in window){
		         console.log("WebSocket is supported by your Browser!");
		         var ws = new WebSocket(url);
		         ws.onopen = function(){
		         	console.log("Message is sent...");
		         }
		         
		         ws.onmessage = function (evt){
		         	var msg = typeof evt === 'string' ? eval('('+evt.data+')') : evt;
			        callback.call(this,msg);
			        ws.send("Message to send");
		         }
		         ws.onclose = function(event){
		         	console.log("Connection is closed...",event);
		         }
		         ws.onerror = function(event){
		         	console.log("Error: ",event);	
		         }
		         
		      }
		      else
		      {
		         console.log("WebSocket NOT supported by your Browser!");
		      }
		},
		getJSON : function(url,callback){
			var self = this;
			$.getJSON(url,function(response){
				callback.call(self,response);
			})
		},
		/*
		 * @description 在页面元素上保存键值对
		 * @eg:hmd.data(element,'test','aaa')
		 */
		data : function(element,key,value){
			if(value){
				if(!element[this.expando]){
					element[this.expando] = {};
				}
				element[this.expando][key] = value;
			}else{
				return element[this.expando][key];
			}
		},
		/*
		 * @description 返回数组最大值
		*/
		max : function(arr){
			return Math.max.apply({},arr);
		},
		/*
		 * @description 返回数组最小值
		*/
		min : function(arr){
			return Math.min.apply({},arr);
		},
		/*
		 * @description 判断对象是否为空对象
		*/
		isEmptyObject : function(obj){
			for (var p in obj) {
				return false;
			}
			return true;
		},
		/*
		 * @description 判断类型
		*/
		type : function(obj){
			var str = toString.call(obj).replace(/[\[\]]/g,''),
				arr = str.split(' ');
			return arr[1].toLowerCase();
		},
		single : function(arr,index){
			var hash = {},
				ret = [];		
			if(arguments.length == 1){
				for(var i=0,len=arr.length;i<len;i++){
					var item = arr[i],
						temp = (typeof item) +item
					if(hash[temp] !== 1){
						hash[temp] = 1;
						ret.push(item);
					}
				}
			}else{
				for(var i=0,len=arr.length;i<len;i++){
					var item = arr[i],
						oindex = item[index],
						temp = (typeof oindex) + oindex;
					if(hash[temp] !== 1){
						hash[temp] = 1;
						ret.push(item);
					}
				}
			}
			
			return ret;
		},
		/*
		 * @description 服务放到此处
		 */
		service : {},
		/*
		 * @description 第三方控件存放处
		 */
		plugin : {},
		
		/*
		 * @description 公共方法
		 */
		methods : {},	
		/*
		 * @description 模板库
		*/	
		template : {},
		/*
		 * @description 路由
		*/
		router : {},
		/*
		 * @description 处理模板中转
		*/		
		operateTemplate : function(_temp,callback){
			callback.call(_temp);			
		},
		/*
		 * @description 根据script标签获取模板
		*/
		operateTemplateByScript : function(id,data){			
			var $script = $('#'+id),
				destination_id = $script.attr('for'),
				$destination = $('#'+destination_id),
				datasource = $script.attr('data-source'),
				_html = $script.text(),
				reg = /\{\{([a-z0-9_-]+)\}\}/g,
				_arr = []; 
			this.each(data,function(index,element){
				_arr.push(_html.replace(reg,function($1,$2){					
					return element[$2];	
				}));
			});
			$destination.html(_arr.join(''));
		},
		/*
		 * @description 根据页面元素配置进行模板配置
		*/
		operateTemplateByHTML : function(){
			var _temp = this.template,
				self = this;		
			this.operateTemplate(_temp,function(){
				hmd.each(this,function(index,element){
					(function(i){
						element.call(self,i);
					}(index));				
				});
			})
		},
		/*
		 * @description 根据属性获取元素
		 * @param attr 属性
		 * @param _parent 寻找元素的范围  为jquery对象
		 * @return 返回一个数组
		*/
		getElementByAttr : function(attr,$parent){
			$parent = $parent || $('body');
			return $parent.find('['+attr+']');
		},
		/*
		 * @description 加载js文件
		 */
		
		getScript : function(url,callback,nameSpace){
			var doc = document,
				head = doc.getElementsByTagName('head')[0],
				script = doc.createElement('script'),
				self = this;
			script.type = 'text/javascript';
			script.onload = script.onreadystatechange = function(){
				if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete' ){
					if(callback){
						nameSpace = nameSpace || {};
						callback.call(self,nameSpace);
					}
					// Handle memory leak in IE
					script.onload = script.onreadystatechange = null;
				}
			};
			script.src = url;
			head.appendChild(script);
		},
		
		require : function(script_arr,callback){
			var self = this;
			if(script_arr.length){
				if(script_arr.length == 1){
					self.getScript(script_arr[0],callback);
				}else{
					this.getScript(script_arr.shift(),function(){
						if(script_arr.length == 1){
							self.getScript(script_arr[0],callback);
						}else if(script_arr.length > 1){
							self.require(script_arr,callback);
						}
					});
				}
			}else{
				callback();
			}
		},
		/*
		 * @description 把location的search转换成对象
		 * @param s 表示search
		 */
		changeLocationSearchToObject : function(s){
			var arr = s.split('&'),
				obj = {};
			$(arr).each(function(index,element){
				var el = element.split('='),
					_key = el[0],
					_value = el[1];
				obj[_key] = _value;
			});
			return obj;
		},
		trim : function(obj){
			obj = obj || {};
			var str = obj.str || '',
				type = obj.type || 'all',
				_config = {
					l : /^\s+/g,
					r : /\s+$/g,
					all :/\s+/g
				},
				reg = new RegExp(_config[type]);
			return str.replace(reg,'')

		}
	});	
 
 /*
  * @description 处理模板
 */		
 !function(__class){	
 	var __tag_obj = {
 		tag_arr : [],
 		html_arr : [],
 		script_arr : [],
 		script_url : './../script/Controller/'
 	}
 	/*
	 * @description 根据id获取模板内容
	 * @param id
 	*/
 	function getTemplateContentById(id){
 		var $obj = $('#'+id),
 			txt = $obj.text() || $obj[0].innerHTML;
 		return txt.replace(/[\t\r\n]/g,'');	
 	}

 	function analysisTemplate(temp){ 		
 		var reg = /<([\w-]+)\s+([^<>\\\/]{0,})\s{0,}\/>/g,
 			_res,_sub; 	
 		
 		while(_res = reg.exec(temp)){
 			_sub = _res[1].substring(_res[1].indexOf('-')+1);
 			__tag_obj.tag_arr.push(_sub);
 			__tag_obj.script_arr.push(__tag_obj.script_url+_sub+'.js')
 		}

 		return __tag_obj.tag_arr;
 	} 	

 	function component(obj){
 		__tag_obj.tag_arr = [];
 		__tag_obj.html_arr = [];
 		__tag_obj.script_arr = [];
 		obj = obj || {};
 		var temp = obj.temp,
 			id = obj.id,
 			$obj = $('#'+id),
 			_content = getTemplateContentById(temp),
 			_arr = analysisTemplate(_content),
 			methods = __class.methods,
 			_element;
 		for(var index in _arr){
 			_element = _arr[index];
 			$.ajax({
 				url : methods.loadUrl(_arr[index]),
 				async : false,
 				success : function(h){
 					__tag_obj.html_arr.push(h)
 				}
 			})
 			
 		} 	
 		$obj.html(__tag_obj.html_arr.join(''));
 		hmd.require(__tag_obj.script_arr);
 	}

	__class.extend({
		component : component
	})
 }(_Class);

	var init = _Class.fn.init = function(selector){
		if(arguments.length == 0){
			this.selector = null;				
		}else{
			this.selector = selector;
		}		
		return this;
	};

	init.prototype = _Class.fn;

	return _Class;
})