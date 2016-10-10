exports.fr = {
    title: "À propos",
    description: "Guillaume Pelletier-Auger est un artiste.",
    content: `<i>Guillaume</i> est une série d'images générées par une variété de fonctions itératives.
    Elles ont été créées avec p5.js.`
};

exports.en = {
    title: "About",
    description: "Guillaume Pelletier-Auger is an artist.",
    content: `

        My primary interests are art and programming.

        I studied animation and illustration.

        <h2>This website</h2>
        <p>
            To make this website, I developed a small Node.js module that reads a database
            and outputs HTML content, generating all the files automatically. 
            I created this module because I wanted a lightweight 
            and flexible Static Site Generator and I couldn't find one 
            that satisfied my taste for simplicity.

            You can view the source code for this Node.js module here (along with the source code
            for my whole website) :
            <a href="https://github.com/pelletierauger/pelletierauger.github.io">
            https://github.com/pelletierauger/pelletierauger.github.io</a>

            The main module is <i>maker.js</i> and it reads the data inside the <i>pages</i> folder.

            I'm tempted to turn this into a generalized module that could be used by other people,
            but I think this tool is mostly interesting because it has a single purpose
            (building my own website). It might be more useful to write an article about
            the concepts behind the tool to encourage others to make similar singe-purpose site
            builders. I find it exquisite to use a tool that only does what you want, 
            exactly as you want it, and nothing more. 
            Also, adding custom-made features as needed is rewarding and introduces zero bloat.
            If this lightweight site builder were to be <i>generalized</i> into a more fully-featured application,
            I think it would lose its essential simplicity immediately.
        </p>
    `
}

exports.link = null;
