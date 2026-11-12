/* Raspoutitsa — moteur d'arbitrage (règles du livre, version du 5 oct. 2026 ; PARTIE-HUMAINE : règles d'après la partie humaine, 5 nov. 2026) */
const R = (() => {
'use strict';
// ------------------------------------------------------------------ données
// 12 nov. : trois plateaux. Front ukrainien (3 fuseaux, sans appui naval), trouée de Suwałki (4 fuseaux, avec appui naval)
// et Porte de Focșani (3 fuseaux, Carpates, Focșani et Boudjak, avec appui naval sur la mer Noire).
// Le plateau vient de l'adresse de la page (?plateau=suwalki ou ?plateau=focsani), ou de RASP_PLATEAU (essais hors navigateur). Sans rien : front ukrainien.
const PLATEAU = (typeof RASP_PLATEAU !== 'undefined' && RASP_PLATEAU) || (typeof globalThis !== 'undefined' && globalThis.RASP_PLATEAU) || (typeof location !== 'undefined' && ((location.search.match(/[?&]plateau=(suwalki|focsani)(&|$)/i) || [])[1] || '').toLowerCase()) || 'ukraine';
const SUW = PLATEAU === 'suwalki', FOC = PLATEAU === 'focsani';
const NAVAL = SUW || FOC;   // plateaux avec la mer : pion NAV, jauge NAV et cartes navales
const ART_SIDES = FOC ? ['Ouest', 'Est'] : ['Nord', 'Sud'];   // les deux ART DIV imprimées de chaque moitié de fuseau
const FUS = SUW ? ['Kaliningrad', 'Suwałki', 'Białystok', 'Brest'] : FOC ? ['Carpates', 'Focșani', 'Boudjak'] : ['Kharkiv', 'Izioum', 'Donetsk'];               // du nord au sud (Focșani : d'ouest en est)
const FUS_NOM = SUW ? { Kaliningrad: 'Kaliningrad (nord)', 'Suwałki': 'Suwałki (centre nord)', 'Białystok': 'Białystok (centre sud)', Brest: 'Brest (sud)' } : FOC ? { Carpates: 'Carpates (ouest)', 'Focșani': 'Focșani (centre)', Boudjak: 'Boudjak (est, côtier)' } : { Kharkiv: 'Kharkiv (nord)', Izioum: 'Izioum (centre)', Donetsk: 'Donetsk (sud)' };
const DE_FUS = SUW ? { Kaliningrad: 'de Kaliningrad', 'Suwałki': 'de Suwałki', 'Białystok': 'de Białystok', Brest: 'de Brest' } : FOC ? { Carpates: 'des Carpates', 'Focșani': 'de Focșani', Boudjak: 'du Boudjak' } : { Kharkiv: 'de Kharkiv', Izioum: "d'Izioum", Donetsk: 'de Donetsk' };
const NDIV = SUW ? 'quatre' : 'trois';   // divisions au contact
// zones côtières (Suwałki) : 3 régions par camp, et le fuseau de Kaliningrad
const COAST = SUW ? { B: ['Szczecin', 'Koszalin', 'Gdańsk'], R: ['Riga', 'Liepāja', 'Klaipėda'] } : FOC ? { B: ['Varna', 'Constanța', 'Tulcea'], R: ['Odessa', 'Mykolaïv', 'Kherson'] } : { B: [], R: [] };
const COAST_FUS = SUW ? 'Kaliningrad' : FOC ? 'Boudjak' : null;
const REG = FOC ? {
  B: ['Craiova', 'Pitești', 'Brașov', 'Bucarest', 'Buzău', 'Roussé', 'Călărași', 'Brăila', 'Varna', 'Constanța', 'Tulcea'],
  R: ['Suceava', 'Tchernivtsi', 'Iași', 'Bălți', 'Khmelnytskyï', 'Chișinău', 'Ouman', 'Podilsk', 'Odessa', 'Mykolaïv', 'Kherson'],
} : SUW ? {
  B: ['Szczecin', 'Koszalin', 'Gdańsk', 'Poznań', 'Bydgoszcz', 'Olsztyn', 'Łódź', 'Varsovie', 'Ostrołęka', 'Radom', 'Lublin'],
  R: ['Riga', 'Liepāja', 'Klaipėda', 'Daugavpils', 'Šiauliai', 'Kaunas', 'Vitebsk', 'Vilnius', 'Slonim', 'Minsk', 'Pinsk'],
} : {
  B: ['Lysanka', 'Tcherkassy', 'Poltava', 'Kropyvnytskyï', 'Krementchouk', 'Dnipro', 'Bobrynets', 'Kryvyï Rih', 'Zaporijjia', 'Mykolaïv'],
  R: ['Valouïki', 'Pavlosk', 'Kalatch', 'Novoaïdar', 'Bogoutchar', 'Vechenskaïa', 'Milerovo', 'Sovetskaya', 'Louhansk', 'Morozovsk'],
};
const COR = {
  B: { U1: [null, 'Lysanka'], U2: [null, 'Tcherkassy'], U3: [null, 'Bobrynets'], U4: [null, 'Mykolaïv'],
    B1: ['Lysanka', 'Tcherkassy'], B2: ['Tcherkassy', 'Poltava'], B3: ['Lysanka', 'Kropyvnytskyï'], B4: ['Poltava', 'Krementchouk'],
    B5: ['Kropyvnytskyï', 'Krementchouk'], B6: ['Krementchouk', 'Dnipro'], B7: ['Kropyvnytskyï', 'Bobrynets'], B8: ['Krementchouk', 'Kryvyï Rih'],
    B9: ['Bobrynets', 'Kryvyï Rih'], B10: ['Kryvyï Rih', 'Dnipro'], B11: ['Bobrynets', 'Mykolaïv'], B12: ['Dnipro', 'Zaporijjia'],
    B13: ['Mykolaïv', 'Kryvyï Rih'], B14: ['Kryvyï Rih', 'Zaporijjia'],
    BK: ['Poltava', 'F:Kharkiv'], BI: ['Dnipro', 'F:Izioum'], BD: ['Zaporijjia', 'F:Donetsk'] },
  R: { E1: [null, 'Kalatch'], E2: [null, 'Vechenskaïa'], E3: [null, 'Sovetskaya'], E4: [null, 'Morozovsk'],
    R1: ['Valouïki', 'Pavlosk'], R2: ['Pavlosk', 'Kalatch'], R3: ['Valouïki', 'Novoaïdar'], R4: ['Pavlosk', 'Bogoutchar'],
    R5: ['Kalatch', 'Vechenskaïa'], R6: ['Novoaïdar', 'Bogoutchar'], R7: ['Bogoutchar', 'Vechenskaïa'], R8: ['Bogoutchar', 'Milerovo'],
    R9: ['Vechenskaïa', 'Sovetskaya'], R10: ['Novoaïdar', 'Milerovo'], R11: ['Milerovo', 'Sovetskaya'], R12: ['Novoaïdar', 'Louhansk'],
    R13: ['Milerovo', 'Louhansk'], R14: ['Sovetskaya', 'Morozovsk'], R15: ['Louhansk', 'Morozovsk'],
    RK: ['Valouïki', 'F:Kharkiv'], RI: ['Novoaïdar', 'F:Izioum'], RD: ['Louhansk', 'F:Donetsk'] },
};
if (SUW) {   // plateau Suwałki v2 (liste des corridors du 11 nov.)
  COR.B = { U1: [null, 'Szczecin'], U2: [null, 'Poznań'], U3: [null, 'Łódź'], U4: [null, 'Radom'],
    B1: ['Szczecin', 'Koszalin'], B2: ['Koszalin', 'Gdańsk'], B3: ['Szczecin', 'Poznań'], B4: ['Koszalin', 'Bydgoszcz'], B5: ['Gdańsk', 'Bydgoszcz'], B6: ['Gdańsk', 'Olsztyn'],
    B7: ['Poznań', 'Bydgoszcz'], B8: ['Bydgoszcz', 'Olsztyn'], B9: ['Olsztyn', 'Ostrołęka'], B10: ['Poznań', 'Łódź'], B11: ['Bydgoszcz', 'Varsovie'], B12: ['Olsztyn', 'Varsovie'],
    B13: ['Varsovie', 'Ostrołęka'], B14: ['Łódź', 'Varsovie'], B15: ['Varsovie', 'Radom'], B16: ['Radom', 'Lublin'], B17: ['Ostrołęka', 'Radom'],
    BKA: ['Gdańsk', 'F:Kaliningrad'], BSU: ['Olsztyn', 'F:Suwałki'], BBI: ['Ostrołęka', 'F:Białystok'], BBR: ['Lublin', 'F:Brest'] };
  COR.R = { E1: [null, 'Riga'], E2: [null, 'Daugavpils'], E3: [null, 'Vitebsk'], E4: [null, 'Minsk'],
    R1: ['Riga', 'Liepāja'], R2: ['Liepāja', 'Klaipėda'], R3: ['Riga', 'Daugavpils'], R4: ['Liepāja', 'Šiauliai'], R5: ['Klaipėda', 'Šiauliai'], R6: ['Klaipėda', 'Kaunas'],
    R7: ['Daugavpils', 'Šiauliai'], R8: ['Šiauliai', 'Kaunas'], R9: ['Kaunas', 'Slonim'], R10: ['Daugavpils', 'Vitebsk'], R11: ['Šiauliai', 'Vilnius'], R12: ['Kaunas', 'Vilnius'],
    R13: ['Vilnius', 'Slonim'], R14: ['Vitebsk', 'Vilnius'], R15: ['Vilnius', 'Minsk'], R16: ['Minsk', 'Pinsk'], R17: ['Slonim', 'Minsk'],
    RKA: ['Klaipėda', 'F:Kaliningrad'], RSU: ['Kaunas', 'F:Suwałki'], RBI: ['Slonim', 'F:Białystok'], RBR: ['Pinsk', 'F:Brest'] };
}
if (FOC) {   // plateau Porte de Focșani v3 (liste des corridors du 12 nov.) : 3 entrées par camp, 2 accès par fuseau, réseau asymétrique
  COR.B = { U1: [null, 'Craiova'], U2: [null, 'Roussé'], U3: [null, 'Varna'],
    B1: ['Craiova', 'Pitești'], B2: ['Pitești', 'Brașov'], B3: ['Craiova', 'Bucarest'], B4: ['Pitești', 'Bucarest'], B5: ['Roussé', 'Bucarest'], B6: ['Bucarest', 'Buzău'],
    B7: ['Roussé', 'Călărași'], B8: ['Bucarest', 'Călărași'], B9: ['Bucarest', 'Brăila'], B10: ['Varna', 'Călărași'], B11: ['Călărași', 'Brăila'], B12: ['Varna', 'Constanța'],
    B13: ['Călărași', 'Constanța'], B14: ['Călărași', 'Tulcea'], B15: ['Constanța', 'Tulcea'],
    BCA1: ['Brașov', 'F:Carpates'], BCA2: ['Buzău', 'F:Carpates'], BFO1: ['Buzău', 'F:Focșani'], BFO2: ['Brăila', 'F:Focșani'], BBO1: ['Brăila', 'F:Boudjak'], BBO2: ['Tulcea', 'F:Boudjak'] };
  COR.R = { E1: [null, 'Khmelnytskyï'], E2: [null, 'Ouman'], E3: [null, 'Kherson'],
    R1: ['Tchernivtsi', 'Suceava'], R2: ['Tchernivtsi', 'Khmelnytskyï'], R3: ['Suceava', 'Iași'], R4: ['Tchernivtsi', 'Bălți'], R5: ['Khmelnytskyï', 'Bălți'], R6: ['Iași', 'Bălți'],
    R7: ['Bălți', 'Ouman'], R8: ['Iași', 'Chișinău'], R9: ['Bălți', 'Chișinău'], R10: ['Ouman', 'Podilsk'], R11: ['Chișinău', 'Podilsk'], R12: ['Ouman', 'Mykolaïv'],
    R13: ['Podilsk', 'Odessa'], R14: ['Chișinău', 'Odessa'], R15: ['Odessa', 'Mykolaïv'], R16: ['Mykolaïv', 'Kherson'],
    RCA1: ['Suceava', 'F:Carpates'], RCA2: ['Iași', 'F:Carpates'], RFO1: ['Iași', 'F:Focșani'], RFO2: ['Chișinău', 'F:Focșani'], RBO1: ['Chișinău', 'F:Boudjak'], RBO2: ['Odessa', 'F:Boudjak'] };
}
// accès au Close : un ou plusieurs corridors par fuseau (2 sur Focșani). ACCESS et ACCESS_COR gardent le premier, pour les textes.
const ACCESS_CORS = { B: {}, R: {} }, ACCESS_ALL = { B: {}, R: {} };
for (const c of ['B', 'R']) for (const [k, [a, b]] of Object.entries(COR[c])) if (a && b.startsWith('F:')) { const f = b.slice(2); (ACCESS_CORS[c][f] = ACCESS_CORS[c][f] || []).push(k); (ACCESS_ALL[c][f] = ACCESS_ALL[c][f] || []).push(a); }
const ACCESS = FOC ? { B: Object.fromEntries(FUS.map(f => [f, ACCESS_ALL.B[f][0]])), R: Object.fromEntries(FUS.map(f => [f, ACCESS_ALL.R[f][0]])) } : SUW ? { B: { Kaliningrad: 'Gdańsk', 'Suwałki': 'Olsztyn', 'Białystok': 'Ostrołęka', Brest: 'Lublin' }, R: { Kaliningrad: 'Klaipėda', 'Suwałki': 'Kaunas', 'Białystok': 'Slonim', Brest: 'Pinsk' } }
  : { B: { Kharkiv: 'Poltava', Izioum: 'Dnipro', Donetsk: 'Zaporijjia' }, R: { Kharkiv: 'Valouïki', Izioum: 'Novoaïdar', Donetsk: 'Louhansk' } };
const ACCESS_COR = FOC ? { B: Object.fromEntries(FUS.map(f => [f, ACCESS_CORS.B[f][0]])), R: Object.fromEntries(FUS.map(f => [f, ACCESS_CORS.R[f][0]])) } : SUW ? { B: { Kaliningrad: 'BKA', 'Suwałki': 'BSU', 'Białystok': 'BBI', Brest: 'BBR' }, R: { Kaliningrad: 'RKA', 'Suwałki': 'RSU', 'Białystok': 'RBI', Brest: 'RBR' } }
  : { B: { Kharkiv: 'BK', Izioum: 'BI', Donetsk: 'BD' }, R: { Kharkiv: 'RK', Izioum: 'RI', Donetsk: 'RD' } };
const perFus = v => Object.fromEntries(FUS.map(f => [f, v]));
const EN = { B: 'R', R: 'B' };
const CAMP = { B: 'Bleu', R: 'Rouge' };
const CORPS = { B: "1er Corps d'Armée", R: '3ème Armée InterArmes' };
const PL = { B: 'bleus', R: 'rouges' };
const ADJ = { B: 'bleu', R: 'rouge' };
const ADJF = { B: 'bleue', R: 'rouge' };
const BIG = ['PC', 'BSC', 'POW', 'DIV+'];
const SMALL = FOC ? { INF: 5, MP: 5, CIMIC: 5, DSA: 5, GEN: 3, 'ART CA': 3, EW: 3, GAM: 1, NAV: 1 } : SUW ? { INF: 6, MP: 6, CIMIC: 5, DSA: 6, GEN: 3, 'ART CA': 3, EW: 3, GAM: 1, NAV: 1 } : { INF: 5, MP: 5, CIMIC: 5, DSA: 5, GEN: 3, 'ART CA': 3, EW: 3, GAM: 1 };   // Suwałki : +1 INF, +1 MP, +1 DSA et la flottille NAV
const TYPE_ALIAS = { GSC: 'BSC', GE: 'EW' };   // anciens noms acceptés dans les fiches et les ordres
const GAUGE = {
  AAE: ['Pleinement appuyé', 'Appuyé avec réserves', 'Appui partiel', 'Appui résiduel', 'Aucun appui'],
  FS: ['Pleinement opérationnel', 'Opérationnel', 'Diminué', 'Résiduel', 'Détruit'],
  ALAT: ['4 SGAM', '3 SGAM', '2 SGAM', '1 SGAM', 'Détruit'],
};
if (NAVAL) GAUGE.NAV = ['4 points', '3 points', '2 points', '1 point', 'Détruit'];   // jauge NAV (appui naval), 4 points
const GAUGES = NAVAL ? ['AAE', 'FS', 'ALAT', 'NAV'] : ['AAE', 'FS', 'ALAT'];
const GAUGES_TXT = NAVAL ? 'AAE, FS, ALAT et NAV' : 'AAE, FS et ALAT';
// rev : 'always' (Conséquence), 'fail' (Risque), 'played' (dès la carte jouée), 'none'
const CARDS = {
  'Renseignement SAT': { ph: 'R', base: 60, mep: 1, ret: 3, g: [], rev: 'none', tgt: 'zoneEnemy', dg: [] },
  'Renseignement drone': { ph: 'R', base: 70, mep: 1, ret: 3, g: [], rev: 'fail', tgt: 'zoneEnemy', dg: ['DSA'] },
  'ROHUM': { ph: 'R', base: 80, mep: 4, ret: 7, g: ['FS'], rev: 'none', tgt: 'regionEnemy', dg: ['INF', 'MP'] },
  'Renseignement aérien': { ph: 'R', base: 60, mep: 2, ret: 5, g: ['AAE'], rev: 'none', tgt: 'zoneEnemy', dg: ['DSA'] },
  'OSINT': { ph: 'R', base: 50, mep: 4, ret: 5, g: [], rev: 'none', tgt: 'regionEnemy', dg: ['CIMIC'] },   // 8 nov. : nouvelle carte
  'Ecoute GE': { ph: 'R', base: 80, mep: 2, ret: 4, g: [], rev: 'fail', tgt: 'fuseau', dg: ['EW'], ew: true },
  'SEAD': { ph: 'F', base: 60, mep: 2, ret: 7, g: ['AAE'], rev: 'always', tgt: 'zoneEnemy', dg: [] },
  'Frappe drone': { ph: 'F', base: 70, mep: 2, ret: 4, g: [], rev: 'always', tgt: 'slotEnemy', dg: ['DSA'] },
  'Frappe en profondeur': { ph: 'F', base: 80, mep: 1, ret: 3, g: [], rev: 'always', tgt: 'slotEnemy', dg: [] },
  'Bombardement': { ph: 'F', base: 60, mep: 3, ret: 8, g: ['AAE'], rev: 'always', tgt: 'regionEnemy', dg: ['DSA'] },
  'Raid aéro': { ph: 'F', base: 60, mep: 5, ret: 8, g: ['ALAT', 'FS'], rev: 'always', tgt: 'slotEnemy', dg: ['INF', 'DSA'] },
  'Out of contact Attack': { ph: 'F', base: 70, mep: 2, ret: 4, g: ['ALAT'], rev: 'always', tgt: 'slotEnemyDeep', dg: ['DSA'] },   // 8 nov. : nouvelle carte (GAM) : neutralise un pion réduit, ou dégâts d'un bombardement sur un grand pion
  'Sabotage': { ph: 'F', base: 60, mep: 3, ret: 6, g: ['FS'], rev: 'always', tgt: 'slotEnemyDeep', dg: ['INF', 'MP'] },
  'Maquis de partisans': { ph: 'F', base: 50, mep: 7, ret: 14, g: ['FS'], rev: 'always', tgt: 'regionEnemy', dg: ['INF', 'MP', 'CIMIC'] },
  'Embuscade': { ph: 'F', base: 60, mep: 3, ret: 7, g: ['FS'], rev: 'always', tgt: 'corridorEnemy', dg: ['INF', 'MP'] },
  'Intox L2I': { ph: 'F', base: 30, mep: 6, ret: 7, g: [], rev: 'always', tgt: 'regionEnemy', dg: ['CIMIC'] },
  'Déception GE': { ph: 'F', base: 80, mep: 2, ret: 4, g: [], rev: 'fail', tgt: 'slotOwnEmpty', dg: [], ew: true },
  'Ordre à la DSA': { ph: 'M', base: 100, mep: 2, ret: 3, g: [], rev: 'none', tgt: 'disp', types: ['DSA'] },
  'Ordre à la B.ZARR': { ph: 'M', base: 100, mep: 2, ret: 3, g: [], rev: 'none', tgt: 'disp', types: ['INF', 'EW', 'GAM'] },
  'Ordre aux MP et CIMIC': { ph: 'M', base: 100, mep: 2, ret: 3, g: [], rev: 'none', tgt: 'disp', types: ['MP', 'CIMIC'] },
  'Ordre à la B.GEN': { ph: 'M', base: 100, mep: 2, ret: 3, g: [], rev: 'none', tgt: 'disp', types: ['GEN'] },
  'Ordre à la B.ART': { ph: 'M', base: 100, mep: 2, ret: 3, g: [], rev: 'none', tgt: 'disp', types: ['ART CA'] },
  'Contre-batterie': { ph: 'F', base: 100, mep: 2, ret: 5, g: [], rev: 'none', tgt: 'cb' },
  'Travaux du GEN': { ph: 'M', base: 100, mep: 3, ret: 4, g: [], rev: 'none', tgt: 'works' },
  'Bascule de PC': { ph: 'M', base: 90, mep: 3, ret: 6, g: [], rev: 'none', tgt: 'regionOwn' },
  'Bascule BSC': { ph: 'M', base: 90, mep: 4, ret: 8, g: [], rev: 'none', tgt: 'regionOwn' },
  'Mouvement de la DIV': { ph: 'M', base: 100, mep: 2, ret: 4, g: [], rev: 'none', tgt: 'regionOwn' },
  'Transfert à la justice': { ph: 'M', base: 80, mep: 5, ret: 8, g: [], rev: 'none', tgt: 'none' },
  'Ordre à la B.LOG': { ph: 'L', base: 100, mep: 1, ret: 3, g: [], rev: 'none', tgt: 'net' },
  'Effort LOG': { ph: 'L', base: 80, mep: 5, ret: 7, g: [], rev: 'none', tgt: 'logEffort' },   // 11 nov. : +2 RAPLOG à un fuseau pendant 3 tours, ou +10 points à la DIV+
  'REMEC': { ph: 'L', base: 90, mep: 5, ret: 10, g: [], rev: 'none', tgt: 'remec' },   // 11 nov. : nouvelle carte du G4 : +3 crans ALAT (sur le GAM), +30 % au PC ou +30 % à la BSC
  "Ouverture d'itinéraire": { ph: 'L', base: 100, mep: 1, ret: 3, g: [], rev: 'none', tgt: 'genOwn' },
  'CAS': { ph: 'C', base: 60, mep: 2, ret: 5, g: ['AAE'], rev: 'always', tgt: 'fuseau', dg: ['DSA'] },
  'Engagement GAM': { ph: 'C', base: 60, mep: 1, ret: 4, g: ['ALAT'], rev: 'always', tgt: 'fuseau', dg: ['DSA'] },
  'Brouillage GE': { ph: 'C', base: 80, mep: 1, ret: 3, g: [], rev: 'always', tgt: 'fuseau', dg: ['EW'], ew: true },
  'Effort COM': { ph: 'C', base: 100, mep: 4, ret: 5, g: [], rev: 'always', tgt: 'fuseau', dg: [] },
  'Renfort de feu': { ph: 'C', base: 100, mep: 1, ret: 2, g: [], rev: 'always', tgt: 'fuseau' },
  'Engagement de la DIV': { ph: 'C', base: 100, mep: 3, ret: 7, g: [], rev: 'played', tgt: 'fuseau' },
  'Assaut de la BP': { ph: 'F', base: 70, mep: 3, ret: 0, once: true, g: ['AAE'], rev: 'always', tgt: 'regionEnemy', dg: ['INF', 'DSA'] },   // 7 nov. : carte à usage unique
};
if (NAVAL) Object.assign(CARDS, {   // 12 nov. : les 6 cartes navales (chapitre 15 du livre de règles, version Suwałki) ; nav : NAV ravitaillé et jauge NAV > 0 au tour d'effet
  'Reco de plage': { ph: 'R', base: 70, mep: 4, ret: 7, g: ['NAV'], rev: 'none', tgt: 'coastZone', dg: ['INF', 'NAV'], nav: true },
  'Commando marine': { ph: 'F', base: 60, mep: 5, ret: 8, g: ['NAV', 'FS'], rev: 'always', tgt: 'coastSlot', dg: ['INF', 'NAV'], nav: true },
  'Bombardement naval': { ph: 'F', base: 70, mep: 4, ret: 7, g: ['NAV'], rev: 'always', tgt: 'coastSlotDeep', dg: ['NAV'], nav: true },
  'Raid amphibie': { ph: 'F', base: 70, mep: 5, ret: 10, g: ['NAV'], rev: 'always', tgt: 'coastRegion', dg: ['INF', 'NAV'], nav: true },
  'Appareillez !': { ph: 'M', base: 100, mep: 2, ret: 4, g: [], rev: 'none', tgt: 'disp', types: ['NAV'] },
  'Appui naval': { ph: 'C', base: 60, mep: 4, ret: 7, g: ['NAV'], rev: 'always', tgt: 'fuseau', dg: [], nav: true },
});
const NAV_CARDS = Object.keys(CARDS).filter(k => CARDS[k].nav || k === 'Appareillez !');
const LOGEFF_RAP = 2, LOGEFF_TURNS = 3, LOGEFF_DIV = 10, REMEC_ALAT = 3;   // 11 nov. : Effort LOG (+2 RAPLOG pendant 3 tours ou +10 DIV+) ; REMEC (+3 crans ALAT)
const NEVER = 999;                   // tour de retour d'une carte à usage unique (elle ne revient pas)
const retOf = (C, T) => C.once ? NEVER : T + C.ret;
const retTxt = n => n >= NEVER ? 'carte à usage unique, elle ne revient pas' : `retour au tour ${n}`;
const BP_INF = 3, BP_FM = 2, BP_DELAY = 5;   // Assaut de la BP (règles de Ben, 7 nov. midi) : 3 INF de la réserve détruits au tour d'effet, −2 FM à chaque division 5 tours après l'effet (et tout de suite en cas d'échec) ; sans ces 3 INF, la carte est rendue
const REGEN_TURNS = [10, 20];        // 7 nov. : aux tours 10 et 20, les jauges AAE, FS et ALAT remontent d'un cran
const bpReserve = (st, c) => st.units.filter(u => u.camp === c && u.type === 'INF' && !u.dead && u.slot === 'Réserve');
const PAIR = {};   // règle des paires supprimée (5 nov.)
// jauges PC et BSC : de 0 à 100 % (pertes par pas de 10, remontée de 1 % par tour) ; PC : 1 carte de moins par tranche de 20 %
const PC_CARDS = g => g > 80 ? 5 : g > 60 ? 4 : g > 40 ? 3 : g > 20 ? 2 : g > 0 ? 1 : 0;
// ravitaillement des ART CA, EW et GAM selon la BSC : dé minimal à faire (0 = sans dé, 10 = seulement le 0, 11 = jamais) ; +1 par tranche de 10 % sous 91 %
const BSC_DIE = g => g > 90 ? 0 : g > 0 ? 11 - Math.ceil(g / 10) : 11;
const BSC_NEED = 1;                  // flux majeurs que la BSC doit consommer (1 depuis le 7 nov.)
const MINOR_RANGE = 3;               // flux mineur : au plus 3 corridors entre la BSC et le pion (7 nov.)
// points perdus par un grand pion touché : [PC ou BSC en %, DIV+ en points]
const BIG_LOSS = { 'Frappe drone': [30, 30], 'Frappe en profondeur': [20, 20], 'Sabotage': [30, 30], 'Bombardement': [30, 30], 'Maquis de partisans': [40, 40], 'Intox L2I': [20, 20], 'Évasion': [20, 20], 'Risque': [30, 30], 'Assaut de la BP': [50, 50], 'Bombardement naval': [30, 30], 'Raid amphibie': [40, 40] };   // Assaut de la BP (7 nov.) : −50, sans réduction par la fortification   // pertes PC/BSC (%) et DIV+ (points) — règles du 6 nov. ; une salve de Frappe en profondeur cumule ses tirs
const CB_RATE = 80;                  // contre-batterie : neutralise sur 3 à 0
const EVA_RATE = 3;                  // évasion : chaque pion ou corridor touché sur 1, 2 ou 3
const BIGMOVE = { 'Bascule de PC': 'PC', 'Bascule BSC': 'BSC', 'Mouvement de la DIV': 'DIV+' };
const FORT_CARDS = ['Frappe drone', 'Frappe en profondeur', 'SEAD', 'Bombardement', 'Out of contact Attack', 'Bombardement naval'];
const POW_PENALTY = ['Frappe drone', 'Frappe en profondeur', 'Bombardement', 'Bombardement naval'];   // tirs sur le camp de prisonniers (mémento G3-3D)
const PH_ORDER = ['R', 'F', 'M', 'L', 'C'];
// phase Frappes en deux temps (7 nov.) : les frappes ciblées d'abord ; les autres frappes voient ensuite leurs dangers sans les pions qu'elles ont neutralisés ou détruits
const PRE_STRIKE = ['SEAD', 'Frappe drone', 'Frappe en profondeur', 'Sabotage', 'Contre-batterie', 'Commando marine', 'Bombardement naval'];
const PH_STEPS = [['R'], ['F', 1], ['F', 2], ['M'], ['L'], ['C']];
const PH_NOM = { R: 'Renseignement', F: 'Frappes', M: 'Mouvements', L: 'Logistique', C: 'Combat' };
const BREAK = 50;                    // cases de curseur pour une percée (50 depuis le 8 nov.)
const DIV_TH = [45, 40, 30, 20, 10, 0, -10, -20, -30, -40, -45];   // seuils des messages des divisions
// messages des divisions au franchissement d'un seuil (textes de Ben, 5 nov.) : offensif = le curseur avance au-delà du seuil, défensif = il recule en deçà
const DIV_OFF = {   // textes de Ben, 8 nov.
  45: "Nos premiers éléments sont imbriqués avec l'ENI qui mène une résistance acharnée dans son réduit défensif. Un dernier effort nous permettra de déclencher l'exploitation dans les prochains jours.",
  40: "Avons acculé l'ENI sur un réduit défensif et sommes sur le point de percer jusqu'à la limite de notre zone d'action.",
  30: "Avons pénétré profondément au cœur du dispositif ennemi et maintenons la pression sur ses éléments.",
  20: "Avons traversé les lignes défensives de l'ENI et provoqué un repli majeur. Poursuivons notre offensive.",
  10: "Avons mené offensive couronnée de succès et forcé l'ENI à engager son deuxième échelon.",
  0: "Avons rejoint nos positions initiales.",
  '-10': "Avons contre-attaqué et repris le contrôle de nos positions défensives. Avec l'appui du corps, pourrons ramener l'ENI à ses bases de départ.",
  '-20': "Notre contre-attaque nous a permis de regagner notre seconde ligne de défense. Poursuivons notre combat pour repousser l'offensive ennemie.",
  '-30': "Avons repris du terrain à l'ENI. Sommes toujours au contact au cœur de nos positions défensives.",
  '-40': "Avons repoussé l'attaque de l'ENI et tenons toujours nos positions sur la dernière ligne de défense. Sommes toujours dans une situation critique.",
  '-45': "Notre contre-attaque désespérée nous a permis de regagner une infime marge de manœuvre. Poursuivons notre combat désespéré et demandons d'urgence appuis et soutien.",
};
const DIV_DEF = {
  45: "La contre-attaque désespérée de l'ENI l'a momentanément sauvé de la déroute. En reprenant l'initiative au plus vite, nous amènerons le corps à la victoire.",
  40: "L'ENI jette ses dernières forces dans la bataille et a empêché notre attaque finale d'aboutir. Restons à portée de la victoire.",
  30: "L'ENI a réagi et contre-attaqué. Nous sommes imbriqués au cœur de son dispositif et reculons en combattant pied à pied.",
  20: "La contre-attaque ENI nous a fait reculer jusqu'aux lignes défensives de l'ENI. Nous n'avons pas été en mesure d'exploiter nos succès précédents.",
  10: "L'ENI a contre-attaqué dans notre fuseau mais nous conservons un léger gain territorial depuis le début de l'offensive.",
  0: "La contre-attaque ENI nous a forcés à regagner nos bases de départ.",
  '-10': "Avons subi revers mineurs et dû engager notre deuxième échelon. Faisons face à forte opposition ENI.",
  '-20': "Suite à combats acharnés, avons dû abandonner nos positions pour nous replier sur une seconde ligne de défense. Demandons effort majeur à notre profit pour regagner le terrain perdu.",
  '-30': "L'ENI a pénétré profondément au cœur de notre dispositif et continue son attaque sans faiblir.",
  '-40': "Sommes dans une situation critique. Ne pouvons pas garantir que le front ne cédera pas dans les prochains jours.",
  '-45': "Sommes acculés sur notre dernière ligne défensive et déjà imbriqués avec les éléments ENI les plus avancés. Réclamons renforts d'urgence pour ne pas être submergés. À défaut, défendrons notre position jusqu'au bout sans espoir de succès.",
};
const DIV_MSG = DIV_OFF;   // ancien nom, gardé pour les pages
// seuil franchi entre v0 et v1 (du point de vue du camp) : le plus avancé dans le sens du mouvement, ou null
// un seuil positif (ou 0) est atteint quand v ≥ seuil ; un seuil négatif quand v ≤ seuil
function divCross(v0, v1) {
  if (v1 === v0) return null;
  const inZ = (th, v) => th > 0 ? v >= th : th < 0 ? v <= th : null;
  const hits = [];
  for (const th of DIV_TH) {
    let off = null;
    if (th === 0) { if (v0 < 0 && v1 >= 0) off = true; else if (v0 > 0 && v1 <= 0) off = false; }
    else if (inZ(th, v0) !== inZ(th, v1)) off = v1 > v0;
    if (off !== null) hits.push({ th, off });
  }
  if (!hits.length) return null;
  hits.sort((a, b) => v1 > v0 ? b.th - a.th : a.th - b.th);
  const h = hits[0]; return { th: h.th, off: h.off, txt: (h.off ? DIV_OFF : DIV_DEF)[h.th] };
}

// ------------------------------------------------------------------ utilitaires
const deacc = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ł/g, 'l').replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
const CARD_BY_KEY = {}; Object.keys(CARDS).forEach(c => { CARD_BY_KEY[deacc(c)] = c; });
const cardName = s => CARD_BY_KEY[deacc(s)] || null;
const REGION_BY_KEY = {}; ['B', 'R'].forEach(c => REG[c].forEach(r => { REGION_BY_KEY[deacc(r)] = [r, c]; }));
const regionOf = s => REGION_BY_KEY[deacc(s)] || null;              // [nom, camp]
const FUS_BY_KEY = {}; FUS.forEach(f => { FUS_BY_KEY[deacc(f)] = f; });
function fuseauOf(s) { const k = deacc(s).replace(/\s*\([^)]*\)$/, '').replace(/^fuseau (de |d')?/, '').replace(/^division (de |d')?/, ''); return FUS_BY_KEY[k] || null; }
// n°11 : texte collé depuis un tableur ou un courriel (espaces insécables, guillemets englobants, apostrophes typographiques)
const clean = t => String(t || '').replace(/[\u00a0\u202f\u2007]/g, ' ').replace(/[’‘]/g, "'").replace(/\r/g, '').trim().replace(/^"([\s\S]*)"$/, '$1').replace(/""/g, '"');
const clone = o => JSON.parse(JSON.stringify(o));
const r1 = x => Math.round(x * 10) / 10;
const fmt1 = x => String(r1(x)).replace('.', ',');
const sgnTxt = x => (x > 0 ? '+' : '') + x;

