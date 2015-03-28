var inc = 20;

function drawBuffer( width, height, context, data ) {
    var svgc = new C2S(width, height);

    var spacing = 1.1;
    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    context.fillStyle = "#666666";
    svgc.fillStyle = "#666666";
    context.clearRect(0,0,width,height);
    svgc.clearRect(0,0,width,height);
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
        svgc.fillRect(x, y, w, h);
    }
    var heightOfMiddleLine = 10;
    context.fillRect(0, height / 2 - (heightOfMiddleLine / 2), width, heightOfMiddleLine);
    svgc.fillRect(0, height / 2 - (heightOfMiddleLine / 2), width, heightOfMiddleLine);

    var Q =
        '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
        svgc.getSerializedSvg();

    $('#val').val(Q);
}
