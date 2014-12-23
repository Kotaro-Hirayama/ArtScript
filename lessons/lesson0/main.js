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
  var colorBox = [red, blue, yellow, orange, green, purple, gray];


  /*
  全体の流れ
  setup: 初期化する
  update: 物体の状態を更新する
  draw: 物体の状態を描く
  以下、updateとdrawを繰り返す。
  ※正確にはupdateとdrawの間で、canvasに描かれた内容をクリアしている
  */
  // 初期化する
  Main.setup = function() {
    Main.objs = [];
    Main.objs.push(new Main.Ball());

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
  Main.Ball = function(x, y, r, c) {
    this.r = r || this.r;
    this.c = c || this.c;
    this.x = x || this.x;
    this.y = y || this.y;
    this.init();
  };
  Main.Ball.prototype = {
    r: 20,
    c: red,
    x: Main.canvasWidth / 2,
    y: Main.canvasHeight / 2,
    vx: -3,
    vy: -3,
    init: function() {
      var that = this;
      that.draw();
    },
    update: function() {
      var that = this;
      that.x += that.vx;
      if(that.x > Main.canvasWidth) {
        that.x = 0;
      } else if (that.x < 0) {
        that.x = Main.canvasWidth;
      }

      that.y += that.vy;
      if(that.y > Main.canvasHeight) {
        that.y = 0;
      } else if(that.y < 0) {
        that.y = Main.canvasHeight;
      }
    },
    draw: function() {
      var that = this;
      Main.context.fillStyle = that.c;
      Main.context.beginPath();
      Main.context.arc(that.x, that.y, that.r, 0, Math.PI * 2, true);
      Main.context.closePath();
      Main.context.fill();
    }
  };

  Main.setup();
}
