var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 400;

var context2 = canvas.getContext('2d');
var context  = new C2S(500, 500);

var actx = new (window.AudioContext || window.webkitAudioContext)();

// this needs to be optimized
var doStuffWithContexts = function() {
  if (arguments[0] === 'set') {
    context[arguments[0]] = arguments[1];
    context2[arguments[0]] = arguments[1];
  } else {
    var sliced = Array.prototype.slice.call(arguments, 1);
    context[arguments[0]].apply(context, sliced);
    context2[arguments[0]].apply(context2, sliced);
  }
};

var updateTextArea = function() {
  $('#value').val(
    '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
    context.getSerializedSvg()
  );
};

var main = function(stream) {
  var input    = actx.createMediaStreamSource(stream);
  var analyser = actx.createAnalyser();

  var filter = actx.createBiquadFilter();
  filter.frequency.value = 60.0;
  filter.type = filter.NOTCH;
  filter.Q = 10.0;

  input.connect(filter);
  filter.connect(analyser);

  var WIDTH  = canvas.width;
  var HEIGHT = canvas.height;

  doStuffWithContexts('set', 'fillStyle', 'black');
  requestAnimationFrame(function loop() {
    doStuffWithContexts('clearRect', 0, 0, canvas.width, canvas.height);
    var times = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(times);
    for (var i = 0; i < times.length; i++) {
      var value    = times[i];
      var percent  = value / 256;
      var h        = HEIGHT * percent;
      var offset   = HEIGHT - h - 1;
      var barWidth = WIDTH / times.length;
      doStuffWithContexts('fillRect', i * barWidth, offset, 1, 5 );
    }
    updateTextArea();
    requestAnimationFrame(loop);
  });
};

navigator.webkitGetUserMedia({audio:true}, main, function() { alert('bad browser'); });
