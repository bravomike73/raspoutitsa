/* Raspoutitsa : bots du mode solo — 10 bots russes (9 nov. 2026) et 10 bots français (10 nov. 2026).
   Profils : classeur « Profils des bots » de Ben (10 bots, de Popov à Joukov), converti en données ci-dessous.
   Le cœur (RaspBotCore) reçoit le moteur d'arbitrage de la page (R) et ces profils. */
// 12 nov. : intention navale sur le plateau Suwałki (un bot sur deux dans chaque camp) : cote = gagner le fuseau de Kaliningrad, nav = détruire le NAV adverse, raid = réussir un Raid amphibie
var RASP_BOT_NAVI = {"popov":"cote","ivan":"raid","toukhatchevski":"nav","tchouikov":"cote","koniev":"raid","tim":"cote","jeanmichel":"nav","santo":"raid","ardant":"cote","beaufre":"nav"};
const RASP_BOT_PROFILS = [
{
"id": "popov",
"rang": 1,
"nom": "Popov",
"desc": "Le soldat Popov a bu trop de vodka, il appuie sur tous les boutons sans réfléchir.",
"niveau": 1,
"camps": "Rouge",
"cache": "Non",
"msgDep": "Camp : Rouge\nPC : Valouïki 0\nBSC : Novoaïdar 0\nPOW : Milerovo 0\nDIV+ : Louhansk 0\nINF : Kharkiv Rouge 1, Izioum Rouge 1, Donetsk Rouge 1\nMP : Kharkiv Rouge 3, Pavlosk 1, Garde POW, Garde POW, Louhansk 1\nCIMIC : Izioum Rouge 3, Bogoutchar 1, Kalatch 2, Vechenskaïa 2, Morozovsk 2\nDSA : Izioum Rouge 2, Milerovo 1, Vechenskaïa 1, Kalatch 1\nGEN : Pavlosk 3, Sovetskaya 2, Milerovo 2\nART CA : Kharkiv Rouge 2, Valouïki 2, Novoaïdar 2\nEW : Donetsk Rouge 2, Pavlosk 2, Bogoutchar 2\nGAM : Novoaïdar 1\nRéseau LOG : E3 2, R11 2, R10 2, RI 1, E4 5, R15 5, RD 1, E2 2, R7 2, R6 2, R3 2, RK 2, E1 1, R2 1",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Frappe drone;effet T3;retour T5;;Dnipro 4;; || 2;Renseignement aérien;effet T3;retour T6;Kharkiv;;; || 3;Raid aéro;effet T6;retour T9;;Mykolaïv 2;; || 4;Renfort de feu;effet T2;retour T3;Donetsk;;Izioum Rouge ART Sud; || 5;Maquis de partisans;effet T8;retour T15;Kropyvnytskyï;;;",
"agress": 3,
"prudence": 1,
"imprevu": 0.4,
"constance": "S'adapte un peu",
"effort": "Les trois fuseaux",
"fuseau": "Au hasard",
"mobilite": "Statique",
"ruse": 2,
"critique": 0.1,
"raisonne": "Idées reçues",
"calcule": "Jamais",
"imperatifs": "Parfois",
"enchaine": "Jamais",
"reserve": "Garde 2 cartes ou plus",
"memoire": "Toute la partie",
"tourBlanc": 0.2,
"r_percer": 1,
"r_tenir": 2,
"r_div": 3,
"r_bsc": 11,
"r_pc": 10,
"r_cb": 9,
"r_rens": 7,
"r_proteger": 6,
"r_log": 5,
"r_env": 8,
"r_accu": 4,
"posPC": "Près du front",
"posBSC": "Près du front",
"posDIV": "Milieu du Rear",
"gardePOW": 0,
"dsa": "Réparties",
"posART": "Mixtes",
"reseau": "Minimum partout",
"fortifie": "Jamais",
"seuilDiv": 20,
"fusDiv": "Au hasard",
"salve": "Jamais",
"rensAvant": "Jamais",
"rensMin": 0,
"scoot": "Jamais",
"assautBP": "Dès que possible",
"maquis": "Jamais",
"effortLog": "Jamais",
"appuiClose": "Rarement",
"justice": "Jamais",
"x_pc": "Ignore",
"x_bsc": "Ignore",
"x_div": "Ignore",
"x_pow": "Riposte",
"x_art": "Ignore",
"x_repere": "Ignore",
"x_engENI": "Ignore",
"x_recule": "Ignore",
"x_percer": "Garde la DIV+ en réserve",
"x_coupe": "Ignore",
"x_jauge": "Change rien",
"x_dsa": "Ignore",
"x_echec": "Rejoue la même dès son retour",
"x_finMene": "Continue pareil",
"x_finMen": "Continue pareil",
"e_danger": "Souvent",
"e_pow": "Souvent",
"e_sansFlux": "Souvent",
"e_memeFus": "Rarement",
"e_vieux": "Souvent",
"e_bascule": "Jamais",
"e_divLoin": "Toujours",
"b_sead": "Jamais",
"b_cb": "Jamais",
"b_garde": "Rarement",
"remarques": "Comportement erratique"
},
{
"id": "boris",
"rang": 2,
"nom": "Boris",
"desc": "Le sous-lieutenant Boris est seul à la semaine de la 3°AIA. Il fait de son mieux.",
"niveau": 2,
"camps": "Rouge",
"cache": "Oui",
"msgDep": "Camp : Rouge\nPC : Novoaïdar 0\nBSC : Vechenskaïa 0\nPOW : Bogoutchar 0\nDIV+ : Louhansk 0\nINF : Garde POW, Garde POW, Kharkiv Rouge 2, Kharkiv Rouge 1, Izioum Rouge 1\nMP : Louhansk 3, Novoaïdar 3, Morozovsk 2, Milerovo 2, Pavlosk 1\nCIMIC : Donetsk Rouge 1, Donetsk Rouge 2, Izioum Rouge 3, Izioum Rouge 2, Kharkiv Rouge 3\nDSA : Louhansk 1, Novoaïdar 1, Milerovo 1, Morozovsk 1, Bogoutchar 2\nGEN : Milerovo 3, Bogoutchar 1, Vechenskaïa 3\nART CA : Louhansk 2, Valouïki 1, Vechenskaïa 1\nEW : Donetsk Rouge 3, Novoaïdar 2, Valouïki 2\nGAM : Vechenskaïa 2\nRéseau LOG : E4 5, R15 5, RD 2, RK 1, R1 1, R2 1, E1 1, RI 2, R10 2, R11 3, E3 4, R13 1, E2 1, R9 1",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;ROHUM;effet T5;retour T8;Lysanka;;; || 2;Effort LOG;effet T4;retour T8;DIV+;;; || 3;Frappe en profondeur;effet T2;retour T4;;Donetsk Bleu ART Nord;Valouïki 1; || 4;Frappe en profondeur;effet T2;retour T4;;Donetsk Bleu ART Nord;Louhansk 2; || 5;Raid aéro;effet T6;retour T9;;Donetsk Bleu ART Sud;; || 6;Effort COM;effet T5;retour T6;Donetsk;;;",
"agress": 5,
"prudence": 2,
"imprevu": 0.2,
"constance": "S'adapte un peu",
"effort": "Un seul fuseau",
"fuseau": "Izioum (centre)",
"mobilite": "Peu mobile",
"ruse": 1,
"critique": 0.4,
"raisonne": "Idées reçues",
"calcule": "Rarement",
"imperatifs": "Souvent",
"enchaine": "Parfois",
"reserve": "Garde 1 carte en réserve",
"memoire": "Toute la partie",
"tourBlanc": 0.1,
"r_percer": 1,
"r_tenir": 4,
"r_div": 3,
"r_bsc": 8,
"r_pc": 9,
"r_cb": 5,
"r_rens": 6,
"r_proteger": 10,
"r_log": 7,
"r_env": 11,
"r_accu": 2,
"posPC": "Près du front",
"posBSC": "Loin du front",
"posDIV": "Région d'accès d'un fuseau",
"gardePOW": 1,
"dsa": "DIV+",
"posART": "Mixtes",
"reseau": "Concentrée sur l'effort",
"fortifie": "Après une frappe",
"seuilDiv": 60,
"fusDiv": "Son fuseau d'effort",
"salve": "Toujours",
"rensAvant": "Rarement",
"rensMin": 1,
"scoot": "Rarement",
"assautBP": "Sur un grand pion repéré",
"maquis": "Tôt dans la partie",
"effortLog": "Seulement sous 50 %",
"appuiClose": "Chaque tour",
"justice": "Quand le POW est plein",
"x_pc": "Riposte",
"x_bsc": "Riposte",
"x_div": "Riposte",
"x_pow": "Riposte",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe tout de suite",
"x_engENI": "Engage sa propre DIV+ ailleurs",
"x_recule": "Ignore",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Riposte",
"x_jauge": "Va au plus offensif",
"x_dsa": "Fortifie",
"x_echec": "Change de cible",
"x_finMene": "Accélère",
"x_finMen": "Assaut de la BP et Maquis",
"e_danger": "Parfois",
"e_pow": "Parfois",
"e_sansFlux": "Parfois",
"e_memeFus": "Souvent",
"e_vieux": "Souvent",
"e_bascule": "Rarement",
"e_divLoin": "Jamais",
"b_sead": "Rarement",
"b_cb": "Souvent",
"b_garde": "Rarement",
"remarques": "Agressif"
},
{
"id": "ivan",
"rang": 3,
"nom": "Ivan",
"desc": "Le colonel Ivan a obtenu ses galons par conformisme politique, il est donc particulièrement compétent.",
"niveau": 2,
"camps": "Rouge",
"cache": "Oui",
"msgDep": "Camp : Rouge\nPC : Vechenskaïa 0\nBSC : Kalatch 0\nPOW : Morozovsk 0\nDIV+ : Sovetskaya 0\nINF : Pavlosk 1, Kalatch 3, Sovetskaya 1, Milerovo 1, Valouïki 3\nMP : Vechenskaïa 2, Garde POW, Garde POW, Garde POW, Milerovo 2\nCIMIC : Pavlosk 2, Kharkiv Rouge 1, Izioum Rouge 3, Donetsk Rouge 1\nDSA : Vechenskaïa 1, Kalatch 1, Pavlosk 3, Bogoutchar 3, Izioum Rouge 1\nGEN : Vechenskaïa 3, Sovetskaya 3, Valouïki 2\nART CA : Bogoutchar 2, Kalatch 2, Kharkiv Rouge 2\nEW : Bogoutchar 1, Kharkiv Rouge 3, Izioum Rouge 2\nGAM : Sovetskaya 2\nRéseau LOG : E1 3, E2 3, E3 5, R11 2, R13 2, RD 2, R7 2, R6 2, RI 2, R2 2, R1 2, RK 2, R9 1",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Vechenskaïa 0 · Ouvrir l'emplacement Valouïki 4 || 2;Renseignement SAT;effet T2;retour T4;Kharkiv;;; || 3;Renseignement drone;effet T2;retour T4;Izioum;;; || 4;OSINT;effet T5;retour T6;Zaporijjia;;; || 5;Effort LOG;effet T4;retour T8;DIV+;;;",
"agress": 1,
"prudence": 5,
"imprevu": 0.2,
"constance": "S'en tient au plan",
"effort": "Les trois fuseaux",
"fuseau": "Au hasard",
"mobilite": "Peu mobile",
"ruse": 2,
"critique": 0.4,
"raisonne": "Idées reçues",
"calcule": "Rarement",
"imperatifs": "Souvent",
"enchaine": "Parfois",
"reserve": "Garde 1 carte en réserve",
"memoire": "Toute la partie",
"tourBlanc": 0.1,
"r_percer": 11,
"r_tenir": 3,
"r_div": 9,
"r_bsc": 10,
"r_pc": 7,
"r_cb": 8,
"r_rens": 4,
"r_proteger": 1,
"r_log": 2,
"r_env": 6,
"r_accu": 5,
"posPC": "Loin du front",
"posBSC": "Loin du front",
"posDIV": "Loin du front",
"gardePOW": 3,
"dsa": "PC",
"posART": "En retrait",
"reseau": "Priorité à la DIV+",
"fortifie": "Après une frappe",
"seuilDiv": 100,
"fusDiv": "Au hasard",
"salve": "Sur une cible de valeur",
"rensAvant": "Rarement",
"rensMin": 1,
"scoot": "Rarement",
"assautBP": "En dernier recours",
"maquis": "Jamais",
"effortLog": "Seulement sous 50 %",
"appuiClose": "Rarement",
"justice": "Quand le POW est plein",
"x_pc": "Bascule de PC",
"x_bsc": "Fortifie",
"x_div": "Fortifie",
"x_pow": "Renforce la garde",
"x_art": "Ignore",
"x_repere": "Frappe tout de suite",
"x_engENI": "Renforce ce fuseau",
"x_recule": "Renforce ce fuseau",
"x_percer": "Garde la DIV+ en réserve",
"x_coupe": "Ignore",
"x_jauge": "Joue plus prudent",
"x_dsa": "Remplace les DSA",
"x_echec": "Rejoue la même dès son retour",
"x_finMene": "Se défend",
"x_finMen": "Continue pareil",
"e_danger": "Parfois",
"e_pow": "Parfois",
"e_sansFlux": "Parfois",
"e_memeFus": "Souvent",
"e_vieux": "Souvent",
"e_bascule": "Rarement",
"e_divLoin": "Toujours",
"b_sead": "Rarement",
"b_cb": "Parfois",
"b_garde": "Toujours",
"remarques": "Très défensif, surtout pour son PC"
},
{
"id": "svietchine",
"rang": 4,
"nom": "Svietchine",
"desc": "Le professeur va vous donner une leçon.",
"niveau": 3,
"camps": "Rouge",
"cache": "Oui",
"msgDep": "Camp : Rouge\nPC : Sovetskaya 0\nBSC : Milerovo 0\nPOW : Pavlosk 0\nDIV+ : Vechenskaïa 0\nINF : Garde POW, Kharkiv Rouge 3, Donetsk Rouge 3, Novoaïdar 3, Louhansk 2\nMP : Vechenskaïa 3, Sovetskaya 3, Milerovo 3, Garde POW, Valouïki 3\nCIMIC : Kharkiv Rouge 1, Izioum Rouge 2, Donetsk Rouge 2, Novoaïdar 2, Bogoutchar 2\nDSA : Vechenskaïa 1, Milerovo 1, Sovetskaya 1, Donetsk Rouge 1, Izioum Rouge 1\nGEN : Sovetskaya 2, Vechenskaïa 2, Milerovo 2\nART CA : Valouïki 1, Novoaïdar 1, Louhansk 1\nEW : Kharkiv Rouge 2, Izioum Rouge 3, Valouïki 2\nGAM : Bogoutchar 3\nRéseau LOG : RD 2, R15 2, E4 3, E3 3, R11 3, R10 2, RI 2, E1 2, R2 2, R1 2, RK 2, E2 5",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Milerovo 0 · Fortifier Sovetskaya 0 · Fortifier Vechenskaïa 0 || 2;Effort LOG;effet T4;retour T8;Donetsk;;; || 3;Renseignement drone;effet T2;retour T4;Poltava;;; || 4;Renseignement SAT;effet T2;retour T4;Dnipro;;; || 5;Contre-batterie;effet T3;retour T6;Poltava;;Valouïki 1;",
"agress": 2,
"prudence": 4,
"imprevu": 0.1,
"constance": "S'adapte un peu",
"effort": "Les trois fuseaux",
"fuseau": "Le plus menacé",
"mobilite": "Mobile",
"ruse": 4,
"critique": 0.7,
"raisonne": "Recoupe ce qu'il voit",
"calcule": "Parfois",
"imperatifs": "Toujours",
"enchaine": "Souvent",
"reserve": "Toujours le maximum",
"memoire": "10 tours",
"tourBlanc": 0.05,
"r_percer": 11,
"r_tenir": 1,
"r_div": 2,
"r_bsc": 3,
"r_pc": 10,
"r_cb": 4,
"r_rens": 5,
"r_proteger": 7,
"r_log": 6,
"r_env": 9,
"r_accu": 8,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Loin du front",
"gardePOW": 2,
"dsa": "BSC",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": 100,
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Quand un fuseau recule",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Fortifie",
"x_pow": "Ignore",
"x_art": "Déplace les autres ART CA",
"x_repere": "Confirme puis frappe",
"x_engENI": "Renforce ce fuseau",
"x_recule": "Renforce ce fuseau",
"x_percer": "Garde la DIV+ en réserve",
"x_coupe": "Retrace le réseau",
"x_jauge": "Joue plus prudent",
"x_dsa": "Fortifie",
"x_echec": "Change de cible",
"x_finMene": "Continue pareil",
"x_finMen": "Continue pareil",
"e_danger": "Rarement",
"e_pow": "Rarement",
"e_sansFlux": "Rarement",
"e_memeFus": "Souvent",
"e_vieux": "Parfois",
"e_bascule": "Parfois",
"e_divLoin": "Rarement",
"b_sead": "Parfois",
"b_cb": "Souvent",
"b_garde": "Toujours",
"remarques": "Défensif et intelligent"
},
{
"id": "toukhatchevski",
"rang": 5,
"nom": "Toukhatchevski",
"desc": "L'homme qui a mécanisé l'armée rouge va vous rouler dessus.",
"niveau": 3,
"camps": "Rouge",
"cache": "Oui",
"msgDep": "Camp : Rouge\nPC : Vechenskaïa 0\nBSC : Milerovo 0\nPOW : Kalatch 0\nDIV+ : Sovetskaya 0\nINF : Kharkiv Rouge 1, Morozovsk 1, Novoaïdar 1, Louhansk 2, Garde POW\nMP : Vechenskaïa 3, Milerovo 3, Sovetskaya 3, Garde POW, Louhansk 1\nCIMIC : Donetsk Rouge 3, Izioum Rouge 3, Kharkiv Rouge 3, Kharkiv Rouge 2, Bogoutchar 3\nDSA : Sovetskaya 1, Vechenskaïa 1, Milerovo 1, Donetsk Rouge 1, Izioum Rouge 1\nGEN : Vechenskaïa 2, Milerovo 2, Sovetskaya 2\nART CA : Bogoutchar 2, Valouïki 2, Novoaïdar 2\nEW : Donetsk Rouge 2, Izioum Rouge 2, Valouïki 3\nGAM : Novoaïdar 3\nRéseau LOG : E3 5, E4 3, R15 3, RD 3, E2 4, R7 4, R6 3, RI 2, R3 1, RK 1, R8 1",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Effort LOG;effet T4;retour T8;Donetsk;;; || 2;Travaux du GEN;effet T4;retour T5;;;;Fortifier Vechenskaïa 0 · Fortifier Sovetskaya 0 · Fortifier Milerovo 0 || 3;Ecoute GE;effet T3;retour T5;Donetsk;;; || 4;Renseignement drone;effet T2;retour T4;Donetsk;;; || 5;Effort COM;effet T5;retour T6;Donetsk;;;",
"agress": 4,
"prudence": 3,
"imprevu": 0.1,
"constance": "S'adapte un peu",
"effort": "Un seul fuseau",
"fuseau": "Le plus favorable",
"mobilite": "Mobile",
"ruse": 2,
"critique": 0.7,
"raisonne": "Recoupe ce qu'il voit",
"calcule": "Parfois",
"imperatifs": "Toujours",
"enchaine": "Souvent",
"reserve": "Toujours le maximum",
"memoire": "10 tours",
"tourBlanc": 0.05,
"r_percer": 1,
"r_tenir": 6,
"r_div": 5,
"r_bsc": 10,
"r_pc": 9,
"r_cb": 4,
"r_rens": 7,
"r_proteger": 8,
"r_log": 3,
"r_env": 11,
"r_accu": 2,
"posPC": "Milieu du Rear",
"posBSC": "Milieu du Rear",
"posDIV": "Région d'accès d'un fuseau",
"gardePOW": 2,
"dsa": "DIV+",
"posART": "En retrait",
"reseau": "Concentrée sur l'effort",
"fortifie": "Dès le tour 1",
"seuilDiv": 70,
"fusDiv": "Celui où il gagne",
"salve": "Toujours",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "Sur un grand pion repéré",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Chaque tour",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Engage la DIV+ tout de suite",
"x_pow": "Ignore",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe tout de suite",
"x_engENI": "Engage sa propre DIV+ ailleurs",
"x_recule": "Ignore",
"x_percer": "Pousse ce fuseau",
"x_coupe": "Ouverture d'itinéraire",
"x_jauge": "Va au plus offensif",
"x_dsa": "Remplace les DSA",
"x_echec": "Change de carte",
"x_finMene": "Accélère",
"x_finMen": "Tout pour percer",
"e_danger": "Rarement",
"e_pow": "Rarement",
"e_sansFlux": "Rarement",
"e_memeFus": "Jamais",
"e_vieux": "Parfois",
"e_bascule": "Parfois",
"e_divLoin": "Rarement",
"b_sead": "Parfois",
"b_cb": "Souvent",
"b_garde": "Parfois",
"remarques": "Offensif et intelligent"
},
{
"id": "gerasimov",
"rang": 6,
"nom": "Gerasimov",
"desc": "Confrontez vous à l'homme, et à la doctrine.",
"niveau": 3,
"camps": "Rouge",
"cache": "Oui",
"msgDep": "Camp : Rouge\nPC : Pavlosk 0\nBSC : Milerovo 0\nPOW : Morozovsk 0\nDIV+ : Sovetskaya 0\nINF : Kharkiv Rouge 3, Bogoutchar 3, Louhansk 2, Novoaïdar 1, Valouïki 1\nMP : Pavlosk 3, Sovetskaya 3, Milerovo 3, Garde POW, Garde POW\nCIMIC : Kharkiv Rouge 1, Izioum Rouge 1, Donetsk Rouge 1, Donetsk Rouge 2, Vechenskaïa 1\nDSA : Pavlosk 2, Milerovo 2, Sovetskaya 2, Izioum Rouge 2, Kharkiv Rouge 2\nGEN : Pavlosk 1, Milerovo 1, Sovetskaya 1\nART CA : Novoaïdar 2, Valouïki 2, Bogoutchar 2\nEW : Izioum Rouge 3, Donetsk Rouge 3, Morozovsk 2\nGAM : Vechenskaïa 2\nRéseau LOG : E3 5, E2 3, R7 3, R8 1, R6 2, RI 2, RD 2, R15 2, E4 2, RK 2, R1 2, R2 2, E1 2",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;ROHUM;effet T5;retour T8;Lysanka;;; || 2;Travaux du GEN;effet T4;retour T5;;;;Fortifier Sovetskaya 0 · Fortifier Milerovo 0 · Fortifier Pavlosk 0 || 3;Intox L2I;effet T7;retour T8;Zaporijjia;;; || 4;Renseignement SAT;effet T2;retour T4;Bobrynets;;; || 5;OSINT;effet T5;retour T6;Tcherkassy;;;",
"agress": 3,
"prudence": 4,
"imprevu": 0.1,
"constance": "S'adapte un peu",
"effort": "Deux fuseaux",
"fuseau": "Au hasard",
"mobilite": "Mobile",
"ruse": 5,
"critique": 0.7,
"raisonne": "Recoupe ce qu'il voit",
"calcule": "Parfois",
"imperatifs": "Toujours",
"enchaine": "Souvent",
"reserve": "Toujours le maximum",
"memoire": "10 tours",
"tourBlanc": 0.05,
"r_percer": 11,
"r_tenir": 8,
"r_div": 4,
"r_bsc": 2,
"r_pc": 3,
"r_cb": 6,
"r_rens": 5,
"r_proteger": 9,
"r_log": 7,
"r_env": 1,
"r_accu": 10,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Milieu du Rear",
"gardePOW": 2,
"gardeMP": "Oui",
"dsa": "Réparties",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": "Jamais sauf pour percer",
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "Sur un grand pion repéré",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Quand un fuseau recule",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe en salve",
"x_engENI": "Frappe la DIV+ ENI",
"x_recule": "Ajoute des flux LOG",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Retrace le réseau",
"x_jauge": "Joue plus prudent",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de cible",
"x_finMene": "Continue pareil",
"x_finMen": "Assaut de la BP et Maquis",
"e_danger": "Rarement",
"e_pow": "Rarement",
"e_sansFlux": "Rarement",
"e_memeFus": "Parfois",
"e_vieux": "Parfois",
"e_bascule": "Parfois",
"e_divLoin": "Rarement",
"b_sead": "Parfois",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Vise d'abord le deep"
},
{
"id": "tchouikov",
"rang": 7,
"nom": "Tchouïkov",
"desc": "Le lion de Stalingrad ne recule jamais.",
"niveau": 4,
"camps": "Rouge",
"cache": "Oui",
"msgDep": "Camp : Rouge\nPC : Pavlosk 0\nBSC : Bogoutchar 0\nPOW : Morozovsk 0\nDIV+ : Vechenskaïa 0\nINF : Kharkiv Rouge 3, Donetsk Rouge 3, Valouïki 1, Louhansk 1, Sovetskaya 1\nMP : Pavlosk 3, Garde POW, Bogoutchar 3, Vechenskaïa 3, Novoaïdar 1\nCIMIC : Kharkiv Rouge 2, Izioum Rouge 3, Donetsk Rouge 2, Louhansk 2, Valouïki 2\nDSA : Pavlosk 1, Vechenskaïa 1, Bogoutchar 1, Izioum Rouge 1, Kharkiv Rouge 1\nGEN : Pavlosk 2, Bogoutchar 2, Vechenskaïa 2\nART CA : Valouïki 3, Novoaïdar 2, Milerovo 1\nEW : Donetsk Rouge 1, Izioum Rouge 2, Milerovo 2\nGAM : Novoaïdar 3\nRéseau LOG : E2 5, E1 2, R2 2, R1 2, RK 2, E3 3, R11 3, R10 2, RI 2, R8 1, E4 2, R15 2, RD 2",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Pavlosk 0 · Fortifier Bogoutchar 0 · Fortifier Vechenskaïa 0 || 2;Renseignement SAT;effet T2;retour T4;Tcherkassy;;; || 3;OSINT;effet T5;retour T6;Lysanka;;; || 4;Ecoute GE;effet T3;retour T5;Izioum;;; || 5;Effort LOG;effet T4;retour T8;Izioum;;;",
"agress": 2,
"prudence": 4,
"imprevu": 0,
"constance": "S'adapte beaucoup",
"effort": "Deux fuseaux",
"fuseau": "Le plus menacé",
"mobilite": "Mobile",
"ruse": 3,
"critique": 0.9,
"raisonne": "Anticipe l'ENI",
"calcule": "Souvent",
"imperatifs": "Toujours",
"enchaine": "Toujours",
"reserve": "Toujours le maximum",
"memoire": "3 tours",
"tourBlanc": 0,
"r_percer": 5,
"r_tenir": 1,
"r_div": 8,
"r_bsc": 9,
"r_pc": 10,
"r_cb": 6,
"r_rens": 7,
"r_proteger": 3,
"r_log": 2,
"r_env": 11,
"r_accu": 4,
"posPC": "Près du front",
"posBSC": "Milieu du Rear",
"posDIV": "Région d'accès d'un fuseau",
"gardePOW": 2,
"gardeMP": "Oui",
"dsa": "PC",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": 60,
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Sur un grand pion repéré",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Chaque tour",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Renseigne l'ART ENI",
"x_repere": "Frappe tout de suite",
"x_engENI": "Renforce ce fuseau",
"x_recule": "Renforce ce fuseau",
"x_percer": "Pousse ce fuseau",
"x_coupe": "Ouverture d'itinéraire",
"x_jauge": "Joue plus prudent",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de carte",
"x_finMene": "Continue pareil",
"x_finMen": "Continue pareil",
"e_danger": "Rarement",
"e_pow": "Jamais",
"e_sansFlux": "Jamais",
"e_memeFus": "Rarement",
"e_vieux": "Rarement",
"e_bascule": "Souvent",
"e_divLoin": "Jamais",
"b_sead": "Souvent",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Très intelligent"
},
{
"id": "rokossovski",
"rang": 8,
"nom": "Rokossovski",
"desc": "L'homme qui a survécu aux purges va vous en mettre plein les dents.",
"niveau": 4,
"camps": "Rouge",
"cache": "Oui",
"msgDep": "Camp : Rouge\nPC : Pavlosk 0\nBSC : Sovetskaya 0\nPOW : Kalatch 0\nDIV+ : Vechenskaïa 0\nINF : Kalatch 3, Valouïki 1, Milerovo 1, Morozovsk 1, Novoaïdar 1\nMP : Pavlosk 3, Vechenskaïa 3, Sovetskaya 3, Louhansk 1, Garde POW\nCIMIC : Kharkiv Rouge 3, Donetsk Rouge 3, Izioum Rouge 1, Kharkiv Rouge 1, Kharkiv Rouge 2\nDSA : Pavlosk 1, Vechenskaïa 1, Sovetskaya 1, Izioum Rouge 2, Donetsk Rouge 1\nGEN : Pavlosk 2, Vechenskaïa 2, Sovetskaya 2\nART CA : Kalatch 2, Valouïki 2, Louhansk 2\nEW : Izioum Rouge 3, Donetsk Rouge 2, Kalatch 1\nGAM : Valouïki 3\nRéseau LOG : E2 5, E1 3, R2 2, R1 2, RK 2, E3 3, R11 2, R10 2, RI 2, E4 2, R15 2, RD 2, R5 1",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Pavlosk 0 · Fortifier Vechenskaïa 0 · Fortifier Sovetskaya 0 || 2;Frappe en profondeur;effet T2;retour T4;;Kharkiv Bleu ART Nord;Valouïki 2; || 3;Frappe en profondeur;effet T2;retour T4;;Kharkiv Bleu ART Nord;Kalatch 2; || 4;Frappe en profondeur;effet T2;retour T4;;Kharkiv Bleu ART Sud;Louhansk 2; || 5;Renseignement SAT;effet T2;retour T4;Lysanka;;; || 6;OSINT;effet T5;retour T6;Bobrynets;;; || 7;Effort LOG;effet T4;retour T8;DIV+;;;",
"agress": 3,
"prudence": 4,
"imprevu": 0,
"constance": "S'adapte beaucoup",
"effort": "Deux fuseaux",
"fuseau": "Izioum (centre)",
"mobilite": "Très mobile",
"ruse": 4,
"critique": 0.9,
"raisonne": "Anticipe l'ENI",
"calcule": "Souvent",
"imperatifs": "Toujours",
"enchaine": "Toujours",
"reserve": "Toujours le maximum",
"memoire": "5 tours",
"tourBlanc": 0,
"r_percer": 2,
"r_tenir": 4,
"r_div": 9,
"r_bsc": 11,
"r_pc": 10,
"r_cb": 7,
"r_rens": 6,
"r_proteger": 3,
"r_log": 5,
"r_env": 8,
"r_accu": 1,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Loin du front",
"gardePOW": 1,
"gardeMP": "Oui",
"dsa": "Les ART CA",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": "Jamais sauf pour percer",
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Sur un grand pion repéré",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Quand un fuseau recule",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Renseigne l'ART ENI",
"x_repere": "Confirme puis frappe",
"x_engENI": "Frappe la DIV+ ENI",
"x_recule": "Ajoute des flux LOG",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Retrace le réseau",
"x_jauge": "Joue plus prudent",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de carte",
"x_finMene": "Continue pareil",
"x_finMen": "Continue pareil",
"e_danger": "Rarement",
"e_pow": "Jamais",
"e_sansFlux": "Jamais",
"e_memeFus": "Rarement",
"e_vieux": "Rarement",
"e_bascule": "Souvent",
"e_divLoin": "Jamais",
"b_sead": "Souvent",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Modéré et très intelligent"
},
{
"id": "koniev",
"rang": 9,
"nom": "Koniev",
"desc": "Préparez-vous à vous faire raser comme Berlin.",
"niveau": 4,
"camps": "Rouge",
"cache": "Oui",
"msgDep": "Camp : Rouge\nPC : Kalatch 0\nBSC : Bogoutchar 0\nPOW : Morozovsk 0\nDIV+ : Sovetskaya 0\nINF : Pavlosk 1, Kharkiv Rouge 2, Kharkiv Rouge 3, Valouïki 1, Vechenskaïa 1\nMP : Kalatch 3, Bogoutchar 3, Sovetskaya 3, Garde POW, Novoaïdar 2\nCIMIC : Kharkiv Rouge 1, Izioum Rouge 2, Donetsk Rouge 2, Louhansk 2, Milerovo 3\nDSA : Kalatch 2, Bogoutchar 2, Sovetskaya 2, Donetsk Rouge 1, Izioum Rouge 1\nGEN : Bogoutchar 1, Kalatch 1, Sovetskaya 1\nART CA : Valouïki 2, Milerovo 2, Morozovsk 2\nEW : Donetsk Rouge 3, Izioum Rouge 3, Pavlosk 2\nGAM : Milerovo 1\nRéseau LOG : E3 5, E2 5, R7 3, E1 2, R2 2, R1 2, RK 2, RI 2, R6 2, RD 1, R15 1, E4 1, R9 2",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Bogoutchar 0 · Fortifier Kalatch 0 · Fortifier Sovetskaya 0 || 2;Effort COM;effet T5;retour T6;Kharkiv;;; || 3;Effort LOG;effet T4;retour T8;Izioum;;; || 4;Renseignement SAT;effet T2;retour T4;Mykolaïv;;; || 5;OSINT;effet T5;retour T6;Tcherkassy;;;",
"agress": 4,
"prudence": 3,
"imprevu": 0,
"constance": "S'adapte un peu",
"effort": "Un seul fuseau",
"fuseau": "Izioum (centre)",
"mobilite": "Mobile",
"ruse": 2,
"critique": 0.9,
"raisonne": "Anticipe l'ENI",
"calcule": "Souvent",
"imperatifs": "Toujours",
"enchaine": "Toujours",
"reserve": "Toujours le maximum",
"memoire": "3 tours",
"tourBlanc": 0,
"r_percer": 1,
"r_tenir": 4,
"r_div": 9,
"r_bsc": 10,
"r_pc": 8,
"r_cb": 6,
"r_rens": 7,
"r_proteger": 3,
"r_log": 5,
"r_env": 11,
"r_accu": 2,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Milieu du Rear",
"gardePOW": 2,
"gardeMP": "Oui",
"dsa": "DIV+",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": 90,
"fusDiv": "Celui où il gagne",
"salve": "Toujours",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Chaque tour",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe en salve",
"x_engENI": "Renforce ce fuseau",
"x_recule": "Ajoute des flux LOG",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Retrace le réseau",
"x_jauge": "Va au plus offensif",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de carte",
"x_finMene": "Accélère",
"x_finMen": "Tout pour percer",
"e_danger": "Rarement",
"e_pow": "Jamais",
"e_sansFlux": "Jamais",
"e_memeFus": "Rarement",
"e_vieux": "Rarement",
"e_bascule": "Souvent",
"e_divLoin": "Jamais",
"b_sead": "Souvent",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Agressif et très intelligent"
},
{
"id": "joukov",
"rang": 10,
"nom": "Joukov",
"desc": "Le maréchal de la victoire va déclencher toute la colère de la Stavka.",
"niveau": 5,
"camps": "Rouge",
"cache": "Non",
"msgDep": "Camp : Rouge\nPC : Kalatch 0\nBSC : Milerovo 0\nPOW : Sovetskaya 0\nDIV+ : Vechenskaïa 0\nINF : Izioum Rouge 3, Valouïki 1, Bogoutchar 3, Morozovsk 1, Louhansk 1\nMP : Vechenskaïa 3, Kalatch 3, Milerovo 3, Garde POW, Novoaïdar 1\nCIMIC : Kharkiv Rouge 2, Izioum Rouge 1, Donetsk Rouge 2, Kharkiv Rouge 3, Bogoutchar 2\nDSA : Vechenskaïa 1, Milerovo 1, Kalatch 1, Kharkiv Rouge 1, Donetsk Rouge 1\nGEN : Kalatch 2, Vechenskaïa 2, Milerovo 2\nART CA : Pavlosk 2, Sovetskaya 1, Morozovsk 2\nEW : Donetsk Rouge 3, Izioum Rouge 2, Pavlosk 1\nGAM : Sovetskaya 2\nRéseau LOG : E3 3, R11 3, R10 2, RI 2, E4 3, R15 2, RD 2, E2 5, E1 2, R2 2, R1 2, RK 2",
"msgT1": "ORDRES ROUGE | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Milerovo 0 · Fortifier Sovetskaya 0 · Fortifier Vechenskaïa 0 || 2;Renseignement SAT;effet T2;retour T4;Krementchouk;;; || 3;OSINT;effet T5;retour T6;Kryvyï Rih;;; || 4;Intox L2I;effet T7;retour T8;Krementchouk;;; || 5;Renseignement drone;effet T2;retour T4;Mykolaïv;;;",
"agress": 3,
"prudence": 4,
"imprevu": 0,
"constance": "S'adapte beaucoup",
"effort": "Un seul fuseau",
"fuseau": "Le plus favorable",
"mobilite": "Mobile",
"ruse": 3,
"critique": 1,
"raisonne": "Anticipe l'ENI",
"calcule": "Toujours",
"imperatifs": "Toujours",
"enchaine": "Toujours",
"reserve": "Toujours le maximum",
"memoire": "5 tours",
"tourBlanc": 0,
"r_percer": null,
"r_tenir": null,
"r_div": null,
"r_bsc": null,
"r_pc": null,
"r_cb": null,
"r_rens": null,
"r_proteger": null,
"r_log": null,
"r_env": null,
"r_accu": null,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Loin du front",
"gardePOW": 2,
"gardeMP": "Oui",
"dsa": "Réparties",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": "Jamais sauf pour percer",
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Chaque tour",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe en salve",
"x_engENI": "Frappe la DIV+ ENI",
"x_recule": "Ajoute des flux LOG",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Retrace le réseau",
"x_jauge": "Joue plus prudent",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de carte",
"x_finMene": "Continue pareil",
"x_finMen": "Assaut de la BP et Maquis",
"e_danger": "Jamais",
"e_pow": "Jamais",
"e_sansFlux": "Jamais",
"e_memeFus": "Jamais",
"e_vieux": "Jamais",
"e_bascule": "Toujours",
"e_divLoin": "Jamais",
"b_sead": "Toujours",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Le meilleur possible"
},
// ---- bots français du mode solo (camp Bleu), classeur « Profils des bots français » de Ben (10 nov. 2026)
{
"id": "tim",
"rang": 1,
"nom": "SGT Tim",
"desc": "Parfait représentant de l'armée de terre : sourire bright, moral à toute épreuve et pas de cerveau.",
"niveau": 1,
"camps": "Bleu",
"cache": "Non",
"msgDep": "Camp : Bleu\nPC : Poltava 0\nBSC : Dnipro 0\nPOW : Krementchouk 0\nDIV+ : Zaporijjia 0\nINF : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Poltava 1, Zaporijjia 1\nMP : Kharkiv Bleu 3, Izioum Bleu 3, Donetsk Bleu 3\nCIMIC : Lysanka 2, Tcherkassy 1, Kropyvnytskyï 3, Krementchouk 2, Dnipro 1\nDSA : Poltava 2, Dnipro 2, Zaporijjia 2, Kropyvnytskyï 2, Tcherkassy 2\nGEN : Krementchouk 3, Kryvyï Rih 2, Bobrynets 2\nART CA : Poltava 3, Dnipro 3, Zaporijjia 3\nEW : Kharkiv Bleu 2, Izioum Bleu 2, Donetsk Bleu 2\nGAM : Lysanka 1\nRéseau LOG : U2 1, B2 2, BK 3, U1 3, B1 1, B3 2, B5 1, B4 1, U3 3, B7 1, U4 1, B11 1, B9 1, B13 2, B10 1, B8 1, B6 1, BI 1, B14 1, BD 1",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Embuscade;effet T4;retour T8;RI;;; || 2;OSINT;effet T5;retour T6;Sovetskaya;;; || 3;SEAD;effet T3;retour T8;Bogoutchar;;; || 4;Effort LOG;effet T4;retour T8;Izioum;;; || 5;Engagement GAM;effet T2;retour T5;Kharkiv;;;",
"agress": 3,
"prudence": 1,
"imprevu": 0.4,
"constance": "S'adapte un peu",
"effort": "Deux fuseaux",
"fuseau": "Au hasard",
"mobilite": "Statique",
"ruse": 2,
"critique": 0.1,
"raisonne": "Idées reçues",
"calcule": "Jamais",
"imperatifs": "Parfois",
"enchaine": "Jamais",
"reserve": "Garde 2 cartes ou plus",
"memoire": "Toute la partie",
"tourBlanc": 0.2,
"r_percer": 1,
"r_tenir": 2,
"r_div": 3,
"r_bsc": 11,
"r_pc": 10,
"r_cb": 9,
"r_rens": 7,
"r_proteger": 6,
"r_log": 5,
"r_env": 8,
"r_accu": 4,
"posPC": "Près du front",
"posBSC": "Près du front",
"posDIV": "Milieu du Rear",
"gardePOW": 0,
"dsa": "Réparties",
"posART": "Mixtes",
"reseau": "Minimum partout",
"fortifie": "Jamais",
"seuilDiv": 20,
"fusDiv": "Au hasard",
"salve": "Jamais",
"rensAvant": "Jamais",
"rensMin": 0,
"scoot": "Jamais",
"assautBP": "Dès que possible",
"maquis": "Jamais",
"effortLog": "Jamais",
"appuiClose": "Rarement",
"justice": "Jamais",
"x_pc": "Ignore",
"x_bsc": "Ignore",
"x_div": "Ignore",
"x_pow": "Riposte",
"x_art": "Ignore",
"x_repere": "Ignore",
"x_engENI": "Ignore",
"x_recule": "Ignore",
"x_percer": "Garde la DIV+ en réserve",
"x_coupe": "Ignore",
"x_jauge": "Change rien",
"x_dsa": "Ignore",
"x_echec": "Rejoue la même dès son retour",
"x_finMene": "Continue pareil",
"x_finMen": "Continue pareil",
"e_danger": "Souvent",
"e_pow": "Souvent",
"e_sansFlux": "Souvent",
"e_memeFus": "Rarement",
"e_vieux": "Souvent",
"e_bascule": "Jamais",
"e_divLoin": "Toujours",
"b_sead": "Jamais",
"b_cb": "Jamais",
"b_garde": "Rarement",
"remarques": "Comportement erratique"
},
{
"id": "bagar",
"rang": 2,
"nom": "CPL Bagar",
"desc": "Fine fleur de nos soldats, le CPL Bagar veut en découdre.",
"niveau": 2,
"camps": "Bleu",
"cache": "Oui",
"msgDep": "Camp : Bleu\nPC : Dnipro 0\nBSC : Kryvyï Rih 0\nPOW : Mykolaïv 0\nDIV+ : Krementchouk 0\nINF : Izioum Bleu 1, Izioum Bleu 2, Izioum Bleu 3, Kharkiv Bleu 1, Donetsk Bleu 1\nMP : Garde POW, Garde POW, Kharkiv Bleu 2, Donetsk Bleu 2, Krementchouk 1\nCIMIC : Tcherkassy 2, Lysanka 1, Krementchouk 2, Kropyvnytskyï 2, Mykolaïv 2\nDSA : Poltava 3, Zaporijjia 3, Kharkiv Bleu 3, Donetsk Bleu 3, Kryvyï Rih 1\nGEN : Poltava 1, Dnipro 2, Zaporijjia 1\nART CA : Tcherkassy 1, Kropyvnytskyï 1, Bobrynets 1\nEW : Poltava 2, Dnipro 1, Zaporijjia 2\nGAM : Dnipro 3\nRéseau LOG : B2 2, BK 2, U1 3, B1 2, U3 2, B7 1, B5 2, B6 2, BI 2, U4 3, B13 3, B14 2, BD 2, B3 1, B9 1",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Frappe en profondeur;effet T2;retour T4;;Kharkiv Rouge ART Nord;Tcherkassy 1; || 2;Frappe en profondeur;effet T2;retour T4;;Izioum Rouge ART Nord;Kropyvnytskyï 1; || 3;Frappe en profondeur;effet T2;retour T4;;Donetsk Rouge ART Nord;Bobrynets 1; || 4;Engagement GAM;effet T2;retour T5;Izioum;;; || 5;CAS;effet T3;retour T6;Kharkiv;;; || 6;Effort COM;effet T5;retour T6;Donetsk;;; || 7;Effort LOG;effet T4;retour T8;Donetsk;;;",
"agress": 5,
"prudence": 1,
"imprevu": 0.3,
"constance": "S'en tient au plan",
"effort": "Les trois fuseaux",
"fuseau": "Izioum (centre)",
"mobilite": "Peu mobile",
"ruse": 1,
"critique": 0.2,
"raisonne": "Idées reçues",
"calcule": "Jamais",
"imperatifs": "Jamais",
"enchaine": "Jamais",
"reserve": "Garde 1 carte en réserve",
"memoire": "Toute la partie",
"tourBlanc": 0.2,
"r_percer": 1,
"r_tenir": 4,
"r_div": 3,
"r_bsc": 8,
"r_pc": 9,
"r_cb": 5,
"r_rens": 6,
"r_proteger": 10,
"r_log": 7,
"r_env": 11,
"r_accu": 2,
"posPC": "Près du front",
"posBSC": "Loin du front",
"posDIV": "Région d'accès d'un fuseau",
"gardePOW": 1,
"dsa": "DIV+",
"posART": "Mixtes",
"reseau": "Concentrée sur l'effort",
"fortifie": "Après une frappe",
"seuilDiv": 60,
"fusDiv": "Son fuseau d'effort",
"salve": "Toujours",
"rensAvant": "Rarement",
"rensMin": 1,
"scoot": "Rarement",
"assautBP": "Sur un grand pion repéré",
"maquis": "Tôt dans la partie",
"effortLog": "Seulement sous 50 %",
"appuiClose": "Chaque tour",
"justice": "Quand le POW est plein",
"x_pc": "Riposte",
"x_bsc": "Riposte",
"x_div": "Riposte",
"x_pow": "Riposte",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe tout de suite",
"x_engENI": "Engage sa propre DIV+ ailleurs",
"x_recule": "Ignore",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Riposte",
"x_jauge": "Va au plus offensif",
"x_dsa": "Fortifie",
"x_echec": "Change de cible",
"x_finMene": "Accélère",
"x_finMen": "Assaut de la BP et Maquis",
"e_danger": "Parfois",
"e_pow": "Parfois",
"e_sansFlux": "Parfois",
"e_memeFus": "Souvent",
"e_vieux": "Souvent",
"e_bascule": "Rarement",
"e_divLoin": "Jamais",
"b_sead": "Rarement",
"b_cb": "Souvent",
"b_garde": "Rarement",
"remarques": "Agressif"
},
{
"id": "jeanmichel",
"rang": 3,
"nom": "ADC Jean-Michel Spécialiste",
"desc": "L'ADC Specialiste fait le même métier, de la même manière depuis 15 ans. C'est pas vous qui allez lui dire comment faire mieux.",
"niveau": 2,
"camps": "Bleu",
"cache": "Oui",
"msgDep": "Camp : Bleu\nPC : Krementchouk 0\nBSC : Kryvyï Rih 0\nPOW : Bobrynets 0\nDIV+ : Dnipro 0\nINF : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Kropyvnytskyï 1, Garde POW\nMP : Poltava 1, Dnipro 1, Zaporijjia 1, Garde POW, Garde POW\nCIMIC : Tcherkassy 1, Krementchouk 1, Lysanka 1, Kryvyï Rih 1, Mykolaïv 1\nDSA : Poltava 2, Krementchouk 2, Dnipro 2, Kryvyï Rih 2, Zaporijjia 2\nGEN : Poltava 3, Dnipro 3, Zaporijjia 3\nART CA : Kharkiv Bleu 2, Izioum Bleu 2, Donetsk Bleu 2\nEW : Kharkiv Bleu 3, Izioum Bleu 3, Donetsk Bleu 3\nGAM : Krementchouk 3\nRéseau LOG : U1 3, B1 1, B2 1, BK 1, U3 5, B9 5, B10 2, B14 2, BD 2, BI 2, B3 2, B5 2, B6 2",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Renseignement SAT;effet T2;retour T4;Valouïki;;; || 2;ROHUM;effet T5;retour T8;Novoaïdar;;; || 3;Frappe drone;effet T3;retour T5;;Milerovo 0;; || 4;Effort COM;effet T5;retour T6;Donetsk;;; || 5;Brouillage GE;effet T2;retour T4;Izioum;;;",
"agress": 1,
"prudence": 5,
"imprevu": 0.2,
"constance": "S'en tient au plan",
"effort": "Les trois fuseaux",
"fuseau": "Au hasard",
"mobilite": "Peu mobile",
"ruse": 2,
"critique": 0.4,
"raisonne": "Idées reçues",
"calcule": "Rarement",
"imperatifs": "Souvent",
"enchaine": "Parfois",
"reserve": "Garde 1 carte en réserve",
"memoire": "Toute la partie",
"tourBlanc": 0.1,
"r_percer": 11,
"r_tenir": 3,
"r_div": 9,
"r_bsc": 10,
"r_pc": 7,
"r_cb": 8,
"r_rens": 4,
"r_proteger": 1,
"r_log": 2,
"r_env": 6,
"r_accu": 5,
"posPC": "Loin du front",
"posBSC": "Loin du front",
"posDIV": "Loin du front",
"gardePOW": 3,
"dsa": "PC",
"posART": "En retrait",
"reseau": "Priorité à la DIV+",
"fortifie": "Après une frappe",
"seuilDiv": 100,
"fusDiv": "Au hasard",
"salve": "Sur une cible de valeur",
"rensAvant": "Rarement",
"rensMin": 1,
"scoot": "Rarement",
"assautBP": "En dernier recours",
"maquis": "Jamais",
"effortLog": "Seulement sous 50 %",
"appuiClose": "Rarement",
"justice": "Quand le POW est plein",
"x_pc": "Bascule de PC",
"x_bsc": "Fortifie",
"x_div": "Fortifie",
"x_pow": "Renforce la garde",
"x_art": "Ignore",
"x_repere": "Frappe tout de suite",
"x_engENI": "Renforce ce fuseau",
"x_recule": "Renforce ce fuseau",
"x_percer": "Garde la DIV+ en réserve",
"x_coupe": "Ignore",
"x_jauge": "Joue plus prudent",
"x_dsa": "Remplace les DSA",
"x_echec": "Rejoue la même dès son retour",
"x_finMene": "Se défend",
"x_finMen": "Continue pareil",
"e_danger": "Parfois",
"e_pow": "Parfois",
"e_sansFlux": "Parfois",
"e_memeFus": "Souvent",
"e_vieux": "Souvent",
"e_bascule": "Rarement",
"e_divLoin": "Toujours",
"b_sead": "Rarement",
"b_cb": "Parfois",
"b_garde": "Toujours",
"remarques": "Très défensif, surtout pour son PC"
},
{
"id": "colo",
"rang": 4,
"nom": "Go l'Colo",
"desc": "La mort va devenir votre hypothèse de travail.",
"niveau": 3,
"camps": "Bleu",
"cache": "Oui",
"msgDep": "Camp : Bleu\nPC : Krementchouk 0\nBSC : Kryvyï Rih 0\nPOW : Tcherkassy 0\nDIV+ : Kropyvnytskyï 0\nINF : Kharkiv Bleu 3, Izioum Bleu 3, Donetsk Bleu 3, Garde POW, Garde POW\nMP : Krementchouk 3, Kryvyï Rih 3, Kropyvnytskyï 2, Poltava 2, Dnipro 2\nCIMIC : Kharkiv Bleu 2, Izioum Bleu 2, Donetsk Bleu 2, Tcherkassy 2, Bobrynets 2\nDSA : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Krementchouk 1, Kryvyï Rih 1\nGEN : Krementchouk 2, Kropyvnytskyï 1, Kryvyï Rih 2\nART CA : Poltava 1, Dnipro 1, Zaporijjia 1\nEW : Lysanka 2, Lysanka 3, Tcherkassy 1\nGAM : Lysanka 1\nRéseau LOG : U3 5, B7 4, B9 1, U4 3, B13 2, B14 2, BD 2, U2 2, B2 2, BK 2, U1 1, B3 1, B5 1, B6 1, BI 1",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Krementchouk 0 · Fortifier Kropyvnytskyï 0 · Fortifier Kryvyï Rih 0 || 2;Renseignement SAT;effet T2;retour T4;Valouïki;;; || 3;Renseignement drone;effet T2;retour T4;Novoaïdar;;; || 4;OSINT;effet T5;retour T6;Louhansk;;; || 5;Effort COM;effet T5;retour T6;Kharkiv;;;",
"agress": 2,
"prudence": 4,
"imprevu": 0.1,
"constance": "S'adapte un peu",
"effort": "Les trois fuseaux",
"fuseau": "Le plus menacé",
"mobilite": "Mobile",
"ruse": 4,
"critique": 0.7,
"raisonne": "Recoupe ce qu'il voit",
"calcule": "Parfois",
"imperatifs": "Toujours",
"enchaine": "Souvent",
"reserve": "Toujours le maximum",
"memoire": "10 tours",
"tourBlanc": 0.05,
"r_percer": 11,
"r_tenir": 1,
"r_div": 2,
"r_bsc": 3,
"r_pc": 10,
"r_cb": 4,
"r_rens": 5,
"r_proteger": 7,
"r_log": 6,
"r_env": 9,
"r_accu": 8,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Loin du front",
"gardePOW": 2,
"dsa": "BSC",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": 100,
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Quand un fuseau recule",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Fortifie",
"x_pow": "Ignore",
"x_art": "Déplace les autres ART CA",
"x_repere": "Confirme puis frappe",
"x_engENI": "Renforce ce fuseau",
"x_recule": "Renforce ce fuseau",
"x_percer": "Garde la DIV+ en réserve",
"x_coupe": "Retrace le réseau",
"x_jauge": "Joue plus prudent",
"x_dsa": "Fortifie",
"x_echec": "Change de cible",
"x_finMene": "Continue pareil",
"x_finMen": "Continue pareil",
"e_danger": "Rarement",
"e_pow": "Rarement",
"e_sansFlux": "Rarement",
"e_memeFus": "Souvent",
"e_vieux": "Parfois",
"e_bascule": "Parfois",
"e_divLoin": "Rarement",
"b_sead": "Parfois",
"b_cb": "Souvent",
"b_garde": "Toujours",
"remarques": "Défensif et intelligent",
"depRetouche": "infFus"
},
{
"id": "santo",
"rang": 5,
"nom": "Santo-Senseï",
"desc": "Cette partie sera votre ultime champ de bataille.",
"niveau": 3,
"camps": "Bleu",
"cache": "Oui",
"msgDep": "Camp : Bleu\nPC : Tcherkassy 0\nBSC : Krementchouk 0\nPOW : Bobrynets 0\nDIV+ : Lysanka 0\nINF : Kropyvnytskyï 3, Kryvyï Rih 3, Mykolaïv 3, Zaporijjia 1, Bobrynets 1\nMP : Lysanka 1, Tcherkassy 1, Krementchouk 1, Poltava 1, Garde POW\nCIMIC : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Dnipro 1, Kropyvnytskyï 1\nDSA : Lysanka 2, Tcherkassy 2, Krementchouk 2, Kharkiv Bleu 2, Izioum Bleu 2\nGEN : Lysanka 3, Tcherkassy 3, Krementchouk 3\nART CA : Kropyvnytskyï 2, Kryvyï Rih 2, Mykolaïv 2\nEW : Kharkiv Bleu 3, Izioum Bleu 3, Donetsk Bleu 2\nGAM : Kryvyï Rih 1\nRéseau LOG : U1 4, U2 3, BK 3, B2 3, U3 4, B7 1, B5 1, B11 2, B13 2, B14 2, BD 2, B9 1, B10 1, BI 1",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Lysanka 0 · Fortifier Tcherkassy 0 · Fortifier Krementchouk 0 || 2;Renseignement SAT;effet T2;retour T4;Bogoutchar;;; || 3;OSINT;effet T5;retour T6;Milerovo;;; || 4;Effort COM;effet T5;retour T6;Kharkiv;;; || 5;Ecoute GE;effet T3;retour T5;Izioum;;;",
"agress": 4,
"prudence": 3,
"imprevu": 0.1,
"constance": "S'adapte un peu",
"effort": "Un seul fuseau",
"fuseau": "Le plus favorable",
"mobilite": "Mobile",
"ruse": 2,
"critique": 0.7,
"raisonne": "Recoupe ce qu'il voit",
"calcule": "Parfois",
"imperatifs": "Toujours",
"enchaine": "Souvent",
"reserve": "Toujours le maximum",
"memoire": "10 tours",
"tourBlanc": 0.05,
"r_percer": 1,
"r_tenir": 6,
"r_div": 5,
"r_bsc": 10,
"r_pc": 9,
"r_cb": 4,
"r_rens": 7,
"r_proteger": 8,
"r_log": 3,
"r_env": 11,
"r_accu": 2,
"posPC": "Milieu du Rear",
"posBSC": "Milieu du Rear",
"posDIV": "Région d'accès d'un fuseau",
"gardePOW": 2,
"dsa": "DIV+",
"posART": "En retrait",
"reseau": "Concentrée sur l'effort",
"fortifie": "Dès le tour 1",
"seuilDiv": 70,
"fusDiv": "Celui où il gagne",
"salve": "Toujours",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "Sur un grand pion repéré",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Chaque tour",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Engage la DIV+ tout de suite",
"x_pow": "Ignore",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe tout de suite",
"x_engENI": "Engage sa propre DIV+ ailleurs",
"x_recule": "Ignore",
"x_percer": "Pousse ce fuseau",
"x_coupe": "Ouverture d'itinéraire",
"x_jauge": "Va au plus offensif",
"x_dsa": "Remplace les DSA",
"x_echec": "Change de carte",
"x_finMene": "Accélère",
"x_finMen": "Tout pour percer",
"e_danger": "Rarement",
"e_pow": "Rarement",
"e_sansFlux": "Rarement",
"e_memeFus": "Jamais",
"e_vieux": "Parfois",
"e_bascule": "Parfois",
"e_divLoin": "Rarement",
"b_sead": "Parfois",
"b_cb": "Souvent",
"b_garde": "Parfois",
"remarques": "Offensif et intelligent"
},
{
"id": "galula",
"rang": 6,
"nom": "Galula",
"desc": "Si vous perdez, ça ne sert à rien de vous insurger.",
"niveau": 3,
"camps": "Bleu",
"cache": "Oui",
"msgDep": "Camp : Bleu\nPC : Krementchouk 0\nBSC : Kryvyï Rih 0\nPOW : Kropyvnytskyï 0\nDIV+ : Lysanka 0\nINF : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Tcherkassy 2, Mykolaïv 2\nMP : Lysanka 3, Kropyvnytskyï 3, Krementchouk 3, Garde POW, Kryvyï Rih 1\nCIMIC : Lysanka 1, Tcherkassy 3, Tcherkassy 1, Lysanka 2, Kropyvnytskyï 1\nDSA : Krementchouk 2, Kryvyï Rih 3, Bobrynets 2, Poltava 3, Zaporijjia 3\nGEN : Krementchouk 1, Kryvyï Rih 2, Bobrynets 1\nART CA : Poltava 1, Dnipro 1, Zaporijjia 1\nEW : Kharkiv Bleu 2, Izioum Bleu 2, Donetsk Bleu 2\nGAM : Dnipro 3\nRéseau LOG : U1 5, U2 4, B2 3, BK 3, U3 2, B9 2, U4 2, B13 2, B14 2, BD 2, B10 1, BI 1, B1 1",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Krementchouk 0 · Fortifier Kryvyï Rih 0 · Fortifier Lysanka 0 || 2;ROHUM;effet T5;retour T8;Bogoutchar;;; || 3;Maquis de partisans;effet T8;retour T15;Morozovsk;;; || 4;Embuscade;effet T4;retour T8;RK;;; || 5;Ecoute GE;effet T3;retour T5;Donetsk;;;",
"agress": 3,
"prudence": 4,
"imprevu": 0.1,
"constance": "S'adapte un peu",
"effort": "Deux fuseaux",
"fuseau": "Au hasard",
"mobilite": "Mobile",
"ruse": 5,
"critique": 0.7,
"raisonne": "Recoupe ce qu'il voit",
"calcule": "Parfois",
"imperatifs": "Toujours",
"enchaine": "Souvent",
"reserve": "Toujours le maximum",
"memoire": "10 tours",
"tourBlanc": 0.05,
"r_percer": 11,
"r_tenir": 8,
"r_div": 4,
"r_bsc": 2,
"r_pc": 3,
"r_cb": 6,
"r_rens": 5,
"r_proteger": 9,
"r_log": 7,
"r_env": 1,
"r_accu": 10,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Milieu du Rear",
"gardePOW": 2,
"gardeMP": "Oui",
"dsa": "Réparties",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": "Jamais sauf pour percer",
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "Sur un grand pion repéré",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Quand un fuseau recule",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe en salve",
"x_engENI": "Frappe la DIV+ ENI",
"x_recule": "Ajoute des flux LOG",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Retrace le réseau",
"x_jauge": "Joue plus prudent",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de cible",
"x_finMene": "Continue pareil",
"x_finMen": "Assaut de la BP et Maquis",
"e_danger": "Rarement",
"e_pow": "Rarement",
"e_sansFlux": "Rarement",
"e_memeFus": "Parfois",
"e_vieux": "Parfois",
"e_bascule": "Parfois",
"e_divLoin": "Rarement",
"b_sead": "Parfois",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Vise d'abord le deep",
"depRetouche": "w3"
},
{
"id": "ardant",
"rang": 7,
"nom": "Ardant du Picq",
"desc": "Vous pourrez sans doute trouver un amphi pour raconter votre défaite à l'issue.",
"niveau": 4,
"camps": "Bleu",
"cache": "Oui",
"msgDep": "Camp : Bleu\nPC : Dnipro 0\nBSC : Kropyvnytskyï 0\nPOW : Mykolaïv 0\nDIV+ : Lysanka 0\nINF : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Krementchouk 3, Kryvyï Rih 2\nMP : Dnipro 1, Donetsk Bleu 2, Kropyvnytskyï 1, Lysanka 1, Garde POW\nCIMIC : Tcherkassy 2, Tcherkassy 3, Donetsk Bleu 3, Kharkiv Bleu 2, Izioum Bleu 2\nDSA : Poltava 2, Zaporijjia 2, Lysanka 2, Kropyvnytskyï 2, Dnipro 2\nGEN : Lysanka 3, Kropyvnytskyï 3, Dnipro 3\nART CA : Krementchouk 1, Kryvyï Rih 1, Tcherkassy 1\nEW : Kharkiv Bleu 3, Izioum Bleu 3, Zaporijjia 1\nGAM : Krementchouk 2\nRéseau LOG : U2 3, B2 2, BK 2, U3 3, B7 1, U4 2, B13 2, B14 2, BD 2, B9 2, B10 2, BI 2, U1 5",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Effort COM;effet T5;retour T6;Izioum;;; || 2;Renseignement SAT;effet T2;retour T4;Valouïki;;; || 3;OSINT;effet T5;retour T6;Novoaïdar;;; || 4;Ecoute GE;effet T3;retour T5;Kharkiv;;; || 5;Travaux du GEN;effet T4;retour T5;;;;Fortifier Lysanka 0 · Fortifier Kropyvnytskyï 0 · Fortifier Dnipro 0",
"agress": 2,
"prudence": 4,
"imprevu": 0,
"constance": "S'adapte beaucoup",
"effort": "Deux fuseaux",
"fuseau": "Le plus menacé",
"mobilite": "Mobile",
"ruse": 3,
"critique": 0.9,
"raisonne": "Anticipe l'ENI",
"calcule": "Souvent",
"imperatifs": "Toujours",
"enchaine": "Toujours",
"reserve": "Toujours le maximum",
"memoire": "3 tours",
"tourBlanc": 0,
"r_percer": 5,
"r_tenir": 1,
"r_div": 8,
"r_bsc": 9,
"r_pc": 10,
"r_cb": 6,
"r_rens": 7,
"r_proteger": 3,
"r_log": 2,
"r_env": 11,
"r_accu": 4,
"posPC": "Près du front",
"posBSC": "Milieu du Rear",
"posDIV": "Région d'accès d'un fuseau",
"gardePOW": 2,
"gardeMP": "Oui",
"dsa": "PC",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": 60,
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Sur un grand pion repéré",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Chaque tour",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Renseigne l'ART ENI",
"x_repere": "Frappe tout de suite",
"x_engENI": "Renforce ce fuseau",
"x_recule": "Renforce ce fuseau",
"x_percer": "Pousse ce fuseau",
"x_coupe": "Ouverture d'itinéraire",
"x_jauge": "Joue plus prudent",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de carte",
"x_finMene": "Continue pareil",
"x_finMen": "Continue pareil",
"e_danger": "Rarement",
"e_pow": "Jamais",
"e_sansFlux": "Jamais",
"e_memeFus": "Rarement",
"e_vieux": "Rarement",
"e_bascule": "Souvent",
"e_divLoin": "Jamais",
"b_sead": "Souvent",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Très intelligent",
"depRetouche": "infFus"
},
{
"id": "yako",
"rang": 8,
"nom": "Tonton Yako",
"desc": "Vous allez voir que la tactique n'est pas que théorique.",
"niveau": 4,
"camps": "Bleu",
"cache": "Oui",
"msgDep": "Camp : Bleu\nPC : Kropyvnytskyï 0\nBSC : Kryvyï Rih 0\nPOW : Mykolaïv 0\nDIV+ : Lysanka 0\nINF : Poltava 2, Krementchouk 1, Izioum Bleu 3, Donetsk Bleu 3, Dnipro 2\nMP : Lysanka 2, Garde POW, Kropyvnytskyï 2, Kryvyï Rih 2, Poltava 1\nCIMIC : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Dnipro 1, Tcherkassy 1\nDSA : Lysanka 1, Kropyvnytskyï 1, Kryvyï Rih 1, Tcherkassy 3, Kharkiv Bleu 3\nGEN : Lysanka 3, Kropyvnytskyï 3, Kryvyï Rih 3\nART CA : Krementchouk 2, Tcherkassy 2, Mykolaïv 2\nEW : Kharkiv Bleu 2, Izioum Bleu 2, Donetsk Bleu 2\nGAM : Dnipro 3\nRéseau LOG : U1 5, U2 2, B2 2, BK 2, U4 3, B13 3, B14 2, BD 2, U3 3, B9 2, B10 2, BI 2",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Lysanka 0 · Fortifier Kropyvnytskyï 0 · Fortifier Kryvyï Rih 0 || 2;Renseignement SAT;effet T2;retour T4;Kalatch;;; || 3;Renseignement drone;effet T2;retour T4;Vechenskaïa;;; || 4;OSINT;effet T5;retour T6;Sovetskaya;;; || 5;Ecoute GE;effet T3;retour T5;Izioum;;;",
"agress": 3,
"prudence": 4,
"imprevu": 0,
"constance": "S'adapte beaucoup",
"effort": "Deux fuseaux",
"fuseau": "Izioum (centre)",
"mobilite": "Très mobile",
"ruse": 4,
"critique": 0.9,
"raisonne": "Anticipe l'ENI",
"calcule": "Souvent",
"imperatifs": "Toujours",
"enchaine": "Toujours",
"reserve": "Toujours le maximum",
"memoire": "5 tours",
"tourBlanc": 0,
"r_percer": 2,
"r_tenir": 4,
"r_div": 9,
"r_bsc": 11,
"r_pc": 10,
"r_cb": 7,
"r_rens": 6,
"r_proteger": 3,
"r_log": 5,
"r_env": 8,
"r_accu": 1,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Loin du front",
"gardePOW": 1,
"gardeMP": "Oui",
"dsa": "Les ART CA",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": "Jamais sauf pour percer",
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Sur un grand pion repéré",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Quand un fuseau recule",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Renseigne l'ART ENI",
"x_repere": "Confirme puis frappe",
"x_engENI": "Frappe la DIV+ ENI",
"x_recule": "Ajoute des flux LOG",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Retrace le réseau",
"x_jauge": "Joue plus prudent",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de carte",
"x_finMene": "Continue pareil",
"x_finMen": "Continue pareil",
"e_danger": "Rarement",
"e_pow": "Jamais",
"e_sansFlux": "Jamais",
"e_memeFus": "Rarement",
"e_vieux": "Rarement",
"e_bascule": "Souvent",
"e_divLoin": "Jamais",
"b_sead": "Souvent",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Modéré et très intelligent",
"depRetouche": "cimic+ew"
},
{
"id": "beaufre",
"rang": 9,
"nom": "Général Beaufre",
"desc": "Vous irez rapidement de l'introduction à la conclusion de votre stratégie.",
"niveau": 4,
"camps": "Bleu",
"cache": "Oui",
"msgDep": "Camp : Bleu\nPC : Kropyvnytskyï 0\nBSC : Kryvyï Rih 0\nPOW : Tcherkassy 0\nDIV+ : Lysanka 0\nINF : Bobrynets 1, Tcherkassy 2, Kryvyï Rih 2, Zaporijjia 2, Mykolaïv 2\nMP : Kharkiv Bleu 3, Izioum Bleu 3, Donetsk Bleu 3, Lysanka 1, Poltava 1\nCIMIC : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Poltava 3, Krementchouk 2\nDSA : Kropyvnytskyï 2, Dnipro 2, Lysanka 2, Tcherkassy 1, Tcherkassy 3\nGEN : Dnipro 3, Kropyvnytskyï 3, Lysanka 3\nART CA : Poltava 2, Krementchouk 1, Zaporijjia 1\nEW : Kharkiv Bleu 2, Izioum Bleu 2, Donetsk Bleu 2\nGAM : Kryvyï Rih 1\nRéseau LOG : U3 3, B9 3, B10 3, U4 2, B13 2, B14 2, BD 2, BI 2, U2 2, B2 2, BK 2, U1 5",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;Travaux du GEN;effet T4;retour T5;;;;Fortifier Kryvyï Rih 0 · Fortifier Kropyvnytskyï 0 · Fortifier Lysanka 0 || 2;Frappe en profondeur;effet T2;retour T4;;Kharkiv Rouge ART Nord;Poltava 2; || 3;Frappe en profondeur;effet T2;retour T4;;Kharkiv Rouge ART Nord;Krementchouk 1; || 4;Frappe en profondeur;effet T2;retour T4;;Kharkiv Rouge ART Nord;Zaporijjia 1; || 5;Ordre à la B.ART;effet T3;retour T4;;;;ART CA 1 -> Poltava 3 · ART CA 2 -> Krementchouk 3 · ART CA 3 -> Zaporijjia 3 || 6;Renseignement SAT;effet T2;retour T4;Kalatch;;; || 7;OSINT;effet T5;retour T6;Vechenskaïa;;;",
"agress": 4,
"prudence": 3,
"imprevu": 0,
"constance": "S'adapte un peu",
"effort": "Un seul fuseau",
"fuseau": "Le plus favorable",
"mobilite": "Mobile",
"ruse": 2,
"critique": 0.9,
"raisonne": "Anticipe l'ENI",
"calcule": "Souvent",
"imperatifs": "Toujours",
"enchaine": "Toujours",
"reserve": "Toujours le maximum",
"memoire": "3 tours",
"tourBlanc": 0,
"r_percer": 1,
"r_tenir": 4,
"r_div": 9,
"r_bsc": 10,
"r_pc": 8,
"r_cb": 6,
"r_rens": 7,
"r_proteger": 3,
"r_log": 5,
"r_env": 11,
"r_accu": 2,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Milieu du Rear",
"gardePOW": 2,
"gardeMP": "Oui",
"dsa": "DIV+",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": 90,
"fusDiv": "Celui où il gagne",
"salve": "Toujours",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Chaque tour",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe en salve",
"x_engENI": "Renforce ce fuseau",
"x_recule": "Ajoute des flux LOG",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Retrace le réseau",
"x_jauge": "Va au plus offensif",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de carte",
"x_finMene": "Accélère",
"x_finMen": "Tout pour percer",
"e_danger": "Rarement",
"e_pow": "Jamais",
"e_sansFlux": "Jamais",
"e_memeFus": "Rarement",
"e_vieux": "Rarement",
"e_bascule": "Souvent",
"e_divLoin": "Jamais",
"b_sead": "Souvent",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Agressif et très intelligent",
"depRetouche": "fus+bscKR"
},
{
"id": "foch",
"rang": 10,
"nom": "Maréchal Foch",
"desc": "En principes, vous allez perdre.",
"niveau": 5,
"camps": "Bleu",
"cache": "Non",
"msgDep": "Camp : Bleu\nPC : Kropyvnytskyï 0\nBSC : Kryvyï Rih 0\nPOW : Mykolaïv 0\nDIV+ : Bobrynets 0\nINF : Lysanka 3, Poltava 2, Dnipro 1, Zaporijjia 1, Krementchouk 1\nMP : Kharkiv Bleu 3, Izioum Bleu 3, Donetsk Bleu 3, Garde POW, Poltava 1\nCIMIC : Kharkiv Bleu 1, Izioum Bleu 1, Donetsk Bleu 1, Poltava 3, Tcherkassy 2\nDSA : Lysanka 2, Kropyvnytskyï 2, Kryvyï Rih 2, Tcherkassy 1, Kropyvnytskyï 3\nGEN : Lysanka 1, Kropyvnytskyï 1, Kryvyï Rih 1\nART CA : Tcherkassy 3, Zaporijjia 2, Dnipro 2\nEW : Kharkiv Bleu 2, Izioum Bleu 2, Donetsk Bleu 2\nGAM : Bobrynets 1\nRéseau LOG : U2 2, B2 2, BK 2, U3 5, U4 5, B13 5, B14 2, BD 2, B10 2, BI 2, U1 1",
"msgT1": "ORDRES BLEU | TOUR 1 | PC : 100 % | 5 carte(s) | Prêt à envoyer || 1;SEAD;effet T3;retour T8;Donetsk;;; || 2;Travaux du GEN;effet T4;retour T5;;;;Fortifier Kryvyï Rih 0 · Fortifier Kropyvnytskyï 0 · Fortifier Bobrynets 0 || 3;Effort LOG;effet T4;retour T8;DIV+;;; || 4;Renseignement SAT;effet T2;retour T4;Morozovsk;;; || 5;OSINT;effet T5;retour T6;Sovetskaya;;;",
"agress": 3,
"prudence": 4,
"imprevu": 0,
"constance": "S'adapte beaucoup",
"effort": "Un seul fuseau",
"fuseau": "Donetsk (sud)",
"mobilite": "Mobile",
"ruse": 3,
"critique": 1,
"raisonne": "Anticipe l'ENI",
"calcule": "Toujours",
"imperatifs": "Toujours",
"enchaine": "Toujours",
"reserve": "Toujours le maximum",
"memoire": "5 tours",
"tourBlanc": 0,
"r_percer": null,
"r_tenir": null,
"r_div": null,
"r_bsc": null,
"r_pc": null,
"r_cb": null,
"r_rens": null,
"r_proteger": null,
"r_log": null,
"r_env": null,
"r_accu": null,
"posPC": "Loin du front",
"posBSC": "Milieu du Rear",
"posDIV": "Loin du front",
"gardePOW": 2,
"gardeMP": "Oui",
"dsa": "Réparties",
"posART": "En retrait",
"reseau": "Équilibrée",
"fortifie": "Dès le tour 1",
"seuilDiv": "Jamais sauf pour percer",
"fusDiv": "Celui où il gagne",
"salve": "Sur une cible de valeur",
"rensAvant": "Souvent",
"rensMin": 1,
"scoot": "Souvent",
"assautBP": "En dernier recours",
"maquis": "Tôt dans la partie",
"effortLog": "Dès que la BSC baisse",
"appuiClose": "Chaque tour",
"justice": "Dès que possible",
"x_pc": "Bascule de PC",
"x_bsc": "Bascule BSC",
"x_div": "Mouvement de la DIV",
"x_pow": "Ignore",
"x_art": "Contre-batterie en retour",
"x_repere": "Frappe en salve",
"x_engENI": "Frappe la DIV+ ENI",
"x_recule": "Ajoute des flux LOG",
"x_percer": "Engage la DIV+ pour percer",
"x_coupe": "Retrace le réseau",
"x_jauge": "Joue plus prudent",
"x_dsa": "Déplace le grand pion couvert",
"x_echec": "Change de carte",
"x_finMene": "Continue pareil",
"x_finMen": "Assaut de la BP et Maquis",
"e_danger": "Jamais",
"e_pow": "Jamais",
"e_sansFlux": "Jamais",
"e_memeFus": "Jamais",
"e_vieux": "Jamais",
"e_bascule": "Toujours",
"e_divLoin": "Jamais",
"b_sead": "Toujours",
"b_cb": "Souvent",
"b_garde": "Souvent",
"remarques": "Le meilleur possible",
"depRetouche": "fus+div"
}
];

