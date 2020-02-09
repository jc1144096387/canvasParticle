(function(){
  let canvas=document.getElementById("myCanvas"); 
  let ctx=canvas.getContext("2d"); 
  ctx.fillStyle="#FF0000"; 
  // ctx.fillRect(0,0,150,75); 

  // 得到可视区域的宽高
  let W = window.innerWidth;
  let H = window.innerHeight;
  console.log(W,H);
  canvas.width = W;
  canvas.height = H;

  // 绘制平面坐标系
  function drawAxis(){
    ctx.moveTo(0,H/2); 
    ctx.lineTo(W,H/2); 
    ctx.stroke();

    ctx.moveTo(W/2,0); 
    ctx.lineTo(W/2,H); 
    ctx.stroke();
  }

  // 绘制参考方格
  function drawSquare(){

  }

  let PI = Math.PI;
  let T = 100;//绘制间隔参数
  // 绘制心形线
  // 参数说明：a为大小,a越大,绘制出的心形越大; precision为绘制精度,precision越大,绘制次数越多,绘制出的心形越精确;
  function drawHeart(a,precision){
    console.log(a)
    // -PI<=t<=PI 或 0<=t<=2*PI
    // x=a*(2*sin(t)+sin(2*t))
    // y=a*(2*cos(t)+cos(2*t))
    console.log(PI);
    // 从 t = 0开始绘制
    let x = 0;
    let y = -5*a;
    ctx.moveTo(x,y);
    for(let t = (2*PI/precision); t <= 2*PI; t += (2*PI/precision) ){
      setTimeout(function(){
        console.log(a);
        // x = a*(2*Math.sin(t)+Math.sin(2*t));
        // y = a*(2*Math.cos(t)+Math.cos(2*t));

        // 改用另一个参数方程来绘制爱心
        // x=16 * (sin(t)) ^ 3;
        // y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)
        
        x = a * (16 * Math.pow(Math.sin(t), 3));
        y = -a * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        ctx.lineTo(x,y);
        ctx.stroke();
      },t*T)
    }


  }



  // 可视区域改变时，重新获取可视区域的宽高
  window.onresize = function(){
    W = window.innerWidth;
    H = window.innerHeight;
    console.log(W,H);
    canvas.width = W;
    canvas.height = H;

    // drawAxis();
  }

  // drawAxis();
  // drawHeart(10,500);


  // 将坐标原点变为 画面中心即(W/2,H/2)
  ctx.translate(W/2,H/2);
  let HeartNum = 5;
  for(let i = 0; i < HeartNum; i ++){
    setTimeout(function(){
      ctx.beginPath(); 
      ctx.strokeStyle = i%2 == 0 ? "rgba(231,77,60,1)":"rgba(231,77,60,0.1)"; 
      ctx.globalAlpha = i%2 == 0 ? "1":"0.1";
      ctx.lineWidth = i%2 == 0 ? '5': '1'
      drawHeart(15/HeartNum*(HeartNum-i),400);
      ctx.closePath();
    },i*3.5*PI*T);
  }
})();

