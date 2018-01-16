var looping = false;
var gridXAmount = 32;
var gridYAmount = 18;
var tileWidth;
var number = 1;
var current;
var dark;
var light;
var r, g, b;
var posShaker = 0;
var shakerToggle = 1;
let howMany = 0;
let ran, ranFloor, ranCeiling;
let linesMult;
let strokeFloor, strokeCeiling;
let canvasContainer;
let cnvs;
let padding = 10;
let button;
let EFMode = true;
let EFModeButton, EFOnlyButton, ABCDButton;
let EFOnly = false;
let ABCDMode = false;

function setup() {
    canvasContainer = select("#tiling-generator");
    let w = windowWidth;
    w = Math.min(w, 1000);
    cnvs = createCanvas(w, w * 9 / 16);
    cnvs.parent("#tiling-generator");
    // canvasContainer.style("width", "80%");
    canvasContainer.style("margin", "2em 0");
    canvasContainer.mouseClicked(function() {
        if (looping) {
            looping = false;
            noLoop();
        } else {
            redraw();
        }
    });

    button = select("#showreel");
    button.style("cursor", "pointer");
    button.mouseClicked(function() {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    });
    ABCDButton = select("#abcdmode");
    ABCDButton.style("cursor", "pointer");
    ABCDButton.style("padding-top", "4px");
    ABCDButton.style("border-bottom", "1px solid black");
    ABCDButton.mouseClicked(function() {
        ABCDButton.style("box-shadow", "0px 1px white, 0px 2px black");
        EFOnlyButton.style("box-shadow", "unset");
        EFModeButton.style("box-shadow", "unset");
        if (EFOnly || EFMode) {
            EFOnly = false;
            EFMode = false;
            redraw();
        } else {
            EFOnly = false;
            EFMode = false;
        }
    });
    EFModeButton = select("#efmode");
    EFModeButton.style("cursor", "pointer");
    EFModeButton.style("padding-top", "4px");
    // EFModeButton.style("background-color", "#EAEAEA");
    EFModeButton.style("box-shadow", "0px 1px white, 0px 2px black");
    EFModeButton.style("border-bottom", "1px solid black");
    EFModeButton.mouseClicked(function() {
        EFModeButton.style("box-shadow", "0px 1px white, 0px 2px black");
        EFOnlyButton.style("box-shadow", "unset");
        ABCDButton.style("box-shadow", "unset");
        if (!EFMode ||  EFOnly) {
            EFOnly = false;
            EFMode = true;
            redraw();
        } else {
            EFOnly = false;
            EFMode = true;
        }
    });
    EFOnlyButton = select("#efonly");
    EFOnlyButton.style("cursor", "pointer");
    EFOnlyButton.style("padding-top", "4px");
    EFOnlyButton.style("border-bottom", "1px solid black");
    EFOnlyButton.mouseClicked(function() {
        ABCDButton.style("box-shadow", "unset");
        EFModeButton.style("box-shadow", "unset");
        EFOnlyButton.style("box-shadow", "0px 1px white, 0px 2px black");
        // EFOnlyButton.style("background-color", "#E4D87E");

        // EFOnlyButton.style("padding", "2px 10px");

        if (!EFOnly || EFMode) {
            EFOnly = true;
            EFMode = false;
            redraw();
        } else {
            EFOnly = true;
            EFMode = false;
        }
    });

    background(51);
    frameRate(1);
    tileWidth = (width - (padding * 3)) / gridXAmount;

    // noStroke();
    // stroke(70);
    current = 0;
    noLoop();
    dark = color(0);
    light = color(255);
    stroke(dark);
    // strokeWeight(1.5);
    ran = 0.4;
    ranFloor = 0.7;
    ranCeiling = 1.5;
    linesMult = 2;
    strokeFloor = 1 * (width / 1280);
    strokeCeiling = 2.5 * (width / 1280);
}

function draw() {
    // truchetAlgorithm3();
    background(light);
    translate(padding, padding);
    generateRandomBlock();
    blockRandom001 = new Block({
        type: "static",
        size: { width: blockWidth * 2, height: blockWidth * 2 },
        maxSize: { width: 500, height: 700 },
        data: blockData,
        horizontalSymmetry: false,
        verticalSymmetry: false
    });
    blockRandom001.showTiling();
    // show("A", width / 2, height / 2, tileWidth, light, dark);
    // animate();
    // background(color(100));
    // animate2TilingsAlgo();
    // animateAlgo();
    // fill(255, 0, 0);
    // // rect(posShaker, 0, 4, height);
    // posShaker += 20;
    // if (posShaker > width + 250) {
    //     posShaker = -250;
    //     shakerToggle *= -1;
    // }
}

