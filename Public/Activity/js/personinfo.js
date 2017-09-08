$(function(){
	var tempUid = getCookie('tj_id');//tj_id
	//var tempUid = 1254;
	
	PersonInfo(tempUid);
	//
	//$("#loginBtn").bind("click",function(){checkTel("loginRequest");});
	
		
	//
	$(".btn").live("tap",function(){
		delCookie();	
	});
	
	//
});

//PersonInfo
function PersonInfo(UID){
	
	$.ajax({
		type: "POST",
		url: __MEMBER_URL__ + "&uid="+UID,
		dataType: "json",
		timeout: 3000,
		success: function(data){
			
			//
			if(data.code == 1)
			{
				
				PersonInfo = data.data;
				console.log(PersonInfo);
				solveTemplate("#container", "#each_template", PersonInfo);
				if(PersonInfo.sex){
					$("#sexSelect").val(PersonInfo.sex);	
					
				}
				else{
					
					$("#sexSelect").val("");
					
					}
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

function fixInfoFn(tempName,tempSex){
	var tempUid = getCookie('tj_id');
	console.log("UID:"+tempUid);

	$.ajax({
		type: "POST",
		url: __MEMBERUPDATE_URL__ + "&uid="+tempUid,
		data:{
			"nickname":tempName,
			"sex":tempSex,
			"uid":tempUid
			},
		dataType: "json",
		timeout: 3000,
		success: function(data){
			
			//
			console.log(data);
			if(data.code == 1)
			{
				console.log("sex:"+tempSex);
				console.log("个人信息修改成功");
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
};
//

//
$("#confirm-layer .txt .close").live("tap",function(event){ $("#confirm-layer #int").val(""); });	

// 目前手机号不允许修改
// $("#name").live("tap",function(event){
// 		var tempName = $("#name .desc").html();
//
//
// 		alertConfirm({
//             "str":'<div class="txt fix"> <input name="" type="text" class="int" id="int" value="'+tempName+'"> <cite class="close"></cite> </div>',
//             "right":'<span class="color_org">确定</span>',
//             "error":'<span class="color_999">取消</span>',
//             "success":function(){
//
// 				var fixName = $("#confirm-layer #int").val();
// 				//var fixSex = $("#sexSelect option").not(function(){ return !this.selected }).val();
// 				var fixSex = $("#sexSelect").val();
// 				//$("#confirm-layer #int").bind("change",function(){
//
// 					if( $("#confirm-layer #int").val()=="" ){ showTip("姓名不能为空"); }
// 					else{
// 						$("#name .desc").html(fixName);
// 						fixInfoFn(fixName,fixSex);
// 						}
//
// 				//});
//
//                //
//             }
// 		});
// });
//
$("#sexSelect").live("change",function(){
	$("#sexSelect option").not(function(){ return !this.selected }).attr("select","selected").siblings().attr("select","");
	//var fixSex = $("#sexSelect option").not(function(){ return !this.selected }).val();
	var fixSex = $("#sexSelect").val();
	var fixName = $("#name .desc").html();
	console.log(fixSex);
	console.log(fixName);
	
	fixInfoFn(fixName,fixSex);
	
});
//

$("#code").live("tap",function(event){

		var tempUid = getCookie('tj_id');
		//var tempUid = 22222;
		$.ajax({
			type: "POST",
            url: __MEMBERQRCODE_URL__ + "&uid="+tempUid,
			dataType: "json",
			timeout: 3000,
			success: function(data){

				//
				if(data.code == 1)
				{
					var codeUrl = data.data.qrcode;
					//
					alertConfirm({
						"str":'<div class="codeWrap"> <img src="'+codeUrl+'">  </div>',
						
						"success":function(){

						}
					});
					$("#layerbtns").remove();
					//
				}
			},
			error: function(XMLHttpRequest, textStatus){
				if(textStatus == "timeout"){
					reLoad("body");
				}
			}
		});
		//
		
});
//
function delCookie(){  
    $.ajax({
		  type: "POST",
		  url: __LOGOUT_URL__,
		  dataType: "json",
		  timeout: 3000,
		  success: function(data){
			  //
			  if(data.code == 1)
			  {
				 showTip(data.message);
				 window.location.href='/index/index.html';
			  }
		  },
		  error: function(XMLHttpRequest, textStatus){
			  if(textStatus == "timeout"){
				  reLoad("body");
			  }
		  }
	});            
};
//

$(document).on("tap",function(e){
  if($(e.target).attr("id")=="confirm-layer"){
    
	var e = "cancel";
	$("#confirm-layer").trigger(e);
	$("#confirm-layer").remove();
	return false;
  }
  else{
	  };
});