function d10(seed, key) {
  let h = 2166136261 >>> 0; const s = seed + '|' + key;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15;
  return ((h >>> 0) % 10) + 1;
}
const dTxt = d => String(d % 10);

// emplacement → {kind, region, camp, n, fus, art}
function parseSlot(s) {
  s = String(s || '').trim();
  if (!s) return null;
  const k = deacc(s);
  if (k === 'reserve') return { kind: 'reserve', name: 'Réserve' };
  if (k === 'garde pow' || k === 'pow' || k === 'garde') return { kind: 'garde', name: 'Garde POW' };
  let m = s.match(/^(.+?) (bleu|rouge) (?:(\d)|art (nord|sud|ouest|est))$/i);
  if (m) {
    const f = fuseauOf(m[1]); if (!f) return null;
    const camp = m[2].toLowerCase() === 'bleu' ? 'B' : 'R';
    if (m[3]) { const n = +m[3]; if (n < 1 || n > 3) return null; return { kind: 'fus', fus: f, camp, n, name: `${f} ${CAMP[camp]} ${n}` }; }
    const art = ART_SIDES[['nord', 'ouest'].includes(m[4].toLowerCase()) ? 0 : 1];
    return { kind: 'fus', fus: f, camp, art, name: `${f} ${CAMP[camp]} ART ${art}` };
  }
  m = s.match(/^(.+) ([0-5])$/);
  if (m) { const rg = regionOf(m[1]); if (!rg) return null; return { kind: 'region', region: rg[0], camp: rg[1], n: +m[2], name: `${rg[0]} ${m[2]}` }; }
  return null;
}
const normSlot = s => { const p = parseSlot(s); return p ? p.name : null; };

function adjacent(camp, region) {
  const out = new Set();
  for (const [a, b] of Object.values(COR[camp])) {
    if (!a || b.startsWith('F:')) continue;
    if (a === region) out.add(b); if (b === region) out.add(a);
  }
  return out;
}
// trajet de la DIV+ qui colmate une percée : en corridors, corridor d'accès au fuseau compris, en contournant les corridors coupés au tour t (null si le fuseau est inaccessible)
function openDistance(st, camp, from, fus, t) {
  const cut = k => (st.cut[k] ?? -1) >= t;
  const targets = ACCESS_CORS[camp][fus].filter(k => !cut(k)).map(k => COR[camp][k][0]); if (!targets.length) return null;   // Focșani : 2 accès par fuseau
  if (targets.includes(from)) return 1;
  const seen = new Set([from]); let fr = [from], d = 0;
  while (fr.length) { d++; const nx = [];
    for (const r of fr) for (const [k, [a, b]] of Object.entries(COR[camp])) { if (!a || b.startsWith('F:') || cut(k) || (a !== r && b !== r)) continue; const n = a === r ? b : a;
      if (targets.includes(n)) return d + 1; if (!seen.has(n)) { seen.add(n); nx.push(n); } }
    fr = nx; }
  return null;
}
function distance(camp, from, to) {
  if (Array.isArray(to)) return Math.min(...to.map(x => distance(camp, from, x)));   // plusieurs régions d'accès : la plus proche
  if (from === to) return 0;
  const seen = new Set([from]); let fr = [from], d = 0;
  while (fr.length) { d++; const nx = []; for (const r of fr) for (const n of adjacent(camp, r)) { if (n === to) return d; if (!seen.has(n)) { seen.add(n); nx.push(n); } } fr = nx; }
  return 99;
}

// ------------------------------------------------------------------ état
const rndSeed = () => { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; const b = new Uint8Array(16); (globalThis.crypto || require('crypto').webcrypto).getRandomValues(b); return Array.from(b, x => A[x % 32]).join(''); };   // 16 caractères : la graine ne peut plus être retrouvée par essais
function newState(seed) {
  return {
    v: 1, seed: seed || rndSeed(), turn: 0, nextId: 1, units: [],
    gauges: { B: Object.fromEntries(GAUGES.map(g => [g, 0])), R: Object.fromEntries(GAUGES.map(g => [g, 0])) },
    divp: { B: 0, R: 0 }, pow: { B: 0, R: 0 },
    pcg: { B: 100, R: 100 }, bscg: { B: 100, R: 100 },   // jauges de fonctionnement du PC et de la BSC (%)
    cb: {},                           // missions de contre-batterie : id de l'ART CA → { camp, zone: {fus} | {region}, since }
    cursor: perFus(0),
    fm: { B: perFus(0), R: perFus(0) },
    fmBlock: { B: -1, R: -1 },
    net: { B: {}, R: {} }, netDir: { B: {}, R: {} }, netCons: { B: {}, R: {} },
    fort: [], opened: [], cut: {}, neutReg: {},
    cards: { B: {}, R: {} }, pending: [], artDir: {},
    carry: { B: [], R: [] },          // lignes à reporter au prochain compte rendu
    ended: null,
  };
}
// partie commencée avant les règles du 5 nov. : GSC → BSC, jauges PC et BSC, pions EW en réserve
function migrate(st) {
  if (st && st.units && !st.artDir) st.artDir = {};   // orientation durable des ART DIV (Renfort de feu)
  if (!st || !st.units || st.bscg) return st;
  st.pcg = { B: 100, R: 100 }; st.bscg = { B: 100, R: 100 }; st.cb = st.cb || {};
  for (const u of st.units) { if (u.type === 'GSC') u.type = 'BSC'; if (['PC', 'BSC', 'DIV+'].includes(u.type)) u.neut = -1; }
  for (const c of ['B', 'R']) for (let i = st.units.filter(u => u.camp === c && u.type === 'EW').length; i < SMALL.EW; i++) st.units.push({ id: st.nextId++, camp: c, type: 'EW', slot: 'Réserve', neut: -1, dead: false });
  return st;
}
const unitsOf = (st, camp) => st.units.filter(u => u.camp === camp && !u.dead);
const active = (u, t) => !u.dead && u.neut < t;
const big = (st, camp, type) => st.units.find(u => u.camp === camp && u.type === type);
function unitAt(st, slot) { return st.units.find(u => !u.dead && u.slot === slot); }
function zoneOfSlot(slot) { const p = parseSlot(slot); if (!p) return null; if (p.kind === 'region') return { region: p.region, camp: p.camp }; if (p.kind === 'fus') return { fus: p.fus, camp: p.camp }; return null; }
// pions d'un camp dans une zone : zone = {region} ou {fus}
function unitsInZone(st, camp, zone, t, onlyActive) {
  return st.units.filter(u => {
    if (u.dead || u.camp !== camp) return false;
    if (onlyActive && !active(u, t)) return false;
    const z = zoneOfSlot(u.slot); if (!z) return false;
    return zone.region ? z.region === zone.region : (z.fus === zone.fus && z.camp === camp);
  });
}
const regNeut = (st, camp, r, t) => (st.neutReg[camp + '|' + r] ?? -1) >= t;
const desc = u => `${u.type} ${ADJ[u.camp]} (${u.slot})`;
function unitTxtShort(u, t) { return u.type + (active(u, t) ? '' : ' (neutralisé)'); }
function gaugeTxt(name, lost) { return GAUGE[name][Math.min(4, lost)]; }
const normType = s => { const k = String(s || '').trim().toUpperCase(); return TYPE_ALIAS[k] || k; };
const cardLimit = (st, c) => PC_CARDS(st.pcg ? st.pcg[c] : 100);
// perte de jauge d'un grand pion touché ; renvoie le texte
function bigLoss(st, u, why, half) {
  let [pc, dv] = BIG_LOSS[why] || BIG_LOSS['Frappe drone']; const c = u.camp;
  if (half) { pc = Math.ceil(pc / 2); dv = Math.ceil(dv / 2); }   // grand pion fortifié : perte divisée par 2
  const fx = half ? ' (fortifié : perte divisée par 2)' : '';
  if (u.type === 'PC') { const b = st.pcg[c]; st.pcg[c] = Math.max(0, b - pc); return `jauge PC ${b} % → ${st.pcg[c]} %${fx}`; }
  if (u.type === 'BSC') { const b = st.bscg[c]; st.bscg[c] = Math.max(0, b - pc); return `jauge BSC ${b} % → ${st.bscg[c]} %${fx}`; }
  if (u.type === 'DIV+') { const b = st.divp[c]; st.divp[c] = Math.max(0, b - dv); return `jauge DIV+ ${b} → ${st.divp[c]}${fx}`; }
  return '';
}

// ------------------------------------------------------------------ flux mineurs
// chemin le plus court (en corridors) de la région de la BSC jusqu'à la zone du pion ; le flux passe si l'un des chemins les plus courts
// n'a ni corridor coupé ni région neutralisée (régions de départ et d'arrivée comprises)
function minorRoute(st, camp, slot, t) {
  const bsc = big(st, camp, 'BSC'); const from = zoneOfSlot(bsc.slot)?.region; const z = zoneOfSlot(slot);
  if (!from || !z || z.camp !== camp) return { ok: false, why: 'pion hors du plateau' };
  const target = z.fus ? 'F:' + z.fus : z.region;
  const edges = Object.entries(COR[camp]).filter(([, [a]]) => a);   // sans les entrées depuis l'extérieur
  const nb = r => edges.filter(([, [a, b]]) => a === r || b === r).map(([k, [a, b]]) => [k, a === r ? b : a]);
  // largeur d'abord, en gardant tous les chemins les plus courts
  let layer = [[from]], best = null;
  const dist = { [from]: 0 };
  if (from === target) best = [[from]];
  for (let d = 1; !best && d <= 12; d++) {
    const next = [];
    for (const path of layer) { const r = path[path.length - 1]; if (r.startsWith('F:')) continue;
      for (const [k, n] of nb(r)) { if (dist[n] !== undefined && dist[n] < d) continue; dist[n] = d; next.push([...path, k, n]); } }
    const done = next.filter(p => p[p.length - 1] === target); if (done.length) best = done;
    layer = next.filter(p => p[p.length - 1] !== target);
  }
  if (!best) return { ok: false, why: 'aucun itinéraire' };
  const len = (best[0].length - 1) / 2; if (len > MINOR_RANGE) return { ok: false, why: `${len} corridors de la BSC (${MINOR_RANGE} au plus)`, path: best[0] };
  const bad = path => { const out = [];
    for (let i = 0; i < path.length; i++) { const x = path[i];
      if (i % 2) { if ((st.cut[x] ?? -1) >= t) out.push(`corridor ${x} coupé`); }
      else if (!x.startsWith('F:') && regNeut(st, camp, x, t)) out.push(`région ${x} neutralisée`); }
    return out; };
  const ok = best.find(p => !bad(p).length);
  if (ok) return { ok: true, path: ok };
  return { ok: false, why: bad(best[0]).join(', '), path: best[0] };
}

