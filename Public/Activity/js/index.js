'use strict'

var banners_data,
    bxsilder_data,
    ApplyNum,
    UID = getCookie('tj_id');

var checkForm = {
    "title":'',
    "mobile":'',
    "sex":'',
    "areaid_2":''
};
var checkChoice = {
    "address":'',
    "housecategory":'',
    "area":'',
    "budget":''
};

//Get Banners Data
function getBanners() {
    $.ajax({
        type: "POST",
        url: __BANNER_URL__,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            if(!data.code)return false;
            banners_data = data.data;
            console.log(data);
            solveTemplate("#banner-box", "#index-banner-template", banners_data);
            //initialize swiper when document ready
            var swiper = new Swiper('#index-banner', {
                pagination: '.swiper-pagination',
                loop : true,
                autoplay: 3000,
                paginationClickable: false,
                autoplayDisableOnInteraction : false
            });
        },
        error: function(XMLHttpRequest, textStatus){
            console.log(textStatus);
        }
    });
}

//Get bxSilder Data
function getbxSilder(){
    $.ajax({
        type: "POST",
        url: __CASE_URL__,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            if(!data.code)return false;
            bxsilder_data = data.data;
            console.log(data);
            solveTemplate("#index-silder-round", "#index-silder-template", bxsilder_data);
            silderMove();
            //if(textStatus == "timeout"){
                //reLoad("body");
            //}
        },
        error: function(XMLHttpRequest, textStatus){
            console.log(textStatus);
        }
    });
}

