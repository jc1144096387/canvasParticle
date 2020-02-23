/*
**  t: current time（当前时间）；
**  b: beginning value（初始值）；
**  c: change in value（变化量）；
**  d: duration（持续时间）。
**
**  当t = 0时，返回值为b
**  当t = d时，返回值为b+c
*/


// 线性函数
var Linear = function(t, b, c, d) { 
  return c * t / d + b; 
}

// 三角函数
var Sine = {
    easeIn: function(t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOut: function(t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
    }
}

// 指数函数
var Expo = {
  easeIn: function(t, b, c, d) {
      return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOut: function(t, b, c, d) {
      return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOut: function(t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
}