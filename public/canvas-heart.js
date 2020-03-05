






! function () {
        var canvas    = document.createElement("canvas"),
            context   = canvas.getContext("2d"), 
            attr      = getAttr();
        canvas.id = "c_n" + attr.length;
        canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + attr.z + ";opacity:" + attr.opacity;
        document.getElementsByTagName("body")[0].appendChild(canvas);
        function getAttr() {
            let scripts = document.getElementsByTagName("script"),
                len = scripts.length,
                script = scripts[len - 1];//v为最后一个script元素，即引用了本文件的script元素
            return {
                length: len,
                z: script.getAttribute("zIndex") || -1,
                opacity: script.getAttribute("opacity") || 0.5,
                color: script.getAttribute("color") || "0,0,0",
                count: script.getAttribute("count") || 99
            }
        } 
        var ww,wh;
        function onResize(){
          ww = canvas.width = window.innerWidth;
          wh = canvas.height = window.innerHeight;
        }
        context.strokeStyle = "red";
        context.shadowBlur = 25;
        context.shadowColor = "hsla(0, 100%, 60%,0.5)";
        
        var precision = 100;//密度
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
        
        var Heart = function(x,y){
          this.x = x || Math.random()*ww;
          this.y = y || Math.random()*wh;
          this.size = Math.random()*2 + 1;
          this.shadowBlur = Math.random() * 10;
          this.speedX = (Math.random()+0.2-0.6) * 8;
          this.speedY = (Math.random()+0.2-0.6) * 8;
          this.speedSize = Math.random()*0.05 + 0.01;
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
          context.save();
          context.translate(-1000,this.y);
          context.scale(this.size, this.size);
          context.beginPath();
          for (var i = 0; i < precision; i++) {
            var vector = this.vertices[i];
            context.lineTo(vector.x, vector.y);
          }
          context.globalAlpha = this.size;
          context.shadowBlur = Math.round((3 - this.size) * 10);
          context.shadowColor = "hsla(0, 100%, 60%,0.5)";
          context.shadowOffsetX = this.x + 1000;
          context.globalCompositeOperation = "screen"
          context.closePath();
          context.fill()
          context.restore();
        };
        
        
        function render(a){
          requestAnimationFrame(render);
        
          hearts.push(new Heart())
          context.clearRect(0,0,ww,wh);
          for (var i = 0; i < hearts.length; i++) {
            hearts[i].draw();
            if(hearts[i].size <= 0){
              hearts.splice(i,1);
              i--;
            }
          }
        }
        
        
        onResize();
        window.addEventListener("mousemove", onMove);
        window.addEventListener("touchmove", onMove);
        window.addEventListener("resize", onResize);
        requestAnimationFrame(render);
    
    }();