var sketch = new p5(function(p) {
    p.looping = true;
    p.cols = [];
    p.setup = function() {
        p.canvasContainer = p.select("#recursive-harmonic-motion-2");
        p.cnvs = p.createCanvas(900, 900 / 16 * 9);
        p.cnvs.parent("#recursive-harmonic-motion-2");
        p.canvasContainer.style("width", "900px");
        p.canvasContainer.style("margin", "0 auto");
        p.canvasContainer.style("padding", "0 0");
        p.ctx = p.cnvs.drawingContext;
        p.frameRate(30);
        p.background(0);
        p.stroke(255, 150);
        p.noFill();
        p.noStroke();
    }
    p.draw = function() {
        p.nx = p.map(Math.cos(p.frameCount * 0.02), -1, 1, -1, 1);
        p.ny = p.map(Math.sin(p.frameCount * 0.02), -1, 1, -1, 1)

        p.translate(p.width * 0.5, p.height * 0.5);
        p.cols = [{
            offset: 0,
            r: 255,
            g: 255,
            b: 50
        }, {
            offset: p.map(Math.sin(p.nx), -1, 1, 0.45, 0.15), //0.35
            r: 200,
            g: Math.floor(p.map(Math.sin(p.nx), -1, 1, 50, 150)),
            b: 40
        }, {
            offset: 0.75,
            r: Math.floor(p.map(Math.sin(p.nx), -1, 1, 50, 0)),
            g: Math.floor(p.map(Math.sin(p.nx), -1, 1, 30, 0)),
            b: Math.floor(p.map(Math.sin(p.nx), -1, 1, 150, 150))
        }];
        p.push();
        p.translate(p.nx * 50, p.ny * 50);
        printBackgroundGradient();
        p.pop();
        drawEllipse(p.nx * 50, p.ny * 50, 800, 0);
    }

    function drawEllipse(x, y, s, i) {
        var decrement = 15;
        if (s > 5) {
            var red = p.map(Math.cos(s * 0.5), -1, 1, 150, 255);
            var green = p.map(Math.sin(p.nx), -1, 1, 50, 150); // 50, 150);
            var blue = p.map(Math.cos(s * 0.05), -1, 1, 55, 0);

            var color = {
                r: red,
                g: green,
                b: blue
            };
            // color = adjustLevels(-120, 0, 50, color);
            p.fill(color.r, color.g, color.b, 255);
            p.stroke(color.r / 4, color.g / 4, color.b / 4, 255);
            p.strokeWeight(0.75);
            p.ellipse(x, y, s);
            s *= 0.5;
            if (i % 2 == 0) {
                drawEllipse(x + s * p.nx / 1, y - s * p.ny / 2, s, i++);
                drawEllipse(x - s * p.nx / 1, y + s * p.ny / 2, s, i++);
            } else {
                drawEllipse(x - s * p.nx / 1, y + s * p.ny / 2, s, i++);
                drawEllipse(x + s * p.nx / 1, y - s * p.ny / 2, s, i++);
            }
        }
    }

    function printBackgroundGradient() {
        var gradient = p.ctx.createRadialGradient(0, 0, 0, 0, 0, p.width);
        for (var i = 0; i < p.cols.length; i++) {
            gradient.addColorStop(p.cols[i].offset, "rgba(" + p.cols[i].r + ", " + p.cols[i].g + ", " + p.cols[i].b + ",1)");
        }
        p.ctx.fillStyle = gradient;
        p.rect((-p.width * 0.5) - p.nx * 50, (-p.height * 0.5) - p.ny * 50, p.width, p.height);
    }
});