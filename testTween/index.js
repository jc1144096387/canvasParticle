(function(){
  (function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
  }());



  var Linear = function(t, b, c, d) { 
    return c * t / d + b; 
  }
  // console.log(requestAnimationFrame);
  //动画函数存在的问题：名字还没改。。。。应该复制一份粒子数组，而不是直接修改，这样才能多次移动。
  Math.easeInOutExpo = function(t,b,c,d){
    t /= d/2;
    if(t<1){
      return c/2 * Math.pow(2,10*(t-1)) + b;
    }
    return c/2 * (-Math.pow(2, -10*t) + 2) + b;
  };
  //全局变量
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  var W = window.innerWidth;
  var H = window.innerHeight;
  var txt = "你好";


  //根据模板图案筛选粒子
  function calculate(data,new_x,new_y){
    //设置单元的宽高
    var s_width = 2; 
    var s_height = 2;
    //设置宽高后的行列序号
    var m = parseInt(canvas.width/s_width);
    var n = parseInt(canvas.height/s_height);
    var pos = 0; //在数组中的位置
    var particles = [];
    for(let i = 0; i < m; i ++){
        for(let j = 0; j < n; j ++){
            //计算坐标值
            pos = (j*s_height*canvas.width + i*s_height)*4;

            //判断透明度是否符合要求
            if(data[pos+3] > 0){
                
                var x = i*s_width + (Math.random() - 0.5)*5;
                var y = j*s_height + (Math.random() - 0.5)*5;
                var particle = new Particle();
                particle.setColor("#ddedea");
                particle.setXY(x+new_x-W/2,y+new_y-H/2);
                particle.setWH(2,2);
                //将符合要求的粒子放入数组
                particles.push(particle);
            }

        }
    }
    return particles;
    
  }
  //初始化画布
  function initCanvas(){
    //设置画布宽高为浏览器窗口宽高
    canvas.width = W;
    canvas.height = H;
    //清空上次绘制的粒子图案
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  //获取图案数据
  function getPaticleData(text){
    var data = [];
    ctx.font = "100px Microsoft Yahei";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    //绘制模板图案
    ctx.fillText(text,canvas.width/2,canvas.height/2);
    // 获取画布上每个像素点的信息，注意getImageData()后面要加.data
    data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    //得到由每个像素点信息组成的数组，每个像素点占4个长度，rgba的值分别占0，1，2，3位置
    // console.log(data);
    //清空图案
    ctx.clearRect(0,0,canvas.width,canvas.height);
    return data;
  }
  //

  function Particle(){
      this.x = 0;//x轴坐标
      this.y = 0;//y轴坐标
      this.color = 0;//颜色
      this.width = 2;//粒子宽度
      this.height = 2;//粒子高度
      this.delay = 0;//延迟delay开始动画



      var that = this;
      
      //设置粒子的颜色
      this.setColor = function(color){
        this.color = color;
      }
      //设置粒子坐标
      this.setXY = function(x,y){
        this.x = x;
        this.y = y;
      }
      //设置粒子宽高
      this.setWH = function(width,height){
        this.width = width;
        this.height = height;
      }
      //绘制粒子到目标位置
      this.drawTarget = function(x,y){
        ctx.fillStyle = this.color;
        ctx.fillRect(x,y,this.width,this.height);
      }
      //绘制粒子到粒子当前位置
      this.drawSelf = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
      }
      //清楚粒子
      this.clear = function(){
        ctx.clearRect(this.x,this.y,this.width,this.height);
      }
  };//粒子对象



  //粒子动画
  var t = 0;//当前时间
  var d = 100;//持续时间
  var timer;
  function particle_animate(oldParticles,offset_x,offset_y,speed){

    // for(let i = 0; i < oldParticles.length; i ++){
    //   var n = 100 + Math.random()*500;
    //   offset_x[i] = (newParticles[i].x - oldParticles[i].x)/n*speed;
    //   offset_y[i] = (newParticles[i].y - oldParticles[i].y)/n*speed;
    //   flag[i] = 0;
    // }
    //粒子动画,n为到达目标地点的移动次数


    ctx.clearRect(0,0,W,H);
    for(let i = 0; i < oldParticles.length; i ++){
      // if(Math.abs(newParticles[i].x - oldParticles[i].x)<=Math.abs(offset_x[i])*2||Math.abs(newParticles[i].y - oldParticles[i].y)<=Math.abs(offset_y[i])*2){
      //   // oldParticles[i].setXY(newParticles[i].x,newParticles[i].y);
      //   oldParticles[i].draw(oldParticles[i].x+offset_x[i],oldParticles[i].y+offset_y[i]);
      //   flag[i] = 1;
        
      //   continue;
      // }
      if(t>=oldParticles[i].delay){
        var x = Linear(t-oldParticles[i].delay,oldParticles[i].x,offset_x[i],d-oldParticles[i].delay);
        var y = Linear(t-oldParticles[i].delay,oldParticles[i].y,offset_y[i],d-oldParticles[i].delay);
   
        // oldParticles[i].setXY(x,y);
        oldParticles[i].drawTarget(x,y);
      }
      if(t == d){
        //动画结束时，修改粒子的坐标为结束坐标
        oldParticles[i].setXY(x,y);
      }
    }
    
    if(t == d){
      console.timeEnd('begin');
      cancelAnimationFrame(timer);
      console.log(timer);
      return;
    }
    speed = Math.pow((speed+0.1),1);
    t ++;
    timer = requestAnimationFrame(function(){
     particle_animate(oldParticles,offset_x,offset_y,speed);
    })
  }

  //animation动画
  var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
      window.setTimeout(i, 1000 / 45)
  };//各个浏览器支持的requestAnimationFrame有所不同，兼容各个浏览器

  window.onload = function(){
    // initCanvas(txt);
    // calculate();
    // draw(particles);
    // particle_jet("sss");
    // setTimeout(function(){
    //   // particle_jet("111");
    // },3000);


    //初始化变量
    var old_x = old_x || W/2;
    var old_y = old_y || H/5*4;
    var new_x = new_x || W/2;
    var new_y = new_y || H/5*2;
    var color = color || "#ffffff";
    var text = text || "你好";

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

    //获取数据
    data = getPaticleData(text);
    newParticles = calculate(data,new_x,new_y);
    // for(let i = 0; i < newParticles.length; i ++){
    //   newParticles[i].draw();
    // }
    //初始化粒子并绘制
    for(let i = 0; i < newParticles.length; i ++){
      let particle = new Particle();
      particle.setColor(color);
      particle.setXY(old_x,old_y);
      particle.setWH(2,2);
      // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();
  
      particle.delay = Math.random()*60;
      // particle.draw();
      oldParticles.push(particle);
      offset_x[i] = newParticles[i].x - oldParticles[i].x;
      offset_y[i] = newParticles[i].y - oldParticles[i].y;
    }
    timer = requestAnimationFrame(function(){
      console.time('begin');
      particle_animate(oldParticles,offset_x,offset_y,1.5);
    });



    // var sideParticles = [];
    // for(let i = 0; i < oldParticles.length; i ++){
    //   let particle = new Particle();
    //   particle.setColor("#ffffff");
    //   particle.setWH(2,2);
    //   //左侧区域: W/10*2~W/10*3,H/10*2~H/10*3
    //   //右侧区域：W/10*7~W/10*8,H/10*2~H/10*3
    //   // var x = Math.random()>0.5 ? W/10*1+Math.random()*W/10*2 : W/10*7+Math.random()*W/10*2;
    //   // var y = H/10*1+Math.random()*W/10*8;
    //   var x = Math.random()*W;
    //   var y = H/10+Math.random()*H/10*2;
    //   offset_x[i] = x - oldParticles[i].x;
    //   offset_y[i] = y - oldParticles[i].y;
    //   // var y = Math.random()*H;
    //   // particle.setXY(x,y);
    //   // sideParticles.push(particle);
    // }


  //   var objDeepCopy = function (source) {
  //     var sourceCopy = source instanceof Array ? [] : {};
  //     for (var item in source) {
  //         sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
  //     }
  //     return sourceCopy;
  // }
  //   var particles = objDeepCopy(newParticles);
  //   setTimeout(function(){
  //     cancelAnimationFrame(timer);
  //     ctx.clearRect(0,0,W,H);
  //     timer = requestAnimationFrame(function(){
  //       particle_animate(newParticles,sideParticles,1.5);
  //     });
  //     setTimeout(function(){
  //       cancelAnimationFrame(timer);
  //       ctx.clearRect(0,0,W,H);
  //       timer = requestAnimationFrame(function(){
  //         particle_animate(oldParticles,newParticles,1.5);
  //       });
  //     },3000);
      

  //   },3000);
  //   for(let i = 0; i < newParticles.length; i ++){
  //     let particle = new Particle();
  //     newParticles[i].draw();
  //     // console.log(newParticles[i].x);
  //   }
  //   console.log(oldParticles.length,newParticles.length,sideParticles.length);
  }

  function main(){
      init(text.value);
      calculate();
      getRandomParticles();
      // draw(randomParticles);
      // draw(particles);
      move(randomParticles,particles);
  }

  

  // 得到随机颜色
  function getRandomColor(){
      var r = Math.floor(Math.random() * 255).toString(16);
      r = (r.length < 2) ? "0"+r : r;
      var g = Math.floor(Math.random() * 255).toString(16);
      g = (g.length < 2) ? "0"+g : g;
      var b = Math.floor(Math.random() * 255).toString(16);
      b = (b.length < 2) ? "0"+b : b;

      return "#" + r + g + b;
  }


  

  

  //根据粒子数组绘制图案
  function draw(particles){
      // console.log(particles);
      //清除模板图案
      ctx.clearRect(0,0,canvas.width,canvas.height);

      var len = particles.length;
      var curr_particle = null;
      for(let i = 0; i < len; i ++){
          curr_particle = particles[i];

          ctx.fillStyle = curr_particle.color;
          ctx.fillRect(curr_particle.x,curr_particle.y,2,2);
      }

      //清空粒子数组
      // particles.splice(0,particles.length);
      // particles.length = 0;
  }

  function getRandomParticles(){
      randomParticles = [].concat(JSON.parse(JSON.stringify(particles)));
      randomParticles.forEach(function(i){
          i.x = canvas.width*Math.random();
          i.y = canvas.height*Math.random();
      })
  }

  function move(randomParticles,targetParticles){
      
      let t = 10;//移动次数
      for(let i = 0; i < randomParticles.length; i ++){
          let x_distance = targetParticles[i].x - randomParticles[i].x;
          let y_distance = targetParticles[i].y - randomParticles[i].y;
          let x_speed = x_distance / t;
          let y_speed = y_distance / t;

          randomParticles[i].x += x_speed;
          randomParticles[i].y += y_speed;
      }
      draw(randomParticles);

      animation(function(){
          move(randomParticles,targetParticles);
      });
      // setTimeout(function(){
      //     move(randomParticles,targetParticles);
      // },100);
  }
  

})()
