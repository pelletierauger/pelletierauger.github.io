exports.fr = {
    title: "À propos",
    description: "Guillaume Pelletier-Auger est un artiste.",
    content: `
        <div id ="contact">
            <ul>
            <li><a href="https://github.com/pelletierauger">GitHub</a></li>
            <li><a href="https://www.instagram.com/pelletierauger/">Instagram</a></li>
            <li><a href="https://twitter.com/pelletierauger">Twitter</a></li>
            <li><a href="https://www.facebook.com/pelletierauger">Facebook</a></li>
            </ul>
        </div>
        <div id ="about">
        <p>Mes intérêts principaux sont l'art et la programmation.

        J'ai étudié l'animation au Cégep du Vieux Montréal. J'ai ensuite étudié les arts
        graphiques à l'Académie des Beaux-Arts de Varsovie, en Pologne, me concentrant
        sur l'illustration avec le professeur Zygmunt Januszewski et sur l'animation
        avec le professeur Hieronim Neumann.</p>

        <h2>Ce site Web</h2>
        <p>
            Pour réaliser ce site Web, j'ai développé un petit module Node.js qui lit une
            base de données puis génère automatiquement tous les fichiers HTML. J'ai créé
            ce module parce que je cherchais un <i>générateur de site statique</i> ("static site
            generator") avec quelques fonctionnalités qui me sont importantes (tel que
            la possibilité de gérer avec aisance une base de données de contenu bilingue), et
            j'étais insatisfait par les générateurs déjà existants.
            <br><br>
            Vous pouvez voir le code source de ce module Node.js (avec le code source de ce site
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
            <li><a href="https://github.com/pelletierauger">GitHub</a></li>
            <li><a href="https://www.instagram.com/pelletierauger/">Instagram</a></li>
            <li><a href="https://twitter.com/pelletierauger">Twitter</a></li>
            <li><a href="https://www.facebook.com/pelletierauger">Facebook</a></li>
            </ul>
        </div>
        <div id ="about">
        <p>My primary interests are art and programming.

        I studied animation at the Cégep du Vieux Montréal. I then studied graphic arts at
        the Academy of Fine Arts in Warsaw, Poland, concentrating on illustration with professor
        Zygmunt Januszewski and animation with professor Hieronim Neumann.</p>

        <h2>This website</h2>
        <p>
            To make this website, I developed a small Node.js module that reads a database
            and outputs HTML content, generating all the files automatically. 
            I created this module because I wanted a lightweight static site generator 
            with a few key features (like the possibility of easily managing a database of
            bilingual content), and I wasn't satisfied by pre-existing generators.
            <br><br>
            You can view the source code for this Node.js module here (along with the source code
            for my whole website) : <a href="https://github.com/pelletierauger/pelletierauger.github.io">
            https://github.com/pelletierauger/pelletierauger.github.io</a>
            <br><br>
            The main module is <i>maker.js</i> and it reads the data inside the <i>pages</i> folder.
        </p>
        </div>
    `
}

exports.link = null;
