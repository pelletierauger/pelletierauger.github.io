var fs = require("fs");
var filenameFormatter = require('./formatters/filename-formatter.js');
var verbose = true;

let head = `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Guillaume Pelletier-Auger</title>
    <link>https://pelletierauger.github.io/en/blog/</link>
    <description>Art and music made with code.</description>
    <language>en-us</language>
    <atom:link href="https://pelletierauger.github.io/en/blog/feed.rss" rel="self" type="application/rss+xml" />`;
let footer = `
    </channel>
</rss>`;

let blog = require('./blog/blog.js');

let feed = ``;
for (let i = 0; i < blog.posts.length; i++) {
    let post = seekPage(blog.posts[i], './blog/posts/');
    var date = new Date(Date.UTC(post.date.year, post.date.month - 1, post.date.day, 23, 59, 59));
    console.log(date);
    var day = date.toLocaleString('en-US', { weekday: 'long' });
    day = day[0] + day[1] + day[2];
    console.log(day);
    var monthName = date.toLocaleString('en-US', { month: 'long' });
    monthName = monthName[0] + monthName[1] + monthName[2];
    var blogPrefix = post.date.year + "/" + post.date.month + "/";
    var filenameIndividual = filenameFormatter(post.en.title);
    var linkIndividual = blogPrefix + filenameIndividual;
    let item = `
        <item>
            <title>${post.en.title}</title>
            <description>${post.en.description.replace(/<[^>]*>?/gm, '')}</description>
            <pubDate>${day}, ${post.date.day} ${monthName} ${post.date.year} 23:59:59 EST</pubDate>
            <link>https://pelletierauger.github.io/en/blog/${linkIndividual}.html</link>
            <guid isPermaLink="true">https://pelletierauger.github.io/en/blog/${linkIndividual}.html</guid>
            <source url="https://pelletierauger.github.io/en/blog/feed.rss">Guillaume Pelletier-Auger - Blog</source>
        </item>`;
    feed += item;
}
console.log(head + feed + footer);

fs.writeFile('./en/blog/feed.rss', head + feed + end, function(err) {
    if (err) {
        return console.error(err);
    } else {
        verbalize('./en/blog/feed.rss written successfully.');
    }
});

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

function verbalize(message) {
    if (verbose) {
        console.log(message);
    }
}