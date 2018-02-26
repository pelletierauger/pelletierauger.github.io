// Copyright 2017, 2018 Guillaume Pelletier-Auger

// This file is part of Lined Truchet Generator.

// Lined Truchet Generator is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Lined Truchet Generator is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

var looping = true;
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
let wavy = true;
let widthWavy = 5;
let t = 0;

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
    frameRate(10);
    tileWidth = (width - (padding * 3)) / gridXAmount;

    // noStroke();
    // stroke(70);
    current = 0;
    // noLoop();
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
    // truchetAlgorithm3();
    if (wavy) {
        widthWavy = random(4, 14);
        while (widthWavy > 9 && widthWavy < 12.5) {
            widthWavy = random(4, 14);
        }
    }
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
}

function draw() {
    background(255);
    blockRandom001.showTiling();
    t += 0.5;
}

function showNumeral(position, x, y, tW, light, dark) {
    howMany++;
    if (wavy) {
        switch (position) {
            case "A":
                showAWavy(x, y, tileWidth, light, dark);
                break;
            case "B":
                showBWavy(x, y, tileWidth, light, dark);
                break;
            case "C":
                showCWavy(x, y, tileWidth, light, dark);
                break;
            case "D":
                showDWavy(x, y, tileWidth, light, dark);
                break;
            case "E":
                showE(x, y, tileWidth, light, dark);
                break;
            case "F":
                showFWavy(x, y, tileWidth, light, dark);
                break;
            default:
                showA(x, y, tileWidth, light, dark);
        }
    } else {
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
}

function showAWavy(x, y, tW, light, dark) {
    stroke(0);
    strokeWeight(widthWavy);
    arc(x, y + tW, tW, tW, (PI * 1.5) + t, 0 + t);
}

function showBWavy(x, y, tW, light, dark) {
    stroke(0);
    strokeWeight(widthWavy);
    arc(x, y, tW, tW, 0 - t, (PI / 2) - t);
}

function showCWavy(x, y, tW, light, dark) {
    stroke(0);
    strokeWeight(widthWavy);
    arc(x + tW, y, tW, tW, (PI / 2) + t, PI + t);
}

function showDWavy(x, y, tW, light, dark) {
    stroke(0);
    strokeWeight(widthWavy);
    arc(x + tW, y + tW, tW, tW, PI - t, (PI * 1.5) - t);
}

function showFWavy(x, y, tW, light, dark) {
    stroke(0);
    strokeWeight(widthWavy);
    arc(x, y + tW, tW, tW, (PI * 1.5) + t, 0 + t);
    arc(x, y, tW, tW, 0 - t, (PI / 2) - t);
    arc(x + tW, y, tW, tW, (PI / 2) + t, PI + t);
    arc(x + tW, y + tW, tW, tW, PI - t, (PI * 1.5) - t);
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