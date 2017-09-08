
var UID = getCookie('tj_id');

$(function(){

	var orderId = getUrlParameter("orderid");

	selectCard(orderId);
});

//getCard
function selectCard(i){
	$.ajax({
		type: "POST",
		url: __RECOMMENDETAIL_URL__ + "&orderid="+i+"&uid="+UID,
		dataType: "json",
		timeout: 3000,
		success: function(data){
			console.log("data.code:"+data.code);
			console.log("data.message:"+data.message);
			//
			if(data.code == 1)
			{
				userInfo = data.data;	
				console.log(userInfo);
				progressData = data.data.status_reason;
				solveTemplate("#container", "#each_template", progressData);
			}
		},
		error: function(XMLHttpRequest, textStatus){
			if(textStatus == "timeout"){
				reLoad("body");
			}
		}
	});
}

//

