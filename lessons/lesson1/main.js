var Main = Main || {};

window.onload = function() {
  'use strict';
  // set canvas
  Main.canvas = document.getElementById('canvas');
  Main.canvas.width = window.innerWidth;
  Main.canvas.height = window.innerHeight;
  Main.canvasWidth = Main.canvas.width;
  Main.canvasHeight = Main.canvas.height;
  Main.context = Main.canvas.getContext('2d');

  // color
  var red = '#c0392b';
  var blue = '#2980b9';
  var yellow = '#f1c40f';
  var orange = '#d35400';
  var green = '#27ae60';
  var purple = '#8e44ad';
  var gray = '#7f8c8d';

  Main.setup = function() {
    Main.mouseX = 0;
    Main.mouseY = 0;
    Main.canvas.addEventListener('mousemove',function(e){
      Main.mouseX = e.x;
      Main.mouseY = e.y;
    }, false);

    Main.objs = [];
    Main.objs.push(new Main.Ball('sin', 0, 0, 20, red));
    Main.objs.push(new Main.Ball('cos', 0, 0, 20, blue));
    Main.objs.push(new Main.Ball('both', 0, 0, 20, yellow));
    Main.objs.push(new Main.Ball('circle', 0, 0, 20, orange));
    Main.objs.push(new Main.Ball('ellipse', 0, 0, 20, green));
    Main.objs.push(new Main.Ball('pulse', 0, 0, 30, purple));
    Main.objs.push(new Main.Ball('sprite', 0, 0, 20, gray));

    setInterval(function() {
      Main.update();
      Main.context.clearRect(0, 0, Main.canvasWidth, Main.canvasHeight);
      Main.draw();
    }, 1000 / 100);
  };
  Main.update = function() {
    var i = 0;
    for(i = 0; i < Main.objs.length; i++) {
      Main.objs[i].update();
    }
  };
  Main.draw = function() {
    var i = 0;
    for(i = 0; i < Main.objs.length; i++) {
      Main.objs[i].draw();
    }
  };

  // class: Ball
  Main.Ball = function(type, x, y, r, c) {
    this.type = type || this.type;
    this.r = r || this.r;
    this.c = c || this.c;
    this.x = x || this.x;
    this.y = y || this.y;
    this.centerX = (Main.canvasWidth - this.r) / 2;
    this.centerY = (Main.canvasHeight - this.r) / 2;
    this.init();
  };
  Main.Ball.prototype = {
    r: 20,
    c: gray,
    x: 0,
    y: Main.canvasHeight / 2 - 10,
    vx: 3,
    vy: 0,
    angle: 0,
    range: 100,
    init: function() {
      var that = this;
      if(that.type == 'both') {
        that.vx = .05;
        that.vy = .07;
        that.angleX = 0;
        that.angleY = 0;
      }
      if(that.type == 'sprite') {
        that.x = that.centerX;
        that.y = that.centerY;
      }
      that.draw();
    },
    update: function() {
      var that = this;
      if(that.type == 'sin') {
        that.x += that.vx;
        if(that.x > Main.canvasWidth) {
          that.x = 0;
        } else if (that.x < 0) {
          that.x = Main.canvasWidth;
        }
        that.y = 300 + Math.sin(that.angle) * that.range;
        that.angle += .05;
      }
      if(that.type == 'cos') {
        that.x += that.vx;
        if(that.x > Main.canvasWidth) {
          that.x = 0;
        } else if (that.x < 0) {
          that.x = Main.canvasWidth;
        }
        that.y = 300 + Math.cos(that.angle) * that.range;
        that.angle += .05;
      }
      if(that.type == 'both') {
        that.x = that.centerX + Math.sin(that.angleX) * that.range;
        that.y = that.centerY + 100 + Math.sin(that.angleY) * that.range;
        that.angleX += that.vx;
        that.angleY += that.vy;
      }
      if(that.type == 'circle') {
        that.x = that.centerX + Math.sin(that.angle) * that.range;
        that.y = that.centerY + 100 + Math.cos(that.angle) * that.range;
        that.angle += .05;
      }
      if(that.type == 'ellipse') {
        that.x = that.centerX + Math.sin(that.angle) * (that.range * 1.8);
        that.y = that.centerY + 100 + Math.cos(that.angle) * that.range;
        that.angle += .05;
      }
      if(that.type == 'pulse') {
        that.x = that.centerX;
        that.y = that.centerY + 100;
        that.r = 50 + Math.sin(that.angle) * 30;
        that.angle += .03;
      }
      if(that.type == 'sprite') {
        that.dx = Main.mouseX - that.x;
        that.dy = Main.mouseY - that.y;
        that.dst = Math.sqrt(that.dx * that.dx + that.dy * that.dy);
        that.rotation = Math.atan2(that.dy, that.dx) * 180 / Math.PI;
        // console.log(that.rotation);
      }
    },
    draw: function() {
      var that = this;
      Main.context.fillStyle = that.c;
      Main.context.beginPath();
      Main.context.arc(that.x, that.y, that.r, 0, Math.PI * 2, true);
      Main.context.closePath();
      Main.context.fill();
      if(that.type == 'sprite') {
        Main.context.fillText((Math.round(that.dst) + ' / ' + Math.round(that.rotation)), that.x + 30, that.y + 10);
      }
    }
  };

  Main.setup();
}
