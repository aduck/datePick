function Pop(opts){
	// 弹窗id
	this.id=opts.id;
	// 弹窗层级
	this.zIndex=opts.zIndex||99;
	// 是否有全屏背景
	this.fullpage=typeof opts.fullpage==="undefined" ? false : opts.fullpage;
	// 是否已弹窗
	this.state=0;
	// 如果有背景是否触发点击背景关闭弹窗
	this.closeAble=opts.closeAble===true?true:false;
	// 初始化前回调
	this.beforeInit=typeof opts.beforeInit=="function" ? opts.beforeInit : null;

	this.elem=document.getElementById(this.id);

	// 总弹窗计数
	window.poperCount=typeof poperCount==='undefined' ? 1:++poperCount;
	this.init.apply(this,arguments);
}
Pop.prototype.init=function(){
	var fullpage,
		elem=this.elem,
		self=this;
	this.state=0;
	if(self.beforeInit){
		self.beforeInit();
	}
	if(this.fullpage){
		fullpage=this.fullpage;
		fullpage.style.opacity="0";
		fullpage.style.display="none";
		if(this.closeAble===true){
			fullpage.addEventListener('click',function(e){
				if(e.target==this){
					self.close();
				}
			},false);
		}
	}else{
		elem.style.opacity="0";
		elem.style.display="none";
	}
	if(poperCount>1){
		elem.style.zIndex=this.zIndex+poperCount;
	}else{
		elem.style.zIndex=this.zIndex;
	}
}

Pop.prototype.open=function(){
	var fullpage,
		elem=this.elem;
	if(this.state===0){
		if(this.fullpage){
			fullpage=this.fullpage;
			fullpage.style.display="block";
			fullpage.style.opacity="1";
			fullpage.classList.add("ani");
		}else{
			elem.style.opacity="1";
			elem.style.display="block";
		}
		elem.classList.add("ani");
	}
	this.state=1;
}

Pop.prototype.close=function(){
	var fullpage,
		elem=this.elem;
	if(this.state===1){
		if(this.fullpage){
			fullpage=this.fullpage;
			fullpage.classList.remove("ani");
			fullpage.style.opacity="0";
			fullpage.style.display="none";
		}else{
			elem.style.opacity="0";
			elem.style.display="none";
		}
		elem.classList.remove("ani");
	}
	this.state=0;
}

Pop.create=function(opts){
	return new Pop(opts);
}