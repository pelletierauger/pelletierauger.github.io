let biggerBio = `
<h2><i>Comment les choses prennent-elles leurs formes ?</i></h2>
        <p>Je suis un artiste visuel et un cinéaste d'animation vivant à Montréal, Québec, Canada.</p>
        <p>Mon travail explore divers sujets mathématiques. Je suis fasciné par les mathématiques et
        les divers procédés qui nous entourent : comment les arbres croissent et prennent leur forme,
        comment les statistiques gouvernent silencieusement nos vies, comment il nous est possible
        de construire des modèles des choses qui nous entourent afin de mieux les comprendre. 
        <i>Comment les choses prennent-elles leurs formes ?</i> est la question que je me pose 
        constamment. Qu'est-ce que la forme des choses révèle sur elles ? Comment le mouvement
        révèle-t-il la structure ? Comment la structure révèle-t-elle la génèse ? Comment la
        génèse révèle-t-elle le <span class="italic">sens</span> ?</p>

        <p>Je suis un grand anxieux et découvrir la beauté de la science m'a aidé à appréhender
        le monde et à m'approprier davantage la petite place que j'y occupe. 
        Et l'art me permet d'explorer et de communiquer ces sujets.</p>
        <p>
        J'ai d'abord étudié le film d'animation au Cégep du Vieux Montréal, puis l'illustration
        à l'Académie d'été internationale des Beaux-Arts de Salzbourg, en Autriche, et finalement
        les arts graphiques à l'Académie des Beaux-Arts de Varsovie, en Pologne.
        </p>
        <h2>Contact</h2>
        <p>N'hésitez pas à me contacter par <a href="mailto:pelletierauger@gmail.com">courriel</a>,
        sur <a href="https://twitter.com/pelletierauger">Twitter</a>
        ou sur <a href="https://github.com/pelletierauger">GitHub</a> pour des questions, 
        commentaires ou suggestions
        concernant mon travail ou les divers sujets qui y sont explorés. Il me fait toujours
        plaisir d'écouter, de discuter et de découvrir différents points de vue.</p>

        <h2>Code source libre</h2>
        <p>Les programmes que j'écris pour la création de mes œuvres sont tous distribués en code 
        source libre. Quiconque est ainsi libre de réutiliser mon travail, de le modifier, 
        d'en créer de nouvelles versions, etc.
        L'accessibilité de la culture et du savoir est une chose qui me tient à cœur, et il me
        fait plaisir de pouvoir y contribuer d'une façon modeste. Les outils que j'utilise
        pour créer sont également des logiciels libres.</p>

        <h2>Soutenir</h2>
        <p>Si vous aimez mon travail et que vous désirez m'aider à continuer, je vous invite à
        me soutenir sur la plateforme Patreon.</p>

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
        <div id="ornament-001">
        <img src="../../../style/ornaments/terminal-ornament-001.png">
        </div>
`;

