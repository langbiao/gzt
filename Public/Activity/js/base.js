//Initialization function
var winH, winW, docH, headerH;
var dataStatus = 0; //ajax post number
$(function(){
	winH = $(window).height();
	winW = $(window).width();
	docH = $(document).height();
	headerH = $("headerH").height();
	sidebar();
	goTop();
	$("#go-back").bind("click",goBack);
	//$(document).on('touchstart',"#go-back",goBack);
	getSource();
    setHtmlFontSize();
});

// 手机横屏或者竖屏的时候要重新获取高度  旋转时间有延迟 需要使用setTimeout
$(window).on("orientationchange",function(){
    setTimeout(function(){setHtmlFontSize();}, 50);
});

function setHtmlFontSize()
{
    var view_width = $(window).width();//document.getElementsByTagName('html')[0].getBoundingClientRect().width;
    var _html = document.getElementsByTagName('html')[0];
    view_width>640?_html.style.fontSize='66px':_html.style.fontSize =view_width*0.1346666+'px';
}

//Get Browser Version
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            weibo: u.indexOf('weibo') > -1, //是否微博
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

// weixin share
function wxShare(url, fromPage, id,fn) {
	$.ajax({
		type: "POST",
		url: "/api/weixin.php?action=weixin&url="+url+"&type="+fromPage+"&temp="+id,
		dataType: "json",
		success: function(res) {
			console.log(res);
			if(res.code == 1) {
				var data = res.data;
				fn&&fn(data);
				wx.config({
				    debug: false,
				    appId: data.appid,
				    timestamp: data.timestamp,
				    nonceStr: data.noncestr,
				    signature: data.signature,
				    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
				});

				wx.ready(function(){
					wx.onMenuShareAppMessage({
						title: data.sharename, // 分享标题
					    desc: data.sharedescribe, // 分享描述
					    link: data.url, // 分享链接
					    imgUrl: data.share, // 分享图标
					    type: 'link', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 
					        // alert('success');
					    }

					});
					wx.onMenuShareTimeline({
						title: data.sharename, // 分享标题
					    link: data.url, // 分享链接
					    imgUrl: data.share, // 分享图标
					    success: function () { 
					        // alert('success');
					    }

					});
				});
			}
		}
	});
}

// Get Scrolled Top
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    } else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
//Return to top of the page
//show or hide the collect case
function goTop(){
	var goTop = $('#goTop');
	var apply = $('.bottom-btn');
	goTop.hide();
	apply.hide();

	$(window).on('scroll', function() {
		var scroll_top = getScrollTop();
		if(scroll_top > 50){
			apply.show();
		} else{
			apply.hide();
		}
		if(scroll_top >= winH*2){
			goTop.show();
		}else{
			goTop.hide();
		}
	});
	goTop.on('click', function(){
		document.body.scrollTop = 0;
	});
}
//Slide in right menu
function sidebar(){
	var sidebar = $('#sidebar'),
		menu = $('#menu'),
		bg = $('.sidebar-bg');

	menu.on('click', function(event){
		$("#right-menu").addClass("slideIn");
		bg.show();
		bg.add(sidebar).on('touchmove', function(event){
			event.preventDefault();
		})
	});

	bg.on('click', function(){
		$("#right-menu").removeClass("slideIn");
		$('body').css('overflow', '');
	});
}

