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


  // var _results = [];
  // _results.push(drawTree(Main.context, 600 * Math.random(), 400 * Math.random(), 20, -Math.PI / 2, 3));

  Main.setup = function() {
    Main.objs = [];
    for(var i = 0; i < 100; i++){
      Main.objs.push(new Main.Tree());
    }

    // setInterval(function() {
      // Main.update();
      // Main.context.clearRect(0, 0, Main.canvasWidth, Main.canvasHeight);
      Main.draw();
    // }, 1000 / 100);
  };
  Main.update = function() {
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].update();
    }
  };
  Main.draw = function() {
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].draw(600 * Math.random(), 400 * Math.random(), 20, -Math.PI / 2, 3);
    }
  };

  // class: Tree
  Main.Tree = function(x1, y1, len, stand, depth) {
    this.x1 = x1;
    this.y1 = y1;
    this.len = len;
    this.stand = stand;
    this.depth = depth;
    this.init();
  };
  Main.Tree.prototype = {
    x1: 0,
    y1: 0,
    len: 0,
    stand: 0,
    depth: 0,
    init: function() {
      var that = this;
      that.draw();
    },
    update: function() {
    },
    draw: function(x1, y1, len, stand, depth) {
      var diffdir, rl, x2, y2;
      rl = Math.abs(0.5 - Math.random()) * len;
      x2 = x1 + rl * Math.cos(stand);
      y2 = y1 + rl * Math.sin(stand);

      Main.context.beginPath();
      Main.context.strokeStyle = 'gray';
      Main.context.moveTo(x1, y1);
      Main.context.lineTo(x2, y2);
      Main.context.stroke();

      if (depth > 0) {
        diffdir = Math.random() * Math.PI / 6;
        this.draw(x2, y2, len, stand + diffdir, depth - 1);
        this.draw(x2, y2, len, stand - diffdir, depth - 1);
      }
    }
  };

  Main.setup();
}
