"use strict";
var dist_title;
var UID = getCookie('tj_id');
var ID = getUrlParameter("bid")?getUrlParameter("bid"):'';
//Get title Data
function getTitle() {
    $.ajax({
        type: "POST",
        url: __GETMONEY_URL__,
        dataType: "json",
        data:{
            "uid":UID,
            "bid":ID
        },
        timeout: 3000,
        success: function(data){
            if(!data.code)return false;
            dist_title = data.data;
            console.log(data);
            if((!dist_title.status) || dist_title.cumulative_money == 0){
                $('.use_textnum').attr('disabled',true);
            }

            solveTemplate("#dis-title", "#dis-title-template", dist_title);
            solveTemplate("#usa-selbox", "#usa-selbox-template", dist_title);
        },
        error: function(XMLHttpRequest, textStatus){
            if(textStatus == "timeout"){
                reLoad("body");
            }
        }
    });
}

function usaChange(){
    var money_text = $('.use_textnum').val();
    if(money_text != ""){
        $('.usa_button').removeClass('usa_dis').removeAttr('disabled');
    }else{
        $('.usa_button').addClass('usa_dis').attr('disabled');
    }
}

//check text
function chechForm(){
    var money_text = $('.use_textnum').val();
    var useable = parseFloat($('.usable p').html());
    var reg = /^\+?[1-9][0-9]*$/;
    if($('.bankcard').attr('status') == 1){
        showTip("请选择银行卡");
        return false;
    }else if(!reg.test(money_text)){
        showTip("提现金额为正数数字");
        return false;
    }else if(parseInt(money_text) < 100){
        showTip("提现金额需大于等于100");
        return false;
    }else if(money_text%10 != 0){
        showTip("提现金额需为10的倍数");
        return false;
    }else if(money_text > useable ){
        showTip("提现金额不能大于可提取金额");
        return false;
    }else{
        return true;
    }


}

//sed money num
function sendUsaText(){
    var bank_id = dist_title.bank_id,
        bankNumber = dist_title.bank_number,
        bankName = dist_title.bank_name;
    $.ajax({
        type: "POST",
        url: __DOMONEY_URL__,
        dataType: "json",
        data:{
            "uid":UID,
            "money":$('.use_textnum').val(),
            "bank_number":bankNumber,
            "bank_name":bankName,
            "bank_id":bank_id
        },
        timeout: 3000,
        success: function(data){
            console.log(data)
            if(!!data.code){
                $('.use_textnum').val('').attr('disabled',true);
				alertSuccessConfirm({
					"str":"提取成功,等待打款",
					"right":"确定",
					"url":"/gzt/index/userhome.html"
				});
                return true;
            }else{
               showTip("提取失败，请重新尝试");
            }
        },
        error: function(XMLHttpRequest, textStatus){
            if(textStatus == "timeout"){
                reLoad("body");
            }
        }
    });
}


$(function(){
    //get title data
    getTitle();

    $('.use_textnum').on('input',usaChange);

    $('.usa_button').on('click',function(){
        if(chechForm()){
            sendUsaText();
        }
    });
});