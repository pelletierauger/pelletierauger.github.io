//First, we get the list of all the pages we need to make, in order, in pages.list, and
//we also get all the pages that are defined inside the pages.js module, in pages.pages.
var pages = require("./pages/pages.js");
var filenameFormatter = require('./filename-formatter.js');
var codeFormatter = require('./code-formatter.js');
var fs = require("fs");
// var mathFormatter = require('./math-formatter.js');
// mathFormatter.start();

//-------Function Calls-----------------------------------------------------------------------------//

removeDirectory("./en");
removeDirectory("./fr");
makeFolder("./en");
makeFolder("./fr");

//second argument is the prefix
//third argument is the number of steps away from root.
//fourth argument is the parent of the page.

makeIndex(pages, "en", 0);
makeIndex(pages, "fr", 1);

// makeFolder("./en/projects");
// makeFolder("./fr/projets");

// for (var i = 0; i <  pages.list.length; i++) {
//     var page = (pages.pages[pages.list[i]] || require('./pages/' + pages.list[i]));
//     if (!page.link) {
//         makePage(page, "fr");
//         makePage(page, "en");
//     }
// }

//-------Function Definitions----------------------------------------------------------------------//


function makeIndex(pages, language, stepsFromRoot) {
    var header = makeHeader(null, language, stepsFromRoot);
    var navigation = makeNavigation({
        fr: { title: "index" },
        en: { title: "index" }
    }, language, stepsFromRoot, null, null, true);
    var mosaic = makeMosaic(pages, language, stepsFromRoot);
    var footer = makeFooter(language);
    // console.log(header + navigation + mosaic + footer);
    // if (prefix == "./en/") {
    //     makeFile(null, "index", header + navigation + mosaic + footer);
    // } else {
    makeFile(language, "index", header + navigation + mosaic + footer);
    // }
}

function makeMosaic(pages, language, stepsFromRoot) {
    var innerLink = (stepsFromRoot == 0) ? "./en/projects/" : "../fr/projets/";
    var navPrefix = (stepsFromRoot == 0) ? "./" : "../";

    var mosaic = `<div class="mosaic">`;
    for (var i = 0; i < pages.list.length; i++) {
        var page = (pages.pages[pages.list[i]] || require('./pages/' + pages.list[i]));

        //We exclude the "About" page from building an element in the mosaic.
        if (page["en"].title == "About") {
            continue;
        }

        var title = page[language].title;
        var filename = filenameFormatter(page[language].title);
        var thumbnailName = pages.list[i];
        var description = page[language].description;
        var link = (page[language].link || page.link || innerLink + filename + ".html");

        var itemDiv = `
        <div class = "portfolio-item">
            <a href="${link}">
            <div class = "thumbnail">
                <img src="${navPrefix}thumbnails/${thumbnailName}.jpg">
            </div>
            <div class = "portfolio-description">
                <h2>${title}</h2><p>${description}</p>
            </div>
            </a>
        </div>
        `;

        mosaic = mosaic + itemDiv;
    }
    mosaic = mosaic + `</div>`;
    return mosaic;
}

function makeHeader(page, language, stepsFromRoot) {
    //If page exists, use its title in the HTML.
    var title = (page) ? " - " + page[language].title : "";

    var prefix = "";
    if (stepsFromRoot == 0) {
        prefix = "./";
    } else if (stepsFromRoot > 0) {
        for (var i = 0; i < stepsFromRoot; i++) {
            prefix += "../";
        }
    }
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Guillaume Pelletier-Auger${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=4, user-scalable=yes" />
        <link href="${prefix}style.css" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Sorts+Mill+Goudy:400,400i" rel="stylesheet">
    </head>`;
}

function makeNavigation(page, language, stepsFromRoot, parent, oppositeParent, root) {
    oppositeParent = oppositeParent || "";
    parent = parent || "";
    var prefix = "";
    if (stepsFromRoot == 0) {
        prefix = "./";
    } else if (stepsFromRoot > 0) {
        for (var i = 0; i < stepsFromRoot; i++) {
            prefix += "../";
        }
    }

    var nav1 = (language == "fr") ? "Projets" : "Projects";
    var nav15 = (language == "fr") ? "Blog" : "Blog";
    var nav2 = (language == "fr") ? "À propos" : "About";
    var nav3 = (language == "fr") ? "Français &#8594; English" : "English &#8594; Français";

    var liBlog;
    var r = /blog\//g;
    var r2 = /blog\//g;
    if (parent.match(r) || parent.match(r2)) {
        liBlog = `<li class = "selected">`;
    } else {
        liBlog = "<li>";
    }

    var liProjects = (page["en"].title == "index") ? `<li class = "selected">` : "<li>";
    var liAbout = (page["en"].title == "About") ? `<li class = "selected">` : "<li>";

    var oppositeLanguage = (language == "fr") ? "en" : "fr";
    var navProjects = (language == "fr") ? "projets" : "projects";
    var navBlog = (language == "fr") ? "blog" : "blog";
    var navAbout = (language == "fr") ? "a-propos" : "about";

    var navLang;
    //if the file isn't not at the root of a directory, its opposite link is its opposite name
    //and its opposite link ends with .html
    if (root == false || root == null) {
        navLang = "/";
        navLang += oppositeParent;
        navLang += (language == "fr") ? filenameFormatter(page["en"].title) : filenameFormatter(page["fr"].title);
        navLang += ".html";
    } else {
        //if it is at the root of a directory, its opposite link is its oppositeParent
        navLang = "/";
        navLang += oppositeParent;
    }

    navLang = (page["en"].title == "index") ? "" : navLang;
    //this is used if the oppositeLanguage page is the absolute root of the website.
    //this is good. Don't change this.
    if (page["en"].title == "index" && language == "en") {
        navLang = "/";
    }
    if (page["en"].title == "index" && language == "fr") {
        oppositeLanguage = "";
    }

    var titleLink;
    if (language == "en") {
        titleLink = prefix;
    } else if (language == "fr") {
        titleLink = prefix + "fr/";
    }

    return `<body><div id="wrapper">
    <div id="nav">
    <h1><a href="${titleLink}">Guillaume Pelletier-Auger</a></h1>
    <ul>
    ${liProjects}<a href="${titleLink}">${nav1}</a></li>
    ${liBlog}<a href="${prefix}${language}/${navBlog}/">${nav15}</a></li>
    ${liAbout}<a href="${prefix}${language}/${navAbout}.html">${nav2}</a></li>
    <li><a href="${prefix}${oppositeLanguage}${navLang}">${nav3}</a></li>
    </ul>
    </div>`;
}

function makeFooter(language) {
    return `<div id="footer">Guillaume Pelletier-Auger - 2017</div></div>
    </body>
    </html>`;
}

function makeFile(language, fileName, htmlContent, prefix) {
    if (prefix == null) { prefix = ""; }
    if (language == "en" && fileName == "index") {
        prefix = "./";
    } else {
        prefix = './' + language + '/' + prefix;
    }
    // console.log(prefix);
    fs.writeFile(prefix + fileName + '.html', htmlContent, function(err) {
        if (err) {
            return console.error(err);
        } else {
            console.log(prefix + fileName + '.html written successfully.');
        }
    });
}

function removeDirectory(dirPath) {
    try {
        var files = fs.readdirSync(dirPath);
    } catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                removeDirectory(filePath);
        }
    fs.rmdirSync(dirPath);
};

function makeFolder(folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
        console.log("Make folder : " + folder);
    }
}
