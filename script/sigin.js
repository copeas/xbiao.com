$(function(){
    var oUser = $("#UserLogin_username");
    var oPwd = $("#UserLogin_password");
    console.log(oUser.val(),oPwd.val())
    $("#lo_btn").click(function(){
        $.ajax({
            type:'GET',
            url: "http://localhost:82/proxy/localhost/1815phpnow/0921/php/login.php",
            data:`username=${oUser.val()}&password=${oPwd.val()}`
        })
        .then(function(res){
            console.log(res);
           if(res){
            location.href="index.html"
           }
        })
    })
})