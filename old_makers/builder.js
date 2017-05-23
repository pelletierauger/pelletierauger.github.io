var categories = require("./pages/categories.js").categories;
var categoriesList = require("./pages/categories.js").list;
var filenameFormatter = require('./filename-formatter.js');
var fs = require("fs");
var dateFormatter = require("./date-formatter.js");

//-------Function Calls-----------------------------------------------------------------------------//

removeDirectory("./en");
removeDirectory("./fr");
makeFolder("./en");
makeFolder("./fr");

//The ID of the page
//The language of the page
//third argument is the number of steps away from root.
//fourth argument is the parent of the page.
makePage("index", "fr", 0, false);
makePage("index", "en", 1, false);

makePage("about", "fr", 1, false);
makePage("about", "en", 1, false);

makePage("contact", "fr", 1, false);
makePage("contact", "en", 1, false);

//last argument is the parent of the page in the opposite language.
makeFolder("./en/products");
makeFolder("./fr/produits");
makeProductsPage(categoriesList, categories, "fr", 2, "produits", "products");
makeProductsPage(categoriesList, categories, "en", 2, "products", "produits");

//Go through the list of all listed categories.
for (var i = 0; i < categoriesList.length; i++) {
    var current = categories[categoriesList[i]];
    var nameFr = filenameFormatter(current.fr.title);
    var nameEn = filenameFormatter(current.en.title);
    nameFr = "produits/" + nameFr + "/";
    nameEn = "products/" + nameEn + "/";
    makeFolder("./fr/" + nameFr);
    makeFolder("./en/" + nameEn);
    // console.log(nameFr);
    //For each category, build a category page.
    makeCategoryPage(current, "fr", 3, nameFr, nameEn);
    makeCategoryPage(current, "en", 3, nameEn, nameFr);

    //And then, for each page within a category, make the page.
    for (var j = 0; j < current.pages.length; j++) {
        var page = current.pages[j];
        makePage(page, "fr", 4, nameFr, nameEn);
        makePage(page, "en", 4, nameEn, nameFr);
    }
}

makeFolder("./fr/nouvelles");
makeFolder("./en/news");
makeBlog("fr");
makeBlog("en");

//-------Function Definitions----------------------------------------------------------------------//