function animate2TilingsAlgo() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            var lerpValue = map(sin(frameCount / 20), -1, 1, -0.4, 1.4);
            lerpValue = constrain(lerpValue, 0, 1);
            if (x > posShaker) {
                if (shakerToggle == 1) {
                    lerpValue = 1;
                } else {
                    lerpValue = 0;
                }
            } else {
                if (shakerToggle == 1) {
                    lerpValue = 0;
                } else {
                    lerpValue = 1;
                }
                var r = abs(x - posShaker);
                if (r < 250) {
                    if (shakerToggle == 1) {
                        var maps = map(r, 0, 250, 1, 0);
                    } else {
                        var maps = map(r, 0, 250, 0, 1);
                    }

                    lerpValue = maps;
                }
            }
            // var red = lerp(255, 150, lerpValue);
            // var green = lerp(50, 255, lerpValue);
            // var blue = lerp(255, 150, lerpValue);
            // light = (red, green, blue);

            // var d = dist(x, posShaker);
            // lerpValue = lerp(d, 0,10,)
            var current = blockOne.tiling[(x / tileWidth) + (y / tileWidth) * gridXAmount];
            var current2 = blockTwo.tiling[(x / tileWidth) + (y / tileWidth) * gridXAmount];
            sortTransitions(current, current2, x, y, lerpValue);
        }
    }
}

function animateAlgo() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            var lerpValue = map(sin(frameCount / 100), -1, 1, 0, 1);
            animateCtoA(x, y, lerpValue);
            // if (frameCount % 13 == 0) {
            //     console.log(lerpValue);
            // }
            // rect(x, y, x + tileWidth, y + tileWidth);
        }
    }
}

function truchetAlgorithm3() {
    var truchetArray = [];
    var truchetArraySize = 32 * 18;
    var block = {
        lines: ["AAAABBBBCCCCDDDD"],
        horizontalSymmetry: true,
        verticalSymmetry: false
    };
    fillArray(block, truchetArray);
    showArray(truchetArray);

    function fillArray(block, truchetArray, startX, startY) {

        var instruction = block.lines[0];
        // console.log(block.lines[0].length);
        while (truchetArray.length < truchetArraySize) {
            for (var i = 0; i < instruction.length; i++) {
                // console.log(instruction[i]);
                truchetArray.push(instruction[i]);
            }
        }

    }

    function showArray(truchetArray) {
        console.log(truchetArray);
        for (var x = 0; x < width; x += tileWidth) {
            for (var y = 0; y < height; y += tileWidth) {
                var current = truchetArray[(x / tileWidth) + (y / tileWidth) * gridXAmount];
                showNumeral(current, x, y, tileWidth, light, dark);
            }
        }
    }
}


function truchetAlgorithm2() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            if (x / tileWidth % 2 == 0) {
                if (y / tileWidth % 2 == 0) {
                    current = 0;
                    // light = color(255, 0, 0);
                } else {
                    current = 1;
                    // light = color(255, 255, 0);
                }

            } else {
                if (y / tileWidth % 2 == 0) {
                    current = 3;
                    // light = color(0, 0, 255);
                } else {
                    current = 2;
                    // light = color(0, 255, 0);
                }

            }

            show(current, x, y, tileWidth, light, dark);
        }
    }
    number += 1;
}

function truchetSinewave() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            show(current, x, y, tileWidth, light, dark);
            // truchetAlgorithm(x, y, tileWidth, light, dark);
            current = map(sin((x + y * gridXAmount) / number), -1, 1, 0, 4);
            // r = map(sin((x + y * gridXAmount) / number), -1, 1, 0, 55);
            // g = map(sin((x + y * gridXAmount) / number), -1, 1, 155, 25);
            // b = map(cos((x + y * gridXAmount) / number), -1, 1, 150, 5);
            // r = map(x / tileWidth, 0, gridXAmount, 0, 255);
            // g = map(y / tileWidth, 0, gridYAmount, 255, 0);
            // b = map(y / tileWidth, 0, gridYAmount, 0, 255);
            // dark = color(r / 2, g / 2, b / 2);
            // light = color(r, g, b);
            // dark = color(r, g, b);
            // light = color(g, b, g);
            // dark = color(b, g, r);
            current = floor(current);
        }

        // if (y % number == 0) {
        //     current += 1;
        // }
        // if (current > 3) {
        //     current = 0;
        // }
    }
    number += 1;
}

