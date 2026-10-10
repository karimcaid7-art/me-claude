/* Leçons de grammaire A1 → B2
   - Les lignes <p class="de"> reçoivent automatiquement un bouton audio 🔊
   - ex : [phrase avec ___, réponse(s) séparées par "/", indice facultatif]
   - Couleurs : <b class="m">der</b> (masc.), <b class="f">die</b> (fém.), <b class="n">das</b> (neutre), <b class="p">die</b> (pluriel)
*/
const GRAMMAR = [
/* ============================ A1 ============================ */
{ id:'g01', lvl:'A1', i:'🔤', t:"L'alphabet & la prononciation",
html:`
<p>Bonne nouvelle : l'allemand se prononce presque toujours <b>comme il s'écrit</b>. Apprends ces règles une fois, et tu pourras lire n'importe quel mot.</p>
<table class="tbl"><tr><th>Écrit</th><th>Se prononce</th><th>Exemple</th></tr>
<tr><td>ä</td><td>è</td><td class="de-i">Mädchen, Käse</td></tr>
<tr><td>ö</td><td>eu</td><td class="de-i">schön, Köln</td></tr>
<tr><td>ü</td><td>u (français)</td><td class="de-i">über, Tür</td></tr>
<tr><td>u</td><td>ou</td><td class="de-i">Buch, gut</td></tr>
<tr><td>ß</td><td>ss</td><td class="de-i">Straße, heißen</td></tr>
<tr><td>ei / ai</td><td>aï</td><td class="de-i">mein, Mai</td></tr>
<tr><td>ie</td><td>i long</td><td class="de-i">Liebe, Bier</td></tr>
<tr><td>eu / äu</td><td>oï</td><td class="de-i">heute, Häuser</td></tr>
<tr><td>au</td><td>ao</td><td class="de-i">Haus, Frau</td></tr>
<tr><td>ch (après a, o, u)</td><td>raclé (comme la jota espagnole)</td><td class="de-i">Buch, acht</td></tr>
<tr><td>ch (après e, i, ä, ö, ü)</td><td>chuintement doux (« ich »)</td><td class="de-i">ich, Milch</td></tr>
<tr><td>sch</td><td>ch</td><td class="de-i">Schule, Tisch</td></tr>
<tr><td>sp / st (en début de mot)</td><td>chp / cht</td><td class="de-i">Sport, Stadt</td></tr>
<tr><td>z</td><td>ts</td><td class="de-i">Zeit, zehn</td></tr>
<tr><td>w</td><td>v</td><td class="de-i">Wasser, wo</td></tr>
<tr><td>v</td><td>f</td><td class="de-i">Vater, viel</td></tr>
<tr><td>j</td><td>y</td><td class="de-i">ja, Jahr</td></tr>
<tr><td>h (début de mot)</td><td>expiré</td><td class="de-i">Haus, Hund</td></tr>
<tr><td>-er (fin de mot)</td><td>a</td><td class="de-i">Vater, Lehrer</td></tr>
<tr><td>-ig (fin de mot)</td><td>ich</td><td class="de-i">billig, richtig</td></tr>
</table>
<div class="tip">💡 <b>L'accent tonique</b> est presque toujours sur la <b>première syllabe</b> : <i><u>Va</u>ter, <u>Bru</u>der, <u>Arbeit</u></i>.<br>💡 <b>Tous les noms</b> prennent une majuscule : <i>der Tisch, die Liebe</i>.</div>
<p class="de">Ich heiße Anna. Ich wohne in Zürich.</p>
<p class="de">Die Straße ist schön und das Wetter ist heute gut.</p>
<p class="de">Mein Vater spricht ein bisschen Deutsch.</p>`,
ex:[['M___dchen (son « è »)','ä/ae'],['sch___n (son « eu »)','ö/oe'],['Stra___e (son « ss »)','ß/ss'],['L___be (i long)','ie'],['h___te (son « oï »)','eu'],['___ule (son « ch »)','Sch/sch'],['W___n (son « aï », le vin)','ei']]},

{ id:'g02', lvl:'A1', i:'🙋', t:'Les pronoms, sein (être) & haben (avoir)',
html:`
<table class="tbl"><tr><th>Pronom</th><th>Français</th><th>sein (être)</th><th>haben (avoir)</th></tr>
<tr><td>ich</td><td>je</td><td>bin</td><td>habe</td></tr>
<tr><td>du</td><td>tu</td><td>bist</td><td>hast</td></tr>
<tr><td>er / sie / es</td><td>il / elle / (neutre)</td><td>ist</td><td>hat</td></tr>
<tr><td>wir</td><td>nous</td><td>sind</td><td>haben</td></tr>
<tr><td>ihr</td><td>vous (plusieurs amis)</td><td>seid</td><td>habt</td></tr>
<tr><td>sie / Sie</td><td>ils, elles / Vous (politesse)</td><td>sind</td><td>haben</td></tr></table>
<div class="tip">⚠️ <b>Sie</b> avec majuscule = « vous » de politesse (une ou plusieurs personnes). Il se conjugue comme « sie » (ils).<br>⚠️ Avoir un âge se dit avec <b>sein</b> : <i>Ich <b>bin</b> 20 Jahre alt</i> (J'ai 20 ans).<br>✅ Mais : <i>Ich <b>habe</b> Hunger / Durst / Zeit</i> (J'ai faim / soif / le temps).</div>
<p class="de">Ich bin Student. Du bist sehr nett.</p>
<p class="de">Wir haben ein Problem. Habt ihr Zeit?</p>
<p class="de">Sind Sie Frau Müller? – Ja, das bin ich.</p>`,
ex:[['Ich ___ Student. (sein)','bin'],['Du ___ ein Auto. (haben)','hast'],['Wir ___ müde. (sein)','sind'],['Er ___ Hunger. (haben)','hat'],['Ihr ___ sehr nett. (sein)','seid'],['___ Sie Zeit? (haben)','Haben'],['Ich ___ 25 Jahre alt.','bin'],['Anna ___ zwei Brüder. (haben)','hat']]},

{ id:'g03', lvl:'A1', i:'🔨', t:'Le présent des verbes réguliers',
html:`
<p>On enlève <b>-en</b> de l'infinitif pour obtenir le <b>radical</b>, puis on ajoute les terminaisons :</p>
<table class="tbl"><tr><th></th><th>Terminaison</th><th>machen (faire)</th><th>arbeiten (travailler)</th></tr>
<tr><td>ich</td><td>-e</td><td>mache</td><td>arbeite</td></tr>
<tr><td>du</td><td>-st</td><td>machst</td><td>arbeit<b>e</b>st</td></tr>
<tr><td>er/sie/es</td><td>-t</td><td>macht</td><td>arbeit<b>e</b>t</td></tr>
<tr><td>wir</td><td>-en</td><td>machen</td><td>arbeiten</td></tr>
<tr><td>ihr</td><td>-t</td><td>macht</td><td>arbeit<b>e</b>t</td></tr>
<tr><td>sie/Sie</td><td>-en</td><td>machen</td><td>arbeiten</td></tr></table>
<div class="tip">💡 Radical en <b>-t / -d</b> (arbeiten, finden, warten) → on ajoute un <b>e</b> : du arbeit<b>e</b>st, er find<b>e</b>t.<br>💡 Radical en <b>-s / -ß / -z</b> (heißen, tanzen) → du heißt, du tanzt (pas de « s » en plus).<br>💡 Astuce : <b>wir</b> et <b>sie/Sie</b> = toujours l'infinitif !</div>
<p class="de">Ich lerne Deutsch und du lernst Englisch.</p>
<p class="de">Er arbeitet in Berlin. Wir wohnen in Hamburg.</p>`,
ex:[['Ich ___ Deutsch. (lernen)','lerne'],['Du ___ in Berlin. (wohnen)','wohnst'],['Er ___ viel. (arbeiten)','arbeitet'],['Wir ___ Musik. (hören)','hören'],['Ihr ___ Fußball. (spielen)','spielt'],['Wie ___ du? (heißen)','heißt/heisst'],['Sie (elle) ___ Kaffee. (kaufen)','kauft'],['Du ___ den Schlüssel. (finden)','findest']]},

{ id:'g04', lvl:'A1', i:'🎨', t:'Le genre : der, die, das (+ astuces)',
html:`
<p>Chaque nom a un genre : <b class="m">der</b> (masculin), <b class="f">die</b> (féminin), <b class="n">das</b> (neutre). Au pluriel, c'est toujours <b class="p">die</b>. <b>Apprends TOUJOURS le nom avec son article</b> — dans cette application, les couleurs t'aident : <span class="m">bleu = der</span>, <span class="f">rouge = die</span>, <span class="n">vert = das</span>.</p>
<table class="tbl"><tr><th class="m">der (masculin)</th><th class="f">die (féminin)</th><th class="n">das (neutre)</th></tr>
<tr><td>jours, mois, saisons<br><i>der Montag, der Mai, der Winter</i></td><td>-ung, -heit, -keit, -schaft<br><i>die Zeitung, die Freiheit</i></td><td>-chen, -lein (diminutifs)<br><i>das Mädchen, das Brötchen</i></td></tr>
<tr><td>-er (personnes, outils)<br><i>der Lehrer, der Computer</i></td><td>-ion, -tät, -ik, -ie, -ei<br><i>die Nation, die Musik, die Bäckerei</i></td><td>-ment, -um, -nis<br><i>das Dokument, das Museum</i></td></tr>
<tr><td>-ling, -ismus, -or, -ig<br><i>der Frühling, der Motor</i></td><td>-in (femmes)<br><i>die Lehrerin, die Ärztin</i></td><td>verbe à l'infinitif → nom<br><i>das Essen, das Schwimmen</i></td></tr>
<tr><td>points cardinaux, météo<br><i>der Norden, der Regen</i></td><td>la plupart des noms en -e (~90%)<br><i>die Lampe, die Straße</i></td><td>Ge- + nom<br><i>das Gebäude, das Geschenk</i></td></tr></table>
<div class="tip">🧩 <b>Mots composés</b> : c'est le <b>dernier mot</b> qui décide ! <i>die Tür + <b class="m">der</b> Schlüssel = <b class="m">der</b> Türschlüssel</i>.<br>🎨 Astuce mémoire : imagine les noms masculins en <b>bleu</b>, féminins en <b>rouge en feu</b>, neutres dans de l'<b>herbe verte</b>. Plus l'image est folle, mieux tu retiens !</div>
<p class="de">der Tisch, die Lampe, das Buch, die Bücher</p>`,
ex:[['___ Zeitung','die'],['___ Mädchen','das'],['___ Lehrer','der'],['___ Freiheit','die'],['___ Frühling','der'],['___ Museum','das'],['___ Hoffnung','die'],['___ Kühlschrank','der'],['___ Schwimmen','das']]},

{ id:'g05', lvl:'A1', i:'🚫', t:'Article indéfini & négation (kein / nicht)',
html:`
<table class="tbl"><tr><th></th><th class="m">masc.</th><th class="f">fém.</th><th class="n">neutre</th><th class="p">pluriel</th></tr>
<tr><td>un / une</td><td>ein</td><td>eine</td><td>ein</td><td>– (rien)</td></tr>
<tr><td>pas de</td><td>kein</td><td>keine</td><td>kein</td><td>keine</td></tr></table>
<p><b>kein</b> = pour nier un <b>nom</b> sans article ou avec « ein ».<br><b>nicht</b> = pour nier tout le reste (verbe, adjectif, nom avec der/die/das, nom propre...).</p>
<p class="de">Das ist ein Hund. Das ist kein Hund, das ist eine Katze.</p>
<p class="de">Ich habe keine Zeit. Ich habe kein Auto.</p>
<p class="de">Ich komme heute nicht. Das ist nicht mein Buch.</p>
<p class="de">Der Film ist nicht gut.</p>
<div class="tip">💡 <b>nicht</b> va souvent à la fin de la phrase, mais <b>avant</b> un adjectif, un lieu ou l'élément qu'on veut nier : <i>Ich wohne <b>nicht</b> in Berlin.</i></div>`,
ex:[['Das ist ___ Tisch. (un)','ein'],['Das ist ___ Lampe. (une)','eine'],['Ich habe ___ Auto. (pas de)','kein'],['Ich habe ___ Zeit. (pas de)','keine'],['Das ist ___ mein Buch. (ne...pas)','nicht'],['Er kommt heute ___.','nicht'],['Wir haben ___ Kinder. (pas de)','keine']]},

{ id:'g06', lvl:'A1', i:'❓', t:'Les questions & le verbe en 2e position',
html:`
<p><b>Règle d'or</b> : dans une phrase déclarative, le verbe conjugué est <b>toujours en 2e position</b> (position 2 = 2e élément, pas forcément 2e mot).</p>
<table class="tbl"><tr><th>Position 1</th><th>Position 2 (verbe)</th><th>Reste</th></tr>
<tr><td>Ich</td><td><b>lerne</b></td><td>heute Deutsch.</td></tr>
<tr><td>Heute</td><td><b>lerne</b></td><td>ich Deutsch.</td></tr>
<tr><td>Deutsch</td><td><b>lerne</b></td><td>ich heute.</td></tr></table>
<p><b>Questions avec mot interrogatif (W-Fragen)</b> : mot interrogatif + verbe + sujet.</p>
<table class="tbl"><tr><td>wer ?</td><td>qui ?</td><td>was ?</td><td>quoi ?</td></tr>
<tr><td>wo ?</td><td>où ? (lieu)</td><td>wohin ?</td><td>où ? (direction)</td></tr>
<tr><td>woher ?</td><td>d'où ?</td><td>wann ?</td><td>quand ?</td></tr>
<tr><td>wie ?</td><td>comment ?</td><td>warum ?</td><td>pourquoi ?</td></tr>
<tr><td>wie viel ?</td><td>combien ?</td><td>welcher ?</td><td>quel ?</td></tr></table>
<p><b>Questions oui/non</b> : le verbe en <b>1re position</b>.</p>
<p class="de">Wo wohnst du? – Ich wohne in Wien.</p>
<p class="de">Kommst du aus Frankreich? – Ja, ich komme aus Paris.</p>
<p class="de">Kommst du nicht mit? – Doch, ich komme mit!</p>
<div class="tip">💡 <b>Doch</b> = « si ! » pour contredire une question négative.</div>`,
ex:[['___ wohnst du? – In Berlin.','Wo'],['___ kommst du? – Aus Frankreich.','Woher'],['___ ist das? – Das ist Anna.','Wer'],['___ fährst du? – Nach Wien.','Wohin'],['___ kostet das? – 5 Euro.','Wie viel'],['Heute ___ ich ins Kino. (gehen)','gehe'],['Kommst du nicht? – ___, ich komme!','Doch']]},

{ id:'g07', lvl:'A1', i:'🎯', t:"L'accusatif (le complément d'objet direct)",
html:`
<p>L'accusatif = le <b>COD</b> (ce qu'on voit, achète, a...). Bonne nouvelle : <b>seul le masculin change</b> !</p>
<table class="tbl"><tr><th></th><th class="m">masc.</th><th class="f">fém.</th><th class="n">neutre</th><th class="p">pluriel</th></tr>
<tr><td>Nominatif (sujet)</td><td>der / ein / kein</td><td>die / eine</td><td>das / ein</td><td>die / keine</td></tr>
<tr><td>Accusatif (COD)</td><td><b>den / einen / keinen</b></td><td>die / eine</td><td>das / ein</td><td>die / keine</td></tr></table>
<table class="tbl"><tr><th>Nominatif</th><td>ich</td><td>du</td><td>er</td><td>sie</td><td>es</td><td>wir</td><td>ihr</td><td>sie/Sie</td></tr>
<tr><th>Accusatif</th><td>mich</td><td>dich</td><td><b>ihn</b></td><td>sie</td><td>es</td><td>uns</td><td>euch</td><td>sie/Sie</td></tr></table>
<p class="de">Ich kaufe den Tisch. Ich habe einen Bruder.</p>
<p class="de">Es gibt hier keinen Supermarkt.</p>
<p class="de">Ich liebe dich. Kennst du ihn?</p>
<div class="tip">💡 <b>es gibt</b> (il y a) est toujours suivi de l'accusatif : <i>Es gibt <b>einen</b> Park.</i></div>`,
ex:[['Ich kaufe ___ Tisch. (le)','den'],['Ich habe ___ Bruder. (un)','einen'],['Sie sieht ___ Frau. (la)','die'],['Es gibt hier ___ Supermarkt. (pas de)','keinen'],['Ich liebe ___. (toi)','dich'],['Kennst du ___? (lui)','ihn'],['Wir brauchen ___ Auto. (une)','ein']]},

{ id:'g08', lvl:'A1', i:'🔀', t:'Verbes irréguliers au présent',
html:`
<p>Certains verbes changent de voyelle <b>seulement avec du et er/sie/es</b>.</p>
<table class="tbl"><tr><th>Changement</th><th>Infinitif</th><th>du</th><th>er/sie/es</th></tr>
<tr><td>a → ä</td><td>fahren</td><td>fährst</td><td>fährt</td></tr>
<tr><td>a → ä</td><td>schlafen</td><td>schläfst</td><td>schläft</td></tr>
<tr><td>au → äu</td><td>laufen</td><td>läufst</td><td>läuft</td></tr>
<tr><td>e → i</td><td>sprechen</td><td>sprichst</td><td>spricht</td></tr>
<tr><td>e → i</td><td>essen</td><td>isst</td><td>isst</td></tr>
<tr><td>e → i</td><td>helfen</td><td>hilfst</td><td>hilft</td></tr>
<tr><td>e → i</td><td>nehmen</td><td>nimmst</td><td>nimmt</td></tr>
<tr><td>e → ie</td><td>sehen</td><td>siehst</td><td>sieht</td></tr>
<tr><td>e → ie</td><td>lesen</td><td>liest</td><td>liest</td></tr>
<tr><td>spécial</td><td>wissen</td><td>weißt</td><td>weiß (ich weiß)</td></tr></table>
<p class="de">Du fährst zu schnell! Er spricht gut Deutsch.</p>
<p class="de">Sie liest ein Buch. Was isst du?</p>`,
ex:[['Du ___ sehr schnell. (fahren)','fährst/faehrst'],['Er ___ gut Deutsch. (sprechen)','spricht'],['Sie ___ ein Buch. (lesen)','liest'],['Was ___ du? (essen)','isst'],['Er ___ den Bus. (nehmen)','nimmt'],['Das Kind ___ viel. (schlafen)','schläft/schlaeft'],['Ich ___ es nicht. (wissen)','weiß/weiss'],['___ du mir? (helfen)','Hilfst']]},

{ id:'g09', lvl:'A1', i:'💪', t:'Les verbes de modalité',
html:`
<table class="tbl"><tr><th></th><th>können<br><small>pouvoir/savoir</small></th><th>müssen<br><small>devoir</small></th><th>wollen<br><small>vouloir</small></th><th>dürfen<br><small>avoir le droit</small></th><th>sollen<br><small>devoir (conseil)</small></th><th>möchten<br><small>voudrais</small></th></tr>
<tr><td>ich</td><td>kann</td><td>muss</td><td>will</td><td>darf</td><td>soll</td><td>möchte</td></tr>
<tr><td>du</td><td>kannst</td><td>musst</td><td>willst</td><td>darfst</td><td>sollst</td><td>möchtest</td></tr>
<tr><td>er/sie/es</td><td>kann</td><td>muss</td><td>will</td><td>darf</td><td>soll</td><td>möchte</td></tr>
<tr><td>wir</td><td>können</td><td>müssen</td><td>wollen</td><td>dürfen</td><td>sollen</td><td>möchten</td></tr>
<tr><td>ihr</td><td>könnt</td><td>müsst</td><td>wollt</td><td>dürft</td><td>sollt</td><td>möchtet</td></tr>
<tr><td>sie/Sie</td><td>können</td><td>müssen</td><td>wollen</td><td>dürfen</td><td>sollen</td><td>möchten</td></tr></table>
<p><b>Construction en « parenthèse »</b> : le modal en position 2, l'infinitif <b>tout à la fin</b>.</p>
<p class="de">Ich kann sehr gut schwimmen.</p>
<p class="de">Du musst heute arbeiten.</p>
<p class="de">Hier darf man nicht rauchen.</p>
<div class="tip">💡 ich et er/sie/es ont la <b>même forme</b>, sans terminaison : ich kann, er kann.<br>⚠️ <b>Ich will</b> = je veux (pas « je vais » !).</div>`,
ex:[['Ich ___ gut schwimmen. (können)','kann'],['Du ___ heute arbeiten. (müssen)','musst'],['Er ___ ein Eis essen. (wollen)','will'],['Hier ___ man nicht rauchen. (dürfen)','darf'],['Wir ___ einen Kaffee. (möchten)','möchten/moechten'],['Was ___ ich tun? (sollen)','soll'],['Ich muss heute ___. (travailler)','arbeiten']]},

{ id:'g10', lvl:'A1', i:'✂️', t:'Les verbes à particule séparable',
html:`
<p>Beaucoup de verbes ont une particule (an-, auf-, aus-, ein-, mit-, zu-, ab-, vor-, zurück-, fern-...). Au présent, elle <b>se détache et part à la fin</b> de la phrase.</p>
<table class="tbl"><tr><th>Infinitif</th><th>Phrase</th></tr>
<tr><td>auf|stehen (se lever)</td><td>Ich <b>stehe</b> um 7 Uhr <b>auf</b>.</td></tr>
<tr><td>an|rufen (appeler)</td><td>Er <b>ruft</b> seine Mutter <b>an</b>.</td></tr>
<tr><td>ein|kaufen (faire les courses)</td><td>Wir <b>kaufen</b> im Supermarkt <b>ein</b>.</td></tr>
<tr><td>fern|sehen (regarder la télé)</td><td><b>Siehst</b> du heute <b>fern</b>?</td></tr></table>
<p>Avec un verbe de modalité, le verbe reste <b>entier</b> à la fin : <i>Ich muss früh <b>aufstehen</b>.</i></p>
<div class="tip">⚠️ Les préfixes <b>be-, ge-, er-, ver-, zer-, ent-, emp-, miss-</b> ne se séparent JAMAIS : <i>Ich <b>verstehe</b> dich. Ich <b>besuche</b> Oma.</i></div>
<p class="de">Der Zug kommt um acht Uhr an.</p>
<p class="de">Ich rufe dich morgen an.</p>`,
ex:[['Ich ___ um 7 Uhr ___. (aufstehen) → écris les 2 parties','stehe auf'],['Er ___ seine Mutter ___. (anrufen)','ruft an'],['Wann ___ der Zug ___? (ankommen)','kommt an'],['Wir ___ heute Abend ___. (fernsehen)','sehen fern'],['Ich möchte heute ___. (einkaufen)','einkaufen'],['Kannst du die Tür ___? (zumachen)','zumachen']]},

{ id:'g11', lvl:'A1', i:'👯', t:'Le pluriel des noms',
html:`
<p>L'article pluriel est <b>toujours <span class="p">die</span></b>. Mais il y a 5 façons de former le pluriel — il faut l'apprendre avec le mot (l'application te montre toujours le pluriel).</p>
<table class="tbl"><tr><th>Type</th><th>Exemples</th><th>Souvent pour</th></tr>
<tr><td>-e (¨)</td><td>der Tag → die Tag<b>e</b><br>der Stuhl → die St<b>ü</b>hl<b>e</b></td><td>masculins</td></tr>
<tr><td>-er (¨)</td><td>das Kind → die Kind<b>er</b><br>das Haus → die H<b>ä</b>us<b>er</b></td><td>neutres courts</td></tr>
<tr><td>-(e)n</td><td>die Frau → die Frau<b>en</b><br>die Lampe → die Lampe<b>n</b></td><td>presque tous les féminins</td></tr>
<tr><td>-s</td><td>das Auto → die Auto<b>s</b><br>das Handy → die Handy<b>s</b></td><td>mots étrangers, mots en -a, -o, -y</td></tr>
<tr><td>– (¨)</td><td>der Lehrer → die Lehrer<br>der Apfel → die <b>Ä</b>pfel</td><td>masc./neutres en -er, -el, -en, -chen</td></tr></table>`,
ex:[['ein Buch → zwei ___','Bücher/Buecher'],['eine Lampe → zwei ___','Lampen'],['ein Auto → zwei ___','Autos'],['ein Kind → zwei ___','Kinder'],['ein Lehrer → zwei ___','Lehrer'],['eine Stadt → zwei ___','Städte/Staedte'],['ein Tag → zwei ___','Tage'],['eine Frau → zwei ___','Frauen']]},

{ id:'g12', lvl:'A1', i:'👜', t:'Les possessifs (mein, dein, sein...)',
html:`
<table class="tbl"><tr><th>Pronom</th><th>Possessif</th><th>Français</th></tr>
<tr><td>ich</td><td>mein</td><td>mon / ma</td></tr><tr><td>du</td><td>dein</td><td>ton / ta</td></tr>
<tr><td>er / es</td><td><b>sein</b></td><td>son / sa (à lui)</td></tr><tr><td>sie</td><td><b>ihr</b></td><td>son / sa (à elle)</td></tr>
<tr><td>wir</td><td>unser</td><td>notre</td></tr><tr><td>ihr</td><td>euer</td><td>votre (vous, amis)</td></tr>
<tr><td>sie / Sie</td><td>ihr / Ihr</td><td>leur / votre (politesse)</td></tr></table>
<p>Ils prennent les <b>mêmes terminaisons que ein / kein</b> :</p>
<table class="tbl"><tr><th></th><th class="m">masc.</th><th class="f">fém.</th><th class="n">neutre</th><th class="p">pluriel</th></tr>
<tr><td>Nominatif</td><td>mein</td><td>meine</td><td>mein</td><td>meine</td></tr>
<tr><td>Accusatif</td><td>mein<b>en</b></td><td>meine</td><td>mein</td><td>meine</td></tr></table>
<div class="tip">⚠️ Différence avec le français : « son » dépend du <b>possesseur</b> ! <i>Anna und <b>ihr</b> Bruder</i> (Anna et son frère), <i>Peter und <b>seine</b> Schwester</i> (Peter et sa sœur).</div>
<p class="de">Das ist mein Bruder und das ist meine Schwester.</p>
<p class="de">Anna liebt ihren Hund.</p>`,
ex:[['Das ist ___ Bruder. (mon)','mein'],['Das ist ___ Schwester. (ma)','meine'],['Wo ist ___ Auto? (ton)','dein'],['Anna liebt ___ Hund. (son, à elle)','ihren'],['Peter sucht ___ Schlüssel. (sa clé, à lui — masc. accusatif)','seinen'],['Das sind ___ Kinder. (nos)','unsere'],['Ist das ___ Tasche, Frau Müller? (votre)','Ihre']]},

{ id:'g13', lvl:'A1', i:'🕐', t:"Nombres, heure & date",
html:`
<p><b>Les nombres de 21 à 99</b> se disent « à l'envers » : unité + <i>und</i> + dizaine.<br><i>21 = einundzwanzig (un-et-vingt), 45 = fünfundvierzig, 99 = neunundneunzig</i></p>
<p><b>L'heure</b></p>
<table class="tbl"><tr><th>Heure</th><th>Familier</th><th>Officiel</th></tr>
<tr><td>3:00</td><td>Es ist drei (Uhr).</td><td>drei Uhr</td></tr>
<tr><td>3:15</td><td>Viertel <b>nach</b> drei</td><td>drei Uhr fünfzehn</td></tr>
<tr><td>3:30</td><td><b>halb vier</b> ⚠️ (= « la moitié vers 4 »)</td><td>drei Uhr dreißig</td></tr>
<tr><td>3:45</td><td>Viertel <b>vor</b> vier</td><td>drei Uhr fünfundvierzig</td></tr>
<tr><td>15:10</td><td>zehn nach drei</td><td>fünfzehn Uhr zehn</td></tr></table>
<p><b>Les prépositions du temps</b> : <b>um</b> + heure (um 8 Uhr) · <b>am</b> + jour / date (am Montag, am 3. Mai) · <b>im</b> + mois / saison (im Juli, im Winter)</p>
<p class="de">Wie spät ist es? – Es ist halb neun.</p>
<p class="de">Der Kurs beginnt um neun Uhr.</p>
<p class="de">Mein Geburtstag ist am dritten Oktober.</p>`,
ex:[['45 = ___','fünfundvierzig/fuenfundvierzig'],['2h30 (familier) : Es ist ___ drei.','halb'],['Der Kurs beginnt ___ 9 Uhr.','um'],['Ich habe ___ Montag Zeit.','am'],['___ Sommer fahre ich nach Spanien.','Im'],['3h15 : Es ist Viertel ___ drei.','nach'],['99 = ___','neunundneunzig']]},

/* ============================ A2 ============================ */
{ id:'g14', lvl:'A2', i:'🎁', t:"Le datif (le complément d'objet indirect)",
html:`
<p>Le datif = la personne <b>à qui</b> on donne, parle, aide... C'est aussi le cas après certaines prépositions.</p>
<table class="tbl"><tr><th></th><th class="m">masc.</th><th class="f">fém.</th><th class="n">neutre</th><th class="p">pluriel</th></tr>
<tr><td>Article défini</td><td>dem</td><td>der</td><td>dem</td><td>den + <b>-n</b></td></tr>
<tr><td>Article indéfini</td><td>einem</td><td>einer</td><td>einem</td><td>– / keinen + -n</td></tr></table>
<table class="tbl"><tr><th>Nom.</th><td>ich</td><td>du</td><td>er</td><td>sie</td><td>es</td><td>wir</td><td>ihr</td><td>sie/Sie</td></tr>
<tr><th>Datif</th><td>mir</td><td>dir</td><td>ihm</td><td>ihr</td><td>ihm</td><td>uns</td><td>euch</td><td>ihnen/Ihnen</td></tr></table>
<p><b>Verbes toujours suivis du datif</b> : helfen, danken, gefallen, gehören, antworten, gratulieren, schmecken, passen.</p>
<p class="de">Ich gebe dem Mann das Buch.</p>
<p class="de">Kannst du mir helfen? Das gehört meiner Mutter.</p>
<p class="de">Wie geht es dir? – Danke, mir geht es gut.</p>
<div class="tip">💡 Astuce : <b>m</b>asc./neutre au datif → <b>m</b> (de<b>m</b>, eine<b>m</b>, ih<b>m</b>). Pluriel datif → <b>n</b> partout (den Kinder<b>n</b>).</div>`,
ex:[['Ich helfe ___ Mann. (le)','dem'],['Er gibt ___ Frau eine Blume. (la)','der'],['Das Buch gehört ___ Kind. (l\')','dem'],['Ich danke ___. (toi)','dir'],['Kannst du ___ helfen? (moi)','mir'],['Wir spielen mit ___ Kindern. (les)','den'],['Das Essen schmeckt ___. (lui, masc.)','ihm']]},

{ id:'g15', lvl:'A2', i:'📍', t:'Les prépositions (accusatif, datif, mixtes)',
html:`
<table class="tbl"><tr><th>+ Accusatif</th><th>+ Datif</th><th>Mixtes (Wo? → datif / Wohin? → accusatif)</th></tr>
<tr><td>durch (à travers)<br>für (pour)<br>gegen (contre)<br>ohne (sans)<br>um (autour)<br>bis (jusqu'à)</td>
<td>aus (de, hors de)<br>bei (chez, près de)<br>mit (avec)<br>nach (après, vers)<br>seit (depuis)<br>von (de)<br>zu (chez, à)</td>
<td>in (dans) · an (à, contre)<br>auf (sur) · über (au-dessus)<br>unter (sous) · vor (devant)<br>hinter (derrière) · neben (à côté)<br>zwischen (entre)</td></tr></table>
<div class="tip">🎵 Mémo Datif : « <b>aus-bei-mit-nach-seit-von-zu</b> » (à chanter sur l'air de « Frère Jacques » !)<br>🎵 Mémo Accusatif : « <b>DOGFU</b> » = Durch, Ohne, Gegen, Für, Um</div>
<p><b>Mixtes :</b> <b>Wohin?</b> (mouvement, direction) → accusatif · <b>Wo?</b> (position) → datif</p>
<p class="de">Ich lege das Buch auf den Tisch. (Wohin?)</p>
<p class="de">Das Buch liegt auf dem Tisch. (Wo?)</p>
<p><b>Contractions</b> : in dem = <b>im</b> · in das = <b>ins</b> · an dem = <b>am</b> · zu dem = <b>zum</b> · zu der = <b>zur</b> · bei dem = <b>beim</b> · von dem = <b>vom</b></p>
<p class="de">Ich gehe zum Arzt und dann ins Kino.</p>`,
ex:[['Das Geschenk ist für ___ Vater. (mon)','meinen'],['Ich fahre mit ___ Bus.','dem'],['Ich gehe ___ Arzt. (chez le)','zum'],['Ich wohne ___ drei Jahren hier. (depuis)','seit'],['Ich lege das Buch auf ___ Tisch. (Wohin?)','den'],['Das Buch liegt auf ___ Tisch. (Wo?)','dem'],['Wir gehen ___ Kino. (au)','ins'],['Er kommt ___ der Schweiz. (de)','aus']]},

{ id:'g16', lvl:'A2', i:'⏪', t:'Le passé composé (Perfekt)',
html:`
<p>Le temps du passé <b>à l'oral</b> : <b>haben / sein</b> (position 2) + <b>participe II</b> (à la fin).</p>
<table class="tbl"><tr><th>Type</th><th>Formation</th><th>Exemples</th></tr>
<tr><td>Verbes réguliers</td><td>ge- + radical + -t</td><td>machen → <b>gemacht</b>, kaufen → <b>gekauft</b></td></tr>
<tr><td>Verbes irréguliers</td><td>ge- + radical (souvent modifié) + -en</td><td>sehen → <b>gesehen</b>, trinken → <b>getrunken</b>, schreiben → <b>geschrieben</b></td></tr>
<tr><td>Séparables</td><td>particule + ge + ...</td><td>einkaufen → ein<b>ge</b>kauft, anrufen → an<b>ge</b>rufen</td></tr>
<tr><td>Sans ge-</td><td>-ieren, be-, ver-, er-, ent-...</td><td><b>studiert</b>, <b>besucht</b>, <b>verstanden</b></td></tr></table>
<p><b>sein</b> au lieu de haben avec : les verbes de <b>mouvement</b> (gehen, fahren, kommen, fliegen, laufen), de <b>changement d'état</b> (aufstehen, einschlafen, sterben, werden) + sein, bleiben, passieren.</p>
<p class="de">Ich habe Pizza gegessen.</p>
<p class="de">Wir sind nach Berlin gefahren.</p>
<p class="de">Was ist passiert? – Ich habe den Bus verpasst.</p>`,
ex:[['Ich ___ Pizza ___. (essen) → 2 parties','habe gegessen'],['Wir ___ nach Berlin ___. (fahren)','sind gefahren'],['Er ___ lange ___. (schlafen)','hat geschlafen'],['Hast du das ___? (verstehen)','verstanden'],['Sie hat Medizin ___. (studieren)','studiert'],['Ich habe dich ___. (anrufen)','angerufen'],['Wann ___ du ___? (aufstehen)','bist aufgestanden'],['Was ___ passiert?','ist']]},

{ id:'g17', lvl:'A2', i:'🕰️', t:'Le prétérit de sein, haben & des modaux',
html:`
<p>Pour <b>sein, haben</b> et les <b>modaux</b>, on utilise le prétérit (même à l'oral) au lieu du Perfekt.</p>
<table class="tbl"><tr><th></th><th>sein</th><th>haben</th><th>können</th><th>müssen</th><th>wollen</th></tr>
<tr><td>ich</td><td>war</td><td>hatte</td><td>konnte</td><td>musste</td><td>wollte</td></tr>
<tr><td>du</td><td>warst</td><td>hattest</td><td>konntest</td><td>musstest</td><td>wolltest</td></tr>
<tr><td>er/sie/es</td><td>war</td><td>hatte</td><td>konnte</td><td>musste</td><td>wollte</td></tr>
<tr><td>wir</td><td>waren</td><td>hatten</td><td>konnten</td><td>mussten</td><td>wollten</td></tr>
<tr><td>ihr</td><td>wart</td><td>hattet</td><td>konntet</td><td>musstet</td><td>wolltet</td></tr>
<tr><td>sie/Sie</td><td>waren</td><td>hatten</td><td>konnten</td><td>mussten</td><td>wollten</td></tr></table>
<p>Aussi : dürfen → durfte · sollen → sollte · mögen → mochte. (Les modaux perdent leur Umlaut !)</p>
<p class="de">Gestern war ich krank und hatte Fieber.</p>
<p class="de">Ich konnte nicht kommen, ich musste arbeiten.</p>`,
ex:[['Gestern ___ ich krank. (sein)','war'],['Wir ___ keine Zeit. (haben)','hatten'],['Ich ___ nicht kommen. (können)','konnte'],['Er ___ arbeiten. (müssen)','musste'],['___ du schon in Wien? (sein)','Warst'],['Sie ___ Ärztin werden. (wollen)','wollte'],['Ihr ___ Glück. (haben)','hattet']]},

{ id:'g18', lvl:'A2', i:'🔗', t:'Les subordonnées : weil, dass, wenn, ob',
html:`
<p>Dans une subordonnée, le verbe conjugué part <b>à la FIN</b>. Toujours une <b>virgule</b> avant.</p>
<table class="tbl"><tr><td><b>weil</b></td><td>parce que</td><td>Ich lerne Deutsch, weil ich in Berlin arbeiten <b>möchte</b>.</td></tr>
<tr><td><b>dass</b></td><td>que</td><td>Ich glaube, dass er krank <b>ist</b>.</td></tr>
<tr><td><b>wenn</b></td><td>si / quand</td><td>Wenn ich Zeit <b>habe</b>, komme ich.</td></tr>
<tr><td><b>ob</b></td><td>si (question indirecte)</td><td>Ich weiß nicht, ob er <b>kommt</b>.</td></tr></table>
<p><b>Si la subordonnée commence la phrase</b>, elle compte comme position 1 → le verbe principal vient juste après la virgule :<br><i>Wenn es <b>regnet</b>, <b>bleibe</b> ich zu Hause.</i> (verbe – virgule – verbe)</p>
<div class="tip">⚠️ <b>denn</b> (car) ne change pas l'ordre : <i>Ich bleibe zu Hause, denn ich <b>bin</b> krank.</i><br>✅ <b>weil</b> envoie le verbe à la fin : <i>..., weil ich krank <b>bin</b>.</i></div>
<p class="de">Ich bleibe heute zu Hause, weil ich krank bin.</p>
<p class="de">Weißt du, ob der Supermarkt heute offen ist?</p>`,
ex:[['Ich weiß, dass er krank ___. (sein)','ist'],['Ich komme, ___ ich Zeit habe. (si)','wenn'],['Weißt du, ___ er kommt? (si)','ob'],['Er bleibt zu Hause, weil er Fieber ___. (haben)','hat'],['Wenn es regnet, ___ ich zu Hause. (bleiben)','bleibe'],['Ich glaube, dass der Film um 8 Uhr ___. (anfangen)','anfängt/anfaengt'],['Ich lerne, ___ ich eine Prüfung habe. (parce que)','weil']]},

{ id:'g19', lvl:'A2', i:'🪞', t:'Les verbes pronominaux (réfléchis)',
html:`
<table class="tbl"><tr><th></th><th>ich</th><th>du</th><th>er/sie/es</th><th>wir</th><th>ihr</th><th>sie/Sie</th></tr>
<tr><td>Accusatif</td><td>mich</td><td>dich</td><td>sich</td><td>uns</td><td>euch</td><td>sich</td></tr>
<tr><td>Datif</td><td>mir</td><td>dir</td><td>sich</td><td>uns</td><td>euch</td><td>sich</td></tr></table>
<p>On utilise le <b>datif</b> quand il y a déjà un autre COD : <i>Ich wasche <b>mich</b>.</i> mais <i>Ich wasche <b>mir</b> die Hände.</i></p>
<p>Verbes fréquents : sich freuen, sich waschen, sich interessieren, sich fühlen, sich beeilen, sich setzen, sich treffen, sich erinnern, sich ärgern, sich entschuldigen.</p>
<p class="de">Ich freue mich auf den Urlaub.</p>
<p class="de">Wir treffen uns um acht vor dem Kino.</p>
<p class="de">Beeil dich, der Zug fährt gleich ab!</p>`,
ex:[['Ich freue ___ auf den Urlaub.','mich'],['Wir treffen ___ um acht.','uns'],['Er interessiert ___ für Sport.','sich'],['Beeil ___! (toi)','dich'],['Ich putze ___ die Zähne.','mir'],['Fühlt ihr ___ gut?','euch']]},

{ id:'g20', lvl:'A2', i:'📊', t:'Comparatif & superlatif',
html:`
<table class="tbl"><tr><th>Adjectif</th><th>Comparatif (+ als)</th><th>Superlatif</th></tr>
<tr><td>schnell</td><td>schneller</td><td>am schnellsten</td></tr>
<tr><td>alt</td><td>älter</td><td>am ältesten</td></tr>
<tr><td>groß</td><td>größer</td><td>am größten</td></tr>
<tr><td>jung</td><td>jünger</td><td>am jüngsten</td></tr>
<tr><td><b>gut</b></td><td><b>besser</b></td><td><b>am besten</b></td></tr>
<tr><td><b>viel</b></td><td><b>mehr</b></td><td><b>am meisten</b></td></tr>
<tr><td><b>gern</b></td><td><b>lieber</b></td><td><b>am liebsten</b></td></tr>
<tr><td><b>hoch</b></td><td><b>höher</b></td><td><b>am höchsten</b></td></tr></table>
<p>Égalité : <b>so ... wie</b> (aussi ... que) · Supériorité : <b>-er als</b> (plus ... que)</p>
<p class="de">Berlin ist größer als München.</p>
<p class="de">Anna ist so alt wie Peter.</p>
<p class="de">Ich trinke lieber Tee als Kaffee, aber am liebsten trinke ich Wasser.</p>
<div class="tip">💡 Les adjectifs courts (1 syllabe) en a, o, u prennent souvent un Umlaut : alt → älter, kalt → kälter, warm → wärmer.</div>`,
ex:[['Berlin ist ___ als München. (groß)','größer/groesser'],['Ich trinke ___ Tee als Kaffee. (gern)','lieber'],['Anna ist so groß ___ Peter.','wie'],['Er spricht am ___ Deutsch. (gut)','besten'],['Mein Bruder ist ___ als ich. (alt)','älter/aelter'],['Im Winter ist es ___ als im Sommer. (kalt)','kälter/kaelter'],['Das ist das ___ Auto. (schnell, superlatif)','schnellste']]},

{ id:'g21', lvl:'A2', i:'🎨', t:"La déclinaison de l'adjectif",
html:`
<p>Un adjectif <b>devant un nom</b> prend une terminaison. Trois situations :</p>
<p><b>1) Après der / die / das</b> : seulement <b>-e</b> ou <b>-en</b></p>
<table class="tbl"><tr><th></th><th class="m">masc.</th><th class="f">fém.</th><th class="n">neutre</th><th class="p">pluriel</th></tr>
<tr><td>Nom.</td><td>der alt<b>e</b> Mann</td><td>die nett<b>e</b> Frau</td><td>das klein<b>e</b> Kind</td><td>die gut<b>en</b> Freunde</td></tr>
<tr><td>Acc.</td><td>den alt<b>en</b> Mann</td><td>die nett<b>e</b> Frau</td><td>das klein<b>e</b> Kind</td><td>die gut<b>en</b> Freunde</td></tr>
<tr><td>Dat.</td><td>dem alt<b>en</b> Mann</td><td>der nett<b>en</b> Frau</td><td>dem klein<b>en</b> Kind</td><td>den gut<b>en</b> Freunden</td></tr></table>
<p><b>2) Après ein / kein / mein</b> : pareil, SAUF quand l'article ne montre pas le genre :</p>
<table class="tbl"><tr><th></th><th class="m">masc.</th><th class="f">fém.</th><th class="n">neutre</th></tr>
<tr><td>Nom.</td><td>ein alt<b>er</b> Mann</td><td>eine nett<b>e</b> Frau</td><td>ein klein<b>es</b> Kind</td></tr>
<tr><td>Acc.</td><td>einen alt<b>en</b> Mann</td><td>eine nett<b>e</b> Frau</td><td>ein klein<b>es</b> Kind</td></tr>
<tr><td>Dat.</td><td>einem alt<b>en</b> Mann</td><td>einer nett<b>en</b> Frau</td><td>einem klein<b>en</b> Kind</td></tr></table>
<p><b>3) Sans article</b> : l'adjectif prend la terminaison de l'article (der → -er, das → -es...) : <i>heiß<b>er</b> Kaffee, kalt<b>e</b> Milch, frisch<b>es</b> Brot</i>.</p>
<div class="tip">💡 Principe : <b>quelqu'un doit montrer le genre</b>. Si l'article le montre déjà (der, das...), l'adjectif se repose (-e/-en). Sinon (ein), c'est l'adjectif qui travaille (-er, -es).</div>
<p class="de">Ich habe einen neuen Laptop und ein schnelles Auto.</p>`,
ex:[['der ___ Mann (alt)','alte'],['mit dem ___ Auto (neu)','neuen'],['ein ___ Tag (schön)','schöner/schoener'],['ein ___ Kind (klein)','kleines'],['Ich kaufe einen ___ Tisch. (groß)','großen/grossen'],['___ Kaffee (heiß, sans article)','heißer/heisser'],['die ___ Kinder (lieb)','lieben'],['eine ___ Frau (nett)','nette']]},

{ id:'g22', lvl:'A2', i:'📢', t:"L'impératif",
html:`
<table class="tbl"><tr><th>Infinitif</th><th>du</th><th>ihr</th><th>Sie</th></tr>
<tr><td>kommen</td><td>Komm!</td><td>Kommt!</td><td>Kommen Sie!</td></tr>
<tr><td>warten</td><td>Warte!</td><td>Wartet!</td><td>Warten Sie!</td></tr>
<tr><td>sprechen (e→i)</td><td>Sprich!</td><td>Sprecht!</td><td>Sprechen Sie!</td></tr>
<tr><td>lesen (e→ie)</td><td>Lies!</td><td>Lest!</td><td>Lesen Sie!</td></tr>
<tr><td>fahren (a→ä)</td><td>Fahr! (pas d'Umlaut)</td><td>Fahrt!</td><td>Fahren Sie!</td></tr>
<tr><td>aufstehen</td><td>Steh auf!</td><td>Steht auf!</td><td>Stehen Sie auf!</td></tr>
<tr><td><b>sein</b></td><td><b>Sei!</b></td><td><b>Seid!</b></td><td><b>Seien Sie!</b></td></tr></table>
<p>Forme <b>du</b> = forme « du » au présent sans <b>-st</b> et sans « du » : du kommst → <b>Komm!</b></p>
<p class="de">Komm bitte her! Sei ruhig!</p>
<p class="de">Warten Sie bitte einen Moment!</p>`,
ex:[['(kommen, du) ___ her!','Komm/Komme'],['(lesen, du) ___ den Text!','Lies'],['(warten, Sie) ___ Sie bitte!','Warten'],['(sein, du) ___ ruhig!','Sei'],['(helfen, ihr) ___ mir!','Helft'],['(fahren, du) ___ langsam!','Fahr/Fahre'],['(aufstehen, du) → ___ (2 mots)','Steh auf/Stehe auf']]},

/* ============================ B1 ============================ */
{ id:'g23', lvl:'B1', i:'📜', t:'Le prétérit (Präteritum) — le passé écrit',
html:`
<p>Le prétérit est le temps du <b>récit écrit</b> (livres, journaux, contes). À l'oral, on préfère le Perfekt.</p>
<table class="tbl"><tr><th></th><th>machen (régulier)</th><th>gehen (irrégulier)</th></tr>
<tr><td>ich</td><td>mach<b>te</b></td><td>ging</td></tr><tr><td>du</td><td>mach<b>test</b></td><td>ging<b>st</b></td></tr>
<tr><td>er/sie/es</td><td>mach<b>te</b></td><td>ging</td></tr><tr><td>wir</td><td>mach<b>ten</b></td><td>ging<b>en</b></td></tr>
<tr><td>ihr</td><td>mach<b>tet</b></td><td>ging<b>t</b></td></tr><tr><td>sie/Sie</td><td>mach<b>ten</b></td><td>ging<b>en</b></td></tr></table>
<p><b>Verbes irréguliers à connaître par cœur</b> (va dans « Conjugaison » pour t'entraîner) :<br>
gehen → ging · kommen → kam · sehen → sah · geben → gab · nehmen → nahm · finden → fand · bleiben → blieb · schreiben → schrieb · sprechen → sprach · fahren → fuhr · laufen → lief · essen → aß · trinken → trank<br>
<b>Mixtes</b> : denken → dachte · bringen → brachte · wissen → wusste · kennen → kannte</p>
<p class="de">Es war einmal ein König. Er hatte drei Töchter.</p>
<p class="de">Gestern ging ich ins Kino und sah einen tollen Film.</p>`,
ex:[['Gestern ___ ich ins Kino. (gehen)','ging'],['Er ___ einen Brief. (schreiben)','schrieb'],['Wir ___ lange. (warten)','warteten'],['Sie ___ mit dem Zug. (fahren)','fuhr'],['Ich ___ das nicht. (wissen)','wusste'],['Es ___ einmal ein König. (geben → es gab)','gab'],['Sie ___ an ihn. (denken)','dachte']]},

{ id:'g24', lvl:'B1', i:'🔮', t:'Le futur (werden + infinitif)',
html:`
<table class="tbl"><tr><th>werden</th><td>ich werde</td><td>du wirst</td><td>er wird</td><td>wir werden</td><td>ihr werdet</td><td>sie werden</td></tr></table>
<p><b>Futur</b> = werden (position 2) + infinitif (à la fin).</p>
<p class="de">Ich werde morgen anrufen.</p>
<p class="de">Es wird bald regnen.</p>
<div class="tip">💡 À l'oral, on utilise très souvent le <b>présent + indication de temps</b> : <i>Morgen <b>fahre</b> ich nach Berlin.</i><br>💡 <b>werden</b> seul = <b>devenir</b> : <i>Ich möchte Arzt <b>werden</b>.</i><br>💡 Futur = aussi une <b>supposition</b> : <i>Er wird wohl krank sein.</i> (Il doit être malade.)</div>`,
ex:[['Ich ___ morgen anrufen.','werde'],['Es ___ bald regnen.','wird'],['Wir ___ nach Berlin ziehen.','werden'],['Du ___ das schaffen!','wirst'],['Ihr ___ es sehen.','werdet'],['Sie möchte Ärztin ___. (devenir)','werden']]},

{ id:'g25', lvl:'B1', i:'💭', t:'Le subjonctif II (conditionnel)',
html:`
<p>Pour les <b>souhaits</b>, l'<b>hypothèse</b>, les <b>conseils</b> et la <b>politesse</b>.</p>
<table class="tbl"><tr><th></th><th>würde + inf.</th><th>sein</th><th>haben</th><th>können</th><th>müssen</th><th>sollen</th></tr>
<tr><td>ich</td><td>würde</td><td>wäre</td><td>hätte</td><td>könnte</td><td>müsste</td><td>sollte</td></tr>
<tr><td>du</td><td>würdest</td><td>wärst</td><td>hättest</td><td>könntest</td><td>müsstest</td><td>solltest</td></tr>
<tr><td>er/sie/es</td><td>würde</td><td>wäre</td><td>hätte</td><td>könnte</td><td>müsste</td><td>sollte</td></tr>
<tr><td>wir</td><td>würden</td><td>wären</td><td>hätten</td><td>könnten</td><td>müssten</td><td>sollten</td></tr></table>
<p class="de">Wenn ich reich wäre, würde ich um die Welt reisen.</p>
<p class="de">Könnten Sie mir bitte helfen?</p>
<p class="de">Ich hätte gern ein Glas Wasser.</p>
<p class="de">Du solltest mehr schlafen.</p>
<div class="tip">💡 Pour la plupart des verbes : <b>würde + infinitif</b>. Pour sein, haben, les modaux : la forme directe (wäre, hätte, könnte...).</div>`,
ex:[['Wenn ich Zeit ___, würde ich kommen. (haben)','hätte/haette'],['Wenn ich du ___, würde ich das machen. (sein)','wäre/waere'],['___ Sie mir helfen? (können, poli)','Könnten/Koennten'],['Ich ___ gern einen Kaffee. (haben)','hätte/haette'],['Du ___ mehr schlafen. (conseil)','solltest'],['Ich ___ gern nach Japan reisen.','würde/wuerde']]},

{ id:'g26', lvl:'B1', i:'🧬', t:'Les propositions relatives',
html:`
<p>Le pronom relatif ressemble à l'article défini. Son <b>genre</b> vient du nom qu'il remplace, son <b>cas</b> de sa fonction dans la relative. Verbe à la <b>fin</b>.</p>
<table class="tbl"><tr><th></th><th class="m">masc.</th><th class="f">fém.</th><th class="n">neutre</th><th class="p">pluriel</th></tr>
<tr><td>Nom.</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Acc.</td><td>den</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Dat.</td><td>dem</td><td>der</td><td>dem</td><td><b>denen</b></td></tr>
<tr><td>Gén.</td><td><b>dessen</b></td><td><b>deren</b></td><td><b>dessen</b></td><td><b>deren</b></td></tr></table>
<p class="de">Der Mann, der dort steht, ist mein Lehrer.</p>
<p class="de">Die Frau, die ich liebe, heißt Anna.</p>
<p class="de">Die Freunde, mit denen ich reise, kommen aus Wien.</p>
<p class="de">Alles, was er sagt, ist richtig.</p>
<div class="tip">💡 Après <b>alles, etwas, nichts, das</b> → <b>was</b>. Pour un lieu → <b>wo</b> possible : <i>die Stadt, wo ich wohne</i>.</div>`,
ex:[['Der Mann, ___ dort steht, ist mein Lehrer.','der'],['Die Frau, ___ ich liebe, heißt Anna.','die'],['Das Buch, ___ ich lese, ist spannend.','das'],['Der Freund, ___ ich helfe, ist nett.','dem'],['Die Kinder, mit ___ ich spiele, sind laut.','denen'],['Der Mann, ___ Auto kaputt ist, wartet.','dessen'],['Alles, ___ er sagt, ist richtig.','was'],['Das ist die Stadt, in ___ ich wohne.','der']]},

{ id:'g27', lvl:'B1', i:'🏗️', t:'Le passif',
html:`
<p>On s'intéresse à l'<b>action</b>, pas à celui qui la fait. <b>werden + participe II</b>.</p>
<table class="tbl"><tr><th>Temps</th><th>Exemple</th></tr>
<tr><td>Présent</td><td>Das Haus <b>wird</b> gebaut.</td></tr>
<tr><td>Prétérit</td><td>Das Haus <b>wurde</b> gebaut.</td></tr>
<tr><td>Parfait</td><td>Das Haus <b>ist</b> gebaut <b>worden</b>.</td></tr>
<tr><td>Avec modal</td><td>Das Haus <b>muss</b> gebaut <b>werden</b>.</td></tr></table>
<p>Celui qui fait l'action : <b>von + datif</b>.</p>
<p class="de">Der Brief wird morgen geschickt.</p>
<p class="de">Amerika wurde 1492 von Kolumbus entdeckt.</p>
<p class="de">Hier wird Deutsch gesprochen.</p>
<div class="tip">💡 Alternative simple : <b>man</b> + actif → <i>Man spricht hier Deutsch.</i></div>`,
ex:[['Das Auto ___ repariert. (présent)','wird'],['Die Briefe ___ gestern geschickt. (prétérit, pluriel)','wurden'],['Hier ___ Deutsch gesprochen.','wird'],['Das Haus ist 1900 gebaut ___.','worden'],['Der Film wurde ___ Millionen gesehen. (par)','von'],['Die Fenster ___ jeden Tag geputzt. (présent)','werden']]},

{ id:'g28', lvl:'B1', i:'🔑', t:'Le génitif',
html:`
<p>Le génitif exprime la <b>possession</b> (« de ») et s'utilise après certaines prépositions. Très courant à l'écrit.</p>
<table class="tbl"><tr><th></th><th class="m">masc.</th><th class="f">fém.</th><th class="n">neutre</th><th class="p">pluriel</th></tr>
<tr><td>Défini</td><td>des Mann<b>es</b></td><td>der Frau</td><td>des Kind<b>es</b></td><td>der Kinder</td></tr>
<tr><td>Indéfini</td><td>eines Mann<b>es</b></td><td>einer Frau</td><td>eines Kind<b>es</b></td><td>–</td></tr></table>
<p>Masculin et neutre : le nom prend <b>-s</b> ou <b>-es</b> !</p>
<p><b>Prépositions + génitif</b> : wegen (à cause de), trotz (malgré), während (pendant), statt (au lieu de), innerhalb (à l'intérieur de), außerhalb (en dehors de)</p>
<p class="de">Das ist das Auto meines Vaters.</p>
<p class="de">Wegen des Regens bleiben wir zu Hause.</p>
<p class="de">Trotz der Kälte gehen wir spazieren.</p>
<div class="tip">💡 Noms propres : <i>Annas Buch</i> (sans apostrophe !). À l'oral, on dit souvent <i>das Auto <b>von</b> meinem Vater</i>.</div>`,
ex:[['das Haus ___ Familie','der'],['das Auto ___ Vaters','des'],['der Name ___ Kindes','des'],['___ des Regens bleiben wir zu Hause. (à cause de)','Wegen'],['Trotz ___ Kälte gehen wir raus.','der'],['Während ___ Unterrichts schlafe ich nicht.','des'],['das Ende ___ Films','des']]},

{ id:'g29', lvl:'B1', i:'🎯', t:'zu + infinitif, um ... zu, damit',
html:`
<p><b>zu + infinitif</b> après beaucoup de verbes et d'expressions : versuchen, anfangen, vergessen, aufhören, Lust haben, Zeit haben, es ist wichtig/schwer...</p>
<p class="de">Ich habe keine Lust, heute zu arbeiten.</p>
<p class="de">Vergiss nicht, mich anzurufen!</p>
<p>Verbes séparables : <b>zu</b> entre la particule et le verbe : an<b>zu</b>rufen, auf<b>zu</b>stehen.</p>
<table class="tbl"><tr><th>Expression</th><th>Sens</th><th>Quand ?</th></tr>
<tr><td><b>um ... zu</b></td><td>pour / afin de</td><td>même sujet dans les 2 parties</td></tr>
<tr><td><b>damit</b></td><td>pour que</td><td>sujets différents</td></tr>
<tr><td><b>ohne ... zu</b></td><td>sans</td><td></td></tr>
<tr><td><b>(an)statt ... zu</b></td><td>au lieu de</td><td></td></tr></table>
<p class="de">Ich lerne Deutsch, um in Deutschland zu arbeiten.</p>
<p class="de">Ich erkläre es dir, damit du es verstehst.</p>`,
ex:[['Ich habe keine Lust, ins Kino ___ gehen.','zu'],['Vergiss nicht, mich ___! (anrufen)','anzurufen'],['Ich lerne Deutsch, ___ in Deutschland zu arbeiten.','um'],['Ich erkläre es, ___ du es verstehst.','damit'],['Er geht, ohne Tschüss ___ sagen.','zu'],['Es ist wichtig, früh ___. (aufstehen)','aufzustehen']]},

{ id:'g30', lvl:'B1', i:'🧷', t:'Connecteurs : obwohl, trotzdem, deshalb, als, nachdem...',
html:`
<table class="tbl"><tr><th>Mot</th><th>Sens</th><th>Ordre</th><th>Exemple</th></tr>
<tr><td>obwohl</td><td>bien que</td><td>verbe à la fin</td><td>Obwohl es regnet, gehe ich raus.</td></tr>
<tr><td>trotzdem</td><td>quand même</td><td>verbe juste après</td><td>Es regnet. Trotzdem gehe ich raus.</td></tr>
<tr><td>deshalb / deswegen / darum</td><td>c'est pourquoi</td><td>verbe juste après</td><td>Ich bin krank, deshalb bleibe ich hier.</td></tr>
<tr><td>als</td><td>quand (1 fois, passé)</td><td>verbe à la fin</td><td>Als ich Kind war, ...</td></tr>
<tr><td>wenn</td><td>quand (répété / présent / futur)</td><td>verbe à la fin</td><td>Immer wenn ich Zeit habe, ...</td></tr>
<tr><td>während</td><td>pendant que</td><td>verbe à la fin</td><td>Während ich koche, ...</td></tr>
<tr><td>bevor</td><td>avant que</td><td>verbe à la fin</td><td>Bevor ich schlafe, ...</td></tr>
<tr><td>nachdem</td><td>après que (+ temps antérieur)</td><td>verbe à la fin</td><td>Nachdem ich gegessen hatte, ...</td></tr>
<tr><td>seitdem</td><td>depuis que</td><td>verbe à la fin</td><td>Seitdem ich hier wohne, ...</td></tr></table>
<p class="de">Als ich ein Kind war, wohnte ich in Paris.</p>
<p class="de">Ich bin müde, trotzdem lerne ich weiter.</p>`,
ex:[['___ es regnet, gehe ich spazieren. (bien que)','Obwohl'],['Es regnet. ___ gehe ich spazieren. (quand même)','Trotzdem'],['Ich bin krank, ___ bleibe ich zu Hause. (c\'est pourquoi)','deshalb/deswegen/darum'],['___ ich ein Kind war, wohnte ich in Paris.','Als'],['Immer ___ ich Zeit habe, lese ich.','wenn'],['___ ich gegessen hatte, ging ich schlafen. (après que)','Nachdem'],['Ich putze die Zähne, ___ ich ins Bett gehe. (avant que)','bevor']]},

{ id:'g31', lvl:'B1', i:'🧲', t:'Verbes à préposition & da- / wo-',
html:`
<p>Beaucoup de verbes ont une <b>préposition fixe</b> qu'il faut apprendre avec le verbe (voir le thème « Verbes à préposition ») :</p>
<p><i>warten <b>auf</b> + acc · denken <b>an</b> + acc · sich interessieren <b>für</b> + acc · Angst haben <b>vor</b> + dat · sprechen <b>über</b> + acc · sich freuen <b>auf / über</b> + acc</i></p>
<table class="tbl"><tr><th></th><th>Chose</th><th>Personne</th></tr>
<tr><td>Question</td><td><b>Wo(r)</b> + prép. : <b>Worauf</b> wartest du?</td><td>prép. + wen/wem : <b>Auf wen</b> wartest du?</td></tr>
<tr><td>Reprise</td><td><b>Da(r)</b> + prép. : Ich warte <b>darauf</b>.</td><td>prép. + pronom : Ich warte <b>auf ihn</b>.</td></tr></table>
<p>On ajoute un <b>r</b> si la préposition commence par une voyelle : wo<b>r</b>an, da<b>r</b>über.</p>
<p class="de">Worüber sprecht ihr? – Über den Film. Wir sprechen darüber.</p>
<p class="de">Ich freue mich schon auf die Ferien.</p>`,
ex:[['Ich warte ___ den Bus.','auf'],['Er interessiert sich ___ Musik.','für/fuer'],['Ich denke oft ___ dich.','an'],['___ freust du dich? – Auf den Urlaub.','Worauf'],['Ich freue mich ___. (là-dessus)','darauf'],['___ sprecht ihr? – Über das Wetter.','Worüber/Worueber'],['Hast du Angst ___ Hunden?','vor']]},

/* ============================ B2 ============================ */
{ id:'g32', lvl:'B2', i:'⏮️', t:'Le plus-que-parfait (Plusquamperfekt)',
html:`
<p>Une action passée <b>avant</b> une autre action passée. <b>hatte / war + participe II</b>.</p>
<p class="de">Nachdem er gegessen hatte, ging er spazieren.</p>
<p class="de">Als ich ankam, war der Zug schon abgefahren.</p>
<p class="de">Ich war müde, weil ich schlecht geschlafen hatte.</p>
<div class="tip">💡 Même choix haben / sein qu'au Perfekt. Très souvent avec <b>nachdem</b> : <i>nachdem</i> + plus-que-parfait, phrase principale au prétérit.</div>`,
ex:[['Nachdem er gegessen ___, ging er.','hatte'],['Als ich ankam, ___ der Zug schon abgefahren.','war'],['Sie hatte das Buch schon ___. (lesen)','gelesen'],['Wir ___ uns vorher nie gesehen.','hatten'],['Ich war müde, weil ich schlecht geschlafen ___.','hatte']]},

{ id:'g33', lvl:'B2', i:'🏛️', t:'Passif avancé & alternatives',
html:`
<table class="tbl"><tr><th>Structure</th><th>Exemple</th><th>Sens</th></tr>
<tr><td>Passif + modal</td><td>Das Problem <b>muss</b> gelöst <b>werden</b>.</td><td>doit être résolu</td></tr>
<tr><td>Passif d'état (sein + PII)</td><td>Die Tür <b>ist</b> geschlossen.</td><td>résultat, état</td></tr>
<tr><td>sich lassen + inf.</td><td>Das <b>lässt sich</b> leicht erklären.</td><td>peut être expliqué</td></tr>
<tr><td>sein + zu + inf.</td><td>Die Aufgabe <b>ist</b> bis morgen <b>zu erledigen</b>.</td><td>doit / peut être faite</td></tr>
<tr><td>adjectif en -bar</td><td>Das ist <b>machbar</b>.</td><td>faisable</td></tr>
<tr><td>man + actif</td><td><b>Man</b> muss das Problem lösen.</td><td>on doit résoudre</td></tr></table>
<p class="de">Der Antrag kann online ausgefüllt werden.</p>
<p class="de">Dieses Problem ist leicht zu lösen.</p>`,
ex:[['Das Problem muss gelöst ___.','werden'],['Die Tür ___ geschlossen. (état)','ist'],['Das Formular kann online ausgefüllt ___.','werden'],['Das lässt ___ leicht erklären.','sich'],['Die Aufgabe ist bis morgen zu ___. (erledigen)','erledigen'],['Das ist mach___. (faisable)','bar']]},

{ id:'g34', lvl:'B2', i:'🗞️', t:'Le subjonctif I (discours indirect)',
html:`
<p>Utilisé dans les <b>médias</b> pour rapporter les paroles de quelqu'un sans les prendre à son compte.</p>
<table class="tbl"><tr><th></th><th>sein</th><th>haben</th><th>werden</th><th>können</th><th>kommen</th></tr>
<tr><td>ich</td><td>sei</td><td>(hätte)</td><td>(würde)</td><td>könne</td><td>(käme)</td></tr>
<tr><td>du</td><td>sei(e)st</td><td>habest</td><td>werdest</td><td>könnest</td><td>kommest</td></tr>
<tr><td><b>er/sie/es</b></td><td><b>sei</b></td><td><b>habe</b></td><td><b>werde</b></td><td><b>könne</b></td><td><b>komme</b></td></tr>
<tr><td>wir</td><td>seien</td><td>(hätten)</td><td>(würden)</td><td>(könnten)</td><td>(kämen)</td></tr></table>
<p>En pratique, on l'utilise surtout à la <b>3e personne du singulier</b> : radical + <b>e</b>. Quand le subjonctif I est identique à l'indicatif, on prend le subjonctif II (entre parenthèses).</p>
<p class="de">Der Minister sagte, er sei nicht informiert worden.</p>
<p class="de">Sie erklärte, sie habe keine Zeit.</p>
<p class="de">Er behauptet, er werde morgen kommen.</p>`,
ex:[['Er sagt, er ___ krank. (sein)','sei'],['Sie sagt, sie ___ keine Zeit. (haben)','habe'],['Der Minister erklärte, er ___ zurücktreten. (werden)','werde'],['Er behauptet, er ___ das nicht gewusst. (haben)','habe'],['Sie meint, er ___ gut Deutsch. (sprechen)','spreche'],['Man sagt, sie ___ morgen. (kommen)','komme']]},

{ id:'g35', lvl:'B2', i:'🧩', t:'Les participes utilisés comme adjectifs',
html:`
<p><b>Participe I</b> (infinitif + <b>d</b>) = action en cours, sens actif : <i>das schlafen<b>d</b>e Kind</i> (l'enfant qui dort)<br>
<b>Participe II</b> = action terminée, sens passif : <i>das <b>gekochte</b> Ei</i> (l'œuf cuit)</p>
<p>Ils se déclinent comme des adjectifs. À l'écrit (B2/C1), on trouve des <b>groupes très longs</b> avant le nom :</p>
<p class="de">der seit Jahren in Berlin lebende Künstler</p>
<p>= l'artiste <b>qui vit</b> à Berlin depuis des années</p>
<p class="de">die von der Regierung beschlossenen Maßnahmen</p>
<p>= les mesures <b>décidées</b> par le gouvernement</p>
<div class="tip">💡 Pour comprendre : trouve l'article (die), puis saute jusqu'au nom (Maßnahmen), puis lis le milieu comme une relative.</div>`,
ex:[['das ___ Kind (schlafen → qui dort)','schlafende'],['das ___ Wasser (kochen → qui bout)','kochende'],['die ___ Tür (schließen → fermée)','geschlossene'],['ein ___ Auto (reparieren → réparée, neutre nom.)','repariertes'],['die ___ Preise (steigen → qui augmentent, pluriel)','steigenden'],['der ___ Brief (schreiben → écrite, masc. nom.)','geschriebene']]},

{ id:'g36', lvl:'B2', i:'⛓️', t:'Les conjonctions doubles',
html:`
<table class="tbl"><tr><th>Allemand</th><th>Français</th><th>Exemple</th></tr>
<tr><td>sowohl ... als auch</td><td>aussi bien ... que</td><td>Ich spreche sowohl Deutsch als auch Englisch.</td></tr>
<tr><td>weder ... noch</td><td>ni ... ni</td><td>Er hat weder Zeit noch Geld.</td></tr>
<tr><td>entweder ... oder</td><td>soit ... soit</td><td>Entweder du kommst mit, oder du bleibst hier.</td></tr>
<tr><td>nicht nur ... sondern auch</td><td>non seulement ... mais aussi</td><td>Sie ist nicht nur klug, sondern auch nett.</td></tr>
<tr><td>zwar ... aber</td><td>certes ... mais</td><td>Das ist zwar teuer, aber gut.</td></tr>
<tr><td>je ... desto / umso</td><td>plus ... plus</td><td>Je mehr ich lese, desto mehr verstehe ich.</td></tr></table>
<div class="tip">⚠️ <b>je</b> + verbe à la fin, <b>desto</b> + verbe juste après : <i>Je älter er <b>wird</b>, desto ruhiger <b>wird</b> er.</i></div>
<p class="de">Je mehr ich übe, desto besser spreche ich.</p>`,
ex:[['Ich spreche ___ Deutsch als auch Englisch.','sowohl'],['Er hat ___ Zeit noch Geld.','weder'],['___ du kommst mit, oder du bleibst hier.','Entweder'],['Je älter er wird, ___ ruhiger wird er.','desto/umso'],['Sie ist nicht nur klug, ___ auch nett.','sondern'],['Das ist ___ teuer, aber gut.','zwar']]},

{ id:'g37', lvl:'B2', i:'🏷️', t:'Nominalisation & style écrit',
html:`
<p>L'allemand écrit (B2, journaux, lettres officielles) transforme souvent les verbes en <b>noms</b>.</p>
<table class="tbl"><tr><th>Phrase verbale (oral)</th><th>Groupe nominal (écrit)</th></tr>
<tr><td>Weil es regnete, ...</td><td><b>Wegen des Regens</b> ...</td></tr>
<tr><td>Obwohl es kalt war, ...</td><td><b>Trotz der Kälte</b> ...</td></tr>
<tr><td>Nachdem er angekommen war, ...</td><td><b>Nach seiner Ankunft</b> ...</td></tr>
<tr><td>Bevor wir abfahren, ...</td><td><b>Vor der Abfahrt</b> ...</td></tr>
<tr><td>Wenn man arbeitet, ...</td><td><b>Bei der Arbeit</b> ...</td></tr>
<tr><td>Um Deutsch zu lernen, ...</td><td><b>Zum Deutschlernen</b> ...</td></tr></table>
<p><b>Formation</b> : verbe → <b>-ung</b> (entscheiden → die Entscheidung) · infinitif → <b>das</b> + inf. (das Lesen) · radical seul (ankommen → die Ankunft, beginnen → der Beginn).</p>
<p><b>Expressions nom + verbe</b> (Nomen-Verb-Verbindungen) : eine Entscheidung treffen, eine Frage stellen, zur Verfügung stehen, in Kraft treten... (voir le thème de vocabulaire).</p>
<p class="de">Nach langer Diskussion wurde eine Entscheidung getroffen.</p>`,
ex:[['Weil es regnete → ___ des Regens','Wegen'],['Nachdem er angekommen war → nach seiner ___','Ankunft'],['Bevor wir abfahren → vor der ___','Abfahrt'],['entscheiden → die ___','Entscheidung'],['Obwohl es kalt war → ___ der Kälte','Trotz'],['eine Frage ___ (poser)','stellen']]},

{ id:'g38', lvl:'B2', i:'😔', t:'Le subjonctif II passé (regrets, irréel)',
html:`
<p><b>hätte / wäre + participe II</b> = ce qui aurait pu se passer (mais ne s'est pas passé).</p>
<p class="de">Wenn ich das gewusst hätte, wäre ich früher gekommen.</p>
<p class="de">Hätte ich nur mehr Zeit gehabt!</p>
<p class="de">An deiner Stelle hätte ich das nicht gemacht.</p>
<p><b>Avec un modal</b> : double infinitif → <i>Du <b>hättest</b> mehr lernen <b>sollen</b>.</i> (Tu aurais dû apprendre plus.)</p>
<div class="tip">💡 Choix hätte / wäre = même règle que haben / sein au Perfekt.</div>`,
ex:[['Wenn ich das gewusst ___, wäre ich gekommen.','hätte/haette'],['Wenn er früher losgefahren wäre, ___ er pünktlich gewesen.','wäre/waere'],['Ich ___ dich angerufen, aber ich hatte kein Handy.','hätte/haette'],['Du hättest mehr lernen ___. (sollen)','sollen'],['___ ich nur mehr Zeit gehabt!','Hätte/Haette'],['Wir ___ fast den Zug verpasst. (sein)','wären/waeren']]},

{ id:'g39', lvl:'B2', i:'🧭', t:"L'ordre des mots avancé (TeKaMoLo, nicht)",
html:`
<p><b>Au milieu de la phrase</b>, les compléments suivent l'ordre <b>Te-Ka-Mo-Lo</b> :<br><b>Te</b>mporel (quand ?) → <b>Ka</b>usal (pourquoi ?) → <b>Mo</b>dal (comment ?) → <b>Lo</b>kal (où ?)</p>
<p class="de">Ich fahre morgen wegen der Arbeit mit dem Zug nach Hamburg.</p>
<p><b>Deux objets</b> : nom datif avant nom accusatif ; mais pronom accusatif avant datif.</p>
<p class="de">Ich gebe dem Mann das Buch. Ich gebe es ihm.</p>
<p><b>Position de nicht</b> :<br>• toute la phrase → à la fin : <i>Ich komme heute <b>nicht</b>.</i><br>• mais avant : infinitif, participe, particule, adjectif attribut, lieu/direction : <i>Ich kann heute <b>nicht</b> kommen. Er ist <b>nicht</b> nett.</i><br>• une partie seulement → juste avant : <i>Nicht ich, sondern er hat das gemacht.</i></p>`,
ex:[['Ich gebe ___ das Buch. (lui, masc.)','ihm'],['Ich gebe ___ ihm. (le livre → pronom)','es'],['Ich fahre morgen wegen der Arbeit ___ nach Hamburg. (en voiture : mit dem Auto)','mit dem Auto'],['Ich komme heute ___.','nicht'],['Er ist ___ mein Bruder, sondern mein Cousin.','nicht']]},

{ id:'g40', lvl:'B2', i:'🎤', t:'Argumenter & écrire (Redemittel B2)',
html:`
<p>À l'examen B2, tu dois <b>donner ton avis</b>, <b>argumenter</b> et écrire des <b>lettres formelles</b>. Apprends ces formules par cœur :</p>
<table class="tbl"><tr><th>Fonction</th><th>Formules</th></tr>
<tr><td>Donner son avis</td><td>Meiner Meinung nach ... / Ich bin der Ansicht, dass ... / Ich bin davon überzeugt, dass ...</td></tr>
<tr><td>Être d'accord</td><td>Da stimme ich Ihnen zu. / Das sehe ich genauso.</td></tr>
<tr><td>Ne pas être d'accord</td><td>Da bin ich anderer Meinung. / Das sehe ich anders.</td></tr>
<tr><td>Structurer</td><td>Zunächst ... / Außerdem ... / Ein weiterer Punkt ist ... / Schließlich ...</td></tr>
<tr><td>Avantages / inconvénients</td><td>Ein Vorteil ist, dass ... / Ein Nachteil besteht darin, dass ...</td></tr>
<tr><td>Concéder</td><td>Zwar ..., aber ... / Einerseits ..., andererseits ...</td></tr>
<tr><td>Conclure</td><td>Zusammenfassend lässt sich sagen, dass ... / Alles in allem ...</td></tr>
<tr><td>Lettre formelle</td><td>Sehr geehrte Damen und Herren, ... / Mit freundlichen Grüßen</td></tr></table>
<p class="de">Meiner Meinung nach hat das Homeoffice mehr Vorteile als Nachteile.</p>
<p class="de">Zusammenfassend lässt sich sagen, dass beide Seiten gute Argumente haben.</p>`,
ex:[['___ Meinung nach ist das richtig.','Meiner'],['Ich bin ___ Ansicht, dass wir handeln müssen.','der'],['Da stimme ich Ihnen ___.','zu'],['Mit freundlichen ___','Grüßen/Gruessen'],['Sehr ___ Damen und Herren,','geehrte'],['Zusammenfassend lässt sich ___, dass ...','sagen'],['Einerseits ist es teuer, ___ ist es praktisch.','andererseits']]}
];
