var datePick=function(){

	var defaults={
		baseNum:30,  // 单位高度
		yearFrom:2000,  // 从哪年开始
		yearEnd:new Date().getFullYear()
	}
	var i_1=0,
		i_2=0,
		i_3=0,
		y_box=document.getElementById('datePick-year'),
		m_box=document.getElementById('datePick-month'),
		d_box=document.getElementById('datePick-day'),
		date_box=typeof document.getElementById('datePick-title')!='undefined' ? document.getElementById('datePick-title') : null,
		today=new Date(),
		thisYear=today.getFullYear(),
		thisMonth=today.getMonth()+1,
		thisDay=today.getDate();

	return {
		result:{},
		render:function(i_1,i_2,i_3,baseNum){
			var y_str='',
				m_str='',
				d_str='',
				y_arr=[],
				m_arr=[],
				d_arr=[];
			for(var i=defaults.yearFrom;i<=defaults.yearEnd;i++){
				y_arr.push(i);
				i=this.checkNum(i);
				y_str+="<li>"+i+"</li>";
			}
			for(var i=1;i<=12;i++){
				m_arr.push(i);
				i=this.checkNum(i);
				m_str+="<li>"+i+"</li>";
			}
			var year=y_arr[i_1],
				month=m_arr[i_2];
			switch(month){
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					for(var i=1;i<=31;i++){
						i=this.checkNum(i);
						d_str+="<li>"+i+"</li>";
					}
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					for(var i=1;i<=30;i++){
						i=this.checkNum(i);
						d_str+="<li>"+i+"</li>";
					}
					break;
				case 2:
					if((year%4==0&&year%100!=0)||year%400==0){
						for(var i=1;i<=29;i++){
							i=this.checkNum(i);
							d_str+="<li>"+i+"</li>";
						}
					}else{
						for(var i=1;i<=28;i++){
							i=this.checkNum(i);
							d_str+="<li>"+i+"</li>";
						}
					}
					break;
			}
			
			// 更新dom
			y_box.innerHTML=y_str;
			m_box.innerHTML=m_str;
			d_box.innerHTML=d_str;

			// 控制top
			y_box.style.top=baseNum*(2-i_1)+"px";
			m_box.style.top=baseNum*(2-i_2)+"px";
			d_box.style.top=baseNum*(2-i_3)+"px";
		},

		adsorption:function(o){
			var top=parseInt(o.style.top),
				baseNum=defaults.baseNum,
				len=o.getElementsByTagName('li').length;
			// 第一个
			if(Math.round(top/baseNum)>=2){
				return 0;
			}
			// 最后一个
			if(Math.round(top/baseNum)<=-(len-3)){
				return len-1;
			}
			return 2-Math.round(top/baseNum);
		},

		callback:function(o){
			var baseNum=defaults.baseNum;
			switch(o){
				case y_box:
					i_1=this.adsorption(o);
					i_2=0;
					i_3=0;
					this.render(i_1,i_2,i_3,baseNum);
					break;
				case m_box:
					i_2=this.adsorption(o);
					i_3=0;
					this.render(i_1,i_2,i_3,baseNum);
					break;
				case d_box:
					i_3=this.adsorption(o);
					this.render(i_1,i_2,i_3,baseNum);
					break;
			}
			this.returnResult(i_1,i_2,i_3);
		},

		returnResult:function(i1,i2,i3){
			// 修改class
			var year_lists=Array.prototype.slice.call(y_box.getElementsByTagName('li'),0),
				month_lists=Array.prototype.slice.call(m_box.getElementsByTagName('li'),0),
				day_lists=Array.prototype.slice.call(d_box.getElementsByTagName('li'),0);
			year_lists.forEach(function(year,index){
				year.classList.remove('current');
				if(index===i1){
					year.classList.add('current');
				}
			})
			month_lists.forEach(function(month,index){
				month.classList.remove('current');
				if(index===i2){
					month.classList.add('current');
				}
			})
			day_lists.forEach(function(day,index){
				day.classList.remove('current');
				if(index===i3){
					day.classList.add('current');
				}
			})

			// 返回结果
			this.result.year=defaults.yearFrom+i1;
			this.result.month=i2+1;
			this.result.day=i3+1;

			if(date_box){
				var r_m=this.checkNum(this.result.month),
					r_d=this.checkNum(this.result.day);
				date_box.innerHTML=this.result.year+"-"+r_m+"-"+r_d;
			}
		},

		checkNum:function(n){
			return n<10 ? "0"+n : n;
		},

		init:function(){
			i_1=thisYear-defaults.yearFrom,
			i_2=thisMonth-1,
			i_3=thisDay-1;
			this.render(i_1,i_2,i_3,defaults.baseNum);
			this.returnResult(i_1,i_2,i_3);
		}
	}
}();		

datePick.init();
window.datePick=datePick;