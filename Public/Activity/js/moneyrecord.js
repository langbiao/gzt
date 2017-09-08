// wushi 2017-03-03 edit
"use strict";
var cardInfo;
$(function(){
	var tempUid = getCookie('tj_id');
	//var tempUid=123456;
	getCard(tempUid);
	
	
});

//getCard
function getCard(i){
	$.ajax({
		type: "POST",
		url: __MONEYRECORD_URL__ + "&uid="+i,
		dataType: "json",
		timeout: 3000,
		success: function(data){
			console.log(i);
			//
			if(data.code == 1)
			{
				
				cardInfo = data.data;
				console.log(cardInfo);	
				solveTemplate("#container", "#each_template", cardInfo);
				
			}
			//
			$(".infoMod .fail_btn").live("tap", function (event) {
				$(this).addClass("no");
				$(this).parents(".infoMod").siblings(".error").addClass("yes");
			}); 
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


