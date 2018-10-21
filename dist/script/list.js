// 瀑布流
function ShopCar(){
}
$.extend(ShopCar.prototype,{
    init:function(){
        this.nowPage= 0;
        this.main = $(".list ul");
        this.loading = false;
        this.loadJson()
        .then(function(res){
            
            this.json = res//.subjects;
           
            this.renderPage()
        })
        this.bindEvent();
        this.listSum();
    },
    loadJson:function(){
        var opt = {
            
            url:"data.json",
           
            type:"GET",
            context : this
        }
        return $.ajax(opt);
    
        
    },
    renderPage:function(){   
        //console.log(this.json);            
        var list =  this.json.subjects;
       // console.log(list);    
        var html = "";
        for(var i = 20*this.nowPage ; i <= 20*this.nowPage+19 ; i ++){
            html += `<li>
                        <a href="javascript:void(0)">
                            <img pic-id=${list[i].id} src="${list[i].images.small}" alt="">    
                        </a>                                
                        <h3>${list[i].title}</h3>
                        <button data-id=${list[i].id}>加入购物车</button>
                    </li>`
           
        }
        this.main.html(this.main.html() + html);
    
        this.loading = false;   
        
    },
    bindEvent(){
        $(window).on("scroll",this.ifLoad.bind(this));
        $(".list ul").on("click","button",this.addCar.bind(this));
        $(".shopingCar a").on("mouseenter",this.showList.bind(this));
        //console.log($(".shopingCar a"));
        $(".shopingCar a").on("mouseleave",function(){
            $(".goodList").children().remove();;
        });
        $(".shopingCar a").on("click",function(event){
            var target = event.target ; 
            if(target != $(".shopingCar a")[0]) return 0;

            $.removeCookie("shopingCar");
            // 执行鼠标移出事件;
            $(".shopingCar a").triggerHandler("mouseleave");
            this.listSum();
        }.bind(this));
    },
    ifLoad(){
        if(this.loaded == false){
            return 0;
         }
         var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
         // 显示的高度有多高;
        var showHeight = document.documentElement.clientHeight + scrollTop;
        // 最后一个元素;
        var aLi = $(".list ul li")
        //console.log(aLi);
        var lastLi =aLi[aLi.length -1];
        //console.log(lastLi);
        if( lastLi.offsetTop <= showHeight ){
            this.loading = true;
            this.nowPage ++;
            //console.log(this.nowPage);
        
            if(this.nowPage > 4){
                return 0;
            }
            this.renderPage();

        }
    },
    addCar(event){
        var e = event || window.event;
        var target = e.target;
        var goodsId = $(target).attr("data-id");
        var cookie;
        if((cookie = $.cookie("shopingCar"))){
            var cookieArray = JSON.parse(cookie);
            var hasGoods = false;
                    for(var i = 0 ; i < cookieArray.length ; i ++){
                        if(cookieArray[i].id == goodsId ) {
                            // 存在 商品;
                            hasGoods = true;
                            cookieArray[i].num ++;
                            break;
                        }
                    }
                    if(hasGoods == false){
                        var goods = {
                            id : goodsId,
                            num : "1"
                        }
                        cookieArray.push(goods);
                    }
                    $.cookie("shopingCar",JSON.stringify(cookieArray));
        }else{
            $.cookie("shopingCar",`[{"id":"${goodsId}","num":"1"}]`);
        }
        console.log($.cookie("shopingCar"));
        this.listSum();

    },
    showList(event){
        // console.log("1");
        var target = event.target;
        if(target != $(".shopingCar a")[0]) return 0;
        var cookie;
        if(!(cookie = $.cookie("shopingCar"))){ return 0; };
        var cookieArray = JSON.parse(cookie);
        //console;
        var html = "";
        var list = this.json.subjects
        for(var i = 0 ; i < cookieArray.length ; i ++){
             //console.log(cookieArray[i]);
            // for 判断哪一个商品是购物车里的商品;
            for(var j = 0 ; j < list.length ; j ++){
                if(cookieArray[i].id == list[j].id){
                    html += `<li data-id="${cookieArray[i].id}">
                                <img src="${list[j].images.small}" alt="">
                                <h3>${list[j].title}</h3>
                                <strong>${cookieArray[i].num}</strong>
                                <i>-</i>
                            </li>`;
                    break;
                }
            }
        }
        $(".goodList").html(html);
        // console.log($(".goodList"))
    },
    listSum(){
        var cookie;
        if(!(cookie = $.cookie("shopingCar"))){ 
            $(".shopingCar").find("span").html(0);
            return 0;
        };
        var cookieArray = JSON.parse(cookie);
        var sum = 0;
        for(var i = 0 ; i < cookieArray.length ; i ++){
            sum += Number(cookieArray[i].num);
        }
        $(".shopingCar").find("span").html(sum);
            
    }
})
var car = new ShopCar();
car.init();
/******页面跳转*******/
function Skip(){}
$.extend(Skip.prototype,{
    init(){
        this.click_btn = $(".list_de");
        //console.log(this.click_btn);
        //this.loading = false;
       
        this.bindEvent();
    },
    bindEvent(){
        //$(".list ul").on("click","button",this.addCar.bind(this));
        this.click_btn.on("click","img",this.skipPage.bind(this));;
    },
    skipPage(event){
        // console.log(1)
        var target = event.target;
        var list = $(target)[0]
        //console.log(list);
        //console.log($(".list_de img"));
        var aImg = Array.from($(".list_de img"));
        if(aImg.indexOf(list) != -1){
            $.cookie("goodsId",list.getAttribute("pic-id"));
            location.href = "detail.html";
        }

    },
   
})
var skip = new Skip();
skip.init();