exports.fr = {
    title: "À propos",
    description: "Guillaume Pelletier-Auger est un artiste.",
    content: `
        <div id="page">
        <h2>&#171; Comment les choses prennent-elles forme ? &#187;</h2>
        <p class="noindent">
        <span class="drop-caps">J</span>
        <span class="small-caps">e suis un artiste et un cinéaste d'animation</span>
            vivant à Montréal, Québec, Canada. Mon travail explore divers sujets mathématiques. Je suis fasciné par les mathématiques et
        les divers procédés qui nous entourent : comment les arbres croissent et prennent leur forme,
        comment les statistiques gouvernent silencieusement nos vies, comment il nous est possible
        de construire des modèles des choses qui nous entourent afin de mieux les comprendre. 
        <span class="italic">Comment les choses prennent-elles forme ?</span> 
        est une question que je me pose constamment. 
        Qu'est-ce que la forme des choses révèle sur elles ? Comment le mouvement
        révèle-t-il la structure ? Comment la structure révèle-t-elle la génèse ? Comment la
        génèse révèle-t-elle le <span class="italic">sens</span> ?</p>

        <p>Je suis un grand anxieux et découvrir la beauté de la science m'a aidé à appréhender
        le monde et à m'approprier davantage la petite place que j'y occupe. 
        Et l'art me permet d'explorer et de communiquer ces sujets.</p>
        <p>
        J'ai d'abord étudié le film d'animation au Cégep du Vieux Montréal, puis l'illustration
        à l'Académie d'été internationale des Beaux-Arts de Salzbourg, en Autriche, et finalement
        les arts graphiques à l'Académie des Beaux-Arts de Varsovie, en Pologne.
            </p>
            <h3>Contact</h3>
            <p class="noindent">
            <span class="drop-caps">N'</span><span class="small-caps">hésitez pas</span>
            à me contacter par <a href="mailto:pelletierauger@gmail.com">courriel</a>,
            sur <a href="https://twitter.com/pelletierauger">Twitter</a>
            ou sur <a href="https://github.com/pelletierauger">GitHub</a> pour des questions, 
            commentaires ou suggestions
            concernant mon travail ou les divers sujets qui y sont explorés. Il me fait toujours
            plaisir d'écouter, de discuter et de découvrir différents points de vue.</p>
            <h3>Ce site Web</h3>
            <p class="noindent">
            <span class="drop-caps">P</span><span class="small-caps">our réaliser ce site Web</span>,
            j'ai développé une application Node.js qui lit une
                base de données puis génère automatiquement tous les fichiers 
                <span class="small-caps">html</span>. J'ai créé
                cette application parce que je cherchais un 
                <span class="italic">générateur de site statique</span> (static site
                generator) à la fois simple et offrant quelques fonctionnalités qui me sont importantes
                (tel que la possibilité de gérer une base de données de contenu bilingue), et
                j'étais insatisfait des générateurs déjà existants.
                </p>
                <p>
                Vous pouvez voir <a href="https://github.com/pelletierauger/pelletierauger.github.io">
                le code source de cette application</a> (avec le code source de ce site Web au complet)
                sur GitHub. Le module principal est 
                <span class="inline-code">maker.js</span> et il lit les données présentes dans
                les dossiers <span class="inline-code">pages</span> et
                <span class="inline-code">blog</span>, et utilise des modules supplémentaires contenus
                dans les dossiers
                <span class="inline-code">formatters</span> et <span class="inline-code">node_modules</span>.
                Les formules mathématiques présentes sur le site ont été mises en forme avec le module
                <span class="inline-code">mathjax-node</span> et la syntaxe des boîtes de code a été
                colorée avec le module <span class="inline-code">highlight.js</span>.
                <p>La police de caractères utilisée pour le corps de ce site est 
                <span class="small-caps">Eb</span> Garamond,
                une recréation des fontes originales de Claude Garamont telles qu'utilisées
                dans un spécimen imprimé en 1592 par Konrad Berner. 
                <span class="small-caps">Eb</span> Garamond a été créée par
                Georg Duffner et est distribuée librement et gratuitement sur GitHub.
                La police utilisée pour les lettrines est <span class="ATT">ATT4425</span>,
                une recréation de la police du terminal de l'ordinateur 
                Teletype 56<span class="small-caps">d</span> 
                (modèle <span class="small-caps">at&t</span> 4425)
                datant de 1984. Elle a été développée par Seth Morabito et est distribuée librement.
                La police utilisée pour les boîtes de code est <span class="Incon">Inconsolata</span>,
                <a href="http://levin.com/type/myfonts/inconsolata.html">créée par Raph Levien</a>
                et distribuée librement avec une Open Font License.</p>
                <div id="ornament-001">
                    <img src="../../../style/ornaments/terminal-ornament-002.png">
                </div>
        </div>
    `
};

exports.en = {
    title: "About",
    description: "Guillaume Pelletier-Auger is an artist.",
    content: `
            <p class ="noindent">
                <span class="drop-caps">I'</span>
                <span class="small-caps">m an artist and animation filmmaker</span> living in Montréal, Québec, Canada.
                I first studied animation film at the Cégep du Vieux Montréal, and then took an illustration 
                course at the International Summer Academy of Fine Arts in Salzburg, Austria. I then 
                studied graphic arts at
                the Academy of Fine Arts in Warsaw, Poland, were I concentrated on illustration with professor
                Zygmunt Januszewski and animation with professor Hieronim Neumann.
            </p>
    `
}

exports.link = null;