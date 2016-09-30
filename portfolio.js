var fs = require("fs");
var page = require('./Pages/dunes.js').page.content_fr;

var header = `<!DOCTYPE html>
<html>
<head>
    <title>Guillaume Pelletier-Auger</title>
</head>
`;

var body = `
<body><h1>Guillaume Pelletier-Auger</h1>
Works - About - Switch Language
${page}
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
