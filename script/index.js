



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
    /******板块排行 选项卡********/
    $('.bbs-nav ul li').bind('mouseover',function(){
        var index = $(this).index();
        $(this).siblings().removeClass('act');
        $(this).addClass('act');
        $('.bbs-cont').hide();
        $('.bbs-cont').eq(index).show();
    }) 
    // 腕表排行tab切换
	$('.watch-nav ul li').bind('mouseover',function(){
		var index = $(this).index();
		$(this).siblings().removeClass('act');
		$(this).addClass('act');
		$('.watch-cont').hide();
		$('.watch-cont').eq(index).show();
	})



	$('.watch-cont ul li').bind('mouseover',function(){
		$(this).find('.watch-img').show().parent('li').siblings().find('.watch-img').hide();
	})
})
/********毒物腕表************/
function Skip(){
} 
$.extend(Skip.prototype,{
    init:function(){
        this.wrap = $(".random_list ul");
        this.page_btn = $(".random_tit li");
        this.now_page = 0;
        this.loadJson()
        .then(function(res){
            //console.log(res);
            this.json = res.subjects;
            this.renderPage()
        })
        
        this.bindEvent();
    },
    bindEvent:function(){
        this.page_btn.click($.proxy(this.changePage , this));
    },
    loadJson:function(){
        var opt = {
            url:"http://localhost:82/proxy/api.douban.com/v2/movie/top250",
            data:{start:0,count:250},
            type:"GET",
            context : this
        }
        return $.ajax(opt);;
    },
    renderPage(){
        var list = this.json;
        var html = "";
        for(var i = 5 * this.now_page ; i <= 5* this.now_page + 4; i ++){
            html += `
                    <li>
                        <figure>
                            <section>
                                <a href="javascript:void(0);">
                                    <img src="${list[i].images.small}" alt="">
                                </a>
                            </section>
                            <figcaption>
                                    <a href="http://www.xbiao.com/iwc/43274/" target="_blank">${list[i].title}</a>
                                    <span>¥${list[i].id}</span>
                                    <i><img src="http://www.xbiao.com/images/pc/2017/heart.png">${list[i].year}人喜欢</i>
                            </figcaption>
                        </figure>
                    </li>`
        }
        this.wrap.html(html);
    },
    changePage(){
        //console.log("huanyiye")
        if(this.now_page == 19){
            this.now_page = 0
        }else{
            this.now_page++;
        }
        
        this.renderPage();
    }
})
var skip = new Skip();
skip.init({

});
/******资深网友*******/ 
function netfriend(){
	var count = 1;						 //- 计数
	var n     = 6;                       //- 每次显示的数量
	var len   = $('.deep-watcher-list li').length;  //- 总数
	$('.deep-watcher-list li').hide();
	$('.deep-watcher-list li:lt('+n+')').show();
	$('.deep-watcher .title-change').bind('click',function(){
		count++;
		var old = n*count;
		if(n*count>=len){
			$('.deep-watcher-list li').hide();
			$('.deep-watcher-list li:lt('+len+')').show();
			$('.deep-watcher-list li:lt('+n*(count-1)+')').hide();
			count=0;
		}else{
			$('.deep-watcher-list li').hide();
			$('.deep-watcher-list li:lt('+n*count+')').show();
			$('.deep-watcher-list li:lt('+n*(count-1)+')').hide();
		}
	})	
}
netfriend()
/*******最新解答********/
function random(){
	var count = 1;						 //- 计数
	var n     = 5;                       //- 每次显示的数量
	var len   = $('.lastest-list li').length;  //- 总数
	$('.lastest-list li').hide();
	$('.lastest-list li:lt('+n+')').show();
	$('.lastest-answer .title-change').bind('click',function(){
		count++;
		var old = n*count;
		if(n*count>=len){
			$('.lastest-list li').hide();
			$('.lastest-list li:lt('+len+')').show();
			$('.lastest-list li:lt('+n*(count-1)+')').hide();
			count=0;
		}else{
			$('.lastest-list li').hide();
			$('.lastest-list li:lt('+n*count+')').show();
			$('.lastest-list li:lt('+n*(count-1)+')').hide();
		}
	})	
}
random() 
/*************现场直击******************/ 

function scene(){
    var btn = $(".sub_item"),
        img = $(".main_box a");

    img.eq(0).show();

    btn.mouseover(function(){
        var index = $(this).index();
        if(!$(this).hasClass("act")){
            $(this).addClass("act").siblings().removeClass("act");
        }
        img.eq(index).show().siblings().hide();
    });
}
scene()
/********huidaodingbu***********/ 
$(".return_top").on({
    "click":function(){
        $("html,body").scrollTop(0);
    }
})