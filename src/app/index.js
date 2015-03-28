var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context2 = canvas.getContext('2d');
var context  = new C2S(500, 500);
var centerX  = canvas.width / 2;
var centerY  = canvas.height / 2;
var radius   = 70;

// context.beginPath();
// context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
// context.fillStyle = 'black';
// context.fill();
// context.lineWidth = 5;
// context.strokeStyle = '#000';
// context.stroke();

// context2.beginPath();
// context2.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
// context2.fillStyle = 'black';
// context2.fill();
// context2.lineWidth = 5;
// context2.strokeStyle = '#000';
// context2.stroke();

var res = context.getSerializedSvg();

var actx = new (window.AudioContext || window.webkitAudioContext)();
navigator.webkitGetUserMedia({audio:true}, function(stream) {
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

  requestAnimationFrame(function loop() {
    context2.clearRect(0, 0, canvas.width, canvas.height);
    var times = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(times);
    for (var i = 0; i < times.length; i++) {
      var value    = times[i];
      var percent  = value / 256;
      var h        = HEIGHT * percent;
      var offset   = HEIGHT - h - 1;
      var barWidth = WIDTH / times.length;
      context2.fillStyle = 'black';
      context2.fillRect(i * barWidth, offset, 1, 5 );
    }
    requestAnimationFrame(loop);
  });

}, function() {
  alert('bad browser');
});

setTimeout(function() {
  res = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
        res;
  $('#value').val(res);
})

console.log($('#value').val())

console.log(res);
