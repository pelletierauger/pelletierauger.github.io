var hljs = require("highlight.js");


//The input is not JavaScript code to be formatted, it's a full HTML page to be parsed and then
//if it finds JavaScript code embedded in <pre><code>, it replaces it with formatted code.
module.exports = function(htmlContent, fileName) {

    // var r = /code"[>](.*|\n|[\s\S]*)\<\/div/g;
    var r = /(<code>)([\S\s]*?)(<\/code>)/g;

    //If there is code contained within the htmlContent
    if (htmlContent.match(r)) {
        var response = "There is code to be formatted";

        // htmlContent.replace(r, function(match, one, two, three) {
        //     // if (match) console.log(match);
        //     if (two) console.log("two : " + two);

        // });

        htmlContent = htmlContent.replace(r, function(match, one, two, three) {
            two = two.trim();
            two = two.replace(/^\s+|\s+$|\n+$/g, "");
            // console.log(two);
            var code = hljs.highlight("javascript", two);

            // code.value = code.value.replace(/([a-zA-ZÀ-ú]\d*)(\.)(\d*[a-zA-ZÀ-ú])/g, function(match, a, b, c) {
            //     return a + '<span class="hljs-punctuation">' + b + '</span>' + c;
            // });
            // code.value = code.value.replace(/^((?!hljs).)*$/g, function(match) {
            //     console.log("YEAH!");
            //     console.log(match);
            // });
            code.value = code.value.replace(/&amp;nbsp;/g, ``);
            code.value = code.value.replace(/&amp;rsquo;/g, `'`);
            code.value = code.value.replace(/([\]>a-zA-ZÀ-ú]\d*)(\.)(\d*[a-zA-ZÀ-ú])/g, function(match, a, b, c) {
                // console.log(match);
                return a + '<span class="hljs-punctuation">' + b + '</span>' + c;
            });
            code.value = code.value.replace(/ = /g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/ \!= /g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/\s\|\|\s/g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/\s&amp;&amp;\s/g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/ [:\?\*\/] /g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/ &lt; /g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/\s&lt;=\s/g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/ &gt; /g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/\s&gt;=\s/g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/\s===\s/g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/\+=|-=|\*=|\/=|==/g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            // code.value = code.value.replace(/\s>=\s/g, function(match) {
            //     return '<span class="hljs-punctuation">' + match + '</span>';
            // });
            code.value = code.value.replace(/\+\+/g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/ \+ /g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/ - /g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/\!/g, function(match) {
                return '<span class="hljs-punctuation">' + match + '</span>';
            });
            code.value = code.value.replace(/([ \(>])(-)([a-zA-ZÀ-ú\(])/g, function(match, a, b, c) {
                return a + '<span class="hljs-punctuation">' + b + '</span>' + c;
            });
            for (var i = 0; i < 20; i++) {
                code.value = code.value.replace(
                    /(\/\/)([\(\)\[\]&;\{\}:_\?\,'\+\/\*<"=>a-zA-ZÀ-ú\d \u00a0\.\|-]*)(<span class="hljs-punctuation">)(.*?)(<\/span>)/g,
                    function(match, a, b, c, d, e) {
                        // console.log(a + b);
                        return a + b + d;
                    }
                );
            }
            // code.value = code.value.replace(
            //     /(\/\/)([<"=>a-zA-ZÀ-ú\d\s\.\|-]*)(<span class="hljs-punctuation">)(.*?)(<\/span>)/g,
            //     function(match, a, b, c, d, e) {
            //         console.log(a + b);
            //         return a + b + d;
            //     }
            // );
            // code.value = code.value.replace(
            //     /(\/\/)([<"=>a-zA-ZÀ-ú\d\s\.\|-]*|<\/span>||<span class="hljs-punctuation">)(<span class="hljs-punctuation">)(.*?)(<\/span>)/g,
            //     function(match, a, b, c, d, e) {
            //         console.log(a + b);
            //         return a + b + d;
            //     }
            // );

            // code.value = code.value.replace(
            //     new RegExp(`createCanvas|fill`, "g"),
            //     function(match) {
            //         return '<span class="hljs-p5">' + match + '</span>';
            //     });

            let p5Functions = [
                /([\s>])(atan2)(\()/g,
                /(\s)(background)(\()/g,
                /(\s)(blendMode)(\()/g,
                /([\s>])(constrain)(\()/g,
                /([\s>])(cos)(\()/g,
                /(\s)(createCanvas)(\()/g,
                /([\s>])(createVector)(\()/g,
                /([\s>])(dist)(\()/g,
                /([\s>])(draw)([\(<])/g,
                /(\s)(ellipse)(\()/g,
                /([\s>])(fill)(\()/g,
                /(\s)(frameRate)(\()/g,
                /([\s>])(keyPressed)([\(<])/g,
                /(\s)(loop)(\()/g,
                /([\s>])(map)(\()/g,
                /([\s>])(noise)(\()/g,
                /(\s)(noLoop)(\()/g,
                /(\s)(noStroke)(\()/g,
                /(\s)(pop)(\()/g,
                /([\s>])(pow)(\()/g,
                /(\s)(push)(\()/g,
                /([\s>])(random)(\()/g,
                /(\s)(rotate)(\()/g,
                /([\s>\()])(round)(\()/g,
                /(\s)(save)(\()/g,
                /([\s>])(setup)([\(<])/g,
                /([\s>])(sin)(\()/g,
                /([\s>])(sqrt)(\()/g,
                /(\s)(translate)(\()/g
            ];
            for (let i = 0; i < p5Functions.length; i++) {
                // code.value = code.value.replace(p5Functions[i], function(m, a, b, c) {
                //     return a + '<span class="hljs-p5-function">' + b + '</span>' + c;
                // });
            }
            let p5Values = [
                /([\s\(>])(windowWidth)([\(\,\)<])/g,
                /([\s\(>])(windowHeight)([\(\,\)<])/g,
                /([\s\(>])(width)([\(\,\)<])/g,
                /([\s\(>])(height)([\(\,\)<])/g,
                /([\s\(>])(PI)([\s\(\,\)<])/g,
                /([\s\(>])(TWO_PI)([\s\(\,\)<])/g,
                /([\s\(>])(keyCode)([\s\(\,\)<])/g
            ];
            for (let i = 0; i < p5Values.length; i++) {
                // code.value = code.value.replace(p5Values[i], function(m, a, b, c) {
                //     return a + '<span class="hljs-p5-value">' + b + '</span>' + c;
                // });
            }
            return one + code.value + three;
        });
        // console.log(htmlContent)

        //If there is no code contained within the htmlContent
    } else {
        var response = "No code found.";
    }



    // console.log(fileName + " : " + response);
    return htmlContent;
    // var code = hljs.highlight("javascript", input);
    // return html;
}