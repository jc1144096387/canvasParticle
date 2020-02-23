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

// 返回[x1,x2)的随机数
function random(x1,x2){
  return x1+(x2-x1)*Math.random();
}