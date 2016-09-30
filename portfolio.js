var fs = require("fs");
// var file;
// fs.readdir('Pages', function(err, data) { file = data; });

var files = fs.readdirSync('pages');

var page = require('./pages/' + files[0]);

var header = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Guillaume Pelletier-Auger</title>
</head>
`;

var body = `
<body><h1>Guillaume Pelletier-Auger</h1>
Works - About - Switch Language
${page.fr.description}
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
