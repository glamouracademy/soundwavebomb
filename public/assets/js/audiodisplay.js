var inc      = 15;     // width of the bars
var spacing  = 1.2;  // spacing factor between bars
var fraction = 4;   // fraction of width for connecting bars
var heightOfMiddleLine = 10;

var getSvg = function(svgc) {
    return '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
    svgc.getSerializedSvg();
};

var updateInput = function(svgc) {
    setTimeout(function() {
        $('#val').val(getSvg(svgc));
    });
};

var drawers = {
    'wave': function(width, height, context, data) {
        var svgc = new C2S(width, height);
        var step = Math.ceil(data.length / width);
        var amp  = height / 2;

        context.fillStyle = "#4D4E4C";
        svgc.fillStyle    = "#4D4E4C";

        context.clearRect(0, 0, width, height);

        context.beginPath();
        svgc.beginPath();

        context.moveTo(0, amp);
        svgc.moveTo(0, amp);

        for(var i = 0; i < width; i += inc * spacing){
            var min = 1.0;
            var max = -1.0;
            for (j=0; j<step; j++) {
                var datum = data[(i*step)+j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }
            var x = i;
            var y = (1 + min) * amp;
            var w = inc;
            var h = (Math.max(1, (max - min) * amp));

            context.lineTo(x, y);
            svgc.lineTo(x, y);
        }

        context.lineTo(width, height / 2);
        svgc.lineTo(width, height / 2);

        for(var i = width - 1; i >= 0; i -= inc * spacing){
            var min = 1.0;
            var max = -1.0;
            for (j=0; j<step; j++) {
                var datum = data[(i*step)+j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }
            var x = i;
            var y = (1 + min) * amp;
            var w = inc;
            var h = (Math.max(1, (max - min) * amp));

            context.lineTo(x, y + h);
            svgc.lineTo(x, y + h);
        }

        context.closePath();
        svgc.closePath();

        context.fill();
        svgc.fill();

        context.fillRect(0, height / 2 - (heightOfMiddleLine / 2), width, heightOfMiddleLine);
        svgc.fillRect(0, height / 2 - (heightOfMiddleLine / 2), width, heightOfMiddleLine);

        updateInput(svgc);
    },

    'default': function(width, height, context, data) {
        var svgc = new C2S(width, height);
        var step = Math.ceil(data.length / width);
        var amp  = height / 2;

        context.fillStyle = "#4D4E4C";
        svgc.fillStyle    = "#4D4E4C";

        context.clearRect(0, 0, width, height);

        for(var i = 0; i < width; i += inc * spacing){
            var min = 1.0;
            var max = -1.0;
            for (j=0; j<step; j++) {
                var datum = data[(i*step)+j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }
            var x = i;
            var y = (1 + min) * amp;
            var w = inc;
            var h = (Math.max(1, (max - min) * amp));

            context.fillRect(x, y, w, h);
            context.fillRect(x + w / fraction, y, w / (fraction / 2), -1 * (y - (height / 2)));

            svgc.fillRect(x, y, w, h);
            svgc.fillRect(x + w / fraction, y, w / (fraction / 2), -1 * (y - (height / 2)));
        }

        context.fillRect(0, height / 2 - (heightOfMiddleLine / 2), width, heightOfMiddleLine);
        svgc.fillRect(0, height / 2 - (heightOfMiddleLine / 2), width, heightOfMiddleLine);

        updateInput(svgc);
    }
};

function drawBuffer( width, height, context, data ) {
    drawers[$('#drawer').val() || 'default'](width, height, context, data);
}
