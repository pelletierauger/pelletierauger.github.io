exports.fr = {
    title: "Les pavages de Truchet",
    date: "Hiver 2017 - En cours",
    description: `Errances dans les mathématiques françaises du <em>xvii</em><span class="superscript-half">e</span> siècle.`,
    content: String.raw `
    <div id="page">
    <div id="abstract"><div id="abstract-title">Résumé</div>
    Une exploration des pavages qui passe par mille différents
    chemins et qui se termine (pour l'instant) avec quelques images colorées 
    et une infinité d'avenues non explorées.</div>
    <img src="../../images/truchet/truchet001.jpg">
    <h3>Premiers pas vers les pavages ; le génie de Marjorie Rice</h3>
    <p class="noindent">
    <span class="drop-caps">J'</span>
    <span class="small-caps">ai démarré ce projet avec un désir vif</span> 
    mais très flou : celui de réaliser 
    une animation abstraite pour accompagner un morceau musical d'Anna Meredith. 
    La musique de Meredith m'évoque de vagues images très colorées 
    et des mouvements agités et décisifs, mais par quels procédés ces images pourraient-elles être
    construites ? À quoi <span class="italic">ressemble</span> cette musique ?</p>

    <p>J'étais depuis un moment très curieux d'explorer les pavages, un domaine
    mathématique énorme et riche, et duquel je ne connais presque rien. 
    En cherchant sur le Web différents types de pavages qui pourraient me servir
    dans un film d'animation, je suis tombé sur l'histoire de Marjorie Rice.</p>

    <p>En 1976, Rice, femme au foyer californienne et mère de cinq enfants, 
    aimait lire les chroniques mathématiques que Martin Gardner écrivait pour Scientific American. 
    Elle s'intéressait aux mathématiques et regrettait de ne pas
    avoir eu l'opportunité de poursuivre des études post-secondaires dans ce domaine. 
    Après avoir lu une chronique de Gardner sur les huit types de pavages pentagonaux qui
    étaient connus à cette époque, 
    elle s'est mise au travail et a éventuellement découvert quatre nouveaux types
    qui avaient jusque là éludé les mathématiciens. Sa méthode de travail
    était en elle-même aussi géniale que ses résultats : Rice avait inventé un
    système pour définir et classifier les pavages, outil sans lequel ses découvertes
    auraient été presque impossibles.</p>

    <!-- Dans une entrevue réalisée en 1996 par Daniel Zuckerbrot -->

    <p>Dans une entrevue datant de 1996, Rice raconte : 
    &#171; Je me suis dit que ce devait 
    être merveilleux de découvrir de beaux motifs qui n'avaient jamais été
    vus auparavant. Alors je me suis mise à imaginer une façon d'aborder le problème. 
    J'ai étudié tous les types de pavages qui étaient illustrés dans l'article, 
    et j'ai tenté d'en découvrir un nouveau. J'étais si ravie lorsque j'ai trouvé, 
    je ne pouvais pas le croire. Je ne pensais pas réellement que j'allais
    trouver quoi que ce soit. J'étais tellement excitée. &#187;</p>

    <p>L'histoire de Rice m'a fasciné et inspiré, et m'a
    rendu bêtement obsédé par les pavages. Elle nous rappelle que les mathématiques ne 
    sont pas réservées à des académiciens claquemurés dans 
    leur tour d'ivoire, et qu'il est possible à toutes et à tous de se les approprier.</p>

    <h3>Les combinaisons de Truchet, les observations de Douat</h3>

    <p class="noindent">
    <span class="drop-caps">A</span>
    <span class="small-caps">près avoir réfléchi de manière confuse</span>
    à propos d'algorithmes qui pourraient
    animer des pavages pentagonaux comme ceux de Marjorie Rice, je me suis dit 
    que je gagnerais à commencer mon exploration avec des pavages plus simples. J'ai 
    éventuellement découvert les pavages de Truchet, qui sont à la fois d'une grande
    beauté et d'une simplicité surprenante.</p>
    <p>Sébastien Truchet était un homme de science et de religion né en France en 1657. 
    En 1704, il écrivit un <span class="italic">Mémoire sur les combinaisons</span> publié par l'Académie 
    royale des sciences. Il y relate un voyage durant lequel il trouva &#171; dans un château nommé 
    la Motte S. Lyé à 4 lieues en-deçà d'Orléans, plusieurs carreaux de fayence carrés 
    et mipartis de deux couleurs par une ligne diagonale, qui étaient destinés à 
    carreler une chapelle et plusieurs autres appartements. &#187;</p>

    <p>Les carreaux que Truchet décrit sont tous identiques, et peuvent être
    tournés sur eux-mêmes en quatre positions différentes, désignées <em>a</em>, <em>b</em>, <em>c</em> et <em>d</em>.
    </p>

    <div id="carreaux">
        <img src="../../images/truchet/carreaux.jpg">
    </div>

    <p class="noindent">Truchet continue : &#171; Pour pouvoir former des dessins et des figures agréables par l'arrangement 
    de ces carreaux, j'examinai d'abord en combien de manières deux de 
    ces carreaux pourraient se joindre ensemble, en les disposant toujours en échiquier. &#187;
    Il présente ensuite les figures qui résultent de ces combinaisons, puis celles qui résultent
    de combinaisons de plus en plus complexes. Voici 
    quelques unes des superbes planches gravées qui 
    accompagnent son <span class="italic">Mémoire</span> :</p>

    <div class="imagedouble">
        <img src="../../images/truchet/truchet-planches-01.jpg">
        <img src="../../images/truchet/truchet-planches-02.jpg">
        <img src="../../images/truchet/truchet-planches-03.jpg">
        <img src="../../images/truchet/truchet-planches-04.jpg">
    </div>
    <p class="noindent">Je suis également tombé sur un livre écrit 
    par Dominique Douat en 1722, intitulé <span class="italic">Méthode pour
    faire une infinité de desseins différens</span>. Douat reprend les idées de Truchet et présente de
    nouveaux pavages de son invention.</p>
    <div class="imagedouble">
        <img src="../../images/truchet/douat-page-09.jpg">
        <img src="../../images/truchet/douat-page-74.jpg">
        <img src="../../images/truchet/douat-page-79.jpg">
        <img src="../../images/truchet/douat-page-82.jpg">
        <img src="../../images/truchet/douat-page-102.jpg">
        <img src="../../images/truchet/douat-page-107.jpg">
    </div>
    <h3>À quoi peuvent ressembler des pavages animés ?</h3>

    <p>Je me suis dit que j'allais essayer d'animer des pavages.</p>

    <p>Première tentative d'animer, deuxième tentative. Je ne suis pas satisfait.</p>

    <p>Troisième tentative d'animer plus intéressante.</p>

    </div>
    `
};

exports.en = {
    title: "The Tilings of Truchet",
    date: "Winter 2017 - Ongoing",
    description: `Wanderings into 17<span class="superscript-quarter">th</span> century French mathematics.`,
    content: String.raw `
    <div id="page"><p>

   <p>Dans une entrevue télévisuelle, Rice raconte : &#171; I thought "My, that must be wondeful that 
    someone could discover these things which nobody had seen before, these beautiful patterns. 
    So I started figuring out some way to work on the problem. I studied all of the types 
    that were pictured in the articles, and tried to discover a new type. 
    And I was so delighted when I found it. I couldn't believe it, I didn't really think I would find
    anything. I was just so thrilled. &#187;</p>

    </div>
    `
};