function truchetAlgorithm(x, y, tW, light, dark) {
    var current;
    if (y % 3 == 0) {
        current = 0;
    } else {
        current = 2;
    }
    show(current, x, y, tileWidth, light, dark);
}

function show(position, x, y, tW, light, dark) {
    switch (position) {
        case 0:
            showA(x, y, tileWidth, light, dark);
            break;
        case 1:
            showB(x, y, tileWidth, light, dark);
            break;
        case 2:
            showC(x, y, tileWidth, light, dark);
            break;
        case 3:
            showD(x, y, tileWidth, light, dark);
            break;
        default:
            showA(x, y, tileWidth, light, dark);
    }
}

function showNumeral(position, x, y, tW, light, dark) {
    howMany++;
    switch (position) {
        case "A":
            showA(x, y, tileWidth, light, dark);
            break;
        case "B":
            showB(x, y, tileWidth, light, dark);
            break;
        case "C":
            showC(x, y, tileWidth, light, dark);
            break;
        case "D":
            showD(x, y, tileWidth, light, dark);
            break;
        case "E":
            showE(x, y, tileWidth, light, dark);
            break;
        case "F":
            showF(x, y, tileWidth, light, dark);
            break;
        default:
            showA(x, y, tileWidth, light, dark);
    }
}

function showA(x, y, tW, light, dark) {
    ran = random(ranFloor, ranCeiling);
    // fill(light);
    // rect(x, y, tW, tW);
    // beginShape();
    // fill(dark);
    // vertex(x, y);
    // vertex(x + tW, y + tW);
    // vertex(x, y + tW);
    // endShape();
    // fill(dark);
    // stroke(dark);
    // strokeWeight(1);
    let oX = x;
    let oY = y;
    let AmountOfLines = 20 * linesMult;
    let gutter = tW / AmountOfLines;
    for (let i = 0; i < AmountOfLines; i++) {
        x = oX + random(ran);
        y = oY + random(ran);
        let x2 = oX + random(ran);
        let y2 = oY + random(ran);
        strokeWeight(random(strokeFloor, strokeCeiling));
        if (i <= AmountOfLines / 2) {
            // line(x, y + (i * gutter * 2), x + (i * gutter), y + (i * gutter));
            line(x, y + (i * gutter * 2), x2 + (i * gutter), y2 + (i * gutter));
        } else {
            // line(x + (i * gutter * 2) - (tW), y + tW, x + (i * gutter), y + (i * gutter));
            line(x + (i * gutter * 2) - (tW), y + tW, x2 + (i * gutter), y2 + (i * gutter));
        }
    }
    showSquare(x, y, tW, light, dark);
    // noStroke();
}

function showB(x, y, tW, light, dark) {
    ran = random(ranFloor, ranCeiling);
    // fill(light);
    // rect(x, y, tW, tW);
    // beginShape();
    // fill(dark);
    // vertex(x, y);
    // vertex(x + tW, y);
    // vertex(x, y + tW);
    // endShape();
    // fill(dark);
    // stroke(dark);
    // strokeWeight(1);
    let oX = x;
    let oY = y;
    let AmountOfLines = 10 * linesMult;
    let gutter = tW / AmountOfLines;
    for (let i = 0; i < AmountOfLines; i++) {
        x = oX + random(ran);
        y = oY + random(ran);
        let x2 = oX + random(ran);
        let y2 = oY + random(ran);
        strokeWeight(random(strokeFloor, strokeCeiling));
        line(x, y + (i * gutter), x2 + (i * gutter), y2);
    }
    showSquare(x, y, tW, light, dark);
    // noStroke();
}

