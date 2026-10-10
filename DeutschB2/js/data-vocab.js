/* Vocabulaire A1 → B2
   Format de chaque ligne : emoji | allemand | pluriel | français | exemple DE | exemple FR
   - Pluriel : rempli seulement pour les noms ("-" = pas de pluriel, "PL" = nom toujours au pluriel)
*/
const VOCAB_THEMES = [
/* ============================ A1 ============================ */
{ id:'gruss', lvl:'A1', t:'Salutations & politesse', i:'👋', w:`
👋|Hallo!||Salut ! / Bonjour !|Hallo, wie geht's?|Salut, ça va ?
🌅|Guten Morgen!||Bonjour ! (le matin)||
☀️|Guten Tag!||Bonjour !||
🌆|Guten Abend!||Bonsoir !||
🌙|Gute Nacht!||Bonne nuit !||
🙋|Tschüss!||Salut ! (pour partir)||
🤝|Auf Wiedersehen!||Au revoir !||
🙏|bitte||s'il te plaît / je t'en prie|Ein Wasser, bitte.|Une eau, s'il vous plaît.
😊|danke||merci|Danke schön!|Merci beaucoup !
🙇|Entschuldigung!||Excusez-moi ! / Pardon !|Entschuldigung, wo ist der Bahnhof?|Excusez-moi, où est la gare ?
👍|ja||oui||
👎|nein||non||
❓|Wie geht es Ihnen?||Comment allez-vous ?|Wie geht es Ihnen? – Gut, danke.|Comment allez-vous ? – Bien, merci.
🙂|Mir geht es gut.||Je vais bien.||
🏷️|Ich heiße ...||Je m'appelle ...|Ich heiße Anna.|Je m'appelle Anna.
🌍|Ich komme aus ...||Je viens de ...|Ich komme aus Frankreich.|Je viens de France.
🤗|Freut mich!||Enchanté(e) !||
🤷|Ich verstehe nicht.||Je ne comprends pas.||
🐢|Langsamer, bitte.||Plus lentement, s'il vous plaît.||
🔁|Noch einmal, bitte.||Encore une fois, s'il vous plaît.||
👌|Kein Problem.||Pas de problème.||
🎉|Bis bald!||À bientôt !||
🗣️|Sprechen Sie Französisch?||Parlez-vous français ?||
`},
{ id:'zahlen', lvl:'A1', t:'Les nombres', i:'🔢', w:`
0️⃣|null||zéro||
1️⃣|eins||un||
2️⃣|zwei||deux||
3️⃣|drei||trois||
4️⃣|vier||quatre||
5️⃣|fünf||cinq||
6️⃣|sechs||six||
7️⃣|sieben||sept||
8️⃣|acht||huit||
9️⃣|neun||neuf||
🔟|zehn||dix||
🔢|elf||onze||
🔢|zwölf||douze||
🔢|dreizehn||treize||
🔢|sechzehn||seize||
🔢|siebzehn||dix-sept||
🔢|zwanzig||vingt||
🔢|einundzwanzig||vingt et un|Ich bin einundzwanzig Jahre alt.|J'ai vingt et un ans.
🔢|dreißig||trente||
🔢|vierzig||quarante||
🔢|fünfzig||cinquante||
💯|hundert||cent||
🔢|tausend||mille||
💰|eine Million||un million||
🥇|der erste||le premier|Heute ist der erste Mai.|Aujourd'hui c'est le premier mai.
🥈|der zweite||le deuxième||
🥉|der dritte||le troisième||
`},
{ id:'familie', lvl:'A1', t:'La famille', i:'👨‍👩‍👧', w:`
👨‍👩‍👧‍👦|die Familie|Familien|la famille|Meine Familie ist groß.|Ma famille est grande.
👨|der Vater|Väter|le père||
👩|die Mutter|Mütter|la mère||
👪|die Eltern|PL|les parents|Meine Eltern wohnen in Berlin.|Mes parents habitent à Berlin.
👦|der Sohn|Söhne|le fils||
👧|die Tochter|Töchter|la fille (enfant)||
👶|das Kind|Kinder|l'enfant|Wir haben zwei Kinder.|Nous avons deux enfants.
🧒|der Bruder|Brüder|le frère||
👱‍♀️|die Schwester|Schwestern|la sœur||
👴|der Großvater|Großväter|le grand-père||
👵|die Großmutter|Großmütter|la grand-mère||
🧔|der Onkel|Onkel|l'oncle||
👩‍🦰|die Tante|Tanten|la tante||
🧑|der Cousin|Cousins|le cousin||
🤵|der Mann|Männer|l'homme / le mari||
👰|die Frau|Frauen|la femme / l'épouse||
💍|verheiratet||marié(e)|Ich bin verheiratet.|Je suis marié(e).
🙋|ledig||célibataire||
🧑‍🤝‍🧑|der Freund|Freunde|l'ami / le petit ami||
👭|die Freundin|Freundinnen|l'amie / la petite amie||
🎂|das Alter|-|l'âge|Wie alt bist du? – Ich bin 25.|Quel âge as-tu ? – J'ai 25 ans.
`},
{ id:'farben', lvl:'A1', t:'Les couleurs', i:'🎨', w:`
🔴|rot||rouge|Die Tomate ist rot.|La tomate est rouge.
🔵|blau||bleu|Der Himmel ist blau.|Le ciel est bleu.
🟢|grün||vert||
🟡|gelb||jaune||
⚫|schwarz||noir||
⚪|weiß||blanc||
🟤|braun||marron||
🟠|orange||orange||
🟣|lila||violet||
🌸|rosa||rose||
🩶|grau||gris||
🌈|bunt||coloré / multicolore||
🌑|dunkel||foncé / sombre||
🌕|hell||clair||
🎨|die Farbe|Farben|la couleur|Was ist deine Lieblingsfarbe?|Quelle est ta couleur préférée ?
`},
{ id:'essen', lvl:'A1', t:'La nourriture', i:'🍎', w:`
🍎|der Apfel|Äpfel|la pomme|Ich esse jeden Tag einen Apfel.|Je mange une pomme chaque jour.
🍌|die Banane|Bananen|la banane||
🍞|das Brot|Brote|le pain|Das Brot ist frisch.|Le pain est frais.
🥐|das Brötchen|Brötchen|le petit pain||
🧀|der Käse|Käse|le fromage||
🥚|das Ei|Eier|l'œuf||
🥩|das Fleisch|-|la viande||
🐟|der Fisch|Fische|le poisson||
🍗|das Hähnchen|Hähnchen|le poulet||
🥔|die Kartoffel|Kartoffeln|la pomme de terre||
🍅|die Tomate|Tomaten|la tomate||
🥕|die Karotte|Karotten|la carotte||
🥗|der Salat|Salate|la salade||
🍚|der Reis|-|le riz||
🍝|die Nudeln|PL|les pâtes||
🧈|die Butter|-|le beurre||
🍰|der Kuchen|Kuchen|le gâteau||
🍫|die Schokolade|Schokoladen|le chocolat||
🧂|das Salz|-|le sel||
🍓|die Erdbeere|Erdbeeren|la fraise||
🍊|die Orange|Orangen|l'orange||
🥣|das Frühstück|Frühstücke|le petit-déjeuner|Zum Frühstück esse ich Müsli.|Au petit-déjeuner, je mange du muesli.
🍽️|das Mittagessen|Mittagessen|le déjeuner||
🌃|das Abendessen|Abendessen|le dîner||
😋|lecker||délicieux|Die Suppe ist sehr lecker!|La soupe est très bonne !
🍴|essen||manger|Was isst du gern?|Qu'est-ce que tu aimes manger ?
🤤|der Hunger|-|la faim|Ich habe Hunger.|J'ai faim.
`},
{ id:'getraenke', lvl:'A1', t:'Les boissons', i:'☕', w:`
💧|das Wasser|-|l'eau|Ich trinke viel Wasser.|Je bois beaucoup d'eau.
☕|der Kaffee|Kaffees|le café||
🍵|der Tee|Tees|le thé||
🥛|die Milch|-|le lait||
🧃|der Saft|Säfte|le jus||
🍺|das Bier|Biere|la bière||
🍷|der Wein|Weine|le vin||
🥤|die Cola|Colas|le coca||
🥃|das Glas|Gläser|le verre||
🫖|die Tasse|Tassen|la tasse||
🍾|die Flasche|Flaschen|la bouteille||
🥂|trinken||boire|Was möchtest du trinken?|Qu'est-ce que tu veux boire ?
🏜️|der Durst|-|la soif|Ich habe Durst.|J'ai soif.
`},
{ id:'wohnung', lvl:'A1', t:'La maison', i:'🏠', w:`
🏠|das Haus|Häuser|la maison|Das Haus ist groß.|La maison est grande.
🏢|die Wohnung|Wohnungen|l'appartement|Meine Wohnung hat drei Zimmer.|Mon appartement a trois pièces.
🚪|das Zimmer|Zimmer|la pièce / la chambre||
🛋️|das Wohnzimmer|Wohnzimmer|le salon||
🛏️|das Schlafzimmer|Schlafzimmer|la chambre à coucher||
🍳|die Küche|Küchen|la cuisine||
🛁|das Bad|Bäder|la salle de bain||
🚽|die Toilette|Toiletten|les toilettes||
🌿|der Balkon|Balkone|le balcon||
🌳|der Garten|Gärten|le jardin||
🚪|die Tür|Türen|la porte||
🪟|das Fenster|Fenster|la fenêtre||
🪜|die Treppe|Treppen|l'escalier||
🧱|die Wand|Wände|le mur||
🟫|der Boden|Böden|le sol||
🔑|der Schlüssel|Schlüssel|la clé||
🏡|wohnen||habiter|Ich wohne in Paris.|J'habite à Paris.
`},
{ id:'moebel', lvl:'A1', t:'Meubles & objets', i:'🛋️', w:`
🛏️|das Bett|Betten|le lit||
🛋️|das Sofa|Sofas|le canapé||
🪑|der Stuhl|Stühle|la chaise||
🍽️|der Tisch|Tische|la table||
🗄️|der Schrank|Schränke|l'armoire||
💡|die Lampe|Lampen|la lampe||
📺|der Fernseher|Fernseher|la télévision||
🧊|der Kühlschrank|Kühlschränke|le réfrigérateur||
🔥|der Herd|Herde|la cuisinière||
🪞|der Spiegel|Spiegel|le miroir||
🖼️|das Bild|Bilder|le tableau / l'image||
📚|das Regal|Regale|l'étagère||
🚿|die Dusche|Duschen|la douche||
🧺|die Waschmaschine|Waschmaschinen|la machine à laver||
⏰|der Wecker|Wecker|le réveil||
🧶|der Teppich|Teppiche|le tapis||
`},
{ id:'kleidung', lvl:'A1', t:'Les vêtements', i:'👕', w:`
👕|das T-Shirt|T-Shirts|le t-shirt||
👔|das Hemd|Hemden|la chemise||
👖|die Hose|Hosen|le pantalon||
👗|das Kleid|Kleider|la robe||
👚|die Bluse|Blusen|le chemisier||
🧥|die Jacke|Jacken|la veste||
🥼|der Mantel|Mäntel|le manteau||
🧶|der Pullover|Pullover|le pull||
👟|der Schuh|Schuhe|la chaussure||
🧦|die Socke|Socken|la chaussette||
🧢|die Mütze|Mützen|le bonnet / la casquette||
🎩|der Hut|Hüte|le chapeau||
🧣|der Schal|Schals|l'écharpe||
🧤|der Handschuh|Handschuhe|le gant||
👜|die Tasche|Taschen|le sac||
👓|die Brille|Brillen|les lunettes||
🩳|der Rock|Röcke|la jupe||
🤵|tragen||porter (un vêtement)|Er trägt heute einen Anzug.|Il porte un costume aujourd'hui.
🪞|anziehen||mettre (un vêtement)|Ich ziehe eine Jacke an.|Je mets une veste.
`},
{ id:'koerper', lvl:'A1', t:'Le corps', i:'🧍', w:`
🗣️|der Kopf|Köpfe|la tête||
👤|das Gesicht|Gesichter|le visage||
👁️|das Auge|Augen|l'œil||
👂|das Ohr|Ohren|l'oreille||
👃|die Nase|Nasen|le nez||
👄|der Mund|Münder|la bouche||
🦷|der Zahn|Zähne|la dent||
💇|das Haar|Haare|le cheveu||
🦒|der Hals|Hälse|le cou||
💪|der Arm|Arme|le bras||
✋|die Hand|Hände|la main||
☝️|der Finger|Finger|le doigt||
🦵|das Bein|Beine|la jambe||
🦶|der Fuß|Füße|le pied||
🫃|der Bauch|Bäuche|le ventre||
🔙|der Rücken|Rücken|le dos||
❤️|das Herz|Herzen|le cœur||
🧠|das Gehirn|Gehirne|le cerveau||
🦴|das Knie|Knie|le genou||
🤕|wehtun||faire mal|Mein Kopf tut weh.|J'ai mal à la tête.
`},
{ id:'stadt', lvl:'A1', t:'La ville', i:'🏙️', w:`
🏙️|die Stadt|Städte|la ville||
🏘️|das Dorf|Dörfer|le village||
🛣️|die Straße|Straßen|la rue||
⛲|der Platz|Plätze|la place||
🚉|der Bahnhof|Bahnhöfe|la gare|Wo ist der Bahnhof?|Où est la gare ?
🏦|die Bank|Banken|la banque||
🏥|das Krankenhaus|Krankenhäuser|l'hôpital||
🏫|die Schule|Schulen|l'école||
🛒|der Supermarkt|Supermärkte|le supermarché||
🥖|die Bäckerei|Bäckereien|la boulangerie||
💊|die Apotheke|Apotheken|la pharmacie||
🍝|das Restaurant|Restaurants|le restaurant||
☕|das Café|Cafés|le café (lieu)||
🏨|das Hotel|Hotels|l'hôtel||
🏛️|das Museum|Museen|le musée||
⛪|die Kirche|Kirchen|l'église||
🌳|der Park|Parks|le parc||
📮|die Post|-|la poste||
🎬|das Kino|Kinos|le cinéma||
🏬|das Geschäft|Geschäfte|le magasin||
👉|rechts||à droite|Gehen Sie rechts!|Allez à droite !
👈|links||à gauche||
⬆️|geradeaus||tout droit|Gehen Sie geradeaus.|Allez tout droit.
📍|in der Nähe||à proximité|Gibt es hier in der Nähe eine Apotheke?|Y a-t-il une pharmacie près d'ici ?
`},
{ id:'verkehr', lvl:'A1', t:'Les transports', i:'🚆', w:`
🚗|das Auto|Autos|la voiture|Ich fahre mit dem Auto.|Je vais en voiture.
🚌|der Bus|Busse|le bus||
🚆|der Zug|Züge|le train||
🚇|die U-Bahn|U-Bahnen|le métro||
🚋|die Straßenbahn|Straßenbahnen|le tramway||
🚲|das Fahrrad|Fahrräder|le vélo||
✈️|das Flugzeug|Flugzeuge|l'avion||
🛫|der Flughafen|Flughäfen|l'aéroport||
🚕|das Taxi|Taxis|le taxi||
🚢|das Schiff|Schiffe|le bateau||
🎫|die Fahrkarte|Fahrkarten|le billet (transport)|Eine Fahrkarte nach München, bitte.|Un billet pour Munich, s'il vous plaît.
🚏|die Haltestelle|Haltestellen|l'arrêt||
🛤️|das Gleis|Gleise|la voie / le quai||
🚙|fahren||aller (en véhicule) / conduire|Wir fahren nach Hamburg.|Nous allons à Hambourg.
🚶|gehen||aller (à pied) / marcher||
🛩️|fliegen||prendre l'avion / voler||
🏁|ankommen||arriver|Der Zug kommt um 8 Uhr an.|Le train arrive à 8 heures.
🚦|abfahren||partir|Wann fährt der Bus ab?|Quand part le bus ?
🔄|umsteigen||changer (de train/bus)|Sie müssen in Köln umsteigen.|Vous devez changer à Cologne.
`},
{ id:'zeit', lvl:'A1', t:'Le temps & le calendrier', i:'📅', w:`
📅|der Tag|Tage|le jour||
📆|die Woche|Wochen|la semaine||
🗓️|der Monat|Monate|le mois||
🎆|das Jahr|Jahre|l'année||
1️⃣|der Montag|Montage|lundi|Am Montag arbeite ich.|Lundi, je travaille.
2️⃣|der Dienstag|Dienstage|mardi||
3️⃣|der Mittwoch|Mittwoche|mercredi||
4️⃣|der Donnerstag|Donnerstage|jeudi||
5️⃣|der Freitag|Freitage|vendredi||
6️⃣|der Samstag|Samstage|samedi||
7️⃣|der Sonntag|Sonntage|dimanche||
❄️|der Januar|-|janvier||
💘|der Februar|-|février||
🌱|der März|-|mars||
🐣|der April|-|avril||
🌷|der Mai|-|mai||
🌞|der Juni|-|juin||
🏖️|der Juli|-|juillet||
🌻|der August|-|août||
🍁|der September|-|septembre||
🎃|der Oktober|-|octobre||
🌧️|der November|-|novembre||
🎄|der Dezember|-|décembre||
🌄|der Morgen|Morgen|le matin||
🕛|der Mittag|Mittage|le midi||
🌇|der Abend|Abende|le soir||
🌃|die Nacht|Nächte|la nuit||
⏱️|die Stunde|Stunden|l'heure (durée)||
⏲️|die Minute|Minuten|la minute||
🕐|die Uhr|Uhren|l'heure / la montre|Wie spät ist es? – Es ist drei Uhr.|Quelle heure est-il ? – Il est trois heures.
📍|heute||aujourd'hui||
⏩|morgen||demain||
⏪|gestern||hier||
⚡|jetzt||maintenant||
♾️|immer||toujours||
🙅|nie||jamais||
🔁|oft||souvent||
🎲|manchmal||parfois||
🌸|der Frühling|Frühlinge|le printemps||
🌞|der Sommer|Sommer|l'été||
🍂|der Herbst|Herbste|l'automne||
⛄|der Winter|Winter|l'hiver||
`},
{ id:'wetter', lvl:'A1', t:'La météo', i:'🌦️', w:`
☀️|die Sonne|Sonnen|le soleil||
🌧️|der Regen|-|la pluie||
❄️|der Schnee|-|la neige||
💨|der Wind|Winde|le vent||
☁️|die Wolke|Wolken|le nuage||
⛈️|das Gewitter|Gewitter|l'orage||
🌡️|die Temperatur|Temperaturen|la température||
🌤️|das Wetter|-|le temps (météo)|Wie ist das Wetter heute?|Quel temps fait-il aujourd'hui ?
🥵|warm||chaud (agréable)||
🔥|heiß||très chaud||
🥶|kalt||froid|Im Winter ist es kalt.|En hiver il fait froid.
😎|sonnig||ensoleillé||
🌫️|neblig||brumeux||
🌦️|regnen||pleuvoir|Es regnet.|Il pleut.
🌨️|schneien||neiger|Es schneit.|Il neige.
`},
{ id:'tiere', lvl:'A1', t:'Les animaux', i:'🐕', w:`
🐕|der Hund|Hunde|le chien||
🐈|die Katze|Katzen|le chat||
🐦|der Vogel|Vögel|l'oiseau||
🐎|das Pferd|Pferde|le cheval||
🐄|die Kuh|Kühe|la vache||
🐖|das Schwein|Schweine|le cochon||
🐑|das Schaf|Schafe|le mouton||
🐁|die Maus|Mäuse|la souris||
🐇|das Kaninchen|Kaninchen|le lapin||
🐻|der Bär|Bären|l'ours||
🦁|der Löwe|Löwen|le lion||
🐘|der Elefant|Elefanten|l'éléphant||
🐒|der Affe|Affen|le singe||
🦊|der Fuchs|Füchse|le renard||
🐺|der Wolf|Wölfe|le loup||
🐍|die Schlange|Schlangen|le serpent||
🐝|die Biene|Bienen|l'abeille||
🦋|der Schmetterling|Schmetterlinge|le papillon||
🐓|das Huhn|Hühner|la poule||
🦆|die Ente|Enten|le canard||
`},
{ id:'berufe', lvl:'A1', t:'Les métiers', i:'👩‍⚕️', w:`
👨‍🏫|der Lehrer|Lehrer|le professeur||
👩‍🏫|die Lehrerin|Lehrerinnen|la professeure||
👨‍⚕️|der Arzt|Ärzte|le médecin||
👩‍⚕️|die Ärztin|Ärztinnen|la médecin (femme)||
🧑‍⚕️|der Krankenpfleger|Krankenpfleger|l'infirmier||
🧑‍🍳|der Koch|Köche|le cuisinier||
👨‍💻|der Programmierer|Programmierer|le programmeur||
👷|der Ingenieur|Ingenieure|l'ingénieur||
🧑‍💼|der Verkäufer|Verkäufer|le vendeur||
👮|der Polizist|Polizisten|le policier||
🧑‍🔧|der Mechaniker|Mechaniker|le mécanicien||
🧑‍🌾|der Bauer|Bauern|l'agriculteur||
⚖️|der Anwalt|Anwälte|l'avocat||
🧑‍🎓|der Student|Studenten|l'étudiant||
👩‍🎓|die Studentin|Studentinnen|l'étudiante||
🚚|der Fahrer|Fahrer|le chauffeur||
💈|der Friseur|Friseure|le coiffeur||
🧑‍✈️|der Pilot|Piloten|le pilote||
💼|der Beruf|Berufe|la profession|Was sind Sie von Beruf?|Quelle est votre profession ?
🏭|arbeiten||travailler|Ich arbeite als Ingenieur.|Je travaille comme ingénieur.
`},
{ id:'schule', lvl:'A1', t:"L'école & apprendre", i:'📚', w:`
📕|das Buch|Bücher|le livre||
📓|das Heft|Hefte|le cahier||
✏️|der Bleistift|Bleistifte|le crayon||
🖊️|der Kuli|Kulis|le stylo||
🧽|der Radiergummi|Radiergummis|la gomme||
📏|das Lineal|Lineale|la règle||
🎒|der Rucksack|Rucksäcke|le sac à dos||
💻|der Computer|Computer|l'ordinateur||
📄|das Papier|Papiere|le papier||
📝|die Hausaufgabe|Hausaufgaben|le devoir||
📖|das Wörterbuch|Wörterbücher|le dictionnaire||
🧑‍🏫|der Unterricht|-|le cours||
❓|die Frage|Fragen|la question||
💬|die Antwort|Antworten|la réponse||
📚|lernen||apprendre|Ich lerne Deutsch.|J'apprends l'allemand.
🎧|hören||écouter / entendre||
👓|lesen||lire||
✍️|schreiben||écrire||
🗣️|sprechen||parler|Sprichst du Deutsch?|Parles-tu allemand ?
💡|verstehen||comprendre||
🔁|wiederholen||répéter||
`},
{ id:'verbenA1', lvl:'A1', t:'Verbes essentiels A1', i:'⚡', w:`
✅|sein||être|Ich bin müde.|Je suis fatigué(e).
🤲|haben||avoir|Ich habe ein Auto.|J'ai une voiture.
🔨|machen||faire|Was machst du?|Qu'est-ce que tu fais ?
🏃|kommen||venir|Woher kommst du?|D'où viens-tu ?
🎯|wollen||vouloir||
💪|können||pouvoir / savoir faire|Ich kann schwimmen.|Je sais nager.
⚠️|müssen||devoir||
🙏|möchten||voudrais / aimerais|Ich möchte einen Kaffee.|Je voudrais un café.
❤️|lieben||aimer (d'amour)||
👍|mögen||aimer bien||
🔍|suchen||chercher||
🎁|finden||trouver||
👀|sehen||voir||
🛍️|kaufen||acheter||
💳|bezahlen||payer||
🎲|spielen||jouer||
😴|schlafen||dormir||
🚿|duschen||se doucher||
📞|anrufen||appeler (téléphone)|Ich rufe dich morgen an.|Je t'appelle demain.
🆘|helfen||aider|Kannst du mir helfen?|Peux-tu m'aider ?
🎀|geben||donner||
✊|nehmen||prendre||
🏁|beginnen||commencer||
🛑|aufhören||arrêter||
🔓|öffnen||ouvrir||
🔒|schließen||fermer||
🗨️|sagen||dire||
💭|denken||penser||
🙋|fragen||demander||
💬|antworten||répondre||
⏳|warten||attendre||
🍳|kochen||cuisiner||
🧹|putzen||nettoyer||
🏘️|besuchen||rendre visite / visiter||
🤝|kennen||connaître (une personne, un lieu)||
🧠|wissen||savoir (une information)||
🏠|bleiben||rester||
`},
{ id:'adjA1', lvl:'A1', t:'Adjectifs de base', i:'⚖️', w:`
🐘|groß||grand||
🐭|klein||petit||
🆕|neu||nouveau||
🏚️|alt||vieux / âgé||
🐇|schnell||rapide||
🐌|langsam||lent||
💸|teuer||cher||
🏷️|billig||bon marché||
😀|gut||bon / bien||
😖|schlecht||mauvais||
😍|schön||beau||
🙂|nett||gentil||
😊|glücklich||heureux||
😢|traurig||triste||
😴|müde||fatigué||
🤒|krank||malade||
🏋️|stark||fort||
🍃|schwach||faible||
🪶|leicht||facile / léger||
🧗|schwer||difficile / lourd||
📏|lang||long||
✂️|kurz||court||
🔊|laut||bruyant / fort||
🤫|leise||silencieux / à voix basse||
🧼|sauber||propre||
🐷|schmutzig||sale||
✔️|richtig||juste / correct||
❌|falsch||faux||
🆓|frei||libre||
🔒|besetzt||occupé||
`},
/* ============================ A2 ============================ */
{ id:'gesundheit', lvl:'A2', t:'La santé', i:'🩺', w:`
🏥|die Arztpraxis|Arztpraxen|le cabinet médical||
🤒|das Fieber|-|la fièvre|Ich habe Fieber.|J'ai de la fièvre.
🤧|die Erkältung|Erkältungen|le rhume||
😷|der Husten|-|la toux||
🤕|die Kopfschmerzen|PL|le mal de tête||
🤢|die Bauchschmerzen|PL|le mal de ventre||
💊|die Tablette|Tabletten|le comprimé||
💉|die Spritze|Spritzen|la piqûre||
🩹|das Pflaster|Pflaster|le pansement||
📋|das Rezept|Rezepte|l'ordonnance / la recette||
🗓️|der Termin|Termine|le rendez-vous|Ich möchte einen Termin vereinbaren.|Je voudrais prendre rendez-vous.
🚑|der Notfall|Notfälle|l'urgence||
🛡️|die Krankenversicherung|Krankenversicherungen|l'assurance maladie||
🛌|sich ausruhen||se reposer||
🩺|untersuchen||examiner||
💚|gesund||en bonne santé||
🦠|die Krankheit|Krankheiten|la maladie||
🩼|verletzt||blessé||
🥦|sich ernähren||se nourrir|Ich ernähre mich gesund.|Je mange sainement.
`},
{ id:'freizeit', lvl:'A2', t:'Loisirs & sport', i:'⚽', w:`
⚽|der Fußball|-|le football|Am Wochenende spiele ich Fußball.|Le week-end, je joue au foot.
🏊|schwimmen||nager||
🏃|joggen||faire du jogging||
🚴|Rad fahren||faire du vélo||
🎸|die Gitarre|Gitarren|la guitare||
🎹|das Klavier|Klaviere|le piano||
🎵|die Musik|-|la musique||
🎮|das Computerspiel|Computerspiele|le jeu vidéo||
📸|fotografieren||photographier||
🎨|malen||peindre||
💃|tanzen||danser||
🥾|wandern||faire de la randonnée|Im Sommer wandern wir in den Alpen.|En été, nous randonnons dans les Alpes.
🎭|das Theater|Theater|le théâtre||
🎤|das Konzert|Konzerte|le concert||
🏋️|das Fitnessstudio|Fitnessstudios|la salle de sport||
🧘|das Hobby|Hobbys|le loisir|Was sind deine Hobbys?|Quels sont tes loisirs ?
📅|das Wochenende|Wochenenden|le week-end||
🎉|die Party|Partys|la fête||
🤝|sich treffen||se retrouver|Wir treffen uns um acht.|On se retrouve à huit heures.
😃|Spaß machen||être amusant|Tanzen macht mir Spaß.|J'aime danser (ça m'amuse).
`},
{ id:'reisen', lvl:'A2', t:'Les voyages', i:'🧳', w:`
🧳|der Koffer|Koffer|la valise||
🛂|der Reisepass|Reisepässe|le passeport||
🗺️|die Karte|Karten|la carte||
🏖️|der Urlaub|Urlaube|les vacances|Wir machen Urlaub in Spanien.|Nous partons en vacances en Espagne.
🏝️|die Reise|Reisen|le voyage||
🌊|das Meer|Meere|la mer||
🏔️|der Berg|Berge|la montagne||
🏞️|der See|Seen|le lac||
⛺|das Zelt|Zelte|la tente||
🛎️|die Rezeption|Rezeptionen|la réception||
🛏️|das Einzelzimmer|Einzelzimmer|la chambre simple||
🛌|das Doppelzimmer|Doppelzimmer|la chambre double||
📝|reservieren||réserver|Ich möchte ein Zimmer reservieren.|Je voudrais réserver une chambre.
🗽|die Sehenswürdigkeit|Sehenswürdigkeiten|le site touristique||
📷|der Tourist|Touristen|le touriste||
🌍|das Ausland|-|l'étranger|Ich war noch nie im Ausland.|Je n'ai jamais été à l'étranger.
⏰|die Verspätung|Verspätungen|le retard|Der Zug hat zehn Minuten Verspätung.|Le train a dix minutes de retard.
🎒|packen||faire les bagages||
🗓️|der Aufenthalt|Aufenthalte|le séjour||
↔️|hin und zurück||aller-retour||
`},
{ id:'einkaufen', lvl:'A2', t:'Les courses', i:'🛒', w:`
🛒|einkaufen||faire les courses|Ich gehe heute einkaufen.|Je vais faire les courses aujourd'hui.
💶|das Geld|-|l'argent||
💳|die Kreditkarte|Kreditkarten|la carte bancaire||
🪙|das Kleingeld|-|la monnaie||
🧾|die Quittung|Quittungen|le ticket de caisse||
🏷️|der Preis|Preise|le prix|Was kostet das?|Combien ça coûte ?
💲|kosten||coûter||
🔖|das Angebot|Angebote|l'offre / la promotion||
🛍️|die Tüte|Tüten|le sachet||
🛒|der Einkaufswagen|Einkaufswagen|le caddie||
💁|die Kasse|Kassen|la caisse||
👕|anprobieren||essayer (un vêtement)|Kann ich die Hose anprobieren?|Puis-je essayer le pantalon ?
📏|die Größe|Größen|la taille||
↩️|umtauschen||échanger||
⚖️|das Kilo|Kilos|le kilo||
📦|die Packung|Packungen|le paquet||
💯|der Rabatt|Rabatte|la réduction||
🕘|die Öffnungszeiten|PL|les horaires d'ouverture||
🥛|brauchen||avoir besoin de|Ich brauche noch Milch.|J'ai encore besoin de lait.
`},
{ id:'restaurant', lvl:'A2', t:'Au restaurant', i:'🍽️', w:`
📜|die Speisekarte|Speisekarten|le menu / la carte|Die Speisekarte, bitte.|La carte, s'il vous plaît.
🧑‍🍳|der Kellner|Kellner|le serveur||
🍲|die Suppe|Suppen|la soupe||
🍖|das Hauptgericht|Hauptgerichte|le plat principal||
🍨|der Nachtisch|Nachtische|le dessert||
🥄|der Löffel|Löffel|la cuillère||
🍴|die Gabel|Gabeln|la fourchette||
🔪|das Messer|Messer|le couteau||
🍽️|der Teller|Teller|l'assiette||
🧾|die Rechnung|Rechnungen|l'addition / la facture|Die Rechnung, bitte!|L'addition, s'il vous plaît !
💶|das Trinkgeld|Trinkgelder|le pourboire||
🥡|bestellen||commander|Ich möchte bestellen.|Je voudrais commander.
🌶️|scharf||épicé||
🍯|süß||sucré||
🧂|salzig||salé||
🍋|sauer||acide||
🥦|vegetarisch||végétarien||
🍳|braten||faire frire / rôtir||
🥧|backen||cuire au four||
✔️|Stimmt so!||Gardez la monnaie !||
`},
{ id:'arbeit', lvl:'A2', t:'Le travail', i:'💼', w:`
🏢|das Büro|Büros|le bureau||
👔|der Chef|Chefs|le chef||
🧑‍🤝‍🧑|der Kollege|Kollegen|le collègue||
👩‍💼|die Kollegin|Kolleginnen|la collègue||
🏭|die Firma|Firmen|l'entreprise||
📧|die E-Mail|E-Mails|l'e-mail||
📅|die Besprechung|Besprechungen|la réunion||
📄|der Vertrag|Verträge|le contrat||
💶|das Gehalt|Gehälter|le salaire||
⏰|die Arbeitszeit|Arbeitszeiten|le temps de travail||
📝|die Bewerbung|Bewerbungen|la candidature|Ich schreibe eine Bewerbung.|J'écris une candidature.
🤝|das Vorstellungsgespräch|Vorstellungsgespräche|l'entretien d'embauche||
🔎|die Stelle|Stellen|le poste / l'emploi||
🧑‍🏭|der Arbeitgeber|Arbeitgeber|l'employeur||
👷|der Arbeitnehmer|Arbeitnehmer|le salarié||
🏖️|Urlaub nehmen||prendre des congés||
📨|sich bewerben||postuler|Ich bewerbe mich um die Stelle.|Je postule pour le poste.
🖨️|der Drucker|Drucker|l'imprimante||
📞|telefonieren||téléphoner||
✅|erledigen||régler / accomplir|Ich muss noch viel erledigen.|J'ai encore beaucoup à faire.
⏳|die Überstunde|Überstunden|l'heure supplémentaire||
`},
{ id:'natur', lvl:'A2', t:'La nature', i:'🌳', w:`
🌳|der Baum|Bäume|l'arbre||
🌸|die Blume|Blumen|la fleur||
🌲|der Wald|Wälder|la forêt||
🌾|das Feld|Felder|le champ||
🏞️|der Fluss|Flüsse|la rivière / le fleuve||
🏝️|die Insel|Inseln|l'île||
🏖️|der Strand|Strände|la plage||
🌄|das Tal|Täler|la vallée||
🪨|der Stein|Steine|la pierre||
🌱|die Pflanze|Pflanzen|la plante||
🍃|das Blatt|Blätter|la feuille||
🌌|der Himmel|-|le ciel||
⭐|der Stern|Sterne|l'étoile||
🌙|der Mond|Monde|la lune||
🌍|die Erde|-|la Terre||
🌬️|die Luft|-|l'air||
🏜️|die Wüste|Wüsten|le désert||
🌋|der Vulkan|Vulkane|le volcan||
🖼️|die Landschaft|Landschaften|le paysage||
`},
{ id:'gefuehle', lvl:'A2', t:'Sentiments & émotions', i:'😊', w:`
😀|froh||content||
😡|wütend||en colère||
😨|Angst haben||avoir peur|Ich habe Angst vor Spinnen.|J'ai peur des araignées.
😰|nervös||nerveux||
😌|ruhig||calme||
😲|überrascht||surpris||
😕|enttäuscht||déçu||
🥰|verliebt||amoureux||
🥱|langweilig||ennuyeux||
🤩|spannend||passionnant||
😤|sich ärgern||s'énerver|Ich ärgere mich über den Lärm.|Le bruit m'énerve.
🥳|sich freuen||se réjouir|Ich freue mich auf das Wochenende.|Je me réjouis du week-end.
😟|sich Sorgen machen||s'inquiéter||
😳|peinlich||gênant||
😊|zufrieden||satisfait||
😔|einsam||seul / solitaire||
😂|lachen||rire||
😭|weinen||pleurer||
💓|das Gefühl|Gefühle|le sentiment||
🎭|die Laune|Launen|l'humeur|Er hat heute gute Laune.|Il est de bonne humeur aujourd'hui.
`},
{ id:'technik', lvl:'A2', t:'Technologie', i:'📱', w:`
📱|das Handy|Handys|le portable||
💻|der Laptop|Laptops|l'ordinateur portable||
🌐|das Internet|-|Internet||
📶|das WLAN|-|le wifi|Wie ist das WLAN-Passwort?|Quel est le mot de passe du wifi ?
🔑|das Passwort|Passwörter|le mot de passe||
📲|die App|Apps|l'application||
🔋|der Akku|Akkus|la batterie||
🔌|das Ladegerät|Ladegeräte|le chargeur||
🖥️|der Bildschirm|Bildschirme|l'écran||
⌨️|die Tastatur|Tastaturen|le clavier||
💾|speichern||enregistrer||
⬇️|herunterladen||télécharger|Ich lade die App herunter.|Je télécharge l'appli.
🔗|der Link|Links|le lien||
✉️|schicken||envoyer||
🖨️|drucken||imprimer||
🔍|googeln||chercher sur Google||
📷|das Foto|Fotos|la photo||
💬|die Nachricht|Nachrichten|le message / la nouvelle||
🗑️|löschen||supprimer||
🔐|sich anmelden||se connecter / s'inscrire||
`},
{ id:'verbenA2', lvl:'A2', t:'Verbes A2', i:'⚡', w:`
🎒|mitbringen||apporter||
🚗|abholen||aller chercher|Ich hole dich vom Bahnhof ab.|Je viens te chercher à la gare.
🔙|zurückkommen||revenir||
🪑|sich setzen||s'asseoir||
🗣️|erzählen||raconter|Erzähl mal von deinem Urlaub!|Raconte-moi tes vacances !
💡|erklären||expliquer||
🤦|vergessen||oublier||
🧠|sich erinnern||se souvenir|Ich erinnere mich an den Tag.|Je me souviens de ce jour.
🏆|gewinnen||gagner||
💔|verlieren||perdre||
📦|bekommen||recevoir|Ich habe ein Paket bekommen.|J'ai reçu un colis.
🏗️|bauen||construire||
🧑‍🏫|unterrichten||enseigner||
🔄|ändern||changer / modifier||
🔚|beenden||terminer||
🎓|studieren||étudier (à l'université)||
💸|ausgeben||dépenser||
🐷|sparen||économiser||
💌|einladen||inviter|Ich lade dich zum Essen ein.|Je t'invite à manger.
🗳️|vorschlagen||proposer||
😍|gefallen||plaire|Das Kleid gefällt mir.|La robe me plaît.
🏷️|gehören||appartenir|Das Buch gehört mir.|Le livre m'appartient.
🤞|hoffen||espérer||
🙏|glauben||croire||
⚖️|entscheiden||décider||
📈|steigen||monter / augmenter||
📉|fallen||tomber / baisser||
🏃|laufen||courir / marcher||
🚶|spazieren gehen||se promener||
`},
{ id:'konnA2', lvl:'A2', t:'Petits mots & connecteurs', i:'🔗', w:`
➕|und||et||
🔀|oder||ou||
✋|aber||mais||
🔗|denn||car||
🔁|auch||aussi||
➡️|dann||ensuite / alors||
🔚|zuletzt||pour finir||
1️⃣|zuerst||d'abord||
⏭️|danach||après||
⌛|schon||déjà||
⏳|noch||encore||
🔜|bald||bientôt||
💯|sehr||très||
🤏|ein bisschen||un peu||
🌐|überall||partout||
🤷|vielleicht||peut-être||
✔️|natürlich||naturellement / bien sûr||
😞|leider||malheureusement|Leider habe ich keine Zeit.|Malheureusement, je n'ai pas le temps.
🙂|gern||volontiers / avec plaisir|Ich spiele gern Tennis.|J'aime jouer au tennis.
🔢|ungefähr||environ||
🏃|sofort||tout de suite||
💡|zum Beispiel||par exemple||
🔄|wieder||de nouveau||
🎯|genau||exactement||
🏁|endlich||enfin (après attente)||
`},
/* ============================ B1 ============================ */
{ id:'gesellschaft', lvl:'B1', t:'La société', i:'👥', w:`
👥|die Gesellschaft|Gesellschaften|la société||
🌐|die Bevölkerung|-|la population||
🎎|die Kultur|Kulturen|la culture||
🗣️|die Sprache|Sprachen|la langue||
🧳|die Migration|-|la migration||
🤝|die Integration|-|l'intégration||
⚖️|die Gleichberechtigung|-|l'égalité des droits||
👴|die Rente|Renten|la retraite||
👶|die Generation|Generationen|la génération||
🏘️|die Nachbarschaft|Nachbarschaften|le voisinage||
🙋|das Ehrenamt|Ehrenämter|le bénévolat||
🤲|die Hilfe|-|l'aide||
💬|die Meinung|Meinungen|l'opinion|Meiner Meinung nach ist das falsch.|À mon avis, c'est faux.
🚫|das Vorurteil|Vorurteile|le préjugé||
📜|die Tradition|Traditionen|la tradition||
🎊|das Fest|Feste|la fête||
🕌|die Religion|Religionen|la religion||
🫂|die Gemeinschaft|Gemeinschaften|la communauté||
⚠️|das Problem|Probleme|le problème||
💡|die Lösung|Lösungen|la solution||
📊|die Arbeitslosigkeit|-|le chômage||
🏚️|die Armut|-|la pauvreté||
💎|der Reichtum|Reichtümer|la richesse||
`},
{ id:'umwelt', lvl:'B1', t:"L'environnement", i:'♻️', w:`
🌍|die Umwelt|-|l'environnement|Wir müssen die Umwelt schützen.|Nous devons protéger l'environnement.
🌡️|der Klimawandel|-|le changement climatique||
🗑️|der Müll|-|les déchets||
♻️|recyceln||recycler||
⚡|die Energie|Energien|l'énergie||
☀️|die Solarenergie|-|l'énergie solaire||
🌬️|die Windkraft|-|l'énergie éolienne||
🏭|die Verschmutzung|-|la pollution||
🛡️|schützen||protéger||
🚰|verschwenden||gaspiller||
🌱|nachhaltig||durable|Nachhaltiger Konsum ist wichtig.|La consommation durable est importante.
🛍️|die Plastiktüte|Plastiktüten|le sac plastique||
🐾|die Tierart|Tierarten|l'espèce animale||
⛽|das Benzin|-|l'essence||
🚲|umweltfreundlich||écologique||
📉|reduzieren||réduire||
🌊|die Überschwemmung|Überschwemmungen|l'inondation||
🔥|die Hitzewelle|Hitzewellen|la canicule||
💨|das Kohlendioxid|-|le dioxyde de carbone||
🥫|die Verpackung|Verpackungen|l'emballage||
`},
{ id:'medien', lvl:'B1', t:'Les médias', i:'📰', w:`
📰|die Zeitung|Zeitungen|le journal||
📺|das Fernsehen|-|la télévision (média)||
📻|das Radio|Radios|la radio||
📢|die Werbung|-|la publicité||
🗞️|der Artikel|Artikel|l'article||
🎙️|die Sendung|Sendungen|l'émission||
📱|die sozialen Medien|PL|les réseaux sociaux||
👍|der Beitrag|Beiträge|la publication / la contribution||
🔠|die Schlagzeile|Schlagzeilen|le gros titre||
🕵️|der Journalist|Journalisten|le journaliste||
❌|die Falschmeldung|Falschmeldungen|la fausse information||
📡|berichten||rapporter / faire un reportage|Die Zeitung berichtet über die Wahl.|Le journal rend compte de l'élection.
📊|die Umfrage|Umfragen|le sondage||
🔎|sich informieren||s'informer||
🗂️|die Quelle|Quellen|la source||
🔔|abonnieren||s'abonner||
📽️|der Dokumentarfilm|Dokumentarfilme|le documentaire||
👥|die Öffentlichkeit|-|le public / l'opinion publique||
🤐|die Zensur|-|la censure||
`},
{ id:'bildung', lvl:'B1', t:'Études & formation', i:'🎓', w:`
🛠️|die Ausbildung|Ausbildungen|la formation professionnelle||
🏛️|die Universität|Universitäten|l'université||
📚|das Studium|Studien|les études||
📝|die Prüfung|Prüfungen|l'examen|Ich habe die Prüfung bestanden.|J'ai réussi l'examen.
✅|bestehen||réussir (un examen)||
❌|durchfallen||échouer (à un examen)||
📜|das Zeugnis|Zeugnisse|le bulletin / le certificat||
🎓|der Abschluss|Abschlüsse|le diplôme||
🧑‍🏫|der Kurs|Kurse|le cours / la formation||
📖|das Fach|Fächer|la matière||
🧪|das Praktikum|Praktika|le stage||
📈|die Weiterbildung|Weiterbildungen|la formation continue||
💶|das Stipendium|Stipendien|la bourse d'études||
🧠|das Wissen|-|le savoir||
🎯|das Ziel|Ziele|l'objectif||
📋|sich vorbereiten||se préparer|Ich bereite mich auf die Prüfung vor.|Je me prépare à l'examen.
🏅|die Note|Noten|la note||
🧾|die Anmeldung|Anmeldungen|l'inscription||
💡|die Erfahrung|Erfahrungen|l'expérience||
`},
{ id:'beziehungen', lvl:'B1', t:'Relations', i:'💞', w:`
💞|die Beziehung|Beziehungen|la relation||
💍|die Hochzeit|Hochzeiten|le mariage||
💔|die Trennung|Trennungen|la séparation||
📜|die Scheidung|Scheidungen|le divorce||
🤝|das Vertrauen|-|la confiance||
😤|der Streit|Streite|la dispute||
🕊️|sich versöhnen||se réconcilier||
😘|sich verlieben||tomber amoureux|Sie hat sich in ihn verliebt.|Elle est tombée amoureuse de lui.
💒|heiraten||se marier||
🤗|sich verstehen||bien s'entendre|Wir verstehen uns sehr gut.|Nous nous entendons très bien.
🫂|unterstützen||soutenir||
🙏|sich entschuldigen||s'excuser||
💬|sich unterhalten||discuter||
😒|eifersüchtig||jaloux||
🧸|die Kindheit|-|l'enfance||
👨‍👩‍👧|die Erziehung|-|l'éducation (des enfants)||
🫶|der Respekt|-|le respect||
🤞|treu||fidèle||
🙋|der Bekannte|Bekannten|la connaissance (personne)||
😇|ehrlich||honnête||
`},
{ id:'geld', lvl:'B1', t:'Argent & banque', i:'🏦', w:`
🏦|das Konto|Konten|le compte|Ich möchte ein Konto eröffnen.|Je voudrais ouvrir un compte.
💸|überweisen||virer (de l'argent)||
🏧|der Geldautomat|Geldautomaten|le distributeur||
💵|abheben||retirer (de l'argent)||
🧾|die Gebühr|Gebühren|les frais||
📈|die Zinsen|PL|les intérêts||
🏠|die Miete|Mieten|le loyer||
📉|die Schulden|PL|les dettes||
💰|das Einkommen|Einkommen|le revenu||
🧮|die Steuer|Steuern|l'impôt / la taxe||
🛡️|die Versicherung|Versicherungen|l'assurance||
🏷️|günstig||avantageux / bon marché||
💶|bar bezahlen||payer en espèces||
📊|der Kredit|Kredite|le crédit||
🪙|die Münze|Münzen|la pièce de monnaie||
💴|der Schein|Scheine|le billet (de banque)||
🤑|sich leisten||se permettre (financièrement)|Das kann ich mir nicht leisten.|Je ne peux pas me le permettre.
📑|der Kontoauszug|Kontoauszüge|le relevé de compte||
💹|die Ausgaben|PL|les dépenses||
`},
{ id:'mieten', lvl:'B1', t:'Logement & location', i:'🔑', w:`
🧑‍💼|der Vermieter|Vermieter|le propriétaire (bailleur)||
🧑|der Mieter|Mieter|le locataire||
📄|der Mietvertrag|Mietverträge|le bail||
💶|die Kaution|Kautionen|la caution||
💡|die Nebenkosten|PL|les charges||
🚚|umziehen||déménager|Wir ziehen nächsten Monat um.|Nous déménageons le mois prochain.
📦|der Umzug|Umzüge|le déménagement||
🔍|die Wohnungssuche|-|la recherche d'appartement||
📰|die Anzeige|Anzeigen|l'annonce||
🗝️|einziehen||emménager||
🚪|ausziehen||quitter un logement / se déshabiller||
🧑‍🤝‍🧑|die Wohngemeinschaft|Wohngemeinschaften|la colocation (WG)||
🔊|der Lärm|-|le bruit||
🛋️|möbliert||meublé||
📐|der Quadratmeter|Quadratmeter|le mètre carré||
🔥|die Heizung|Heizungen|le chauffage||
🛗|der Aufzug|Aufzüge|l'ascenseur||
🔧|reparieren||réparer||
📍|die Lage|Lagen|l'emplacement||
🧑‍🔧|der Hausmeister|Hausmeister|le concierge / gardien||
`},
{ id:'behoerden', lvl:'B1', t:'Administration', i:'🏛️', w:`
🏛️|die Behörde|Behörden|l'administration||
📝|das Formular|Formulare|le formulaire|Bitte füllen Sie das Formular aus.|Veuillez remplir le formulaire.
✍️|ausfüllen||remplir||
🖋️|unterschreiben||signer||
🪪|der Ausweis|Ausweise|la carte d'identité||
🛂|das Visum|Visa|le visa||
📄|die Aufenthaltserlaubnis|Aufenthaltserlaubnisse|le titre de séjour||
🏢|das Amt|Ämter|le service administratif||
🏠|die Meldebescheinigung|Meldebescheinigungen|l'attestation de domicile||
📮|der Antrag|Anträge|la demande (officielle)||
📨|beantragen||demander officiellement|Ich muss ein Visum beantragen.|Je dois demander un visa.
📑|die Unterlagen|PL|les documents||
⏳|die Frist|Fristen|le délai||
📸|das Passfoto|Passfotos|la photo d'identité||
✅|genehmigen||autoriser / approuver||
📃|die Bescheinigung|Bescheinigungen|l'attestation||
🏳️|die Staatsangehörigkeit|Staatsangehörigkeiten|la nationalité||
🔢|die Steuernummer|Steuernummern|le numéro fiscal||
🎫|die Wartenummer|Wartenummern|le numéro d'attente||
👉|zuständig||compétent / responsable|Welches Amt ist dafür zuständig?|Quel service en est responsable ?
`},
{ id:'verbenB1', lvl:'B1', t:'Verbes B1', i:'⚡', w:`
🌱|sich entwickeln||se développer||
🔓|ermöglichen||permettre / rendre possible||
🚫|verbieten||interdire||
✅|erlauben||autoriser||
🧭|sich orientieren||s'orienter||
⚖️|vergleichen||comparer||
🏆|erreichen||atteindre||
🤔|überlegen||réfléchir||
🫡|sich kümmern um||s'occuper de|Ich kümmere mich um die Kinder.|Je m'occupe des enfants.
👀|bemerken||remarquer||
🗣️|behaupten||affirmer||
😌|sich gewöhnen an||s'habituer à|Ich habe mich an das Wetter gewöhnt.|Je me suis habitué(e) au temps.
💭|sich vorstellen||s'imaginer / se présenter|Stell dir vor!|Imagine-toi !
🧩|lösen||résoudre||
⚠️|warnen||avertir||
📋|planen||planifier||
🙋|teilnehmen an||participer à|Ich nehme an dem Kurs teil.|Je participe au cours.
🔄|verändern||changer, transformer||
🎁|anbieten||offrir / proposer||
😠|sich beschweren||se plaindre|Er beschwert sich über das Essen.|Il se plaint de la nourriture.
🔍|herausfinden||découvrir||
🧱|verhindern||empêcher||
🫵|überzeugen||convaincre||
🙆|akzeptieren||accepter||
😮|sich wundern||s'étonner||
🔀|abhängen von||dépendre de|Das hängt vom Wetter ab.|Ça dépend du temps.
💸|investieren||investir||
⏰|verschieben||reporter||
`},
/* ============================ B2 ============================ */
{ id:'politik', lvl:'B2', t:'Politique & économie', i:'🗳️', w:`
🗳️|die Wahl|Wahlen|l'élection||
🏛️|die Regierung|Regierungen|le gouvernement||
🧑‍💼|der Bundeskanzler|Bundeskanzler|le chancelier fédéral||
🇩🇪|der Bundestag|-|le Bundestag (parlement)||
🎗️|die Partei|Parteien|le parti||
📜|das Gesetz|Gesetze|la loi||
⚖️|das Recht|Rechte|le droit||
🕊️|die Freiheit|Freiheiten|la liberté||
🗽|die Demokratie|Demokratien|la démocratie||
📢|die Opposition|-|l'opposition||
📊|die Wirtschaft|-|l'économie||
📈|das Wachstum|-|la croissance||
💹|die Inflation|-|l'inflation||
🏭|die Industrie|Industrien|l'industrie||
🤝|der Kompromiss|Kompromisse|le compromis||
🚩|die Forderung|Forderungen|la revendication||
✊|die Demonstration|Demonstrationen|la manifestation||
🌐|die Globalisierung|-|la mondialisation||
🇪🇺|die Europäische Union|-|l'Union européenne||
🧾|der Haushalt|Haushalte|le budget / le ménage||
🗣️|die Debatte|Debatten|le débat||
🏢|das Unternehmen|Unternehmen|l'entreprise||
📦|der Export|Exporte|l'exportation||
⚔️|der Konflikt|Konflikte|le conflit||
🎯|die Maßnahme|Maßnahmen|la mesure|Die Regierung ergreift neue Maßnahmen.|Le gouvernement prend de nouvelles mesures.
`},
{ id:'wissenschaft', lvl:'B2', t:'Science & recherche', i:'🔬', w:`
🔬|die Forschung|Forschungen|la recherche||
🧪|das Experiment|Experimente|l'expérience (scientifique)||
📊|die Studie|Studien|l'étude|Laut einer Studie schlafen viele Menschen zu wenig.|Selon une étude, beaucoup de gens dorment trop peu.
🧑‍🔬|der Wissenschaftler|Wissenschaftler|le scientifique||
💡|die Erfindung|Erfindungen|l'invention||
🔎|die Entdeckung|Entdeckungen|la découverte||
🤖|die künstliche Intelligenz|-|l'intelligence artificielle||
🧬|die Gentechnik|-|le génie génétique||
📈|das Ergebnis|Ergebnisse|le résultat||
🧠|die Theorie|Theorien|la théorie||
❔|die Hypothese|Hypothesen|l'hypothèse||
💻|die Digitalisierung|-|la numérisation||
🛰️|die Raumfahrt|-|l'astronautique||
⚙️|die Entwicklung|Entwicklungen|le développement||
📐|die Methode|Methoden|la méthode||
🔭|beobachten||observer||
🧮|berechnen||calculer||
✔️|beweisen||prouver||
📉|der Rückgang|Rückgänge|le recul / la baisse||
⚠️|das Risiko|Risiken|le risque||
🌟|der Fortschritt|Fortschritte|le progrès||
🎯|die Ursache|Ursachen|la cause||
💥|die Auswirkung|Auswirkungen|l'impact / la répercussion||
📋|analysieren||analyser||
`},
{ id:'arbeitswelt', lvl:'B2', t:'Le monde du travail', i:'📈', w:`
📈|die Karriere|Karrieren|la carrière||
🏠|das Homeoffice|-|le télétravail||
⚖️|die Work-Life-Balance|-|l'équilibre vie pro / vie perso||
🔥|der Stress|-|le stress||
😮‍💨|das Burnout|-|le burn-out||
🧑‍💼|die Führungskraft|Führungskräfte|le cadre / le dirigeant||
📋|die Verantwortung|-|la responsabilité||
🤝|die Verhandlung|Verhandlungen|la négociation||
💶|die Gehaltserhöhung|Gehaltserhöhungen|l'augmentation de salaire||
🚪|kündigen||démissionner / licencier|Er hat seinen Job gekündigt.|Il a démissionné.
📝|die Kündigung|Kündigungen|la démission / le licenciement||
🧑‍🏭|der Fachkräftemangel|-|la pénurie de main-d'œuvre qualifiée||
🎯|die Kompetenz|Kompetenzen|la compétence||
🕑|die Teilzeit|-|le temps partiel||
⏰|die Vollzeit|-|le temps plein||
👥|das Team|Teams|l'équipe||
⏱️|der Termindruck|-|la pression des délais||
💡|die Initiative|Initiativen|l'initiative||
🧾|die Probezeit|Probezeiten|la période d'essai||
🙋|der Kunde|Kunden|le client||
📊|der Umsatz|Umsätze|le chiffre d'affaires||
🏆|der Erfolg|Erfolge|le succès||
📉|der Misserfolg|Misserfolge|l'échec||
🔧|die Gewerkschaft|Gewerkschaften|le syndicat||
🪧|der Streik|Streiks|la grève||
`},
{ id:'verbPraep', lvl:'B2', t:'Verbes à préposition', i:'🧲', w:`
🗣️|sprechen über (+Akk)||parler de||
⏳|warten auf (+Akk)||attendre|Ich warte auf den Bus.|J'attends le bus.
💭|denken an (+Akk)||penser à|Ich denke oft an dich.|Je pense souvent à toi.
🙋|sich interessieren für (+Akk)||s'intéresser à|Ich interessiere mich für Geschichte.|Je m'intéresse à l'histoire.
🥳|sich freuen auf (+Akk)||se réjouir de (à venir)||
🎁|sich freuen über (+Akk)||se réjouir de (présent/passé)||
📞|sich erkundigen nach (+Dat)||se renseigner sur||
😨|Angst haben vor (+Dat)||avoir peur de||
🎯|sich konzentrieren auf (+Akk)||se concentrer sur||
🗳️|sich entscheiden für (+Akk)||se décider pour||
🙏|sich bedanken für (+Akk)||remercier pour||
🧩|bestehen aus (+Dat)||se composer de||
💬|diskutieren über (+Akk)||discuter de||
🤲|bitten um (+Akk)||demander (quelque chose)|Ich bitte um Ihr Verständnis.|Je vous demande votre compréhension.
🛡️|sich schützen vor (+Dat)||se protéger de||
📜|sich beziehen auf (+Akk)||se référer à||
🤨|zweifeln an (+Dat)||douter de||
🌙|träumen von (+Dat)||rêver de||
📨|sich bewerben um (+Akk)||postuler à||
🤝|sich verlassen auf (+Akk)||compter sur|Du kannst dich auf mich verlassen.|Tu peux compter sur moi.
✊|sich einsetzen für (+Akk)||s'engager pour||
📚|sich beschäftigen mit (+Dat)||s'occuper de / étudier||
👀|achten auf (+Akk)||faire attention à||
🤬|sich aufregen über (+Akk)||s'énerver contre||
`},
{ id:'nomenVerb', lvl:'B2', t:'Expressions nom + verbe', i:'🧱', w:`
✅|eine Entscheidung treffen||prendre une décision|Wir müssen bald eine Entscheidung treffen.|Nous devons bientôt prendre une décision.
❓|eine Frage stellen||poser une question||
🎯|in Frage kommen||entrer en ligne de compte||
📮|einen Antrag stellen||déposer une demande||
🔍|in Betracht ziehen||prendre en considération||
🙋|zur Verfügung stehen||être à disposition|Ich stehe Ihnen gern zur Verfügung.|Je reste volontiers à votre disposition.
🗨️|zur Sprache bringen||aborder (un sujet)||
🏁|zu Ende bringen||mener à terme||
⚙️|in Kraft treten||entrer en vigueur||
👎|Kritik üben||critiquer||
🤝|Rücksicht nehmen auf||tenir compte de / avoir égard à||
📣|Bescheid sagen||prévenir / informer|Sag mir bitte Bescheid!|Préviens-moi s'il te plaît !
💡|einen Vorschlag machen||faire une proposition||
👋|Abschied nehmen||faire ses adieux||
🧱|einen Beitrag leisten||apporter une contribution||
⚠️|in Gefahr geraten||se retrouver en danger||
📎|Bezug nehmen auf||se référer à||
🎛️|Einfluss nehmen auf||exercer une influence sur||
🏋️|Verantwortung übernehmen||assumer la responsabilité||
💎|Wert legen auf||attacher de l'importance à|Wir legen großen Wert auf Qualität.|Nous attachons une grande importance à la qualité.
`},
{ id:'konnB2', lvl:'B2', t:'Connecteurs avancés', i:'🔗', w:`
⚖️|einerseits ... andererseits||d'un côté ... de l'autre||
➕|außerdem||de plus||
➕|darüber hinaus||en outre||
➡️|folglich||par conséquent||
🔀|stattdessen||au lieu de cela||
🧱|dennoch||néanmoins||
🔄|hingegen||en revanche||
🧩|zwar ... aber||certes ... mais|Das Auto ist zwar alt, aber es fährt gut.|La voiture est certes vieille, mais elle roule bien.
⛓️|sowohl ... als auch||aussi bien ... que||
🚫|weder ... noch||ni ... ni||
📈|je ... desto||plus ... plus|Je mehr ich lerne, desto besser spreche ich.|Plus j'apprends, mieux je parle.
🔀|entweder ... oder||soit ... soit||
💬|nicht nur ... sondern auch||non seulement ... mais aussi||
⌛|sobald||dès que||
⏳|solange||tant que||
🕰️|inzwischen||entre-temps||
🎯|insofern||dans cette mesure||
🌐|im Allgemeinen||en général||
📌|vor allem||surtout||
🔍|tatsächlich||effectivement / en fait||
🧾|zusammenfassend||en résumé||
❗|allerdings||toutefois / cependant||
🙃|trotzdem||malgré tout||
🕵️|anscheinend||apparemment||
➡️|somit||ainsi / donc||
`},
{ id:'adjB2', lvl:'B2', t:'Adjectifs avancés', i:'💎', w:`
🧩|komplex||complexe||
🎯|zuverlässig||fiable||
🧭|selbstständig||autonome / indépendant||
🤝|hilfsbereit||serviable||
🔥|leidenschaftlich||passionné||
🧐|kritisch||critique||
💡|kreativ||créatif||
📏|sachlich||objectif / factuel||
😤|ungeduldig||impatient||
🛡️|vorsichtig||prudent||
😮|erstaunlich||étonnant||
🔒|unvermeidlich||inévitable||
⚖️|gerecht||juste (équitable)||
❓|fraglich||douteux / incertain||
🤫|vertraulich||confidentiel||
🌍|weltweit||mondial||
🏛️|öffentlich||public||
🏠|privat||privé||
🧗|anspruchsvoll||exigeant||
🆗|angemessen||approprié||
✨|vielfältig||varié / diversifié||
🔀|widersprüchlich||contradictoire||
🎚️|erheblich||considérable||
🥇|überlegen||supérieur||
`},
{ id:'idiome', lvl:'B2', t:'Expressions idiomatiques', i:'🐷', w:`
🍅|Tomaten auf den Augen haben||ne pas voir l'évidence|Hast du Tomaten auf den Augen?|Tu es aveugle ou quoi ?
🐷|Schwein haben||avoir de la chance||
🌭|Das ist mir Wurst.||Je m'en fiche.||
🧀|Das ist doch Käse!||C'est n'importe quoi !||
🤞|jemandem die Daumen drücken||croiser les doigts pour quelqu'un|Ich drücke dir die Daumen!|Je croise les doigts pour toi !
🐻|jemandem einen Bären aufbinden||raconter des bobards à quelqu'un||
☁️|aus allen Wolken fallen||tomber des nues||
👄|kein Blatt vor den Mund nehmen||ne pas mâcher ses mots||
🧠|auf dem Schlauch stehen||ne pas piger / bloquer||
🫕|ins Fettnäpfchen treten||faire une gaffe||
👂|ganz Ohr sein||être tout ouïe||
🧸|Das ist ein Kinderspiel.||C'est un jeu d'enfant.||
⏰|Es ist höchste Zeit.||Il est grand temps.|Es ist höchste Zeit, dass wir gehen.|Il est grand temps que nous partions.
🐌|im Schneckentempo||à une allure d'escargot||
👃|die Nase voll haben||en avoir marre|Ich habe die Nase voll!|J'en ai marre !
🔥|Feuer und Flamme sein||être très enthousiaste||
🧱|gegen eine Wand reden||parler à un mur||
🚉|Ich verstehe nur Bahnhof.||Je n'y comprends rien.||
🦵|jemandem ein Bein stellen||mettre des bâtons dans les roues à quelqu'un||
🪑|etwas auf die lange Bank schieben||remettre à plus tard||
🔨|den Nagel auf den Kopf treffen||mettre le doigt dessus||
🎯|den Vogel abschießen||décrocher le pompon||
🥣|um den heißen Brei herumreden||tourner autour du pot||
`}
];
