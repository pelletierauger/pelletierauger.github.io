//First, we get the list of all the pages we need to make, in order, in pages.list, and
//we also get all the pages that are defined inside the pages.js module, in pages.pages.
var pages = require("./pages/pages.js");
var filenameFormatter = require('./formatters/filename-formatter.js');
var codeFormatter = require('./formatters/code-formatter.js');
var fs = require("fs");
var mathFormatter = require('./formatters/math-formatter.js');
var dateFormatter = require("./formatters/date-formatter.js");
mathFormatter.start();

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

makePage(require('./pages/about'), "fr", 1, false);
makePage(require('./pages/about'), "en", 1, false);

makeFolder("./en/projects");
makeFolder("./fr/projets");

for (var i = 0; i < pages.list.length; i++) {
    var page = (pages.pages[pages.list[i]] || require('./pages/' + pages.list[i]));
    if (!page.link && page.en.title != "About") {
        // console.log(page);
        makePage(page, "en", 2, "projects/", "projets/");
        makePage(page, "fr", 2, "projets/", "projects/");
    }
}


makeFolder("./fr/blog");
makeFolder("./en/blog");
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
        // var blogNameLanguage = (language == "fr") ? "Blog" : "Blog";
        var blogNameLanguage = "";
        if (k > 0) {
            // blogNameLanguage += " - page " + (k + 1);
            blogNameLanguage = "<h2>Page " + (k + 1) + "</h2>";
        }
        var content = `
        ${blogNameLanguage}
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
            content += `<h3><a href="../${linkIndividual}.html">${post[language].title}</a></h3>`;
            content += `<div class = "date">${date}</div>`;
            content += `
            <div id="page">${post[language].content}</div>`;
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
            <h3>${post[language].title}</h3>
            <div class = "date">${date}</div>
            <div id="page">${post[language].content}</div></div>`;
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

function makePage(page, language, stepsFromRoot, parent, oppositeParent) {
    parent = parent || "";
    // page = require('./pages/' + page);
    var fileName = filenameFormatter(page[language].title);
    var header = makeHeader(page, language, stepsFromRoot);
    var navigation = makeNavigation(page, language, stepsFromRoot, parent, oppositeParent, false);
    var content = makeContent(page, language);
    var footer = makeFooter(page, language);
    // console.log(header + navigation + content + footer);
    makeFile(language, parent + fileName, header + navigation + content + footer);
}

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
                <p><span class="italic">${title}</span>, ${description}</p>
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
    //If its a page and it has content, test the content with this regular expression.
    //If there is code embedded in the HTML content,
    //add the code.css stylesheet to the head of the HTML file.
    //Also, the font Inconsolata gets added to the head if there is embedded code.
    var prefixToRoot = "";
    for (var i = 0; i < stepsFromRoot; i++) {
        prefixToRoot += "../";
    }

    var codeCSS = "";
    var codeFont = "";
    if (page && page[language].content) {
        var r = /(<code>)([\S\s]*?)(<\/code>)/g;
        if (page[language].content.match(r)) {
            codeCSS = `<link href="${prefixToRoot}code.css" rel="stylesheet" type="text/css">`;
            codeFont = "Inconsolata|";
        }
    }


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
        <link href="https://fonts.googleapis.com/css?family=${codeFont}Sorts+Mill+Goudy:400,400i" rel="stylesheet">
        ${codeCSS}
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

    var liProjects;
    var rPEN = /projects\//g;
    var rPFR = /projets\//g;
    if (page["en"].title == "index" || parent.match(rPEN) || parent.match(rPFR)) {
        liProjects = `<li class = "selected">`;
    } else {
        liProjects = "<li>";
    }

    var liBlog;
    var r = /blog\//g;
    var r2 = /blog\//g;
    if (parent.match(r) || parent.match(r2)) {
        liBlog = `<li class = "selected">`;
    } else {
        liBlog = "<li>";
    }


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

function makeContent(page, language) {
    if (page.en.title == "About") {
        return `<div id="main">
    ${page[language].content}</div>`;
    } else {
        return `<div id="main">
    <h2>${page[language].title}</h2>
    ${page[language].content}</div>`;
    }
}

function makeFooter(language) {
    return `<div id="footer">Guillaume Pelletier-Auger - 2017</div></div>
    </body>
    </html>`;
}

function makeFile(language, fileName, htmlContent, prefix) {
    //First, we test if htmlContent contains code. We formatted it if it exists.
    //We modify htmlContent with code-formatter, which is synchronous.
    htmlContent = codeFormatter(htmlContent, fileName);

    //Then, we test if htmlContent contains LaTeX math,
    //whether it is displayed mathematics or in-line mathematics.
    var r = /\\\[|\\\(/g;

    if (htmlContent.match(r)) {
        //If it does, we send the htmlContent to math-formatter.js which will write the file itself.
        //(The MathJax-node module is asynchronous, so it's much simpler if it writes the file itself.)
        console.log(fileName + " contains math.");
        mathFormatter.typeset(language, fileName, htmlContent);
    } else {


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
