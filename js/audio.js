//create by rain 2017.2.27
var audios = document.getElementsByTagName('audio')[0];
var json = [
	{src:'source/薛之谦 - 几个你.mp3', img:'img/1.jpg', like:'false'},
	{src:'source/薛之谦 - 刚刚好.mp3', img:'img/2.jpg', like:'false'},
	{src:'source/薛之谦 - 我好像在哪见过你.mp3', img:'img/3.jpg', like:'false'},
	{src:'source/薛之谦 - 丑八怪.mp3', img:'img/4.jpg', like:'false'}
];
var now = 0;

window.onload = function() {
	
	init();
	play();
	voiveControl();
	
//	var windowX;
//	var windowY;
//	
//	window.addEventListener('click', function() {
//		windowX = event.x;
//		windowY = event.y;
//	})
	
	audios.addEventListener('timeupdate', function(){
		var lastTime;
		setInterval(function() {
			lastTime = parseInt(audios.duration - audios.currentTime);
			minute = Math.floor( lastTime/60 );
			second = Math.floor( lastTime%60 );
			showTime(minute, second);
		}, 1000);
	});
}

function init() {
	audios.volume = 0.4;
}

function play() {
	var play = document.getElementsByClassName('play-icon')[0];
	
	play.onclick = function() {
		if (audios.paused) {
			audios.play();
			play.innerHTML = '&#xe644;';
		} else {
			audios.pause();
			play.innerHTML = '&#xe778;';
		}		
	}
	
	var next = document.getElementsByClassName('next-icon')[0];
//	var pre = document.getElementsByClassName('previous')[0];
	next.onclick = function() {
		if(now >= 3) {
			now = -1;
		}
		audios.src = json[now + 1].src;		
			now++;
	}
	
//	pre.onclick = function() {
//		if (now <= 0) {
//			now = 4;
//		}
//			
//		audios.src = json[now - 1].src;
//			now--;
//	}
}

function voiveControl() {
	var voiceIcon = document.getElementsByClassName('voice-icon')[0];
	var voiceBar = document.getElementsByClassName('voice-bar')[0];
		
	//静音
	voiceIcon.onclick = function() {
		if( audios.muted ) {
			audios.muted = false;
			voiceIcon.innerHTML = '&#xe608;';
		} else {
			audios.muted = true;
			voiceIcon.innerHTML = '&#xe626;';
		}
	}
}

function showTime(min, sec) {
	var times = document.getElementsByClassName('last-time')[0];
	if (sec < 10) {
		sec = '0' + sec;
	}
	times.innerHTML = '-' + min + ':' + sec;
}
