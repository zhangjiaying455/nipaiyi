//基本信息
var company='nipaiyi';//品牌
// var random = randomRange(8)
var userId =  randomRange(8)+(new Date()).getTime().toString().slice(11);//userId
var url=window.location.href; //url
var ip=returnCitySN["cip"];//ip
var userAgent=navigator.userAgent;//代理信息
var sign=getRequestByName("sign");
var device=0;
if(/Android|iPhone|BlackBerry/i.test(navigator.userAgent)) {
    device=1;
}else{
    device=0;
}

//打印基本信息
/*console.log(company)
console.log(userId)
console.log(url)
console.log(ip)
console.log(userAgent);
console.log(sign)*/
$(function () {
    //保存页面初始化信息
     $.ajax({
         type:'POST',
         url: 'http://mm.jnrise.cn/loading/server/enter',
         headers:{"Content-Type":"application/x-www-form-urlencoded"},
         data:{
             'company':company,
             'userId':userId,
             'userAgent':userAgent,
             'ip':ip,
             'url':url,
             'sign':sign,
             'flag':2
         },
         dataType: 'json',
         success: function(data){
             // console.log(data);
         },
         error: function(error){
             console.log(error);
         }
     });
    //每秒刷新页面停留时间
    function getTime() {
        var second=0
        var timer=window.setInterval(function () {
            second++
            if (second <= 3){
                $.ajax({
                    type:'POST',
                    url:'http://mm.jnrise.cn/loading/server/stay',
                    headers:{"Content-Type":"application/x-www-form-urlencoded"},
                    data:{
                        'company':company,//品牌名称
                        'userId':userId,//用户ID
                        'url':url,//url
                        'ip':ip,//ip地址
                        'userAgent':userAgent,//代理信息
                        'sign':sign, //url携带的参数信息
                        'totalTime':second,//停留时间秒
                        'otherInfo':''
                    },
                    dataType:'json',
                    success:function (data) {
                        // console.log(data)
                    },
                    error:function (error) {
                        console.log(error)
                    }
                })
            }else{
                window.clearInterval(timer)
            }

        },1000)
    }
    getTime();

})
function getInfo(element) {
    var clickType=element.id
    var Phone=$("#patriarchPhone").val()
    var Name=$("#childrenName").val()
    var myreg= /^1[3|4|5|7|8][0-9]{9}$/;

    if(Phone  == '' && Name == ''){
        $("#verificat01").css("display","block")
        $("#verificat02").css("display","block")
        $("#verificat03").css("display","none")
    }else if(Phone  == ''){
        $("#verificat01").css("display","block")
        $("#verificat02").css("display","none")
        $("#verificat03").css("display","none")
    }else if(!myreg.test(Phone)) {
        $("#verificat03").css("display","block")
    }else if (Name == '') {
        $("#verificat01").css("display","none")
        $("#verificat02").css("display","block")
    }else {
        $("#verificat01").css("display","none")
        $("#verificat02").css("display","none")
        $("#verificat03").css("display","none")
        submitForm(clickType,Phone,Name);
    }

}
function getInfo01(element) {
    debugger

    var clickType=element.id
    var Phone=$("#phone").val()
    var Name=$("#name").val()
    var myreg= /^1[3|4|5|7|8][0-9]{9}$/;

    if(Phone ==  ''  && Name == ''){
        $("#inputPhone").css("display","block")
        $("#inputName").css("display","block")
        $("#err-info").css("display","none")
    }else if(Phone == '') {
        $("#inputPhone").css("display","block")
        $("#inputName").css("display","none")
        $("#err-info").css("display","none")
    }else if(!myreg.test(Phone)) {
        $("#err-info").css("display","block")
    }else  if(Name == ''){
        $("#inputPhone").css("display","none")
        $("#inputName").css("display","block")
    }else{
        $("#inputPhone").css("display","none")
        $("#inputName").css("display","none")
        $("#err-info").css("display","none")
        submitForm(clickType,Phone,Name);
    }

}
//随机生成10位用户id
function randomRange(min, max){
    var returnStr = "",
        range = (max ? Math.round(Math.random() * (max-min)) + min : min),
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(var i=0; i<range; i++){
        var index = Math.round(Math.random() * (arr.length-1));
        returnStr += arr[index];
    }
    return returnStr;
}
//获取Url参数
function getRequestByName(name) {
    var url = window.location.search; //获取url中"?"符后的字串
    var result="";
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            if(strs[i].indexOf(name+"=")!=-1){
                result= unescape(strs[i].substring(name.length+1,strs[i].length));
            }
        }
    }
    return result;
}
function submitForm(clickType,Phone,Name) {
    $.ajax({
        type:'POST',
        url: 'http://mm.jnrise.cn/loading/server/info',
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        data:{
            'company':company,
            'userId':userId,
            'phone':Phone,
            'name':Name,
            'age':0,
            'gender':0,
            'school':'',
            'sign':sign
        },
        dataType: 'json',
        success: function(data){
            // console.log(data);
            if(clickType == 'btn01'){
                $('#dialog02').css('display',"block")
                setTimeout(function () {
                    $('#dialog02').css('display',"none")
                },2000)
            }else if(clickType == 'btn02'){
                $('#dialog').css('display',"block")
                setTimeout(function () {
                    $('#dialog').css('display',"none")
                },2000)
            }

        },
        error: function(error){
            if(clickType == 'btn01'){
                $('#dialog03').css('display',"block")
                setTimeout(function () {
                    $('#dialog03').css('display',"none")
                },2000)
            }else if(clickType == 'btn02'){
                $('#dialog01').css('display',"block")
                setTimeout(function () {
                    $('#dialog01').css('display',"none")
                },2000)
            }
            console.log(error)
        }
    });


    $.ajax({
        type:'POST',
        url: 'http://mm.jnrise.cn/loading/server/click',
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        data:{
            'sign':sign,
            'uuid':userId,
            'deviceType':device,
            'clickType':3,
            'company':company,
            'url':url,
            'ip':ip,
            'userAgent':userAgent,
            'userId':userId,
            'otherInfo':clickType

        },
        dataType: 'json',
        success: function(data){
            // console.log(data)
        },
        error: function(error){
            console.log(error)
        }

    })
}





