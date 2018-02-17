var Block = function(block) {
    this.type = block.type;
    this.size = block.size;
    this.data = block.data;
    this.offset = block.offset || { x: 0, y: 0 };
    this.horizontalSymmetry = block.horizontalSymmetry;
    this.verticalSymmetry = block.verticalSymmetry;
    this.fullSpace = this.makeLargeSpace(block);
    this.tiling = this.makeTiling();
};

Block.prototype.makeLargeSpace = function(block) {
    var largeArray = [];
    //Make copies to take care of symmetries,
    //to end up with blocks that can be copied simply without symmetry.

    largeArray = block.data.slice(0);

    while (largeArray[0].length < block.maxSize.width) {
        for (var i = 0; i < largeArray.length; i++) {
            largeArray[i] = largeArray[i] + largeArray[i];
        }
    }
    while (largeArray.length < block.maxSize.height) {
        for (var j = 0; j < block.size.height; j++) {
            largeArray.push(largeArray[j]);
        }
    }
    //At this point, largeArray needs to be "flattened".
    //Each node of largeArray represents an horizontal line...
    var flatArray = "";
    for (var k = 0; k < largeArray.length; k++) {
        flatArray = flatArray + largeArray[k];
    }

    //And then, make a large amount of copies.
    //Return the large array.
    // console.log(largeArray);
    // console.log(flatArray);
    return largeArray;
    // return flatArray;
};

Block.prototype.makeTiling = function() {
    // console.log(this.fullSpace);
    var myTiling = tilingFiller({
        space: this.fullSpace,
        offset: this.offset,
        outputSize: { width: gridXAmount, height: gridYAmount }
    });
    // console.log(myTiling);
    return myTiling;
};

Block.prototype.showTiling = function() {
    for (var x = 0; x < gridXAmount * tileWidth; x += tileWidth) {
        for (var y = 0; y < gridYAmount * tileWidth; y += tileWidth) {
            var current = this.tiling[(x / tileWidth) + (y / tileWidth) * gridXAmount];
            // console.log(current);
            showNumeral(current, x, y, tileWidth, light, dark);
        }
    }
};

function tilingFiller(instructions) {
    var space = instructions.space;
    var offset = instructions.offset;
    var size = instructions.outputSize;
    var tiling = [];
    for (var x = 0; x < size.width; x += 1) {
        for (var y = 0; y < size.height; y += 1) {
            tiling[x + y * size.width] = space[offset.y + y][offset.x + x];
            // tiling[x + y * size.width] = space[(offset.x + x) + ((offset.y + y) * size.width)];
        }
    }
    var tilingAsAString = "";
    for (var i = 0; i < tiling.length; i++) {
        tilingAsAString = tilingAsAString + tiling[i];
    }
    // console.log(tilingAsAString);
    return tiling;
}

var blockOne = new Block({
    type: "static",
    size: { width: 8, height: 8 },
    maxSize: { width: 500, height: 700 },
    data: ["BBDADACC",
        "BDBCBCAC",
        "DBBADCCA",
        "CACBCBDB",
        "DBDADACA",
        "CAABCDDB",
        "ACADADBD",
        "AACBCBDD"
    ],
    // data: ["CB", "DD", "CB", "DD"],
    horizontalSymmetry: false,
    verticalSymmetry: false
});

var blockTwo = new Block({
    type: "static",
    size: { width: 12, height: 12 },
    maxSize: { width: 500, height: 700 },
    data: ["BBDCACBDBACC",
        "BBBDCADBACCC",
        "DBBBDCBACCCA",
        "ADBBBDACCCAD",
        "CADBBBCCCADB",
        "ACADBBCCADBD",
        "BDBCAADDBCAC",
        "DBCAAADDDBCA",
        "BCAAACBDDDBC",
        "CAAACDABDDDB",
        "AAACDBCABDDD",
        "AACDBDACABDD"
    ],
    // data: ["AD", "CB", "AD", "CB"],
    // data: ["CC", "DD", "CC", "DD"],
    horizontalSymmetry: false,
    verticalSymmetry: false
});

var blockRandom001 = new Block({
    type: "static",
    size: { width: blockWidth, height: blockWidth },
    maxSize: { width: 500, height: 700 },
    data: blockData,
    // data: ["AD", "CB", "AD", "CB"],
    // data: ["CC", "DD", "CC", "DD"],
    horizontalSymmetry: false,
    verticalSymmetry: false
});