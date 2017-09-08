"use strict";
var UID = getCookie('tj_id');
$(function(){

    if (UID) {
        window.location.href = '/activity/userhome.html';
    }
	
	var codeFlag = getUrlParameter("icode");
	console.log(codeFlag);
	if( codeFlag=="" || codeFlag==null ){
		
		
		$("#code").focus(function(){ $("#codeInfo").html(""); });
		$("#code").bind("blur",function(){ 
		
			var codeTxt = $("#code").val();
			if( codeTxt=="" ){$("#codeInfo").html("若有邀请人请填写他的邀请码");}
		
		});
		
		}
	else{
		$("#code").val(codeFlag);
		$("#codeInfo").html("");
		
	}
	
	$("#loginBtn").bind("click",function(){checkTel("loginRequest");});
	$("#regBtn").bind("click",function(){checkTel("regRequest");});
	$("#msgBtn").bind("click", function(){checkTel("msgRequest");});
	$("#tel,#msgWord").bind("keyup",function(){ changeForm(); });
	

	
	
});

//
function changeForm(){
	var tempState=false;
	var tempOb = { 
		telChange:$("#tel").val(),
		msgChange:$("#msgWord").val()
	}
	//console.log(tempOb.telChange);
	//console.log(tempOb.msgChange);
	$.each(tempOb, function(key, value){
		console.log(key,value)
		//console.log(key)
		
		if( value=="" || value==0 ){
			console.log("为空或为0");
			 tempState=false;
			return false;
		}
  		else{  tempState=true; }
		
	});
	if( tempState ){ $(".btn").removeClass("opa7").removeAttr("disabled"); }
	else{  $(".btn").addClass("opa7").attr("disabled",true); }
	console.log("tempState:"+tempState);
}

var _flag = true;

//getMsgTel
function getMsgTel(telNum){
    if (!_flag) {
        return false;
    }
	_flag = false;
    var type = $('#send_type').val();
	$.ajax({
		type: "POST",
		url: __SENDMSG_URL__,
		data:'mobile='+telNum+'&type='+type,
		dataType: "json",
		timeout: 3000,
		success: function(data){
			console.log(telNum);
			console.log("data:"+data);
			
			if(data.code == 1)
			{
                _flag = false;
                alertConfirm({
                    "str":"验证码:" + data.data.code,
                    "right":"确定",
                    "error":"取消",
                    "url":""
                });
				console.log("验证码发送成功");	
				timer();
			} else {
                _flag = true;
                showTip(data.message);
            }
		},
		error: function(XMLHttpRequest, textStatus){
			if(textStatus == "timeout"){
				reLoad("body");
			}
		}
	});
}
//sendLogin
function sendLogin(telNum,msgNum){
	$.ajax({
		type: "POST",
		url: __LOGIN_URL__,
		data:{
			"mobile":telNum,
			"smscode":msgNum,
            "type":2
			},
		dataType: "json",
		timeout: 3000,
		success: function(data){
			console.log(telNum);
			console.log(msgNum);
			
			console.log("data.code:"+data.code);
			
			if( data.code==0 ){
				alertTip(data.code,data.message);
				//showTip(data.message);
			}
			
			//
			
			if( data.code==1 )
			{
				alertTip(data.code,data.message);
				//showTip(data.message);
				console.log("登录信息发送成功");
				setTimeout(urlFn,2000);
					
				//goBack();
			}
			//
			
			//
		},
		error: function(XMLHttpRequest, textStatus){
			if(textStatus == "timeout"){
				reLoad("body");
			}
		}
	});
}

//sendReg
function sendReg(telNum,msgNum,codeNum){
	$.ajax({
		type: "POST",
		url: __REG_URL__,
		data:{
			"mobile":telNum,
			"smscode":msgNum,
			"rcode":codeNum,
			"type":1
			},
		dataType: "json",
		timeout: 3000,
		success: function(data){
			console.log(telNum);
			console.log(codeNum);
			
			console.log("data.code:"+data.code);
			
			if( data.code==0 ){
				alertTip(data.code,data.message);
				//showTip(data.message);
			}
			
			//
			
			if( data.code==1 )
			{
				alertTip(data.code,data.message);
				//showTip(data.message);
				console.log("注册信息发送成功");	
				setTimeout(urlFn,2000);
			}
			//
			
			//
		},
		error: function(XMLHttpRequest, textStatus){
			if(textStatus == "timeout"){
				reLoad("body");
			}
		}
	});
}
//
function timer(){
		$(".time").show();
		$(".txt").html("重新发送");
		// $("#msgBtn").unbind("tap");
		var i = 60;
	    var tempT;
		timeCounter();
		function timeCounter(){
			if( i>0 ){
				$("#time").html(i);
				i=i-1;
				tempT = setTimeout(timeCounter,1000);
			} else{
				$(".txt").html("发送验证码");
				$("#time").html("");
				// $("#msgBtn").bind("tap", function(){checkTel("msgRequest")});
				$(".time").hide();
				clearTimeout(tempT);
                _flag = true;
			} 	
		}
		
		//
		
		//

	}
