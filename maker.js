//First, we get the list of all the pages we need to make, in order, in pages.list, and
//we also get all the pages that are defined inside the pages.js module, in pages.pages.
var pages = require("./pages/pages.js");
var filenameFormatter = require('./filename-formatter.js');

// makeIndexes(pages);

//For each element in the list of pages, the single page is either a property of pages.js module,
//or it's a property of a standalone module.
//Let page be the property pages.list[i] if it exists, otherwise load a standalone module.

for (var i = 0; i <  pages.list.length; i++) {
    var page = (pages.pages[pages.list[i]] || require('./pages/' + pages.list[i]));
    // console.log(page);
    makePage(page, "fr");
    makePage(page, "en");
}

function makePage(page, language) {
    var fileName = filenameFormatter(page[language].title);
    console.log(fileName);
    var header = makeHeader(page, language);
    var content = makeContent(page, language);
    var footer = makeFooter(page, language);
    makeFile(language, fileName, header + content + footer);
}

function makeHeader(page, language) {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Guillaume Pelletier-Auger - ${page[language].title}</title>
    </head>
    `;
}

function makeContent(page, language) {
    //h1 must be an anchor link to index.html in the chosen language.
    var nav1 = (language == "fr") ? "Travaux" : "Works";
    var nav2 = (language == "fr") ? "À propos" : "About";
    var nav3 = (language == "fr") ? "Français" : "English";
    var oppositeLanguage = (language == "fr") ? "en" : "fr";
    var content = `<body><h1>Guillaume Pelletier-Auger</h1>
    <div id="nav"><ul>
    <li>${nav1}</li>
    <li>${nav2}</li>
    <li>${nav3}</li>
    </ul>
    </div>
    <div id="main">${page[language].content}</div>
    `;
    return content;
}

function makeFooter(page, language) {
    return `<div id="footer"Guillaume Pelletier-Auger - 2016</div>
    </body>
    </html>
    `;
}

function makeFile(language, fileName, htmlContent) {
    var fs = require("fs");
    fs.writeFile('./' + language + '/' + fileName + '.html', htmlContent, function(err) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Data written successfully!");
        }
    });
}
