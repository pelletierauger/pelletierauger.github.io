var fs = require("fs");

var header = `<!DOCTYPE html>
<html>
<head>
    <script src="add2.js"></script>
    <script>
    var base = 10;
    console.log(addtwo(10));
    </script>
</head>
`;

var body = `
<body><h1>I'm writing my own HTML files with Node.js. It's pretty neat.</h1>
It's actually like... awesome! It's a big change. I can now think of a website as a data structure.
Is there something new here? How wonderful is that?
</body>
</html>
`;

fs.writeFile('index.html', header + body, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log("Data written successfully!");
    }
});
