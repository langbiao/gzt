"use strict";
var bindcard_data;
var UID = getCookie('tj_id');

//send bind card massage
function sendCarded(){

}
var chechFomeData = {
    "name":{
        "reg":/^[\u4E00-\u9FA5]+$/,
        "hint":"请输入姓名",
        "hint1":"您的姓名有误请重新输入"
    },
    "bank_number":{
        "reg":/^(\d{16}|\d{19})$/,
        "hint":"请输入银行卡号",
        "hint1":"银行卡号输入有误请重新输入"
    },
    "id_number":{
        "reg":/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        "hint":"请输入身份证号",
        "hint1":"身份证号输入有误请重新输入"
    },
    "branch":{
        "reg":/^[\u4E00-\u9FA5]+$/,
        "hint":"请输入支行名称",
        "hint1":"支行名称有误请重新输入"
    },
    "isOk":true
}


function checkBindCard(){
    var sendData = {};
    chechFomeData.isOk = true;
    $('.card_massage input').each(function(index,ele){
        //if in error each stop it
        if(!chechFomeData.isOk){return false;}
        var kind = $(this).attr('kind');
        var status = chechFomeData[kind].reg.test($(this).val());
        if($(this).val() == ''){
            //weikong
            $(this).focus();
            //tishi
            showTip(chechFomeData[kind].hint);
            //zhuangtia
            chechFomeData.isOk = false;
        }else{
            //buweikong
            if(!status){
                //buzhengque
                $(this).focus();
                showTip(chechFomeData[kind].hint1);
                chechFomeData.isOk = false;
            }else{
                //zhengque
                chechFomeData.isOk = true;
                sendData[kind] = $(this).val();
                //console.log(sendData);
                sendData.bank_name = $('.bank_name').val();
                sendData.uid = UID;
            }
        }
    });
    return {
                "isok":chechFomeData.isOk,
                "data":sendData
           };
}


//send Form data
function sendMassage(sendData){
    $.ajax({
        type: "POST",
        url: __ADDCARD_URL__,
        data:sendData,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            //if(!data.code)return false;
            console.log(data)
            if(!data.code){
                $('.cardtext input').val('');
                showTip(data.message);
            }else{
                window.location.href = '/gzt/index/selectcard.html';
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
    if(!UID){
        window.location.href = '/gzt/index/index.html';
    }
    $('.submits').on('click',function(){
        var bandCard = new checkBindCard();
        if(bandCard.isok){
            alertConfirm({
                "str":'请确认银行卡信息正确，因此造成的后果概不负责',
                "right":'<span class="color_org">确认</span>',
                "error":'<span class="color_999">取消</span>',
                "success":function(){
                    sendMassage(bandCard.data)
                }
            });
        }
    });
});