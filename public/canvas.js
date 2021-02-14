//全局变量
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;

//初始化画布
function initCanvas() {
  //设置画布宽高为浏览器窗口宽高
  canvas.width = W;
  canvas.height = H;
  //清空上次绘制的粒子图案
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//根据模板图案筛选粒子
function calculate(data, new_x, new_y) {
  //设置单元的宽高
  var s_width = 6;
  var s_height = 6;
  //设置宽高后的行列序号
  var m = parseInt(canvas.width / s_width);
  var n = parseInt(canvas.height / s_height);
  var pos = 0; //在数组中的位置
  var particles = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //计算坐标值
      pos = (j * s_height * canvas.width + i * s_height) * 4;

      //判断透明度是否符合要求
      if (data[pos + 3] > 0) {

        var x = i * s_width + (Math.random() - 0.5) * 5;
        var y = j * s_height + (Math.random() - 0.5) * 5;
        var particle = new Particle();
        particle.setColor("#ddedea");
        particle.setXY(x + new_x - W / 2, y + new_y - H / 2);
        particle.setWH(2, 2);
        //将符合要求的粒子放入数组
        particles.push(particle);
      }

    }
  }
  return particles;

}

let PI = Math.PI;
let T = 120;//绘制间隔参数
// 绘制心形线
// 参数说明：a为大小,a越大,绘制出的心形越大; precision为绘制精度,precision越大,绘制次数越多,绘制出的心形越精确;
function drawHeart(a, precision) {
  console.log(a)
  // -PI<=t<=PI 或 0<=t<=2*PI
  // x=a*(2*sin(t)+sin(2*t))
  // y=a*(2*cos(t)+cos(2*t))
  console.log(PI);
  // 从 t = 0开始绘制
  let x = 0;
  let y = -5 * a;
  ctx.moveTo(x, y);
  for (let t = (2 * PI / precision); t <= 2 * PI; t += (2 * PI / precision)) {
    // setTimeout(function(){
    console.log(a);
    // x = a*(2*Math.sin(t)+Math.sin(2*t));
    // y = a*(2*Math.cos(t)+Math.cos(2*t));

    // 改用另一个参数方程来绘制爱心
    // x=16 * (sin(t)) ^ 3;
    // y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)

    x = a * (16 * Math.pow(Math.sin(t), 3));
    y = -a * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    ctx.lineTo(x, y);
    ctx.fill();
    // },t*T)
  }


}
initCanvas();

//获取图案数据
function getPaticleData(text, img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var data = [];
  ctx.font = "70px Microsoft Yahei";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // //绘制模板图案
  // ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  //使用特定函数来绘制模板图案
  ctx.translate(W/2,H/2);
  drawHeart(10,300);
  ctx.translate(-W/2,-H/2)
  // // 用图片来绘制模板图案
  // ctx.drawImage(img,W/2-img.width/2,H/2-img.height/2);

  // 获取画布上每个像素点的信息，注意getImageData()后面要加.data
  data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  //得到由每个像素点信息组成的数组，每个像素点占4个长度，rgba的值分别占0，1，2，3位置
  // console.log(data);
  //清空图案
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return data;
}



// 粒子类
function Particle() {
  this.x = 0;//初始x轴坐标
  this.y = 0;//初始y轴坐标
  this.current_x = 0;//粒子当前的x轴坐标
  this.current_y = 0;//粒子当前的y轴坐标
  this.color = 0;//颜色
  this.width = 2;//粒子宽度
  this.height = 2;//粒子高度
  this.delay = 0;//延迟delay开始动画

  var that = this;

  //设置粒子的颜色
  this.setColor = function (color) {
    this.color = color;
  }
  //设置粒子坐标
  this.setXY = function (x, y) {
    this.x = x;
    this.y = y;
  }
  //设置粒子宽高
  this.setWH = function (width, height) {
    this.width = width;
    this.height = height;
  }
  //绘制粒子到目标位置
  this.drawTarget = function (x, y) {
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, this.width, this.height);
  }
  //绘制粒子到粒子当前位置
  this.drawSelf = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  //清楚粒子
  this.clear = function () {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
};//粒子对象


// 圆形类
function Circle(){
  this.x = 0;//初始x轴坐标
  this.y = 0;//初始y轴坐标
  this.current_x = 0;//粒子当前的x轴坐标
  this.current_y = 0;//粒子当前的y轴坐标
  this.color = 0;//颜色
  // this.width = 2;//粒子宽度
  // this.height = 2;//粒子高度
  this.r = 2;//圆半径
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
  this.setR = function(r){
    this.r = r;
  }
  //绘制粒子到目标位置
  this.drawTarget = function(x,y){
    ctx.fillStyle = this.color;
    // ctx.fillRect(x,y,this.width,this.height);
    ctx.beginPath();
    ctx.arc(x,y,this.r,0,2*Math.PI);
    ctx.fill();
  }
  //绘制粒子到粒子当前位置
  this.drawSelf = function(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.fill();
  }
  //清除粒子
  this.clear = function(){
    ctx.clearRect(this.x,this.y,this.r*2);
  }
};//粒子对象