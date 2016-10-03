//First, we get the list of all the pages we need to make, in order, in pages.list, and
//we also get all the pages that are defined inside the pages.js module, in pages.pages.
var pages = require("./pages/pages.js");
var filenameFormatter = require('./filename-formatter.js');

makeIndex(pages, "fr");
makeIndex(pages, "en");

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
    // console.log(fileName);
    var header = makeHeader(page, language);
    var navigation = makeNavigation(page, language);
    var content = makeContent(page, language);
    var footer = makeFooter(page, language);
    makeFile(language, fileName, header + navigation + content + footer);
}

function makeHeader(page, language) {
    if (page) {
        var title = " - " + page[language].title;
    } else {
        var title = "";
    }
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Guillaume Pelletier-Auger${title}</title>
    </head>
    `;
}

function makeNavigation(page, language) {
    //h1 must be an anchor link to index.html in the chosen language.
    var nav1 = (language == "fr") ? "Travaux" : "Works";
    var nav2 = (language == "fr") ? "À propos" : "About";
    var nav3 = (language == "fr") ? "Français" : "English";
    var oppositeLanguage = (language == "fr") ? "en" : "fr";
    var navAbout = (language == "fr") ? "a-propos" : "about";
    var navLang = (language == "fr") ? filenameFormatter(page["en"].title) : filenameFormatter(page["fr"].title);
    console.log("navLang = " + navLang);
    var navigation = `<body><h1><a href="../${language}/index.html">Guillaume Pelletier-Auger</a></h1>
    <div id="nav"><ul>
    <li><a href="../${language}/index.html">${nav1}</a></li>
    <li><a href="../${language}/${navAbout}.html">${nav2}</a></li>
    <li><a href="../${oppositeLanguage}/${navLang}.html">${nav3}</a></li>
    </ul>
    </div>
    `;
    return navigation;
}

function makeContent(page, language) {
    var content = `<div id="main">${page[language].content}</div>`;
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
    var prefix = (language) ? './' + language + '/' : "./";
    fs.writeFile(prefix + fileName + '.html', htmlContent, function(err) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Data written successfully!");
        }
    });
}

//-----------Indexes-----------------------------------------------------------------------//

function makeIndex(pages, language) {
    var header = makeHeader();
    var navigation = makeNavigation({
        fr: { title: "index" },
        en: { title: "index" }
    }, language);
    var mosaic = makeMosaic(pages, language);
    var footer = makeFooter(page, language);
    makeFile(language, "index", header + navigation + mosaic + footer);
    if (language = "en") {
        makeFile(null, "index", header + navigation + mosaic + footer);
    }
}

function makeMosaic(pages, language) {
    var mosaic = `<div class="mosaic">`;
    for (var i = 0; i < pages.list.length; i++) {
        var page = (pages.pages[pages.list[i]] || require('./pages/' + pages.list[i]));

        var title = page[language].title;
        var filename = filenameFormatter(pages.list[i]);
        var description = page[language].description;
        var link = (page.link || "./" + language + "/" + filename + ".html")

        var itemDiv = `<div class = "portfolio-item"><div class = "thumbnail">
        <a href="${link}"><img src="../images/${filename}.jpg"></a></div>
        <div class = "portfolio-description">
        <h2>${title}</h2><p>${description}</p></div>`;

        mosaic = mosaic + itemDiv;
    }
    mosaic = mosaic + `</div>`;
    return mosaic;
}


function makeMosaicBeta(pages, language) {
    //We start writing the HTML content.
    var mosaic = `<div class="mosaic">`;

    //We loop through all the files.
    for (var i = 0; i < pages.length; i++) {
        //We let "page" be the file that is currently processed.
        var page = require('./pages/' + files[i]);

        if (language == "fr") {
            var pageLang = page.fr;
        } else if (language == "en") {
            var pageLang = page.en;
        }

        //I reformat the filename using a regular expression.
        //This is done because the filenames in the "pages" folder are .js,
        //and I need .html files for the output.

        var r = /([^:\\/]*?)(?:\.([^ :\\/.]*))?$/;

        var formattedName = files[i].match(r)[1];

        //We form the full link, considering also the language argument.
        //If page.link exists, we pick it. Otherwise, we build the link.
        var link = (page.link || "./" + language + "/" + formattedName + ".html");

        //Next, we need to build the divs containing the title and description of the portfolio item.
        var title = pageLang.title;
        var description = pageLang.description;

        var itemDiv = `<div class = "portfolio-item"><div class = "thumbnail">
        <a href="${link}"><img src="../images/${formattedName}.jpg"></a></div>
        <div class = "portfolio-description">
        <h2>${title}</h2><p>${description}</p></div>`;

        mosaic = mosaic + itemDiv;
    }
    //Closing the div of the mosaic
    mosaic = mosaic + `</div>`;
    return mosaic;
}
