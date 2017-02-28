//create by rain 2017.2.28
var audios = $('audio')[0];
var json = [
	{name:'刚刚好', singer:'薛之谦', src:'source/薛之谦 - 刚刚好.mp3', img:'img/1.jpg', like:false},
	{name:'一个人', singer:'卢润泽', src:'source/卢润泽 - 一个人.mp3', img:'img/2.jpg', like:true},
	{name:'流川枫与苍井空', singer:'黑撒', src:'source/黑撒 - 流川枫与苍井空.mp3', img:'img/3.jpg', like:false},
	{name:'还记得吗', singer:'曹轩宾', src:'source/曹轩宾 - 还记得吗.mp3', img:'img/4.jpg', like:false}
];
var now = 0;
var lrcShow = false;
var songTime;

window.onload = function() {
	
	init();
	play();
	voiveControl();
	likeIt();
	
	//时长倒计时
	audios.addEventListener('timeupdate', function(){
		songTime = audios.duration;
		var lastTime;
		setInterval(function() {
			var curTime = audios.currentTime
			lastTime = parseInt(songTime - curTime);
			minute = Math.floor( lastTime/60 );
			second = Math.floor( lastTime%60 );
			showTime(minute, second);
			progressBar(curTime, songTime);
		}, 1000);
	});
}

//初始化
function init() {
	audios.volume = 0.4;
	
	likeOrnot();
}

//功能键
function play() {
	var play = $('.play-icon')[0];
	//暂停播放
	play.onclick = function() {
		if (audios.paused) {
			audios.play();
			play.innerHTML = '&#xe644;';
		} else {
			audios.pause();
			play.innerHTML = '&#xe778;';
		}		
	}
	
	var next = $('.next-icon')[0];
	var face = $('.face-img')[0];
	var songName = $('.song-name>a')[0];
	var singer = $('.singer')[0];
	//下一首
	next.onclick = function() {
		if(now >= 3) {
			now = -1;
		}
		//更新基本状态；
		audios.src = json[now + 1].src;		
		now++;
		face.src = json[now].img;
		songName.innerHTML = json[now].name;
		singer.innerHTML = json[now].singer;
		likeOrnot();
	}
}

function voiveControl() {
	var voice = $('.voice')[0];
	var voiceIcon = $('.voice-icon')[0];
	var voiceBar = $('.voice-bar')[0];
	var loap = $('.voice-l')[0];
	
	//静音
	voiceIcon.onclick = function() {
		if( audios.muted ) {
			audios.muted = false;
			voiceIcon.innerHTML = '&#xe608;';
			loap.style.width = audios.volume * 50 + 'px';
		} else {
			audios.muted = true;
			voiceIcon.innerHTML = '&#xe626;';
			loap.style.width = 0;
		}
	}
	
	//音量条控制
	voice.onmouseover = function() {
		voiceBar.style.display = 'block';
	}
	voice.onmouseout = function() {
		voiceBar.style.display = 'none';
	}
	
	voiceBar.onmousedown = function(e) {
		e = e || window.event;
		var x = e.offsetX;
		var y = e.offsetY;			
		console.log(x);
		
		audios.volume = ( Math.round(x/5) ) / 10;
		//静音
		if (x < 5) {
			loap.style.width = 0;
			audios.volume = 0;
			audios.muted = true;
			voiceIcon.innerHTML = '&#xe626;';
		} else {
			loap.style.width = x + 'px';
			audios.muted = false;
			voiceIcon.innerHTML = '&#xe608;';
		}
	}
}

function showTime(min, sec) {
	var times = $('.last-time')[0];
	if (sec < 10) {
		sec = '0' + sec;
	}
	times.innerHTML = '-' + min + ':' + sec;
}

//点击收藏
function likeIt() {
	var like = $('.like-icon')[0];
	like.onclick = function() {
		console.log(json[now].like);
		if (json[now].like) {
		json[now].like = false;
		like.style.color = '#2c2c2c';
	} else {
		json[now].like = true;
		like.style.color = '#ff2c56';
		}
	}
}

function likeOrnot() {
	var like = $('.like-icon')[0];
	if (json[now].like) {
		like.style.color = '#ff2c56';
	} else {
		like.style.color = '#2c2c2c';
	}
}

//进度条
function progressBar(time, dur) {
	var proBar = $('.pro-ab')[0];
	var ratio = 450 / dur;
	console.log(time);
	proBar.style.width = time*ratio + 'px';
}

