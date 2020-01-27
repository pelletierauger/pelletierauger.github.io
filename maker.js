//First, we get the list of all the pages we need to make, in order, in pages.list, and
//we also get all the pages that are defined inside the pages.js module, in pages.pages.
var pages = require("./pages/pages.js");
var filenameFormatter = require('./formatters/filename-formatter.js');
var codeFormatter = require('./formatters/code-formatter.js');
var fs = require("fs");
var mathFormatter = require('./formatters/math-formatter.js');
var dateFormatter = require("./formatters/date-formatter.js");
mathFormatter.start();
var verbose = (process.argv[2] == "-v") ? true : false;

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

makePage(seekPage("about", "./pages/"), "fr", 1, false);
makePage(seekPage("about", "./pages/"), "en", 1, false);

makeFolder("./en/projects");
makeFolder("./fr/projets");

for (var i = 0; i < pages.list.length; i++) {
    let page = seekPage(pages.list[i], "./pages/");
    if (!page.link && page.en.title != "About") {
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

    var rssFeedName = (language == "fr") ? "Flux RSS" : "RSS Feed";
    var rssFeedLink = `
    <div id="rss-link">
        <a href="https://pelletierauger.com/${language}/blog/rss.xml">${rssFeedName}</a>
    </div>
    `;

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
        var oppositeLang = (language == "fr") ? "en" : "fr";
        var page = {
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
            blogNameLanguage = `
            <div id="blog-page-number">
                <h2>Page ${(k + 1)}</h2>
            </div>`;
        }
        var content = `${blogNameLanguage}`;
        content += `<div class="blog-posts">`;
        var postsOnThisPage = Math.min(postsToPrint, blog.config.itemsPerPage);
        var scripts = [];
        var styles = [];
        //This runs once for every blog post to build
        for (var l = 0; l < postsOnThisPage; l++) {
            // var post = require('./blog/posts/' + blog.posts[currentPost]);
            var post = seekPage(blog.posts[currentPost], './blog/posts/');
            // console.log("How many times?");
            if (post.sketch) {
                // console.log("Sketch!" + post.sketch);
                for (let i = 0; i < post.sketch.length; i++) {
                    scripts.push(post.sketch[i]);
                }
            }
            if (post.style) {
                styles.push(post.style);
            }
            // console.log(post.date);
            var date = dateFormatter(post.date, language);

            //We start to build the individual page
            var blogPrefix = parent + post.date.year + "/" + post.date.month + "/";
            var oppositePrefix = oppositeParent + post.date.year + "/" + post.date.month + "/";
            var filenameIndividual = filenameFormatter(post[language].title);
            var linkIndividual = blogPrefix + filenameIndividual;

            //We create the content of a post within the blog
            let title = post[language].HTMLTitle || post[language].title;
            let description = (post[language].description) ? `<div class="description">
                    ${post[language].description}
            </div>` : "";

            //We decide on what excerpt to display within the blog
            let languageJump = (language == "fr") ? "Continuer à lire…" : "Read more…";
            let blogPostContent;
            if (post[language].content.match(/<!-- read-more -->/)) {
                // console.log(post[language].title + " has an excerpt to be extracted!");
                blogPostContent = post[language].content.match(/([\S\s]*?)(<!-- read-more -->)/)[1];
                blogPostContent = `${blogPostContent}
                <div class="languageJump">
                    <a href="../${linkIndividual}.html">${languageJump}</a>
                </div>
               `;
            } else {
                blogPostContent = (post[language].excerpt) ?
                    `${post[language].excerpt}
                <div class="languageJump">
                    <a href="../${linkIndividual}.html">${languageJump}</a>
                </div>
               ` : post[language].content;
            }

            content += `
            <div class="blog-post">
                <div class="blog-post-header">
                    <a href="../${linkIndividual}.html"><div class="date">${date}</div>
                    <div class="blog-title-box"><h2 class="header">${title}</h2></div>
                    ${description}</a>
                </div>
                <div class="blog-post-content">
                    ${blogPostContent}
                </div>
            </div>`;
            currentPost++;
            postsToPrint--;

            //We make the directories before making the files.
            makeFolder("./" + language + "/" + parent + post.date.year);
            makeFolder("./" + language + "/" + parent + post.date.year + "/" + post.date.month);

            //We make the file for an individual blog page
            // console.log("Individual sketch before sending :" + post.sketch);
            var individualHeader = makeHeader(post, language, stepsFromRoot + 2, post.sketch);
            var individualNavigation = makeNavigation(post, language, stepsFromRoot + 2, blogPrefix, oppositePrefix, false);
            var individualContent = individualHeader + individualNavigation;
            individualContent += `
            <article>
                <h2 class="with-date">${title}</h2>${description}
                <div class="date">${date}</div>
                ${post[language].content}
            </article>
            `;
            individualContent += rssFeedLink;
            individualContent += makeFooter(post, language);

            //Change the image links for the individual blog page
            var re = /src="..\/..\/..\//gi;
            individualContent = individualContent.replace(re, `src="../../../../`);

            makeFile(language, blogPrefix + filenameIndividual, individualContent);
        }
        content += `
        </div>`;
        // console.log("scripts before sending :" + scripts + ", " + language);
        // content += `
        // </div>`;
        content += `
        <div id = "blog-pagination">`;
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
        let paginationLink = "";
        if (k == 0 || postsToPrint == 0) {
            paginationLink = "pagination-link-single";
        } else {
            paginationLink = "pagination-link";
        }

        if (k > 0) {
            var prevLink;
            if (k == 1) {
                prevLink = "./";
            } else {
                prevLink = `./page-${k}.html`;
            }
            content += `
            <div class="${paginationLink}">
                <a href="${prevLink}">
                ${pagination[language].prev}
                </a>
            </div>
            `;
        }
        if (postsToPrint > 0) {
            content += `
            <div class="${paginationLink}">
                <a href="./page-${k+2}.html">
                ${pagination[language].next}
                </a>
            </div>
            `;
        }
        content += `
        </div>`;
        content += rssFeedLink;
        page = {
            fr: {
                title: blog.config.fr.title + suffix,
                content: content
            },
            en: {
                title: blog.config.en.title + suffix,
                content: content
            },
            style: styles
        };
        var header = makeHeader(page, language, stepsFromRoot, scripts);
        var footer = makeFooter(page, language);
        var fileName = (k == 0) ? "index" : "page-" + (k + 1);
        makeFile(language, parent + fileName, header + navigation + content + footer);
    }
}

