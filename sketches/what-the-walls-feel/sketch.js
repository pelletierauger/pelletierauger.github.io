var sketch = new p5(function(p) {
    p.looping = true;
    p.increment = 0;
    p.t = 0;
    p.setup = function() {
        p.canvasContainer = p.select("#dot-grid-demo");
        p.cnvs = p.createCanvas(650, 400);
        p.cnvs.parent("#dot-grid-demo");
        p.canvasContainer.style("max-width", "650px");
        p.canvasContainer.style("margin", "2em auto");
        // p.canvasContainer.style("margin-bottom", "2em");
        p.canvasContainer.style("padding", "0 0");
        p.frameRate(30);
        p.ctx = p.cnvs.drawingContext;
        // p.stroke(0);
        // p.strokeWeight(1);
        p.noStroke();
        p.fill(0);
    };
    p.draw = function() {
        p.background(255);
        let amountOfFrames = 120;
        // let t = (frameCount + 0) * 0.1;
        let a = 0.0008 * p.map(Math.sin(p.t), -1, 1, 0, 1);
        a = 0.001;
        let num = 0;
        for (let x = 0; x <= 600; x += 600 / 16 * 0.25) {
            for (let y = 0; y <= 400; y += 400 / 9 * 0.25) {
                let m = (x - 0) * (y - 0) * a + p.t;
                let xx = 20 + x + Math.cos(m) * 10;
                let yy = 10 + y + Math.sin(m) * 10;
                p.ellipse(xx * 0.95, yy * 0.9 + 10, 5);
                num++;
            }
        }
        // console.log(num);
        p.t += p.TWO_PI / amountOfFrames;
        if (p.t >= p.TWO_PI) {
            p.t = 0;
        }
    };
});