// 触屏滑动
function TmAble(elem,opts){
	if(!opts) opts={};
	this.X=typeof opts.X=='undefined' ? true : opts.X;
	this.Y=typeof opts.Y=='undefined' ? true : opts.Y;
	this.endCallback=opts.endCallback || null;
	// 各种变量
	var initPosX=0,
		initPosY=0,
		movePosX=0,
		movePosY=0,
		endPosX=0,
		endPosY=0,
		top,
		left,
		_top,
		_left,
		self=this;
	// 是否设置位置属性
	if(!(document.defaultView.getComputedStyle(elem,null)['position'] && document.defaultView.getComputedStyle(elem,null)['position']!='static')){
		elem.style.position="relative";
	}	
	elem.addEventListener('touchstart',function(e){
		initPosX=parseInt(e.touches[0].clientX);
		initPosY=parseInt(e.touches[0].clientY);
		if(self.X){
			_left=document.defaultView.getComputedStyle(elem,null)['left'];
			if(_left=="0" || _left=="auto"){
				elem.style.left="0";
				left=0;
			}else{
				elem.style.left=_left;
				left=parseInt(_left);
			}
		}
		if(self.Y){
			_top=document.defaultView.getComputedStyle(elem,null)['top'];
			if(_top=="0" || _top=="auto"){
				elem.style.top="0";
				top=0;
			}else{
				elem.style.top=_top;
				top=parseInt(_top);
			}
		}
	},false);
	elem.addEventListener('touchmove',function(e){		
		movePosX=parseInt(e.changedTouches[0].clientX);
		movePosY=parseInt(e.changedTouches[0].clientY);
		e.preventDefault();
		if(self.X){
			elem.style.left=movePosX-initPosX+left+"px";
		}
		if(self.Y){		
			elem.style.top=movePosY-initPosY+top+"px";
		}
	},false);
	elem.addEventListener('touchend',function(e){
		endPosX=parseInt(e.changedTouches[0].clientX);
		endPosY=parseInt(e.changedTouches[0].clientY);
		if(self.endCallback){
			self.endCallback({
				eX:endPosX,
				eY:endPosY,
				iX:initPosX,
				iY:initPosY
			});
		}
	},false);
}
TmAble.init=function(elem,opts){
	return new TmAble(elem,opts);
}
window.TmAble=TmAble;