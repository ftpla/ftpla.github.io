//盒子
var game_box=document.getElementById("game_box");
var game_box_left=document.getElementById("game_box_left");
var game_box_middle=document.getElementById("game_box_middle");
//游玩窗口
var game_window=document.getElementById("game_window");
//作品信息
var game_name=document.getElementById("game_name");
var game_author_name=document.getElementById("game_author_name");
var game_pro=document.getElementById("game_pro");
var game_explain=document.getElementById("game_explain");
//按钮
var bt_zoom_large=document.getElementById("zoom_large");
var bt_zoom_small=document.getElementById("zoom_small");
var bt_reload=document.getElementById("reload");

//获取url传参
const searchParams = new URLSearchParams(window.location.search);
gameid=searchParams.get('gameid')*1

//设值
$("title").text(game[gameid].name+" | "+author[game[gameid].author].name+" | 饭团工作室 | FANTUN");
game_name.innerText=game[gameid].name;
game_author_name.innerText=author[game[gameid].author].name;
game_pro.innerHTML=game[gameid].pro;
game_explain.innerHTML=game[gameid].explain;

//添加meta标签
function addMeta(name,content){
	var meta=document.createElement("meta");
	meta.name=name;
	meta.content=content;
	document.getElementsByTagName("head")[0].appendChild(meta);
}
addMeta("keywords",game[gameid].name);
addMeta("description",game[gameid].pro);

//游戏窗口设定
game_window.src=game[gameid].url;
game_window.width=game[gameid].res[0];
game_window.height=game[gameid].res[1];
game_box_left.style.width=(game_window.width*1+20)+"px";
game_box.style.width=game_box.offsetWidth+game_box_left.offsetWidth-500+"px";

//介绍栏高度设定
game_box_middle.style.height=30+game_window.offsetHeight+"px";

//作者头像设定
$("#game_author img").attr("src",author[game[gameid].author].img);

//链接作者
$("#game_author img,#game_author_name").click(function(){
	window.open("../other/author.html?id="+game[gameid].author);
})

function 放大(){
	game_box.style.width=game_box.offsetWidth+game_window.width*0.25+"px";
	game_box_left.style.width=game_box_left.offsetWidth+game_window.width*0.25+"px";
	game_window.width=game_window.width*1.25;
	game_window.height=game_window.height*1.25;
	game_box_middle.style.height=30+game_window.offsetHeight+"px";
}
function 缩小(){
	game_box.style.width=game_box.offsetWidth-game_window.width*0.2+"px";
	game_box_left.style.width=game_box_left.offsetWidth-game_window.width*0.2+"px";
	game_window.width=game_window.width*0.8;
	game_window.height=game_window.height*0.8;
	game_box_middle.style.height=30+game_window.offsetHeight+"px";
}
function 刷新(){
	game_window.src=game_window.src;
}
function 跳转(){
	location.href="../games/?gameid="+this.number;
}

bt_zoom_large.onclick=放大
bt_zoom_small.onclick=缩小
bt_reload.onclick=刷新

//右侧推荐栏
show_img=document.getElementsByClassName("game_show_img");
show_text=document.getElementById("game_box_right").getElementsByTagName("h4");
show_list=[]
for (var i = 0; i < show_img.length; i++) {
	//生成随机数并防止内容重复
	do{var cache=random(0,game.length-1)}while(show_list.indexOf(cache)!=-1||cache==gameid);
	show_list[show_list.length]=cache;
	
	show_img[i].src=game[cache].img;
	show_text[i].innerText=game[cache].name;
	//给跳转函数传入参数
	show_img[i].number=cache;show_img[i].onclick=跳转;
	show_text[i].number=cache;show_text[i].onclick=跳转;
}