//get Application number
function getApplyNum(){
    $.ajax({
        type: "POST",
        url: __NUMBER_URL__,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            console.log(data);
            ApplyNum = data.data.count;
            (!ApplyNum)&&($('.if_sub').attr('disabled',true).addClass('is_disa'));
            $('.numtim .nt_number').html(data.data.count);

            // //我的账户url定向
            // if(!UID){
            //     $('.footer_userhome a').attr("href","/activity/login.html?favored=1");
            // }
        },
        error: function(XMLHttpRequest, textStatus){
            console.log(textStatus);
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

//test option binding
function optionForm(ele,json,fn){
    $(ele).each(function(){
        var states = $(this).attr('states');
        var input = $(this);
        Object.defineProperty(json, states, {
            configurable: true,
            get: function(){
                return input[0].value
            },
            set: function(newValue){
                input[0].value = newValue;
            }
        });
        $(this).change(function(){
            fn&&fn(json,states);
        });
    });
}

//Important test
function testForm(){

    var formStates = true;
    $.each(checkForm,function(ele,index){
        if(checkForm[ele] == 0){
            formStates = false;
            return false;
        }else if(checkForm[ele] == ''){
            formStates = false;
            return false;
        }

    });
    //return formStates;
    if(formStates){
        $('.if_sub').removeAttr('disabled').removeClass('is_disa');
        return true;
    }else{
        $('.if_sub').attr('disabled',true).addClass('is_disa');
    }
}

//test import is right
function testImport(){
    var importStates = false;
    $.each(checkForm,function(ele,index){
        importStates = false;
        switch (ele){
            case "title":
                var text = $('.info_import input[states=title]').val();
                var reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(text)){
                    showTip("您的姓名有误请重新输入");
                    $('.info_import input[states=title]').focus();
                    return false;
                }else{
                    importStates = true;
                    return true;
                }
                break;
            case "mobile":
                var text = $('.info_import input[states=mobile]').val();
                var reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
                if(!reg.test(text)){
                    showTip("您的电话有误请重新输入");
                    $('.info_import input[states=mobile]').focus();
                    return false;
                }else{
                    importStates = true;
                    return true;
                }
                break;
            case "sex":
                var text = $('.info_import input[states=sex]').val();
                if(text == ''){
                    showTip("请选择性别");
                }else{
                    importStates = true;
                    return true;
                }
                break;
            case "areaid_2":
                var text = $('#select-01').val();
                if(text == 0){
                    showTip("请选择城市");
                }else{
                    importStates = true;
                    return true;
                }
                break;
        }
    });
    return importStates;
}

//test Choice complete and right
function testChoice(){
    var status = 40;
    $.each(checkChoice,function(ele,index){
        if(checkChoice[ele] == ''){
            status-=10;
        }else{
            switch (ele){
                case "address":
                    var text = $('.info_Choice input[states=address]').val();
                    var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
                    if(!reg.test(text)){
                        showTip("您的小区名有误请重新输入");
                        $('.info_Choice input[states=address]').focus();
                        return false;
                    }
                    break;
                case "area":
                    var text = $('.info_Choice input[states=area]').val();
                    var reg = /^\+?[1-9][0-9]*$/;
                    if(!reg.test(text)){
                        showTip("房屋面积为正整数请重新输入");
                        $('.info_import input[states=area]').focus();
                        return false;
                    }
                    break;
                case "budget":
                    var text = $('.info_Choice input[states=budget]').val();
                    var reg = /^\+?[1-9][0-9]*$/;
                    if(!reg.test(text)){
                        showTip("预算金额为正整数请重新输入");
                        $('.info_import input[states=budget]').focus();
                        return false;
                    }
                    break;
            }
        }
    });
    return status;
}

//concat jsondata
function concatData(){
    var data = {};
    for(var name in checkForm){
        data[name] = checkForm[name];
    }
    for(var name in checkChoice){
        data[name] = checkChoice[name];
    }
    var UID = getCookie('tj_id');
    data.status = testChoice();
    data.uid = UID;
    console.log(data);
    return data;
}

//add flow image
function flowImage(){
    var flowBox = '<section class="flowimg"><div class="flow_box"><i class="flow_close iconfont icon-shanchu1"></i></div></section>';
    $('body .flowimg').remove();
    $('body').append(flowBox);
    $('.flowimg').on('touchmove',function(){
        return false;
    });
    $('.flow_close').on('click',function(){
        $(this).parents('.flowimg').remove();
    });
}

//send Form data
function sendMassage(sendData){
    $.ajax({
        type: "POST",
        url: __SEND_URL__,
        data:sendData,
        dataType: "json",
        timeout: 3000,
        success: function(data){
            //if(!data.code)return false;
            console.log(data);
            getApplyNum();
            flowImage();
            $('.if_states input').val('');
            $('.if_states select').val(0);
            $('.sexno_minu').removeClass('sex_active');
        },
        error: function(XMLHttpRequest, textStatus){
            console.log(textStatus);
        }
    });
}

//send massage data
function sendUsaData(){
    if(!UID){
        alertConfirm({
            "str":"登录后才能推荐",
            "right":"确定",
            "error":"取消",
            "url":"/activity/login.html?favored=1"
        });
        return false;
    }
    var importStatus =  testImport();
    if(!importStatus)return false;
    var choiceEmpty = testChoice();
    var sendData = concatData();
    if(choiceEmpty == 40){
        concatData();
        sendMassage(sendData);
    }else{

        var getMoney = 60 + sendData.status;
        alertConfirm({
            "str":'若量房成功，您将获得<span class="color_org">'+getMoney+'元</span>鼓励金填写完整信息，最高可获得<span class="color_org">100元</span>返现',
            "right":'<span class="color_org">确认推荐</span>',
            "error":'<span class="color_999">继续填写</span>',
            "success":function(){
                sendMassage(sendData);
            }
        });
    }

}

$(function(){
    //banner
    getBanners();

    //silder
    getbxSilder();

    //Application number
    getApplyNum();

    //必填项 前四项
    optionForm('.info_import .textmass',checkForm,function(json,states){
        //json[states] = json[states];
        if(!ApplyNum)return false;
        var UID = getCookie('tj_id');
        if(!UID){
            alertConfirm({
                "str":"登录后才能推荐",
                "right":"确定",
                "error":"取消",
                "url":"/activity/login.html?favored=1"
            });
        }
        //判断资料是否完成
        testForm();
    });

    //选填项后四项
    optionForm('.info_Choice .textmass',checkChoice,function(json,states){
        if(!ApplyNum)return false;
    });

    //设置性别新旧
    $('.sexno_minu').on('click',function(){
        var states = $(this).attr('statesnum');
        $(this).parents('li').find('input[type=hidden]').val(states);
        $(this).addClass('sex_active').siblings().removeClass('sex_active');
        if($(this).parents('li').attr('option') == 1){
            testForm();
        }
    });

    //提交资料
    $('.if_sub').on('click',sendUsaData);

    // 设置下拉框颜色
    $('.textmass').on('change',function(){
        if($(this).val() != 0){
            $(this).css('color','#333');
        }else{
            $(this).css('color','#999');
        }
    });
});