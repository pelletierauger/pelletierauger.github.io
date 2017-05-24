exports.date = {
    year: 2017,
    month: 5,
    day: 23
};

var images = `
    <img src="../../../images/truchet/truchet001.jpg">
    <img src="../../../images/truchet/truchet002.jpg">
    <img src="../../../images/truchet/truchet003.jpg">
    <img src="../../../images/truchet/truchet004.jpg">
    <img src="../../../images/truchet/truchet005.jpg">
    <img src="../../../images/truchet/truchet006.jpg">
    <img src="../../../images/truchet/truchet007.jpg">
    <img src="../../../images/truchet/truchet008.jpg">
    <img src="../../../images/truchet/truchet009.jpg">
    <img src="../../../images/truchet/truchet010.jpg">
    <img src="../../../images/truchet/truchet011.jpg">
`;

exports.fr = {
    title: "Pavages de Truchet générés aléatoirement",
    content: `
    <p>
        Ces images ont été réalisées grâce à un générateur de pavages écrit en JavaScript
        avec la bibliothèque <a href="https://p5js.org/">p5.js</a>.
    </p>
    ${images}
    `
};

exports.en = {
    title: "Randomly generated Truchet tilings",
    content: `
    <p>
        These images were made with a tiling generator written in JavaScript using the 
        <a href="https://p5js.org/">p5.js</a> library.
    </p>
    ${images}
    `
};
