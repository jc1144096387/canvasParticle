(function(){


  // 为不同浏览器打上补丁
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






  



  






  //粒子动画
  var t = 0;//当前时间
  var d = 100;//持续时间
  var timer;
  //animate动画函数
  function particle_animate(oldParticles,offset_x,offset_y,animate){

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

      if(t == 0){
        oldParticles[i].setXY(oldParticles[i].current_x,oldParticles[i].current_y);
      }

      if(t>=oldParticles[i].delay){
        var x = animate(t-oldParticles[i].delay,oldParticles[i].x,offset_x[i],d-oldParticles[i].delay);
        var y = animate(t-oldParticles[i].delay,oldParticles[i].y,offset_y[i],d-oldParticles[i].delay);
   
        // oldParticles[i].setXY(x,y);
        oldParticles[i].drawTarget(x,y);
        oldParticles[i].current_x = x;
        oldParticles[i].current_y = y;
      }
      
      // if(t == d){
      //   //动画结束时，修改粒子的坐标为结束坐标
      //   oldParticles[i].setXY(x,y);
      // }  
    }
  
    
    if(t == d){
      console.timeEnd('begin');
      console.timeEnd('two');
      cancelAnimationFrame(timer);
     
     

      return;
    }

    t ++;
    timer = requestAnimationFrame(function(){
     particle_animate(oldParticles,offset_x,offset_y,animate);
    })
  }

  //animation动画
  var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
      window.setTimeout(i, 1000 / 45)
  };//各个浏览器支持的requestAnimationFrame有所不同，兼容各个浏览器


    //初始化变量
    var old_x = old_x || W/2;
    var old_y = old_y || H/5*4;
    var new_x = new_x || W/2;
    var new_y = new_y || H/5*2;
    var color = color || "#ffffff";
    var text = text || "新年快乐";
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

    // TODO:图片跨域不能getdata
    let img = new Image();
    img.src = "http://122.51.78.217/assets/img/test.png";
    console.log(img);
    //获取数据
    data = getPaticleData(text,img);
    newParticles = calculate(data,new_x,new_y);
    // for(let i = 0; i < newParticles.length; i ++){
    //   newParticles[i].draw();
    // }
    //初始化粒子并绘制
    for(let i = 0; i < newParticles.length; i ++){
      let particle = new Particle();
      particle.setColor("#E74c3c");
      particle.setXY(old_x,old_y);
      particle.current_x = old_x;
      particle.current_y = old_y;
      particle.setWH(2,2);
      // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();
  
      particle.delay = Math.random()*50;
      // particle.draw();
      oldParticles.push(particle);
      offset_x[i] = newParticles[i].x - oldParticles[i].current_x;
      offset_y[i] = newParticles[i].y - oldParticles[i].current_y;
    }
    animate = Expo.easeOut;
    timer = requestAnimationFrame(function(){
      console.time('begin');
      particle_animate(oldParticles,offset_x,offset_y,animate);
    });

    //开启第二段动画
    setTimeout(function(){
      t = 0;
      for(let i = 0; i < oldParticles.length; i ++){
        let particle = new Particle();
        // particle.setColor("#ffffff");
        particle.setColor("#E74c3c");
        let size = getRandomColor
        particle.setWH(2,2);
        //左侧区域: W/10*2~W/10*3,H/10*2~H/10*3
        //右侧区域：W/10*7~W/10*8,H/10*2~H/10*3
        // var x = Math.random()>0.5 ? W/10*1+Math.random()*W/10*2 : W/10*7+Math.random()*W/10*2;
        // var y = H/10*1+Math.random()*W/10*8;
        var x = Math.random()*W;
        var y = Math.random()*H;
        offset_x[i] = x - oldParticles[i].current_x;
        offset_y[i] = y - oldParticles[i].current_y;
        // var y = Math.random()*H;
        // particle.setXY(x,y);
        // sideParticles.push(particle);
      }
      animate = Linear;
      timer = requestAnimationFrame(function(){
        console.time('two');
        particle_animate(oldParticles,offset_x,offset_y,animate);
      })  
    },3000);

    //开启第三段动画
    setTimeout(function(){
      t = 0;
      data = getPaticleData("万事如意",img);
      newParticles = [];
      newParticles = calculate(data,new_x,new_y);
      for(let i = 0; i < newParticles.length; i ++){
        // particle.setColor(color);
        // particle.setXY(old_x,old_y);
        // particle.setWH(2,2);
        // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();
        
        // particle.delay = Math.random()*60;
        // particle.draw();
        // oldParticles.push(particle);
        
        //文字改变之后，粒子数量改变
        //如果不存在就产生随机坐标的粒子
        if(i>= oldParticles.length){
          var particle = new Particle();
          particle.setColor("#E74c3c");
          var x = W/2+(Math.random()-0.5)*W/5;
          var y = H/2+(Math.random()-0.5)*H/5;
          particle.setXY(x,y);
          particle.current_x = x;
          particle.current_y = y;
          particle.setWH(2,2);
          // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();
      
          particle.delay = Math.random()*60;
          oldParticles[i] = particle;
        }


        offset_x[i] = newParticles[i].x - oldParticles[i].current_x;
        offset_y[i] = newParticles[i].y - oldParticles[i].current_y;

        newParticles[i].drawSelf();
      }

      

      console.log(oldParticles.length);
      animate = Expo.easeOut;
      timer = requestAnimationFrame(function(){
        console.time('two');
        particle_animate(oldParticles,offset_x,offset_y,animate);
      })  
    },4500);
  

    //开启第二段动画
    setTimeout(function(){
      t = 0;
      for(let i = 0; i < oldParticles.length; i ++){
        let particle = new Particle();
        particle.setColor("#E74c3c");
        particle.setWH(2,2);
        //左侧区域: W/10*2~W/10*3,H/10*2~H/10*3
        //右侧区域：W/10*7~W/10*8,H/10*2~H/10*3
        // var x = Math.random()>0.5 ? W/10*1+Math.random()*W/10*2 : W/10*7+Math.random()*W/10*2;
        // var y = H/10*1+Math.random()*W/10*8;
        var x = Math.random()*W;
        var y = Math.random()*H;
        offset_x[i] = x - oldParticles[i].current_x;
        offset_y[i] = y - oldParticles[i].current_y;
        // var y = Math.random()*H;
        // particle.setXY(x,y);
        // sideParticles.push(particle);
      }
      animate = Linear;
      timer = requestAnimationFrame(function(){
        console.time('two');
        particle_animate(oldParticles,offset_x,offset_y,animate);
      })  
    },6000);

    //开启第三段动画
    setTimeout(function(){
      t = 0;
      data = getPaticleData("头发多多",img);
      newParticles = [];
      newParticles = calculate(data,new_x,new_y);
      for(let i = 0; i < newParticles.length; i ++){
        // particle.setColor(color);
        // particle.setXY(old_x,old_y);
        // particle.setWH(2,2);
        // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();
        
        // particle.delay = Math.random()*60;
        // particle.draw();
        // oldParticles.push(particle);
        
        //文字改变之后，粒子数量改变
        //如果不存在就产生随机坐标的粒子
        if(i>= oldParticles.length){
          var particle = new Particle();
          particle.setColor(color);
          var x = W/2+(Math.random()-0.5)*W/5;
          var y = H/2+(Math.random()-0.5)*H/5;
          particle.setXY(x,y);
          particle.current_x = x;
          particle.current_y = y;
          particle.setWH(2,2);
          // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();
      
          particle.delay = Math.random()*60;
          oldParticles[i] = particle;
        }


        offset_x[i] = newParticles[i].x - oldParticles[i].current_x;
        offset_y[i] = newParticles[i].y - oldParticles[i].current_y;

        newParticles[i].drawSelf();
      }

      

      console.log(oldParticles.length);
      animate = Expo.easeOut;
      timer = requestAnimationFrame(function(){
        console.time('two');
        particle_animate(oldParticles,offset_x,offset_y,animate);
      })  
    },7500);

    //开启第二段动画
    setTimeout(function(){
      t = 0;
      for(let i = 0; i < oldParticles.length; i ++){
        let particle = new Particle();
        particle.setColor("#E74c3c");
        particle.setWH(2,2);
        //左侧区域: W/10*2~W/10*3,H/10*2~H/10*3
        //右侧区域：W/10*7~W/10*8,H/10*2~H/10*3
        // var x = Math.random()>0.5 ? W/10*1+Math.random()*W/10*2 : W/10*7+Math.random()*W/10*2;
        // var y = H/10*1+Math.random()*W/10*8;
        var x = Math.random()*W;
        var y = Math.random()*H;
        offset_x[i] = x - oldParticles[i].current_x;
        offset_y[i] = y - oldParticles[i].current_y;
        // var y = Math.random()*H;
        // particle.setXY(x,y);
        // sideParticles.push(particle);
      }
      animate = Linear;
      timer = requestAnimationFrame(function(){
        console.time('two');
        particle_animate(oldParticles,offset_x,offset_y,animate);
      })  
    },9000);

    //开启第三段动画
    setTimeout(function(){
      t = 0;
      data = getPaticleData("bug少少",img);
      newParticles = [];
      newParticles = calculate(data,new_x,new_y);
      for(let i = 0; i < newParticles.length; i ++){
        // particle.setColor(color);
        // particle.setXY(old_x,old_y);
        // particle.setWH(2,2);
        // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();
        
        // particle.delay = Math.random()*60;
        // particle.draw();
        // oldParticles.push(particle);
        
        //文字改变之后，粒子数量改变
        //如果不存在就产生随机坐标的粒子
        if(i>= oldParticles.length){
          var particle = new Particle();
          particle.setColor(color);
          var x = W/2+(Math.random()-0.5)*W/5;
          var y = H/2+(Math.random()-0.5)*H/5;
          particle.setXY(x,y);
          particle.current_x = x;
          particle.current_y = y;
          particle.setWH(2,2);
          // particle.delay = Math.abs(Math.pow(i,0.5)-Math.pow(newParticles.length,0.5))*Math.random();
      
          particle.delay = Math.random()*60;
          oldParticles[i] = particle;
        }


        offset_x[i] = newParticles[i].x - oldParticles[i].current_x;
        offset_y[i] = newParticles[i].y - oldParticles[i].current_y;

        newParticles[i].drawSelf();
      }

      

      console.log(oldParticles.length);
      animate = Expo.easeOut;
      timer = requestAnimationFrame(function(){
        console.time('two');
        particle_animate(oldParticles,offset_x,offset_y,animate);
      })  
    },10500);


  

  

  

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