// ------------------------------------------------------------------ réseau LOG
const LOG_TOTAL = SUW ? 40 : FOC ? 35 : 30, LOG_PER_COR = 5;   // marqueurs LOG par camp, et au plus par corridor
// orientation : choisit le sens des corridors internes pour que chaque région ne fasse pas sortir plus qu'elle ne reçoit
function orientNetwork(st, camp, markers) {
  const errors = [];
  let total = 0;
  const codes = Object.keys(markers).filter(c => markers[c] > 0);
  for (const c of codes) {
    if (!COR[camp][c]) { errors.push(`corridor ${c} inconnu pour les ${PL[camp]}`); continue; }
    if (markers[c] > LOG_PER_COR) errors.push(`${c} porte ${markers[c]} marqueurs (${LOG_PER_COR} au plus)`);
    total += markers[c];
  }
  if (total > LOG_TOTAL) errors.push(`${total} marqueurs (${LOG_TOTAL} au plus)`);
  if (errors.length) return { ok: false, errors, total };
  const fixed = [], free = [];
  for (const c of codes) { const [a, b] = COR[camp][c]; if (!a || b.startsWith('F:')) fixed.push(c); else free.push(c); }
  const gsc = big(st, camp, 'BSC'); const gscR = gsc && zoneOfSlot(gsc.slot) ? zoneOfSlot(gsc.slot).region : null;
  const divu = big(st, camp, 'DIV+'); const divR = divu && zoneOfSlot(divu.slot) ? zoneOfSlot(divu.slot).region : null;
  const need = {};
  let best = null, bestBad = null;
  const K = free.length;
  for (let mask = 0; mask < (1 << K); mask++) {
    const inn = {}, out = {}, dir = {};
    for (const c of fixed) { const [a, b] = COR[camp][c]; if (!a) inn[b] = (inn[b] || 0) + markers[c]; else out[a] = (out[a] || 0) + markers[c]; dir[c] = [a, b]; }
    free.forEach((c, i) => { let [a, b] = COR[camp][c]; if (mask & (1 << i)) [a, b] = [b, a]; dir[c] = [a, b]; out[a] = (out[a] || 0) + markers[c]; inn[b] = (inn[b] || 0) + markers[c]; });
    let bad = 0; const badR = [];
    for (const r of REG[camp]) { const d = (out[r] || 0) - (inn[r] || 0); if (d > 0) { bad += d; badR.push(r); } }
    if (bad) { if (!bestBad || bad < bestBad.bad) bestBad = { bad, badR }; continue; }
    // cycle ?
    const adj = {}; free.forEach(c => { const [a, b] = dir[c]; (adj[a] = adj[a] || []).push(b); });
    let cyc = false; const stt = {};
    const dfs = n => { stt[n] = 1; for (const m of adj[n] || []) { if (stt[m] === 1) { cyc = true; } else if (!stt[m]) dfs(m); } stt[n] = 2; };
    for (const r of REG[camp]) if (!stt[r]) dfs(r);
    const cons = {}; for (const r of REG[camp]) cons[r] = (inn[r] || 0) - (out[r] || 0);
    const gout = gscR ? Math.max(0, cons[gscR] || 0) : 0;   // flux consommés par la BSC
    let useful = 0, waste = 0;
    for (const r of REG[camp]) { const n = need[r] || 0; const u = Math.min(cons[r], n); useful += u; let rest = cons[r] - u; if (r === divR) { useful += rest * 0.5; rest = 0; } waste += rest; }
    const score = (cyc ? 0 : 1e7) + Math.min(gout, BSC_NEED) * 1e4 + useful * 100 - waste + (gscR ? Math.min(gout, BSC_NEED) - Math.max(0, gout - BSC_NEED) : 0);
    if (!best || score > best.score) best = { score, dir, cons, gout, cyc };
  }
  if (!best) return { ok: false, total, errors: [`aucun sens de flux possible : ${bestBad ? bestBad.badR.join(', ') + ' ferai' + (bestBad.badR.length > 1 ? 'en' : '') + 't sortir plus de flux qu\'' + (bestBad.badR.length > 1 ? 'elles n\'en reçoivent' : 'elle n\'en reçoit') : 'réseau incohérent'}`] };
  if (best.cyc) return { ok: false, total, errors: ['le réseau forme une boucle fermée : tout flux doit venir de l\'extérieur (corridors d\'entrée)'] };
  return { ok: true, total, dir: best.dir, cons: best.cons, gscOut: best.gout, bscIn: best.gout };
}

function minCostFlow(nNodes, edges, S, T) {
  const g = Array.from({ length: nNodes }, () => []); const E = [];
  for (const e of edges) {
    const a = { to: e.v, cap: e.cap, cost: e.cost, flow: 0, tag: e.tag }; const b = { to: e.u, cap: 0, cost: -e.cost, flow: 0, rev: true };
    a.r = b; b.r = a; g[e.u].push(a); g[e.v].push(b); E.push(a);
  }
  for (let it = 0; it < 500; it++) {
    const dist = Array(nNodes).fill(Infinity), prev = Array(nNodes).fill(null); dist[S] = 0;
    for (let k = 0; k < nNodes; k++) {
      let ch = false;
      for (let u = 0; u < nNodes; u++) { if (dist[u] === Infinity) continue; for (const e of g[u]) if (e.cap - e.flow > 0 && dist[u] + e.cost < dist[e.to] - 1e-9) { dist[e.to] = dist[u] + e.cost; prev[e.to] = e; ch = true; } }
      if (!ch) break;
    }
    if (dist[T] === Infinity || dist[T] >= 0) break;
    let f = Infinity, v = T, n = 0; while (v !== S && n++ <= nNodes) { const e = prev[v]; f = Math.min(f, e.cap - e.flow); v = e.r.to; }
    if (v !== S) break;   // cycle négatif : on s'arrête plutôt que de boucler
    v = T; while (v !== S) { const e = prev[v]; e.flow += f; e.r.flow -= f; v = e.r.to; }
  }
  return E;
}

// flux majeurs (marqueurs LOG) : ils nourrissent les divisions (RAPLOG), la DIV+ (croissance) et la BSC (1 flux pour fonctionner)
// flux mineurs : de la BSC à chaque ART CA, EW et GAM, par l'itinéraire le plus court (minorRoute) ; tous coupés si la BSC n'a pas son flux ; au-delà de 3 corridors de la BSC, pas de flux mineur
const MINOR_TYPES = ['ART CA', 'EW', 'GAM', 'NAV'];
function logistics(st, camp, t) {
  migrate(st);
  const dir = st.netDir[camp] || {}, mk = st.net[camp] || {}, cons = st.netCons[camp] || {};
  const nodes = ['S', 'T']; const id = n => { let i = nodes.indexOf(n); if (i < 0) { nodes.push(n); i = nodes.length - 1; } return i; };
  const edges = []; const INF = 1e9;
  const live = c => { if ((st.cut[c] ?? -1) >= t) return false; const [a, b] = COR[camp][c]; for (const r of [a, b]) if (r && !r.startsWith('F:') && regNeut(st, camp, r, t)) return false; return true; };
  const bsc = big(st, camp, 'BSC'); const bscR = zoneOfSlot(bsc.slot)?.region;
  const dv = big(st, camp, 'DIV+'); const dvR = zoneOfSlot(dv.slot)?.region;
  const accMk = f => ACCESS_CORS[camp][f].reduce((s, k) => s + (mk[k] || 0), 0);
  const rank = FUS.slice().sort((x, y) => accMk(y) - accMk(x));
  for (const c of Object.keys(dir)) {
    if (!(mk[c] > 0) || !live(c)) continue;
    const [a, b] = dir[c];
    edges.push({ u: a ? id(a + '>out') : id('S'), v: b.startsWith('F:') ? id(b) : id(b + '>in'), cap: mk[c], cost: a ? 0.01 : 0, tag: { cor: c } });
  }
  for (const r of REG[camp]) {
    edges.push({ u: id(r + '>in'), v: id(r + '>out'), cap: INF, cost: 0, tag: null });
    if (r === bscR) edges.push({ u: id(r + '>in'), v: id('T'), cap: BSC_NEED, cost: -2e6, tag: { bsc: 1 } });   // 8 nov. : la BSC prélève son flux majeur sur tout flux qui traverse sa région, en priorité sur les fuseaux
    if ((cons[r] || 0) > 0) {
      edges.push({ u: id(r + '>in'), v: id(r + '>loc'), cap: cons[r], cost: 0, tag: { loc: r } });
      if (r === dvR) edges.push({ u: id(r + '>loc'), v: id('T'), cap: INF, cost: -100, tag: { div: 1 } });
      edges.push({ u: id(r + '>loc'), v: id('T'), cap: INF, cost: -1, tag: { waste: r } });
    }
  }
  FUS.forEach(f => {
    edges.push({ u: id('F:' + f), v: id('T'), cap: 1, cost: -1e6, tag: { fus: f } });
    edges.push({ u: id('F:' + f), v: id('T'), cap: INF, cost: -(1e4 - 1e3 * rank.indexOf(f)), tag: { fus: f } });
  });
  const E = minCostFlow(nodes.length, edges, 0, 1);
  const res = { raw: perFus(0), bscIn: 0, div: 0, supplied: [], minor: {}, drawn: [], corFlow: {}, waste: {} };
  for (const e of E) {
    if (!e.tag || !e.flow) continue;
    if (e.tag.fus) res.raw[e.tag.fus] += e.flow;
    if (e.tag.bsc) res.bscIn += e.flow;
    if (e.tag.div) res.div += e.flow;
    if (e.tag.cor) res.corFlow[e.tag.cor] = e.flow;
    if (e.tag.waste) res.waste[e.tag.waste] = e.flow;
  }
  const inflow = {}; for (const [c, f] of Object.entries(res.corFlow)) { const b = dir[c][1]; if (!b.startsWith('F:')) inflow[b] = (inflow[b] || 0) + f; }
  res.inflow = inflow;
  res.bscOk = res.bscIn >= BSC_NEED;
  // flux mineurs : ART CA, EW et GAM sur le plateau
  for (const u of st.units) {
    if (u.camp !== camp || u.dead || !MINOR_TYPES.includes(u.type) || !zoneOfSlot(u.slot)) continue;
    const r = minorRoute(st, camp, u.slot, t);
    const why = !res.bscOk ? `la BSC ne reçoit que ${res.bscIn} flux majeur${res.bscIn > 1 ? 's' : ''} sur ${BSC_NEED}` : r.ok ? '' : r.why;
    res.minor[u.id] = why; if (!why) res.supplied.push(u.id);
  }
  res.raplog = {}; res.noFlux = {}; res.artcaF = {};
  FUS.forEach(f => { res.raplog[f] = res.raw[f]; res.noFlux[f] = res.raw[f] === 0; res.artcaF[f] = 0; });
  // anciens noms, gardés pour les pages
  res.gscOut = res.bscIn; res.gscOk = res.bscOk; res.frozen = false;
  return res;
}

// ------------------------------------------------------------------ déploiement (tour 0)
function parseDeployment(st, camp, text) {
  const errs = [], warn = []; const placed = [];
  const groups = clean(text).split(/\n|·|\|/).map(s => s.trim()).filter(Boolean);
  let net = null, lastNet = false;
  for (const g of groups) {
    const m = g.match(/^([^:]+):(.*)$/);
    if (!m && lastNet && (NAVAL ? /^[A-Za-z]{1,3}\d{0,2}\s*(\([^)]*\))?\s*\d$/ : /^[A-Za-z]{1,2}\d{0,2}\s*(\([^)]*\))?\s*\d$/).test(g)) { Object.entries(parseNet(g, camp, errs)).forEach(([k, v]) => { net[k] = (net[k] || 0) + v; }); continue; }
    lastNet = false;
    if (!m) { errs.push(`« ${g} » : il manque « type : emplacements »`); continue; }
    const key = deacc(m[1]); const vals = m[2].split(/[,;]/).map(s => s.trim()).filter(Boolean);
    if (key === 'camp') { const v = deacc(m[2]); if ((v === 'bleu' && camp !== 'B') || (v === 'rouge' && camp !== 'R')) return { errs: [`cette fiche est celle des ${v === 'bleu' ? 'bleus' : 'rouges'} : collez-la dans l'autre cadre`], warn, placed: [], net: {} }; continue; }
    if (key.startsWith('reseau') || key === 'log') { net = parseNet(m[2], camp, errs); lastNet = true; continue; }
    const type = [...BIG, ...Object.keys(SMALL)].find(t => deacc(t) === key || deacc(t) === deacc(TYPE_ALIAS[key.toUpperCase()] || ''));
    if (!type) { errs.push(`type de pion inconnu : « ${m[1].trim()} »`); continue; }
    for (const v of vals) {
      if (deacc(v) === 'reserve') continue;
      const p = parseSlot(v); if (!p) { errs.push(`${type} : emplacement inconnu « ${v} »`); continue; }
      placed.push({ type, slot: p.name, p });
    }
  }
  for (const t of BIG) { const n = placed.filter(x => x.type === t).length; if (n !== 1) errs.push(`${t} : il faut exactement 1 emplacement (${n} donné${n > 1 ? 's' : ''})`); }
  for (const [t, max] of Object.entries(SMALL)) { const n = placed.filter(x => x.type === t).length; if (n > max) errs.push(`${t} : ${n} pions placés pour ${max} disponibles`); }
  const occ = {};
  for (const x of placed) {
    const p = x.p;
    if (p.kind === 'garde') { if (!['INF', 'MP'].includes(x.type)) errs.push(`${x.type} ne peut pas garder les prisonniers`); continue; }
    if (p.camp !== camp) { errs.push(`${x.type} : ${x.slot} n'est pas dans la partie ${ADJF[camp]}`); continue; }
    if (BIG.includes(x.type)) { if (!(p.kind === 'region' && p.n === 0)) errs.push(`${x.type} : un grand pion se pose sur l'emplacement 0 d'une région`); }
    else {
      if (p.kind === 'region' && p.n === 0) errs.push(`${x.type} : l'emplacement 0 est réservé aux grands pions`);
      if (p.kind === 'region' && p.n >= 4) errs.push(`${x.type} : ${x.slot} n'est pas ouvert au tour 0`);
      if (p.art) errs.push(`${x.type} : ${x.slot} est réservé à l'ART DIV`);
      if (x.type === 'GEN' && p.kind !== 'region') errs.push(`GEN : se pose dans le Rear seulement`);
      if (x.type === 'GAM' && p.kind !== 'region') errs.push(`GAM : se pose dans une région du Rear seulement`);
      if (x.type === 'NAV' && !navSlotOk(p)) errs.push(`NAV : se pose dans une zone côtière (${COAST[camp].join(', ')} ou le fuseau ${DE_FUS[COAST_FUS]})`);
    }
    if (occ[x.slot]) errs.push(`${x.slot} occupé deux fois (${occ[x.slot]} et ${x.type})`); occ[x.slot] = x.type;
  }
  if (!net) warn.push('aucun réseau LOG indiqué');
  return { errs, warn, placed, net: net || {} };
}
function parseNet(text, camp, errs) {
  const net = {};
  const re = NAVAL ? /\b([A-Z]{1,3}\d{0,2})\s*(?:\([^)]*\))?\s*:?\s*(\d)\b/gi : /\b([A-Z]{1,2}\d{0,2})\s*(?:\([^)]*\))?\s*:?\s*(\d)\b/gi; let m;
  const s = clean(text).replace(/^\s*LOG\s*:/i, '');
  while ((m = re.exec(s))) {
    const c = m[1].toUpperCase();
    if (!COR[camp][c]) { if (m[1] === c) errs.push(`corridor ${c} inconnu pour les ${PL[camp]}`); continue; }
    net[c] = (net[c] || 0) + +m[2];
  }
  return net;
}
function setupGame(seed, textB, textR) {
  const st = newState(seed);
  const out = { B: null, R: null, ok: true };
  for (const [camp, text] of [['B', textB], ['R', textR]]) {
    const d = parseDeployment(st, camp, text); out[camp] = d;
    if (d.errs.length) { out.ok = false; continue; }
    const counts = {};
    for (const x of d.placed) { st.units.push({ id: st.nextId++, camp, type: x.type, slot: x.slot, neut: -1, dead: false }); counts[x.type] = (counts[x.type] || 0) + 1; }
    for (const [t, max] of Object.entries(SMALL)) for (let i = counts[t] || 0; i < max; i++) st.units.push({ id: st.nextId++, camp, type: t, slot: 'Réserve', neut: -1, dead: false });
    for (const f of FUS) for (const a of ART_SIDES) { const sl = `${f} ${CAMP[camp]} ART ${a}`; st.units.push({ id: st.nextId++, camp, type: 'ART DIV', slot: sl, neut: -1, dead: false }); if (!st.fort.includes(sl)) st.fort.push(sl); }   // ART DIV fortifiées dès le tour 0
  }
  if (!out.ok) return out;
  // emplacements 0 : régions différentes
  for (const camp of ['B', 'R']) {
    const regs = BIG.map(t => zoneOfSlot(big(st, camp, t).slot).region);
    if (new Set(regs).size !== 4) { out[camp].errs.push('les 4 grands pions doivent être dans 4 régions différentes'); out.ok = false; }
    const o = orientNetwork(st, camp, out[camp].net);
    if (!o.ok) { out[camp].errs.push('réseau LOG : ' + o.errors.join(' ; ')); out.ok = false; }
    else { st.net[camp] = out[camp].net; st.netDir[camp] = o.dir; st.netCons[camp] = o.cons; }
  }
  if (!out.ok) return out;
  st.turn = 1; out.state = st; return out;
}

// ------------------------------------------------------------------ messages d'ordres
function parseOrders(text) {
  const raw = clean(text); if (!raw) return null;
  const parts = raw.split('||').map(s => s.trim());
  const head = parts.shift();
  const hm = head.match(/ORDRES\s+(BLEU|ROUGE)/i), tm = head.match(/TOUR\s+(\d+)/i), pm = head.match(/PC\s+neutralis\S*\s*:\s*(Oui|Non)/i);
  const lines = parts.filter(Boolean).map(p => {
    const f = p.split(';');
    return { n: +f[0] || null, card: (f[1] || '').trim(), zone: (f[4] || '').trim(), slot: (f[5] || '').trim(), prec: (f[6] || '').trim(), disp: f.slice(7).join(';').trim(), raw: p };
  });
  return { camp: hm ? (hm[1].toUpperCase() === 'BLEU' ? 'B' : 'R') : null, tour: tm ? +tm[1] : null, pc: pm ? /^oui$/i.test(pm[1]) : null, lines };
}
function parseDisp(text, types) {
  const out = {}; types.forEach(t => { out[t] = []; });
  const re = /(ART CA|INF|MP|CIMIC|DSA|GEN|EW|GAM|NAV)\s*\d\s*(?:→|->)\s*([^·|;]+)/g; let m;
  while ((m = re.exec(text))) { if (out[m[1]]) out[m[1]].push(m[2].trim()); }
  return out;
}
function parseWorks(text) {
  const out = []; const re = /(Fortifier|Fortifie|Ouvrir l'emplacement|Ouvre l'emplacement|Ouvrir|Ouvre)\s+([^·|]+)/gi; let m;
  text = clean(text);
  while ((m = re.exec(text))) out.push({ act: /^fort/i.test(m[1]) ? 'fort' : 'open', slot: m[2].trim() });
  return out;
}

const navSlotOk = p => p && (p.kind === 'region' ? COAST[p.camp].includes(p.region) && p.n >= 1 : p.kind === 'fus' && p.fus === COAST_FUS && !p.art);
const coastZone = (z, camp) => z && (z.region ? COAST[camp].includes(z.region) : z.fus === COAST_FUS);
// emplacement légal pour un pion ; atReception : l'ouverture des emplacements 4 et 5 sera revue à l'effet
function slotError(st, c, type, s, atReception) {
  const p = parseSlot(s); if (!p) return `emplacement inconnu « ${s} »`;
  if (p.kind === 'reserve') return null;
  if (p.kind === 'garde') return ['INF', 'MP'].includes(type) ? null : `${type} ne peut pas garder les prisonniers`;
  if (p.camp !== c) return `${p.name} n'est pas dans la partie ${ADJF[c]}`;
  if (p.art) return `${p.name} est réservé à l'ART DIV`;
  if (p.kind === 'region' && p.n === 0) return `${p.name} est réservé aux grands pions`;
  if (type === 'GEN' && p.kind !== 'region') return 'le GEN reste dans le Rear';
  if (type === 'GAM' && p.kind !== 'region') return 'le GAM reste dans le Rear';
  if (type === 'NAV' && !navSlotOk(p)) return `le NAV reste dans une zone côtière (${COAST[c].join(', ')} ou le fuseau ${DE_FUS[COAST_FUS]})`;
  if (!atReception && p.kind === 'region' && p.n >= 4 && !st.opened.includes(p.name)) return `${p.name} n'est pas ouvert`;
  return null;
}

