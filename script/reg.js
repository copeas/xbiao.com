
$(function(){
    var oTel = $("#RegistrationForm_phone");
    var oUser = $("#UserLogin_username");
    var oPwd = $("#UserLogin_password");
    var oRpwd = $("#UserRlogin_password");
    var phoneReg = /^1\d{10}$/;
    var numreg = /^\d+$/;
    var elsreg = /^[\u4e00-\u9fa5a-z0-9\-_]/;
    $("#reg_btn").click(function(){
        $(".error_prompt").html("");
        var tel = oTel.val();
        // shouji
        if(tel == ""){
            $(".telelphone .error_prompt").html("手机号不能为空！");
            return 0;
        }
        if(phoneReg.test(tel)){
            $(".telelphone .error_prompt").html("");
        }else{
            $(".telelphone .error_prompt").html("手机号格式不正确！");
            return 0;
        }
        // yonghuming
        var name = oUser.val();
        if(name == ""){
            $(".reg_item .error_prompt").html("用户名不能为空！");
            return 0;
        }
        if(!elsreg.test(name)){
            $(".reg_item .error_prompt").html("用户名格式不正确");
            return 0;
            
        }
        if(numreg.test(name)){
            $(".reg_item .error_prompt").html("用户名不能纯数字！");
            return 0;
            
        }
        // 密码
        var psd = oPwd.val();
        var rpsd = oRpwd.val();
        //console.log(psd ,rpsd)
        if(psd == ""){
            $("#UserRlogin_password").parents(".lock_item").find(".error_prompt").html("密码不能为空");
            return 0 ;
        }
        if(psd != rpsd){
            $("#UserRlogin_password").parents(".lock_item").find(".error_prompt").html("两次密码不一致");
            return 0;
        }
        
        $.ajax({
            type:'GET',
            url: "http://localhost:82/proxy/localhost/1815phpnow/0921/php/register3.php",
            data:`username=${name}&password=${psd}`
        })
        .then(function(res){
            console.log(res);
           if(res){
            location.href="sigin.html"
           }
        })

    })
})