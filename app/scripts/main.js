var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
document.body.appendChild(canvas);
var lives = 3;
var fingers = [];
var bugs = [];
var then = Date.now();
var temp = 0;
var bugImage = new Image();
var fingerImage = new Image();
fingerImage.src= "images/cloud.png";

var background = new Image();
background.src = "images/sky.jpg";

var init = function(){
	lives = 3;

	for (var i=0;i<2;i++){

		if (i <1){
			var finger = {
			maxX: left.getMaxX()[0],
			minX:left.getMinX()[0],
			maxY: left.getMaxX()[1],
			minY: left.getMinX()[1]
			};
		}else{
			var finger = {
			maxX: right.getMaxX()[0],
			minX:right.getMinX()[0],
			maxY: right.getMaxX()[1],
			minY: right.getMinX()[1]
			};
		}

		fingers.push(finger);
	};

	initBug();
	main();
};

var main = function(){
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	requestAnimationFrame(main);
};



var initBug = function(){
	for(var i=0;i<1;i++){
		var bug = {
			speedX: 120, // movement in pixels per second
			speedY: 20,
			posX: Math.floor(Math.random()*(1200)),
			posY: 0,
			fall: true
		};

		bug.speedX = Math.floor(Math.random()*(256+156)-156);
		if (bug.speedX > 0){
			bug.path = "images/LadybugRight.png";
		}
		else {
			bug.path ="images/Ladybug.png"
		}
		bugImage.src = bug.path;
		bugs.push(bug);
		}
};

var update = function(time){
	count = time;
	count -= temp;
	if (count*10 > 1){
		temp = time;
		initBug();
	}

	for(var i=0;i<bugs.length;i++){
		if(bugs[i].fall){

			for(var j=0;j<fingers.length;j++){
				if(
					bugs[i].posX <= (fingers[j].posX + 20)
					&& fingers[j].posX <= (bugs[i].posX + 20)
					&& bugs[i].posY <= (fingers[j].posY + 20)
					&& fingers[j].posY <= (bugs[i].posY + 20)
					){
					bugs[i].fall = false;
				}
				else if(bugs[i].posY >= 600){
					bugs[i].fall = false;
					bugs.splice(i, 1);
					lives -= 1;
					if (lives >= 1){
						initBug();
					}
					else{
					//	alert("You lost :(");
						// init();
					}
				}
				else {
					bugs[i].posY = bugs[i].posY + bugs[i].speedY*time;
					// bugs[i].fall = true;
				}
			}
		}
		else {
			bugs[i].posX = bugs[i].posX+bugs[i].speedX*time;
			if(bugs[i].posX >= 1200 || bugs[i].posX <= 0){
					bugs[i].speedX = bugs[i].speedX*-1;
					if (bugs[i].speedX > 0){
						bugs[i].path = "images/LadybugRight.png";
					}
					else {
						bugs[i].path ="images/Ladybug.png"
					}
					bugImage.src = bugs[i].path;
				}
			for(var j=0;j<fingers.length;j++){
				if(
					bugs[i].posX >= (fingers[j].posX + 20)
					&& fingers[j].posX >= (bugs[i].posX + 20)
					&& bugs[i].posY >= (fingers[j].posY + 20)
					&& fingers[j].posY >= (bugs[i].posY + 20)
					){
					bugs[i].fall = true;
				}
			}
		}

	};
};

var render = function() {
	ctx.drawImage(background, 0, 0);

	for(var i=0;i<bugs.length;i++){
		ctx.drawImage(bugImage, bugs[i].posX, bugs[i].posY);
	}

	for(var j=0;j<fingers.length;j++){
		ctx.drawImage(fingerImage, fingers[j].posX, fingers[j].posY);
		// ctx.fillStyle="hsl(100, 100%, 60%)";
		// ctx.fillRect(fingers[j].posX,fingers[j].posY,60,60);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Lives: " + lives, 32, 32);
};


//updating hand positions
var updateFingers = function(){

	// for(var j=0;j<5;j++){
	// 	ctx.fillStyle="hsl(100, 100%, 60%)";
	// 	ctx.fillRect(left.getFinger(j)[0] * 2,600 - left.getFinger(j)[1],100,100);
	// 	//ctx.fillRect(fingers[j].posX,fingers[j].posY,100,100);

	// 	ctx.fillStyle="hsl(100, 100%, 60%)";
	// 	ctx.fillRect(right.getFinger(j)[0] * 2 ,600 - right.getFinger(j)[1],100,100);

	// }




};

init();