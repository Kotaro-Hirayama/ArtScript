window.onload = function() {
  'use strict';

  var BallAction = {
    init: function() {
      this.balls = [];

      this.setCanvas();
      this.createBalls();

      setInterval(BallAction.ballsLoop, 1);
    },
    setCanvas: function() {
      this.canvas = document.getElementById('mycanvas');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;
      this.context = this.canvas.getContext('2d');

      this.numOfBalls = Math.floor(this.canvasWidth * this.canvasHeight / 5000);
      console.log(this.numOfBalls);
      // this.numOfBalls = 50;
    },
    createBalls: function() {
      for (var i = 0; i < BallAction.numOfBalls; i++) {
        var ball = {
          radius: 10 * Math.random() + 20,
          x: this.canvasWidth * Math.random(),
          y: -Math.floor((Math.random() * this.numOfBalls)) * 30 - this.canvasHeight,
          // y: Math.random() * (BallAction.canvasHeight - 300) - 100,
          vx: Math.random() * 6 - 3,
          vy: 0,
          g: .01,
          update: function() {
            this.vy += this.g;
            if (this.y > BallAction.canvasHeight - this.radius - 1) this.vx *= .99;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x > BallAction.canvasWidth - this.radius || this.x < this.radius) {
              if (this.x > BallAction.canvasWidth - this.radius) this.x = BallAction.canvasWidth - this.radius;
              if (this.x < this.radius) this.x = this.radius;
              this.vx = -this.vx * .8;
            }
            if (this.y > BallAction.canvasHeight - this.radius) {
              if (this.y > BallAction.canvasHeight - this.radius) this.y = BallAction.canvasHeight - this.radius;
              this.vy = -this.vy * .4;
            }
          },
          draw: function(color) {
            BallAction.context.fillStyle = color;
            BallAction.context.beginPath();
            BallAction.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            BallAction.context.closePath();
            BallAction.context.fill();
          }
        };
        BallAction.balls.push(ball);
      }
    },
    ballsLoop: function() {
      BallAction.context.clearRect(0, 0, BallAction.canvasWidth, BallAction.canvasHeight);
      for (var i = 0; i < BallAction.numOfBalls; i++) {
        BallAction.balls[i].update();
        BallAction.balls[i].draw('rgb(100, 100, 100)');
      }
      for (var i = 0; i < BallAction.numOfBalls - 1; i++) {
        var ball1 = BallAction.balls[i];
        for (var j = i + 1; j < BallAction.numOfBalls; j++) {
          var ball2 = BallAction.balls[j];
          // BallAction.writeLines(ball1, ball2);
          BallAction.spring(ball1, ball2);
        }
      }
    },
    spring: function(da, db) { // check
      var dx = db.x - da.x;
      var dy = db.y - da.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < da.radius + db.radius) {
        var a = -dy / dx;
        var b = (this.canvasHeight - da.y) - a * da.x;

        var ax = da.x - da.vx,
          ay = da.y - da.vy;
        var pointax = 2 * (ax + a * (this.canvasHeight - ay) - a * b) / (a * a + 1) - ax || ax;
        var pointay = this.canvasHeight - ((-1 / a) * pointax + (this.canvasHeight - ay) + (1 / a * ax)) || ay;

        var bx = db.x - db.vx,
          by = db.y - db.vy;
        var pointbx = 2 * (bx + a * (this.canvasHeight - by) - a * b) / (a * a + 1) - bx || bx;
        var pointby = this.canvasHeight - ((-1 / a) * pointbx + (this.canvasHeight - by) + (1 / a * bx)) || by;

        // console.log(pointax, pointay, pointbx, pointby);
        da.vx = -(da.x - pointax) * .5 + (db.x - pointbx) * .3,
        db.vx = -(db.x - pointbx) * .5 + (da.x - pointax) * .3;
        da.vy = -(da.y - pointay) * .5 + (db.y - pointby) * .3,
        db.vy = -(db.y - pointby) * .5 + (da.y - pointay) * .3;
        da.x += 3 * da.vx,
        da.y += 3 * da.vy;
        db.x += 3 * db.vx,
        db.y += 3 * db.vy;
      }
    },

    writeLines: function(da, db) { // check
      var dx = db.x - da.x;
      var dy = db.y - da.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < da.radius + db.radius) {
        var deg = this.getDeg(-dy / dx);
        var ndeg = this.getDeg(dx / dy);
        var a = -dy / dx;
        var b = (this.canvasHeight - da.y) - a * da.x;

        var pointx = da.x + (da.radius / (da.radius + db.radius)) * dx;
        var pointy = da.y + (da.radius / (da.radius + db.radius)) * dy;
        var na = -1 / a;
        var nb = (this.canvasHeight - pointy) - na * pointx;

        var dava = -da.vy / da.vx;
        var davb = (this.canvasHeight - da.y) - dava * da.x;

        var dbva = -db.vy / db.vx;
        var dbvb = (this.canvasHeight - db.y) - dbva * db.x;

        var ax = da.x - da.vx,
          ay = da.y - da.vy;
        var pointax = 2 * (ax + a * (this.canvasHeight - ay) - a * b) / (a * a + 1) - ax;
        var pointay = this.canvasHeight - ((-1 / a) * pointax + (this.canvasHeight - ay) + (1 / a * ax));
        var newlineaa = -(da.y - pointay) / (da.x - pointax);
        var newlineab = (this.canvasHeight - da.y) - newlineaa * da.x;

        var bx = db.x - db.vx,
          by = db.y - db.vy;
        var pointbx = 2 * (bx + a * (this.canvasHeight - by) - a * b) / (a * a + 1) - bx;
        var pointby = this.canvasHeight - ((-1 / a) * pointbx + (this.canvasHeight - by) + (1 / a * bx));
        var newlineba = -(db.y - pointby) / (db.x - pointbx);
        var newlinebb = (this.canvasHeight - db.y) - newlineba * db.x;

        this.drawLine(a, b, 'gray'); // 二点間
        this.drawLine(na, nb, 'gray'); //二点間法線
        this.drawLine(dava, davb, 'red'); // da速度
        this.drawLine(dbva, dbvb, 'red'); // db速度
        this.drawLine(newlineaa, newlineab, 'blue'); // da衝突速度
        this.drawLine(newlineba, newlinebb, 'blue'); // db衝突速度

        BallAction.context.beginPath();
        BallAction.context.arc(ax, ay, 4, 0, Math.PI * 2, true);
        BallAction.context.arc(pointax, pointay, 4, 0, Math.PI * 2, true);
        BallAction.context.closePath();
        BallAction.context.fill();

        console.log('done');
      }
    },
    drawLine: function(a, b, color) { // check
      BallAction.context.strokeStyle = color;
      BallAction.context.beginPath();
      BallAction.context.moveTo(0, this.canvasHeight - b);
      BallAction.context.lineTo(this.canvasWidth, this.canvasHeight - (a * this.canvasWidth + b));
      BallAction.context.stroke();
      BallAction.context.closePath();
    },
    getDeg: function(angle) {
      var deg = Math.atan(angle) * 180 / Math.PI;
      return deg;
    }
  }

  BallAction.init();
}

function getDeg(angle) {
  var deg = Math.atan(angle) * 180 / Math.PI;
  return deg;
}