//Get url Parameter
function getUrlParameter(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
//solve Template
function solveTemplate(contentId, tplId, data){
    	var content = $(contentId),
			tpl = $(tplId).html(),
			render = _.template(tpl),
			html = render(data);

		content.html(html);
    }
//Top tip bar
function showTip(str) {
	var tip_box = '<div id="errorCue"><span id="errorMsg"></span></div>';
	if($('#errorCue'))
	{
		$('#errorCue').remove();
	}
	$(tip_box).appendTo("body");
	$('#errorMsg').html(str);
	setTimeout(function(){
			$('#errorCue').removeClass().addClass('show');
	    setTimeout(function(){
		    $('#errorCue').removeClass('show');
	    }, 2000);
	},1);
}
//Alert Layer
function alertOpen(str) {
	var alert_tag = '<section id="alert-layer"><div id="layer-content"><p id="alert-con"></p><p class="auto-close"><span id="close-time">5</span>s后自动关闭</p><span id="layer-close" class="iconfont icon-close"></span></div></section>';
	if($("#alert-layer"))
	{
		$("#alert-layer").remove();
	}
	$(alert_tag).appendTo("body");
	$("#alert-layer").height(docH);
	$("#alert-con").html(str);
	var timer = setTimeout(alertClose,1000);
	function alertClose() {
		var t = $("#close-time").html();
		t--;
		if(t>0)
		{
			$("#close-time").html(t);
			setTimeout(alertClose,1000);
		}
		else {
			$("#alert-layer").remove();
			clearTimeout(timer);
		}
	}
	$("#layer-close").bind("click",function(){
		$("#alert-layer").remove();
	});
}
//Alert (Confirm button)
function alertConfirm(json) {
	var alert_tag = '<section id="confirm-layer"><div id="layer-content"><p id="alert-con"></p><div id="layerbtns"><a id="layer-cancel" href="javascript:">'+json.error+'</a><a id="layer-ok" href="javascript:">'+json.right+'</a></div></div></section>';
	if($("#confirm-layer"))
	{
		$("#confirm-layer").remove();
	}
	$(alert_tag).appendTo("body");
	$("#alert-layer").height(docH);
	$("#alert-con").html(json.str);
	$("#layer-ok").bind("touchstart",function(){
		var e = "ok";
		json.url&&(window.location.href = json.url);
		json.success&&json.success();
		$("#confirm-layer").trigger(e);
		$("#confirm-layer").remove();
		return false;
	});
	$("#layer-cancel").bind("touchstart",function(){
		var e = "cancel";
		$("#confirm-layer").trigger(e);
		$("#confirm-layer").remove();
		return false;
	});
	$('#confirm-layer').on('touchmove',function(){
		return false;
	});
}

function alertSuccessConfirm(json) {
	var alert_tag = '<section id="confirm-layer"><div id="layer-content"><p id="alert-con"></p><div id="layerbtns"><a id="layer-ok" href="javascript:">'+json.right+'</a></div></div></section>';
	if($("#confirm-layer"))
	{
		$("#confirm-layer").remove();
	}
	$(alert_tag).appendTo("body");
	$("#alert-layer").height(docH);
	$("#alert-con").html(json.str);
	$("#layer-ok").bind("touchstart",function(){
		var e = "ok";
		json.url&&(window.location.href = json.url);
		json.success&&json.success();
		$("#confirm-layer").trigger(e);
		$("#confirm-layer").remove();
		return false;
	});
	$('#confirm-layer').on('touchmove',function(){
		return false;
	});
}

//Go back page
function goBack() {
	window.history.back();
	return false;
}

//No data message
function noAll(str, id) {
	var tip_box = '<div class="no-order"><span class="no-Info"></span></div>';
	$(id).css('position', 'relative');
	$(tip_box).appendTo(id);
	$(id).find(".no-Info").html(str);
}

//reload page
function reLoad(id){
	var tip_box = '<div class="no-order"><span class="no-Info">找不到数据辣，请重新<a id="F5">刷新</a>~</span></div>';
	$(id).css('position', 'relative');
	$(tip_box).appendTo(id);
	$("#F5").click(function(){
		window.location.reload();
	});
}

// set cookie
function setCookie(key, value, t) {
    var oDate = new Date();
    oDate.setDate( oDate.getDate() + t );
    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}
//return cookie value
function getCookie(c_name)
{
  if (document.cookie.length>0)
  {
    c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
  return ""
}

// collect notice
function collectShow(str) {
	var timer;
	var tip_box = '<div id="showBox"><span id="showInfo"></span></div>';
	if($('#showBox'))
	{
		$('#showBox').remove();
	}
	$(tip_box).appendTo("body");
	$('#showInfo').html(str);
	clearTimeout(timer);
	timer = setTimeout(function(){
			$('#showBox').show();
	    setTimeout(function(){
		    $('#showBox').hide();
	    }, 2000);
	},1);
}

//截取案例封面中间部分图片
function imgLoaded(){
	$(".lazy-img").bind("imgloaded",function(){
		var _this = $(this);
		var parentH = _this.parent().height();
		var parentW = _this.parent().width();
		_this.css({
			height: "auto",
			"min-height": parentH
		});
		var imgW = _this.width();
		var imgH = _this.height();
		var _imgH=(parentW/imgW)*imgH;
		// if(imgW/imgH < 4/3){
		// 	var height_t = -(_imgH-parentH)/2;
		// 	_this.css({
		// 		position: "relative",
		// 		top: height_t,
		// 	});
		// }else if(imgW/imgH > 4/3){
		// }
		var height_t = -(_imgH-parentH)/2;
		_this.css({
			position: "relative",
			top: height_t
		});
		_this.next().css("margin-top", -_imgH);
	});
}

//menu页获取来源
function getSource(){
	if(browser.versions.weixin){
		$("#apply").attr("href", "mobile-sale_price.html?id=微信-菜单页");
	}else if(browser.versions.weibo){
		$("#apply").attr("href", "mobile-sale_price.html?id=微博-菜单页");
	}else{
		$("#apply").attr("href", "mobile-sale_price.html?id=M站-菜单页");
	}
}

//截取字符串方法
function setString(str, len) {
	    var strlen = 0;
	    var s = "";
	    for (var i = 0; i < str.length; i++) {
	        if (str.charCodeAt(i) > 128) {
	            strlen += 2;
	        } else {
	            strlen++;
	        }
	        s += str.charAt(i);
	        if (strlen > len) {
	            return s+"...";
	        }
	    }
	    return s;
	}


//报名遮罩层

function Endmove(ev){
	ev.preventDefault();
	return false;
}
var oScrollTop;
$(function(){
	//遮罩层显示时阻止滑动屏幕内容跟随
	//遮罩层显示
	$('.amount_house_bs').on('touchstart',function(){
		oScrollTop = document.body.scrollTop;
		document.body.scrollTop = 0;
		$(".footer_menu_bs").hide();
		$('.amount_house_mask_bs').show();
		$('.in_info_bs').show();
		$("#errorCue").css({'top':0});
		$(document).on('touchmove',Endmove);
		return false;
	});
	//遮罩层关闭按钮
	$('.in_info_close_bs').on('click',function(){
		$('.amount_house_mask_bs').hide();
		$('.in_info_bs').hide();
		$(document).off('touchmove',Endmove);
		alertOpenbOk = false;
		document.body.scrollTop = oScrollTop;
		$(".footer_menu_bs").show();
		return false;
	});
	
});
















