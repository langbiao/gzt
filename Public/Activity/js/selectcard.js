// wushi 2017-03-06 edit
"use strict";
var cardInfo;
$(function(){
	var tempUid = getCookie('tj_id');
	//var tempUid = 123456;
	selectCard(tempUid);
	
});

//getCard
function selectCard(i){
	$.ajax({
		type: "POST",
		url: __SELECTCARD_URL__ + "&uid="+i,
		dataType: "json",
		timeout: 3000,
		success: function(data){
			
			//
			if(data.code == 1)
			{
				
				
				
				cardInfo = data.data;
				console.log(cardInfo);
				
				solveTemplate("#container", "#each_template", cardInfo);
				

			}
			//
			$("section").first().addClass("noBg");
			//
			$(".addCard").live('tap', function(){
				var i, counter = 0;
				for( i in cardInfo) counter++;
				console.log(counter);
				if( counter==3){
					showTip("最多可绑定3张银行卡");
				}
				else{
					window.location.href='/gzt/index/bindcard.html';
				}
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


