exports.date = {
    year: 2017,
    month: 12,
    day: 31
};

exports.fr = {
    title: "Explorer les automates cellulaires fractaux",
    content: `
    <p class="noindent">
    <span class="drop-caps">R</span>
    <span class="small-caps">écemment,</span> suite à la mise en ligne d'un 
    <a href="https://www.youtube.com/watch?v=FWSR_7kZuYg&t=3s">tutoriel vidéo</a>
    sur le <span class="italic">Jeu de la vie</span>
    présenté par Daniel Shiffman (en anglais), je me suis mis à m'amuser avec les automates cellulaires
    (dont le <span class="italic">Jeu de la vie</span> est un exemple).
    Voici le résultat de mes premiers essais.</p>
    <div class="ornament">
    <img class="ornament" src="../../../style/ornaments/terminal-ornament-02.png" width="100px" heigth="100px">
    </div>
    <h3>Qu'est-ce qu'un automate cellulaire ?</h3>
    <p class="noindent">
    <span class="drop-caps">U</span>
    <span class="small-caps">n automate cellulaire</span> est une case dans une grille. 
    Il peut être dans une variété d'<span class="italic">états</span> différents, 
    par exemple on peut le considérer vivant ou mort, éveillé ou endormi. 
    On pourrait aussi décider de lui donner une valeur numérique, comme 0, 1, 3255 
    ou quoi que ce soit d'autre.</p>

    <p>Ce qui rend l'automate intéressant, c'est la façon dont il interagit 
    avec les autres cases autour de lui. Autour de chaque case, il y a ce 
    qu'on appelle le <span class="italic">voisinage</span> de la case. L'automate peut réagir
    aux états de ses cases voisines et changer son propre état. Par exemple, 
    il pourrait s'endormir si trop de ses voisins sont endormis,
    ou s'éveiller si trop de ses voisins sont éveillés. Le comportement 
    d'un automate peut varier à l'infini selon les idées et les goûts 
    de la personne qui le détermine.
    </p>
    <p>Généralement, dans un système d'automates cellulaires, chacune des cases d'une
    grille est un automate. Et puisque chacun des automates répond aux états de son
    voisinage, le comportement de groupe d'une grille devient très complexe.
    </p>
    `
};

exports.en = {
    title: "Exploring fractal cellular automata",
    content: `
    <h3>What are cellular automata ?</h3>
    <p>Cellular automata are a type of...</p>
    `
};