function makeBlog(language) {
    var stepsFromRoot = 2;
    var blog = require('./blog/blog.js');
    var currentPost = 0;
    var postsToPrint = blog.posts.length;

    //Determine the amount of pages that needs to be created...
    var pagesToCreate = Math.ceil(blog.posts.length / blog.config.itemsPerPage);

    for (var k = 0; k < pagesToCreate; k++) {
        var root;
        var suffix;
        if (k == 0) {
            suffix = "";
            root = true;
        } else {
            suffix = " - Page " + (k + 1);
            root = false;
        }
        var page = {
            fr: {
                title: blog.config.fr.title + suffix
            },
            en: {
                title: blog.config.en.title + suffix
            }
        };
        var oppositeLang = (language == "fr") ? "en" : "fr";
        var header = makeHeader(page, language, stepsFromRoot, page[language].title);

        page = {
            fr: {
                title: "page-" + (k + 1)
            },
            en: {
                title: "page-" + (k + 1)
            }
        };
        var parent = filenameFormatter(blog.config[language].title) + "/";
        var oppositeParent = filenameFormatter(blog.config[oppositeLang].title) + "/";
        var navigation = makeNavigation(page, language, stepsFromRoot, parent, oppositeParent, root);
        var blogNameLanguage = (language == "fr") ? "Nouvelles" : "News";
        if (k > 0) {
            blogNameLanguage += " - page " + (k + 1);
        }
        var content = `
        <h2>${blogNameLanguage}</h2>
        <div id = "blog-wrapper">`;
        var postsOnThisPage = Math.min(postsToPrint, blog.config.itemsPerPage);

        //This runs once for every blog post to build
        for (var l = 0; l < postsOnThisPage; l++) {
            var post = require('./blog/posts/' + blog.posts[currentPost]);
            var date = dateFormatter(post.date, language);

            //We start to build the individual page
            var blogPrefix = parent + post.date.year + "/" + post.date.month + "/";
            var oppositePrefix = oppositeParent + post.date.year + "/" + post.date.month + "/";
            var filenameIndividual = filenameFormatter(post[language].title);
            var linkIndividual = blogPrefix + filenameIndividual;

            //We create the content of a post within the blog
            content += `
            <div class = blog-post>`;
            content += `<a href="../${linkIndividual}.html"><h3>${post[language].title}</h3></a>`;
            content += `<div class = "date">${date}</div>`;
            content += `
            <div class = "post-content">${post[language].content}</div>`;
            content += `
            </div>`;
            currentPost++;
            postsToPrint--;

            //We make the directories before making the files.
            makeFolder("./" + language + "/" + parent + post.date.year);
            makeFolder("./" + language + "/" + parent + post.date.year + "/" + post.date.month);

            //We make the file for an individual blog page
            var individualHeader = makeHeader(post, language, stepsFromRoot + 2);
            var individualNavigation = makeNavigation(post, language, stepsFromRoot + 2, blogPrefix, oppositePrefix, false);
            var individualContent = individualHeader + individualNavigation;
            individualContent += `<div id="main">
            <h2>${blog.config[language].title} - ${post[language].title}</h2>
            <div class = "date">${date}</div>
            ${post[language].content}</div>`;
            individualContent += makeFooter(post, language);

            //Change the image links for the individual blog page
            var re = /img src="..\/..\/..\//gi;
            individualContent = individualContent.replace(re, `img src="../../../../`);

            makeFile(language, blogPrefix + filenameIndividual, individualContent);
        }
        content += `
        </div>`;
        content += `<div id = "blog-pagination">`;
        var pagination = {
            fr: {
                prev: "Page précédente",
                next: "Page suivante"
            },
            en: {
                prev: "Previous page",
                next: "Next page"
            }
        };
        if (k > 0) {
            var prevLink;
            if (k == 1) {
                prevLink = "./";
            } else {
                prevLink = `./page-${k}.html`;
            }
            content += `
            <a href="${prevLink}">
            ${pagination[language].prev}
            </a>`;
        }
        if (postsToPrint > 0) {
            content += `
            <a href="./page-${k+2}.html">
            ${pagination[language].next}
            </a>
            `;
        }
        content += `
        </div>`;
        var footer = makeFooter(page, language);
        var fileName = (k == 0) ? "index" : "page-" + (k + 1);
        makeFile(language, parent + fileName, header + navigation + content + footer);
    }
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

function makeProductsPage(categoriesList, categories, language, stepsFromRoot, parent, oppositeParent) {
    var page = {
        fr: {
            title: "Produits",
            description: "Nos produits"
        },
        en: {
            title: "Products",
            description: "Our products"
        }
    };
    var fileName = filenameFormatter(page[language].title);
    var header = makeHeader(page, language, stepsFromRoot, parent);
    var navigation = makeNavigation(page, language, stepsFromRoot, parent, oppositeParent + "/", true);
    var content = `
    <div id="main">
    <h2>${page[language].description}</h2>
    <ul id="categories">`;
    //use the list of categories to build each link to categories mosaics
    for (var i = 0; i < categoriesList.length; i++) {
        var current = categories[categoriesList[i]];
        var categoryFileName = filenameFormatter(current[language].title);
        // content += current.fr.name;
        // content += current.fr.description;
        content += `
        <a href = "./${categoryFileName}/">
        <li>
        <h3>${current[language].title}</h3>
        <p>${current[language].description}</p>
        </li></a>`;
    }
    content += `
        </ul>
        </div>`;
    var footer = makeFooter(page, language);
    // console.log(header + navigation + content + footer);
    makeFile(language, parent + "/" + "index", header + navigation + content + footer);
}

function makeCategoryPage(page, language, stepsFromRoot, parent, oppositeParent) {
    var fileName = filenameFormatter(page[language].title);
    var header = makeHeader(page, language, stepsFromRoot, parent);
    var navigation = makeNavigation(page, language, stepsFromRoot, parent, oppositeParent, true);
    var content = `<h2>${page[language].title}</h2>`;
    content += makeMosaic(page.pages, language);
    var footer = makeFooter(page, language);

    makeFile(language, parent + "index", header + navigation + content + footer);
}

function makeMosaic(pages, language) {
    var mosaic = `<div class="mosaic">`;
    for (var i = 0; i < pages.length; i++) {
        var page = require('./pages/' + pages[i]);

        var title = page[language].title;
        var filename = filenameFormatter(page[language].title);
        var thumbnailName = pages[i];
        var description = page[language].description;
        var link = "./" + filename + ".html";

        var itemDiv = `
        
        <div class = "mosaic-item">
            <a href="${link}">
            <div class = "thumbnail">
                <img src="../../../thumbnails/${thumbnailName}.jpg">
            </div>
            <div class = "mosaic-item-description">
                <h3>${title}</h3><p>${description}</p>
            </div>
            </a>
        </div>
        `;
        mosaic = mosaic + itemDiv;
    }
    mosaic = mosaic + `</div>`;
    return mosaic;
}

function makePage(page, language, stepsFromRoot, parent, oppositeParent) {
    parent = parent || "";
    page = require('./pages/' + page);
    var fileName = filenameFormatter(page[language].title);
    if (page["en"].title == "Home") {
        fileName = "index";
    }
    var header = makeHeader(page, language, stepsFromRoot);
    var navigation = makeNavigation(page, language, stepsFromRoot, parent, oppositeParent, false);
    var content = makeContent(page, language);
    var footer = makeFooter(page, language);
    // console.log(header + navigation + content + footer);
    makeFile(language, parent + fileName, header + navigation + content + footer);
}

function makeExtraPages(language) {
    //A place to make the about page, the contact page. Perhaps some other pages?
}

//-------Generic Makers--------------------------------------------------------------//

function makeHeader(page, language, stepsFromRoot) {
    var title = (page) ? " - " + page[language].title : "";
    // if (page.fr.title == "Ébénisterie Pelletier et fils") { title = ""; }

    var prefix = "";
    if (stepsFromRoot == 0) {
        prefix = "./";
    } else if (stepsFromRoot > 0) {
        for (var i = 0; i < stepsFromRoot; i++) {
            prefix += "../";
        }
    }

    // var prefix = (root) ? "./" : "../";

    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Ébénisterie Pelletier et fils${title}</title>
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

    var nav1 = (language == "fr") ? "Produits" : "Products";
    var nav15 = (language == "fr") ? "Nouvelles" : "News";
    var nav2 = (language == "fr") ? "À propos" : "About";
    var nav3 = (language == "fr") ? "Français &#8594; English" : "English &#8594; Français";

    var liNews;
    var r = /news\//g;
    var r2 = /nouvelles\//g;
    if (parent.match(r) || parent.match(r2)) {
        // if (parent == "news/" || parent == "nouvelles/") {
        liNews = `<li class = "selected">`;
    } else {
        liNews = "<li>";
    }

    var liProducts = (page["en"].title == "Products") ? `<li class = "selected">` : "<li>";
    var liAbout = (page["en"].title == "About") ? `<li class = "selected">` : "<li>";
    var liContact = (page["en"].title == "Contact") ? `<li class = "selected">` : "<li>";

    var oppositeLanguage = (language == "fr") ? "en" : "fr";
    var navProducts = (language == "fr") ? "produits" : "products";
    var navNews = (language == "fr") ? "nouvelles" : "news";
    var navAbout = (language == "fr") ? "a-propos" : "about";
    var navContact = (language == "fr") ? "contact" : "contact";

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

    navLang = (page["en"].title == "Home") ? "" : navLang;
    //this is used if the oppositeLanguage page is the absolute root of the website.
    //this is good. Don't change this.
    var navLang0;
    if (page["en"].title == "Home" && language == "en") {
        oppositeLanguage = "";
    }
    if (page["en"].title == "Home" && language == "fr") {
        navLang = "/";
    }

    var titleLink;
    if (language == "fr") {
        titleLink = prefix;
    } else if (language == "en") {
        titleLink = prefix + "en/";
    }

    return `<body><div id="wrapper">
    <div id="nav">
    <h1><a href="${titleLink}">Ébénisterie Pelletier et fils</a></h1>
    <ul>
    ${liProducts}<a href="${prefix}${language}/${navProducts}/">${nav1}</a></li>
    ${liNews}<a href="${prefix}${language}/${navNews}/">${nav15}</a></li>
    ${liAbout}<a href="${prefix}${language}/${navAbout}.html">${nav2}</a></li>
    ${liContact}<a href="${prefix}${language}/contact.html">Contact</a></li>
    <li><a href="${prefix}${oppositeLanguage}${navLang}">${nav3}</a></li>
    </ul>
    </div>`;
}

function makeContent(page, language) {
    return `<div id="main">
    <h2>${page[language].title}</h2>
    ${page[language].content}</div>`;
}

function makeFooter(page, language) {
    return `<div id="footer">Ébénisterie Pelletier et fils - 2017</div></div>
    </body>
    </html>`;
}

function makeFile(language, fileName, htmlContent, prefix) {
    if (prefix == null) { prefix = ""; }
    if (language == "fr" && fileName == "index") {
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

console.log("End.");
