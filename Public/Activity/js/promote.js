"use strict";
var user_promote;
var UID = getCookie('tj_id');

//Get promote Data
function getPromote() {
    $.ajax({
        type: "POST",
        url: __RECOMMENDLIST_URL__ + "&uid="+UID,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            if(!data.code)return false;
            user_promote = data.data;
            console.log(data);
            solveTemplate("#user-promote", "#user-promote-template", user_promote);

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
        window.location.href = '/index/login.html';
    }
    getPromote();
});