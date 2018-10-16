
// 瀑布流
function ShopCar(){
}
$.extend(ShopCar.prototype,{
    init:function(){
        this.page=1;
        this.main = $(".watch_container ul");
        this.loading = false;
        this.loadJson()
        .then(function(res){
            //console.log(res);
            this.json = res.subjects;
            this.renderPage()
        })
        this.bindEvent();
    },
    loadJson:function(){
        var opt = {
            url:"http://localhost:82/proxy/api.douban.com/v2/movie/top250",
            data:{start:this.page,count:40},
            type:"GET",
            context : this
        }
        return $.ajax(opt);
    },
    renderPage:function(){
         //console.log(this.json)
        var html = "";
        for(var i = 0 ; i < this.json.length ; i ++){
            html += `<li>
                        <img src="${this.json[i].images.small}" alt="">
                        <h3>${this.json[i].title}</h3>
                        <button>买不买</button>
                    </li>`
            //console.log(this.json[i].title)
        }
        this.main.html(this.main.html() + html);
        this.sortPage();
        this.loading = true;
    },
    sortPage(){
        // var aBox = this.main.children();
        // // console.log(aBox);
        // var heightArray = [];
        // for(var i = 0 ; i < aBox.length ; i ++ ){
        //     // 第一排设置基准;
        //     if( i < 10){
        //         console.log(aBox.eq(i));
        //         heightArray.push(aBox.eq(i).height());
        //      }else{
        //         // 找到最小值 （第一排中最矮的一个）
        //         // Math.min.apply => 可取的数组中的最小值;
        //         var min = Math.min.apply(false,heightArray);
        //         // 最小值和最小值的下标;
        //         var minIndex = heightArray.indexOf(min);
                
        //          // 给最小值加上拼接之后的高度;
        //          heightArray[minIndex] += aBox.eq(i).height();
        //     }
        // }
        // this.loading = false;

        if(this.loading == false){
            return 0;
        }
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // 显示的高度有多高;
        var showHeight = document.documentElement.clientHeight + scrollTop;
        // 最后一个元素;
        var aBox = this.main.children();
       // console.log(aBox);
        var lastLi = aBox[aBox.length - 1];
        if(lastLi.offsetTop <= showHeight + 200){
            // 加载数据                    
            this.loadJson()                    
            this.renderPage();
            
            console.log(this.page) ;           
        }
        this.loading = false;
    },
    bindEvent(){
        $(window).on("scroll",this.sortPage.bind(this));
    },
    // ifLoad(){
    //     // console.log(1);
    //     // scrollTop ;
    //     // 最后一张图片;
    //     // 当前屏幕的高度;
    //     var scrollTop = $("html,body").scrollTop();
    //     var clientHeight = $("html")[0].clientHeight;
    //     var lastBox = this.main.children(":last");
    //     // console.log(scrollTop,clientHeight,lastBox.offset());
    //     if(scrollTop + clientHeight > lastBox.offset().top){
    //         // 加载数据;
    //         if(this.loading){
    //             return 0;
    //         }
    //         this.loading = true;
    //          console.log("加载");
    //         this.page ++;
    //         this.loadJson()
    //         .then(function(){
    //             // deferred 的 done 回调 this指向的都是 jquery 对象本身
    //             //console.log(res,this);
    //             this.renderPage();
    //         })
    //     }
    // }
})

var car = new ShopCar();
car.init();

