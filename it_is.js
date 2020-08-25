/* ▽▽▽▽处理浏览器兼容写法▽▽▽▽ */
function getPrefix() {   /* 获取渲染引擎的前缀 */
	let vendorPrefixes = ['Moz','Webkit','Khtml','O','ms'],
		len = vendorPrefixes.length,
		vendor = '';
  while (len--)
    if ((vendorPrefixes[len] + 'Transform') in document.body.style)
      vendor='-'+vendorPrefixes[len].toLowerCase()+'-';
  return vendor;
}
function getEvent(){  //  通用化 移动端和pc端 事件；
	let isTouch = 'ontouchstart' in window,    //是否具有属性； 区分 移动端和pc端
	mouseEvents = (isTouch) ?
	  {down: 'touchstart',move: 'touchmove',up: 'touchend',over: 'touchstart',out: 'touchend'}:{down: 'mousedown',move: 'mousemove',up: 'mouseup',over: 'mouseover',out: 'mouseout'};
	  return mouseEvents;
}
/* △△△△处理浏览器兼容写法△△△△ */
/* ▽▽▽▽算法分类▽▽▽▽ */
function merge(left,right){  /* 归并算法 */
    let result=[];
    while(left.length&&right.length){
        if(left[0]<right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    while(left.length) result.push(left.shift());
    while(right.length) result.push(right.shift());
	return result;
}
function* mergeSort(arr){  /* 有待思考*/
	let len=arr.length;
	let left=arr.slice(0,arr.length>>1),
		right=arr.slice(arr.length>>1);
	let range=Math.ceil(len/2),count=2;
	let temp=[];
	let iterator=yield ;
		while(count<=len){
			temp=[];
			for(let i=0;i<len;i+=count){
				temp.push(...merge(arr.slice(i,count/2),arr.slice(count/2,count)))
			}
			count*=2;
			yield ;
		}
}
/* △△△△算法分类△△△△ */

/* ▽▽▽▽canvas相关▽▽▽▽ */
function drawPoint(arr){  /* 画出canvas中相应位置的点，输入连续的xy坐标，如[100,200,10,20]*/
	let color=['red','orange','blue','#0B97C4']
	for (let i = 0,len=arr.length; i <len; i+=2) {
		ctx.beginPath();
		ctx.arc(arr[i],arr[i+1],5,0,Math.PI*2,false);
		ctx.fillStyle=color[(i>>1)%color.length];
		ctx.fill();
		ctx.closePath();
	}
}
function drawEllipse(x,y,w,h){ /* 用贝赛尔曲线画椭圆 */
  let k=0.55228475;
  let ox=(w/2)*k,
	oy=(h/2)*k,
	xe=x+w,
	ye=y+h,
	xm=x+w/2,
	ym=y+h/2;
	ctx.beginPath();
	ctx.moveTo(x,ym);
	ctx.bezierCurveTo(x,ym-oy,xm-ox,y,xm,y),
	ctx.bezierCurveTo(xe-ox,y,xe,ym-oy,xe,ym),
	ctx.bezierCurveTo(xe,ye-oy,xe-ox,ye,xm,ye),
	ctx.bezierCurveTo(ox,ye,x,ye-oy,x,ym);
	ctx.stroke();
	// drawPoint([xe-ox,y,xe,ym-oy,xe,ym]);
}
/* △△△△canvas相关△△△△ */
/* ▽▽▽▽数值处理方法▽▽▽▽ */
function uni_num(num,even_or_odd=2){     /* 1个不确定的数返回为1个指定的确定数；这里把x=6||x=7可能翻到[6,7]翻到6页用uni_num(x,2),翻到7页用(x,1) */
	if( (even_or_odd&1)===0 ) {return num-(num&1); }
	return num-(num&1)+1;
}
function getRandomNum(str){  /* 数学形式=>相应范围随机整数值*/
  let range=str.match(/-?\d+|\(|\)|\[|\]/g);
  let x=range[1]*1,y=range[2]*1;
  switch(range[0]+range[3]){
	case '[)':
	  return Math.floor(Math.random()*(y-x)+x);
	case '[]':
	  return Math.round(Math.random()*(y-x+1)+x-0.5);
	case '()':
	  x++,y--;
	  return Math.round(Math.random()*(y-x+1)+x-0.5);
	case '(]':
	 return Math.ceil(-Math.random()*(y-x)+y);
  }
}
/* △△△△数值处理方法相关△△△△ */
/* ▽▽▽▽数组处理方法▽▽▽▽ */
function getValueInAarray(index,arr){ /* 任意索引值得到数组中相应的值，(5,[1,2,3])=>3*/
	return arr[index%arr.length];
}
function getRandomArray(arr,length){  /* 从输入的数组中随机打乱后，从0索引起输出指定长度的数组； */
	return arr.sort(()=>Math.random()-0.5 ).slice(0,length);
}
function checkArr(len,arr,initArr){     /* 检查数组是否满足指定的长度，不满足则 顺序补充所给的数组中不存在的值，至满足长度后返回； */
  if(arr[len-1]!==undefined) return arr;
	let array=[],count=len-arr.length;
		for(let i=0;i<initArr.length;i++){
			if( arr.includes( initArr[i] )) continue;
				array.push(initArr[i]);
			if( --count===0 ) break;
		}
     return [...arr,...array];
}
function getIndexInArray(value_arr,arr){  /* 获取值在数组中的索引 */
	let t=new Array(value_arr.length);
	for(let i=0;i<arr.length;i++){
		for(let j=0;j<value_arr.length;j++){
			if(arr[i]===value_arr[j]) {t[j]=i;break;}
		}
	}
	return t;
}
/* △△△△数组处理方法△△△△ */
/* ▽▽▽▽通用功能▽▽▽▽ */
function readStr(str){  /* 来确认字符串有没有特殊的隐藏符号 */
    let arr=[];
    for(let i=0;i<str.length;i++){
        arr.push(str.charCodeAt(i))
    }
    return arr;
}
function getEverybodyScores( key/* arr of string*/, ...arrs/* ArrayGather of number */ ){  //根据分类名统计该类下各属性的总和；如 统计学生多科目的总分，一个月内员工的加班总时间；
    let o=new Map(),temp,temp_o=[],len=arrs.length;
		key.forEach((item,idx)=>{
			temp=o.get(item);
			temp_o=new Array(len).fill(0);/* 需要赋好值，否则之后的遍历赋值不上 */
				if(   temp===undefined ){ temp_o.forEach( (val,id)=>{ temp_o[id]= arrs[id][idx] }); }
				else{ temp_o.forEach((val,id)=>{ temp_o[id]= temp[id]+arrs[id][idx] }); }
			o.set(item,temp_o);
		});
	let o_key=[],o_value=[];
	o.forEach( (value,key)=>{o_key.push( key ),o_value.push( value )} );
	return {key:o_key,vals:o_value };
}
function deltDate(date1,date2){  /* 计算两个日期相差的天数 完整的年月日如 2010.10.10 (.-/)可选*/
	let a1=new Date(date1), a2=new Date(date2);
	let d1=a1.getTime(),d2=a2.getTime();
		if(isNaN(d1)||isNaN(d2)){ return 'error'}
		else{ return (a2-a1)/(1000*60*60*24) }
}
function timeFormat(val,space='-'){  /* 格式化日期  如把 2020.6.3 格式化成 2020-06-03 */
	let patt=/(\d{4})([-\/\.])(\d{1,2})\2(\d{1,2})/;
	if(!patt.test(val)){ return '--' }
	  return val.replace(patt, (item,a1,a2,a3,a4)=>{
	  a3=('0'+a3).substr(-2) ,a4=('0'+a4).substr(-2);
	  return a1+space+a3+space+a4;})
}
function getTimes(arr,total_val=undefined){  //输入记录了时间点的数组，和最终的时间点，输出时间间隔的数组；长度会+1；*****有待确定 arr最后一个值为total_val时的输出******
  let arr_temp=arr.slice(),temp=0,idx=arr.length-1;
	if(total_val){ 
	  if(arr[idx] <total_val ) arr_temp.push(total_val);
	  else{ arr[idx] =total_val  } 
	}
	arr_temp=arr.map( (item)=>{let r;[r,temp]=[temp,item]; return item-r});
  return arr_temp;
}
function getTimeSpace(arr,total_val){  //输入记录了时间点的数组，和最终的时间点，输出时间间隔的数组；长度会+1；如得出音频的各段时长。
  let temp_arr=[];
  arr.reduce( (pipe,item,idx)=>{
    temp_arr.push( Math.round( (item-pipe).toFixed(3)*100 )/100 );
    if( idx===(arr.length-1) ) temp_arr.push( Math.round((total_val - item).toFixed(3)*100)/100 );
    return item;
  } ,0);
  return temp_arr;
}
/* △△△△通用功能△△△△ */

function screenRectangle(){  //可返回长方形界面，但是好像不能翻转屏幕呢。
	let width=window.innerWidth,height=window.innerHeight;
	// return {width,height};
	if(width>=height) return {width,height};
	return {width:height,height:width};
}
function testPerform(fn,times=10000){  //大致测试某个操作的性能；
	console.time('1');
	for(let i=0;i<times;i++){fn();}
	console.timeEnd('1');
}
async function readerText(text,type=0,callback){ /* 测试使用,把文本读成arraybuffer； */
let a=await new Promise(function(resolve,reject){
			let f=new FileReader();
			let b=new Blob([text]);
			f.onload=function(){  resolve(f.result); }
			switch(type){
				case 0:
					f.readAsArrayBuffer(b);
					break;
				case 1:
					f.readAsDataURL(b);
					break;
				case 2:
					f.readAsText(b);
					break;
			}
		});
		console.log(a);
		if(typeof(callback)==='function') callback(a);
}
/*  图片地址数组，返回相应图片对象数组；一个个接着加载图片，
	而不是一下子加载；需要 checkImg 函数
*/
async function preloadImg(arr){   
    let t=0,a=[];
    while(t<arr.length){
        a[t]=await  checkImg( arr[t])
        t++;
    }
	console.log('ok');
	return a;
}
function checkImg(img_src){  /* 安全加载图片； */
	let img=new Image();
	return new Promise((resolve,reject)=>{
		img.onload =()=>{ console.log('图片加载成功！'+img_src);resolve(img) }
		img.onerror=()=>{ console.log('图片加载失败！'+img_src);reject('0')};
		img.src=img_src;
	})
}
function getImgInnerscale(type=0,x,y,...arr){  /* 获取小图片在整个大图片中的（x,y,width,height）比例，用于拼图 */
   if(type){
		let a=[],count=0;
		while(count<arr.length){
			a.push((arr[count++]/x).toFixed(3)*1),a.push((arr[count++]/y).toFixed(3)*1);
		}
		return a;
	}
	else{
		let a=[],b=[],c=[],d=[],count=0;
		while(count<arr.length){
			a.push((arr[count++]/x).toFixed(3)*1);
			b.push((arr[count++]/y).toFixed(3)*1);
			c.push((arr[count++]/x).toFixed(3)*1);
			d.push((arr[count++]/y).toFixed(3)*1);
		}
		console.log('xy位置和w宽h高为：\n'+a+'\n'+b+'\n'+c+'\n'+d+'\n');
	}
}

function to2jz(...a){ /* 输入一堆 -127到127 的数字，转化为2进制带符号的格式； */
	let temp=[],temp_value,direction;
    for(let i=0;i<a.length;i++){
		a[i]<0?( direction='1',a[i]=127&a[i]):(direction='0')
		temp_value=a[i].toString(2);
        temp_value=temp_value.replace(/\d+/,(item,idx)=>{
			let t='0000000';
			item.length<7 && (item=(t+item).substr(-7));
			return direction+item;
		})
		temp[i]=temp_value;
    }
	return temp;
}
function utf8tohex(arr){ /* 目前把文本用utf8编码过的2进制还原为了原来的的2进制 */
	let tt=[],temp='',count=0;
	arr.reduce((pipe,val)=>{ 
		if(val.substr(0,3)==='111'){ 
			count=0;pipe=val.substr(-4);
			return pipe;
		}
		else if( val.substr(0,2)==='10'){
			  if(count===0){
				  count++;
				  pipe=pipe+val.substr(2,4);
				  q=tt[0];
				  tt.push( pipe );
				  return val.substr(-2);
			  }
			  else if(count===1){
				  count=0;
				  pipe=pipe+val.substr(-6);
				  tt.push( pipe );
				  return '';
			  }
		}
		else {
			tt.push(val);
			return '';
		}
	},'') /* tt变成了正确的数字； */
	return tt;
}

function base64decode(str,type=1) { /* base64 解码回原来的元数据*/
   	var base64DecodeChars = new Array(  /* 将ascii数值转化为base64的映射表*/
   	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
   	    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
   	    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
   	    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
   	    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
   	    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
   	
       var c1, c2, c3, c4;
       var i, len, out=[];
   
       len = str.length;
       i = 0;
       while(i < len) {
   	/* c1 */
   	do {
   	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
   	} while(i < len && c1 == -1);
   	if(c1 == -1)
   	    break;
   	/* c2 */
   	do {
   	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
   	} while(i < len && c2 == -1);
   	if(c2 == -1)
   	    break;
   	/* c3 */
   	do {
   	    c3 = str.charCodeAt(i++) & 0xff;
   	    if(c3 == 61){
 			if(type===1){
 				out.push(c1,c2);  /* 获取到了base64本来的编码； */
 			}
 			else{
 				let d1=c1<<2|c2>>4;
 				out.push(d1);  /* base64解码 */
 			}
 			  /* return out; */
			  /* return getArrayBuffer(out); */
 			  return new Int8Array(out);
 		}
   	    c3 = base64DecodeChars[c3];
   	} while(i < len && c3 == -1);
   	if(c3 == -1)
   	    break;
   	/* c4 */
   	do {
   	    c4 = str.charCodeAt(i++) & 0xff;
   	    if(c4 == 61){
 			if(type===1){
 				out.push(c1,c2,c3);  /* 获取到了base64本来的编码； */
 			}
 			else{
 				let d1=c1<<2|c2>>4,
 					d2=(c2<<4)&0xff|c3>>2;
 				out.push(d1,d2);  /* base64解码 */
 			}
 			   /* return out; */
			   /* return getArrayBuffer(out); */
 			  return new Int8Array(out);
 		}
   	    c4 = base64DecodeChars[c4];
   	} while(i < len && c4 == -1);
   	if(c4 == -1)
   	    break;
   			if(type===1){
   				out.push(c1,c2,c3,c4);  /* 获取到了base64本来的编码； */
   			}
   			else{
   				let d1=c1<<2|c2>>4,
   					d2=(c2<<4)&0xff|c3>>2,
   					d3=(c3<<6)&0xff|c4;
   				out.push(d1,d2,d3);  /* base64解码 */
   			}
       }
  /* return out; */
  /* return getArrayBuffer(out); */
 	  return new Int8Array(out);
}
function getArrayBuffer(out){  //输入数值在256以内的数组，转化为相应的ArrayBuffer；
	let buffer = new ArrayBuffer(out.length),
		   arr = new Int8Array(buffer);
	for(let len=arr.length,i=0;i<len;i++)  arr[i]=out[i];
	return buffer;
}