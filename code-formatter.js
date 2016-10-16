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
