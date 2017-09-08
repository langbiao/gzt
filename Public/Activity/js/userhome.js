"use strict";
var user_title,
    user_promote,
    user_firend;
var UID = getCookie('tj_id');
//Get title Data
function getTitle() {
    $.ajax({
        type: "POST",
        url: __MEMBER_URL__ + "&uid="+UID,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            user_title = data.data;
            console.log(data);
            solveTemplate("#user-title", "#user-title-template", user_title);

        },
        error: function(XMLHttpRequest, textStatus){
            if(textStatus == "timeout"){
                reLoad("body");
            }
        }
    });
}

//Get promote Data
function getPromote() {
    $.ajax({
        type: "POST",
        url: __RECOMMEND_URL__ + "&uid="+UID,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            if(data.code == 1){
                user_promote = data.data;
                console.log(data);
                solveTemplate("#user-promote", "#user-promote-template", user_promote);
                $('.promotes .promote_tit a').attr('href','/gzt/index/recommend.html');
            }else{
                $('.promotes .promote_cont').remove();
                $('.promotes .promote_none').show();
            }
        },
        error: function(XMLHttpRequest, textStatus){
            if(textStatus == "timeout"){
                reLoad("body");
            }
        }
    });
}


//Get firend list Data
function getFirend() {
    $.ajax({
        type: "POST",
        url: "index.php?m=zx_recommended&f=member&v=my_friend&uid="+UID,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            if(data.code == 1){
                user_firend = data.data;
                console.log(data);
                solveTemplate("#user-friend", "#user-friend-template", user_firend);
                //silderMove();
                $('.friend .promote_tit a').attr('href','activity-friend.html');
            }else{
                $('.friend .round').remove();
                $('.friend .friend_none').show();
            }
        },
        error: function(XMLHttpRequest, textStatus){
            if(textStatus == "timeout"){
                reLoad("body");
            }
        }
    });
}


//basilder move
function silderMove(){
    $('.round_list').each(function(index,ele){
        if(index <= 3){
            $(this).parent().append($(this).clone());
        }
    });
    var speed = 0;
    var roundWidth = $('.round_list').width()*($('.round_list').size()-4);

    setInterval(function(){
        speed -= 1;
        if(Math.abs(speed) >= roundWidth){
            speed = 0;
        }
        $('.round_box').css('margin-left',speed);
    },32);
}


$(function(){
    if(!UID){
        window.location.href = '/activity/index.html';
    }
    //get title
    getTitle();

    //promote
    getPromote();

    //friend
    //getFirend();


});