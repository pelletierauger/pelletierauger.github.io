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

var blockWidth;
var blockData = [];
var blockOffset;
generateRandomBlock();

function calculateOffset(n) {
    var xOffset = subtractRemainder(n, gridXAmount);
    var yOffset = subtractRemainder(n, gridYAmount);

    function subtractRemainder(n, w) {
        var half = w / 2;
        var remainder = half % n;
        return n - remainder;
    }
    return { x: xOffset, y: yOffset };
}

function generateRandomBlock() {
    blockWidth = Math.round(Math.random() * 6 + 3);
    blockOffset = calculateOffset(blockWidth);
    blockData = [];
    var builtBlocks = 0;
    while (builtBlocks < blockWidth) {
        for (var i = 0; i <= builtBlocks; i++) {
            if (i == builtBlocks) {
                if (!blockData[builtBlocks]) {
                    blockData[builtBlocks] = getRandomTileOblique();
                } else {
                    blockData[builtBlocks] = blockData[builtBlocks] + getRandomTileOblique();
                }
            } else {
                if (!blockData[builtBlocks]) {
                    blockData[builtBlocks] = getRandomTile();
                } else {
                    blockData[builtBlocks] = blockData[builtBlocks] + getRandomTile();
                }
            }

        }
        builtBlocks++;
    }
    var builtRows = 0;
    var currentTile = 1;
    while (builtRows < blockWidth) {
        // var blockToBuild = blockData[currentTile][builtRows];
        // blockToBuild = getSymmetricalTile(blockToBuild, "obliqueDownward");
        // blockData[builtRows][currentTile] = blockToBuild;


        while (blockData[builtRows].length < blockWidth) {
            var tileToGet = blockData[builtRows].length;
            tileToGet = blockData[tileToGet][builtRows];
            tileToGet = getSymmetricalTile(tileToGet, "obliqueDownward");
            blockData[builtRows] += tileToGet;
        }
        builtRows++;

    }

    //Mirror horizontally the whole thing
    for (var k = 0; k < blockWidth; k++) {
        for (var j = blockWidth - 1; j >= 0; j--) {
            var tileToMirror = blockData[k][j];
            tileToMirror = getSymmetricalTile(tileToMirror, "horizontal");
            blockData[k] += tileToMirror;
        }
    }

    //Mirror vertically the whole thing
    for (var l = blockWidth - 1; l >= 0; l--) {
        var newString = "";
        for (var ll = 0; ll < blockWidth * 2; ll++) {
            var tileToAdd = blockData[l][ll];
            tileToAdd = getSymmetricalTile(tileToAdd, "vertical");
            newString += tileToAdd;
        }
        blockData.push(newString);
    }
}


function getRandomTile() {
    if (EFOnly) {
        var tiles = ["E", "F"];
        var tile = tiles[Math.round(Math.random())];
    } else {
        if (EFMode) {
            var tiles = ["A", "B", "C", "D", "E", "F"];
            var tile = tiles[Math.round(Math.random() * 5)];
        } else {
            var tiles = ["A", "B", "C", "D"];
            var tile = tiles[Math.round(Math.random() * 3)];
        }
    }
    return tile;
}

function getRandomTileOblique() {
    if (EFOnly) {
        var tiles = ["E", "F"];
        var tile = tiles[Math.round(Math.random())];
    } else {
        if (EFMode) {
            var tiles = ["B", "D", "E", "F"];
            var tile = tiles[Math.round(Math.random() * 3)];
        } else {
            var tiles = ["B", "D"];
            var tile = tiles[Math.round(Math.random())];
        }
    }
    return tile;
}

function getSymmetricalTile(tile, type) {
    if (tile == "E" || tile == "F") {
        return tile;
    }
    if (tile == "A" && type == "horizontal") {
        return "D";
    }
    if (tile == "A" && type == "vertical") {
        return "B";
    }
    if (tile == "A" && type == "obliqueDownward") {
        return "C";
    }
    if (tile == "A" && type == "obliqueUpward") {
        return "A";
    }
    if (tile == "B" && type == "horizontal") {
        return "C";
    }
    if (tile == "B" && type == "vertical") {
        return "A";
    }
    if (tile == "B" && type == "obliqueDownward") {
        return "B";
    }
    if (tile == "B" && type == "obliqueUpward") {
        return "D";
    }
    if (tile == "C" && type == "horizontal") {
        return "B";
    }
    if (tile == "C" && type == "vertical") {
        return "D";
    }
    if (tile == "C" && type == "obliqueDownward") {
        return "A";
    }
    if (tile == "C" && type == "obliqueUpward") {
        return "C";
    }
    if (tile == "D" && type == "horizontal") {
        return "A";
    }
    if (tile == "D" && type == "vertical") {
        return "C";
    }
    if (tile == "D" && type == "obliqueDownward") {
        return "D";
    }
    if (tile == "D" && type == "obliqueUpward") {
        return "B";
    }
}