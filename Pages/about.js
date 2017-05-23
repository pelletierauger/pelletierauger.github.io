exports.fr = {
    title: "À propos",
    description: "Guillaume Pelletier-Auger est un artiste.",
    content: `
        <div id ="contact">
            <ul>
            <li><a href="https://twitter.com/pelletierauger">Twitter</a></li>
            <li><a href="mailto:pelletierauger@gmail.com">Courriel</a></li>
            <li><a href="https://github.com/pelletierauger">GitHub</a></li>
            </ul>
        </div>
        <div id ="about">
        <p>Je suis un artiste et un programmeur vivant à Montréal, Québec, Canada.<br><br>

        J'ai d'abord étudié le film d'animation au Cégep du Vieux Montréal, puis l'illustration
        à l'Académie d'été internationale des Beaux-Arts de Salzbourg, en Autriche. J'ai ensuite étudié
        les arts graphiques à l'Académie des Beaux-Arts de Varsovie, en Pologne, me concentrant
        sur l'illustration avec le professeur Zygmunt Januszewski et sur l'animation
        avec le professeur Hieronim Neumann.<br><br>

        Je travaille autant avec des médiums physiques (encre de Chine, aquarelle, acrylique) qu'avec du
        code informatique. Ce site Web présente mon art numérique, et vous pouvez découvrir mon art
        <i>traditionnel</i> sur cet autre site : <a href="http://www.gpelletier.com/">www.gpelletier.com</a>.</p>
        <h2>Ce site Web</h2>
        <p>
            Pour réaliser ce site Web, j'ai développé une petite application Node.js qui lit une
            base de données puis génère automatiquement tous les fichiers HTML. J'ai créé
            cette application parce que je cherchais un <i>générateur de site statique</i> ("static site
            generator") à la fois simple et offrant quelques fonctionnalités qui me sont importantes
            (tel que la possibilité de gérer une base de données de contenu bilingue), et
            j'étais insatisfait des générateurs déjà existants.
            <br><br>
            Vous pouvez voir le code source de cette application Node.js (avec le code source de ce site
            Web au complet) ici : <a href="https://github.com/pelletierauger/pelletierauger.github.io">
            https://github.com/pelletierauger/pelletierauger.github.io</a>
            <br><br>
            Le module principal est <i>maker.js</i> et il lit les données présentes dans
            le dossier <i>pages</i>.
        </p>
        </div>
    `
};

exports.en = {
    title: "About",
    description: "Guillaume Pelletier-Auger is an artist.",
    content: `
        <div id ="contact">
            <ul>
            <li><a href="https://twitter.com/pelletierauger">Twitter</a></li>
            <li><a href="mailto:pelletierauger@gmail.com">Email</a></li>
            <li><a href="https://github.com/pelletierauger">GitHub</a></li>
            </ul>
        </div>
        <div id ="about">
        <p>I'm an artist and programmer living in Montréal, Québec, Canada.<br><br>

        I first studied animation film at the Cégep du Vieux Montréal, and then took an illustration 
        course at the International Summer Academy of Fine Arts in Salzburg, Austria. I then 
        studied graphic arts at
        the Academy of Fine Arts in Warsaw, Poland, were I concentrated on illustration with professor
        Zygmunt Januszewski and animation with professor Hieronim Neumann.<br><br>

        I work as much with physical media (India ink, watercolors, acrylics) as I work with
        computer code. This website presents my digital art, and you can see my <i>traditional</i>
        art at this other website: <a href="http://www.gpelletier.com/">www.gpelletier.com</a>.</p>

        <h2>This website</h2>
        <p>
            To make this website, I developed a small Node.js application that reads a database
            and outputs HTML content, generating all the files automatically. 
            I created this application because I wanted a lightweight static site generator 
            with a few key features (like the possibility of easily managing a database of
            bilingual content), and I wasn't satisfied by pre-existing generators.
            <br><br>
            You can view the source code for this Node.js application here (along with the source code
            for my whole website) : <a href="https://github.com/pelletierauger/pelletierauger.github.io">
            https://github.com/pelletierauger/pelletierauger.github.io</a>
            <br><br>
            The main module is <i>maker.js</i> and it reads the data inside the <i>pages</i> folder.
        </p>
        </div>
    `
}

exports.link = null;