function showC(x, y, tW, light, dark) {
    ran = random(ranFloor, ranCeiling);
    // fill(light);
    // rect(x, y, tW, tW);
    // beginShape();
    // fill(dark);
    // vertex(x, y);
    // vertex(x + tW, y);
    // vertex(x + tW, y + tW);
    // endShape();
    // fill(dark);
    // stroke(dark);
    // strokeWeight(1);
    let oX = x;
    let oY = y;
    let AmountOfLines = 20 * linesMult;
    let gutter = tW / AmountOfLines;
    for (let i = 0; i < AmountOfLines; i++) {
        x = oX + random(ran);
        y = oY + random(ran);
        let x2 = oX + random(ran);
        let y2 = oY + random(ran);
        strokeWeight(random(strokeFloor, strokeCeiling));
        if (i <= AmountOfLines / 2) {
            // line(x + (i * gutter), y + (i * gutter), x + (i * gutter * 2), y);
            line(x + (i * gutter), y + (i * gutter), x2 + (i * gutter * 2), y2);
        } else {
            // line(x + (i * gutter), y + (i * gutter), x + tW, y + (i * gutter * 2) - tW);
            line(x + (i * gutter), y + (i * gutter), x2 + tW, y2 + (i * gutter * 2) - tW);
        }
    }
    showSquare(x, y, tW, light, dark);
    // noStroke();
}

function showD(x, y, tW, light, dark) {
    ran = random(ranFloor, ranCeiling);
    // fill(light);
    // rect(x, y, tW, tW);
    // beginShape();
    // fill(dark);
    // vertex(x + tW, y);
    // vertex(x + tW, y + tW);
    // vertex(x, y + tW);
    // endShape();
    // fill(dark);
    // stroke(dark);
    // strokeWeight(1);
    let oX = x;
    let oY = y;
    let AmountOfLines = 10 * linesMult;
    let gutter = tW / AmountOfLines;
    for (let i = 0; i < AmountOfLines; i++) {
        x = oX + random(ran);
        y = oY + random(ran);
        let x2 = oX + random(ran);
        let y2 = oY + random(ran);
        strokeWeight(random(strokeFloor, strokeCeiling));
        // line(x + (i * gutter), y + tW, x + tW, y + (i * gutter));
        line(x + (i * gutter), y + tW, x2 + tW, y2 + (i * gutter));
    }
    showSquare(x, y, tW, light, dark);
    // noStroke();
}

function showE(x, y, tW, light, dark) {
    // fill(light);
    // rect(x, y, tW, tW);
    showSquare(x, y, tW, light, dark);
}

function showF(x, y, tW, light, dark) {
    ran = random(ranFloor, ranCeiling);
    // fill(light);
    // rect(x, y, tW, tW);

    // fill(dark);
    // stroke(dark);
    // strokeWeight(1);
    let oX = x;
    let oY = y;
    let AmountOfLines = 20 * linesMult;
    let gutter = tW / AmountOfLines;
    for (let i = 0; i < AmountOfLines; i++) {
        x = oX + random(ran);
        y = oY + random(ran);
        let x2 = oX + random(ran);
        let y2 = oY + random(ran);
        strokeWeight(random(strokeFloor, strokeCeiling));
        if (i <= AmountOfLines / 2) {
            // line(x, y + (i * gutter * 2), x + (i * gutter * 2), y);
            line(x, y + (i * gutter * 2), x2 + (i * gutter * 2), y2);
        } else {
            // line(x + (i * gutter * 2) - tW, y + tW, x + tW, y + (i * gutter * 2) - tW);
            line(x + (i * gutter * 2) - tW, y + tW, x2 + tW, y2 + (i * gutter * 2) - tW);
        }
    }

    // noStroke();
    showSquare(x, y, tW, light, dark);
}

function showSquare(x, y, tW, light, dark) {
    // strokeWeight(0.5);
    // stroke(0, 50);
    // let oX = x;
    // let oY = y;
    // x = oX + random(ran);
    // y = oY + random(ran);
    // line(x, y, x + tW, y);
    // x = oX + random(ran);
    // y = oY + random(ran);
    // line(x + tW, y, x + tW, y + tW);
    // x = oX + random(ran);
    // y = oY + random(ran);
    // line(x + tW, y + tW, x, y + tW);
    // x = oX + random(ran);
    // y = oY + random(ran);
    // line(x, y + tW, x, y);
    // stroke(dark);
    // strokeWeight(1);
}

function keyPressed() {
    if (key == 'p' || key == 'P') {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
    if (key == 'r' || key == 'R') {
        redraw();
    }
}