;(function($){
	$.fn.picsolo=function(opt){
		var defaults={
			height:'auto',// 'static\auto'
			nul:''

		}
		opt = $.extend(defaults,opt);
		$(this).each(function(){
			var that=$(this);
			var eles={
				box:   $('#picsolo-box',that),
				text:   $('#picsolo-text',that),
				navBox:$('#picsolo-navBox',that),
				nav:   $('#picsolo-nav',that),
				pageNext:$('#picsolo-pageNext',that),
				pagePrev:$('#picsolo-pagePrev',that),
				// imgNext: $('#picsolo-imgNext',that),
				// imgPrev: $('#picsolo-imgPrev',that),
				imgBox: $('#picsolo-imgBox',that),
				img: $('#picsolo-img',that),
				tmp: new Image()
			}
			var nav={
				liFirst:eles['nav'].find('li:first'),
				liLast :eles['nav'].find('lis:last'),
				length :eles['nav'].find('li').length
			}
			reset();

			eles['nav'].find("li").bind('click',function(){
				if($(":animated").length<=0){
					scroll($(this));
				}
			});
			//上一张事件
			eles['pagePrev'].click(function(){
				if(eles['nav'].filter(":animated").length<=0){
					var cur = eles['nav'].find("li.current").prev();
					scroll(cur);
				}
			})
			//下一张事件
			eles['pageNext'].click(function(){
				if(eles['nav'].filter(":animated").length<=0){
					var cur = eles['nav'].find("li.current").next();
					scroll(cur);
				}
			});
			//键盘控制
			$(document).bind("keyup",function(e){
				switch(e.keyCode){
					//up
					//case 38 :
					//left
					case 37 : eles['pagePrev'].trigger("click"); break;
					//down
					//case 40 :
					//right
					case 39 : eles['pageNext'].trigger("click"); break;
				};
			})
			eles['tmp'].onload=function() {
				this.isloading=false;
				if (!eles['tmp'].animating) {
					var img={
						rel   :this.rel,
						rev   :this.rev,
						title :this.title,
						src   :this._src,
						width :this.width,
						height:this.height
					}
					eles['img'].width(0);
					var boxWidth=eles['box'].width(),
						boxHeight=$(window).height()-160;
					if (img.width>boxWidth) {img.width=boxWidth;img.height=img.width*this.height/this.width;};
        			if (img.height>boxHeight){img.height=boxHeight;img.width=parseInt(img.height*this.width/this.height);}
					eles['img'].parent('a').attr('href',img.rev||"#").attr('rel',img.rel||"").attr('title',img.title||"");
					eles['img'].width(img.width).attr('src',img.src).fadeIn(200);
					!!$('li.current',that).find('.picsolo-miniText').text().replace(/\s/g,'')&&eles['text'].parent().fadeIn(200);
					this.src='';
				};
			}
			function imgSolo(cur){
				if (cur.hasClass('current')) {return};
				eles['nav'].find('li.current').removeClass('current');
				var src=cur.addClass('current').find('img').attr('orgsrc');
				eles['img'].fadeOut(200,function(){
					eles['tmp'].animating=false;
					if(!eles['tmp'].isloading){
						eles['tmp'].onload();
					}
				});
				eles['text'].parent().fadeOut(200,function(){
					var html=cur.find('.picsolo-miniText').html();
					eles['text'].html(cur.find('.picsolo-miniText').html());
					
				});
				eles['tmp'].rev=cur.attr('rev')||"#";
				eles['tmp'].rel=cur.attr('rel')||'';
				eles['tmp'].title=cur.attr('title')||'';
				eles['tmp'].src=eles['tmp']._src=src;
				eles['tmp'].isloading=true;
				eles['tmp'].animating=true;
			}
			//图片列表滚动
			function scroll(cur){

				if(cur.length>0){
					var index=eles['nav'].find("li").index(cur);
					var marginL=parseInt(eles['nav'].css("marginLeft")) || 0
					var curLeft=cur.offset().left,i;
					if (index==0) {
						//最左边
						animate(0,cur);
					}else if(curLeft>nav.left+nav.widthVisibility-nav.width){
						//cur不在可视区域内
						i=cur.next().length>0?2:1;
						animate(-(index+i)*nav.width+nav.widthVisibility,cur);
					}else if (curLeft-4<=nav.left) {//-4随便写的
						//cur不在可视区域内
						i=cur.prev().length>0?1:0;
						animate((i-index)*nav.width,cur);
					}else{
						imgSolo(cur);
					}
				}
				function animate(l,c){
					eles['nav'].animate({"marginLeft":l},300,
						function(){if(c){imgSolo(c)}}
					);
				}
			}
			function reset(){
				nav.width   =nav.liFirst.outerWidth(true);
				nav.widthAll=nav.width*nav.length;
				nav.widthVisibility=eles['navBox'].width();
				nav.left    =eles['navBox'].offset().left;
				nav.leftLast=nav.widthAll-nav.width;
				if (nav.widthVisibility>nav.widthAll) {
					eles['pageNext'].hide();
					eles['pagePrev'].hide();
				}else{
					eles['pageNext'].show();
					eles['pagePrev'].show();
				}
				eles['nav'].width(nav.widthAll);
			}
			nav.liFirst.click();
			$(window).bind('resize',reset);
		});
	};

})(jQuery);