function makePage(page, language, stepsFromRoot, parent, oppositeParent) {
    parent = parent || "";
    // page = require('./pages/' + page);
    var fileName = filenameFormatter(page[language].title);
    var header = makeHeader(page, language, stepsFromRoot, page.sketch);
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

    var introduction;
    if (language == "fr") {
        introduction = `
        <p class="introduction">
        <span class="drop-caps">B</span><span class="small-caps">onjour !</span>
        Je suis un artiste et un cinéaste d&rsquo;animation vivant à Montréal, Canada. J&rsquo;expérimente avec les
        mathématiques à l&rsquo;aide de logiciels en code source libre.
        </p>
    `;
    } else {
        introduction = `
        <p class="introduction">
        <span class="drop-caps">H</span><span class="small-caps">ello !</span>
        I&rsquo;m an artist and animation filmmaker living in Montréal, Canada. 
        I create mathematical and algorithmic art using open source software.
        </p>
    `;
    }
    introduction = "";
    var mosaic = `${introduction}<div class="mosaic">`;
    for (var i = 0; i < pages.list.length; i++) {
        let page = seekPage(pages.list[i], "./pages/");
        //We exclude the "About" page from building an element in the mosaic.
        if (page["en"].title == "About") {
            continue;
        }

        let title = page[language].HTMLTitle || page[language].title;
        var filename = filenameFormatter(page[language].title);
        var thumbnailName = pages.list[i];
        var description = page[language].description;
        var link = (page[language].link || page.link || innerLink + filename + ".html");

        var itemDiv = `
        <div class="portfolio-item">
            <a href="${link}">
            <div class="thumbnail">
                <img src="${navPrefix}images/thumbnails/${thumbnailName}.jpg">
            </div>
            <div class="portfolio-banner">
                <div class="portfolio-description">
                    <h2>${title}</h2> 
                    ${description}
                </div>
            </div>
            </a>
        </div>
        `;

        mosaic = mosaic + itemDiv;
    }
    mosaic = mosaic + `</div>`;
    // mosaic = `${mosaic}
    // <div id="ornament-003">
    //     <img src="${navPrefix}style/ornaments/terminal-ornament-003.png">
    // </div>
    // `;
    return mosaic;
}

