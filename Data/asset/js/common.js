$(function() {
	var floatnav=$('.floatnav');
	floatnav.append($('.box-nav').clone()).css({'left':-floatnav.width()});
	floatnav.find('.button').bind('click',function(){
		if (floatnav.hasClass('show')) {
			floatnav.removeClass('show').animate({'left':-floatnav.width()},200);
		}else{
			floatnav.addClass('show').animate({'left':0},200);
		}
	});
	$('.nav-main>li').bind('click',function(e){
		var that=$(this);
		var subnav=that.find('.nav-main-in');
		var subnavs=that.siblings().find('.nav-main-in');
		if ($(e.target).parents('.nav-main-in').length) {return};
		if (subnav.length) {
			that[subnav.is(":visible")?'removeClass':'addClass']("current");
			subnav[subnav.is(":visible")?'slideUp':'slideDown'](200);
			if (subnavs.length) {
				that.siblings().removeClass("current");
				subnavs.slideUp(200);
			};
		};
	});
	$('i.notice').bind("click",function(){
		alert('快捷按键说明:\n "Esc/x":关闭看图窗口;')
	});
	var isRoot=($("#btns-back").attr('rel')==1);
	$("#btns-back").html((history.length>2?'<a href="javascript:history.back();" class="btn-back">上一步</a>':'')+'<a href="'+(isRoot?'':'../')+'index.html" class="btn-back">返回首页</a><a href="'+(isRoot?'Data/':'')+'catalogue.html" class="btn-back">本书目录</a>');

	$(".box-pics")[0]&&$(".box-pics").picsolo();
	$("#page-empty").html('很抱歉，此栏目下暂时没有内容。<br><br>您可以选择返回<a href="catalogue.html">本书目录</a>。');

	if (parseInt($.browser.version)==6) {
		function reset(){
			var getPercent=function(o) {
				return parseFloat(o.split('%')[0])/100;
			}
			$('.books-pages>div').each(function(){
				var that=$(this);
				that.height(that.height);
				that.find('a').each(function(){
					this.style.height.indexOf('%')>=0&&$(this).attr('myheight',getPercent(this.style.height));
					$(this).height(parseInt(that.height()*$(this).attr('myheight')));
				});
			});
		
			
		}
		reset();
		$(window).bind("resize",reset);
	};
	var links_timeout;
	var links_li=$('.links-li');
	if(links_li.find('.links-div').text().replace(/\s*/gm,'')){
		links_li.hover(function() {
			clearTimeout(links_timeout);
			var that=$(this).find('.links-div')
			that.show();
		},function(){
			var that=$(this);
			links_timeout=setTimeout(function(){that.find('.links-div').hide();},200);
		}).show();
	}else{
		links_li.hide();
	}





});