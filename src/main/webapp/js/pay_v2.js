var pay = {
	init:function () {
		this.bindEle();
		this.radioChk();    //选择支付方式
		this.payRes();
		this.useCoupon();//选择优惠券orCode
		this.couponShow();	//显示优惠码输入框
		this.couponInput();		//输入优惠码效果
		this.jkbCount();	//是否用了极客币
		this.couponDown();//点击显示优惠券
		// 测试弹出框
		this.judged();
	},
	couponsn:0,
	bindEle: function(){
		var _this = this;
		if(isLogin){
			$('#btnPay').on('click', _this.payChoice);
            $("#coinUse").on('click',_this.coinUse);
            $('.alipay-mask .close').on('click',_this.closeAlimask);
            $('.wechat-mask .close').on('click',_this.closeWechatmask);
		}
	},
	judged:function(){
		$("#redolded").bind("click",function(){
			if($(this).attr("checked")=="checked"){
				 	$("#redolded").removeAttr("checked");
				 	$('.btn-pay').addClass("disabled")
					$('.btn-pay').attr("id","");
					$('.btn-pay').attr("disabled","disabled");
			}else{
					$('.btn-pay').attr("id","btnPay");
					//$('#btnPay').on('click', '#btnPay',pay.payChoice);
					$("#redolded").attr("checked",true);
					$('.btn-pay').removeClass("disabled");
			}
		});
	},
	couponDown:function(){
		var lock = true;
		$('.coupon-down>span').eq(0).on("click",function(){
			$('.usecoupon').stop();
			if(lock == true){
				$(this).find('.slid-down').removeClass("slidup").addClass("slidown");
				lock = false;
				$('.usecoupon').slideDown();
				$('.reduce').removeClass("reduce-border-top");
				if( $('.c-type').length>0 && $('.c-type').is(":visible")){
					$('.c-type').fadeIn();
				}
				if( $('.c-type').length<=0){
					if($('.nav>span').eq(1).attr("id") == "active"){
						$('.nothing').hide();
					}else{
						$('.nothing').show();
					}
				}
			} else{
				$(this).find('.slid-down').removeClass("slidonw").addClass("slidup");
				lock = true;
				$('.usecoupon').slideUp();
				$('.reduce').addClass("reduce-border-top");
			}
			
		})
	},
	//优惠券or优惠码切换显示
	useCoupon:function(){
		var payMoney = $("#payMoney"); //总的moeny;
		var paymoneyNumber = parseFloat(payMoney.attr("data-pay"));
		var newNumber;//计算后的金额；
		var cnumber;//优惠券面额；
		var _this = this;
		$('.c-type').each(function(){
			var choose = $(this).attr("select");
			if(choose){
				$(this).addClass("choose").off("click");
                $('.coupon-down>span').eq(1).show();
			}
		})
		$('.c-type').on("click",function(){
			if($(this).attr("select")=="true") return false;
			_this.couponsn = $(this).attr("couponsn");
			if($(this).hasClass("choose") == false){
				$('.coupon-down>span').eq(1).show();
				$('.c-type').removeClass("choose");
				$(this).addClass("choose");
				cnumber =String($(this).find(".c-number").text()); //优惠券面额
	            var valueType =$(this).attr('value_type');
	            if( valueType == 1){
					newNumber = parseFloat(parseFloat(paymoneyNumber)/10)*Number(cnumber);
					var newmoney = paymoneyNumber - newNumber;
	                cnumber = newmoney;
					$('#red-number').html("￥"+parseFloat(newmoney).toFixed(2));
				}else{
					newNumber = paymoneyNumber-cnumber;
					$('#red-number').html("￥"+parseFloat(newmoney).toFixed(2));
				}
				
				if(paymoneyNumber>=cnumber){
					//payMoney.attr("data-pay",newNumber.toFixed(2))
					payMoney.html(newNumber.toFixed(2));
				}else{
					//payMoney.attr("data-pay","0.00")
					payMoney.html("0.00")
				}
	            $('#useCouponMoney').attr('coupon_value',parseFloat(cnumber).toFixed(2));
	            var options = {'coupon':parseFloat(cnumber).toFixed(2)};
	            _this.payMoney(options);
	            lock= false;
			}else{
				$('.c-type').removeClass("choose");
				$('#red-number').html("￥0.00").attr("coupon_value",parseFloat(0).toFixed(2));
                $('#useCouponMoney').attr('coupon_value',0);
                _this.couponsn = 0;
				var options = {'coupon':parseFloat(0).toFixed(2)};
	            _this.payMoney(options);
	            $('.coupon-down>span').eq(1).hide();
			
			}
			
		})
	},
	// 优惠劵显示
	couponShow: function(){
		var _this = this;
		$(".usecoupon>.nav>span").on('click', function() {
			var index = $(this).index();
			$(".usecoupon>.nav>span").removeAttr("id");
			$(this).attr("id","active")
			
			if(index == 0){
				$('#couponId').hide();
				if( $('.c-type').length>0){
					$('.c-type').fadeIn();
				}else{
					$('.nothing').show();
				}
			}else{
				$('.c-type').hide();
				$('#couponId').fadeIn();
				$('#couponInput').val("");
                $('.nothing').hide();
			}
		})
	},
	couponInput: function(){
		var _this = this;
		$('#couponInput').keyup(function(){
			var len = $.trim($(this).val()).length;
			if(len == 8) {
				$('#couponAjax').addClass('on');
				pay.couponCheck();		//验证优惠码
			}else {
				$('#couponAjax').removeClass('on');
				$("#couponAjax").off('click');
			}
		})
		
	},
	// 验证优惠码
	couponCheck: function() {
		var _this = this,
			check = $("#couponAjax"),
			ID = $('#couponInput'),
            order_num = $('#order_num').attr("value"),
            app_id = $('#app_id').val(),
            good_id = $('#good_id').val(),
			tip = $('#couponId .tip');	//提示信息
            $("#couponAjax").off('click');

			$("#couponAjax").on('click', function(e) {
				pay.stopDefault(e);

				var self = $(this),
					IDval = $.trim(ID.val());
			    _this.couponsn=IDval;
				var url="/v1/order/checkcoupon";
				$.ajax({
					type: "get",
					url:url,
					data:{'coupon_sn':IDval,'order_num':order_num,'app_id':app_id,'good_id':good_id},
					dataType:"json",
                    beforeSend: function(){
                        //防重复去掉验证事件
                        $("#couponAjax").off('click');
                        $('#couponAjax').removeClass('on');

                    },
					success:function(res) {
						// code = 200 成功返回
						if(res.code == '200') {
							// 修改样式
							$("#couponId").addClass("pass");
							$("#coupon").removeClass().addClass("coupon-pass");
							// 去掉验证事件
							$("#couponAjax").off('click');
                            $('#couponAjax').removeClass('on');
							// 优惠劵不可取消且不可点
							$("#couponCheck").attr('disabled','disabled');
                            $("#couponInput").attr('disabled','disabled');
							// 提示信息 res.msg 返回提示信息，不管成功与否都有
							tip.text('验证通过').show();
                            $('.coupon-down>span').eq(1).show();

							// 计算实际金额
							res.coupon = res.data.value;
                            $('#useCouponMoney').attr('coupon_value',res.coupon);
                            $('#coupon_sn').val(res.data.coupon_sn);
							var options = {'coupon':res.coupon};
       						_this.payMoney(options);

						} else {
                            $('#coupon_sn').val();
                            $('#couponAjax').addClass('on');
							tip.text(res.msg).show();
						}
					},
					error: function() {
                        $("#couponAjax").on('click');
                        $('#couponAjax').addClass('on');
						//console.log('网络断开，请重新验证');
					},
                    complete: function(){
                    }
				});
			});
		
	},
    //极客币使用（需修改）
    jkbCount:function(){
    	var _this = this;
    	var options;
        var jkbCheck = $("#jkbCheck"),	//是否使用极客币
            jkbMoney = $("#jkbMoney"),
            jkb = $.trim(jkbMoney.text());
        jkbCheck.on('click', function(){
        	if(jkbCheck.is(':checked')) {
	        	jkb = $.trim(jkbMoney.attr('totalMoney'));
	        }else{
	        	jkb = 0;
                $('#jkbMoney').html('');
	        }
            jkbMoney.attr('money',jkb);
	        options = {'jkb':jkb};
	        _this.payMoney(options);
        })

        options = {'jkb':jkb};
       	_this.payMoney(options);
    },
    // 实际支付金额
    payMoney:function(options) {

    	//var jkb = options.jkb || 0;
    	//var coupon = options.coupon || 0;
        var jkb =  $('#jkbMoney').attr('money') || 0;
        var coupon = $('#useCouponMoney').attr('coupon_value') || 0;
        var payMoney = $("#payMoney");
    	var ntotal = parseFloat(payMoney.attr("data-pay"));
        var trueUseCoupon = 0;
        coupon = parseFloat(coupon).toFixed(2);
        if( coupon>0 ){
            if( parseFloat(ntotal) > coupon ) {
                trueUseCoupon = coupon;
            } else {
                trueUseCoupon = ntotal;
            }
            $('#useCouponMoney').html('￥'+parseFloat(trueUseCoupon).toFixed(2));
            ntotal = (ntotal- parseFloat(trueUseCoupon)).toFixed(2);
        }

    	if(parseFloat(jkb) > 0){

            if(ntotal >= parseFloat(jkb)){
                $('#jkbMoney').html('￥'+parseFloat(jkb).toFixed(2));
            }else{
                $('#jkbMoney').html('￥'+parseFloat(ntotal).toFixed(2));
            }

            ntotal = parseFloat(ntotal - parseFloat(jkb)).toFixed(2);

        }

        if(ntotal <= 0){
            ntotal = 0.00;
        }

        payMoney.text(parseFloat(ntotal).toFixed(2));
        //$("#wxPay").text(ntotal);	//微信弹出框金额
        //console.log(jkb,coupon,ntotal);
    },
	radioChk:function(){
		$('#way span').on('click',function(){
			$(this)
				.addClass('active')
				.parent()
				.siblings()
				.find('span')
				.removeClass('active');
		})
	},
	payRes:function(){
		$('#payRes').on('click', 'a', function(){
			$(this)
				.addClass('active')
				.siblings()
				.removeClass('active');
		})
	},
	payChoice: function(){
		if($("#redolded").attr("checked") != "checked") {
			return;
		}else{
            console.log('choice-success');
		}

        // 极客币选项不可改
        $('#jkbCheck').attr('disabled','true');
        $('.jkb-check').css('backgroundColor','#e4e4e4');
		
		var lock = false;
		var way = $('#way span');
		var _this = this;
		way.each(function(index,element){
			var self = $(element);
			if(self.hasClass('active')){
				//业务订单号
                var order_num = $('#order_num').attr("value");
                var _token = $('#_token').val();
                var app_id = $('#app_id').val();
                var uid = $('#uid').val();
                var coinUse = $("#jkbCheck");	// 极客币
                var is_use_coin = 0;
                //var coupon = $("couponCheck");	// 优惠卷
//              var coupon_sn = $('#coupon_sn').val();
				var coupon_sn = pay.couponsn;
                var is_use_coupon = 0;

                if(coinUse.is(':checked')) {
                    is_use_coin = 1;
                }

                if(coupon_sn != '') {
                    is_use_coupon = 1;
                }else{
                    coupon_sn = 0;
                }

				if(self.hasClass('alipay')){
					pay.alipayPop();
					window.open('//pay.'+baseUrl+'/v1/order/pay?uid='+uid+'&app_id='+app_id+'&roof=alipay&order_num='+order_num+'&_token='+_token+'&is_use_coin='+is_use_coin+'&is_use_coupon='+is_use_coupon+'&couponsn='+coupon_sn);
				}else if(self.hasClass('wechat')){

					//微信弹框

					//获取二微码
					var url = '//pay.'+baseUrl+'/v1/order/pay?uid='+uid+'&app_id='+app_id+'&roof=wxpay&order_num='+order_num+'&_token='+_token+'&is_use_coin='+is_use_coin+'&is_use_coupon='+is_use_coupon+'&couponsn='+coupon_sn+'&trade_type=native&is_ajax=1';
					
					$.ajax({
						type: "get",
						url:url,
						data:{},
						beforeSend: function(){
							lock = true;
							$('#btnPay').off('click');
							$('#btnPay').addClass('disabled');
						},
						success: function(data, textStatus){
							//0元
	                        try{
	                            if(!typeof(data.data.pay_status)!= "undefined" && data.data.pay_status == 1){
	                                //pay.alipayPop();
	                                $('#openWin').submit();
	                                return false;
	                            }
	                        }catch (e){

	                        }
                            if(data.code != 200){
                                if (data.msg) alert(data.msg);
                                return false;
                            }
							$('#QRCode').attr("src", data.data.png_base64);
                            $("#wxPay").text(data.data.real_money);	//微信弹出框金额
							pay.wechatPop();
                            //长连接监听支付状态
                            pay.sendNum = 0;
                            pay.orderStatus();
						},
						complete: function(){
							lock = false;
							$("#redolded").attr("disabled","disabled");
							$("#redolded").attr("checked","checked");
							$('#btnPay').on('click', pay.payChoice);
							$('#btnPay').removeClass('disabled');
						}
					})

				}
				
			}
		})
	},

	sendNum:0,
	orderStatus: function(){
		$(".usecoupon>.nav>span").off("click");
		$('.c-type').css("border","1px solid #e4e4e4");
		$('.c-type').find("i").css('display','none');
		var _this = this;
		var order_num = $('#order_num').attr("value");
		$.ajax({
			type:"POST",
			url:"/v1/order/status?is_ajax=1&order_num="+order_num,
			dataType:"json",
			timeout:20000,
			data:{ajax:"1",time:"10000"},
			success:function(result,textStatus){
				if (result.data.status == 1) {
                    //支付成功
					pay.alipayPop();
					$('#openWin').submit();
				}else if (result.data.status == 2) {
                    //订单取消
                    pay.alipayPop();
                    //$('#openWin').submit();
                } else {
	                	pay.sendNum++;
	                	if(pay.sendNum <= 600) {	//2*200/60 = 10 分钟 后提示订单取消
	                		setTimeout(pay.orderStatus,2000);	//每2秒执行一次
	                	}else {
	                		//订单取消
	                		if(pay.sendNum != 1000){
	                    		pay.alipayPop();
	                		}
	                	}
	           }
			},
			complete:function(){
				$(".usecoupon>.nav>span").on("click");
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				pay.orderStatus();
			}
		});


	},
	wechatPop: function(){
		$('.wechat-mask').show()
	},
	alipayPop: function(){
		$('.alipay-mask').show()
	},
	stopDefault: function(e){
		if(e && e.preventDefault) {
			e.preventDefault();
		} else {
			window.event.returnValue = false;
		}
		return false;
	},
	closeAlimask:function(){
		$('.alipay-mask').hide()
	},
	closeWechatmask:function(){
		$('.wechat-mask').hide()
		pay.sendNum = 999;
	},
	msgBox:function(status, msg, show_time, callBack) {
	    var colorArr = ['waring-failure','waring-success','waring-sub'];
	    var msg = msg ? msg : '亲爱的VIP，这是来自极客学院小雪的 Hello~';
	    var color_class = colorArr[status];
	    var id = "warning";
	    var html;
	    html = '<div class="web-dia-tip ' + color_class + '" id="' + id + '" >';
	    html += msg;
	    html += '</div>';
	    $('body').append(html);
	    var _W = $('#' + id).width() / 2;
	    var show_time = parseInt(show_time) ? parseInt(show_time) : 1500;
	    $('#' + id).css("marginLeft", -_W);
	    $('#' + id).animate({
	        top: "0px",
	        opacity: 1
	    }, 300, function() {
	        $('#' + id).delay(show_time).animate({
	            top: "-50px",
	            opacity: 0
	        }, 500, function() {
	            $('#' + id).remove();
	            if (typeof(callBack) == 'function') {
	                callBack();
	            }
	        });
	    });
	},
}

$(function(){
	pay.init();
})
