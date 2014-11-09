navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

// var height = 256;

$(function($) {
  'use strict';

  var width = $('html').width();
  var height = $('html').height();

  var Utils = {
    sizing: function() {
      width = $('html').width();
      height = $('html').height();
      Audio.$frequency[0].width = width;
      Audio.$frequency[0].height = height;
    }
  };
  var Audio = {
    init: function() {
      this.cacheElements();
      this.bindEvents();
      this.startRec();
      Utils.sizing();
    },
    cacheElements: function() {
      this.$audio = $('#audio');
      this.$frequency = $('#frequency');
      this.$timeDomain = $('#timedomain');
    },
    bindEvents: function() {
      $(window).on('resize', Utils.sizing);
    },
    startRec: function() {
      var frequencyContext = Audio.$frequency[0].getContext('2d');

      navigator.getUserMedia({
        audio: true
      }, function(stream) {
        var url = URL.createObjectURL(stream);

        Audio.$audio[0].src = url;
        var audioContext = new AudioContext();
        var mediastreamsource = audioContext.createMediaStreamSource(stream);
        var analyser = audioContext.createAnalyser();
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        var timeDomainData = new Uint8Array(analyser.frequencyBinCount);
        mediastreamsource.connect(analyser);

        var animation = function() {
          analyser.getByteFrequencyData(frequencyData);
          analyser.getByteTimeDomainData(timeDomainData);

          frequencyContext.clearRect(0, 0, width, height);
          frequencyContext.beginPath();
          frequencyContext.moveTo(0, height - frequencyData[0] * 2.5);
          for (var i = 1, l = frequencyData.length; i < l; i++) {
            frequencyContext.lineTo(width / 1024 * i, height - frequencyData[i] * 2.5);
          }

          frequencyContext.moveTo(0, height / 2 - timeDomainData[0] + 128);
          for (var i = 1, l = timeDomainData.length; i < l; i++) {
            frequencyContext.lineTo(width / 1024 * i, height / 2 - timeDomainData[i] + 128);
            if (i % 10 == 0) {
              frequencyContext.font = '12px sans-serif';
              frequencyContext.fillText(Math.abs(256 - timeDomainData[i] - 128), width / 1024 * i, height / 2, 20);
            }
          }
          frequencyContext.stroke();

          requestAnimationFrame(animation);
        };
        animation();
      }, function(e) {
        console.log(e);
      });
    }
  };

  Audio.init();
});