// 轮播图；
function Banner(){}
$.extend(Banner.prototype,{
    init:function(options){
        // 选中图片;
        this.item_list = $(options.item_list);
        // 左按钮
        this.left_btn = $(options.left_btn);
        // 右按钮
        this.right_btn = $(options.right_btn);
        // 按钮列表
        this.btn_list = $(options.btn_list);
        //标题列表
        this.tit_list = $(options.title_list);
        this.nowIndex = 0 ;
        //元素多少
        this.item_num = this.item_list.length;
        // 获取列表中第一个元素的宽度值
        this.item_width = this.item_list.width()

        this.ul = $(options.show_ul);
        if(this.left_btn.length == 0 && this.right_btn.length == 0 && this.btn_list.length == 0){
            // 就没必要绑定事件
            this.autoPlay();
            return 0;
        }
        this.bindEvent();
        this.autoPlay();
    },
    bindEvent : function(){
        // this.left_btn.click(this.prev.bind(this))
        this.left_btn.click($.proxy(this.prev , this));
        this.right_btn.click($.proxy(this.next , this));
        this.btn_list.mouseenter($.proxy(this.toIndex , this));
        this.btn_list.mouseleave($.proxy(this.autoPlay , this)) 
     },
     next : function(){
        if(this.nowIndex == this.item_num - 1){
            this.nowIndex = 1;
            this.ul.css({
                left:0
            })
        }else{
            this.nowIndex ++;
        }
        this.animate();
    },
    prev : function(){
        //console.log(this)
        if(this.nowIndex == 0){
            this.nowIndex = this.item_num - 2 ;
            this.ul.css({
                left : -(this.item_num - 1) * this.item_width,
            })
        }else{
            this.nowIndex --;
        }
        this.animate();
    },
    toIndex : function(event){
        // 要获取当前元素的下标;
        var target = event.target || event.srcElement;
        //console.log($(target).index());

        // index();
        this.nowIndex = $(target).index();
        this.animate();
        clearInterval(this.timer)
    },
    animate : function(){
        //console.log(this.nowIndex);
        this.ul.stop().animate({
            left : -this.item_width * this.nowIndex, 
        })
        var index = this.nowIndex == this.item_num - 1 ? 0 : this.nowIndex;
        this.btn_list.eq(index).addClass("active").siblings("span").removeClass("active");
        this.tit_list.eq(index).addClass("active").siblings("a").removeClass("active");

        
    },
    autoPlay : function(){
       this.timer = setInterval(function(){
           this.next();
       }.bind(this),3000)
      // console.log("自动播放")
    },
})
var banner = new Banner();
banner.init({
    item_list : ".banner_detial ul li",    
    btn_list : ".banner_detial dd span",
    show_ul : ".banner_detial ul ",
    left_btn : ".btn_prve",
    right_btn : ".btn_next",
    title_list:".banner_detial dt a"
});
// 移动的nav
function Movenav(){}
$.extend(Movenav.prototype,{
    init:function(options){
        // 选中a标签;
        this.item_list = $(options.item_list);
        // 左键
        this.left_btn = $(options.left_btn)
        // 右键
        this.right_btn = $(options.right_btn);
        this.hide = $(options.hide_btn);
        // 现在的index
        this.nowIndex = 0;

        this.dl = $(options.show_dl); 
        // 获取列表中第一个元素的宽度值
        this.item_width = this.item_list.width();
        if(this.left_btn.length == 0 && this.right_btn.length == 0 ){
            // 就没必要绑定事件            
            return 0;
        }
        this.bindEvent();
    },
    bindEvent:function(){
        this.left_btn.click($.proxy(this.prev , this));
        this.right_btn.click($.proxy(this.next , this));
    },
    next:function(){
        this.left_btn.addClass("brand_prev");
        console.log(this.nowIndex);
        this.nowIndex ++;   
        if(this.nowIndex >= 2){
            
            this.right_btn.css({
                display:"none",
            })
            this.hide.css({
                display:"block",
            })
            
        }
        this.animate();
    },
    prev:function(){   
        

        console.log(this.nowIndex);;
        this.right_btn.css({
            display:"block",
        })
        this.hide.css({
            display:"none",
        })
        if(this.nowIndex <= 0){           
            this.left_btn.removeClass("brand_prev")
            return 0;
            
        }else{
            this.nowIndex --;            
        }
        this.animate();
    },
    animate:function(){
        this.dl.stop().animate({
            left : -this.item_width * this.nowIndex, 
        })
    }
})
var movenav = new Movenav();
movenav.init({
    item_list : ".brand_list dl dd a",    
    show_dl : ".brand_list dl dd ",
    left_btn : ".btn_left",
    right_btn : ".btn_right",
    hide_btn:".more"
})
var movenav2 = new Movenav();
movenav2.init({
    item_list : ".brand_list2 dl dd a",    
    show_dl : ".brand_list2 dl dd ",
    left_btn : ".btn_left2",
    right_btn : ".btn_right2",
    hide_btn:".more2"
})
var movenav3 = new Movenav();
movenav3.init({
    item_list : ".brand_list3 dl dd a",    
    show_dl : ".brand_list3 dl dd ",
    left_btn : ".btn_left3",
    right_btn : ".btn_right3",
    hide_btn:".more3"
})
var movenav4 = new Movenav();
movenav4.init({
    item_list : ".brand_list4 dl dd a",    
    show_dl : ".brand_list4 dl dd ",
    left_btn : ".btn_left4",
    right_btn : ".btn_right4",
    hide_btn:".more4"
})
/***********换一批看看***************/
$(function(){
    $(".hot_change a").click(function(){
        
        $(".hot_list1").toggle()
    })
})

