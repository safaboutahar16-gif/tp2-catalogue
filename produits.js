// TP2 - Catalogue de produits (JavaScript autonome)

// 1. Données de départ
const produits = [
  { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
  { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
  { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
  { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 },
];

// Fonctions métier
const getDisponibles = (liste) => liste.filter((p) => p.stock > 0);

const valeurStock = (liste) =>
  liste.reduce((total, p) => total + p.prix * p.stock, 0);

const moinsCher = (liste) => {
  if (liste.length === 0) return null;
  return liste.reduce((min, p) => (p.prix < min.prix ? p : min));
};

const genererResume = (liste) =>
  liste.map((p) => `${p.nom} - ${p.prix} MAD - ${p.stock} unités`);

// Défi : validation des données
const estValide = ({ prix, stock }) =>
  Number.isFinite(prix) && Number.isFinite(stock) && prix >= 0 && stock >= 0;

// ---- Exécution ----

// Étape 1 : affichage du catalogue
console.log("=== 1. Catalogue ===");
produits.forEach((p) => console.log(`${p.nom} : ${p.prix} MAD`));

// Étape 2 : disponibilité
const disponibles = getDisponibles(produits);
console.log("\n=== 2. Disponibilité ===");
console.log("Produits disponibles :", disponibles.length);
console.log("Noms :", disponibles.map((p) => p.nom).join(", "));

// Étape 3 : valeur du stock
console.log("\n=== 3. Valeur du stock ===");
console.log("Valeur du stock :", valeurStock(produits), "MAD");

// Étape 4 : prix minimal
console.log("\n=== 4. Produit disponible le moins cher ===");
const m = moinsCher(disponibles);
if (m === null) {
  console.log("Aucun produit disponible.");
} else {
  console.log(`Moins cher : ${m.nom} (${m.prix} MAD)`);
}

// Étape 5 : résumé
console.log("\n=== 5. Résumé ===");
console.log(genererResume(produits));

// Cas de test
console.log("\n=== Cas de test ===");
console.log(
  "Écran absent de la liste disponible :",
  !disponibles.some((p) => p.nom === "Écran")
);

const tousZero = produits.map((p) => ({ ...p, stock: 0 }));
console.log("Tous stocks à zéro -> disponibles :", getDisponibles(tousZero).length);
console.log("Tous stocks à zéro -> moins cher :", moinsCher(getDisponibles(tousZero)));

console.log("Catalogue vide -> valeur du stock :", valeurStock([]));
console.log("Données valides (prix/stock) :", produits.every(estValide));

// Question 4 : prix de la souris + 10 MAD (sans modifier l'original)
const produitsMaj = produits.map((p) =>
  p.nom === "Souris" ? { ...p, prix: p.prix + 10 } : p
);
console.log("Souris +10 MAD -> valeur du stock :", valeurStock(produitsMaj), "MAD");

// Défi : déstructuration
console.log("\n=== Défi : déstructuration ===");
if (m !== null) {
  const { nom, prix } = m;
  console.log(`Déstructuration -> nom = ${nom}, prix = ${prix}`);
}