// ------------------------------------------------------------------ cœur des bots (sans données) : RaspBotCore(R, PROFILS) → API
// R : moteur d'arbitrage de la page (const R) ; PROFILS : tableau des profils (classeur de Ben converti en JSON).
// Le bot ne lit de l'état réel que ses propres pions et jauges ; ce qu'il sait de l'ENI vient de ses comptes rendus (out.rep.R),
// des combats et des curseurs (publics), comme un joueur humain.
function RaspBotCore(R, PROFILS) {
  'use strict';
  const FUS = R.FUS;
  const SUW = !!R.SUW;   // 12 nov. : plateau Suwałki (4 fuseaux, côte de la Baltique, NAV)
  const ACC = SUW ? R.ACCESS : { B: { Kharkiv: 'Poltava', Izioum: 'Dnipro', Donetsk: 'Zaporijjia' }, R: { Kharkiv: 'Valouïki', Izioum: 'Novoaïdar', Donetsk: 'Louhansk' } };
  const PIV = SUW ? { Kaliningrad: [['Suwałki', 'Nord'], ['Suwałki', 'Sud']], 'Suwałki': [['Kaliningrad', 'Sud'], ['Białystok', 'Nord']], 'Białystok': [['Suwałki', 'Sud'], ['Brest', 'Nord']], Brest: [['Białystok', 'Sud'], ['Białystok', 'Nord']] }
    : { Kharkiv: [['Izioum', 'Nord'], ['Izioum', 'Sud']], Izioum: [['Kharkiv', 'Sud'], ['Donetsk', 'Nord']], Donetsk: [['Izioum', 'Sud'], ['Izioum', 'Nord']] };
  const CENTRE = SUW ? 'Suwałki' : 'Izioum';   // fuseau d'effort par défaut
  const WINGS = [FUS[0], FUS[FUS.length - 1]];
  const zeroF = () => Object.fromEntries(FUS.map(f => [f, 0]));
  // fiches de déploiement Suwałki (écrites d'après chaque profil : positions des grands pions, DSA, ART, effort, intention navale ; réseau LOG calculé)
  const SUW_DEP = {"popov":"Camp : Rouge\nPC : Kaunas 0\nBSC : Slonim 0\nPOW : Vitebsk 0\nDIV+ : Klaipėda 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Slonim 3, Pinsk 3\nMP : Kaliningrad Rouge 2, Suwałki Rouge 2, Białystok Rouge 2, Brest Rouge 2\nCIMIC : Brest Rouge 3, Pinsk 2\nDSA : Kaunas 2, Slonim 2, Klaipėda 3, Vitebsk 1, Pinsk 1\nGEN : Klaipėda 1, Kaunas 1, Slonim 1\nART CA : Kaunas 3, Liepāja 1, Šiauliai 1\nEW : Kaliningrad Rouge 3, Suwałki Rouge 3, Białystok Rouge 3\nGAM : Liepāja 2\nNAV : Klaipėda 2\nRéseau LOG : E1 5, E2 3, E4 3, R1 5, R2 5, R5 2, R7 3, R8 1, R16 1, R17 2, RKA 1, RSU 1, RBI 1, RBR 1","boris":"Camp : Rouge\nPC : Slonim 0\nBSC : Vitebsk 0\nPOW : Daugavpils 0\nDIV+ : Kaunas 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW, Vitebsk 3\nMP : Suwałki Rouge 2, Pinsk 3\nCIMIC : Kaliningrad Rouge 3, Białystok Rouge 3, Brest Rouge 3, Klaipėda 3, Pinsk 2\nDSA : Kaunas 2, Kaunas 3, Slonim 2, Vitebsk 2, Klaipėda 2, Pinsk 1\nGEN : Kaunas 1, Slonim 1, Vitebsk 1\nART CA : Slonim 3, Vilnius 1, Šiauliai 1\nEW : Suwałki Rouge 3\nGAM : Vilnius 2\nNAV : Klaipėda 1\nRéseau LOG : E1 1, E2 5, E3 1, E4 5, R1 1, R2 1, R7 5, R8 5, R9 3, R16 1, R17 4, RKA 1, RSU 4, RBI 1, RBR 1","ivan":"Camp : Rouge\nPC : Daugavpils 0\nBSC : Riga 0\nPOW : Kaunas 0\nDIV+ : Vitebsk 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW\nMP : Kaliningrad Rouge 2, Suwałki Rouge 2, Białystok Rouge 2, Brest Rouge 2, Riga 3, Vitebsk 3\nCIMIC : Brest Rouge 3, Slonim 2, Klaipėda 3, Kaunas 1, Slonim 3\nDSA : Daugavpils 2, Daugavpils 3, Riga 2, Vitebsk 2, Klaipėda 2, Slonim 1\nGEN : Vitebsk 1, Daugavpils 1, Riga 1\nART CA : Minsk 1, Vilnius 1, Šiauliai 1\nEW : Kaliningrad Rouge 3, Suwałki Rouge 3, Białystok Rouge 3\nGAM : Minsk 2\nNAV : Klaipėda 1\nRéseau LOG : E1 3, E2 5, E3 5, E4 5, R1 2, R2 2, R6 1, R10 5, R14 3, R15 3, R16 1, R17 1, RKA 1, RSU 1, RBI 1, RBR 1","svietchine":"Camp : Rouge\nPC : Daugavpils 0\nBSC : Vilnius 0\nPOW : Riga 0\nDIV+ : Vitebsk 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW, Garde POW\nMP : Kaliningrad Rouge 2, Suwałki Rouge 2, Białystok Rouge 2, Brest Rouge 2, Daugavpils 3, Vitebsk 3\nCIMIC : Brest Rouge 3, Slonim 2, Klaipėda 2, Kaunas 1, Slonim 3\nDSA : Vilnius 2, Vilnius 3, Daugavpils 2, Vitebsk 2, Slonim 1, Klaipėda 1\nGEN : Vitebsk 1, Daugavpils 1, Vilnius 1\nART CA : Minsk 1, Šiauliai 1, Liepāja 2\nEW : Kaliningrad Rouge 3, Suwałki Rouge 3, Białystok Rouge 3\nGAM : Minsk 2\nNAV : Liepāja 1\nRéseau LOG : E1 2, E2 4, E3 5, E4 5, R1 2, R2 2, R7 2, R8 2, R10 2, R15 1, R16 2, R17 2, RKA 2, RSU 2, RBI 2, RBR 2","toukhatchevski":"Camp : Rouge\nPC : Minsk 0\nBSC : Vilnius 0\nPOW : Vitebsk 0\nDIV+ : Slonim 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW, Garde POW\nMP : Białystok Rouge 2, Kaunas 2, Pinsk 2\nCIMIC : Kaliningrad Rouge 3, Suwałki Rouge 3, Brest Rouge 3, Kaunas 1, Pinsk 1\nDSA : Slonim 2, Slonim 3, Minsk 2, Vilnius 2, Klaipėda 2, Klaipėda 3\nGEN : Slonim 1, Minsk 1, Vilnius 1\nART CA : Vilnius 3, Minsk 3, Šiauliai 1\nEW : Białystok Rouge 3, Kaunas 3, Pinsk 3\nGAM : Šiauliai 2\nNAV : Klaipėda 1\nRéseau LOG : E1 1, E2 1, E3 5, E4 5, R1 1, R2 1, R7 1, R8 1, R13 4, R14 5, R16 1, R17 4, RKA 1, RSU 1, RBI 4, RBR 1","gerasimov":"Camp : Rouge\nPC : Vitebsk 0\nBSC : Vilnius 0\nPOW : Daugavpils 0\nDIV+ : Minsk 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW, Garde POW\nMP : Kaliningrad Rouge 2, Suwałki Rouge 2, Białystok Rouge 2, Brest Rouge 2, Garde POW, Vitebsk 3\nCIMIC : Kaliningrad Rouge 3, Suwałki Rouge 3, Slonim 2, Klaipėda 2, Kaunas 1\nDSA : Vitebsk 2, Vilnius 2, Minsk 2, Daugavpils 1, Slonim 1, Klaipėda 1\nGEN : Minsk 1, Vitebsk 1, Vilnius 1\nART CA : Minsk 3, Vilnius 3, Šiauliai 1\nEW : Białystok Rouge 3, Brest Rouge 3, Slonim 3\nGAM : Šiauliai 2\nNAV : Riga 1\nRéseau LOG : E1 2, E2 2, E3 4, E4 5, R1 2, R2 2, R7 2, R8 2, R13 2, R14 4, R15 1, R16 2, RKA 2, RSU 2, RBI 2, RBR 2","tchouikov":"Camp : Rouge\nPC : Kaunas 0\nBSC : Vilnius 0\nPOW : Vitebsk 0\nDIV+ : Klaipėda 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW, Garde POW\nMP : Kaliningrad Rouge 2, Suwałki Rouge 2, Białystok Rouge 2, Brest Rouge 2, Garde POW, Slonim 3\nCIMIC : Białystok Rouge 3, Brest Rouge 3, Slonim 2, Pinsk 2\nDSA : Kaunas 2, Kaunas 3, Vilnius 2, Klaipėda 3, Slonim 1, Pinsk 1\nGEN : Klaipėda 1, Kaunas 1, Vilnius 1\nART CA : Šiauliai 1, Liepāja 1, Vilnius 3\nEW : Kaliningrad Rouge 3, Suwałki Rouge 3, Pinsk 3\nGAM : Šiauliai 2\nNAV : Klaipėda 2\nRéseau LOG : E1 5, E2 2, E3 1, E4 4, R1 5, R2 5, R7 2, R8 2, R14 1, R16 2, R17 2, RKA 2, RSU 2, RBI 2, RBR 2","rokossovski":"Camp : Rouge\nPC : Daugavpils 0\nBSC : Vilnius 0\nPOW : Riga 0\nDIV+ : Vitebsk 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW, Daugavpils 2\nMP : Kaliningrad Rouge 2, Suwałki Rouge 2, Białystok Rouge 2, Brest Rouge 2, Garde POW, Daugavpils 3\nCIMIC : Kaliningrad Rouge 3, Brest Rouge 3, Kaunas 3, Klaipėda 2, Slonim 1\nDSA : Vilnius 3, Šiauliai 2, Minsk 2, Kaunas 1, Klaipėda 1, Kaunas 2\nGEN : Vitebsk 1, Daugavpils 1, Vilnius 1\nART CA : Vilnius 2, Šiauliai 1, Minsk 1\nEW : Suwałki Rouge 3, Białystok Rouge 3, Klaipėda 3\nGAM : Šiauliai 3\nNAV : Liepāja 1\nRéseau LOG : E1 2, E2 4, E3 5, E4 5, R1 2, R2 2, R7 2, R8 2, R10 2, R15 1, R16 2, R17 2, RKA 2, RSU 2, RBI 2, RBR 2","koniev":"Camp : Rouge\nPC : Vitebsk 0\nBSC : Minsk 0\nPOW : Daugavpils 0\nDIV+ : Vilnius 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW\nMP : Suwałki Rouge 2, Garde POW, Vitebsk 3, Kaunas 3, Slonim 1, Pinsk 1\nCIMIC : Kaliningrad Rouge 3, Białystok Rouge 3, Brest Rouge 3, Kaunas 2, Klaipėda 3\nDSA : Vilnius 2, Vilnius 3, Vitebsk 2, Minsk 2, Klaipėda 2, Kaunas 1\nGEN : Vilnius 1, Vitebsk 1, Minsk 1\nART CA : Šiauliai 1, Minsk 3, Liepāja 1\nEW : Suwałki Rouge 3, Slonim 2, Pinsk 2\nGAM : Šiauliai 2\nNAV : Klaipėda 1\nRéseau LOG : E1 2, E2 2, E3 5, E4 5, R1 2, R2 2, R7 2, R8 2, R14 5, R16 2, R17 2, RKA 2, RSU 2, RBI 2, RBR 2","joukov":"Camp : Rouge\nPC : Daugavpils 0\nBSC : Minsk 0\nPOW : Riga 0\nDIV+ : Vitebsk 0\nINF : Kaliningrad Rouge 1, Suwałki Rouge 1, Białystok Rouge 1, Brest Rouge 1, Garde POW, Garde POW\nMP : Kaliningrad Rouge 2, Suwałki Rouge 2, Białystok Rouge 2, Brest Rouge 2, Garde POW, Daugavpils 3\nCIMIC : Kaliningrad Rouge 3, Suwałki Rouge 3, Slonim 2, Klaipėda 2, Kaunas 1\nDSA : Daugavpils 2, Minsk 2, Vitebsk 2, Riga 1, Slonim 1, Klaipėda 1\nGEN : Vitebsk 1, Daugavpils 1, Minsk 1\nART CA : Minsk 3, Vilnius 1, Šiauliai 1\nEW : Białystok Rouge 3, Brest Rouge 3, Slonim 3\nGAM : Vilnius 2\nNAV : Liepāja 1\nRéseau LOG : E1 2, E2 5, E3 5, E4 5, R1 2, R2 2, R7 2, R8 2, R10 3, R16 2, R17 2, RKA 2, RSU 2, RBI 2, RBR 2","tim":"Camp : Bleu\nPC : Olsztyn 0\nBSC : Ostrołęka 0\nPOW : Łódź 0\nDIV+ : Gdańsk 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Ostrołęka 3, Lublin 3\nMP : Kaliningrad Bleu 2, Suwałki Bleu 2\nCIMIC : Białystok Bleu 3, Brest Bleu 3, Lublin 2\nDSA : Olsztyn 2, Ostrołęka 2, Gdańsk 3, Łódź 1, Lublin 1\nGEN : Gdańsk 1, Olsztyn 1, Ostrołęka 1\nART CA : Olsztyn 3, Bydgoszcz 1, Koszalin 1\nEW : Kaliningrad Bleu 3, Suwałki Bleu 3\nGAM : Bydgoszcz 2\nNAV : Gdańsk 2\nRéseau LOG : U1 5, U2 3, U4 3, B1 5, B2 5, B5 2, B7 3, B8 1, B16 1, B17 2, BKA 1, BSU 1, BBI 1, BBR 1","bagar":"Camp : Bleu\nPC : Ostrołęka 0\nBSC : Łódź 0\nPOW : Poznań 0\nDIV+ : Olsztyn 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW, Łódź 3\nMP : Kaliningrad Bleu 2, Suwałki Bleu 2, Białystok Bleu 2, Brest Bleu 2, Lublin 3\nCIMIC : Brest Bleu 3, Gdańsk 3, Lublin 2\nDSA : Olsztyn 2, Olsztyn 3, Ostrołęka 2, Łódź 2, Gdańsk 2, Lublin 1\nGEN : Olsztyn 1, Ostrołęka 1, Łódź 1\nART CA : Ostrołęka 3, Bydgoszcz 1, Varsovie 1\nEW : Kaliningrad Bleu 3, Suwałki Bleu 3, Białystok Bleu 3\nGAM : Varsovie 2\nNAV : Gdańsk 1\nRéseau LOG : U1 2, U2 5, U3 1, U4 4, B1 2, B2 2, B7 5, B8 5, B16 2, B17 2, BKA 2, BSU 4, BBI 2, BBR 2","jeanmichel":"Camp : Bleu\nPC : Poznań 0\nBSC : Szczecin 0\nPOW : Ostrołęka 0\nDIV+ : Łódź 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW, Garde POW\nMP : Kaliningrad Bleu 2, Suwałki Bleu 2, Białystok Bleu 2, Brest Bleu 2, Szczecin 3, Łódź 3\nCIMIC : Brest Bleu 3, Olsztyn 2, Gdańsk 3, Olsztyn 3, Ostrołęka 1\nDSA : Poznań 2, Poznań 3, Szczecin 2, Łódź 2, Gdańsk 2, Olsztyn 1\nGEN : Łódź 1, Poznań 1, Szczecin 1\nART CA : Varsovie 1, Bydgoszcz 1, Radom 1\nEW : Kaliningrad Bleu 3, Suwałki Bleu 3, Białystok Bleu 3\nGAM : Varsovie 2\nNAV : Gdańsk 1\nRéseau LOG : U1 3, U2 5, U3 5, U4 5, B1 2, B2 2, B6 1, B10 5, B14 3, B15 3, B16 1, B17 1, BKA 1, BSU 1, BBI 1, BBR 1","colo":"Camp : Bleu\nPC : Łódź 0\nBSC : Varsovie 0\nPOW : Szczecin 0\nDIV+ : Poznań 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW, Garde POW\nMP : Kaliningrad Bleu 2, Suwałki Bleu 2, Białystok Bleu 2, Brest Bleu 2, Łódź 3, Poznań 3\nCIMIC : Brest Bleu 3, Gdańsk 3, Olsztyn 1, Ostrołęka 1, Lublin 1\nDSA : Varsovie 2, Varsovie 3, Łódź 2, Poznań 2, Gdańsk 1, Gdańsk 2\nGEN : Poznań 1, Łódź 1, Varsovie 1\nART CA : Bydgoszcz 1, Koszalin 2, Radom 1\nEW : Kaliningrad Bleu 3, Suwałki Bleu 3, Białystok Bleu 3\nGAM : Bydgoszcz 2\nNAV : Koszalin 1\nRéseau LOG : U1 4, U2 5, U3 2, U4 5, B1 2, B2 2, B3 2, B9 1, B12 1, B14 2, B16 2, B17 3, BKA 2, BSU 2, BBI 2, BBR 2","santo":"Camp : Bleu\nPC : Bydgoszcz 0\nBSC : Varsovie 0\nPOW : Łódź 0\nDIV+ : Gdańsk 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW\nMP : Kaliningrad Bleu 2, Olsztyn 3, Ostrołęka 3, Lublin 2\nCIMIC : Suwałki Bleu 3, Białystok Bleu 3, Brest Bleu 3, Olsztyn 2, Ostrołęka 2\nDSA : Gdańsk 3, Bydgoszcz 2, Varsovie 2, Olsztyn 1, Ostrołęka 1, Lublin 1\nGEN : Gdańsk 1, Bydgoszcz 1, Varsovie 1\nART CA : Bydgoszcz 3, Koszalin 1, Varsovie 3\nEW : Kaliningrad Bleu 3, Lublin 3\nGAM : Koszalin 2\nNAV : Gdańsk 2\nRéseau LOG : U1 5, U2 4, U3 1, U4 2, B1 5, B2 5, B5 3, B7 4, B8 1, B14 1, B16 1, B17 1, BKA 4, BSU 1, BBI 1, BBR 1","galula":"Camp : Bleu\nPC : Łódź 0\nBSC : Radom 0\nPOW : Poznań 0\nDIV+ : Varsovie 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW, Garde POW\nMP : Kaliningrad Bleu 2, Suwałki Bleu 2, Białystok Bleu 2, Brest Bleu 2, Garde POW, Łódź 3\nCIMIC : Kaliningrad Bleu 3, Brest Bleu 3, Olsztyn 2, Gdańsk 2, Olsztyn 3\nDSA : Łódź 2, Radom 2, Varsovie 2, Poznań 1, Olsztyn 1, Gdańsk 1\nGEN : Varsovie 1, Łódź 1, Radom 1\nART CA : Varsovie 3, Bydgoszcz 1, Radom 3\nEW : Suwałki Bleu 3, Białystok Bleu 3, Gdańsk 3\nGAM : Bydgoszcz 2\nNAV : Szczecin 1\nRéseau LOG : U1 2, U2 2, U3 5, U4 5, B1 2, B2 2, B7 2, B8 2, B14 5, B16 2, B17 2, BKA 2, BSU 2, BBI 2, BBR 2","ardant":"Camp : Bleu\nPC : Olsztyn 0\nBSC : Bydgoszcz 0\nPOW : Łódź 0\nDIV+ : Gdańsk 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW, Garde POW\nMP : Kaliningrad Bleu 2, Suwałki Bleu 2, Białystok Bleu 2, Brest Bleu 2, Garde POW, Ostrołęka 3\nCIMIC : Białystok Bleu 3, Brest Bleu 3, Ostrołęka 2, Lublin 2\nDSA : Olsztyn 2, Olsztyn 3, Bydgoszcz 2, Gdańsk 3, Ostrołęka 1, Lublin 1\nGEN : Gdańsk 1, Olsztyn 1, Bydgoszcz 1\nART CA : Koszalin 1, Bydgoszcz 3, Varsovie 1\nEW : Kaliningrad Bleu 3, Suwałki Bleu 3, Lublin 3\nGAM : Koszalin 2\nNAV : Gdańsk 2\nRéseau LOG : U1 5, U2 3, U4 4, B1 5, B2 5, B7 3, B8 2, B16 2, B17 2, BKA 2, BSU 2, BBI 2, BBR 2","yako":"Camp : Bleu\nPC : Poznań 0\nBSC : Radom 0\nPOW : Szczecin 0\nDIV+ : Łódź 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW, Poznań 2\nMP : Kaliningrad Bleu 2, Suwałki Bleu 2, Białystok Bleu 2, Brest Bleu 2, Garde POW, Poznań 3\nCIMIC : Kaliningrad Bleu 3, Brest Bleu 3, Olsztyn 3, Gdańsk 2, Ostrołęka 1\nDSA : Varsovie 2, Bydgoszcz 2, Radom 3, Olsztyn 1, Gdańsk 1, Olsztyn 2\nGEN : Łódź 1, Poznań 1, Radom 1\nART CA : Varsovie 1, Bydgoszcz 1, Radom 2\nEW : Suwałki Bleu 3, Białystok Bleu 3, Gdańsk 3\nGAM : Varsovie 3\nNAV : Koszalin 1\nRéseau LOG : U1 2, U2 5, U3 5, U4 5, B1 2, B2 2, B7 2, B8 2, B10 3, B16 2, B17 2, BKA 2, BSU 2, BBI 2, BBR 2","beaufre":"Camp : Bleu\nPC : Łódź 0\nBSC : Varsovie 0\nPOW : Poznań 0\nDIV+ : Radom 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW, Garde POW\nMP : Brest Bleu 2, Garde POW, Łódź 3, Lublin 3, Olsztyn 1, Ostrołęka 1\nCIMIC : Kaliningrad Bleu 3, Suwałki Bleu 3, Białystok Bleu 3, Lublin 2, Gdańsk 3\nDSA : Radom 2, Radom 3, Łódź 2, Varsovie 2, Gdańsk 2, Lublin 1\nGEN : Radom 1, Łódź 1, Varsovie 1\nART CA : Varsovie 3, Bydgoszcz 1, Koszalin 1\nEW : Brest Bleu 3, Olsztyn 2, Ostrołęka 2\nGAM : Bydgoszcz 2\nNAV : Gdańsk 1\nRéseau LOG : U1 2, U2 2, U3 4, U4 5, B1 2, B2 2, B7 2, B8 2, B13 2, B14 4, B15 1, B16 2, BKA 2, BSU 2, BBI 2, BBR 2","foch":"Camp : Bleu\nPC : Poznań 0\nBSC : Radom 0\nPOW : Szczecin 0\nDIV+ : Łódź 0\nINF : Kaliningrad Bleu 1, Suwałki Bleu 1, Białystok Bleu 1, Brest Bleu 1, Garde POW, Garde POW\nMP : Kaliningrad Bleu 2, Suwałki Bleu 2, Białystok Bleu 2, Brest Bleu 2, Garde POW, Poznań 3\nCIMIC : Kaliningrad Bleu 3, Suwałki Bleu 3, Lublin 2, Gdańsk 2, Olsztyn 1\nDSA : Poznań 2, Radom 2, Łódź 2, Szczecin 1, Lublin 1, Gdańsk 1\nGEN : Łódź 1, Poznań 1, Radom 1\nART CA : Radom 3, Varsovie 1, Bydgoszcz 1\nEW : Brest Bleu 3, Białystok Bleu 3, Lublin 3\nGAM : Varsovie 2\nNAV : Koszalin 1\nRéseau LOG : U1 2, U2 5, U3 5, U4 5, B1 2, B2 2, B7 2, B8 2, B10 3, B16 2, B17 2, BKA 2, BSU 2, BBI 2, BBR 2"};
  const SUW_F = {"popov":"Kaliningrad","boris":"Suwałki","ivan":"Białystok","svietchine":"Białystok","toukhatchevski":"Białystok","gerasimov":"Białystok","tchouikov":"Kaliningrad","rokossovski":"Suwałki","koniev":"Suwałki","joukov":"Białystok","tim":"Kaliningrad","bagar":"Suwałki","jeanmichel":"Suwałki","colo":"Kaliningrad","santo":"Kaliningrad","galula":"Suwałki","ardant":"Kaliningrad","yako":"Suwałki","beaufre":"Brest","foch":"Brest"};   // fuseau d'effort de la fiche
  const NAVI = SUW ? (typeof RASP_BOT_NAVI !== 'undefined' ? RASP_BOT_NAVI : {}) : {};
  const KAL = SUW ? R.COAST_FUS : null;
  const CAMPN = { B: 'BLEU', R: 'ROUGE' };
  // 10 nov. : le bot joue le camp de son profil (Bleu pour les bots français, Rouge pour les bots russes)
  const campOf = p => /bleu/i.test(String(p.camps || '')) && !/deux/i.test(String(p.camps || '')) ? 'B' : 'R';
  const EMB = SUW ? { B: ['B12', 'B13', 'B14', 'B10'], R: ['R12', 'R13', 'R14', 'R10'] } : { B: ['B9', 'B10', 'B14', 'B2'], R: ['R11', 'R10', 'R13', 'R1'] };   // corridors ENI visés par défaut par une Embuscade
  const GUESS = SUW ? {
    B: { 'DIV+': ['Olsztyn', 'Ostrołęka', 'Gdańsk', 'Lublin', 'Varsovie', 'Bydgoszcz'], BSC: ['Łódź', 'Bydgoszcz', 'Varsovie', 'Radom', 'Poznań'],
      PC: ['Varsovie', 'Łódź', 'Bydgoszcz', 'Radom'], 'ART CA': ['Olsztyn', 'Ostrołęka', 'Lublin', 'Gdańsk'], POW: ['Poznań', 'Łódź', 'Koszalin'] },
    R: { 'DIV+': ['Kaunas', 'Slonim', 'Klaipėda', 'Pinsk', 'Vilnius', 'Šiauliai'], BSC: ['Vitebsk', 'Šiauliai', 'Vilnius', 'Minsk', 'Daugavpils'],
      PC: ['Vilnius', 'Vitebsk', 'Šiauliai', 'Minsk'], 'ART CA': ['Kaunas', 'Slonim', 'Pinsk', 'Klaipėda'], POW: ['Daugavpils', 'Vitebsk', 'Liepāja'] } } : {   // où chercher les grands pions ENI quand on ne sait rien (régions du camp visé)
    B: { 'DIV+': ['Lysanka', 'Dnipro', 'Poltava', 'Zaporijjia', 'Mykolaïv', 'Tcherkassy'], BSC: ['Bobrynets', 'Mykolaïv', 'Tcherkassy', 'Lysanka', 'Kryvyï Rih'],
      PC: ['Kropyvnytskyï', 'Krementchouk', 'Kryvyï Rih', 'Tcherkassy'], 'ART CA': ['Dnipro', 'Kryvyï Rih', 'Poltava', 'Krementchouk'], POW: ['Mykolaïv', 'Bobrynets', 'Lysanka'] },
    R: { 'DIV+': ['Kalatch', 'Novoaïdar', 'Valouïki', 'Louhansk', 'Morozovsk', 'Vechenskaïa'], BSC: ['Sovetskaya', 'Vechenskaïa', 'Morozovsk', 'Kalatch', 'Milerovo'],
      PC: ['Pavlosk', 'Bogoutchar', 'Milerovo', 'Vechenskaïa'], 'ART CA': ['Novoaïdar', 'Milerovo', 'Valouïki', 'Bogoutchar'], POW: ['Morozovsk', 'Milerovo', 'Bogoutchar'] } };
  const LOGT = R.LOG_TOTAL || 30, PER = R.LOG_PER_COR || 5;
  const BREAK = R.BREAK || 50;
  function rng(str) { let h = 2166136261; for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } let x = h >>> 0 || 1; return () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; }
  const clone = o => JSON.parse(JSON.stringify(o));

  // ================================================================== réseau LOG : flot de coût minimal (repris des simulations)
  function mcf(n, edges, S, T) {
    const g = Array.from({ length: n }, () => []);
    const E = edges.map(e => { const a = { to: e.v, cap: e.cap, cost: e.cost, flow: 0, tag: e.tag }; const b = { to: e.u, cap: 0, cost: -e.cost, flow: 0 }; a.r = b; b.r = a; g[e.u].push(a); g[e.v].push(b); return a; });
    for (let it = 0; it < 200; it++) {
      const dist = Array(n).fill(Infinity), prev = Array(n).fill(null); dist[S] = 0;
      for (let k = 0; k < n; k++) { let ch = false; for (let u = 0; u < n; u++) { if (dist[u] === Infinity) continue; for (const e of g[u]) if (e.cap - e.flow > 0 && dist[u] + e.cost < dist[e.to] - 1e-9) { dist[e.to] = dist[u] + e.cost; prev[e.to] = e; ch = true; } } if (!ch) break; }
      if (dist[T] === Infinity || dist[T] >= 0) break;
      let f = Infinity, v = T; while (v !== S) { const e = prev[v]; f = Math.min(f, e.cap - e.flow); v = e.r.to; }
      v = T; while (v !== S) { const e = prev[v]; e.flow += f; e.r.flow -= f; v = e.r.to; }
    }
    return E;
  }
  function solve(c, bscR, divR, dem, noise) {
    const nodes = ['S', 'T']; const id = x => { let i = nodes.indexOf(x); if (i < 0) { nodes.push(x); i = nodes.length - 1; } return i; };
    const edges = [];
    for (const [code, [a, b]] of Object.entries(R.COR[c])) {
      const w = 1 + ((noise && noise[code]) || 0);
      if (!a) edges.push({ u: id('S'), v: id(b), cap: PER, cost: w, tag: { code } });
      else if (b.startsWith('F:')) edges.push({ u: id(a), v: id(b), cap: PER, cost: w, tag: { code } });
      else { edges.push({ u: id(a), v: id(b), cap: PER, cost: w, tag: { code } }); edges.push({ u: id(b), v: id(a), cap: PER, cost: w, tag: { code } }); }
    }
    let need = 0;
    const sink = (node, n) => { if (n > 0) { edges.push({ u: id(node), v: id('T'), cap: n, cost: -1000, tag: { sink: node } }); need += n; } };
    sink(bscR, R.BSC_NEED);
    const agg = {}; for (const [d, n] of dem) agg[d] = (agg[d] || 0) + n;
    for (const [d, n] of Object.entries(agg)) { if (d === 'DIV') sink(divR, n); else sink(d, n); }
    const E = mcf(nodes.length, edges, 0, 1);
    let served = 0; const mk = {}; let total = 0;
    for (const e of E) { if (!e.flow) continue; if (e.tag.sink) served += e.flow; if (e.tag.code) { mk[e.tag.code] = (mk[e.tag.code] || 0) + e.flow; total += e.flow; } }
    for (const k of Object.keys(mk)) if (mk[k] > PER) return null;
    if (served < need || total > LOGT) return null;
    return { mk, total };
  }
  function netCheck(st, c, mk, want) {
    const o = R.orientNetwork(st, c, mk); if (!o.ok) return null;
    const s2 = Object.assign({}, st, { net: Object.assign({}, st.net, { [c]: mk }), netDir: Object.assign({}, st.netDir, { [c]: o.dir }), netCons: Object.assign({}, st.netCons, { [c]: o.cons }), cut: {}, neutReg: {} });
    const lo = R.logistics(s2, c, st.turn || 1);
    let ok = lo.bscIn >= R.BSC_NEED; for (const f of FUS) if (lo.raw[f] < (want['F:' + f] || 0)) ok = false; if (lo.div < (want.DIV || 0)) ok = false;
    return ok ? lo : null;
  }
  const NCACHE = new Map();
  function netPlan(st, c, needs) {
    const reg = t => R.zoneOfSlot(st.units.find(u => u.camp === c && u.type === t).slot).region;
    const bscR = reg('BSC'), divR = reg('DIV+');
    const units = []; for (const [d, n] of needs) for (let i = 0; i < n; i++) units.push(d);
    const key = c + '|' + bscR + '|' + divR + '|' + units.join(',');
    if (NCACHE.has(key)) return NCACHE.get(key);
    let cur = [], best = null;
    for (const d of units) { const tryD = [...cur, [d, 1]]; const s = solve(c, bscR, divR, tryD); if (s) { cur = tryD; best = s; } }
    if (!best) best = solve(c, bscR, divR, []);
    const want = {}; for (const [d, n] of cur) want[d] = (want[d] || 0) + n;
    let res = best && netCheck(st, c, best.mk, want) ? best.mk : null;
    for (let it = 1; !res && best && it < 30; it++) {
      const noise = {}; let x = it * 7919; for (const k of Object.keys(R.COR[c])) { x = (x * 1103515245 + 12345) & 0x7fffffff; noise[k] = (x % 1000) / 2500; }
      const s = solve(c, bscR, divR, cur, noise); if (s && netCheck(st, c, s.mk, want)) res = s.mk;
    }
    const out = { mk: res || (best ? best.mk : {}), ok: !!res };
    if (NCACHE.size > 400) NCACHE.clear();
    NCACHE.set(key, out); return out;
  }
  const netTxt = mk => Object.entries(mk).filter(([, v]) => v > 0).map(([k, v]) => `${k} ${v}`).join(', ');
  const B3 = FUS.map(f => ['F:' + f, 1]);

  // ================================================================== lecture des profils
  const FQ = { Toujours: 1, Souvent: 0.75, Parfois: 0.5, Rarement: 0.2, Jamais: 0 };
  const fq = v => (v in FQ ? FQ[v] : 0.5);
  const num = (v, d) => { const n = parseFloat(v); return isFinite(n) ? n : d; };
  const STRATS = ['percer', 'tenir', 'div', 'bsc', 'pc', 'cb', 'rens', 'proteger', 'log', 'env', 'accu'];
  function norm(p) {
    const q = Object.assign({}, p);
    q.agress = num(p.agress, 3); q.prudence = num(p.prudence, 3); q.ruse = num(p.ruse, 2);
    q.imprevu = num(p.imprevu, 0.1); q.critique = num(p.critique, 0.5); q.tourBlanc = num(p.tourBlanc, 0);
    q.iq = { 'Idées reçues': 0, "Recoupe ce qu'il voit": 1, "Anticipe l'ENI": 2 }[p.raisonne] ?? 1;
    q.calc = fq(p.calcule); q.imp = fq(p.imperatifs); q.chain = fq(p.enchaine);
    q.reserveN = { 'Toujours le maximum': 0, 'Garde 1 carte en réserve': 1, 'Garde 2 cartes ou plus': 2 }[p.reserve] ?? 0;
    q.memDays = { '1 tour': 1, '3 tours': 3, '5 tours': 5, '10 tours': 10, 'Toute la partie': 99 }[p.memoire] ?? 5;
    q.period = { "S'en tient au plan": 99, "S'adapte un peu": 6, "S'adapte beaucoup": 3 }[p.constance] ?? 6;
    q.nFus = { 'Un seul fuseau': 1, 'Deux fuseaux': 2, 'Les trois fuseaux': 3 }[p.effort] ?? 3;
    q.mob = { Statique: 0, 'Peu mobile': 0.25, Mobile: 0.6, 'Très mobile': 0.9 }[p.mobilite] ?? 0.5;
    const ranks = STRATS.map(s => [s, num(p['r_' + s], NaN)]);
    q.ranks = ranks.every(([, r]) => isFinite(r)) ? ranks.sort((a, b) => a[1] - b[1]).map(x => x[0]) : null;   // null : choix libre à chaque tour (Joukov)
    if (!q.ranks) { q.nFus = 2; q.fuseau = 'Le plus favorable'; }   // choix libre (Joukov) : effort sur les deux fuseaux les plus favorables
    q.seuil = p.seuilDiv === 'Jamais sauf pour percer' ? Infinity : num(p.seuilDiv, 50);
    q.navi = NAVI[p.id] || null; q.c = p.campBot || campOf(p); q.rensMin = num(p.rensMin, 0); q.garde = num(p.gardePOW, 1); q.gardeMP = p.gardeMP === 'Oui';   // renforce aussi la garde du POW avec des MP (5 meilleurs bots)
    for (const k of ['rensAvant', 'scoot', 'e_danger', 'e_pow', 'e_sansFlux', 'e_memeFus', 'e_vieux', 'e_bascule', 'e_divLoin', 'b_sead', 'b_cb', 'b_garde']) q['p_' + k] = fq(p[k]);
    return q;
  }
  const BYID = {}; for (const p of PROFILS) BYID[p.id] = p;

  // ================================================================== agent
  // mem : tout ce que le bot retient d'un tour à l'autre (sérialisable)
  function freshMem(P, seed) {
    const rnd = rng(seed + '|init');
    let f0 = SUW && SUW_F[P.id] ? SUW_F[P.id] : (SUW ? { 'Izioum (centre)': 'Suwałki', 'Donetsk (sud)': 'Brest', 'Kharkiv (nord)': 'Kaliningrad' } : { 'Izioum (centre)': 'Izioum', 'Donetsk (sud)': 'Donetsk', 'Kharkiv (nord)': 'Kharkiv' })[P.fuseau] || FUS[Math.floor(rnd() * FUS.length)];
    return { seed, focus: f0, focusAt: 0, M: {}, plan: {}, knownU: {}, est: zeroF(), pressure: zeroF(), seenNet: {}, enemyEngage: null,
      rot: {}, wantDir: {}, cleared: {}, enDp: 0, hitNow: {}, hitCount: {}, ev: {}, fails: [], avoid: {}, secure: [], log: [] };
  }

  function makeAgent(P, mem, st, T) {
    const c = P.c, en = c === 'R' ? 'B' : 'R';
    const A = Object.assign({ c, en, P, T, L: [], st }, clone(mem));
    A.rnd = rng(mem.seed + '|T' + T);
    A.p = x => A.rnd() < x;
    A.X = R.CAMP[c]; A.XE = R.CAMP[en];
    A.lim = R.cardLimit(st, c); A.lo = R.logistics(st, c, T);
    A.dp = () => st.divp[c];
    A.big = t => st.units.find(u => u.camp === c && u.type === t);
    A.reg = s => { const z = R.zoneOfSlot(s); return z ? z.region || null : null; };
    A.divR = () => A.reg(A.big('DIV+').slot);
    A.mine = t => st.units.filter(u => u.camp === c && u.type === t && !u.dead);
    A.act = u => R.active(u, T);
    A.sup = u => A.lo.supplied.includes(u.id);
    A.pick = arr => arr[Math.floor(A.rnd() * arr.length)];
    A.nxt = (k, arr) => { A.rot[k] = A.rot[k] || 0; return arr[A.rot[k] % arr.length]; };
    A.adv = k => { A.rot[k] = (A.rot[k] || 0) + 1; };
    A.fresh = k => k && T - k.day <= P.memDays;
    A.known = type => Object.values(A.knownU).filter(k => k.type === type && !k.dead && A.fresh(k)).sort((a, b) => b.day - a.day)[0];
    A.knownAll = type => Object.values(A.knownU).filter(k => k.type === type && A.fresh(k));
    A.worst = () => FUS.slice().sort((a, b) => A.est[a] - A.est[b])[0];
    // fuseau le plus favorable pour l'effort : le centre (deux voisins, deux ART DIV en appui) sauf si une aile est nettement mieux partie
    A.favFus = () => { const b = A.bestFus(); return A.est[b] >= A.est[CENTRE] + 8 ? b : CENTRE; };
    A.bestFus = () => FUS.slice().sort((a, b) => A.est[b] - A.est[a] || (a === CENTRE ? -1 : 1))[0];
    A.avail = card => !(st.cards[c][card] > T);
    A.cardsUsed = () => A.L.filter(l => !l[5]).length;
    A.cap = () => Math.max(1, A.lim - (A.M.noReserve ? 0 : P.reserveN));
    // types ENI connus dans une zone (région ou fuseau) : pour les Dangers
    A.enemyTypesIn = zone => Object.values(A.knownU).filter(k => A.fresh(k) && !k.dead && (A.reg(k.slot) === zone || (R.zoneOfSlot(k.slot) || {}).fus === zone)).map(k => k.type);
    A.zoneOf = (card, zone, slot) => zone || (slot ? (A.reg(slot) || (R.zoneOfSlot(slot) || {}).fus) : '');
    A.add = (card, zone = '', slot = '', prec = '', disp = '', extra) => {
      if (!card || !R.CARDS[card]) return false;
      if (A.cardsUsed() >= A.cap() || !A.avail(card) || A.L.some(l => l[0] === card)) return false;
      if (!A.filling && (A.avoid[card] || 0) >= T) return false;   // carte mise de côté après un échec (« Change de carte »)
      const C = R.CARDS[card];
      for (const g of C.g) if (st.gauges[c][g] >= 4) return false;
      if (card === 'Engagement de la DIV' && A.dp() <= 0) return false;
      if (card === 'Ordre à la B.LOG' && st.bscg[c] < 50) return false;
      if ((card === 'Engagement GAM' || card === 'Raid aéro' || card === 'Out of contact Attack') && !A.gamOk()) return false;
      if (SUW && R.NAV_CARDS.includes(card) && !A.navOk()) return false;
      if (card === 'Raid amphibie' && !A.mine('INF').some(u => u.slot === 'Réserve' && A.act(u))) return false;
      // Danger rempli (pion ENI connu dans la zone visée) : le bot prudent renonce
      const z = A.zoneOf(card, zone, slot);
      if (!A.force && C.dg && C.dg.length && z && C.dg.some(t => A.enemyTypesIn(z).includes(t))) {
        const avoid = (P.calc + (1 - P.p_e_danger)) / 2;
        if (A.p(avoid)) return false;
      }
      // cible d'un échec récent (« Change de cible »)
      if (!A.filling && z && (A.avoid['@' + card + '@' + z] || 0) >= T) return false;
      A.L.push([card, zone, slot, prec, disp]); return true;
    };
    // impératifs : un bot négligent ne vérifie pas que le pion est actif et ravitaillé
    A.navOk = () => { const n = A.mine('NAV')[0]; if (!n) return false; if (!A.p(P.imp)) return true; return n.slot !== 'Réserve' && A.act(n) && A.sup(n); };
    A.coast = r => SUW && !!r && R.COAST[en].includes(r);
    A.gamOk = () => { const g = A.mine('GAM')[0]; if (!g) return false; if (!A.p(P.imp)) return true; return R.zoneOfSlot(g.slot) && A.act(g) && A.sup(g); };
    A.ewIn = f => A.mine('EW').find(u => (R.zoneOfSlot(u.slot) || {}).fus === f && (!A.p(P.imp) || (A.act(u) && A.sup(u))));
    A.artRear = () => A.mine('ART CA').filter(u => A.act(u) && A.sup(u) && A.reg(u.slot));
    A.guess0 = t => GUESS[en][t] || R.REG[en];
    A.guess = t => { const base = A.guess0(t); if (P.iq < 1) return base;
      const other = ['PC', 'BSC', 'DIV+'].filter(x => x !== t).map(x => A.known(x)).filter(k => k && T - k.day <= 6).map(k => A.reg(k.slot));
      const ok = r => !(A.cleared[r] >= T - 5) && !other.includes(r);
      let g = base.filter(ok);
      if (P.iq >= 2 && t === 'DIV+') { const pri = FUS.slice().sort((a, b) => A.pressure[b] - A.pressure[a]).map(f => ACC[en][f]); g = [...pri.filter(r => g.includes(r)), ...g.filter(r => !pri.includes(r))]; }
      g = [...g, ...R.REG[en].filter(r => !base.includes(r) && ok(r))];
      return g.length ? g : base; };

    // ---------- réseau LOG
    A.tpl = () => {
      const f = A.focus, fs = A.focusList();
      let t;
      switch (P.reseau) {
        case "Concentrée sur l'effort": t = [...B3, ...fs.map(x => ['F:' + x, x === f ? 3 : 1]), ['DIV', 12]]; break;
        case 'Priorité à la DIV+': t = [...B3, ['DIV', 20]]; break;
        case 'Minimum partout': t = [...B3, ['DIV', 6]]; break;
        default: t = [...B3, ...B3, ['DIV', 12]];
      }
      if (A.M.reinforce && A.M.reinforce.until >= T) t.splice(3, 0, ['F:' + A.M.reinforce.f, 2]);
      // mauvais choix : laisser un fuseau sans flux
      if (A.p(P.p_e_sansFlux * 0.5)) { const drop = A.pick(FUS.filter(x => !fs.includes(x))) ; if (drop) t = t.filter(([d]) => d !== 'F:' + drop); }
      return t;
    };
    A.net = needs => {
      const p = netPlan(st, c, needs); if (!p.ok) return false;
      const cur = st.net[c] || {}; const same = Object.keys(Object.assign({}, p.mk, cur)).every(k => (p.mk[k] || 0) === (cur[k] || 0));
      if (same) return true;
      if (A.M.pendingNet && A.M.pendingNet >= T) return true;
      if (A.add('Ordre à la B.LOG', '', '', '', netTxt(p.mk))) { A.M.pendingNet = T + 1; return true; }
      return false;
    };
    // ---------- effort : fuseaux
    A.focusList = () => {
      const f = A.focus; if (P.nFus >= 3) return FUS.slice();
      if (P.nFus === 1) return [f];
      const i = FUS.indexOf(f), ns = [FUS[i - 1], FUS[i + 1]].filter(Boolean); const nb = [ns.length > 1 && A.est[ns[1]] > A.est[ns[0]] ? ns[1] : ns[0]];
      return [f, nb[0]];
    };
    A.pivotTo = (f, n) => { const want = {}; for (const [h, s] of PIV[f].slice(0, n)) want[`${h} ${A.X} ART ${s}`] = f; A.wantDir = want; };
    A.orient = () => {
      if (!A.avail('Renfort de feu') || A.L.some(l => l[0] === 'Renfort de feu')) return;
      const by = {};
      for (const u of A.mine('ART DIV')) { if (!A.act(u)) continue; const home = R.zoneOfSlot(u.slot).fus; const cur = (st.artDir || {})[u.id] || home; const w = A.wantDir[u.slot] || home; if (cur !== w) (by[w] = by[w] || []).push(u.slot); }
      const ks = Object.keys(by); if (!ks.length) return;
      const f = ks.sort((a, b) => by[b].length - by[a].length)[0];
      A.add('Renfort de feu', f, '', by[f].slice(0, 2).join(', '));
    };
    // ---------- combat au Close
    A.burst = (f, n) => {
      const L0 = A.cardsUsed();
      const seq = SUW && f === R.COAST_FUS ? ['Effort COM', 'Appui naval', 'CAS', 'Engagement GAM', 'Brouillage GE'] : ['Effort COM', 'CAS', 'Engagement GAM', 'Brouillage GE'];
      for (const card of seq) { if (A.cardsUsed() - L0 >= n) break; if (card === 'Brouillage GE' && !A.ewIn(f)) continue; A.add(card, f); }
    };
    A.sched = (E, f) => { for (const [card, mep] of [['Effort COM', 4], ['CAS', 2], ['Engagement GAM', 1], ['Brouillage GE', 1]]) { const d = E - mep; if (d >= T) (A.plan[d] = A.plan[d] || []).push([card, f]); } };
    A.playPlan = () => { for (const [card, f] of (A.plan[T] || [])) { if (card === 'Brouillage GE' && !A.ewIn(f)) continue; A.add(card, f); } delete A.plan[T]; for (const k of Object.keys(A.plan)) if (+k < T) delete A.plan[k]; };
    A.defendFus = (f, th, n = 3) => { const w = A.est[f]; if (w > th) return; const L0 = A.cardsUsed(); for (const card of ['Effort COM', 'Brouillage GE', 'CAS', 'Engagement GAM']) { if (A.cardsUsed() - L0 >= n) break; if (card === 'Brouillage GE' && !A.ewIn(f)) continue; A.add(card, f); } };
    // ---------- DIV+
    A.prepare = f => {
      const target = ACC[c][f]; const cur = A.divR(); if (cur === target) return true;
      if (A.M.moving && A.M.moving >= T) return false;
      if (R.unitAt(st, target + ' 0')) return false;
      if (A.add('Mouvement de la DIV', target)) { A.M.moving = T + 2; A.M.moveF = f; }
      return false;
    };
    A.casesIf = f => { const k = R.distance(c, A.divR(), ACC[c][f]); const pot = A.dp() + 3 * (k ? 0 : 1); return Math.floor((k ? pot / 2 : pot) / 3); };
    A.engage = f => { if (T > 28) return false; if (A.M.engaged && T <= A.M.engaged + 3) return false;
      if (A.add('Engagement de la DIV', f)) { A.M.engaged = T; A.M.engF = f; if (A.p(P.chain)) A.sched(T + 3, f); A.ev.engagedNow = f; return true; } return false; };
    A.divFus = () => {
      if (P.navi === 'cote') return KAL;
      switch (P.fusDiv) {
        case 'Celui où il gagne': return A.bestFus();
        case 'Celui où il perd': return A.worst();
        case "Son fuseau d'effort": return A.focus;
        default: return A.M.divRand || (A.M.divRand = A.pick(FUS));
      }
    };
    // engage la DIV+ si le seuil est atteint (o.force : sans condition de seuil ; o.percee : seulement si la percée est à portée)
    A.divTry = (o = {}) => {
      if (T > 28 || A.dp() < 6) return false;
      const f = o.f || A.divFus();
      const percee = A.est[f] + A.casesIf(f) >= BREAK - 2;
      let ready = o.force || percee || (isFinite(P.seuil) && A.dp() >= P.seuil) || A.dp() >= 99;
      if (o.percee) ready = percee || o.force;
      if (A.holdNow && !percee && !o.force) ready = false;
      // garder de quoi tenir la DIV+ ENI loin de son front
      if (ready && !percee && !o.force && A.enDp >= 30 && A.p(P.p_b_garde)) ready = false;
      if (!ready) { if (!o.quiet && A.dp() >= Math.min(P.seuil, 90) * 0.7 && T <= 25 && A.p(Math.max(P.mob, 0.3))) A.prepare(f); return false; }
      if (A.divR() !== ACC[c][f] && !A.p(P.p_e_divLoin) && T <= 26 && !o.force) { A.prepare(f); return false; }
      return A.engage(f);
    };
    // ---------- artillerie et frappes
    A.alive = sl => { const k = Object.values(A.knownU).find(x => x.slot === sl); return !(k && k.dead); };
    A.usedArt = () => new Set(A.L.filter(l => l[0] === 'Frappe en profondeur' || l[0] === 'Contre-batterie').map(l => l[3]));
    // Frappe en profondeur : seulement sur un pion ENI repéré, ou une ART DIV ENI pas connue détruite (même règle que la page joueur, 10 nov.)
    A.fepOk = sl => { const p = R.parseSlot(sl); if (!p) return false; if (p.art) return A.alive(sl); const k = A.knownU[sl]; return !!(k && k.type && !k.dead); };
    A.salvo = (targets, n = 3) => {
      targets = targets.filter(Boolean).filter(A.fepOk); if (!targets.length) return 0;
      if (!A.avail('Frappe en profondeur') || A.L.some(l => l[0] === 'Frappe en profondeur')) return 0;
      const used = A.usedArt();
      const arts = A.artRear().filter(u => !used.has(u.slot)).sort((a, b) => (st.cb[a.id] ? 1 : 0) - (st.cb[b.id] ? 1 : 0));
      let k = 0;
      for (let i = 0; i < Math.min(n, arts.length); i++) {
        const t = targets[i % targets.length];
        if (k === 0) { if (!A.add('Frappe en profondeur', '', t, arts[i].slot)) return 0; }
        else A.L.push(['Frappe en profondeur', '', t, arts[i].slot, '', true]);
        k++;
      }
      return k;
    };
    A.salvoN = big => P.salve === 'Toujours' ? 3 : P.salve === 'Jamais' ? 1 : big ? 3 : 1;
    // frappe d'un grand pion connu, selon les habitudes du bot
    A.strikeBig = (k, mode) => {
      const t = k.type, r = A.reg(k.slot), age = T - k.day;
      if (age > 5 && !A.p(P.p_e_vieux)) { A.intelOn(r, t); return; }       // cible trop vieille : on reconfirme
      if (age >= 1 && mode !== 'now' && A.p(P.rensAvant === 'Souvent' ? 0.75 : P.rensAvant === 'Rarement' ? 0.2 : 0) && !(A.M.confirm && A.M.confirm[k.slot] >= T - 1)) { A.intelOn(r, t); (A.M.confirm = A.M.confirm || {})[k.slot] = T + 1; return; }
      const n = mode === 'salve' ? 3 : A.salvoN(true);
      A.salvo([k.slot], n);
      A.add('Frappe drone', '', k.slot);
      if (A.coast(r)) A.add('Bombardement naval', '', k.slot);
      if (r) { A.add('Sabotage', '', k.slot); A.add('Out of contact Attack', '', k.slot);
        if (T >= 3) { const dsa = A.enemyTypesIn(r).includes('DSA'); if (!dsa || !A.p(P.p_b_sead)) A.add('Bombardement', r); else A.add('SEAD', r); }
        if (P.maquis === 'Sur un grand pion repéré') A.add('Maquis de partisans', r);
        if (P.assautBP === 'Sur un grand pion repéré') A.add('Assaut de la BP', r); }
    };
    A.intelOn = (r, t) => {
      if (!r) return false;
      let cards = t === 'PC' ? ['ROHUM', 'Renseignement SAT', 'OSINT', 'Renseignement drone'] : ['Renseignement drone', 'Renseignement SAT', 'Renseignement aérien', 'OSINT', 'ROHUM'];
      if (A.coast(r) && A.p(0.6)) cards = ['Reco de plage', ...cards];
      for (const card of cards) if (A.add(card, r)) return true;
      return false;
    };
    A.hunt = t => {
      const k = A.known(t);
      if (k) return A.strikeBig(k);
      const g = A.guess(t);
      if (A.intelOn(A.nxt('h' + t, g), t)) A.adv('h' + t);
    };
    A.fepClose = f => { const a = A.artRear().find(u => !A.usedArt().has(u.slot)); if (!a) return false; const side = T % 2 ? 'Nord' : 'Sud'; let sl = `${f} ${A.XE} ART ${side}`; if (!A.alive(sl)) sl = `${f} ${A.XE} ART ${side === 'Nord' ? 'Sud' : 'Nord'}`;
      if (!A.fepOk(sl)) return false;
      return P.salve === 'Toujours' ? A.salvo([sl, `${f} ${A.XE} ART ${side === 'Nord' ? 'Sud' : 'Nord'}`], 3) > 0 : A.add('Frappe en profondeur', '', sl, a.slot); };
    A.cbOn = f => { if (Object.values(st.cb).some(m => m.camp === c && m.zone.fus === f)) return false; const used = A.usedArt(); const free = A.artRear().filter(u => !st.cb[u.id] && !used.has(u.slot)); if (!free.length) return false; return A.add('Contre-batterie', f, '', free[0].slot); };
    A.counterArt = () => {
      const ka = A.knownAll('ART CA').filter(k => !k.dead && T - k.day <= 1)[0]; if (!ka) return false;
      const z = R.zoneOfSlot(ka.slot); const zone = z.region || z.fus; if (!zone) return false;
      if (Object.values(st.cb).some(m => m.camp === c && (m.zone.region === zone || m.zone.fus === zone))) return false;
      const used = A.usedArt(); const a = A.artRear().find(u => !st.cb[u.id] && !used.has(u.slot)); if (!a) return false;
      return A.add('Contre-batterie', zone, '', a.slot);
    };
    // ---------- déplacements de pions
    A.reserved = new Set();
    A.freeSlot = (r, avoid) => {
      const occ = new Set(st.units.filter(u => u.camp === c && !u.dead).map(u => u.slot));
      for (const n of [1, 2, 3, 4, 5]) { const s = `${r} ${n}`; if (n >= 4 && !st.opened.includes(s)) continue; if (!occ.has(s) && !A.reserved.has(s) && s !== avoid) return s; }
      return null;
    };
    A.moveUnits = (card, type, moves) => {
      const us = A.mine(type); if (!us.length) return false;
      const disp = us.map((u, i) => `${type} ${i + 1} → ${moves[u.id] || u.slot}`).join(' · ');
      if (!A.add(card, '', '', '', disp)) return false;
      Object.values(moves).forEach(s => A.reserved.add(s)); return true;
    };
    A.bigRegs = () => ['PC', 'BSC', 'DIV+'].map(t => A.reg(A.big(t).slot));
    A.fortify = r => {
      if (st.fort.includes(r + ' 0')) return false;
      if (A.mine('GEN').some(u => A.act(u) && A.reg(u.slot) === r)) return A.add('Travaux du GEN', '', '', '', `Fortifier ${r} 0`);
      if (A.M.fortPlan && A.M.fortPlan.at >= T - 3) return false;
      const big = A.bigRegs(); const mover = A.mine('GEN').filter(u => A.act(u) && A.reg(u.slot) && A.reg(u.slot) !== r).sort((a, b) => (big.includes(A.reg(a.slot)) ? 1 : 0) - (big.includes(A.reg(b.slot)) ? 1 : 0))[0];
      const free = A.freeSlot(r); if (!mover || !free) return false;
      if (A.moveUnits('Ordre à la B.GEN', 'GEN', { [mover.id]: free })) { A.M.fortPlan = { r, at: T }; return true; }
      return false;
    };
    A.protect = r => {
      const ds = A.mine('DSA'); if (ds.some(u => A.reg(u.slot) === r)) return false;
      const big = A.bigRegs(); const mover = ds.filter(u => A.act(u) && !big.includes(A.reg(u.slot) || (R.zoneOfSlot(u.slot) || {}).fus))[0] || ds.filter(u => A.act(u))[0];
      const free = A.freeSlot(r); if (!mover || !free) return false;
      return A.moveUnits('Ordre à la DSA', 'DSA', { [mover.id]: free });
    };
    A.guardWith = (type, r) => {   // MP qui rejoint un grand pion (sécurisation)
      const us = A.mine(type); if (us.some(u => A.reg(u.slot) === r)) return false;
      const big = A.bigRegs(); const m = us.find(u => A.act(u) && A.reg(u.slot) && !big.includes(A.reg(u.slot))) || us.find(u => A.act(u) && u.slot === 'Réserve');
      const free = A.freeSlot(r); if (!m || !free) return false;
      return A.moveUnits('Ordre aux MP et CIMIC', 'MP', { [m.id]: free });
    };
    A.relocate = t => {
      const card = { PC: 'Bascule de PC', BSC: 'Bascule BSC', 'DIV+': 'Mouvement de la DIV' }[t];
      if (!A.avail(card)) return false;
      if (t === 'DIV+' && ((A.M.engaged && T <= A.M.engaged + 3) || (A.M.moving && A.M.moving >= T))) return false;
      const cur = A.reg(A.big(t).slot); const acc = Object.values(ACC[c]);
      const score = r => { let s = 0; const us = st.units.filter(u => u.camp === c && !u.dead && A.reg(u.slot) === r);
        if (us.some(u => u.type === 'MP')) s += 3; if (us.some(u => u.type === 'DSA')) s += 2; if (us.some(u => u.type === 'INF')) s += 1; if (st.fort.includes(r + ' 0')) s += 3;
        if (t === 'DIV+' && acc.includes(r)) s += 4; if (t === 'DIV+' && r === ACC[c][A.focus]) s += 3;
        if (t !== 'DIV+' && acc.includes(r)) s -= 2;
        return s + A.rnd(); };
      const cand = R.REG[c].filter(r => r !== cur && !R.unitAt(st, r + ' 0') && !A.reserved.has(r + ' 0')).sort((a, b) => score(b) - score(a));
      if (!cand.length || !A.add(card, cand[0])) return false;
      A.reserved.add(cand[0] + ' 0');
      if (t === 'DIV+') { A.M.moving = T + 2; A.M.moveF = FUS.find(f => ACC[c][f] === cand[0]) || A.M.moveF; }
      if (t === 'BSC') A.M.relogAt = T + R.CARDS[card].mep;
      // les bots forts sécurisent la manœuvre : refortifier et faire rejoindre un MP (Ben, 9 nov.)
      if (P.critique >= 0.7) A.secure.push({ t, r: cand[0], at: T + R.CARDS[card].mep });
      return true;
    };
    A.retaliate = () => { const k = ['DIV+', 'BSC', 'PC'].map(t => A.known(t)).find(k => k && T - k.day <= 4); if (!k) return false; return A.salvo([k.slot], A.salvoN(true)) > 0 || A.add('Frappe drone', '', k.slot); };
    A.scootAfter = () => {
      if (!A.p(P.p_scoot)) return;
      const cbs = new Set(A.L.filter(l => l[0] === 'Contre-batterie').map(l => l[3]));
      const shooters = A.L.filter(l => l[0] === 'Frappe en profondeur' && !cbs.has(l[3])).map(l => A.mine('ART CA').find(u => u.slot === l[3])).filter(Boolean);
      if (!shooters.length) return;
      const moves = {}; const regs = R.REG[c].slice().sort(() => A.rnd() - 0.5);
      for (const u of shooters) { const from = A.reg(u.slot); const r = regs.find(x => x !== from && A.freeSlot(x) && !A.bigRegs().includes(x)); if (!r) continue; const s = A.freeSlot(r); moves[u.id] = s; A.reserved.add(s); }
      if (Object.keys(moves).length) A.moveUnits('Ordre à la B.ART', 'ART CA', moves);
    };
    return A;
  }

  // ================================================================== stratégies (une par ligne du classeur)
  const STRAT = {
    percer: A => {
      const P = A.P, f = A.focus;
      A.playPlan();
      const n = A.P.agress >= 4 ? 3 : A.P.agress >= 2 ? 2 : 1;
      if (P.appuiClose === 'Chaque tour') {
        if (A.p(P.chain)) { if (!A.M.nextE || A.T >= A.M.nextE) { A.M.nextE = A.T + 5; A.sched(A.M.nextE, f); } }
        else A.burst(f, n);
      } else if (P.appuiClose === 'Quand un fuseau recule') { const w = A.worst(); if (A.ev.recule && A.ev.recule.length) A.burst(A.ev.recule[0], n); else if (A.est[w] < 0) A.burst(w, Math.max(1, n - 1)); }
      else if (A.p(0.25)) A.burst(f, 1);
      for (const g of A.focusList()) if (g !== f && A.p(A.P.agress / 8)) A.burst(g, 1);
      A.divTry();
    },
    tenir: A => {
      // choix libre (Joukov) : la victoire aux points se joue sur la somme des curseurs, on soutient chaque fuseau qui recule
      if (!A.P.ranks) for (const f of (A.ev && A.ev.recule) || []) A.defendFus(f, 99, 2);
      const th = [-3, -6, -10, -15, -22][A.P.agress - 1] ?? -10;
      A.defendFus(A.worst(), th, A.P.prudence >= 4 ? 3 : 2);
    },
    div: A => {
      const kd = A.known('DIV+');
      if (kd && A.T - kd.day <= 4) A.strikeBig(kd);
      else if (A.T % 2 === 0 || A.P.iq >= 2) { if (A.intelOn(kd ? A.reg(kd.slot) : A.nxt('dv', A.guess('DIV+')), 'DIV+')) A.adv('dv'); }
    },
    bsc: A => A.hunt('BSC'),
    pc: A => A.hunt('PC'),
    cb: A => {
      if (A.p(A.P.p_b_cb)) A.counterArt();
      const order = [A.worst(), ...FUS.filter(x => x !== A.worst())];
      const watched = FUS.filter(f => Object.values(A.st.cb).some(m => m.camp === A.c && m.zone.fus === f)).length;
      if (watched < 2) for (const f of order.slice(0, 2)) if (A.cbOn(f)) break;
      A.fepClose(A.focus);
    },
    rens: A => {
      const t = ['BSC', 'PC', 'DIV+'].find(x => !A.known(x));
      if (t) { if (A.intelOn(A.nxt('r' + t, A.guess(t)), t)) A.adv('r' + t); }
      const f = A.nxt('eg', FUS); A.adv('eg'); if (A.ewIn(f)) A.add('Ecoute GE', f);
    },
    proteger: A => {
      const P = A.P;
      if (P.fortifie === 'Dès le tour 1' || (P.fortifie !== 'Jamais' && A.M.wasHit)) {
        for (const t of ['PC', 'BSC', 'DIV+']) { const r = A.reg(A.big(t).slot); if (r && !A.st.fort.includes(r + ' 0') && (P.fortifie === 'Dès le tour 1' || (A.hitCount[t] || 0) > 0)) { if (A.fortify(r)) break; } }
      }
      const tgt = { PC: 'PC', BSC: 'BSC', 'DIV+': 'DIV+' }[P.dsa];
      if (tgt) A.protect(A.reg(A.big(tgt).slot));
      else if (P.dsa === 'Réparties' && A.T % 4 === 0) A.protect(A.reg(A.big(A.pick(['PC', 'BSC', 'DIV+'])).slot));
      else if (P.dsa === 'Les ART CA' && A.T % 3 === 0) { const a = A.mine('ART CA').find(u => A.reg(u.slot)); if (a) A.protect(A.reg(a.slot)); }
    },
    log: A => {
      const P = A.P;
      if (A.M.relogAt && A.T >= A.M.relogAt) { if (A.net(A.tpl())) A.M.relogAt = null; }
      else if (A.T % 4 === 0 || A.M.focusChanged) { if (A.net(A.tpl())) A.M.focusChanged = false; }
      const b = A.st.bscg[A.c];
      // 11 nov. : la réparation des jauges PC, BSC et ALAT passe par la REMEC (le réglage « effortLog » des profils la gouverne)
      const gam = A.mine('GAM').find(u => !u.dead);
      if ((P.effortLog === 'Dès que la BSC baisse' && b < 100) || (P.effortLog === 'Seulement sous 50 %' && b < 50)) A.add('REMEC', 'BSC');
      else if (A.st.pcg[A.c] <= 60 && P.effortLog !== 'Jamais') A.add('REMEC', 'PC');
      else if (gam && A.st.gauges[A.c].ALAT >= 2 && P.effortLog !== 'Jamais') A.add('REMEC', 'GAM');
    },
    env: A => {
      const P = A.P;
      if (P.maquis === 'Tôt dans la partie' && A.T <= 10) { const k = A.known('BSC') || A.known('PC'); A.add('Maquis de partisans', k ? A.reg(k.slot) : A.guess('BSC')[0]); }
      if (A.p(P.ruse / 6)) { const k = A.known('PC'); A.add('Intox L2I', k ? A.reg(k.slot) : A.pick(A.guess('DIV+'))); }
      if (A.p(P.ruse / 8)) { for (const f of WINGS) { const sl = `${f} ${A.X} 3`; if (!R.unitAt(A.st, sl) && A.ewIn(f)) { A.add('Déception GE', '', sl); break; } } }
      if (P.justice === 'Dès que possible' && A.st.pow[A.c] >= 3) A.add('Transfert à la justice');
    },
    accu: A => {
      if (A.st.divp[A.c] < 95 && A.P.effortLog !== 'Jamais') A.add('Effort LOG', 'DIV+');
    },
  };

  // Joukov : pas de priorité fixe, il classe les stratégies selon la situation du tour
  function dynRanks(A) {
    const sc = {}; const w = A.est[A.worst()], b = A.est[A.bestFus()];
    const rec = (A.ev && A.ev.recule || []).length;
    sc.tenir = (w <= -20 ? 100 : w <= -10 ? 70 : 30) + 20 * rec;
    sc.percer = (b + A.casesIf(A.bestFus()) >= BREAK - 4 ? 95 : 50) + (A.dp() >= 60 ? 15 : 0);
    sc.div = A.known('DIV+') ? 85 : A.enDp >= 30 ? 60 : 35;
    sc.bsc = A.known('BSC') ? 80 : 40; sc.pc = A.known('PC') ? 75 : 30;
    sc.cb = A.knownAll('ART CA').some(k => A.T - k.day <= 1) ? 70 : 38;
    sc.rens = ['BSC', 'PC', 'DIV+'].filter(t => !A.known(t)).length * (A.T >= 15 ? 8 : 15);
    sc.proteger = A.M.wasHit ? 65 : 25; sc.log = A.st.bscg[A.c] < 80 || A.M.relogAt ? 66 : 32;
    sc.env = 20 + (A.T <= 8 ? 10 : 0); sc.accu = A.T < 15 ? 45 : 20;
    return STRATS.slice().sort((a, b) => sc[b] - sc[a]);
  }

  // ================================================================== réactions aux événements du tour précédent
  function react(A) {
    const P = A.P, ev = A.ev || {}, st = A.st, T = A.T;
    // sécurisation des grands pions déplacés (bots forts)
    A.secure = A.secure.filter(s => {
      if (T < s.at) return true;
      const u = A.big(s.t); const r = A.reg(u.slot); if (r !== s.r) return T < s.at + 3;
      if (!st.fort.includes(r + ' 0')) A.fortify(r);
      A.guardWith('MP', r);
      return false;
    });
    for (const t of ['PC', 'BSC', 'DIV+']) {
      if (!A.hitNow[t]) continue;
      A.hitCount[t] = (A.hitCount[t] || 0) + 1; A.M.wasHit = true;
      const r = A.reg(A.big(t).slot);
      const x = { PC: P.x_pc, BSC: P.x_bsc, 'DIV+': P.x_div }[t];
      if (x === 'Riposte') A.retaliate();
      else if (x === 'Fortifie') { if (!A.fortify(r)) A.protect(r); }
      else if (x === 'Effort LOG') { if (t === 'DIV+') A.add('Effort LOG', 'DIV+'); else A.add('REMEC', t); }   // 11 nov. : PC et BSC réparés par la REMEC
      else if (x === 'Engage la DIV+ tout de suite') A.divTry({ force: true });
      else if (x === 'Bascule de PC' || x === 'Bascule BSC' || x === 'Mouvement de la DIV') A.relocate(t);
      // en plus : bascule systématique ou non (mauvais choix pour les faibles, sécurisée pour les forts)
      if (t !== 'DIV+' && !A.L.some(l => /^Bascule/.test(l[0])) && A.p(P.p_e_bascule * 0.8)) A.relocate(t);
    }
    if (ev.powNeut) { if (P.x_pow === 'Renforce la garde') A.M.moreGuard = true; else if (P.x_pow === 'Riposte') A.retaliate(); }
    if (ev.artNeut) {
      if (P.x_art === 'Contre-batterie en retour') A.counterArt();
      else if (P.x_art === 'Déplace les autres ART CA') { const moves = {}; for (const u of A.mine('ART CA').filter(u => A.act(u) && A.reg(u.slot))) { const r = R.REG[A.c].find(x => x !== A.reg(u.slot) && A.freeSlot(x) && !A.bigRegs().includes(x)); if (r) { const s = A.freeSlot(r); moves[u.id] = s; A.reserved.add(s); } } if (Object.keys(moves).length) A.moveUnits('Ordre à la B.ART', 'ART CA', moves); }
      else if (P.x_art === "Renseigne l'ART ENI") { const ka = A.knownAll('ART CA').sort((a, b) => b.day - a.day)[0]; A.intelOn(ka ? A.reg(ka.slot) || A.guess('ART CA')[0] : A.guess('ART CA')[0], 'ART CA'); }
    }
    if (ev.repere && ev.repere.length && P.x_repere !== 'Ignore') {
      const k = A.knownU[ev.repere[0]];
      if (k) { if (P.x_repere === 'Frappe en salve') A.strikeBig(k, 'salve'); else if (P.x_repere === 'Frappe tout de suite') A.strikeBig(k, 'now'); else A.strikeBig(k); }
    }
    const e = A.enemyEngage;
    if (e && e.effet >= T && !A.M.engSeen) {
      A.M.engSeen = e.effet;
      const f = e.fus;
      if (P.x_engENI === 'Renforce ce fuseau') { A.defendFus(f, 99, 4); A.M.reinforce = { f, until: e.effet }; A.net(A.tpl()); }
      else if (P.x_engENI === 'Engage sa propre DIV+ ailleurs') A.divTry({ f: FUS.filter(x => x !== f).sort((a, b) => A.est[b] - A.est[a])[0], force: A.dp() >= 15 });
      else if (P.x_engENI === 'Frappe la DIV+ ENI') { const kd = A.known('DIV+'); const zr = ACC[A.en][f]; if (kd) A.strikeBig(kd, 'now'); else { A.intelOn(zr, 'DIV+'); A.add('Frappe drone', '', zr + ' 0'); A.salvo([zr + ' 0'], A.salvoN(true)); } }
      if (A.p(P.p_e_memeFus) && R.distance(A.c, A.divR(), ACC[A.c][f]) <= 1) A.engage(f);   // mauvais choix : contre-engagement dans le même fuseau
    }
    if (e && e.effet < T) A.M.engSeen = 0;
    if (ev.recule && ev.recule.length) {
      const f = ev.recule[0];
      if (P.x_recule === 'Renforce ce fuseau') A.defendFus(f, 99, 3);
      else if (P.x_recule === 'Ajoute des flux LOG' && !(A.M.reinforce && A.M.reinforce.until >= T - 2) && A.est[f] <= -6) { A.M.reinforce = { f, until: T + 6 }; A.net(A.tpl()); }
      else if (P.x_recule === 'Engage la DIV+') A.divTry({ f, force: true });
    }
    const near = FUS.filter(f => A.est[f] >= BREAK - 12).sort((a, b) => A.est[b] - A.est[a])[0];
    if (near) {
      if (P.x_percer === 'Engage la DIV+ pour percer') A.divTry({ f: near, percee: true });
      else if (P.x_percer === 'Pousse ce fuseau') A.burst(near, 3);
      else A.holdNow = true;
    }
    if (ev.cuts && ev.cuts.length) {
      if (P.x_coupe === 'Retrace le réseau') A.net(A.tpl());
      else if (P.x_coupe === "Ouverture d'itinéraire") { for (const k of ev.cuts) { const regs = R.COR[A.c][k].filter(r => r && !r.startsWith('F:')); const g = A.mine('GEN').find(u => A.act(u) && regs.includes(A.reg(u.slot))); if (g && A.add("Ouverture d'itinéraire", '', g.slot)) break; } }
      else if (P.x_coupe === 'Riposte') { const seen = Object.keys(A.seenNet); A.add('Embuscade', seen.length ? A.pick(seen) : A.pick(EMB[A.en])); }
    }
    if (st.pcg[A.c] < 40) {
      if (P.x_jauge === 'Joue plus prudent') { A.P = Object.assign({}, A.P, { agress: Math.max(1, A.P.agress - 2) }); }
      else if (P.x_jauge === 'Va au plus offensif') { A.P = Object.assign({}, A.P, { agress: 5 }); A.M.noReserve = true; }
    }
    if (ev.dsaDead && ev.dsaDead.length) {
      const r = ev.dsaDead[0];
      if (P.x_dsa === 'Remplace les DSA') A.protect(r);
      else if (P.x_dsa === 'Fortifie') A.fortify(r);
      else if (P.x_dsa === 'Déplace le grand pion couvert') { const t = ['PC', 'BSC', 'DIV+'].find(t => A.reg(A.big(t).slot) === r); if (t) A.relocate(t); }
    }
    if (ev.fails && ev.fails.length) {
      for (const [card, zone] of ev.fails) {
        if (P.x_echec === 'Change de carte') A.avoid[card] = T + 3;
        else if (P.x_echec === 'Change de cible' && zone) A.avoid['@' + card + '@' + zone] = T + 4;
        else if (P.x_echec === 'Rejoue la même dès son retour') (A.M.replay = A.M.replay || []).push([card, zone, T + 12]);
      }
    }
    if (A.M.replay) A.M.replay = A.M.replay.filter(([card, zone, until]) => { if (until < T) return false; if (!A.avail(card)) return true; const ok = /Renseignement|ROHUM|OSINT|Bombardement|Intox|Maquis/.test(card) ? A.add(card, zone) : (FUS.includes(zone) ? A.add(card, zone) : false); return !ok; });
    // situation critique non couverte : l'ENI est près de percer
    const crit = FUS.filter(f => A.est[f] <= -(BREAK - 12)).sort((a, b) => A.est[a] - A.est[b])[0];
    if (crit && A.p(P.critique)) {
      A.defendFus(crit, 99, 4); A.M.reinforce = { f: crit, until: T + 4 };
      if (A.dp() >= 15 && R.distance(A.c, A.divR(), ACC[A.c][crit]) <= 1) A.engage(crit);
      else A.prepare(crit);
    }
    // fin de partie
    if (T >= 25) {
      const lead = FUS.reduce((s, f) => s + A.est[f], 0) > 0;
      const x = lead ? P.x_finMene : P.x_finMen;
      if (x === 'Se défend') A.defendFus(A.worst(), 99, 3);
      else if (x === 'Accélère' || x === 'Tout pour percer') { A.burst(A.bestFus(), 3); A.divTry({ f: A.bestFus(), force: A.dp() >= 12 }); A.M.noReserve = true; }
      else if (x === 'Assaut de la BP et Maquis') { const k = A.known('BSC') || A.known('PC') || A.known('DIV+'); const r = k ? A.reg(k.slot) : A.guess('BSC')[0]; A.add('Assaut de la BP', r); A.add('Maquis de partisans', r); }
    }
    // choix libre (Joukov) : la victoire aux points se joue sur la somme des curseurs ; la DIV+ ne doit pas finir la partie inemployée
    if (!P.ranks && T >= 24 && T <= 27 && A.dp() >= 9 && !(A.M.engaged && T <= A.M.engaged + 3)) {
      const f = FUS.slice().sort((a, b) => (A.est[b] + A.casesIf(b)) - (A.est[a] + A.casesIf(a)))[0];
      if (T >= 26 || A.divR() === ACC[A.c][f]) A.divTry({ f, force: true }); else A.prepare(f);
    }
    if (!P.ranks && T >= 26) for (const f of FUS.slice().sort((a, b) => Math.abs(A.est[a]) - Math.abs(A.est[b])).slice(0, 2)) A.burst(f, 2);
    // anticipation (raisonnement « Anticipe l'ENI »)
    if (P.iq >= 2) {
      const kd = A.known('DIV+');
      if (kd && T - kd.day <= 3 && A.enDp >= 20) A.strikeBig(kd, 'now');
      if (A.enDp >= 30 && (!kd || T - kd.day > 3)) { if (A.intelOn(A.nxt('dv', A.guess('DIV+')), 'DIV+')) A.adv('dv'); }
    }
  }

  // entretien : garde du POW, transfert, réseau après mouvement de la DIV+, orientation des ART DIV
  function upkeep(A) {
    const st = A.st, P = A.P, T = A.T;
    const guards = 1 + st.units.filter(u => u.camp === A.c && !u.dead && u.slot === 'Garde POW').length;
    const wantMore = st.pow[A.c] >= 5 * guards - 2 || (A.M.moreGuard && guards < 4);
    if (wantMore && !(A.M.guardOrder >= T)) {
      const free = u => u.slot !== 'Garde POW' && A.act(u) && A.reg(u.slot) && !['BSC', 'DIV+', 'PC'].some(t => A.reg(A.big(t).slot) === A.reg(u.slot));
      const viaINF = () => {
        const infs = A.mine('INF');
        const cand = infs.find(free) || (A.P.navi === 'raid' ? null : infs.find(u => u.slot === 'Réserve'));
        if (!cand) return false;
        const disp = infs.map((u, i) => `INF ${i + 1} → ${u.id === cand.id ? 'Garde POW' : u.slot}`).join(' · ');
        return A.add('Ordre à la B.ZARR', '', '', '', disp);
      };
      // 5 meilleurs bots : un MP rejoint la garde tant qu'elle ne compte pas plus de MP que d'INF (INF d'office compris),
      // ce qui garde Transfert à la justice sans pénalité ; sinon, ou faute de MP libre ou de carte, un INF.
      const viaMP = () => {
        const mps = A.mine('MP');
        const cand = mps.find(u => A.act(u) && u.slot === 'Réserve') || mps.find(free);
        return !!cand && A.moveUnits('Ordre aux MP et CIMIC', 'MP', { [cand.id]: 'Garde POW' });
      };
      let ok = false;
      if (P.gardeMP) {
        const g = st.units.filter(u => u.camp === A.c && !u.dead && u.slot === 'Garde POW');
        const mpG = g.filter(u => u.type === 'MP').length, infG = 1 + g.filter(u => u.type === 'INF').length;
        ok = mpG <= infG ? (viaMP() || viaINF()) : (viaINF() || viaMP());
      } else ok = viaINF();
      if (ok) { A.M.guardOrder = T + 2; A.M.moreGuard = false; }
    }
    if (P.justice === 'Quand le POW est plein' && st.pow[A.c] >= 5 * guards - 1) A.add('Transfert à la justice');
    if (P.justice !== 'Jamais' && st.pow[A.c] >= 10) A.add('Transfert à la justice');
    if (A.M.moving && A.M.moving < T && A.M.moveF && A.divR() === ACC[A.c][A.M.moveF]) { if (A.net(A.tpl())) A.M.moveF = null; }
    if (P.assautBP === 'Dès que possible' && T >= 2) { const k = A.known('BSC') || A.known('PC') || A.known('DIV+'); A.add('Assaut de la BP', k ? A.reg(k.slot) : A.pick(A.guess('BSC'))); }
    if (P.assautBP === 'En dernier recours' && FUS.some(f => A.est[f] <= -(BREAK - 10))) { const k = A.known('DIV+') || A.known('BSC'); if (k) A.add('Assaut de la BP', A.reg(k.slot)); }
    A.orient();
  }

  // intention navale (Suwałki) : passe avant la stratégie du profil
  function navPlan(A) {
    const P = A.P, T = A.T, st = A.st, en = A.en;
    const smallIn = z => Object.values(A.knownU).filter(k => A.fresh(k) && !k.dead && k.type in R.SMALL && k.type !== 'ART DIV' && (A.reg(k.slot) === z || ((R.zoneOfSlot(k.slot) || {}).fus === z && (R.parseSlot(k.slot) || {}).camp === en)));
    // le bot du raid ramène une INF en réserve si la sienne est perdue
    if (P.navi === 'raid' && T <= 22 && !A.mine('INF').some(u => u.slot === 'Réserve') && !(A.M.infBack >= T)) {
      const infs = A.mine('INF'); const big = A.bigRegs(); const cand = infs.find(u => A.act(u) && A.reg(u.slot) && !big.includes(A.reg(u.slot))) || infs.find(u => A.act(u) && A.reg(u.slot));
      if (cand && A.add('Ordre à la B.ZARR', '', '', '', infs.map((u, i) => `INF ${i + 1} → ${u.id === cand.id ? 'Réserve' : u.slot}`).join(' · '))) A.M.infBack = T + 2;
    }
    if (!A.navOk()) return;
    if (P.navi === 'cote') {
      A.add('Appui naval', KAL);
      const k = smallIn(KAL).sort((a, b) => b.day - a.day)[0]; if (k) A.add('Commando marine', '', k.slot);
      if (!smallIn(KAL).length && (T <= 4 || A.p(0.4))) A.add('Reco de plage', KAL);
      if (A.est[KAL] < 0) A.add('Effort COM', KAL);
      return;
    }
    if (P.navi === 'nav') {
      if (Object.values(A.knownU).some(k => k.type === 'NAV' && k.dead)) A.M.navKilled = T;
      if (A.M.navKilled) { A.add('Appui naval', KAL); return; }   // NAV adverse détruit : on garde l'avantage sur la côte
      const k = A.known('NAV');
      if (k && T - k.day <= 4) {   // NAV repéré : on frappe avec tout ce qui peut le détruire ou le neutraliser
        A.force = true;
        A.add('Commando marine', '', k.slot);
        A.add('Raid aéro', '', k.slot);
        A.add('Frappe drone', '', k.slot);
        if (A.reg(k.slot)) A.add('Bombardement naval', '', k.slot);
        if (A.fepOk(k.slot)) A.salvo([k.slot], 2);
        A.force = false;
      } else {   // on fouille la côte ennemie, un port par tour
        const g = [R.ACCESS[en][KAL], KAL, ...R.COAST[en].filter(r => r !== R.ACCESS[en][KAL])];
        const z = k ? (A.reg(k.slot) || KAL) : A.nxt('navH', g); if (!k) A.adv('navH');
        for (const card of z === KAL ? ['Reco de plage'] : ['Reco de plage', 'Renseignement drone', 'Renseignement aérien', 'Renseignement SAT']) if (A.add(card, z)) break;
      }
      return;
    }
    if (P.navi === 'raid') {
      if (T < 3) return;
      // cible : la région côtière où un grand pion ENI est connu, sinon celle où l'on connaît le moins de défenseurs
      const regs = R.COAST[en].slice();
      const bigK = Object.values(A.knownU).find(k => A.fresh(k) && !k.dead && R.BIG.includes(k.type) && regs.includes(A.reg(k.slot)));
      const tgt = bigK ? A.reg(bigK.slot) : (A.M.raidT && regs.includes(A.M.raidT) ? A.M.raidT : regs.sort((a, b) => smallIn(a).length - smallIn(b).length || (a === R.ACCESS[en][KAL] ? 1 : -1))[0]);
      A.M.raidT = tgt;
      const scouted = (A.M.raidScout || 0) >= T - 4;
      if (!scouted && !bigK) { if (A.add('Reco de plage', tgt)) A.M.raidScout = T + 4; return; }   // reconnaître la plage avant de débarquer
      if (smallIn(tgt).some(k => k.type === 'INF' || k.type === 'NAV') && A.p(P.calc)) { const k = smallIn(tgt).find(x => x.type === 'INF' || x.type === 'NAV'); A.force = true; A.add('Commando marine', '', k.slot); A.add('Bombardement naval', '', k.slot); A.force = false; }   // dangers du raid : on les traite d'abord
      A.force = true; if (A.mine('INF').some(u => u.slot === 'Réserve' && A.act(u))) A.add('Raid amphibie', tgt); A.force = false;
    }
  }

  // remplissage : cartes utiles qui restent, jusqu'à la limite (hors réserve)
  function fill(A) {
    A.filling = true;
    const f = A.focus, XE = A.XE, T = A.T;
    const steps = [
      () => STRAT.percer(A), () => A.defendFus(A.worst(), 99, 1), () => STRAT.cb(A), () => STRAT.rens(A),
      () => A.add('Frappe drone', '', `${f} ${XE} ART ${T % 2 ? 'Sud' : 'Nord'}`),
      () => A.add('Effort COM', f), () => { if (A.ewIn(f)) A.add('Brouillage GE', f); },
      () => { const k = A.known('BSC') || A.known('PC') || A.known('DIV+'); if (k) A.strikeBig(k); },
      () => { const seen = Object.entries(A.seenNet).sort((a, b) => b[1] - a[1]).map(x => x[0]).filter(k => R.COR[A.en][k] && R.COR[A.en][k][0]); A.add('Embuscade', seen[0] || A.nxt('emb', EMB[A.en])); A.adv('emb'); },
      () => { if (A.dp() < 95 && A.P.effortLog !== 'Jamais') A.add('Effort LOG', 'DIV+'); },
      () => { const g = A.nxt('fi', FUS); A.adv('fi'); if (A.ewIn(g)) A.add('Ecoute GE', g); },
      () => A.add('Renseignement SAT', A.pick(A.guess('BSC'))),
      ...(SUW ? [
        () => A.add('Appui naval', R.COAST_FUS),
        () => { const k = Object.values(A.knownU).filter(x => A.fresh(x) && !x.dead && x.type in R.SMALL && (A.coast(A.reg(x.slot)) || (R.zoneOfSlot(x.slot) || {}).fus === R.COAST_FUS && (R.parseSlot(x.slot) || {}).camp === A.en)).sort((a, b) => b.day - a.day)[0]; if (k) A.add('Commando marine', '', k.slot); },
        () => { if (A.T >= 4 && A.p(0.2 + A.P.ruse / 10)) A.add('Raid amphibie', A.pick(R.COAST[A.en])); },
      ] : []),
    ];
    for (const fn of steps) { if (A.cardsUsed() >= A.cap()) break; fn(); }
    A.filling = false;
  }

  // carte au hasard (imprévisibilité) : on tire jusqu'à trouver une ligne valide
  function randomCard(A) {
    const st = A.st; const names = Object.keys(R.CARDS).filter(k => A.avail(k) && !A.L.some(l => l[0] === k) && !['Ordre à la B.LOG', 'Ordre à la DSA', 'Ordre à la B.ZARR', 'Ordre aux MP et CIMIC', 'Ordre à la B.GEN', 'Ordre à la B.ART', 'Travaux du GEN', 'Engagement de la DIV'].includes(k));
    for (let i = 0; i < 12; i++) {
      const card = A.pick(names); if (!card) return null; const C = R.CARDS[card];
      const eReg = A.pick(R.REG[A.en]), f = A.pick(FUS);
      let l;
      switch (C.tgt) {
        case 'fuseau': l = [card, f, '', '', '']; if (card === 'Renfort de feu') { const u = A.mine('ART DIV').find(x => A.act(x)); if (!u) continue; l[3] = u.slot; } break;
        case 'zoneEnemy': case 'regionEnemy': l = [card, eReg, '', '', '']; break;
        case 'slotEnemy': case 'slotEnemyDeep': l = [card, '', `${eReg} ${Math.floor(A.rnd() * 4)}`, '', '']; if (card === 'Frappe en profondeur') { const a = A.artRear()[0]; if (!a) continue; l[3] = a.slot; } break;
        case 'corridorEnemy': l = [card, A.pick(Object.keys(R.COR[A.en])), '', '', '']; break;
        case 'logEffort': l = [card, A.pick(['DIV+', f]), '', '', '']; break;
        case 'remec': l = [card, A.pick(A.mine('GAM').some(u => !u.dead) ? ['GAM', 'PC', 'BSC'] : ['PC', 'BSC']), '', '', '']; break;
        case 'none': l = [card, '', '', '', '']; break;
        default: continue;
      }
      if (txtOf(A.T, [l], A.c) && R.checkOrders(st, A.c, txtOf(A.T, [l], A.c), null).lines.every(o => o.status === 'ok')) return l;
    }
    return null;
  }

  const txtOf = (T, L, c = 'R') => [`ORDRES ${CAMPN[c]} | TOUR ${T} | ${L.filter(l => !l[5]).length} carte(s) | Prêt à envoyer`, ...L.map((l, i) => `${i + 1};${l[0]};;;${l[1] || ''};${l[2] || ''};${l[3] || ''};${l[4] || ''}`)].join(' || ');

  // 10 nov. : ordres préparés du tour 1 — rien n'est encore repéré chez l'ENI, la Frappe en profondeur ne peut viser qu'une ART DIV ENI ; les autres tirs sont retirés
  const fepFilterT1 = msg => {
    const parts = String(msg).split(' || '); const head = parts.shift();
    const keep = parts.filter(l => { const f = l.split(';'); if (f[1] !== 'Frappe en profondeur') return true; const p = R.parseSlot(f[5]); return !!(p && p.art); });
    if (keep.length === parts.length) return msg;
    let fep = 0; const n = keep.filter(l => l.split(';')[1] !== 'Frappe en profondeur' || ++fep === 1).length;
    return [head.replace(/\d+ carte\(s\)/, n + ' carte(s)'), ...keep.map((l, i) => l.replace(/^\d+;/, `${i + 1};`))].join(' || ');
  };

  // ================================================================== Suwałki : transposition des fiches de déploiement (12 nov.)
  // Chaque région ukrainienne prend la place d'une région de même rôle (accès d'un fuseau, deuxième ligne, arrière) ;
  // Kharkiv → Kaliningrad, Izioum → Suwałki, Donetsk → Brest ; les pions en plus (Suwałki en a davantage) tiennent Białystok ;
  // le NAV se poste sur la côte ; le réseau LOG est recalculé.
  const SUW_REG = {
    B: { Poltava: 'Gdańsk', Dnipro: 'Olsztyn', Zaporijjia: 'Lublin', Krementchouk: 'Varsovie', 'Kryvyï Rih': 'Radom', 'Kropyvnytskyï': 'Łódź', Tcherkassy: 'Bydgoszcz', Lysanka: 'Poznań', Bobrynets: 'Koszalin', 'Mykolaïv': 'Szczecin' },
    R: { 'Valouïki': 'Klaipėda', 'Novoaïdar': 'Kaunas', Louhansk: 'Pinsk', Pavlosk: 'Šiauliai', Bogoutchar: 'Vilnius', Milerovo: 'Minsk', Kalatch: 'Daugavpils', 'Vechenskaïa': 'Vitebsk', Sovetskaya: 'Riga', Morozovsk: 'Liepāja' } };
  const SUW_FUS = { Kharkiv: 'Kaliningrad', Izioum: 'Suwałki', Donetsk: 'Brest' };
  const SUW_SPARE = { B: 'Ostrołęka', R: 'Slonim' };
  const mirrorDep = (txt, c) => { const o = c === 'B' ? 'R' : 'B'; const m = {}; R.REG[c].forEach((r, i) => { m[r] = R.REG[o][i]; });
    const re = new RegExp(Object.keys(m).sort((a, b) => b.length - a.length).join('|'), 'g');
    return txt.replace(re, x => m[x]).replace(new RegExp('\\b' + R.CAMP[c] + '\\b', 'g'), R.CAMP[o]).replace(/^Réseau LOG :.*$/m, 'Réseau LOG :')
      .replace(/^Camp : .*$/m, 'Camp : ' + (o === 'B' ? 'Bleu' : 'Rouge')); };
  function suwDeploy(raw, P, seed) {
    const c = P.c, X = R.CAMP[c]; const rnd = rng(seed + '|dep');
    const rows = []; const used = new Set(); const cnt = {};
    const max = Object.assign({}, R.SMALL); for (const t of R.BIG) max[t] = 1;
    const put = (type, slot) => { if (slot !== 'Garde POW' && used.has(slot)) return false; if (max[type] != null && (cnt[type] || 0) >= max[type]) return false; if (slot !== 'Garde POW') used.add(slot); cnt[type] = (cnt[type] || 0) + 1; rows.push([type, slot]); return true; };
    const map = s => { if (s === 'Garde POW') return s; const m = s.match(/^(.+?) (Bleu|Rouge) (.+)$/); if (m) return SUW_FUS[m[1]] ? `${SUW_FUS[m[1]]} ${m[2]} ${m[3]}` : null; const k = s.match(/^(.+) (\d)$/); return k && SUW_REG[c][k[1]] ? `${SUW_REG[c][k[1]]} ${k[2]}` : null; };
    const src = []; for (const line of String(raw.msgDep || '').split('\n')) { const i = line.indexOf(' : '); if (i < 0) continue; const t = line.slice(0, i).trim(); if (t === 'Camp' || t === 'Réseau LOG') continue;
      for (const s of line.slice(i + 3).split(',').map(x => x.trim()).filter(Boolean)) { const n = map(s); if (n) src.push([t, n]); } }
    // d'abord les grands pions et les fuseaux (Białystok reprend le dispositif de Suwałki), puis l'arrière avec les pions qui restent
    const isF = s => / (Bleu|Rouge) \d$/.test(s);
    for (const [t, n] of src) if (R.BIG.includes(t)) put(t, n);
    for (const [t, n] of src) if (isF(n)) { put(t, n); const m = n.match(/^Suwałki (Bleu|Rouge) (\d)$/); if (m) put(t, `Białystok ${m[1]} ${m[2]}`); }
    for (const [t, n] of src) if (!R.BIG.includes(t) && !isF(n)) put(t, n);
    // région d'accès de Białystok : pions restants
    for (const t of ['DSA', 'EW', 'MP', 'INF']) for (const k of [1, 2, 3]) { if ((cnt[t] || 0) >= (max[t] || 0)) break; if (!used.has(`${SUW_SPARE[c]} ${k}`)) put(t, `${SUW_SPARE[c]} ${k}`); }
    // NAV : région côtière d'accès d'abord (emplacements 1 à 3), sinon une autre région côtière
    const coast = [ACC[c][R.COAST_FUS], ...R.COAST[c].filter(r => r !== ACC[c][R.COAST_FUS])];
    let nav = false; for (const r of coast) { for (const k of [2, 1, 3]) if (!nav && !used.has(`${r} ${k}`)) nav = put('NAV', `${r} ${k}`); }
    const by = {}; for (const [t, s] of rows) (by[t] = by[t] || []).push(s);
    let txt = Object.entries(by).map(([t, l]) => `${t} : ${l.join(', ')}`).join('\n');
    // réseau LOG : sur l'état de départ (camp adverse en miroir, sans réseau)
    try {
      const other = mirrorDep(txt, c);
      const g = R.setupGame('dep-' + seed, c === 'B' ? txt : other, c === 'B' ? other : txt);
      const st = g && g.state;
      if (st) { const p = netPlan(st, c, [...B3, ...(P.reseau === 'Priorité à la DIV+' ? [['DIV', 20]] : P.reseau === 'Minimum partout' ? [['DIV', 6]] : [...B3, ['DIV', 12]])]); if (p.mk) txt += '\nRéseau LOG : ' + netTxt(p.mk); }
    } catch (e) { }
    void rnd; return 'Camp : ' + (c === 'B' ? 'Bleu' : 'Rouge') + '\n' + txt;
  }

  // ================================================================== API
  function create(id, seed, mem0) {
    const raw = BYID[id]; if (!raw) throw new Error('bot inconnu : ' + id);
    const P = norm(raw);
    const bot = { id, P, raw, mem: mem0 || freshMem(P, seed || String(Date.now())) };
    bot.deploy = () => SUW ? (SUW_DEP[id] || suwDeploy(raw, P, bot.mem.seed)) : raw.msgDep;
    // ordres du tour T sur l'état réel (le bot n'en lit que son propre camp)
    bot.orders = st => {
      const T = st.turn, mem = bot.mem;
      let L = [];
      const A = makeAgent(P, mem, st, T);
      if (T === 1 && raw.msgT1 && !SUW) {
        const msg1 = fepFilterT1(raw.msgT1);   // 10 nov. : au tour 1, la Frappe en profondeur ne peut viser que les ART DIV ENI
        const ch = R.checkOrders(st, P.c, msg1, null);
        if (ch.lines.every(o => o.status !== 'ignored')) { saveMem(bot, A); return msg1; }
      }
      const blank = A.p(P.tourBlanc);
      if (!blank && A.lim > 0) {
        // remise à jour de l'effort selon la constance du plan
        if (P.navi === 'cote') A.focus = KAL;   // intention navale : l'effort reste sur le fuseau côtier
        else if (T - mem.focusAt >= P.period || mem.focusAt === 0) {
          let nf = A.focus;
          if (P.fuseau === 'Le plus menacé') nf = A.worst(); else if (P.fuseau === 'Le plus favorable') nf = A.favFus();
          else if (P.period < 99 && A.est[A.focus] <= -15 && A.p(0.5)) nf = A.bestFus();
          if (nf !== A.focus) { A.focus = nf; A.M.focusChanged = true; A.pivotTo(nf, P.nFus === 1 ? 2 : 1); }
          A.focusAt = T;
        }
        if (SUW && P.navi) navPlan(A);   // l'intention navale passe en premier
        react(A);
        upkeep(A);
        A.divTry({ quiet: true });   // la décision d'engager la DIV+ ne dépend pas des cartes qui restent
        const order = P.ranks || dynRanks(A);
        for (const s of order) { if (A.cardsUsed() >= A.cap()) break; STRAT[s](A); }
        // renseignement minimum
        const intel = A.L.filter(l => R.CARDS[l[0]].ph === 'R').length;
        if (intel < P.rensMin) STRAT.rens(A);
        // mauvais choix : frapper le POW adverse
        if (A.p(P.p_e_pow * 0.25)) { const k = A.known('POW'); A.add('Frappe drone', '', k ? k.slot : A.guess('POW')[0] + ' 0'); }
        // remplissage jusqu'à la limite (hors réserve)
        if (A.cardsUsed() < A.cap()) fill(A);
        A.scootAfter();
        // imprévisibilité : une carte au hasard
        if (A.L.length && A.p(P.imprevu)) { const l = randomCard(A); if (l) { const i = A.L.findIndex(x => !x[5] && !/^Frappe en profondeur$/.test(x[0])); if (i >= 0) A.L[i] = l; } }
        L = A.L;
      }
      // contrôle final : les lignes refusées par le moteur sont retirées
      let txt = txtOf(T, L, P.c);
      const ch = R.checkOrders(st, P.c, txt, null);
      const rk = rng(bot.mem.seed + '|chk' + T); const bad = new Set(ch.lines.filter(o => o.status === 'ignored' || o.status === 'cancel' || (o.status === 'void' && rk() < P.imp)).map(o => o.n));
      if (bad.size) { L = L.filter((l, i) => !bad.has(i + 1)); txt = txtOf(T, L, P.c); }
      A.log = (A.log || []).concat([`T${T}: ${L.filter(l => !l[5]).map(l => l[0]).join(', ') || '(aucun ordre)'}`]).slice(-40);
      saveMem(bot, A);
      return txt;
    };
    // ce que le bot apprend de la résolution (son compte rendu, les combats, les curseurs)
    bot.observe = (out, before) => {
      const st = out.state, T = before.turn, m = bot.mem, c = bot.P.c, en = c === 'R' ? 'B' : 'R';
      const reg = s => { const z = R.zoneOfSlot(s); return z ? z.region || null : null; };
      const ev = { repere: [], fails: [], cuts: [], dsaDead: [] };
      for (const [slot, type, neut] of out.rep[c].seen) {
        const z = R.zoneOfSlot(slot); if (!z || z.camp !== en) continue;
        for (const k of Object.keys(m.knownU)) if (m.knownU[k].slot === slot) delete m.knownU[k];
        if (type) { m.knownU[slot] = { slot, type, day: T, dead: neut === -1 }; if (['PC', 'BSC', 'DIV+'].includes(type) && neut !== -1) ev.repere.push(slot); }
        if (/ 0$/.test(slot) && z.region) { if (['PC', 'BSC', 'DIV+'].includes(type)) delete m.cleared[z.region]; else m.cleared[z.region] = T; }
      }
      for (const line of out.rep[c].intel) { const re = /([A-Z]{1,2}\d{0,2}) = (\d) LOG/g; let x; while ((x = re.exec(line))) m.seenNet[x[1]] = +x[2]; }
      for (const k of Object.keys(m.knownU)) if (T - m.knownU[k].day > Math.min(99, bot.P.memDays + 4)) delete m.knownU[k];
      for (const line of out.rep[c].enemy) {
        const g = line.match(/engagement de sa DIV\+ dans le fuseau (?:de |d')(\S+) \(effet au tour (\d+)\)/); if (g) m.enemyEngage = { fus: g[1], effet: +g[2] };
        for (const f of FUS) if (/(CAS|Engagement GAM|Effort COM|Brouillage GE|Renfort de feu)/.test(line) && line.includes(f)) m.pressure[f] += 1;
      }
      for (const line of out.rep[c].own) { const x = line.match(/^(.+?) (?:sur (?:le fuseau (?:de |d'))?(.+?) )?\(jouée au tour \d+\) → échec/); if (x) { const card = Object.keys(R.CARDS).find(k => x[1].startsWith(k)); if (card) ev.fails.push([card, (x[2] || '').replace(/ \d$/, '')]); } }
      for (const f of FUS) m.pressure[f] *= 0.85;
      m.enDp = Math.min(60, m.enDp + 3);
      for (const line of out.rep[c].own) { const x = line.match(/DIV\+ ENI .*?jauge DIV\+ (\d+) → (\d+)/); if (x) m.enDp = +x[2]; }
      if (m.enemyEngage && m.enemyEngage.effet === T) m.enDp = 0;
      m.hitNow = {}; for (const l of out.road) { const x = l.match(new RegExp(`^(PC|BSC|DIV\\+) ${R.ADJ[c]} \\(.*\\) touché`)); if (x) m.hitNow[x[1]] = true; }
      // pions amis : ART CA neutralisées, DSA détruites, POW neutralisé, corridors coupés
      const u0 = id => before.units.find(u => u.id === id);
      for (const u of st.units) {
        if (u.camp !== c) continue; const b = u0(u.id); if (!b) continue;
        if (u.type === 'ART CA' && u.neut >= T && u.neut !== b.neut) ev.artNeut = true;
        if (u.type === 'DSA' && u.dead && !b.dead) ev.dsaDead.push(reg(b.slot) || (R.zoneOfSlot(b.slot) || {}).fus);
        if (u.type === 'POW' && u.neut >= T && u.neut !== b.neut) ev.powNeut = true;
      }
      ev.cuts = Object.keys(st.cut).filter(k => R.COR[c][k] && st.cut[k] >= T + 1 && st.cut[k] !== before.cut[k] && (st.net[c][k] || 0) > 0);
      const s = c === 'B' ? 1 : -1; ev.recule = [];
      for (const f of FUS) {
        const rr = out.combat && out.combat[f]; if (!rr) continue;
        const v = rr.win === c ? 1 : rr.win === en ? -1 : 0; if (v < 0) { m.pressure[f] += 0.5; ev.recule.push(f); }
        m.est[f] += 2 * v;
        const real = st.cursor[f] * s, prev = before.cursor[f] * s; const x = R.divCross(prev, real); if (x) m.est[f] = x.th;
        m.est[f] = Math.max(-48, Math.min(48, m.est[f]));
      }
      for (const e of out.engage || []) m.est[e.f] += (e.c === c ? 1 : -1) * e.cases;
      m.ev = ev;
    };
    return bot;
  }
  function saveMem(bot, A) {
    const keep = ['seed', 'focus', 'focusAt', 'M', 'plan', 'knownU', 'est', 'pressure', 'seenNet', 'enemyEngage', 'rot', 'wantDir', 'cleared', 'enDp', 'hitNow', 'hitCount', 'ev', 'fails', 'avoid', 'secure', 'log'];
    const m = {}; for (const k of keep) m[k] = A[k]; bot.mem = clone(m);
  }
  const list = () => PROFILS.map(p => ({ id: p.id, nom: p.nom, desc: p.desc, niveau: +p.niveau, rang: p.rang, cache: p.cache === 'Oui', camps: p.camps, camp: p.campBot || campOf(p) }));
  return { create, list, PROFILS, norm, netPlan, netTxt };
}

if (typeof module === 'object' && module.exports) module.exports = { RaspBotCore, RASP_BOT_PROFILS };