//

function checkTel(flag) {

	var tempFlag = flag;
	var tempTel = $("#tel").val();
	//var tempMsg = $("#msgWord").val();
	//var tempCode = $("#code").val();
	console.log("flag:"+flag);
	//console.log(tempMsg);
	//console.log(tempCode);
	if(tempTel == "")
	{
		showTip("请输入手机号");
		return false;
	}
	var tel = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
    if(!tel.test(tempTel)) {
		showTip("您输入的手机号格式不正确");
        return false;
    }
	console.log("tempFlag:"+tempFlag);
	if ( tempFlag=="msgRequest"){
		getMsgTel(tempTel);
		console.log("发送验证码行数开始执行");
	}
	if ( tempFlag=="loginRequest") {
		checkMsgWord(tempFlag);
		console.log("登录，接着验证:验证码");
	}
	if ( tempFlag=="regRequest") {
		checkMsgWord(tempFlag);
		console.log("注册,接着验证:验证码");
	}
	
	/*if(tempMsg == "")
	{
		showTip("请输入验证码");
		return false;
	}*/
	 
}

function checkMsgWord(flag){
	var tempFlag = flag;
	var tempTel = $("#tel").val();
	var tempMsg = $("#msgWord").val();
	var tempCode = $("#code").val();
	console.log(tempFlag);
	if(tempMsg == ""){
		
		showTip("请输入验证码");
		return false;
		
	}
	if( tempMsg !=="" && tempFlag=="loginRequest" ){
		//$("#loginBtn").addClass("xxxxxxx");
		sendLogin(tempTel,tempMsg);
		console.log("发送登录信息函数");
		
	}
	if( tempMsg !=="" && tempFlag=="regRequest" ){
		sendReg(tempTel,tempMsg,tempCode);
		console.log("发送注册信息函数");	
	}
}

//

/*function checkCode(){
	var tempTel = $("#tel").val();
	var tempMsg = $("#msgWord").val();
	var tempCode = $("#code").val();
	if(tempCode == ""){
		
		showTip("请输入邀请码");
		return false;
		
	}
	else{
		sendReg(tempTel,tempMsg,tempCode);
		console.log("发送注册信息函数");
		}
	
}*/

//alertDiv 
function alertTip(tempCode,str) {
	var tempClass;
	if( tempCode==0 ){
			var tempClass="alertDiv fail";
			//var alertTip = '<div class="alertDiv fail" id="alertTip"><span class="img"></span><p class="desc" id="noticeDesc"></p><p class="bg"></p></div>';
		}
	else{
			var tempClass="alertDiv success";
			//var alertTip = '<div class="alertDiv success" id="alertTip"><span class="img"></span><p class="desc" id="noticeDesc"></p><p class="bg"></p></div>';
		}
	var alertTip = '<div class="'+tempClass+'" id="alertTip"><span class="img"></span><p class="desc" id="noticeDesc"></p><p class="bg"></p></div>';
	$(alertTip).appendTo("body");
	$('#noticeDesc').html(str);
	setTimeout(function(){
			$('#alertTip').addClass('on');
	    setTimeout(function(){
		    $('#alertTip').removeClass('on');
			
	    }, 2000);
	},1);
	
}

//


function urlFn(){
	window.location.href="/index/index.html";
}
//
function getUrlRequest(){
	var url=location.search;
	var Request = new Object();
    var strs = new Array();
	if(url.indexOf("?")!=-1)
	{
	　　var str = url.substr(1)　//去掉?号
	　　strs= str.split("&");
	　　for(var i=0;i<strs.length;i++)
	　　{
	　　 　 Request[strs[i].split("=")[0]]=unescape(strs[ i].split("=")[1]);
	　　}
	}
	return Request["icode"]
	//alert(Request["icode"])
	//alert(Request["sex"])
	}
