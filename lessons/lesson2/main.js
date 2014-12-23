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

  Main.setup = function() {
    Main.objs = [];
    Main.objs.push(new Main.Points());

    setInterval(function() {
      Main.update();
      Main.context.clearRect(0, 0, Main.canvasWidth, Main.canvasHeight);
      Main.draw();
    }, 1000 / 30);
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
      Main.objs[i].draw();
    }
  };

  // class: Points
  Main.Points = function() {
    this.init();
  };
  Main.Points.prototype = {
    numOfPoints: 50,
    points: [],
    init: function() {
      var that = this;
      for (var i = 0; i < that.numOfPoints; i++) {
        that.points.push(new Main.Point());
      }
    },
    update: function() {
      var that = this;
      for (var i = 1; i < that.numOfPoints - 1; i++) {
        that.points[i].update();
      }
    },
    draw: function() {
      var xc1, yc1, xc, yc, i;
      var that = this;

      Main.context.beginPath();
      xc1 = (that.points[0].movePoint(that.points[0].x) + that.points[that.numOfPoints - 1].x) / 2;
      yc1 = (that.points[0].movePoint(that.points[0].y) + that.points[that.numOfPoints - 1].y) / 2;
      Main.context.moveTo(xc1, yc1);
      for (i = 1; i < that.numOfPoints - 1; i++) {
        xc = (that.points[i].x + that.points[i + 1].x) / 2;
        yc = (that.points[i].y + that.points[i + 1].y) / 2;
        Main.context.quadraticCurveTo(that.points[i].x, that.points[i].y, xc, yc);
      }
      Main.context.quadraticCurveTo(that.points[i].x, that.points[i].y, xc1, yc1);
      Main.context.stroke();
    }
  };
  // class: Point
  Main.Point = function(x, y) {
    this.x = Math.random() * Main.canvasWidth;
    this.y = Math.random() * Main.canvasHeight;
  };
  Main.Point.prototype = {
    x: 0,
    y: 0,
    range: 1,
    update: function() {
      var that = this;
      that.x = that.movePoint(that.x);
      that.y = that.movePoint(that.y);
    },
    movePoint: function(n) {
      return n + Math.round(Math.sin(Math.random() * 360) * this.range);
    }
  };

  Main.setup();
};
