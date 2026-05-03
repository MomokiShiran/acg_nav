(function($){ 
    $(document).ready(function(){
        // 侧栏菜单初始状态设置
        trigger_resizable(true);
        // 主题状态
        switch_mode(); 
        // 搜索模块
        intoSearch();
        //粘性页脚
        stickFooter();
        // 网址块提示 
        if(isPC()){ initTooltips(); }else{ initTooltips('.qr-img[data-bs-toggle="tooltip"]'); }
        // 初始化tab滑块
        intoSlider();
    });
    // Enable/Disable Resizable Event
    var wid = 0;
    $(window).resize(function() {
		clearTimeout(wid);
        wid = setTimeout(go_resize, 200); 
    });
    function go_resize() {
        stickFooter(); 
        trigger_resizable();
    }
    // count-a数字动画
    $('.count-a').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
    $(document).on('click', "a[target!='_blank']", function() {
        // 关闭移动端导航栏模态框
        if ($('.sidebar').hasClass('show')) {
            $('.sidebar').modal('hide');
        }
    });
    // 夜间模式
	$(document).on('click', '.switch-dark-mode', function(event) {
		event.preventDefault();
        
        // 使用localStorage保存模式偏好，不依赖后端
        var isDark = $('body').hasClass('io-black-mode');
        var newClass = isDark ? 'io-grey-mode' : 'io-black-mode';
        
        // 切换body类
        $('body').removeClass('io-black-mode io-grey-mode').addClass(newClass);
        
        // 保存到localStorage
        localStorage.setItem('io-theme-mode', newClass);
        
        // 更新UI
        switch_mode(); 
        
        // 移除旧的tooltip
        $("#"+ $('.switch-dark-mode').attr('aria-describedby')).remove();
    });
    function switch_mode(){
        // 从localStorage读取并应用模式
        var savedMode = localStorage.getItem('io-theme-mode');
        if(savedMode && savedMode !== '') {
            $('body').removeClass('io-black-mode io-grey-mode').addClass(savedMode);
        }
        
        if($('body').hasClass('io-black-mode')){
            if($(".switch-dark-mode").attr("data-bs-original-title"))
                $(".switch-dark-mode").attr("data-bs-original-title","日间模式");
            else
                $(".switch-dark-mode").attr("title","日间模式");
            $(".mode-ico").removeClass("icon-night");
            $(".mode-ico").addClass("icon-light");
        }
        else{
            if($(".switch-dark-mode").attr("data-bs-original-title"))
                $(".switch-dark-mode").attr("data-bs-original-title","夜间模式");
            else
                $(".switch-dark-mode").attr("title","夜间模式");
            $(".mode-ico").removeClass("icon-light");
            $(".mode-ico").addClass("icon-night");
        }
    }
    //返回顶部
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {
            $('.go-up').fadeIn(200);
        } else {
            $('.go-up').fadeOut(200);
        }
    });
    $('.go-up').click(function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
    return false;
    }); 

 
    //滑块菜单
    $('.slider_menu').children("ul").children("li").not(".anchor").hover(function() {
        $(this).addClass("hover");
        toTarget($(this).parent());
    }, function() {
        $(this).removeClass("hover");
    });
    $('.slider_menu').mouseleave(function(e) {
        var menu = $(this).children("ul");
        window.setTimeout(function() { 
            toTarget(menu) 
        }, 50)
    }) ;  
    function intoSlider() {
        $(".slider_menu[sliderTab]").each(function() {
            if(!$(this).hasClass('into')){
                var menu = $(this).children("ul");
                menu.prepend('<li class="anchor" style="position:absolute;width:0;height:28px"></li>');
                var target = menu.find('.active').parent();
                if(0 < target.length){
                    menu.children(".anchor").css({
                        left: target.position().left + target.scrollLeft() + "px",
                        width: target.outerWidth() + "px",
                        height: target.height() + "px",
                        opacity: "1"
                    })
                }
                $(this).addClass('into');
            }
        })
    }
    //粘性页脚
    function stickFooter() {
        $('.main-footer').attr('style', '');
	    if($('.main-footer').hasClass('text-xs'))
	    {
	    	var win_height				 = jQuery(window).height(),
	    		footer_height			 = $('.main-footer').outerHeight(true),
	    		main_content_height	     = $('.main-footer').position().top + footer_height ;
	    	if(win_height > main_content_height - parseInt($('.main-footer').css('marginTop'), 10))
	    	{
	    		$('.main-footer').css({
	    			marginTop: win_height - main_content_height  
	    		});
	    	}
        }
    }
 

    $('.sidebar-switch').on('click',function(){
        $('.sidebar').removeClass('mini-sidebar');

    }); 
 
    // Trigger Resizable Function
    var isMin = false,
        isMobileMin = false;
    function trigger_resizable( isNoAnim=false ) {
        if(!isMin && 767.98<$(window).width() && $(window).width()<1024){
            $('.mini-button').prop('checked', false);
            trigger_lsm_mini(isNoAnim);
            isMin = true;
            if(isMobileMin){
                $('.sidebar').addClass('mini-sidebar');
                isMobileMin = false;
            }
        }
        else if((isMin && $(window).width()>=1024) || ( isMobileMin && !isMin && $(window).width()>=1024 )){
            $('.mini-button').prop('checked', true);
            trigger_lsm_mini(isNoAnim);
            isMin = false;
            if(isMobileMin){
                isMobileMin = false;
            }
        }
        else if($(window).width() < 767.98 && $('.sidebar').hasClass('mini-sidebar')){
            $('.sidebar').removeClass('mini-sidebar');
            isMobileMin = true;
            isMin = false;
        }
    }
    // sidebar-menu-inner收缩展开
    $('.sidebar-menu-inner a').on('click',function(){
        if (!$('.sidebar-nav').hasClass('mini-sidebar')) {
            $(this).parent("li").siblings("li.sidebar-item").children('ul').slideUp(200);
            if ($(this).next().css('display') == "none") {
                $(this).next('ul').slideDown(200);
                $(this).parent('li').addClass('sidebar-show').siblings('li').removeClass('sidebar-show');
            }else{
                $(this).next('ul').slideUp(200);
                $(this).parent('li').removeClass('sidebar-show');
            }
        }
    });
    //菜单栏最小化
    $('.mini-button').on('click',function(){
        trigger_lsm_mini();

    });
    function trigger_lsm_mini( isNoAnim = false){
        if ($('.header-mini-btn input[type="checkbox"]').prop("checked")) {
            $('.sidebar-nav').removeClass('mini-sidebar');
            $('.sidebar-menu ul ul').css("display", "none");
            if(isNoAnim)
            $('.sidebar-nav').width(220);
            else
            $('.sidebar-nav').stop().animate({width: 220},200);
        }else{
            $('.sidebar-item.sidebar-show').removeClass('sidebar-show');
            $('.sidebar-menu ul').removeAttr('style');
            $('.sidebar-nav').addClass('mini-sidebar');
            if(isNoAnim)
            $('.sidebar-nav').width(60);
            else
            $('.sidebar-nav').stop().animate({width : 60},200);
        }
    }
    //显示2级悬浮菜单
    $(document).on('mouseover','.mini-sidebar .sidebar-menu ul:first>li,.mini-sidebar .flex-bottom ul:first>li',function(){
        var offset = 2;
        if($(this).parents('.flex-bottom').length!=0)
            offset = -3;
        $(".sidebar-popup.second").length == 0 && ($("body").append("<div class='second sidebar-popup sidebar-menu-inner text-sm'><div></div></div>"));
        $(".sidebar-popup.second>div").html($(this).html());
        $(".sidebar-popup.second").show();
        var top = $(this).offset().top - $(window).scrollTop() + offset; 
        var d = $(window).height() - $(".sidebar-popup.second>div").height();
        if(d - top <= 0 ){
            top  = d >= 0 ?  d - 8 : 0;
        }
        $(".sidebar-popup.second").stop().animate({"top":top}, 50);
    });
    //隐藏悬浮菜单面板
    $(document).on('mouseleave','.mini-sidebar .sidebar-menu ul:first, .mini-sidebar .slimScrollBar,.second.sidebar-popup',function(){
        $(".sidebar-popup.second").hide();
    });
    //常驻2级悬浮菜单面板
    $(document).on('mouseover','.mini-sidebar .slimScrollBar,.second.sidebar-popup',function(){
        $(".sidebar-popup.second").show();
    });
 

    $.fn.textSlider = function(settings) {
		settings = jQuery.extend({
			speed: "normal",
			line: 2,
			timer: 1000
		},
		settings);
		return this.each(function() {
			scllor($(this), settings)
		})
	};
	function scllor($this, settings) {
		var ul = $("ul:eq(0)", $this);
		var timerID;
		var li = ul.children();
		var _btnUp = $(".up:eq(0)", $this);
		var _btnDown = $(".down:eq(0)", $this);
		var liHight = $(li[0]).height();
		var upHeight = 0 - settings.line * liHight;
		var scrollUp = function() {
			_btnUp.unbind("click", scrollUp);
			ul.animate({
				marginTop: upHeight
			},
			settings.speed,
			function() {
				for (i = 0; i < settings.line; i++) {
					ul.find("li:first").appendTo(ul)
				}
				ul.css({
					marginTop: 0
				});
				_btnUp.bind("click", scrollUp)
			})
		};
		var scrollDown = function() {
			_btnDown.unbind("click", scrollDown);
			ul.css({
				marginTop: upHeight
			});
			for (i = 0; i < settings.line; i++) {
				ul.find("li:last").prependTo(ul)
			}
			ul.animate({
				marginTop: 0
			},
			settings.speed,
			function() {
				_btnDown.bind("click", scrollDown)
			})
		};
		var autoPlay = function() {
			timerID = window.setInterval(scrollUp, settings.timer)
		};
		var autoStop = function() {
			window.clearInterval(timerID)
		};
		ul.hover(autoStop, autoPlay).mouseout();
		_btnUp.css("cursor", "pointer").click(scrollUp);
		_btnUp.hover(autoStop, autoPlay);
		_btnDown.css("cursor", "pointer").click(scrollDown);
        _btnDown.hover(autoStop, autoPlay);
         
        document.addEventListener('visibilitychange',function(){
            if(document.visibilityState=='hidden') {
                autoStop;
            }else {
                autoPlay;
            }
        });
    }
    
    // 搜索模块 -----------------------
    function intoSearch() {
        if(window.localStorage.getItem("searchlist")){
            $(".hide-type-list input[data-id='"+window.localStorage.getItem("searchlist")+"']").prop('checked', true);
            $(".hide-type-list input[data-id='m_"+window.localStorage.getItem("searchlist")+"']").prop('checked', true);
        }
        if(window.localStorage.getItem("searchlistmenu")){
            $('.s-type-list.big label').removeClass('active');
            $(".s-type-list [data-id="+window.localStorage.getItem("searchlistmenu")+"]").addClass('active');
        }
        toTarget($(".s-type-list.big"),false,false);
        $('.hide-type-list .s-current').removeClass("s-current");
        $('.hide-type-list input:radio[name="type"]:checked').parents(".search-group").addClass("s-current"); 
        $('.hide-type-list input:radio[name="type2"]:checked').parents(".search-group").addClass("s-current");

        $(".super-search-fm").attr("action",$('.hide-type-list input:radio:checked').val());
        $(".search-key").attr("placeholder",$('.hide-type-list input:radio:checked').data("placeholder")); 
        if(window.localStorage.getItem("searchlist")=='type-zhannei'){
            $(".search-key").attr("zhannei","true"); 
        }
    }
    $(document).on('click', '.s-type-list label', function(event) {
        $('.s-type-list.big label').removeClass('active');
        $(this).addClass('active');
        window.localStorage.setItem("searchlistmenu", $(this).data("id"));
        var parent = $(this).parents(".s-search");
        parent.find('.search-group').removeClass("s-current");
        parent.find('input[data-id="'+$(this).attr("for")+'"]').parents(".search-group").addClass("s-current"); 
        toTarget($(this).parents(".s-type-list"),false,false);
    });
    $('.hide-type-list .search-group input').on('click', function() {
        var parent = $(this).parents(".s-search");
        var idVal = $(this).data('id').replace("m_","");
        window.localStorage.setItem("searchlist", idVal);
        parent.children(".super-search-fm").attr("action",$(this).val());
        parent.find(".search-key").attr("placeholder",$(this).data("placeholder"));

        if(idVal=="type-zhannei")
            parent.find(".search-key").attr("zhannei","true");
        else
            parent.find(".search-key").attr("zhannei","");

        parent.find(".search-key").select();
        parent.find(".search-key").focus();
    });
    $(document).on("submit", ".super-search-fm", function() {
        var key = $(this).find(".search-key").val()
        if(key == "")
            return false;
        else{
            window.open( $(this).attr("action") + key);
            return false;
        }
    });
    function getSmartTips(value,parents) {
        $.ajax({
            type: "GET",
            url: "//sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            async: true,
            data: { wd: value },
            dataType: "jsonp",
            jsonp: "cb",
            success: function(res) {
                var list = parents.children(".search-smart-tips");
                list.children("ul").text("");
                tipsList = res.s.length;
                if (tipsList) {
                    for (var i = 0; i < tipsList; i++) {
                        list.children("ul").append("<li>" + res.s[i] + "</li>");
                        list.find("li").eq(i).click(function() {
                            var keyword = $(this).html();
                            parents.find(".smart-tips.search-key").val(keyword);
                            parents.children(".super-search-fm").submit();
                            list.slideUp(200);
                        });
                    };
                    list.slideDown(200);
                } else {
                    list.slideUp(200)
                }
            },
            error: function(res) {
                tipsList = 0;
                console.log(res);
            }
        })
    }
    var listIndex = -1;
    var parent;
    var tipsList = 0;
    var isZhannei = false;
    $(document).on("blur", ".smart-tips.search-key", function() {
        parent = '';
        $(".search-smart-tips").slideUp(200)
    });
    $(document).on("focus", ".smart-tips.search-key", function() {
        isZhannei = $(this).attr('zhannei')!=''?true:false;
        parent = $(this).parents('.search');
        if ($(this).val() && !isZhannei) {
            getSmartTips($(this).val(),parent)
        }
    });
    $(document).on("keyup", ".smart-tips.search-key", function(e) {
        isZhannei = $(this).attr('zhannei')!=''?true:false;
        parent = $(this).parents('.search');
        if ($(this).val()) {
            if (e.keyCode == 38 || e.keyCode == 40 || isZhannei) {
                return
            }
            getSmartTips($(this).val(),parent);
            listIndex = -1;
        } else {
            $(".search-smart-tips").slideUp(200)
        }
    });
    $(document).on("keydown", ".smart-tips.search-key", function(e) {
        parent = $(this).parents('.search');
        if (e.keyCode === 40) {
            listIndex === (tipsList - 1) ? listIndex = 0 : listIndex++;
            parent.find(".search-smart-tips ul li").eq(listIndex).addClass("current").siblings().removeClass("current");
            var hotValue = parent.find(".search-smart-tips ul li").eq(listIndex).html();
            parent.find(".smart-tips.search-key").val(hotValue)
        }
        if (e.keyCode === 38) {
            if (e.preventDefault) {
                e.preventDefault()
            }
            if (e.returnValue) {
                e.returnValue = false
            }
            listIndex === 0 || listIndex === -1 ? listIndex = (tipsList - 1) : listIndex--;
            parent.find(".search-smart-tips ul li").eq(listIndex).addClass("current").siblings().removeClass("current");
            var hotValue = parent.find(".search-smart-tips ul li").eq(listIndex).html();
            parent.find(".smart-tips.search-key").val(hotValue)
        }
    });
})(jQuery);
function isPC() {
    let u = navigator.userAgent;
    let Agents = ["Android", "iPhone", "webOS", "BlackBerry", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (let i = 0; i < Agents.length; i++) {
      if (u.indexOf(Agents[i]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
}
function showAlert(data) {
    var title,alert,ico;
    switch(data.status) {
        case 1: 
            title = '成功';
            alert='success';
            ico='icon-adopt';
           break;
        case 2: 
            title = '信息';
            alert='info';
            ico='icon-tishi';
           break;
        case 3: 
            title = '警告';
            alert='warning';
            ico='icon-warning';
           break;
        case 4: 
            title = '错误';
            alert='danger';
            ico='icon-close-circle';
           break;
        default: 
    } 
    var msg = data.msg;
    if(!$('.alert-placeholder').hasClass('text-sm')){
        $('body').append('<div class="alert-placeholder text-sm" style="position: fixed;bottom: 10px;right: 10px;z-index: 1000;text-align: right;text-align: -webkit-right"></div>')
    }
    $html = $('<div class="alert-body" style="display:none;"><div class="alert alert-'+alert+' text-lg pr-4 pr-md-5" style="text-align:initial"><i class="iconfont '+ico+' icon-lg" style="vertical-align: middle;margin-right: 10px"></i><span style="vertical-align:middle">'+title+'</span><br><span class="text-md" style="margin-left:30px;vertical-align:middle">'+msg+'</span></div></div>');
    $('.alert-placeholder').append( $html );
    $html.show(200).delay(3500).hide(300, function(){ $(this).remove() }); 
} 
function toTarget(menu, padding = true, isMult = true) {
    var slider =  menu.children(".anchor");
    var target = menu.children(".hover").first() ;
    if (target && 0 < target.length){
    }
    else{
        if(isMult)
            target = menu.find('.active').parent();
        else
            target = menu.find('.active');
    }
    if(0 < target.length){
        if(padding)
        slider.css({
            left: target.position().left + target.scrollLeft() + "px",
            width: target.outerWidth() + "px",
            opacity: "1"
        });
        else
        slider.css({
            left: target.position().left + target.scrollLeft() + (target.outerWidth()/4) + "px",
            width: target.outerWidth()/2 + "px",
            opacity: "1"
        });
    }
    else{
        slider.css({
            opacity: "0"
        })
    }
}

// Bootstrap 5 Tooltip 初始化函数
function initTooltips(selector) {
    selector = selector || '[data-bs-toggle="tooltip"]';
    var tooltipTriggerList = [].slice.call(document.querySelectorAll(selector));
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl, { trigger: 'hover' });
    });
}