// vérifie un message à la réception ; renvoie les lignes avec leur statut
function checkOrders(st, camp, text, excluded) {
  const T = st.turn; const res = { camp, lines: [], warns: [], parsed: null };
  const P = parseOrders(text); res.parsed = P;
  if (!P) { res.warns.push('aucun message : le camp ne joue aucune carte ce tour'); return res; }
  let reject = null;
  if (P.camp && P.camp !== camp) { res.warns.push(`le message est celui des ${PL[P.camp]} : collez-le dans l'autre cadre`); reject = `message des ${PL[P.camp]}`; }
  if (P.tour !== null && P.tour !== T) {
    res.tourMismatch = P.tour;
    if (excluded && excluded.includes('tour')) res.warns.push(`le message porte le tour ${P.tour} (tour en cours : ${T}) : accepté par l'arbitre`);
    else { res.warns.push(`le message porte le tour ${P.tour} (tour en cours : ${T}) : cochez la confirmation pour le jouer`); reject = reject || `message du tour ${P.tour}, non confirmé par l'arbitre`; }
  }
  const limit = cardLimit(st, camp);
  res.limit = limit;
  const seen = new Set(); let count = 0; const fepFrom = new Set(); let fepN = 0;   // Frappe en profondeur : une carte, jusqu'à 3 ART CA (une ligne par ART CA)
  P.lines.forEach((L, i) => {
    const o = { idx: i, n: L.n || i + 1, raw: L, card: cardName(L.card), status: 'ok', errors: [], notes: [], target: {} };
    res.lines.push(o);
    if (reject) { o.status = 'ignored'; o.errors.push(reject); return; }
    // annulation d'un ordre en cours : « Annulation : carte » ; ne compte pas dans la limite de cartes
    const am = String(L.card || '').match(/^annul\w*\s*[:\-–]?\s*(.+)$/i);
    if (am) {
      o.cancel = true; o.card = cardName(am[1]);
      if (!o.card) { o.status = 'ignored'; o.errors.push(`carte à annuler inconnue « ${am[1]} »`); return; }
      const pd = st.pending.find(q => q.camp === camp && q.card === o.card && q.effet > T && !res.lines.some(x => x.pend === q));
      if (!pd) { o.status = 'ignored'; o.errors.push(`aucun ordre ${o.card} en cours à annuler`); return; }
      const C = CARDS[o.card]; o.status = 'cancel'; o.pend = pd; o.retour = C.once ? T + 1 : T + Math.max(1, C.ret - C.mep); return;   // 8 nov. : une carte à usage unique annulée n'a pas servi, elle revient au tour suivant
    }
    if (!o.card) { o.status = 'ignored'; o.errors.push(`carte inconnue « ${L.card} »`); return; }
    const C = CARDS[o.card];
    if (excluded && excluded.includes(i)) { o.status = 'ignored'; o.errors.push("écartée par l'arbitre"); return; }
    const salvo = o.card === 'Frappe en profondeur' && seen.has(o.card);   // tir supplémentaire de la même Frappe en profondeur
    if (salvo && ++fepN > 3) { o.status = 'ignored'; o.errors.push('trois ART CA au plus par Frappe en profondeur'); return; }
    if (seen.has(o.card) && !salvo) { o.status = 'ignored'; o.errors.push('carte en double dans le message'); return; }
    if (PAIR[o.card] && seen.has(PAIR[o.card])) { o.status = 'ignored'; o.errors.push(`${PAIR[o.card]} est déjà jouée : une seule carte de la paire`); return; }
    const back = st.cards[camp][o.card];
    if (back !== undefined && back > T) { o.status = 'ignored'; o.errors.push(`carte mise de côté jusqu'au tour ${back}`); return; }
    if (!salvo && count >= limit) { o.status = 'ignored'; o.errors.push(`au-delà de la limite de ${limit} carte${limit > 1 ? 's' : ''} (PC à ${st.pcg[camp]} %)`); return; }
    if (!salvo) { seen.add(o.card); count++; if (o.card === 'Frappe en profondeur') fepN = 1; } else o.notes.push('tir de salve : ne compte pas comme une carte de plus');
    o.effet = T + C.mep; o.retour = retOf(C, T);
    // impératifs : vérifiés au tour d'effet seulement (règle de Ben, 7 nov.), pas à la réception
    // cible
    const tg = o.target; const e = msg => { o.status = 'void'; o.errors.push(msg); };
    const zoneEnemy = (zstr) => {
      zstr = String(zstr || '').replace(/\s*\([^)]*\)$/, '');
      const f = fuseauOf(zstr); if (f && /fuseau|^\w+$/i.test(deacc(zstr)) && !regionOf(zstr)) return { fus: f };
      const rg = regionOf(zstr); if (rg) { if (rg[1] !== EN[camp]) return { err: `${rg[0]} n'est pas une région ennemie` }; return { region: rg[0] }; }
      return { err: `zone inconnue « ${zstr} »` };
    };
    switch (C.tgt) {
      case 'zoneEnemy': { const z = zoneEnemy(L.zone); if (z.err) e(z.err); else Object.assign(tg, z); break; }
      case 'regionEnemy': { const z = zoneEnemy(L.zone); if (z.err) e(z.err); else if (!z.region) e('il faut viser une région du Deep'); else Object.assign(tg, z); break; }
      case 'fuseau': { const f = fuseauOf(L.zone); if (!f) e(`fuseau inconnu « ${L.zone} »`); else if (o.card === 'Appui naval' && f !== COAST_FUS) e(`Appui naval ne vaut que pour le fuseau ${DE_FUS[COAST_FUS]}, seul fuseau côtier`); else tg.fus = f; break; }
      case 'coastZone': case 'coastRegion': {   // Reco de plage : région côtière ennemie ou fuseau de Kaliningrad ; Raid amphibie : région côtière ennemie
        const z = zoneEnemy(L.zone || L.slot); if (z.err) { e(z.err); break; }
        if (C.tgt === 'coastRegion' && !z.region) { e(`${o.card} vise une région côtière du Deep (${COAST[EN[camp]].join(', ')})`); break; }
        if (!coastZone(z, EN[camp])) { e(`${z.region || 'le fuseau ' + DE_FUS[z.fus]} n'est pas une zone côtière ennemie (${COAST[EN[camp]].join(', ')}${C.tgt === 'coastZone' ? ' ou le fuseau ' + DE_FUS[COAST_FUS] : ''})`); break; }
        Object.assign(tg, z); break;
      }
      case 'coastSlot': case 'coastSlotDeep': {   // Commando marine : emplacement ennemi en zone côtière ; Bombardement naval : dans une région côtière du Deep
        const p = parseSlot(L.slot);
        if (!p || !['region', 'fus'].includes(p.kind)) { e(`emplacement inconnu « ${L.slot} »`); break; }
        if (p.camp !== EN[camp]) { e(`${p.name} n'est pas un emplacement ennemi`); break; }
        if (C.tgt === 'coastSlotDeep' && !(p.kind === 'region' && COAST[EN[camp]].includes(p.region))) { e(`${o.card} vise une région côtière du Deep (${COAST[EN[camp]].join(', ')})`); break; }
        if (!coastZone(zoneOfSlot(p.name), EN[camp])) { e(`${p.name} n'est pas en zone côtière ennemie`); break; }
        tg.slot = p.name; break;
      }
      case 'slotEnemy': case 'slotEnemyDeep': {
        const p = parseSlot(L.slot);
        if (!p || !['region', 'fus'].includes(p.kind)) { e(`emplacement inconnu « ${L.slot} »`); break; }
        if (p.camp !== EN[camp]) { e(`${p.name} n'est pas un emplacement ennemi`); break; }
        if (C.tgt === 'slotEnemyDeep' && p.kind !== 'region') { e(`${o.card} vise le Deep seulement`); break; }
        tg.slot = p.name; break;
      }
      case 'corridorEnemy': {
        const c = ((L.zone || L.slot).trim().match(NAVAL ? /^[A-Za-z]{1,3}\d{0,2}/ : /^[A-Za-z]{1,2}\d{0,2}/) || [''])[0].toUpperCase(); const cc = COR[EN[camp]][c];
        if (!cc) e(`corridor ennemi inconnu « ${L.zone} »`); else if (!cc[0]) e(`${c} est une entrée depuis l'extérieur : il ne peut pas être visé`); else tg.cor = c; break;
      }
      case 'cb': {
        const a = parseSlot(L.prec); const z = zoneEnemy(L.zone);
        if (!a || !['region', 'fus'].includes(a.kind) || a.camp !== camp) { e(`emplacement de l'ART CA en contre-batterie inconnu « ${L.prec} »`); break; }
        tg.from = a.name;
        if (z.err) { const f = fuseauOf(L.zone); if (f) { tg.fus = f; } else { e(z.err); break; } } else Object.assign(tg, z);
        break;
      }
      case 'slotOwnEmpty': {
        const p = parseSlot(L.slot);
        if (!p || !['region', 'fus'].includes(p.kind) || p.camp !== camp || p.art || (p.kind === 'region' && p.n === 0)) { e(`emplacement ${ADJ[camp]} inconnu ou impossible « ${L.slot} »`); break; }
        tg.slot = p.name; break;
      }
      case 'logEffort': {
        const z = String(L.zone || L.slot || L.prec || '').trim();
        if (/^div\s*\+|^div\+|réserve|reserve/i.test(z) || deacc(z) === 'div+') { tg.divp = true; break; }
        const f = fuseauOf(z); if (!f) e(`il faut viser un fuseau (+2 RAPLOG pendant 3 tours) ou « DIV+ » (+10 points) : « ${z} »`); else tg.fus = f; break;
      }
      case 'remec': {   // 11 nov. : REMEC : le GAM (+3 crans ALAT), le PC ou la BSC (+30 %)
        const z = String(L.zone || L.slot || L.prec || '').trim(); const zp = parseSlot(z);
        const zu = zp && zp.kind === 'region' ? st.units.find(u => u.camp === camp && !u.dead && u.slot === zp.name && ['GAM', 'PC', 'BSC'].includes(u.type)) : null;
        const k = zu ? zu.type : deacc(z).toUpperCase().replace(/\s+/g, '');
        if (k === 'GAM' || k === 'ALAT') { tg.alat = true; break; }
        if (k === 'PC') { tg.pcg = true; break; }
        if (k === 'BSC' || k === 'GSC') { tg.bscg = true; break; }
        e(`il faut viser « GAM » (+3 crans ALAT), « PC » ou « BSC » (+30 %) : « ${z} »`); break;
      }
      case 'genOwn': {   // Ouverture d'itinéraire : le GEN choisi (son emplacement, ou à défaut sa région)
        const s = String(L.slot || L.prec || L.zone || '').trim(); const ps = parseSlot(s);
        if (ps && ps.kind === 'region' && ps.camp === camp) { tg.slot = ps.name; tg.region = zoneOfSlot(ps.name).region; break; }
        const rg = regionOf(s); if (rg && rg[1] === camp) { tg.region = rg[0]; break; }
        e(`il faut désigner le GEN ${ADJ[camp]} qui ouvre l'itinéraire (son emplacement dans le Rear) : « ${s} »`); break;
      }
      case 'regionOwn': { const rg = regionOf(L.zone || (L.disp || '').replace(/\s+0$/, '')); if (!rg || rg[1] !== camp) e(`région ${ADJF[camp]} inconnue « ${L.zone} »`); else tg.region = rg[0]; break; }
      case 'disp': {
        const d = parseDisp(L.disp, C.types); tg.disp = d;
        if (C.types.every(t => d[t].length === 0)) { e('aucun dispositif indiqué'); break; }
        for (const t of C.types) {
          const n = unitsOf(st, camp).filter(u => u.type === t).length;
          if (!d[t].length) continue;   // type non cité : ses pions restent en place
          if (d[t].length !== n) { e(`dispositif ${t} incomplet : ${d[t].length} emplacement${d[t].length > 1 ? 's' : ''} pour ${n} ${t} en jeu (il faut la position de chaque pion, Réserve comprise)`); continue; }
          for (const sl of d[t]) { const x = slotError(st, camp, t, sl, true); if (x) e(`${t} : ${x}`); }
        }
        break;
      }
      case 'works': {
        const w = parseWorks(L.disp); if (!w.length) e('aucun chantier indiqué'); tg.works = w;
        for (const x of w) { const ps = parseSlot(x.slot); if (!ps || ps.kind !== 'region' || ps.camp !== camp) e(`chantier « ${x.slot} » hors du Rear ${ADJ[camp]}`); else if (x.act === 'open' && ps.n < 4) e(`${ps.name} : seuls les emplacements 4 et 5 s'ouvrent`); }
        break;
      }
      case 'net': {
        const errs = []; const n = parseNet(L.disp, camp, errs); if (errs.length) e(errs.join(' ; ')); if (!Object.keys(n).length) e('aucun réseau indiqué'); tg.net = n;
        if (!errs.length && Object.keys(n).length) { const or = orientNetwork(st, camp, n); if (!or.ok) e('réseau impossible : ' + or.errors.join(' ; ')); }
        break;
      }
    }
    if (o.card === 'Frappe en profondeur') {
      const p = parseSlot(L.prec); if (!p || p.camp !== camp) e(`emplacement de l'ART CA qui tire inconnu « ${L.prec} »`); else { tg.from = p.name; if (fepFrom.has(p.name)) e(`l'ART CA de ${p.name} tire déjà dans cette Frappe en profondeur`); fepFrom.add(p.name); }
    }
    if (o.card === 'Renfort de feu') {
      const arr = [...new Set(L.prec.split(/[,·;]|\bet\b/).map(normSlot).filter(Boolean))];
      if (!arr.length) e("ART DIV qui pivote non indiquée"); tg.arts = arr;
      if (arr.length > 2) e('deux ART DIV au plus par carte');
      for (const s of arr) { const ps = parseSlot(s); if (!ps.art || ps.camp !== camp) { e(`${s} n'est pas une ART DIV ${ADJF[camp]}`); continue; }
        const i = FUS.indexOf(ps.fus), j = FUS.indexOf(tg.fus);
        if (tg.fus && Math.abs(j - i) > 1) e(`${s} ne peut tirer que vers son fuseau ou un fuseau voisin : pas vers ${tg.fus}`);
        const ad = st.units.find(u => u.camp === camp && u.type === 'ART DIV' && u.slot === ps.name); if (ad && ad.dead) e(`l'ART DIV de ${ps.name} est détruite`); }
    }
    // contrôles à la réception (comme la page joueur) : ce qui ne peut pas changer d'ici l'effet
    if (o.card === 'Frappe en profondeur' && tg.from && tg.slot) {
      const a = parseSlot(tg.from), t = parseSlot(tg.slot);
    }
    if (o.card === 'Engagement GAM' || o.card === 'Raid aéro' || o.card === 'Out of contact Attack') {
      const g = st.units.find(u => u.camp === camp && u.type === 'GAM');
      if (!g || g.dead) e('GAM détruit');   // GAM en réserve : vérifié au tour d'effet
    }
    if (C.nav) {   // 12 nov. : carte navale impossible si le NAV est détruit (le reste est vérifié au tour d'effet)
      const nv = st.units.find(u => u.camp === camp && u.type === 'NAV');
      if (!nv || nv.dead) e('NAV détruit');
    }
    if (o.card === 'REMEC' && tg.alat) {   // 11 nov. : REMEC sur le GAM impossible si le GAM est détruit
      const g = st.units.find(u => u.camp === camp && u.type === 'GAM');
      if (!g || g.dead) e('GAM détruit : REMEC ne peut viser que le PC ou la BSC');
    }
  });
  res.count = count;
  return res;
}

