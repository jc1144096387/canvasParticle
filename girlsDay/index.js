(function () {


  // 为不同浏览器打上补丁
  (function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  }());

















  //粒子动画
  var t = 0;//当前时间
  var d = 200;//持续时间
  var timer;
  //animate动画函数
  function particle_animate(oldParticles, offset_x, offset_y, animate) {

    // for(let i = 0; i < oldParticles.length; i ++){
    //   var n = 100 + Math.random()*500;
    //   offset_x[i] = (newParticles[i].x - oldParticles[i].x)/n*speed;
    //   offset_y[i] = (newParticles[i].y - oldParticles[i].y)/n*speed;
    //   flag[i] = 0;
    // }
    //粒子动画,n为到达目标地点的移动次数


    ctx.clearRect(0, 0, W, H);

    render(20);

    for (let i = 0; i < oldParticles.length; i++) {
      // if(Math.abs(newParticles[i].x - oldParticles[i].x)<=Math.abs(offset_x[i])*2||Math.abs(newParticles[i].y - oldParticles[i].y)<=Math.abs(offset_y[i])*2){
      //   // oldParticles[i].setXY(newParticles[i].x,newParticles[i].y);
      //   oldParticles[i].draw(oldParticles[i].x+offset_x[i],oldParticles[i].y+offset_y[i]);
      //   flag[i] = 1;

      //   continue;
      // }

      if (t == 0) {
        oldParticles[i].setXY(oldParticles[i].current_x, oldParticles[i].current_y);
      }

      if (t >= oldParticles[i].delay) {
        var x = animate(t - oldParticles[i].delay, oldParticles[i].x, offset_x[i], d - oldParticles[i].delay);
        var y = animate(t - oldParticles[i].delay, oldParticles[i].y, offset_y[i], d - oldParticles[i].delay);

        // oldParticles[i].setXY(x,y);
        oldParticles[i].drawTarget(x, y);
        oldParticles[i].current_x = x;
        oldParticles[i].current_y = y;
      }

      // if(t == d){
      //   //动画结束时，修改粒子的坐标为结束坐标
      //   oldParticles[i].setXY(x,y);
      // }  
    }


    // if (t == d) {
    //   console.timeEnd('begin');
    //   console.timeEnd('two');
    //   cancelAnimationFrame(timer);



    //   return;
    // }

    t++;
    timer = requestAnimationFrame(function () {
      particle_animate(oldParticles, offset_x, offset_y, animate);
    })
  }

  //animation动画
  var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
    window.setTimeout(i, 1000 / 45)
  };//各个浏览器支持的requestAnimationFrame有所不同，兼容各个浏览器


  //初始化变量
  var old_x = old_x || W / 2;
  var old_y = old_y || H / 5 * 4;
  var new_x = new_x || W / 2;
  var new_y = new_y || H / 5 * 2;
  var color = color || "#ffffff";
  var text = text || "女生节快乐";
  var animate;
  //中间变量和存储变量
  var particles = [];
  var oldParticles = [];//存放粒子实例
  var newParticles = [];
  var data = [];
  // var timer;
  var offset_x = [];
  var offset_y = [];

  //animation动画
  var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
    window.setTimeout(i, 1000 / 45)
  };//各个浏览器支持的requestAnimationFrame有所不同，兼容各个浏览器

  //初始化画布
  initCanvas();

  // // TODO:图片跨域不能getdata
  // let img = new Image();
  // img.src = "http://122.51.78.217/assets/img/test.png";
  // console.log(img);
  // //获取数据
  // data = getPaticleData(text,img);
  // newParticles = calculate(data,new_x,new_y);
  // // for(let i = 0; i < newParticles.length; i ++){
  // //   newParticles[i].draw();
  // // }
  // //初始化粒子并绘制
  // for(let i = 0; i < newParticles.length; i ++){
  //   let particle = new Particle();
  //   particle.setColor("#E74c3c");
  //   particle.setXY(old_x,old_y);
  //   particle.current_x = old_x;
  //   particle.current_y = old_y;
  //   particle.setWH(2,2);
  //   // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();

  //   particle.delay = Math.random()*50;
  //   // particle.draw();
  //   oldParticles.push(particle);
  //   offset_x[i] = newParticles[i].x - oldParticles[i].current_x;
  //   offset_y[i] = newParticles[i].y - oldParticles[i].current_y;
  // }
  // animate = Expo.easeOut;
  // timer = requestAnimationFrame(function(){
  //   console.time('begin');
  //   particle_animate(oldParticles,offset_x,offset_y,animate);
  // });

  // 从某一点喷射粒子形成图案
  function particleMove(x, y) {

    // TODO:图片跨域不能getdata
    let img = new Image();
    img.src = "http://122.51.78.217/assets/img/test.png";
    console.log(img);
    //获取数据
    let data = getPaticleData(text, img);
    let newParticles = calculate(data, new_x, new_y);
    // for(let i = 0; i < newParticles.length; i ++){
    //   newParticles[i].draw();
    // }
    //初始化粒子并绘制
    for (let i = 0; i < newParticles.length; i++) {
      // let particle = new Particle();
      let particle = new Circle();
      particle.setColor(color);
      // let x = old_x + (Math.random()-0.5)*500;
      let x = old_x - 140 + Math.floor(i/newParticles.length*5)*70;
      particle.setXY(x, old_y);
      particle.current_x = x;
      particle.current_y = old_y;
      // particle.setWH(8, 8);
      particle.setR(4);
      // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();

      particle.delay = Math.random() * 50;
      // particle.draw();
      oldParticles.push(particle);
      offset_x[i] = newParticles[i].x - oldParticles[i].current_x;
      offset_y[i] = newParticles[i].y - oldParticles[i].current_y;
    }
    let animate = Expo.easeOut;
    requestAnimationFrame(function () {
      console.time('begin');
      particle_animate(oldParticles, offset_x, offset_y, animate);
    });
  }

  particleMove(old_x, old_y);


  ctx.strokeStyle = "red";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
  
  var precision = 80;//密度
  var hearts = [];
  var mouseMoved = false;
  
  
  function onMove(e){
    mouseMoved = true;
    if(e.type === "touchmove"){
      hearts.push(new Heart(e.touches[0].clientX, e.touches[0].clientY));
      hearts.push(new Heart(e.touches[0].clientX, e.touches[0].clientY));
    }
    else{
      hearts.push(new Heart(e.clientX, e.clientY));
      hearts.push(new Heart(e.clientX, e.clientY));
    }
  }
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove);

  var Heart = function(x,y){
    this.x = x || Math.random()*W;
    this.y = y || Math.random()*W;
    this.size = Math.random()*2 + 1;
    this.shadowBlur = Math.random() * 10;
    this.speedX = (Math.random()+0.2-0.6) * 8;
    this.speedY = (Math.random()+0.2-0.6) * 8;
    this.speedSize = Math.random()*0.05 + 0.03;
    this.opacity = 1;
  
  
    this.vertices = [];
    for (var i = 0; i < precision; i++) {
      var step = (i / precision - 0.5) * (Math.PI * 2);
      var vector = {
        x : (15 * Math.pow(Math.sin(step), 3)),
        y : -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
      }
      this.vertices.push(vector);
    }
  }
  
  Heart.prototype.draw = function(){
    this.size -= this.speedSize;
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.save();
    ctx.translate(-1000,this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    for (var i = 0; i < precision; i++) {
      var vector = this.vertices[i];
      ctx.lineTo(vector.x, vector.y);
    }
    ctx.globalAlpha = this.size;
    ctx.shadowBlur = Math.round((3 - this.size) * 10);
    ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
    ctx.shadowOffsetX = this.x + 1000;
    ctx.globalCompositeOperation = "screen"
    ctx.closePath();
    ctx.fill()
    ctx.restore();
  };
  
  
  function render(a){
    // requestAnimationFrame(render);
  
    if(hearts.length < a){
      hearts.push(new Heart())
    }
    // ctx.clearRect(0,0,ww,wh);
    for (var i = 0; i < hearts.length; i++) {
      hearts[i].draw();
      if(hearts[i].size <= 0){
        hearts.splice(i,1);
        i--;
      }
    }
  }






  //根据粒子数组绘制图案
  function draw(particles) {
    // console.log(particles);
    //清除模板图案
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var len = particles.length;
    var curr_particle = null;
    for (let i = 0; i < len; i++) {
      curr_particle = particles[i];

      ctx.fillStyle = curr_particle.color;
      ctx.fillRect(curr_particle.x, curr_particle.y, 2, 2);
    }

    //清空粒子数组
    // particles.splice(0,particles.length);
    // particles.length = 0;
  }

  function getRandomParticles() {
    randomParticles = [].concat(JSON.parse(JSON.stringify(particles)));
    randomParticles.forEach(function (i) {
      i.x = canvas.width * Math.random();
      i.y = canvas.height * Math.random();
    })
  }

  function move(randomParticles, targetParticles) {

    let t = 10;//移动次数
    for (let i = 0; i < randomParticles.length; i++) {
      let x_distance = targetParticles[i].x - randomParticles[i].x;
      let y_distance = targetParticles[i].y - randomParticles[i].y;
      let x_speed = x_distance / t;
      let y_speed = y_distance / t;

      randomParticles[i].x += x_speed;
      randomParticles[i].y += y_speed;
    }
    draw(randomParticles);

    animation(function () {
      move(randomParticles, targetParticles);
    });
    // setTimeout(function(){
    //     move(randomParticles,targetParticles);
    // },100);
  }


})()
