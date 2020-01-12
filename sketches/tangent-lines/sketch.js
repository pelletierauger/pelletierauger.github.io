var sketch = new p5(function(p) {
    p.looping = true;
    p.increment = 0;
    p.setup = function() {
        p.canvasContainer = p.select("#tangent-lines");
        p.cnvs = p.createCanvas(650, 650);
        p.cnvs.parent("#tangent-lines");
        p.canvasContainer.style("max-width", "650px");
        p.canvasContainer.style("margin", "2em auto");
        // p.canvasContainer.style("margin-bottom", "2em");
        p.canvasContainer.style("padding", "0 0");
        p.frameRate(30);
        p.ctx = p.cnvs.drawingContext;
        p.stroke(0);
        p.strokeWeight(1);
        let canvasDOM = document.querySelector('#tangent-lines canvas');
        canvasDOM.style.maxWidth = "650px";
        canvasDOM.style.maxHeight = "650px";
        canvasDOM.style.width = "100%";
        canvasDOM.style.height = "100%";
    }
    p.draw = function() {
        p.background(255);
        p.scale(325 / 250, 325 /  250);
        increment = (Math.PI * 2) / 1500;
        t = p.frameCount;
        let k = 0;
        let curve = p.map(Math.sin(p.frameCount * 0.05), -1, 1, 0.95, 1.05);
        for (let i = 0; i < (Math.PI * 2) - increment; i += increment) {
            r = p.map(Math.sin(i * 5), -1, 1, curve, 1) * 50;
            x = Math.cos(i) * r + 250;
            y = Math.sin(i) * r + 250;
            // y = x * x;
            if (k % 10 == 0) {
                let j = i + increment;
                let r2 = p.map(Math.sin(j * 5), -1, 1, curve, 1) * 50;
                let x2 = Math.cos(j) * r2 + 250;
                let y2 = Math.sin(j) * r2 + 250;
                // y2 = 
                // ellipse(x, y, 10);
                // stroke(0);
                let slope = (y2 - y) / (x2 - x);
                let x0 = x - 1000;
                let x3 = x2 + 1000;
                let y0 = y - 1000 * slope;
                let y3 = y2 + 1000 * slope;
                p.line(x0, y0, x3, y3);
                // noStroke();
            }
            // ellipse(x, y, 2);
            k++;
        }
    }

    function drawEllipse(x, y, s, i) {
        var decrement = 15;
        if (s > 15) {
            var red = p.map(Math.cos(s), -1, 1, 150, 255);
            var green = p.map(Math.sin(p.nx), -1, 1, 50, 150); // 50, 150);
            var blue = p.map(Math.cos(s * 0.5), -1, 1, 55, 0);

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
            if (p.nx >= -1) {
                if (i % 2 == 0) {
                    drawEllipse(x, y - s * p.ny, s, i++);
                    drawEllipse(x - s * p.nx, y, s, i++);
                } else {
                    drawEllipse(x - s * p.nx, y, s, i++);
                    drawEllipse(x, y - s * p.ny, s, i++);
                }
            } else {
                if (i % 2 == 0) {
                    drawEllipse(x - s * p.nx, y, s, i++);
                    drawEllipse(x, y - s * p.ny, s, i++);
                } else {
                    drawEllipse(x, y - s * p.ny, s, i++);
                    drawEllipse(x - s * p.nx, y, s, i++);
                }
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