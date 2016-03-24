function autoSize(){
	var root=document.documentElement,
		deviceWidth=parseInt(root.clientWidth);	
	root.style.fontSize=deviceWidth<640?(deviceWidth*20/640+"px"):"20px";
}
var et="orientationchange" in window?"orientationchange":"resize";
document.addEventListener('DOMContentLoaded',autoSize,false);
window.addEventListener(et,autoSize,false);