function makeHeader(page, language, stepsFromRoot, sketches) {
    //If its a page and it has content, test the content with this regular expression.
    //If there is code embedded in the HTML content,
    //add the code.css stylesheet to the head of the HTML file.
    //Also, the font Inconsolata gets added to the head if there is embedded code.
    var prefixToRoot = "";
    for (var i = 0; i < stepsFromRoot; i++) {
        prefixToRoot += "../";
    }
    // console.log(page);
    var codeCSS = "";
    var codeFont = "";
    if (page && page[language].content) {
        var r = /(<code>|<code class="supercollider">|<code class="glsl">|<code class="nosyntax">)([\S\s]*?)(<\/code>)/g;
        var inlineCodeTest = /(<span class="inline-code8">)([\S\s]*?)(<\/span>)/g;
        if (page[language].content.match(inlineCodeTest)) {
            codeFont = "Inconsolata:400,700|";
        }
        if (page[language].content.match(r)) {
            codeCSS = `<link href="${prefixToRoot}style/code.css" rel="stylesheet" type="text/css">`;
            if (!codeFont) {
                codeFont = "Inconsolata|";
            }
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

    let style = ``;
    if (page && page.style) {
        for (let i = 0; i < page.style.length; i++) {
            style += `
        <link href="${prefix}style/${page.style[i]}.css" rel="stylesheet" type="text/css">
        `;
        }
    }

    var scripts = ``;
    if (sketches && sketches.length > 0) {
        scripts += `
        <script src="${prefix}libraries/p5.min.js" type="text/javascript"></script>
        `;
        scripts += `<script src="${prefix}libraries/p5.dom.min.js" type="text/javascript"></script>
        `;
        for (let i = 0; i < sketches.length; i++) {
            scripts += `<script src="${prefix}sketches`;
            scripts += sketches[i];
            scripts += `" type="text/javascript"></script>
        `;
        }
    }
    // console.log(scripts);
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Guillaume Pelletier-Auger${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=4, user-scalable=yes" />${scripts}
        <link href="${prefix}style/style.css" rel="stylesheet" type="text/css">${style}
        <link href="https://fonts.googleapis.com/css?family=${codeFont}EB+Garamond" rel="stylesheet">
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
    var nav3 = (language == "fr") ? "Fr &#8594; En" : "En &#8594; Fr";

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

    return `<body>
    <nav>
        <h1><a href="${titleLink}">Guillaume <span class="nobreak">Pelletier-Auger</span></a></h1>
        <ul>
            ${liProjects}<a href="${titleLink}">${nav1}</a></li>
            ${liBlog}<a href="${prefix}${language}/${navBlog}/">${nav15}</a></li>
            ${liAbout}<a href="${prefix}${language}/${navAbout}.html">${nav2}</a></li>
            <li><a href="${prefix}${oppositeLanguage}${navLang}">${nav3}</a></li>
        </ul>
    </nav>
    `;
}

function makeContent(page, language) {
    if (page.en.title == "About") {
        return `
        <article>
            ${page[language].content}
        </article>`;
    } else {
        let title = page[language].HTMLTitle || page[language].title;
        let description = `
        <div class="description">
            ${page[language].description}
        </div>
        ` || "";
        if (page[language].date) {
            return `
            <article>
                <h2 class="with-date">${title}</h2>${description}
                <div class="date">${page[language].date}</div>
                ${page[language].content}
            </article>`;
        } else {
            return `
            <article>
                <h2>${title}</h2>${description}
                ${page[language].content}
            <article>`;
        }
    }
}

function makeFooter(language) {
    return `<div id="footer">Guillaume Pelletier-Auger &mdash; 2016-2020
    </div>
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
        verbalize(fileName + " contains math.");
        mathFormatter.typeset(language, fileName, htmlContent, verbose);
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
                verbalize(prefix + fileName + '.html written successfully.');
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
        verbalize("Make folder : " + folder);
    }
}

function verbalize(message) {
    if (verbose) {
        console.log(message);
    }
}

function seekPage(name, folder) {
    let page;

    if (folder == './blog/posts/') {
        // We are seeking a blog post
        // All blog posts are defined with the HTML template
        if (fs.existsSync(folder + name + ".html")) {
            page = parseHTMLTemplate(folder + name + ".html");
            return page;
        }
    }

    //First, we test if the page is not simply defined in the pages.js file.
    if (pages.pages[name]) {
        page = pages.pages[name];
        //Else, we check if an .html version of the wanted page exists.
    } else if (fs.existsSync(folder + name + ".html")) {
        //If this condition is met, we parse the HTML file.
        page = parseHTMLTemplate(folder + name + ".html");
        //If this condition fails too, then we simply have a page defined in the "traditional" way.
        //Inside a .js template.
    } else {
        page = require(folder + name);
    }
    return page;
}

function parseHTMLTemplate(s) {
    let page = {
        fr: {},
        en: {}
    };
    var data = fs.readFileSync(s, { encoding: "utf8" });

    let year = data.match(/(<!-- year -->)([\S\s]*?)(<!--)/);
    if (year) {
        let month = data.match(/(<!-- month -->)([\S\s]*?)(<!--)/);
        let day = data.match(/(<!-- day -->)([\S\s]*?)(<!--)/);
        page.date = {
            year: parseInt(year[2]),
            month: parseInt(month[2]),
            day: parseInt(day[2])
        };
        // console.log(page.date);
    }

    let style = data.match(/(<!-- style -->)([\S\s]*?)([\n\r])/);
    if (style) {
        page.style = [style[2]];
    }

    let sketches = data.match(/(<!-- sketch -->)([\S\s]*?)(<!--)/);
    if (sketches) {
        let sketchesToCatch = [];
        let runThroughSketches = data.replace(/(<!-- sketch -->)([\S\s]*?)([\n\r])/g, function(a, b, c) {
            // console.log("A catch!!!");
            sketchesToCatch.push(c);
        });
        page.sketch = sketchesToCatch;
        // console.log(sketchesToCatch);
    }

    page.fr.title = data.match(/(<!-- fr-title -->)([\S\s]*?)(<!--)/)[2];
    page.fr.title = page.fr.title.replace(/(?:\r\n|\r|\n)/g, "");

    // page.fr.description = data.match(/(<!-- fr-description -->)([\S\s]*?)(<!--)/)[2];
    let frDescription = data.match(/(<!-- fr-description -->)([\S\s]*?)(<!--)/);
    if (frDescription) {
        page.fr.description = frDescription[2];
        page.fr.description = page.fr.description.replace(/([a-zA-ZÀ-ú])(\')([a-zA-ZÀ-ú])/g, function(a, b, c, d) {
            return "" + b + "&rsquo;" + d;
        });
    }

    let frExcerpt = data.match(/(<!-- fr-excerpt -->)([\S\s]*?)(<!--)/);
    if (frExcerpt) {
        page.fr.excerpt = frExcerpt[2];
        page.fr.excerpt = page.fr.excerpt.replace(/([a-zA-ZÀ-ú])(\')([a-zA-ZÀ-ú])/g, function(a, b, c, d) {
            return "" + b + "&rsquo;" + d;
        });
    }

    page.fr.content = data.match(/(<!-- fr-content -->)([\S\s]*?)(<!-- en-)/)[2];
    page.fr.content = page.fr.content.replace(/([a-zA-ZÀ-ú])(\')([a-zA-ZÀ-ú])/g, function(a, b, c, d) {
        return "" + b + "&rsquo;" + d;
    });

    // Add a non-breaking space after French opening quotes and before French closing quotes.
    page.fr.content = page.fr.content.replace(/([a-zA-ZÀ-ú\.\?])(\s?)(»)/g, function(a, b, c, d) {
        return "" + b + "&nbsp;" + d;
    });
    page.fr.content = page.fr.content.replace(/(«)(\s?)([a-zA-ZÀ-ú])/g, function(a, b, c, d) {
        return "" + b + "&nbsp;" + d;
    });

    page.fr.content = page.fr.content.replace(/<i>/g, `<span class="italic">`);
    page.fr.content = page.fr.content.replace(/<\/i>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<i8>/g, `<span class="italic8">`);
    page.fr.content = page.fr.content.replace(/<\/i8>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<ic8>/g, `<span class="inline-code8">`);
    page.fr.content = page.fr.content.replace(/<\/ic8>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<dc>/g, `<span class="drop-caps">`);
    page.fr.content = page.fr.content.replace(/<\/dc>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<sc>/g, `<span class="small-caps">`);
    page.fr.content = page.fr.content.replace(/<\/sc>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<sc8>/g, `<span class="small-caps8">`);
    page.fr.content = page.fr.content.replace(/<\/sc8>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<math>/g, String.raw `<div class="math">\[`);
    page.fr.content = page.fr.content.replace(/<\/math>/g, String.raw `\]</div>`);
    page.fr.content = page.fr.content.replace(/<im>/g, String.raw `\(`);
    page.fr.content = page.fr.content.replace(/<\/im>/g, String.raw `\)`);

    // Put a non-breaking space between any letter followed immediately by an exclamation point
    // or an interrogation mark. (There can also be a space between the letter and the punctuation.)
    page.fr.content = page.fr.content.replace(/([a-zA-ZÀ-ú])(\s?)([\?\!])/g, function(a, b, c, d) {
        return "" + b + "&nbsp;" + d;
    });
    // page.fr.content = page.fr.content.replace(/([a-zA-ZÀ-ú])(\s)([:;])/g, function(a, b, c, d) {
    //     return "" + b + "&nbsp;" + d;
    // });

    // Replace the snl and snr pseudo-HTML tags (used for sidenotes)
    page.fr.content = page.fr.content.replace(/&nbsn;/g, String.raw `<span class="nobreak">`);

    // page.fr.content = page.fr.content.replace(/(\s)(?!span)([0-9a-zA-ZÀ-ú\.<>":;&\/\?\-=]+?|<span\sclass=)(<sn[lr])/g, function(a, b, c, d) {
    //     console.log(page.fr.title + "--->b" + b + "--->c" + c + "--->d" + d);
    //     return b + '<span class="nobreak">' + c + d;
    // });
    page.fr.content = page.fr.content.replace(/(<sn)([lr])( label=")([0-9a-zA-ZÀ-ú\-]*)(">)/g, function(a, b, c, d, e) {
        let typeOfSidenote = (c == "l") ? "sidenote-left" : "sidenote";
        let response = `
        <label for="${e}" class="margin-toggle sidenote-number">
        </label></span>
        <input type="checkbox" id="${e}" class="margin-toggle"/>
        <span class="${typeOfSidenote}">`;
        return response;
    });
    page.fr.content = page.fr.content.replace(/<\/sn[lr]>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/(<mn)([lr])( label=")([0-9a-zA-ZÀ-ú\-]*)(">)/g, function(a, b, c, d, e) {
        let typeOfMarginnote = (c == "l") ? "marginnote-left" : "marginnote";
        let response = `
        <label for="${e}" class="margin-toggle">&mdash;
        </label>
        <input type="checkbox" id="${e}" class="margin-toggle" />
        <span class="${typeOfMarginnote}">`;
        return response;
    });
    page.fr.content = page.fr.content.replace(/<\/mn[lr]>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<\/a>,/g,
        String.raw `</a><span class="cleardescenders">,</span>`);

    page.fr.content = page.fr.content.replace(/<li>\s\s+/g, "<li>");

    let frDate = data.match(/(<!-- fr-date -->)([\S\s]*?)(<!--)/);
    if (frDate) {
        page.fr.date = frDate[2];
    }
    let frHTMLTitle = data.match(/(<!-- fr-html-title -->)([\S\s]*?)(<!--)/);
    if (frHTMLTitle) {
        page.fr.HTMLTitle = frHTMLTitle[2];
    }

    page.fr.content = page.fr.content.replace(/<code>/g, `<pre><code>`);
    page.fr.content = page.fr.content.replace(/<\/code>/g, `</code></pre>`);

    page.fr.content = page.fr.content.replace(/<javascript>/g, `<pre><code>`);
    page.fr.content = page.fr.content.replace(/<\/javascript>/g, `</code></pre>`);

    page.fr.content = page.fr.content.replace(/<glsl>/g, `<pre><code class="glsl">`);
    page.fr.content = page.fr.content.replace(/<\/glsl>/g, `</code></pre>`);

    page.fr.content = page.fr.content.replace(/<supercollider>/g, `<pre><code class="supercollider">`);
    page.fr.content = page.fr.content.replace(/<\/supercollider>/g, `</code></pre>`);

    page.fr.content = page.fr.content.replace(/<nosyntax>/g, `<pre><code class="nosyntax">`);
    page.fr.content = page.fr.content.replace(/<\/nosyntax>/g, `</code></pre>`);

    page.fr.content = page.fr.content.replace(/<pre>/g, `<div class="codebox"><pre>`);
    page.fr.content = page.fr.content.replace(/<\/pre>/g, `</pre></div>`);
    page.fr.content = page.fr.content.replace(/<ic>/g, `<span class="inline-code">`);
    page.fr.content = page.fr.content.replace(/<\/ic>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/\\'/g, `'`);
    page.fr.content = page.fr.content.replace(/\\!/g, `!`);
    page.fr.content = page.fr.content.replace(/\\\?/g, `?`);
    page.fr.content = page.fr.content.replace(/<li>/g, `<li>&mdash;&nbsp;&nbsp;`);
    page.fr.content = page.fr.content.replace(/\s:/g, `&nbsp;:`);
    page.fr.content = page.fr.content.replace(/\s;/g, `&nbsp;;`);
    page.fr.content = page.fr.content.replace(/<lnum>/g, `<span class="lnum">`);
    page.fr.content = page.fr.content.replace(/<\/lnum>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<nb>/g, `<span class="nobreak">`);
    page.fr.content = page.fr.content.replace(/<\/nb>/g, `</span>`);
    page.fr.content = page.fr.content.replace(/<pn>/g, `<p class="noindent">`);
    page.fr.content = page.fr.content.replace(/<\/pn>/g, `</p>`);
    page.fr.content = page.fr.content.replace(/(<code>)(\s)([a-zA-ZÀ-ú\d])/g,
        function(m, a, b, c) {
            return (a + c);
        });

    page.en.title = data.match(/(<!-- en-title -->)([\S\s]*?)(<!--)/)[2];
    page.en.title = page.en.title.replace(/(?:\r\n|\r|\n)/g, "");
    // page.en.description = data.match(/(<!-- en-description -->)([\S\s]*?)(<!--)/)[2];
    // page.en.description = page.en.description.replace(/([a-zA-ZÀ-ú])(\')([a-zA-ZÀ-ú])/g, function(a, b, c, d) {
    //     return "" + b + "&rsquo;" + d
    // });
    let enDescription = data.match(/(<!-- en-description -->)([\S\s]*?)(<!--)/);
    if (enDescription) {
        page.en.description = enDescription[2];
        page.en.description = page.en.description.replace(/([a-zA-ZÀ-ú])(\')([a-zA-ZÀ-ú])/g, function(a, b, c, d) {
            return "" + b + "&rsquo;" + d
        });
    }

    let enExcerpt = data.match(/(<!-- en-excerpt -->)([\S\s]*?)(<!--)/);
    if (enExcerpt) {
        page.en.excerpt = enExcerpt[2];
        page.en.excerpt = page.en.excerpt.replace(/([a-zA-ZÀ-ú])(\')([a-zA-ZÀ-ú])/g, function(a, b, c, d) {
            return "" + b + "&rsquo;" + d;
        });
    }

    page.en.content = data.match(/(<!-- en-content -->)([\S\s]*)/)[2];
    page.en.content = page.en.content.replace(/([a-zA-ZÀ-ú])(\')([a-zA-ZÀ-ú])/g, function(a, b, c, d) {
        return "" + b + "&rsquo;" + d
    });
    page.en.content = page.en.content.replace(/<i>/g, `<span class="italic">`);
    page.en.content = page.en.content.replace(/<\/i>/g, `</span>`);
    page.en.content = page.en.content.replace(/<i8>/g, `<span class="italic8">`);
    page.en.content = page.en.content.replace(/<\/i8>/g, `</span>`);
    page.en.content = page.en.content.replace(/<ic8>/g, `<span class="inline-code8">`);
    page.en.content = page.en.content.replace(/<\/ic8>/g, `</span>`);
    page.en.content = page.en.content.replace(/<dc>/g, `<span class="drop-caps">`);
    page.en.content = page.en.content.replace(/<\/dc>/g, `</span>`);
    page.en.content = page.en.content.replace(/<sc>/g, `<span class="small-caps">`);
    page.en.content = page.en.content.replace(/<\/sc>/g, `</span>`);
    page.en.content = page.en.content.replace(/<sc8>/g, `<span class="small-caps8">`);
    page.en.content = page.en.content.replace(/<\/sc8>/g, `</span>`);
    page.en.content = page.en.content.replace(/<math>/g, String.raw `<div class="math">\[`);
    page.en.content = page.en.content.replace(/<\/math>/g, String.raw `\]</div>`);
    page.en.content = page.en.content.replace(/<im>/g, String.raw `\(`);
    page.en.content = page.en.content.replace(/<\/im>/g, String.raw `\)`);
    // Put a non-breaking space between any letter followed immediately by an exclamation point
    // or an interrogation mark. (There can also be a space between the letter and the punctuation.)
    // page.en.content = page.en.content.replace(/([a-zA-ZÀ-ú])( *[\?\!])/g, function(a, b, c, d) {
    //     return "" + b + "&nbsp;" + c;
    // });

    // Replace the snl and snr pseudo-HTML tags (used for sidenotes)
    page.en.content = page.en.content.replace(/&nbsn;/g, String.raw `<span class="nobreak">`);
    // page.en.content = page.en.content.replace(/(\s)([0-9a-zA-ZÀ-ú\.<>":;&\/\?]*)(<sn[lr])/g, function(a, b, c, d) {
    //     console.log(page.en.title + ", " + b + c + d);
    //     return b + '<span class="nobreak">' + c + d;
    // });
    page.en.content = page.en.content.replace(/(<sn)([lr])( label=")([0-9a-zA-ZÀ-ú\-]*)(">)/g, function(a, b, c, d, e) {
        let typeOfSidenote = (c == "l") ? "sidenote-left" : "sidenote";
        let response = `
        <label for="${e}" class="margin-toggle sidenote-number"></label></span>
        <input type="checkbox" id="${e}" class="margin-toggle"/>
        <span class="${typeOfSidenote}">`;
        return response;
    });
    page.en.content = page.en.content.replace(/<\/sn[lr]>/g, `</span>`);
    page.en.content = page.en.content.replace(/(<mn)([lr])( label=")([0-9a-zA-ZÀ-ú\-]*)(">)/g, function(a, b, c, d, e) {
        let typeOfMarginnote = (c == "l") ? "marginnote-left" : "marginnote";
        let response = `
        <label for="${e}" class="margin-toggle">&mdash;
        </label>
        <input type="checkbox" id="${e}" class="margin-toggle" />
        <span class="${typeOfMarginnote}">`;
        return response;
    });
    page.en.content = page.en.content.replace(/<\/mn[lr]>/g, `</span>`);

    page.en.content = page.en.content.replace(/<\/a>,/g,
        String.raw `</a><span class="cleardescenders">,</span>`);

    page.en.content = page.en.content.replace(/<li>\s\s+/g, "<li>");

    let enDate = data.match(/(<!-- en-date -->)([\S\s]*?)(<!--)/);
    if (enDate) {
        page.en.date = enDate[2];
    }
    let enHTMLTitle = data.match(/(<!-- en-html-title -->)([\S\s]*?)(<!--)/);
    if (enHTMLTitle) {
        page.en.HTMLTitle = enHTMLTitle[2];
    }

    page.en.content = page.en.content.replace(/<code>/g, `<pre><code>`);
    page.en.content = page.en.content.replace(/<\/code>/g, `</code></pre>`);

    page.en.content = page.en.content.replace(/<javascript>/g, `<pre><code>`);
    page.en.content = page.en.content.replace(/<\/javascript>/g, `</code></pre>`);

    page.en.content = page.en.content.replace(/<glsl>/g, `<pre><code class="glsl">`);
    page.en.content = page.en.content.replace(/<\/glsl>/g, `</code></pre>`);

    page.en.content = page.en.content.replace(/<supercollider>/g, `<pre><code class="supercollider">`);
    page.en.content = page.en.content.replace(/<\/supercollider>/g, `</code></pre>`);

    page.en.content = page.en.content.replace(/<nosyntax>/g, `<pre><code class="nosyntax">`);
    page.en.content = page.en.content.replace(/<\/nosyntax>/g, `</code></pre>`);

    page.en.content = page.en.content.replace(/<pre>/g, `<div class="codebox"><pre>`);
    page.en.content = page.en.content.replace(/<\/pre>/g, `</pre></div>`);
    page.en.content = page.en.content.replace(/<ic>/g, `<span class="inline-code">`);
    page.en.content = page.en.content.replace(/<\/ic>/g, `</span>`);
    page.en.content = page.en.content.replace(/\\'/g, `'`);
    page.en.content = page.en.content.replace(/\\!/g, `!`);
    page.en.content = page.en.content.replace(/\\\?/g, `?`);
    page.en.content = page.en.content.replace(/<li>/g, `<li>&mdash;&nbsp;&nbsp;`);
    page.en.content = page.en.content.replace(/<lnum>/g, `<span class="lnum">`);
    page.en.content = page.en.content.replace(/<\/lnum>/g, `</span>`);
    page.en.content = page.en.content.replace(/<nb>/g, `<span class="nobreak">`);
    page.en.content = page.en.content.replace(/<\/nb>/g, `</span>`);
    page.en.content = page.en.content.replace(/<pn>/g, `<p class="noindent">`);
    page.en.content = page.en.content.replace(/<\/pn>/g, `</p>`);
    page.en.content = page.en.content.replace(/(<code>)(\s)([a-zA-ZÀ-ú\d])/g,
        function(m, a, b, c) {
            return (a + c);
        });
    return page;
}