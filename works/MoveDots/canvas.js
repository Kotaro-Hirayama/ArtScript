window.onload = function() {
  'use strict';

  var Background = {
    init: function() {
      this.dots = [];
      this.minDistance = 100;
      this.springAmount = .001;

      this.setCanvas();
      this.createDots();

      setInterval(Background.dotsLoop, 1000 / 100);
      // setInterval(Background.dotsLoop, 1000 / 31);
    },
    setCanvas: function() {
      this.canvas = document.getElementById('mycanvas');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;
      this.context = this.canvas.getContext('2d');
      this.context.lineWidth = .5;

      this.numOfDots = 50;
      // this.numOfDots = Math.round(this.canvasWidth * this.canvasHeight / 8192) * 2;
    },
    createDots: function() {
      for (var i = 0; i < Background.numOfDots; i++) {
        var dot = {
          radius: 10,
          x: Math.random() * Background.canvasWidth,
          y: Math.random() * Background.canvasHeight,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
          // vx: Math.random() * 4 - 2,
          // vy: Math.random() * 4 - 2,
          update: function() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= .9999;
            this.vy *= .9999;
            if (this.x > Background.canvasWidth) {
              this.x = 0;
            } else if (this.x < this.radius || this.x > Background.canvasWidth - this.radius) {
              if(this.x < this.radius) this.x = this.radius;
              if(this.x > Background.canvasWidth - this.radius) this.x = Background.canvasWidth - this.radius;
              this.vx = -this.vx;
            }
            if (this.y < this.radius || this.y > Background.canvasHeight - this.radius) {
              if(this.y < this.radius) this.y = this.radius;
              if(this.y > Background.canvasHeight - this.radius) this.y = Background.canvasHeight - this.radius;
              this.vy = -this.vy;
            } else if (this.y < 0) {
              this.y = Background.canvasHeight;
            }
          },
          draw: function(color) {
            var color = color || 'rgb(180, 180, 180)';
            Background.context.fillStyle = color;
            Background.context.beginPath();
            Background.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            Background.context.closePath();
            Background.context.fill();
          }
        };
        Background.dots.push(dot);
      }
    },
    dotsLoop: function() {
      Background.context.clearRect(0, 0, Background.canvasWidth, Background.canvasHeight);
      for (var i = 0; i < Background.numOfDots; i++) {
        Background.dots[i].update();
        Background.dots[i].draw();
      }
      for (var i = 0; i < Background.numOfDots - 1; i++) {
        var dot1 = Background.dots[i];
        for (var j = i + 1; j < Background.numOfDots; j++) {
          var dot2 = Background.dots[j];
          Background.spring(dot1, dot2);
        }
      }
    },
    spring: function(da, db) {
      var dx = db.x - da.x;
      var dy = db.y - da.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if(3 < da.vx) da.vx = 3;
      if(da.vx < -3) da.vx = -3;
      if(3 < da.vy) da.vy = 3;
      if(-3 > da.vy) da.vy = -3;

      if(3 < db.vx) db.vx = 3;
      if(-3 > db.vx) db.vx = -3;
      if(3 < db.vy) db.vy = 3;
      if(-3 > db.vy) db.vy = -3;

      if (dist < da.radius + db.radius + Background.minDistance) {
        Background.context.beginPath();
        Background.context.strokeStyle = 'rgba(200, 200, 200, ' + (1 - dist / Background.minDistance) + ')';
        Background.context.moveTo(da.x, da.y);
        Background.context.lineTo(db.x, db.y);
        Background.context.stroke();
        Background.context.closePath();
        var ax = dx * Background.springAmount;
        var ay = dy * Background.springAmount;
        da.vx -= ax;
        da.vy -= ay;
        db.vx += ax;
        db.vy += ay;
      }
      if (dist < da.radius + db.radius) {
        Background.context.fillStyle = 'red';
        Background.context.beginPath();
        Background.context.arc(da.x, da.y, da.radius, 0, Math.PI * 2, true);
        Background.context.arc(db.x, db.y, db.radius, 0, Math.PI * 2, true);
        Background.context.closePath();
        Background.context.fill();
      }
    }
  }

  Background.init();
}