// ------------------------------------------------------------------ résolution d'un tour
function resolveTurn(st0, ordersText, excluded, forced) {
  const st = migrate(clone(st0)); const T = st.turn;
  const regen = !st.ended && REGEN_TURNS.includes(T) ? { B: {}, R: {} } : null;   // remontée des jauges AAE, FS et ALAT (tours 10 et 20)
  if (regen) for (const c of ['B', 'R']) for (const gn of GAUGES) { regen[c][gn] = st.gauges[c][gn] || 0; st.gauges[c][gn] = Math.max(0, st.gauges[c][gn] - 1); }
  const g0 = clone(st.gauges);   // jauges du début du tour : l'usure des échecs du tour ne compte qu'à partir du tour suivant
  const wearRD = [];             // baisses de jauge, portées sur la feuille de route en fin de tour
  const out = {
    turn: T, checks: {}, journal: [], road: [], dice: [],
    rep: { B: { own: [], enemy: [], intel: [], back: [], div: [], notes: [], gauges: [], seen: [], nl: [] }, R: { own: [], enemy: [], intel: [], back: [], div: [], notes: [], gauges: [], seen: [], nl: [] } },
    combat: {}, nextDiv: { B: [], R: [] }, act: { B: [], R: [] }, hit: { B: [], R: [] },
  };
  const J = s => out.journal.push(s); const RD = s => out.road.push(s);
  // jet d'un dé : valeur tirée (graine), sauf si l'arbitre en a imposé une
  const D = (k, who) => { const nat = d10(st.seed, k); const f = forced && +forced[k]; if (f >= 1 && f <= 10 && f !== nat) { J(`  ⚖ dé imposé par l'arbitre (${who}) : ${f % 10} au lieu de ${nat % 10}`); return { d: f, nat, forced: true }; } return { d: nat, nat, forced: false }; };
  const rep = out.rep;
  // bloc de synchronisation : ce que le camp c apprend d'un emplacement ENI (pion, neutralisation, ouverture)
  const see = (c, s) => { const u = unitAt(st, s); const p = parseSlot(s); const o = p && p.kind === 'region' && p.n >= 4 ? (st.opened.includes(s) ? 1 : 0) : null; rep[c].seen.push([s, u ? u.type : '', u && !active(u, T) ? u.neut : 0, o]); };
  const seeDead = (c, u) => rep[c].seen.push([u.slot, u.type, -1, null]);
  if (st.ended) { J('La partie est terminée.'); out.state = st; return out; }
  if (regen) for (const c of ['B', 'R']) {
    const l = GAUGES.map(gn => regen[c][gn] === st.gauges[c][gn] ? `${gn} déjà au plus haut (${gaugeTxt(gn, st.gauges[c][gn])})` : `${gn} ${gaugeTxt(gn, regen[c][gn])} → ${gaugeTxt(gn, st.gauges[c][gn])}`);
    J(`Tour ${T} : les jauges ${ADJF[c]}s remontent d'un cran (${l.join(' ; ')})`); RD(`Jauges ${ADJF[c]}s ${GAUGES_TXT} : un cran de mieux (tour ${T})`);
    st.regenTxt = st.regenTxt || {}; st.regenTxt[c] = `Renforts du tour ${T} : nos jauges ${GAUGES_TXT} remontent d'un cran (${l.join(' ; ')}).`;
  }
  // messages reportés (combat du tour précédent)
  for (const c of ['B', 'R']) { rep[c].div = st.carry[c] || []; st.carry[c] = []; if (regen && st.regenTxt) rep[c].own.push(st.regenTxt[c]); }
  delete st.regenTxt;

  // 1. réception des ordres
  J(`=== TOUR ${T} ===`); J('— Réception des ordres');
  for (const c of ['B', 'R']) {
    const ch = checkOrders(st, c, ordersText[c], (excluded || {})[c]); out.checks[c] = ch;
    ch.warns.forEach(w => J(`  ${CAMP[c]} : ${w}`));
    for (const o of ch.lines) {
      if (o.status === 'cancel') {
        st.pending = st.pending.filter(q => q !== o.pend && !(q.camp === c && q.card === o.card && q.played === o.pend.played && q.effet === o.pend.effet)); st.cards[c][o.card] = o.retour;   // une salve s'annule en entier
        J(`  ${CAMP[c]} : annulation de ${o.card} (jouée au tour ${o.pend.played}, effet prévu au tour ${o.pend.effet}) — ${retTxt(o.retour)}`);
        rep[c].own.push(`Annulation de ${o.card} (jouée au tour ${o.pend.played}) : l'ordre n'aura pas lieu. ${o.retour >= NEVER ? 'La carte, à usage unique, ne revient pas.' : `La carte revient au tour ${o.retour}.`}`);
        if (o.card === 'Engagement de la DIV' && o.pend.target && o.pend.target.fus) rep[EN[c]].enemy.push(`L'ENI a annulé l'engagement de sa DIV+ annoncé dans le fuseau ${DE_FUS[o.pend.target.fus]}.`);
        continue;
      }
      if (o.status === 'ignored') { J(`  ${CAMP[c]} ${o.n}. ${o.raw.card} — ignorée : ${o.errors.join(' ; ')}`); rep[c].own.push(`${o.raw.card || 'Ligne ' + o.n} : non jouée (${o.errors.join(' ; ')}). ${o.card ? 'La carte reste disponible.' : ''}`.trim()); continue; }
      st.cards[c][o.card] = o.retour; if (PAIR[o.card]) st.cards[c][PAIR[o.card]] = o.retour;
      if (o.status === 'void') { J(`  ${CAMP[c]} ${o.n}. ${o.card} — jouée pour rien : ${o.errors.join(' ; ')}`); rep[c].own.push(`${o.card} : carte jouée pour rien (${o.errors.join(' ; ')}). ${o.retour >= NEVER ? 'Carte à usage unique : elle ne revient pas.' : `De retour au tour ${o.retour}.`}`); continue; }
      st.pending.push({ camp: c, card: o.card, line: o.n, played: T, effet: o.effet, target: o.target, raw: o.raw });
      J(`  ${CAMP[c]} ${o.n}. ${o.card} — effet au tour ${o.effet}, ${retTxt(o.retour)}`);
      if (o.card === 'Assaut de la BP') rep[c].own.push(`Assaut de la BP : ordre reçu, effet au tour ${o.effet}. Au tour d'effet, 3 INF de notre réserve seront engagés et détruits ; nos ${NDIV} divisions perdront ${BP_FM} FM 5 tours plus tard.`);
      if (o.card === 'Engagement de la DIV') {
        rep[EN[c]].enemy.push(`Action de l'ennemi dans notre AOR : l'ENI annonce l'engagement de sa DIV+ dans le fuseau ${DE_FUS[o.target.fus]} (effet au tour ${o.effet}).`);
        rep[c].own.push(`Engagement de la DIV vers ${o.target.fus} : ordre reçu, révélé à l'ennemi, effet au tour ${o.effet}.`);
      }
    }
  }
  for (const c of ['B', 'R']) {
    const got = (out.checks[c].lines || []).filter(o => o.status === 'ok').map(o => `${o.card} (effet au tour ${o.effet}, ${retTxt(o.retour)})`);
    if (got.length) rep[c].own.unshift(`Ordres reçus ce tour : ${got.join(', ')}.`);
  }
  // cartes de retour
  for (const c of ['B', 'R']) { const back = Object.entries(st.cards[c]).filter(([, b]) => b === T).map(([k]) => k); if (back.length) rep[c].back = back.sort(); }

  const due = st.pending.filter(p => p.effet === T); st.pending = st.pending.filter(p => p.effet !== T);
  const key = p => `${T}|${p.camp}|${p.played}|${p.line}`;
  const roll = (p, rate, suffix) => {
    if (rate >= 100) return { ok: true, d: null };
    if (rate <= 0) return { ok: false, d: null };
    const k = key(p) + (suffix || ''); const who = `${CAMP[p.camp]} · ${p.card}${suffix ? ' (' + suffix + ')' : ''}`; const x = D(k, who); const d = x.d;
    out.dice.push({ who, d, k, nat: x.nat, forced: x.forced, camp: p.camp, rule: `réussite si dé ≥ ${Math.floor((100 - rate) / 10) + 1} (taux ${rate} %)` });
    return { ok: d * 10 + rate > 100, d };
  };
  const fortHeld = new Set();   // actions dont une fortification a arrêté l'effet
  const fortRoll = (p, u) => { const k = key(p) + '|fort|' + u.slot; const who = `${CAMP[p.camp]} · ${p.card} (fortification ${u.slot})`; const x = D(k, who); const d = x.d; out.dice.push({ who, d, k, nat: x.nat, forced: x.forced, camp: p.camp, rule: 'la fortification cède sur 6, 7, 8, 9 ou 0' }); if (d < 6) fortHeld.add(key(p)); return { hit: d >= 6, d }; };
  const wear = () => 0;
  // ravitaillement d'une ART CA, d'un EW ou du GAM au moment d'agir : flux mineur, puis dé selon la jauge BSC
  const supplyCheck = (p, u, lo, sfx) => {
    const c = u.camp; const nm = `${u.type === 'GAM' ? 'le GAM' : u.type === 'NAV' ? 'le NAV' : u.type === 'EW' ? "l'EW" : "l'ART CA"} de ${u.slot}`;
    if (lo.minor[u.id]) return `${nm} n'est pas ravitaillé${u.type === 'ART CA' ? 'e' : ''} (${lo.minor[u.id]})`;
    const need = BSC_DIE(st.bscg[c]); if (!need) return null;
    if (need > 10) return `${nm} n'est pas ravitaillé${u.type === 'ART CA' ? 'e' : ''} (BSC à ${st.bscg[c]} %)`;
    const k = (p ? key(p) : `${T}|${c}|cb|${u.id}`) + '|bsc' + (sfx || ''); const who = `${CAMP[c]} · ${p ? p.card : 'Contre-batterie'} (ravitaillement BSC ${st.bscg[c]} %)`; const x = D(k, who);
    out.dice.push({ who, d: x.d, k, nat: x.nat, forced: x.forced, camp: c, rule: `ravitaillé sur ${need >= 10 ? '0 seulement' : need === 9 ? '9 ou 0' : need + ' à 9 ou 0'} (BSC à ${st.bscg[c]} %)` });
    J(`    ravitaillement BSC ${ADJF[c]} (${st.bscg[c]} %) pour ${nm} : dé ${dTxt(x.d)} → ${x.d >= need ? 'ravitaillé' : 'pas ravitaillé'}`);
    return x.d >= need ? null : `${nm} n'a pas été ravitaillé${u.type === 'ART CA' ? 'e' : ''} à temps (BSC à ${st.bscg[c]} %, dé ${dTxt(x.d)})`;
  };   // plus de malus d'usure : seul le dernier cran compte (impératif)
  const risk = (p, rp) => {
    const C = CARDS[p.card];
    for (const gn of C.g) { st.gauges[p.camp][gn] = Math.min(4, st.gauges[p.camp][gn] + 1); rp.push(`jauge ${gn} −1 ${gn === 'NAV' ? 'point' : 'cran'} en fin de tour (${gaugeTxt(gn, st.gauges[p.camp][gn])})`); wearRD.push(`Jauge ${gn} ${ADJF[p.camp]} : ${gaugeTxt(gn, st.gauges[p.camp][gn])} (usure du tour)`); }
  };
  const revealed = (p, ok) => { const r = CARDS[p.card].rev; return r === 'always' || (r === 'fail' && !ok); };
  const tgtTxt = p => {
    const t = p.target;
    if (t.slot) return t.slot; if (t.region) return t.region; if (t.fus) return 'fuseau ' + DE_FUS[t.fus]; if (t.cor) return 'corridor ' + t.cor; return '';
  };
  const onTxt = p => { const t = tgtTxt(p); if (!t) return ''; if (CARDS[p.card].tgt === 'regionOwn') return ' vers ' + t; return (p.target.fus || p.target.cor ? ' sur le ' : ' sur ') + t; };
  const neutEnd = u => T + 4;   // fin de neutralisation : 5 tours (les grands pions ne sont plus neutralisés : ils perdent des points de jauge)
  const GAUGED = ['PC', 'BSC', 'DIV+'];
  const neutralize = (u, by, info, card, half) => {
    if (GAUGED.includes(u.type)) {
      const t = bigLoss(st, u, card || 'Frappe drone', half); u.hit = (u.hit || 0) + 1; u.lastLoss = t;
      RD(`${u.type} ${ADJ[u.camp]} (${u.slot}) touché : ${t}`);
      return `${u.type} ENI de ${u.slot} touché : ${t}`;
    }
    const was = active(u, T);
    u.neut = Math.max(u.neut, neutEnd(u)); u.neutFrom = T;   // une nouvelle frappe réussie fait repartir la neutralisation de zéro (elle remplace la précédente)
    RD(`Poser un marqueur de neutralisation sur ${desc(u)} — retrait à la fin du tour ${u.neut}`);
    const lines = [`${u.type} ENI de ${u.slot} neutralisé jusqu'à la fin du tour ${u.neut}`];
    if (u.type === 'POW' && (!card || POW_PENALTY.includes(card))) {
      const sh = by; FUS.forEach(f => { st.fm[sh][f] = 0; }); st.fmBlock[sh] = T + 4;
      lines.push(`tir sur le camp de prisonniers : nos divisions perdent leur marqueur FM et n'en reçoivent plus jusqu'au tour ${T + 4}`);
      RD(`Retirer les marqueurs FM ${ADJ[sh]}s (bloqués jusqu'à la fin du tour ${T + 4})`);
      info && info.push(`ATTENTION : votre frappe a touché le camp de prisonniers ennemi, où sont gardés nos propres soldats. Les images circulent : nos ${NDIV} divisions perdent leur marqueur FM et ne pourront plus en gagner pendant 5 tours.`);
    }
    if (u.type === 'ART CA') endCB(u, 'neutralisée');
    if (u.type === 'NAV' && was && st.gauges[u.camp].NAV !== undefined) {   // 12 nov. : un NAV actif qui est neutralisé fait perdre un point NAV
      const b = st.gauges[u.camp].NAV; st.gauges[u.camp].NAV = Math.min(4, b + 1);
      if (st.gauges[u.camp].NAV !== b) { u.alatTxt = `jauge NAV ${gaugeTxt('NAV', b)} → ${gaugeTxt('NAV', st.gauges[u.camp].NAV)}`; lines.push(`la jauge NAV ENI perd un point`);
        RD(`Jauge NAV ${ADJF[u.camp]} : ${gaugeTxt('NAV', st.gauges[u.camp].NAV)} (NAV neutralisé)`); }
    }
    if (u.type === 'GAM' && was) {   // 11 nov. : un GAM actif qui est neutralisé fait perdre un cran ALAT (pas s'il était déjà neutralisé)
      const b = st.gauges[u.camp].ALAT; st.gauges[u.camp].ALAT = Math.min(4, b + 1);
      if (st.gauges[u.camp].ALAT !== b) { u.alatTxt = `jauge ALAT ${gaugeTxt('ALAT', b)} → ${gaugeTxt('ALAT', st.gauges[u.camp].ALAT)}`; lines.push(`la jauge ALAT ENI perd un cran`);
        RD(`Jauge ALAT ${ADJF[u.camp]} : ${gaugeTxt('ALAT', st.gauges[u.camp].ALAT)} (GAM neutralisé)`); }
    }
    return lines.join(' ; ');
  };
  const neutTxt = u => GAUGED.includes(u.type) ? `Notre ${u.type} de ${u.slot} a été touché${u.type === 'PC' ? '' : 'e'} : ${u.lastLoss}.` + (u.type === 'PC' ? ` Nous pourrons jouer ${PC_CARDS(st.pcg[u.camp])} carte${PC_CARDS(st.pcg[u.camp]) > 1 ? 's' : ''} par message.` : '') : `Notre ${u.type} de ${u.slot} est neutralisé jusqu'à la fin du tour ${u.neut}.` + (u.alatTxt ? ((t => (delete u.alatTxt, u.type === 'NAV' ? ` Nous perdons un point NAV : ${t}.` : ` Nous perdons un cran ALAT : ${t}.`))(u.alatTxt)) : '');
  // fin d'une mission de contre-batterie
  const endCB = (u, why) => { const m = st.cb[u.id]; if (!m) return; delete st.cb[u.id]; const z = m.zone.fus ? 'le fuseau ' + DE_FUS[m.zone.fus] : m.zone.region;
    rep[u.camp].own.push(`Contre-batterie : l'ART CA de ${u.slot} cesse de surveiller ${z} (${why}).`); J(`    contre-batterie ${ADJF[u.camp]} de ${u.slot} sur ${z} terminée (${why})`); };
  const deadTxt = u => `Notre ${u.type} de ${u.slot} a été détruit : il ne compte plus dans les dispositifs.`;
  const dangersOf = (p, snapUnits) => {
    const C = CARDS[p.card]; if (!C.dg || !C.dg.length) return { n: 0, list: [] };
    const en = EN[p.camp]; let zones = [];
    const t = p.target;
    if (t.region) zones = [{ region: t.region }];
    else if (t.fus) zones = [{ fus: t.fus }];
    else if (t.slot) { const z = zoneOfSlot(t.slot); zones = [z.region ? { region: z.region } : { fus: z.fus }]; }
    else if (t.cor) { const [a, b] = COR[en][t.cor]; zones = [a && { region: a }, b.startsWith('F:') ? { fus: b.slice(2) } : { region: b }].filter(Boolean); }
    const types = new Set();
    for (const z of zones) for (const u of snapUnits) {
      if (u.camp !== en || u.dead || !active(u, T)) continue;
      const uz = zoneOfSlot(u.slot); if (!uz) continue;
      if (z.region ? uz.region === z.region : (uz.fus === z.fus && uz.camp === en)) types.add(u.type);
    }
    const list = C.dg.filter(x => types.has(x)); return { n: list.length, list };
  };
  const dgTxt = d => d.n ? ` (−${30 * d.n} : ${d.list.join(', ')})` : '';
  const statusOf = ef => ef.status || (ef.r.d === null && ef.rate >= 100 ? 'exécution en cours' : (ef.r.ok ? 'réussite' : 'échec'));
  const head = (p, rate, r) => `${p.card}${onTxt(p)} — réussite ${Math.max(0, rate)} %${r.d ? ' · dé ' + dTxt(r.d) : (rate >= 100 ? ' · sans jet' : ' · échec certain')} → ${r.ok ? 'réussite' : 'échec'}`;

  const intelOn = (c, zone) => {
    const en = EN[c]; const lines = [];
    if (zone.region) {
      for (let i = 0; i <= 5; i++) {
        const s = `${zone.region} ${i}`; const u = unitAt(st, s); see(c, s);
        let txt; if (u) txt = unitTxtShort(u, T); else if (i >= 4 && !st.opened.includes(s)) txt = 'non ouvert'; else if (i >= 4) txt = 'ouvert mais vide'; else txt = 'vide';
        lines.push(`${s} = ${txt}`);
      }
      const lo = logistics(st, en, T);
      for (const [code, [a, b]] of Object.entries(COR[en])) {
        if (a !== zone.region && b !== zone.region) continue;
        const m = st.net[en][code] || 0; const d = st.netDir[en][code];
        rep[c].nl.push([code, m, (d && d[0]) || '', (d && d[1]) || '', Math.min(m, lo.corFlow[code] || 0)]);   // flux LOG ENI repérés, pour le plateau du joueur (10 nov.)
        if (!m) continue;
        const inc = d && d[1] === zone.region;
        const cut = (lo.corFlow[code] || 0) < m ? ` (${lo.corFlow[code] || 0} passent réellement)` : '';
        lines.push(`${code} = ${m} LOG ${inc ? 'entrant' + (m > 1 ? 's' : '') : 'sortant' + (m > 1 ? 's' : '')}${cut}`);
      }
      return `${zone.region} : ` + lines.join(', ');
    }
    const f = zone.fus;
    for (const s of [1, 2, 3].map(n => `${f} ${CAMP[en]} ${n}`).concat(ART_SIDES.map(a => `${f} ${CAMP[en]} ART ${a}`))) { const u = unitAt(st, s); see(c, s); lines.push(`${s} = ${u ? unitTxtShort(u, T) : 'vide'}`); }
    const lo = logistics(st, en, T); const dv = divisionScore(st, en, f, T, lo, { rap: 0, fm: 0 }, {});
    lines.push(`FM de la division ENI = ${fmt1(dv.fm)}`);
    for (const code of ACCESS_CORS[en][f]) { lines.push(`${code} = ${st.net[en][code] || 0} LOG`);
      const m = st.net[en][code] || 0, d = st.netDir[en][code]; rep[c].nl.push([code, m, (d && d[0]) || '', (d && d[1]) || '', Math.min(m, lo.corFlow[code] || 0)]); }
    return `Fuseau ${DE_FUS[f]} : ` + lines.join(', ');
  };

  // ---------------- contre-batterie : un pion qui se révèle (tir d'ART CA, brouillage, déception, tir de contre-batterie) dans une zone surveillée
  // attire le tir de chaque ART CA ENI qui la surveille ; chaque ART CA ne tire qu'une fois par tour ; un tir de contre-batterie révèle à son tour l'ART CA
  const cbEvents = []; const cbFired = new Set(); const cbSalvo = new Map(); const cbShot = new Set();   // salve : une ART CA qui surveille la zone riposte sur chaque ART CA de la salve
  const runCB = () => {
    for (let guard = 0; cbEvents.length && guard < 60; guard++) {
      const ev = cbEvents.shift(); const z = zoneOfSlot(ev.slot); if (!z) continue; const en = EN[ev.camp];
      for (const [id, m] of Object.entries(st.cb)) {
        if (m.camp !== en) continue;
        const watch = m.zone.fus ? (z.fus === m.zone.fus && z.camp === ev.camp) : (z.region === m.zone.region);
        if (!watch) continue;
        const art = st.units.find(u => u.id === +id);
        if (!art || art.dead || !active(art, T)) continue;
        if (cbFired.has(art.id) && !(ev.salvo && cbSalvo.get(art.id) === ev.salvo && !cbShot.has(art.id + '|' + ev.slot))) continue;
        if (!cbFired.has(art.id)) cbSalvo.set(art.id, ev.salvo || null);
        cbFired.add(art.id); cbShot.add(art.id + '|' + ev.slot);
        const sup = supplyCheck(null, art, logistics(st, en, T), '|' + ev.slot);
        if (sup) { rep[en].own.push(`Contre-batterie de ${art.slot} : un tir ENI a été détecté en ${ev.slot}, mais ${sup}.`); J(`  Contre-batterie ${ADJF[en]} de ${art.slot} sur ${ev.slot} : pas de tir (${sup})`); continue; }
        const tgt = ev.unitId ? st.units.find(u => u.id === ev.unitId && !u.dead && u.slot === ev.slot) : null;
        const kk = `${T}|${en}|cb|${art.id}|${ev.slot}`; const who = `${CAMP[en]} · Contre-batterie de ${art.slot} sur ${ev.slot}`;
        let ok = false, d = null, hit = false, line = '';
        if (tgt) {
          const x = D(kk, who); d = x.d; ok = d * 10 + CB_RATE > 100;
          out.dice.push({ who, d, k: kk, nat: x.nat, forced: x.forced, camp: en, rule: `neutralise sur 3 à 0 (taux ${CB_RATE} %)` });
          hit = ok;
          if (ok && st.fort.includes(tgt.slot)) { const fk = kk + '|fort'; const y = D(fk, who + ' (fortification)'); out.dice.push({ who: who + ' (fortification)', d: y.d, k: fk, nat: y.nat, forced: y.forced, camp: en, rule: 'la fortification cède sur 6, 7, 8, 9 ou 0' }); hit = y.d >= 6; if (!hit) line = `${tgt.slot} fortifié : l'objectif tient bon`; }
        }
        const pre = tgt ? tgt.neut : null;
        if (hit) line = neutralize(tgt, en, null, 'Contre-batterie');
        const hits = hit ? [[tgt.slot, 'n']] : [];
        const zt = `${ev.slot}`;
        if (!tgt) {
          rep[en].own.push(`Contre-batterie : notre ART CA de ${art.slot} a tiré sur ${zt} — aucun objectif atteint.`);
          rep[ev.camp].enemy.push(ev.kind === 'Déception GE' ? `Déception GE réussie : l'ENI a tiré en contre-batterie sur ${zt}, où il n'y avait rien. Son ART CA est en ${art.slot}.` : `Tir de contre-batterie ENI sur ${zt}, sans effet. L'ART CA ENI qui a tiré est en ${art.slot}.`);
        } else {
          rep[en].own.push(`Contre-batterie : notre ART CA de ${art.slot} a tiré sur ${tgt.type} ENI de ${zt} → ${hit ? line : ok ? line : 'objectif manqué'}.`);
          rep[ev.camp].enemy.push(`Tir de contre-batterie ENI sur notre ${tgt.type} de ${zt} : ${hit ? `neutralisé jusqu'à la fin du tour ${tgt.neut}` : 'sans effet'}. L'ART CA ENI qui a tiré est en ${art.slot}.`);
        }
        J(`  Contre-batterie ${ADJF[en]} : ART CA de ${art.slot} sur ${zt}${tgt ? ` (${tgt.type} ${ADJ[ev.camp]})` : ' (rien)'}${d ? ' · dé ' + dTxt(d) : ''} → ${hit ? 'neutralisé' : tgt ? 'sans effet' : 'tir dans le vide'}`);
        RD(`Contre-batterie : l'ART CA ${ADJF[en]} de ${art.slot} tire sur ${zt}${hit ? ' — ' + line : ''}`);
        see(ev.camp, art.slot); see(en, ev.slot);
        out.act[en].push(['Contre-batterie', '', [ev.slot], hits, 0, art.slot]);
        out.hit[ev.camp].push(['Contre-batterie', ev.slot, hits, [], [], hit ? 1 : 0, art.slot]);
        cbEvents.push({ camp: en, slot: art.slot, unitId: art.id, kind: 'Contre-batterie' });
      }
    }
  };

  // ---------------- phases
  const bonus = { B: {}, R: {} }; FUS.forEach(f => { bonus.B[f] = { rap: 0, fm: 0, src: [] }; bonus.R[f] = { rap: 0, fm: 0, src: [] }; });
  for (const x of (st.logEff || []).filter(x => x.from < T && x.to >= T)) { const b = bonus[x.camp][x.fus]; b.raplog = (b.raplog || 0) + LOGEFF_RAP; b.src.push(`Effort LOG +${LOGEFF_RAP} RAPLOG (tour ${T - x.from + 1}/${LOGEFF_TURNS})`); }   // 11 nov. : Effort LOG dure 3 tours
  if (st.logEff) st.logEff = st.logEff.filter(x => x.to > T);
  const renfort = { B: [], R: [] }; const engage = []; const draw = { B: [], R: [] };
  for (const x of (st.bpFM || []).filter(x => x.t === T)) { FUS.forEach(f => { bonus[x.camp][f].fm -= BP_FM; bonus[x.camp][f].src.push(`Assaut de la BP −${BP_FM} FM`); });
    rep[x.camp].own.push(`Contrecoup de l'Assaut de la BP : nos ${NDIV} divisions perdent ${BP_FM} FM pendant ce tour.`); J(`  ${CAMP[x.camp]} : contrecoup de l'Assaut de la BP, −${BP_FM} FM à chaque division ce tour`); }
  if (st.bpFM) st.bpFM = st.bpFM.filter(x => x.t > T);
  for (const [ph, sub] of PH_STEPS) {
    const batch = due.filter(p => CARDS[p.card].ph === ph && (!sub || (sub === 1) === PRE_STRIKE.includes(p.card)));
    if (!batch.length) continue;
    J(`— Phase ${PH_NOM[ph]}${sub ? (sub === 1 ? ' (1er temps : frappes ciblées)' : ' (2e temps : autres frappes)') : ''}`);
    const snap = clone(st.units);
    const lo0 = { B: logistics(st, 'B', T, draw.B), R: logistics(st, 'R', T, draw.R) };
    const effects = [];
    const claim0 = new Set();   // emplacements 0 pris ce tour par Bascule de PC ou Mouvement de la DIV
    for (const p of batch) {
      const c = p.camp, en = EN[c], C = CARDS[p.card]; const R_ = rep[c]; const ownLine = []; const enLine = [];
      // impératifs à l'effet
      let imp = null;
      for (const gn of C.g) if (g0[c][gn] >= 4) imp = `jauge ${gn} au dernier cran`;
      let actor = null;   // ART CA, EW ou GAM qui agit
      if (!imp && p.card === 'Frappe en profondeur') {
        const art = snap.find(u => u.slot === p.target.from && u.camp === c && !u.dead);
        if (!art || art.type !== 'ART CA') imp = `pas d'ART CA ${ADJF[c]} en ${p.target.from}`;
        else if (!active(art, T)) imp = `l'ART CA de ${p.target.from} est neutralisée`;
        else if (draw[c].includes(art.id)) imp = `l'ART CA de ${p.target.from} a déjà tiré ce tour`;
        else { const fromFus = !!zoneOfSlot(art.slot).fus; const tz = zoneOfSlot(p.target.slot);
          if (!imp) { actor = st.units.find(u => u.id === art.id); imp = supplyCheck(p, actor, lo0[c]); } }
      }
      if (!imp && (p.card === 'Raid aéro' || p.card === 'Engagement GAM' || p.card === 'Out of contact Attack')) {
        const g = st.units.find(u => u.camp === c && u.type === 'GAM' && !u.dead);
        if (!g || !zoneOfSlot(g.slot)) imp = 'GAM absent du plateau'; else if (!active(g, T)) imp = 'GAM neutralisé';
        else { const cap = Math.max(0, 4 - g0[c].ALAT), n = draw[c].filter(id => id === g.id).length;   // 8 nov. : le GAM mène autant d'actions par tour que la jauge ALAT a de crans (4, 3, 2, 1, 0)
          if (n >= cap) imp = `le GAM a déjà mené ${n} action${n > 1 ? 's' : ''} ce tour, le maximum avec la jauge ALAT à ${cap} cran${cap > 1 ? 's' : ''}`;
          else { actor = g; imp = supplyCheck(p, g, lo0[c]); } }
      }
      if (!imp && C.nav) {   // 12 nov. : cartes navales : NAV sur le plateau, actif et ravitaillé (flux mineur, puis dé BSC)
        const nv = st.units.find(u => u.camp === c && u.type === 'NAV' && !u.dead);
        if (!nv) imp = 'NAV détruit'; else if (!zoneOfSlot(nv.slot)) imp = 'NAV en réserve'; else if (!active(nv, T)) imp = 'NAV neutralisé';
        else { actor = nv; imp = supplyCheck(p, nv, lo0[c]); }
      }
      if (!imp && p.card === 'Raid amphibie' && !st.units.some(u => u.camp === c && u.type === 'INF' && !u.dead && u.slot === 'Réserve' && active(u, T))) imp = "pas d'INF disponible en réserve pour le raid";
      if (!imp && C.ew) {
        // EW ami dans le fuseau visé (Ecoute, Brouillage) ou dans la zone de l'emplacement vide (Déception)
        const z = p.card === 'Déception GE' ? zoneOfSlot(p.target.slot) : { fus: p.target.fus, camp: c };
        const ews = st.units.filter(u => u.camp === c && u.type === 'EW' && active(u, T) && (z.region ? zoneOfSlot(u.slot)?.region === z.region : (zoneOfSlot(u.slot)?.fus === z.fus && zoneOfSlot(u.slot)?.camp === c)));
        const zt = z.region ? `la région ${z.region}` : `le fuseau ${DE_FUS[z.fus]}`;
        if (!ews.length) imp = `pas d'EW ${ADJ[c]} actif dans ${zt}`;
        else { actor = ews.find(u => lo0[c].supplied.includes(u.id)) || ews[0]; imp = supplyCheck(p, actor, lo0[c]); }
        if (!imp && p.card === 'Déception GE' && unitAt(st, p.target.slot)) imp = `${p.target.slot} n'est pas vide`;
      }
      if (!imp && p.card === 'Frappe en profondeur') draw[c].push(actor.id);
      if (!imp && (p.card === 'Raid aéro' || p.card === 'Engagement GAM' || p.card === 'Out of contact Attack')) draw[c].push(actor.id);
      if (!imp && p.card === 'Ordre à la B.LOG' && st.bscg[c] < 50) imp = `jauge BSC à ${st.bscg[c]} % (il faut 50 % ou plus)`;
      if (!imp && p.card === 'Engagement de la DIV') { if (st.divp[c] <= 0) imp = 'jauge DIV+ à 0'; }
      if (!imp && p.card === 'Contre-batterie') {
        const art = st.units.find(u => u.slot === p.target.from && u.camp === c && !u.dead);
        if (!art || art.type !== 'ART CA') imp = `pas d'ART CA ${ADJF[c]} en ${p.target.from}`;
        else if (!active(art, T)) imp = `l'ART CA de ${p.target.from} est neutralisée`;
        else { const fromFus = !!zoneOfSlot(art.slot).fus;
          actor = art; }
      }
      if (!imp && BIGMOVE[p.card]) {
        const pion = big(st, c, BIGMOVE[p.card]); const from = zoneOfSlot(pion.slot).region; const nm = { PC: 'le PC', BSC: 'la BSC', 'DIV+': 'la DIV+' }[pion.type];
        if (p.target.region === from) imp = `${nm} est déjà à ${from}`;
        else if (unitAt(st, p.target.region + ' 0') || claim0.has(c + '|' + p.target.region)) imp = `${p.target.region} 0 est occupé`;
        else claim0.add(c + '|' + p.target.region);
      }
      if (imp) {
        J(`  ${CAMP[c]} : ${p.card}${onTxt(p)} — non exécutée : ${imp}`);
        R_.own.push(`${p.card}${onTxt(p)} (jouée au tour ${p.played}) : non exécutée, ${imp}.`);
        continue;
      }
      if (p.card === 'Assaut de la BP') {   // au tour d'effet : les 3 INF doivent être en réserve ; sinon, l'ordre n'a pas lieu et la carte est rendue
        const inf = bpReserve(st, c);
        if (inf.length < BP_INF) { delete st.cards[c][p.card]; J(`  ${CAMP[c]} : ${p.card}${onTxt(p)} — non exécutée : ${inf.length} INF en réserve (il en faut ${BP_INF}) ; la carte est rendue`);
          R_.own.push(`${p.card}${onTxt(p)} (jouée au tour ${p.played}) : non exécutée, seulement ${inf.length} INF en réserve (il en faut ${BP_INF}). La carte nous est rendue.`); continue; }
        inf.slice(0, BP_INF).forEach(u => { u.dead = true; }); st.bpFM = (st.bpFM || []).concat([{ camp: c, t: T + BP_DELAY }]);
        J(`    ${BP_INF} INF ${ADJ[c]}s de la réserve engagés et détruits ; −${BP_FM} FM à chaque division ${ADJF[c]} au tour ${T + BP_DELAY}`); RD(`Retirer définitivement ${BP_INF} INF ${ADJ[c]}s de la réserve (Assaut de la BP)`);
        R_.own.push(`Assaut de la BP : ${BP_INF} INF de notre réserve ont été engagés et sont détruits ; nos ${NDIV} divisions perdront ${BP_FM} FM au tour ${T + BP_DELAY}.`);
      }
      // taux
      let dg = dangersOf(p, snap); let rate = C.base - 30 * dg.n - wear(c, p.card);
      if (BIGMOVE[p.card]) {
        const pion = big(st, c, BIGMOVE[p.card]); const from = zoneOfSlot(pion.slot).region;
        const mpIn = r => snap.some(u => u.camp === c && u.type === 'MP' && active(u, T) && zoneOfSlot(u.slot)?.region === r);
        const l = []; if (p.card === 'Mouvement de la DIV') { if (!mpIn(from)) l.push('pas de MP au départ'); if (!mpIn(p.target.region)) l.push("pas de MP à l'arrivée"); }
        else if (!mpIn(from) && !mpIn(p.target.region)) l.push("aucun MP au départ ni à l'arrivée");   // Bascule de PC et Bascule BSC (7 nov.) : un seul danger
        dg = { n: l.length, list: l }; rate = C.base - 30 * l.length;
      }
      if (p.card === 'Transfert à la justice') {
        const g = snap.filter(u => u.camp === c && !u.dead && u.slot === 'Garde POW');
        const inf = 1 + g.filter(u => u.type === 'INF').length, mp = g.filter(u => u.type === 'MP').length;
        dg = mp < inf ? { n: 1, list: [`${mp} MP pour ${inf} INF à la garde`] } : { n: 0, list: [] }; rate = C.base - 30 * dg.n;
      }
      if (p.card === 'Engagement de la DIV') {
        const from = zoneOfSlot(big(st, c, 'DIV+').slot).region; const k = distance(c, from, ACCESS_ALL[c][p.target.fus]);
        dg = { n: k, list: k ? [`${k} région${k > 1 ? 's' : ''} à traverser`] : [] }; rate = 100 - 30 * k;
      }
      const r = roll(p, rate);
      const w = wear(c, p.card);
      J(`  ${CAMP[c]} : ${head(p, rate, r)}  [base ${C.base}${dg.n ? ', dangers ' + dg.list.join('/') : ''}${w ? ', usure −' + w : ''}]`);
      ownLine.push(`${p.card}${onTxt(p)} (jouée au tour ${p.played})`);
      const rp = [];
      if (!r.ok && !['Bascule de PC', 'Bascule BSC', 'Mouvement de la DIV', 'Transfert à la justice', 'Engagement de la DIV'].includes(p.card)) risk(p, rp);   // Assaut de la BP : l'échec coûte aussi un cran AAE (cartes du 7 nov. midi)
      if (!r.ok && p.card === 'Raid amphibie') { const inf = st.units.find(u => u.camp === c && u.type === 'INF' && !u.dead && u.slot === 'Réserve' && active(u, T));
        if (inf) { inf.dead = true; rp.push("l'INF engagée dans le raid est détruite"); RD(`Retirer définitivement 1 INF ${ADJ[c]} de la réserve (Raid amphibie manqué)`); } }
      if (!r.ok && p.card === 'Assaut de la BP') { FUS.forEach(f => { bonus[c][f].fm -= BP_FM; bonus[c][f].src.push(`Assaut de la BP (échec) −${BP_FM} FM`); }); rp.push(`échec de l'assaut : nos ${NDIV} divisions perdent ${BP_FM} FM pendant ce tour`); }
      effects.push({ p, r, rate, ownLine, enLine, rp, actor });
    }
    // application des effets (simultanés dans la phase)
    if (ph === 'M') { applyMoves(st, effects, T, J, RD, rep);
      for (const [id, m] of Object.entries(st.cb)) { const u = st.units.find(x => x.id === +id); if (!u || u.dead) delete st.cb[id]; else if (u.slot !== m.from) endCB(u, 'déplacée'); } }
    for (const ef of effects) {
      const { p, r } = ef; const c = p.camp, en = EN[c]; const R_ = rep[c];
      const eff = []; const enEff = []; const notes = []; const seen0 = rep[c].seen.length;
      const pre = new Map(st.units.filter(u => u.camp === en).map(u => [u.id, u.neut + '|' + u.dead + '|' + (u.hit || 0)])); const preReg = { ...st.neutReg }, preCut = { ...st.cut };
      if (ph === 'R') { if (r.ok) { const z = p.target.region ? { region: p.target.region } : { fus: p.target.fus }; const txt = intelOn(c, z); rep[c].intel.push(`${p.card} — ${txt}`); eff.push('renseignement obtenu (voir plus bas)'); } }
      if (ph === 'F' && r.ok) {
        const t = p.target;
        if (p.card === 'SEAD') {
          const z = t.region ? { region: t.region } : { fus: t.fus };
          const dsa = unitsInZone(st, en, z, T, false).filter(u => u.type === 'DSA');
          if (!dsa.length) { eff.push('aucun DSA dans la zone'); ef.status = 'pas de cibles identifiées'; }
          for (const u of dsa) {
            if (st.fort.includes(u.slot)) { const fr = fortRoll(p, u); if (!fr.hit) { eff.push(`DSA de ${u.slot} fortifié : nos missiles n'ont pas pu détruire les capacités ENI`); continue; } eff.push(`DSA de ${u.slot} fortifié : action a cependant réussi`); }
            u.dead = true; seeDead(c, u); eff.push(`DSA ENI de ${u.slot} détruit`); enEff.push(deadTxt(u)); RD(`Retirer définitivement le DSA ${ADJ[en]} de ${u.slot} (détruit)`);
          }
        }
        if (p.card === 'Frappe drone' || p.card === 'Frappe en profondeur' || p.card === 'Sabotage' || p.card === 'Raid aéro' || p.card === 'Out of contact Attack' || p.card === 'Commando marine' || p.card === 'Bombardement naval') {
          const u = unitAt(st, t.slot);
          if (!u || u.camp !== en) {
            const pw = big(st, en, 'POW'); const z = zoneOfSlot(t.slot);
            if ((p.card === 'Frappe drone' || p.card === 'Frappe en profondeur' || p.card === 'Bombardement naval') && z.region && zoneOfSlot(pw.slot).region === z.region) {
              eff.push(`emplacement vide, mais le camp de prisonniers ennemi est dans la région : le tir tombe sur le POW`);
              let hit = true; if (st.fort.includes(pw.slot)) { const fr = fortRoll(p, pw); hit = fr.hit; eff.push(`POW fortifié : ${hit ? 'action a cependant réussi' : 'l\'action n\'a pas obtenu les effets escomptés'}`); }
              if (hit) { eff.push(neutralize(pw, c, notes, p.card)); enEff.push(`Le camp de prisonniers (${pw.slot}) a été frappé et neutralisé jusqu'à la fin du tour ${pw.neut}.`); }
            } else eff.push('emplacement vide : aucun effet');
          } else if ((p.card === 'Raid aéro' || p.card === 'Commando marine') && BIG.includes(u.type)) eff.push(`${u.type} : un grand pion, ${p.card === 'Raid aéro' ? 'le raid' : 'le commando'} n'a aucun effet`);
          else {
            let hit = true, half = false;
            if (FORT_CARDS.includes(p.card) && st.fort.includes(u.slot)) {
              if (GAUGED.includes(u.type)) { half = true; eff.push(`${u.slot} fortifié : la perte de jauge est divisée par 2`); }
              else { const fr = fortRoll(p, u); hit = fr.hit; eff.push(`${u.slot} fortifié : ${hit ? 'action a cependant réussi' : 'l\'action n\'a pas obtenu les effets escomptés'}`); } }
            if (hit) {
              if (p.card === 'Raid aéro' || p.card === 'Commando marine') { u.dead = true; eff.push(`${u.type} ENI de ${u.slot} détruit`); enEff.push(deadTxt(u)); RD(`Retirer définitivement ${desc(u)} (détruit)`); }
              else if (p.card === 'Out of contact Attack' && GAUGED.includes(u.type)) { eff.push(neutralize(u, c, notes, 'Bombardement', half)); enEff.push(neutTxt(u)); }   // grand pion : les dégâts d'un bombardement
              else { eff.push(neutralize(u, c, notes, p.card === 'Out of contact Attack' ? 'Bombardement' : p.card, half)); enEff.push(neutTxt(u)); }
            }
          }
          if (u && u.dead) seeDead(c, u); else see(c, t.slot);
          if (p.card === 'Frappe en profondeur') { rep[en].enemy.push(`L'ART CA ENI qui a tiré est en ${t.from}.`); see(en, t.from); }
        }
        if (p.card === 'Bombardement' || p.card === 'Maquis de partisans' || p.card === 'Intox L2I') {
          st.neutReg[en + '|' + t.region] = T + 4; RD(`Poser un marqueur de neutralisation sur la région ${t.region} (flux coupés) — retrait à la fin du tour ${T + 4}`);
          eff.push(`région ${t.region} neutralisée, avec tous ses flux LOG, jusqu'à la fin du tour ${T + 4}`);
          enEff.push(`La région ${t.region} est neutralisée jusqu'à la fin du tour ${T + 4} : ses flux LOG sont coupés.`);
          for (const u of unitsInZone(st, en, { region: t.region }, T, false)) {
            if (u.type === 'POW' && p.card !== 'Bombardement') continue;
            let hit = true, half = false; if (p.card === 'Bombardement' && st.fort.includes(u.slot)) {
              if (GAUGED.includes(u.type)) { half = true; eff.push(`${u.slot} fortifié : la perte de jauge est divisée par 2`); }
              else { const fr = fortRoll(p, u); hit = fr.hit; eff.push(`${u.slot} fortifié : ${hit ? 'action a cependant réussi' : 'l\'action n\'a pas obtenu les effets escomptés'}`); } }
            if (hit) { eff.push(neutralize(u, c, notes, p.card, half)); enEff.push(neutTxt(u)); see(c, u.slot); }
          }
        }
        if (p.card === 'Assaut de la BP') {   // région neutralisée ; pions réduits détruits ; grand pion −50 ; aucun bonus de fortification
          st.neutReg[en + '|' + t.region] = T + 4; RD(`Poser un marqueur de neutralisation sur la région ${t.region} (flux coupés) — retrait à la fin du tour ${T + 4}`);
          eff.push(`région ${t.region} neutralisée, avec tous ses flux LOG, jusqu'à la fin du tour ${T + 4}`);
          enEff.push(`La région ${t.region} est neutralisée jusqu'à la fin du tour ${T + 4} : ses flux LOG sont coupés.`);
          let n = 0;
          for (const u of unitsInZone(st, en, { region: t.region }, T, false)) {
            if (GAUGED.includes(u.type) || u.type === 'POW') { eff.push(neutralize(u, c, notes, p.card)); enEff.push(neutTxt(u)); see(c, u.slot); n++; continue; }
            u.dead = true; seeDead(c, u); eff.push(`${u.type} ENI de ${u.slot} détruit`); enEff.push(deadTxt(u)); RD(`Retirer définitivement ${desc(u)} (détruit par l'Assaut de la BP)`); n++;
          }
          if (!n) eff.push('aucun pion ENI dans la région');
        }
        if (p.card === 'Raid amphibie') {
          st.neutReg[en + '|' + t.region] = T + 4; RD(`Poser un marqueur de neutralisation sur la région ${t.region} (flux coupés) — retrait à la fin du tour ${T + 4}`);
          eff.push(`région ${t.region} neutralisée, avec tous ses flux LOG, jusqu'à la fin du tour ${T + 4}`);
          enEff.push(`Raid amphibie ENI : la région ${t.region} est neutralisée jusqu'à la fin du tour ${T + 4}, ses flux LOG sont coupés.`);
          for (const u of unitsInZone(st, en, { region: t.region }, T, false)) { eff.push(neutralize(u, c, notes, p.card)); enEff.push(neutTxt(u)); see(c, u.slot); }
          const inf = st.units.find(u => u.camp === c && u.type === 'INF' && !u.dead && u.slot === 'Réserve' && active(u, T));
          if (inf) { inf.neut = T + 4; inf.neutFrom = T; eff.push(`l'INF engagée revient en réserve, neutralisée jusqu'à la fin du tour ${T + 4}`); RD(`INF ${ADJ[c]} de la réserve (Raid amphibie) : neutralisée jusqu'à la fin du tour ${T + 4}`); }
        }
        if (p.card === 'Embuscade') { st.cut[t.cor] = T + 4; eff.push(`corridor ${t.cor} coupé jusqu'à la fin du tour ${T + 4}`); enEff.push(`Le corridor ${t.cor} est coupé jusqu'à la fin du tour ${T + 4}.`); RD(`Poser un marqueur de neutralisation sur le corridor ${t.cor} — retrait à la fin du tour ${T + 4}`); }
      }
      if (p.card === 'Frappe en profondeur' && ef.actor) {
        if (!r.ok) { rep[en].enemy.push(`L'ART CA ENI qui a tiré est en ${p.target.from}.`); see(en, p.target.from); }
        endCB(ef.actor, 'mission de frappe en profondeur');
        cbEvents.push({ camp: c, slot: ef.actor.slot, unitId: ef.actor.id, kind: 'Frappe en profondeur', salvo: `${c}|FeP|${p.played}` });
      }
      if (p.card === 'Déception GE' && ef.actor) {
        if (r.ok) { eff.push(`un faux tir d'ART CA est simulé depuis ${p.target.slot}`); cbEvents.push({ camp: c, slot: p.target.slot, unitId: null, kind: 'Déception GE', ew: ef.actor.slot }); }
        else { rep[en].enemy.push(`Un EW ENI a été repéré en ${ef.actor.slot}.`); see(en, ef.actor.slot); }
      }
      if (p.card === 'Ecoute GE' && ef.actor && !r.ok) { rep[en].enemy.push(`Un EW ENI a été repéré en ${ef.actor.slot}.`); see(en, ef.actor.slot); }
      if (p.card === 'Brouillage GE' && ef.actor) {
        rep[en].enemy.push(`Un EW ENI s'est révélé en brouillant : il est en ${ef.actor.slot}.`); see(en, ef.actor.slot);
        cbEvents.push({ camp: c, slot: ef.actor.slot, unitId: ef.actor.id, kind: 'Brouillage GE' });
      }
      if (p.card === 'Contre-batterie' && r.ok && ef.actor) {
        const u = st.units.find(x => x.id === ef.actor.id);
        if (u.slot !== p.target.from || !active(u, T)) { ef.status = 'ordre non exécuté'; eff.push(`l'ART CA n'est plus en ${p.target.from}`); }
        else { if (st.cb[u.id]) endCB(u, 'nouvelle mission'); st.cb[u.id] = { camp: c, zone: p.target.fus ? { fus: p.target.fus } : { region: p.target.region }, from: u.slot, since: T };
          eff.push(`l'ART CA de ${u.slot} surveille ${p.target.fus ? 'le fuseau ' + DE_FUS[p.target.fus] : p.target.region} jusqu'à nouvel ordre`); RD(`Contre-batterie ${ADJF[c]} : ART CA de ${u.slot} → ${p.target.fus || p.target.region}`); }
      }
      if (ph === 'L' && r.ok && p.card === 'Ordre à la B.LOG') {
        const o = orientNetwork(st, c, p.target.net);
        if (!o.ok) { ef.status = 'ordre non exécuté'; eff.push(`réseau invalide (${o.errors.join(' ; ')}) : l'ancien réseau reste en place, carte jouée pour rien`); }
        else { st.net[c] = p.target.net; st.netDir[c] = o.dir; st.netCons[c] = o.cons; eff.push(`nouveau réseau en place (${o.total} marqueurs)`); RD(`Réseau LOG ${ADJ[c]} : ${Object.entries(p.target.net).map(([k, v]) => k + ' ' + v).join(' · ')}`); }
      }
      if (ph === 'L' && r.ok && p.card === 'Effort LOG') {
        if (p.target.divp) { const b = st.divp[c]; st.divp[c] = Math.min(100, b + LOGEFF_DIV); eff.push(`la DIV+ gagne ${st.divp[c] - b} points (${st.divp[c]})`); RD(`Jauge DIV+ ${ADJF[c]} : ${st.divp[c]} (Effort LOG)`); }
        else if (p.target.fus) { const f = p.target.fus; bonus[c][f].raplog = (bonus[c][f].raplog || 0) + LOGEFF_RAP; bonus[c][f].src.push(`Effort LOG +${LOGEFF_RAP} RAPLOG (tour 1/${LOGEFF_TURNS})`);
          st.logEff = (st.logEff || []).concat([{ camp: c, fus: f, from: T, to: T + LOGEFF_TURNS - 1 }]);
          eff.push(`+${LOGEFF_RAP} RAPLOG à la division ${DE_FUS[f]} pendant ${LOGEFF_TURNS} tours (jusqu'au tour ${T + LOGEFF_TURNS - 1})`); RD(`Effort LOG ${ADJ[c]} : +${LOGEFF_RAP} RAPLOG au fuseau ${f} jusqu'à la fin du tour ${T + LOGEFF_TURNS - 1}`); }
        else { ef.status = 'ordre non exécuté'; eff.push('cible invalide (Effort LOG vise un fuseau ou la DIV+) : carte jouée pour rien'); }
      }
      if (ph === 'L' && r.ok && p.card === 'REMEC') {   // 11 nov.
        if (p.target.alat) { const g = st.units.find(u => u.camp === c && u.type === 'GAM');
          if (!g || g.dead) { ef.status = 'ordre non exécuté'; eff.push('GAM détruit : la jauge ALAT ne peut plus remonter, carte jouée pour rien'); }
          else { const b = st.gauges[c].ALAT; st.gauges[c].ALAT = Math.max(0, b - REMEC_ALAT); eff.push(b === st.gauges[c].ALAT ? `jauge ALAT déjà au plus haut (${gaugeTxt('ALAT', b)})` : `jauge ALAT ${gaugeTxt('ALAT', b)} → ${gaugeTxt('ALAT', st.gauges[c].ALAT)}`); RD(`Jauge ALAT ${ADJF[c]} : ${gaugeTxt('ALAT', st.gauges[c].ALAT)} (REMEC)`); } }
        else if (p.target.pcg || p.target.bscg) { const k = p.target.pcg ? 'pcg' : 'bscg', nm = p.target.pcg ? 'PC' : 'BSC'; const b = st[k][c]; st[k][c] = Math.min(100, b + 30); eff.push(`jauge ${nm} ${b} % → ${st[k][c]} %`); RD(`Jauge ${nm} ${ADJF[c]} : ${st[k][c]} % (REMEC)`); }
        else { ef.status = 'ordre non exécuté'; eff.push('cible invalide (REMEC vise le GAM, le PC ou la BSC) : carte jouée pour rien'); }
      }
      if (ph === 'L' && r.ok && p.card === "Ouverture d'itinéraire") {
        const tgO = p.target || {};
        const gens = st.units.filter(u => u.camp === c && u.type === 'GEN' && active(u, T) && (tgO.slot ? u.slot === tgO.slot : zoneOfSlot(u.slot)?.region === tgO.region));
        const regs = gens.length ? [zoneOfSlot(gens[0].slot).region] : [];
        const open = Object.keys(st.cut).filter(k => COR[c][k] && (st.cut[k] ?? -1) >= T && COR[c][k].some(r => regs.includes(r)));
        open.forEach(k => { delete st.cut[k]; RD(`Retirer le marqueur de neutralisation du corridor ${k} (rouvert par le GEN)`); });
        if (!regs.length) { ef.status = 'ordre non exécuté'; eff.push(`aucun GEN actif ${tgO.slot ? 'en ' + tgO.slot : 'dans la région ' + tgO.region} : carte jouée pour rien`); }
        else eff.push(open.length ? `corridor${open.length > 1 ? 's' : ''} ${open.join(', ')} rouvert${open.length > 1 ? 's' : ''} par le GEN de ${gens[0].slot}` : `aucun corridor coupé autour du GEN de ${gens[0].slot} (${regs[0]})`);
        if (open.length) ef.moved = open.map(k => COR[c][k].find(r => r && !r.startsWith('F:')) + ' 0');
      }
      if (ph === 'C') {
        const f = p.target.fus;
        if (r.ok && ['CAS', 'Engagement GAM', 'Brouillage GE', 'Appui naval'].includes(p.card)) { const v = 3; bonus[c][f].rap += v; bonus[c][f].src.push(`${p.card} +${v}`); eff.push(`+${v} RAPFOR à la division ${DE_FUS[f]} pour ce tour`); }
        if (p.card === 'Effort COM') { bonus[c][f].fm += 1; bonus[c][f].src.push('Effort COM +1 FM'); eff.push(`+1 FM à la division ${DE_FUS[f]} pour ce tour`); }
        if (p.card === 'Renfort de feu') {
          for (const s of p.target.arts) {
            const u = unitAt(st, s); const ps = parseSlot(s);
            if (!u || u.type !== 'ART DIV' || u.camp !== c) { eff.push(`${s} : pas d'ART DIV ${ADJF[c]}`); continue; }
            if (!active(u, T)) { eff.push(`${s} : ART DIV neutralisée`); continue; }
            const i = FUS.indexOf(ps.fus), j = FUS.indexOf(f);
            if (j === i) { if (st.artDir[u.id]) { delete st.artDir[u.id]; eff.push(`l'ART DIV de ${s} tire de nouveau vers son fuseau, ${f}`); enEff.push(`L'ART DIV ENI de ${s} tire de nouveau droit devant.`); RD(`ART DIV ${ADJF[c]} de ${s} : de nouveau orientée vers ${f}`); } else eff.push(`l'ART DIV de ${s} tire déjà vers ${f}`); continue; }
            if (Math.abs(j - i) !== 1) { eff.push(`${s} ne peut tirer que vers son fuseau ou un fuseau voisin`); continue; }
            st.artDir[u.id] = f; renfort[c].push({ id: u.id, to: f }); eff.push(`l'ART DIV de ${s} tire désormais vers ${f}, jusqu'à un nouveau Renfort de feu`); enEff.push(`L'ART DIV ENI de ${s} tire désormais vers ${f}.`); RD(`ART DIV ${ADJF[c]} de ${s} : orientée vers ${f} jusqu'à nouvel ordre`);
          }
        }
        if (p.card === 'Engagement de la DIV') { engage.push({ p, ok: r.ok, d: r.d, rate: ef.rate }); const nz = !active(big(st, c, 'DIV+'), T) ? 'neutralisée, ' : ''; eff.push(r.ok ? `la DIV+ ${nz}s'engage avec tout son potentiel restant (${st.divp[c]}) pendant le combat de ce tour` : `la DIV+ ${nz}ne s'engagera qu'à 50 % de son potentiel pendant le combat de ce tour`); }
      }
      const hits = st.units.filter(u => u.camp === en && pre.has(u.id) && pre.get(u.id) !== u.neut + '|' + u.dead + '|' + (u.hit || 0)).map(u => [u.slot, u.dead ? 'd' : 'n']);
      const zr = Object.keys(st.neutReg).filter(k => k.startsWith(en + '|') && st.neutReg[k] !== preReg[k]).map(k => k.slice(2));
      const zc = Object.keys(st.cut).filter(k => st.cut[k] !== preCut[k] && COR[en][k]);
      const held = r.ok && fortHeld.has(key(p)) && !hits.length && !zr.length;   // tout a été arrêté par la fortification
      if (held && !ef.status) ef.status = 'sans effet (fortification)';
      if (held) out.act[c].push([p.card, '', [p.target.slot].filter(Boolean), [], 1, ...(p.card === 'Frappe en profondeur' && p.target.from ? [p.target.from] : [])]);   // 7 nov. : l'ART CA qui tire, pour l'animation de l'obus
      if (r.ok && !ef.status) {
        const t = p.target; const sl = rep[c].seen.slice(seen0).map(x => x[0]);
        if (t.slot) sl.push(t.slot); if (ef.moved) sl.push(...ef.moved); if (t.works && ph === 'M') t.works.forEach(w => sl.push(normSlot(w.slot) || w.slot));
        if (BIGMOVE[p.card]) sl.push(t.region + ' 0');
        out.act[c].push([p.card, t.region || t.fus || t.cor || '', [...new Set(sl)], hits, ...(p.card === 'Frappe en profondeur' && t.from ? [0, t.from] : [])]);
      }
      // ce que l'ENI voit chez lui : effets subis, et action révélée (réussie ou non)
      if (hits.length || zr.length || zc.length || revealed(p, r.ok)) out.hit[en].push([revealed(p, r.ok) ? p.card : '', revealed(p, r.ok) ? (p.target.slot || p.target.region || p.target.fus || p.target.cor || '') : '', hits, zr, zc, r.ok && !held ? 1 : 0, ...(p.card === 'Frappe en profondeur' && p.target.from ? [p.target.from] : [])]);
      if (ef.rp.length) eff.push(ef.rp.join(' ; '));
      const effTxt = eff.length ? ' : ' + eff.join(' ; ') : '';
      R_.own.push(`${ef.ownLine[0]} → ${statusOf(ef)}${effTxt}.`);
      notes.forEach(n => R_.own.push(n));
      if (eff.length) eff.forEach(x => J('    ' + x));
      if (revealed(p, r.ok)) {
        if (!r.ok) rep[en].enemy.push(`L'ENI a tenté ${p.card}${onTxt(p)} — son action a échoué.`);
        else if (p.card === 'SEAD') rep[en].enemy.push(`Attaque SEAD ENI sur ${tgtTxt(p)}.` + (enEff.length ? ' ' + enEff.join(' ') : ''));
        else rep[en].enemy.push(`Action de l'ennemi dans notre AOR : ${p.card}${onTxt(p)}.` + (enEff.length ? ' ' + enEff.join(' ') : ''));
      } else if (enEff.length) { const t = enEff.join(' '); rep[en].enemy.push('Suite à action non identifiée de l\'ENI, ' + t.charAt(0).toLowerCase() + t.slice(1)); }
    }
    runCB();
  }

  // jauges au moment du compte rendu (avant le combat)
  for (const c of ['B', 'R']) {
    const guards = 1 + unitsOf(st, c).filter(u => u.slot === 'Garde POW').length;
    rep[c].gauges = [`AAE : ${gaugeTxt('AAE', st.gauges[c].AAE)}`, `FS : ${gaugeTxt('FS', st.gauges[c].FS)}`, `ALAT : ${gaugeTxt('ALAT', st.gauges[c].ALAT)}`, ...(NAVAL ? [`NAV : ${gaugeTxt('NAV', st.gauges[c].NAV || 0)}`] : []), `DIV+ : ${st.divp[c]}`, `PC : ${st.pcg[c]} %`, `BSC : ${st.bscg[c]} %`, `POW : ${st.pow[c]} (${guards} garde${guards > 1 ? 's' : ''})`];
  }
  // ---------------- combat
  J('— Combat dans les fuseaux');
  const lo = { B: logistics(st, 'B', T, draw.B), R: logistics(st, 'R', T, draw.R) };
  for (const c of ['B', 'R']) J(`  Logistique ${PL[c]} : flux ${FUS.map(f => f + ' ' + lo[c].raw[f]).join(', ')} · BSC ${lo[c].bscIn}/${BSC_NEED} flux${lo[c].bscOk ? '' : ' (flux mineurs coupés)'} · DIV+ ${lo[c].div} flux`);
  const res = {};
  const cur0 = clone(st.cursor);
  for (const f of FUS) {
    const sc = { B: divisionScore(st, 'B', f, T, lo.B, bonus.B[f], renfort), R: divisionScore(st, 'R', f, T, lo.R, bonus.R[f], renfort) };
    const adv = { B: 0, R: 0 }; const crit = [];
    for (const [k, nm] of [['rapT', 'RAPFOR'], ['raplog', 'RAPLOG'], ['fm', 'FM']]) {
      const w = sc.B[k] > sc.R[k] ? 'B' : sc.R[k] > sc.B[k] ? 'R' : null; if (w) adv[w]++; crit.push({ nm, B: sc.B[k], R: sc.R[k], w });
    }
    // le vainqueur est la division au plus gros total RAPFOR + RAPLOG + FM ; le curseur avance d'autant de cases qu'elle a d'avantages
    const tot = { B: r1(sc.B.rap + sc.B.raplog + sc.B.fm), R: r1(sc.R.rap + sc.R.raplog + sc.R.fm) };
    const win = tot.B > tot.R ? 'B' : tot.R > tot.B ? 'R' : null;
    const diff = win ? (win === 'B' ? 1 : -1) * adv[win] : 0;
    st.cursor[f] += diff;
    for (const c of ['B', 'R']) st.fm[c][f] = 0;
    let marker = null;
    if (win && Math.abs(diff) >= 2) {
      if (st.fmBlock[win] < T) { st.fm[win][f] = 1; marker = win; }
      st.pow[win] = Math.min(40, st.pow[win] + 1);
    }
    res[f] = { sc, adv, diff, win, marker, crit, tot };
    J(`  ${f} : RAPFOR ${fmt1(sc.B.rap)}/${fmt1(sc.R.rap)} · RAPLOG ${sc.B.raplog}/${sc.R.raplog} · FM ${fmt1(sc.B.fm)}/${fmt1(sc.R.fm)} · total ${fmt1(tot.B)}/${fmt1(tot.R)} → ${win ? PL[win] + ' ' + Math.abs(diff) : 'égalité'} · curseur ${sgnTxt(cur0[f])} → ${sgnTxt(st.cursor[f])}${marker ? ' · marqueur FM ' + ADJ[marker] : ''}${win && Math.abs(diff) >= 2 ? ' · POW ' + ADJF[win] + ' ' + st.pow[win] : ''}`);
    RD(`Curseur ${f} : ${sgnTxt(cur0[f])} → ${sgnTxt(st.cursor[f])} (${diff ? `${diff > 0 ? 'bleus' : 'rouges'} ${diff > 0 ? '+' : '−'}${Math.abs(diff)} ce tour` : 'inchangé'})`);
    RD(`Marqueur FM ${f} : ${marker ? 'côté ' + ADJ[marker] : win && Math.abs(diff) >= 2 ? `aucun (marqueurs ${ADJ[win]}s bloqués)` : win ? `aucun (victoire ${ADJF[win]} d'un seul avantage)` : 'aucun (égalité)'}`);
    if (win && Math.abs(diff) >= 2) RD(`Jauge POW ${ADJF[win]} : ${st.pow[win]}`);
  }
  out.combat = res;
  // engagements DIV+
  const engRes = [];
  for (const e of engage) {
    const c = e.p.camp, f = e.p.target.fus; const pot = st.divp[c]; const used = e.ok ? pot : Math.floor(pot / 2); const cases = Math.floor(used / 3);
    const before = st.cursor[f]; st.cursor[f] += (c === 'B' ? 1 : -1) * cases; st.divp[c] = 0;
    J(`  Engagement DIV+ ${ADJF[c]} à ${f} : potentiel ${pot}${e.ok ? '' : ' engagé à 50 % (' + used + ')'} → ${cases} cases · curseur ${sgnTxt(before)} → ${sgnTxt(st.cursor[f])}`);
    RD(`Curseur ${f} après engagement de la DIV+ ${ADJF[c]} : ${sgnTxt(st.cursor[f])} · jauge DIV+ ${ADJF[c]} à 0`);
    engRes.push({ c, f, cases, ok: e.ok, pot, used });
    st.carry[c].push(`DIV+ engagée à ${f} : ${e.ok ? 'engagement réussi' : 'engagement difficile, la DIV+ n\'a donné que la moitié de son potentiel'}. Elle a fait reculer l'ennemi et doit être reconstituée.`);
  }
  // percées
  const perc = [];
  for (const f of FUS) if (Math.abs(st.cursor[f]) >= BREAK) {
    const w = st.cursor[f] > 0 ? 'B' : 'R'; const l = EN[w]; const s = res[f].sc[w];
    // DIV+ du camp qui perce : non engagée, elle ne compte que pour la moitié de son potentiel, puis −5 par corridor jusqu'au fuseau ; si elle s'est engagée ce tour, sa jauge est déjà à 0
    const wdv = big(st, w, 'DIV+'); const kw = distance(w, zoneOfSlot(wdv.slot).region, ACCESS_ALL[w][f]) + 1;
    const wpot = Math.max(0, Math.floor(st.divp[w] / 2) - 5 * kw);
    const off = r1(s.rap + s.raplog + s.fm + wpot);
    const ldv = big(st, l, 'DIV+'); const k = openDistance(st, l, zoneOfSlot(ldv.slot).region, f, T);   // la DIV+ qui défend contourne les corridors coupés
    const def = k === null ? null : st.divp[l] - 5 * k;
    perc.push({ f, w, off, def, k, kw, wp: st.divp[w], eng: engRes.some(e => e.c === w), total: def === null || off > def, depth: Math.abs(st.cursor[f]) });
  }
  if (perc.length) {
    // 8 nov. : deux percées au même tour → gagne celle dont le curseur est allé le plus loin, puis la plus grande force offensive
    perc.sort((a, b) => b.depth - a.depth || b.off - a.off);
    let fin;
    if (perc.length > 1 && perc[0].depth === perc[1].depth && perc[0].off === perc[1].off && perc[0].w !== perc[1].w) fin = { kind: 'nul', txt: 'Deux percées de même profondeur et de même force au même tour : partie nulle.' };
    else { const p = perc[0]; fin = { kind: p.total ? 'totale' : 'décisive', w: p.w, f: p.f, txt: `Percée ${ADJF[p.w]} dans le fuseau ${DE_FUS[p.f]}. Force offensive ${fmt1(p.off)} (${p.eng ? `DIV+ ${ADJF[p.w]} engagée ce tour : déjà à 0` : `DIV+ ${ADJF[p.w]} non engagée : moitié de ${p.wp}, à ${p.kw} corridor${p.kw > 1 ? 's' : ''}`}) contre ${p.def === null ? `aucune force défensive (DIV+ ${ADJF[EN[p.w]]} coupée du fuseau par les corridors neutralisés)` : `force défensive ${p.def} (DIV+ ${ADJF[EN[p.w]]} à ${p.k} corridor${p.k > 1 ? 's' : ''}, corridors coupés contournés)`} : victoire ${p.total ? 'totale' : 'décisive'} des ${PL[p.w]}.` }; const q = perc.find(x => x.w !== p.w); if (q) fin.txt = `Deux percées au même tour : percée ${ADJF[p.w]} dans le fuseau ${DE_FUS[p.f]} (curseur à ${p.depth} cases) et percée ${ADJF[q.w]} dans le fuseau ${DE_FUS[q.f]} (curseur à ${q.depth} cases)${p.depth === q.depth ? ', à même profondeur : la plus grande force offensive l\'emporte' : ' : la plus profonde l\'emporte'}. ` + fin.txt; }
    st.ended = fin; J('  ' + fin.txt); RD(fin.txt);
  }
  // messages de division (envoyés au prochain compte rendu)
  for (const f of FUS) {
    for (const c of ['B', 'R']) {
      const s = c === 'B' ? 1 : -1; const v0 = cur0[f] * s; const v1 = st.cursor[f] * s; const rr = res[f];
      // un seuil franchi remplace le message habituel du fuseau
      const x = divCross(v0, v1);
      if (x) st.carry[c].push(`Division ${DE_FUS[f]} : « ${x.txt} »`);
      else if (rr.win === c) st.carry[c].push(`Division ${DE_FUS[f]} : combats victorieux. Pouvons exploiter nos succès si nous gardons l'appui du corps.`);
      else if (rr.win === EN[c]) st.carry[c].push(`Division ${DE_FUS[f]} : combats difficiles. Demandons un effort feu et logistique pour reprendre l'initiative.`);
      else st.carry[c].push(`Division ${DE_FUS[f]} : combats indécis, le front n'a pas bougé.`);
    }
  }
  if (st.ended) for (const c of ['B', 'R']) st.carry[c].push(finTxt(st.ended, c));
  // jauges de fonctionnement : BSC, PC et DIV+ (point gratuit selon la BSC, flux majeurs pour la DIV+)
  for (const c of ['B', 'R']) {
    const g = st.bscg[c]; const txt = [];
    const b0 = st.bscg[c]; if (lo[c].bscOk) st.bscg[c] = Math.min(100, b0 + 1);
    txt.push(`BSC ${b0} → ${st.bscg[c]} %${lo[c].bscOk ? '' : ` (seulement ${lo[c].bscIn} flux sur ${BSC_NEED}, pas de gain)`}`);
    const p0 = st.pcg[c]; if (g > 20) st.pcg[c] = Math.min(100, p0 + 1);
    txt.push(`PC ${p0} → ${st.pcg[c]} %${g > 20 ? '' : ' (BSC à 20 % ou moins, pas de gain)'}`);
    const free = g > 50 ? 1 : 0; const gain = free + lo[c].div; const d0 = st.divp[c]; st.divp[c] = Math.min(100, d0 + gain);
    txt.push(`DIV+ ${d0} → ${st.divp[c]} (${free ? '1 gratuit' : 'pas de point gratuit, BSC à 50 % ou moins'} + ${lo[c].div} flux)`);
    J(`  Jauges ${PL[c]} : ${txt.join(' · ')}`);
    if (st.bscg[c] !== b0) RD(`Jauge BSC ${ADJF[c]} : ${st.bscg[c]} %`);
    if (st.pcg[c] !== p0) RD(`Jauge PC ${ADJ[c]} : ${st.pcg[c]} %`);
    if (st.divp[c] !== d0) RD(`Jauge DIV+ ${ADJF[c]} : ${st.divp[c]}`);
  }
  // garde des prisonniers
  J('— Garde des prisonniers');
  out.evasion = [];
  for (const c of ['B', 'R']) {
    const guards = 1 + unitsOf(st, c).filter(u => u.slot === 'Garde POW').length;
    const gap = st.pow[c] - 5 * guards;
    if (gap <= 0) { J(`  ${CAMP[c]} : jauge ${st.pow[c]}, ${guards} garde${guards > 1 ? 's' : ''} : pas de jet`); continue; }
    const k = `${T}|POW|${c}`; const who = `Garde POW ${ADJF[c]} (écart ${gap})`; const x = D(k, who); const d = x.d; out.dice.push({ who, d, k, nat: x.nat, forced: x.forced, camp: c, rule: `évasion si dé < ${gap}` });
    if (d < gap) {
      const pw = big(st, c, 'POW'); const reg = zoneOfSlot(pw.slot).region; const regs = [reg, ...adjacent(c, reg)];
      // chaque pion (sauf le POW) et chaque corridor de ces régions est touché sur 1, 2 ou 3
      const ev = { c, regs, pow: pw.slot, gap, d, rolls: [] }; const lines = [];
      const items = [];
      for (const r of regs) for (const u of unitsInZone(st, c, { region: r }, T, false)) if (u.type !== 'POW') items.push({ u });
      for (const [code, [a, b]] of Object.entries(COR[c])) if (regs.includes(a) || regs.includes(b)) items.push({ cor: code });
      for (const it of items) {
        const nm = it.u ? `${it.u.type} (${it.u.slot})` : `corridor ${it.cor}`;
        const kk = `${T}|EVA|${c}|${it.u ? it.u.slot : it.cor}`; const w = `Évasion ${ADJF[c]} · ${nm}`; const y = D(kk, w);
        out.dice.push({ who: w, d: y.d, k: kk, nat: y.nat, forced: y.forced, camp: c, rule: 'touché sur 1, 2 ou 3', eva: 1 });
        const hit = y.d <= EVA_RATE; let res = 'épargné';
        if (hit && it.u) { const l = neutralize(it.u, EN[c], null, 'Évasion'); res = GAUGED.includes(it.u.type) ? it.u.lastLoss : `neutralisé jusqu'à la fin du tour ${it.u.neut}`; lines.push(`notre ${it.u.type} de ${it.u.slot} ${GAUGED.includes(it.u.type) ? 'est touché (' + it.u.lastLoss + ')' : 'est neutralisé jusqu\'à la fin du tour ' + it.u.neut}`); }
        if (hit && it.cor) { st.cut[it.cor] = Math.max(st.cut[it.cor] ?? -1, T + 4); res = `coupé jusqu'à la fin du tour ${T + 4}`; RD(`Poser un marqueur de neutralisation sur le corridor ${it.cor} — retrait à la fin du tour ${T + 4}`); lines.push(`le corridor ${it.cor} est coupé jusqu'à la fin du tour ${T + 4}`); }
        ev.rolls.push({ what: nm, slot: it.u ? it.u.slot : null, cor: it.cor || null, type: it.u ? it.u.type : null, d: y.d, k: kk, forced: y.forced, hit, res });
      }
      const p0 = st.pow[c]; st.pow[c] = Math.floor(st.pow[c] / 2); ev.powFrom = p0; ev.powTo = st.pow[c];
      out.evasion.push(ev);
      const nHit = ev.rolls.filter(r => r.hit).length;
      J(`  ${CAMP[c]} : écart ${gap}, dé ${dTxt(d)} → ÉVASION autour de ${reg} : ${nHit} élément${nHit > 1 ? 's' : ''} touché${nHit > 1 ? 's' : ''} sur ${ev.rolls.length} (${ev.rolls.map(r => `${r.what} ${dTxt(r.d)}${r.hit ? ' ✗' : ''}`).join(', ')}) · jauge POW ${st.pow[c]}`);
      RD(`Évasion au POW ${ADJ[c]} (${regs.join(', ')}) : ${nHit ? nHit + ' élément' + (nHit > 1 ? 's' : '') + ' touché' + (nHit > 1 ? 's' : '') + ' (voir la fenêtre des dés d\'évasion)' : 'aucun élément touché'} · jauge POW ${ADJF[c]} ${st.pow[c]}`);
      rep[c].enemy.unshift(`ÉVASION DE PRISONNIERS : les prisonniers ENI que nous gardions se sont évadés du camp de ${reg} et ont semé le désordre dans les régions ${regs.join(', ')}. ${lines.length ? 'Conséquences : ' + lines.join(' ; ') + '.' : 'Aucun de nos éléments n\'a été touché.'} La jauge POW retombe à ${st.pow[c]}.`);
      // 10 nov. : le camp adverse n'est pas prévenu de l'évasion (seul le camp qui gardait les prisonniers l'apprend)
    } else J(`  ${CAMP[c]} : écart ${gap}, dé ${dTxt(d)} → pas d'évasion`);
  }
  // usure du tour : les jauges descendent maintenant
  wearRD.forEach(RD);
  // fin des neutralisations
  const ends = [];
  for (const u of st.units) if (!u.dead && u.neut === T) { ends.push(desc(u)); st.carry[u.camp].push(`Notre ${u.type} de ${u.slot} est à nouveau opérationnel.`); }
  for (const [k, v] of Object.entries(st.neutReg)) if (v === T) { const [c, r] = k.split('|'); ends.push(`région ${r} (${ADJ[c]})`); st.carry[c].push(`La région ${r} n'est plus neutralisée.`); delete st.neutReg[k]; }
  for (const [k, v] of Object.entries(st.cut)) if (v === T) { ends.push(`corridor ${k}`); const c = COR.B[k] ? 'B' : 'R'; st.carry[c].push(`Le corridor ${k} est à nouveau praticable.`); delete st.cut[k]; }
  if (ends.length) RD('Retirer les marqueurs de neutralisation arrivés à terme : ' + ends.join(', '));
  if (!st.ended && T >= 30) {
    const tot = FUS.reduce((s, f) => s + st.cursor[f], 0);
    const fin = tot === 0 ? { kind: 'égalité', txt: 'Arrivée de la raspoutitsa : somme des curseurs nulle, égalité totale.' } : { kind: 'mineure', w: tot > 0 ? 'B' : 'R', txt: `Arrivée de la raspoutitsa : somme des curseurs ${tot > 0 ? 'bleus' : 'rouges'} ${Math.abs(tot)}. Victoire mineure des ${tot > 0 ? 'bleus' : 'rouges'}.` };
    st.ended = fin; J(fin.txt); RD(fin.txt); for (const c of ['B', 'R']) st.carry[c].push(finTxt(fin, c));
  }
  out.logi = lo; out.engage = engRes; out.perc = perc;
  if (!st.ended) st.turn = T + 1;
  out.state = st;
  out.sync = { B: syncData(st, out, 'B'), R: syncData(st, out, 'R') };
  out.text = { B: reportText(out, 'B'), R: reportText(out, 'R') };
  return out;
}

// ------------------------------------------------------------------ mouvements
function applyMoves(st, effects, T, J, RD, rep) {
  const legal = (c, type, s) => slotError(st, c, type, s, false);
  const plans = [];
  for (const ef of effects) {
    const p = ef.p; if (!CARDS[p.card].types) continue;
    const c = p.camp; const plan = { ef, moves: [], err: null };
    for (const type of CARDS[p.card].types) {
      let D = (p.target.disp[type] || []).map(s => normSlot(s) || s);
      if (!D.length) continue;
      const U = unitsOf(st, c).filter(u => u.type === type);
      while (D.length > U.length && D.includes('Réserve')) D.splice(D.indexOf('Réserve'), 1);
      if (D.length > U.length) {
        // pions détruits depuis l'ordre : on retire d'abord les lignes qui les laissaient sur place, puis les dernières lignes
        const drop = [];
        for (const u of st.units.filter(u => u.camp === c && u.type === type && u.dead)) { const i = D.indexOf(u.slot); if (D.length > U.length && i >= 0) drop.push(...D.splice(i, 1)); }
        while (D.length > U.length) drop.push(D.pop());
        plan.drop = (plan.drop || []).concat(drop.map(s => `${type} → ${s}`));
      }
      for (const s of D) { const e = legal(c, type, s); if (e) { plan.err = e; break; } }
      if (plan.err) break;
      const rem = D.slice(); const stay = [];
      const sorted = U.slice().sort((a, b) => (active(a, T) ? 1 : 0) - (active(b, T) ? 1 : 0));
      for (const u of sorted) { const i = rem.indexOf(u.slot); if (i >= 0) { rem.splice(i, 1); stay.push(u); } }
      const R_ = U.filter(u => !stay.includes(u));
      const mov = R_.filter(u => active(u, T));
      if (rem.length > mov.length) { plan.err = `un ${type} neutralisé ne peut pas être déplacé`; break; }
      if (rem.length === R_.length || true) rem.forEach((s, i) => plan.moves.push({ u: mov[i], to: s }));
    }
    plans.push(plan);
  }
  // remise en place (chassé-croisé) : tous les pions qui bougent sont retirés, puis remis dans l'ordre du message ;
  // un pion dont la destination est tenue par un pion immobile, ou déjà reprise par un pion remis avant lui, part en réserve
  const moving = new Set(); for (const pl of plans) if (!pl.err) pl.moves.forEach(m => moving.add(m.u.id));
  const taken = new Set(st.units.filter(u => !u.dead && !moving.has(u.id)).map(u => u.slot));
  for (const pl of plans) if (!pl.err) for (const m of pl.moves) {
    if (m.to === 'Réserve' || m.to === 'Garde POW') continue;
    if (taken.has(m.to)) { m.bumped = m.to; m.to = 'Réserve'; } else taken.add(m.to);
  }
  for (const pl of plans) {
    const p = pl.ef.p;
    if (pl.err) { pl.ef.status = 'ordre non exécuté'; pl.ef.rp.push(`ordre impossible (${pl.err}) : carte jouée pour rien`); J(`    ${CAMP[p.camp]} ${p.card} : ordre impossible — ${pl.err}`); continue; }
    const txt = [];
    for (const m of pl.moves) { const from = m.u.slot; m.u.slot = m.to; txt.push(`${m.u.type} ${from} → ${m.to}${m.bumped ? ` (${m.bumped} occupé)` : ''}`); RD(`${m.u.type} ${ADJ[m.u.camp]} : ${from} → ${m.to}${m.bumped ? ` (${m.bumped} occupé : en réserve)` : ''}`); }
    pl.ef.moved = pl.moves.map(m => m.to).filter(s => s !== 'Réserve'); pl.ef.rp.push(txt.length ? 'mouvements : ' + txt.join(', ') : 'aucun pion à déplacer');
    if (pl.drop && pl.drop.length) { pl.ef.rp.push(`lignes ignorées faute de pion (détruit) : ${pl.drop.join(', ')}`); J(`    ${CAMP[p.camp]} ${p.card} : lignes ignorées (pion détruit) — ${pl.drop.join(', ')}`); }
  }
  // travaux, grands pions, transfert
  for (const ef of effects) {
    const p = ef.p, c = p.camp;
    if (p.card === 'Travaux du GEN') {
      const gen = {}; const t = [], ko = [];
      for (const w of p.target.works) {
        const ps = parseSlot(w.slot); let err = null;
        if (!ps || ps.kind !== 'region' || ps.camp !== c) err = `« ${w.slot} » hors du Rear ${ADJ[c]}`;
        else if (w.act === 'open' && ps.n < 4) err = `${ps.name} : seuls les emplacements 4 et 5 s'ouvrent`;
        else if (w.act === 'open' && st.opened.includes(ps.name)) err = `${ps.name} est déjà ouvert`;
        else if (w.act === 'fort' && ps.n >= 4 && !st.opened.includes(ps.name)) err = `${ps.name} n'est pas ouvert`;
        else {
          if (gen[ps.region] === undefined) gen[ps.region] = unitsInZone(st, c, { region: ps.region }, T, true).filter(u => u.type === 'GEN').length;
          if (gen[ps.region] <= 0) err = `${ps.name} : plus de GEN actif à ${ps.region}`;
        }
        if (err) { ko.push(err); continue; }
        gen[ps.region]--;
        if (w.act === 'open') { st.opened.push(ps.name); t.push(`${ps.name} ouvert`); RD(`Poser un marqueur Emplacement supplémentaire sur ${ps.name}`); }
        else { if (!st.fort.includes(ps.name)) st.fort.push(ps.name); t.push(`${ps.name} fortifié`); RD(`Poser une fortification sur ${ps.name}`); }
      }
      if (!t.length) { ef.status = 'ordre non exécuté'; ef.rp.push(`aucun chantier possible (${ko.join(' ; ')}) : carte jouée pour rien`); continue; }
      ef.rp.push(t.join(', ') + (ko.length ? ` ; chantier${ko.length > 1 ? 's' : ''} abandonné${ko.length > 1 ? 's' : ''} : ${ko.join(' ; ')}` : ''));
    }
    if (BIGMOVE[p.card]) {
      const pion = big(st, c, BIGMOVE[p.card]); const from = pion.slot; pion.slot = p.target.region + ' 0';
      RD(`${pion.type} ${ADJ[c]} : ${from} → ${pion.slot}`);
      if (ef.r.ok) ef.rp.push(`${pion.type === 'PC' ? 'PC transféré' : pion.type + ' transférée'} en ${pion.slot}`);
      else { const t = bigLoss(st, pion, 'Risque'); RD(`${pion.type} ${ADJ[c]} déplacé mais touché : ${t}`); ef.rp.push(`${pion.type === 'PC' ? 'le PC se déplace' : 'la ' + pion.type + ' se déplace'} en ${pion.slot} mais le transfert l'a désorganisé${pion.type === 'PC' ? '' : 'e'} : ${t}`); }
    }
    if (p.card === 'Transfert à la justice') {
      const b = st.pow[c];
      if (ef.r.ok) { st.pow[c] = Math.floor(b / 2); ef.rp.push(`jauge POW ${b} → ${st.pow[c]}`); }
      else { st.pow[c] = Math.min(40, b + 1); ef.rp.push(`jauge POW +1 (${st.pow[c]})`); }
      RD(`Jauge POW ${ADJF[c]} : ${st.pow[c]}`);
    }
  }
}

// ------------------------------------------------------------------ combat d'une division
function divisionScore(st, c, f, t, lo, bonus, renfort) {
  const us = unitsInZone(st, c, { fus: f }, t, true);
  const inf = us.filter(u => u.type === 'INF').length;
  const pivots = (renfort && renfort[c]) || [];
  let art = 0; const artTxt = [];
  for (const u of st.units) {
    if (u.camp !== c || u.type !== 'ART DIV' || !active(u, t)) continue;
    const home = parseSlot(u.slot).fus; const dir = (st.artDir || {})[u.id]; const pv = dir ? { to: dir } : pivots.find(x => x.id === u.id); const aim = pv ? pv.to : home;
    if (aim === f) { art++; if (pv) artTxt.push(`ART DIV de ${home} en renfort`); }
  }
  const mp = us.filter(u => u.type === 'MP').length, cim = us.filter(u => u.type === 'CIMIC').length;
  const ew = us.filter(u => u.type === 'EW').length;   // +0,5 RAPFOR par EW dans le fuseau
  const nav = us.filter(u => u.type === 'NAV').length;   // 12 nov. : +1 RAPFOR par NAV dans le fuseau (Kaliningrad)
  const rapT = 3 * inf + 10 * art + 5 * ew + 10 * nav + 10 * (bonus.rap || 0);
  const marker = st.fm[c][f] || 0;
  let fm = marker + 0.5 * (mp + cim) + (bonus.fm || 0);
  if (lo.noFlux[f] && !(bonus.raplog > 0)) fm -= 2;
  return { rapT, rap: rapT / 10, raplog: lo.raplog[f] + (bonus.raplog || 0), fm, inf, art, ew, nav, mp, cim, marker, noFlux: lo.noFlux[f], gscOk: lo.bscOk, frozen: false, bonus: bonus.src || [], artTxt };
}


// message de fin de partie, du point de vue d'un camp
function finTxt(fin, c) {
  if (fin.kind === 'nul') return 'FIN DE PARTIE — Deux percées de même force au même jour : partie nulle.';
  if (fin.kind === 'égalité') return 'FIN DE PARTIE — Arrivée de la raspoutitsa : aucun camp ne l\'emporte sur l\'ensemble du front. Égalité totale.';
  const us = fin.w === c;
  if (fin.kind === 'mineure') return us ? 'FIN DE PARTIE — Arrivée de la raspoutitsa : nos forces tiennent l\'avantage sur l\'ensemble du front. Victoire mineure.' : 'FIN DE PARTIE — Arrivée de la raspoutitsa : l\'ENI tient l\'avantage sur l\'ensemble du front. Défaite mineure.';
  const f = DE_FUS[fin.f];
  if (fin.kind === 'totale') return us ? `FIN DE PARTIE — Nos forces ont percé dans le fuseau ${f} et exploitent la percée. Victoire totale.` : `FIN DE PARTIE — L'ENI a percé dans le fuseau ${f} et exploite la percée. Défaite totale.`;
  return us ? `FIN DE PARTIE — Nos forces ont percé dans le fuseau ${f}. La réserve ENI colmate à grand peine la brèche, son corps d'armée est neutralisé. Nous sommes victorieux avant la Raspoutitsa.` : `FIN DE PARTIE — L'ENI a percé dans le fuseau ${f}. Notre réserve ne parvient qu'à peine à colmater la brèche. Nous sommes neutralisés et avons subi une défaite décisive.`;
}
// ------------------------------------------------------------------ compte rendu
function reportText(out, c) {
  const r = out.rep[c]; const L = [];
  L.push(`COMPTE RENDU ${CORPS[c]} — JOUR ${out.turn}`);
  L.push(''); L.push('1. Bilan des actions menées par les EOCA'); if (r.own.length) r.own.forEach(x => L.push('- ' + x)); else L.push('- Aucune action effectuée ce jour');
  L.push(''); L.push('2. Actions ENI dans notre zone'); if (r.enemy.length) r.enemy.forEach(x => L.push('- ' + x)); else L.push('- Rien à signaler');
  L.push(''); L.push('3. Renseignements obtenus'); if (r.intel.length) r.intel.forEach(x => L.push('- ' + x)); else L.push('- Aucun renseignement nouveau');
  L.push(''); L.push('4. Capacités à nouveau disponibles'); L.push('- ' + (r.back.length ? r.back.join(', ') : 'aucune'));
  L.push(''); L.push('5. Compte-rendu des divisions'); if (r.div.length) r.div.forEach(x => L.push('- ' + x)); else L.push('- Silence radio des divisions');
  L.push(''); L.push('Jauges : ' + r.gauges.join(' · '));
  if (out.sync) { L.push(''); L.push(syncText(out.sync[c])); }
  return L.join('\n');
}

// ------------------------------------------------------------------ bloc de synchronisation (lu par la page joueur)
// Ce que le camp c sait à l'issue du tour : ses pions, ses cartes, ses ordres en cours, ses jauges, et les emplacements ENI vus ce tour.
function syncData(st, out, c) {
  const T = st.turn; const mine = s => { const p = parseSlot(s); return p && p.camp === c; };
  return {
    v: 1, g: gameId(st.seed), c, t: out.turn, n: T,
    lim: cardLimit(st, c), pg: st.pcg[c], bg: st.bscg[c],
    ad: Object.entries(st.artDir || {}).map(([id, f]) => [st.units.find(u => u.id === +id), f]).filter(([u]) => u && u.camp === c && !u.dead).map(([u, f]) => [u.slot, f]),
    ae: Object.entries(st.artDir || {}).map(([id, f]) => [st.units.find(u => u.id === +id), f]).filter(([u]) => u && u.camp !== c).map(([u, f]) => [u.slot, f]),   // orientation des ART DIV ENI (même détruites : on ne trahit pas une perte inconnue) (Renfort de feu est toujours révélé)
    cb: Object.entries(st.cb).filter(([, m]) => m.camp === c).map(([id, m]) => [st.units.find(u => u.id === +id).slot, m.zone.fus || m.zone.region]),
    ev: (out.evasion || []).filter(v => v.c === c).map(v => [v.pow, v.regs, v.rolls.map(r => [r.slot || r.cor, r.hit ? 1 : 0, r.d % 10])]),
    u: st.units.filter(u => u.camp === c).map(u => [u.type, u.slot, u.neut > 0 ? u.neut : 0, u.dead ? 1 : 0]),
    k: st.cards[c],
    p: st.pending.filter(p => p.camp === c).map(p => [p.card, p.effet, p.played, [p.raw.zone, p.raw.slot, p.raw.prec, p.raw.disp].filter(Boolean).join(' / ')]),
    ga: st.gauges[c], dv: st.divp[c], pw: st.pow[c], fm: st.fm[c],
    net: st.net[c], op: st.opened.filter(mine), fo: st.fort.filter(mine),
    nr: Object.fromEntries(Object.entries(st.neutReg).filter(([k]) => k.startsWith(c + '|')).map(([k, v]) => [k.slice(2), v])),
    ct: Object.fromEntries(Object.entries(st.cut).filter(([k]) => COR[c][k])),
    i: out.rep[c].seen,
    nl: out.rep[c].nl || [],   // flux LOG ENI repérés ce tour : [corridor, marqueurs, de, vers, passent réellement] (10 nov.)
    a: (out.act && out.act[c]) || [],
    x: (out.hit && out.hit[c]) || [],
    eg: (out.engage || []).filter(e => e.c === c).map(e => [e.f, e.ok ? 1 : 0]),   // engagement de notre DIV+ ce tour (fuseau, réussi), sans le nombre de cases
    ee: st.pending.filter(p => p.camp !== c && p.card === 'Engagement de la DIV' && p.target && p.target.fus).map(p => [p.target.fus, p.effet]),   // engagements annoncés de la DIV+ ennemie (fuseau, tour d'effet)
    fin: st.ended ? { k: st.ended.kind, w: st.ended.w || '', f: st.ended.f || '', cu: st.cursor } : null,
    e: st.ended ? finTxt(st.ended, c) : null,
  };
}
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function b32enc(bytes) { let out = '', bits = 0, val = 0; for (const b of bytes) { val = (val << 8) | b; bits += 8; while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; } val &= 255; } if (bits > 0) out += B32[(val << (5 - bits)) & 31]; return out; }
function b32dec(str) { const out = []; let bits = 0, val = 0; for (const ch of str) { const i = B32.indexOf(ch); if (i < 0) throw new Error('caractère inattendu « ' + ch + ' »'); val = (val << 5) | i; bits += 5; if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; } val &= 255; } return new Uint8Array(out); }
// empreinte de la partie, envoyée aux joueurs à la place de la graine (qui permettrait de calculer les dés)
function gameId(seed) { return 'P' + fnv('raspoutitsa|' + seed); }
function fnv(str) { let h = 2166136261 >>> 0; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h.toString(16).toUpperCase().padStart(8, '0'); }
const utf8 = s => typeof TextEncoder !== 'undefined' ? new TextEncoder().encode(s) : Uint8Array.from(unescape(encodeURIComponent(s)), ch => ch.charCodeAt(0));
const unutf8 = b => typeof TextDecoder !== 'undefined' ? new TextDecoder().decode(b) : decodeURIComponent(escape(String.fromCharCode(...b)));
// forme compacte : pions, emplacements et cartes remplacés par leur numéro dans des listes fixes
function syncSlots() { const l = ['Réserve', 'Garde POW']; for (const c of ['B', 'R']) for (const r of REG[c]) for (let i = 0; i <= 5; i++) l.push(`${r} ${i}`); for (const f of FUS) for (const c of ['B', 'R']) { for (let i = 1; i <= 3; i++) l.push(`${f} ${CAMP[c]} ${i}`); for (const a of ART_SIDES) l.push(`${f} ${CAMP[c]} ART ${a}`); } return l; }
const SY_SLOTS = syncSlots();
const SY_TYPES = [...BIG, ...Object.keys(SMALL), 'ART DIV'];
const SY_CARDS = Object.keys(CARDS);
const z36 = (n, w) => Math.max(0, n).toString(36).padStart(w, '0');
function syncPack(d) {
  const sl = s => SY_SLOTS.indexOf(s), cd = k => SY_CARDS.indexOf(k);
  return { ...d,
    u: d.u.map(([t, s, n, x]) => z36(SY_TYPES.indexOf(t), 1) + z36(sl(s), 2) + z36(n, 2) + x).join(''),
    k: Object.fromEntries(Object.entries(d.k).map(([k, v]) => [cd(k), v])),
    p: d.p.map(([k, ...r]) => [cd(k), ...r]),
    a: (d.a || []).map(([k, z, s, h, f, fr]) => [cd(k), z, s.map(sl).filter(x => x >= 0), (h || []).map(([s2, t]) => [sl(s2), t]), ...(f || fr ? [f ? 1 : 0] : []), ...(fr ? [sl(fr)] : [])]),   // fr : ART CA qui a tiré (7 nov.)
    x: (d.x || []).map(([k, z, h, zr, zc, ok, fr]) => [k ? cd(k) : -1, z, h.map(([s2, t]) => [sl(s2), t]), zr, zc, ok, ...(fr ? [sl(fr)] : [])]),
    i: d.i.map(([s, t, n, o]) => [sl(s), t ? SY_TYPES.indexOf(t) : -1, n, o]),
  };
}
function syncUnpack(d) {
  const u = []; for (let j = 0; j < d.u.length; j += 6) { const q = d.u.slice(j, j + 6); u.push([SY_TYPES[parseInt(q[0], 36)], SY_SLOTS[parseInt(q.slice(1, 3), 36)], parseInt(q.slice(3, 5), 36), +q[5]]); }
  return { ...d, u,
    k: Object.fromEntries(Object.entries(d.k).map(([k, v]) => [SY_CARDS[k], v])),
    p: d.p.map(([k, ...r]) => [SY_CARDS[k], ...r]),
    a: d.a ? d.a.map(([k, z, s, h, f, fr]) => [SY_CARDS[k], z, s.map(x => SY_SLOTS[x]), (h || []).map(([x, t]) => [SY_SLOTS[x], t]), ...(f || fr !== undefined ? [f ? 1 : 0] : []), ...(fr !== undefined ? [SY_SLOTS[fr]] : [])]) : undefined,
    x: d.x ? d.x.map(([k, z, h, zr, zc, ok, fr]) => [k < 0 ? '' : SY_CARDS[k], z, h.map(([x, t]) => [SY_SLOTS[x], t]), zr, zc, ok, ...(fr !== undefined ? [SY_SLOTS[fr]] : [])]) : undefined,
    i: d.i.map(([s, t, n, o]) => [SY_SLOTS[s], t < 0 ? '' : SY_TYPES[t], n, o]),
  };
}
function syncText(d) {
  const body = b32enc(utf8(JSON.stringify(syncPack(d))));
  const lines = []; for (let i = 0; i < body.length; i += 60) lines.push(body.slice(i, i + 60));
  return [`RASPSYNC ${d.c === 'B' ? 'BLEU' : 'ROUGE'} TOUR ${d.t} DEBUT`, ...lines, `RASPSYNC FIN ${fnv(body)}`].join('\n');
}
// lecture d'un compte rendu collé : retrouve le bloc, vérifie la somme de contrôle
function syncRead(text) {
  const t = String(text || '');
  const a = t.search(/RASPSYNC\s+(BLEU|ROUGE)\s+TOUR\s+\d+\s+DEBUT/i); if (a < 0) return { err: 'aucun bloc de synchronisation dans le texte collé' };
  const rest = t.slice(a); const m = rest.match(/^RASPSYNC\s+(BLEU|ROUGE)\s+TOUR\s+(\d+)\s+DEBUT([\s\S]*?)RASPSYNC\s+FIN\s+([0-9A-F]{8})/i);
  if (!m) return { err: 'bloc de synchronisation incomplet : la fin du message manque' };
  const body = m[3].replace(/[^A-Z2-7]/gi, '').toUpperCase();
  if (fnv(body) !== m[4].toUpperCase()) return { err: 'bloc de synchronisation abîmé (somme de contrôle fausse) : recopiez le compte rendu en entier' };
  try { const d = syncUnpack(JSON.parse(unutf8(b32dec(body)))); return { data: d }; } catch (e) { return { err: 'bloc de synchronisation illisible : ' + e.message }; }
}

return { PLATEAU, SUW, FOC, NAVAL, ART_SIDES, ACCESS_ALL, ACCESS_CORS, COAST, COAST_FUS, NAV_CARDS, GAUGES, GAUGES_TXT, NDIV, FUS_NOM, DE_FUS, ACCESS, navSlotOk, NEVER, retOf, retTxt, REGEN_TURNS, BP_INF, migrate, divCross, DIV_OFF, DIV_DEF, PC_CARDS, BSC_DIE, BSC_NEED, BIG_LOSS, MINOR_TYPES, TYPE_ALIAS, cardLimit, minorRoute, gameId, syncData, syncText, syncRead, SY_SLOTS, LOG_TOTAL, LOG_PER_COR, FUS, REG, COR, CARDS, BREAK, DIV_MSG, PAIR, CAMP, PL, ADJ, ADJF, GAUGE, SMALL, BIG, EN, ACCESS_COR, newState, setupGame, parseOrders, checkOrders, resolveTurn, logistics, orientNetwork, parseSlot, normSlot, divisionScore, d10, active, zoneOfSlot, parseDeployment, adjacent, distance, openDistance, unitAt, unitsInZone, fmt1, gaugeTxt, parseNet, clean };
})();
if (typeof module !== 'undefined') module.exports = R;

