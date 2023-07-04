var fs = require('fs');
var mj = require('mathjax-node/lib/mj-page.js');
var jsdom = require('mathjax-node/node_modules/jsdom').jsdom;

exports.start = function() {
    mj.start();
};

exports.typeset = function(language, fileName, htmlContent, verbose) {
    var document = jsdom(htmlContent, { features: { FetchExternalResources: false } });
    var xmlns = getXMLNS(document);
    mj.typeset({
        html: document.body.innerHTML,
        renderer: "CommonHTML",
        inputs: ["TeX"],
        xmlns: xmlns
    }, function(result) {
        // console.log(result.html);

        document.body.innerHTML = result.html;
        document.head.appendChild(document.body.firstChild);
        var HTML = "<!DOCTYPE html>\n" + document.documentElement.outerHTML.replace(/^(\n|\s)*/, "");
        // callback(HTML);
        // HTML = HTML.replace(/<article itemscope=""/g, "<article itemscope");
        // HTML = HTML.replace(/<div class="blog-post" itemscope=""/g, `<div class="blog-post" itemscope`);
        HTML = HTML.replace(/itemscope="" itemtype/g, `itemscope itemtype`);
        var prefix = (language) ? './' + language + '/' : "./";
        fs.writeFile(prefix + fileName + '.html', HTML, function(err) {
            if (err) {
                return console.error(err);
            } else {
                if (verbose) {
                    console.log(fileName + '.html written successfully with formatted maths.');
                }
            }
        });
    });
}

function getXMLNS(document) {
    var html = document.head.parentNode;
    for (var i = 0, m = html.attributes.length; i < m; i++) {
        var attr = html.attributes[i];
        if (attr.nodeName.substr(0, 6) === "xmlns:" &&
            attr.nodeValue === "http://www.w3.org/1998/Math/MathML") {
            return attr.nodeName.substr(6)
        }
    }
    return "mml";
}

let localWoffFile = `
@font-face {
        font-family: MJXc-TeX-main-R;
        src: url('../../style/fonts/MathJax-woff/MathJax_Main-Regular.woff') format('woff');
    }
`;
let localWoffFile2 = `
    @font-face {
        font-family: MJXc-TeX-math-Ix;
        src: url('../../style/fonts/MathJax-woff/MathJax_Math-Italic.woff') format('woff');
        font-style: italic
    }
`;