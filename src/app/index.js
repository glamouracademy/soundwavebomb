var canvas = document.getElementById('canvas');

var context2 = canvas.getContext('2d');
var context  = new C2S(500, 500);
var centerX  = canvas.width / 2;
var centerY  = canvas.height / 2;
var radius   = 70;

context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
context.fillStyle = 'green';
context.fill();
context.lineWidth = 5;
context.strokeStyle = '#003300';
context.stroke();

context2.beginPath();
context2.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
context2.fillStyle = 'green';
context2.fill();
context2.lineWidth = 5;
context2.strokeStyle = '#003300';
context2.stroke();

var res = context.getSerializedSvg();

setTimeout(function() {
  $('#value').val(res);
})

console.log($('#value').val())

console.log(res);
