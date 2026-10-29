// TP2 - Catalogue de produits (JavaScript autonome)

// Étape 1 : données de départ
const produits = [
  { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
  { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
  { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
  { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 },
];
console.log("=== 1. Données ===");
console.log("Nombre de produits :", produits.length);

// Étape 2 : affichage du catalogue
console.log("\n=== 2. Catalogue ===");
produits.forEach((p) => console.log(`${p.nom} : ${p.prix} MAD`));

// Étape 3 : disponibilité avec filter()
const getDisponibles = (liste) => liste.filter((p) => p.stock > 0);
const disponibles = getDisponibles(produits);
console.log("\n=== 3. Disponibilité ===");
console.log("Produits disponibles :", disponibles.length);
console.log("Noms :", disponibles.map((p) => p.nom).join(", "));

// Étape 4 : valeur du stock avec reduce()
const valeurStock = (liste) =>
  liste.reduce((total, p) => total + p.prix * p.stock, 0);
console.log("\n=== 4. Valeur du stock ===");
console.log("Valeur du stock :", valeurStock(produits), "MAD");

// Étape 5 : produit disponible le moins cher
const moinsCher = (liste) => {
  if (liste.length === 0) return null;
  return liste.reduce((min, p) => (p.prix < min.prix ? p : min));
};
console.log("\n=== 5. Prix minimal ===");
const m = moinsCher(disponibles);
if (m === null) {
  console.log("Aucun produit disponible.");
} else {
  console.log(`Moins cher : ${m.nom} (${m.prix} MAD)`);
}

// Étape 6 : résumé avec map()
const genererResume = (liste) =>
  liste.map((p) => `${p.nom} - ${p.prix} MAD - ${p.stock} unités`);
console.log("\n=== 6. Résumé ===");
console.log(genererResume(produits));

// Étape 7 : cas de test imposés
console.log("\n=== 7. Cas de test ===");
console.log("Écran absent de la liste :", !disponibles.some((p) => p.nom === "Écran"));
const tousZero = produits.map((p) => ({ ...p, stock: 0 }));
console.log("Stocks à zéro, disponibles :", getDisponibles(tousZero).length);
console.log("Stocks à zéro, moins cher :", moinsCher(getDisponibles(tousZero)));
console.log("Catalogue vide, valeur :", valeurStock([]));

// Étape 8 : défi (estValide et déstructuration)
const estValide = ({ prix, stock }) =>
  Number.isFinite(prix) && Number.isFinite(stock) && prix >= 0 && stock >= 0;
console.log("\n=== 8. Défi ===");
console.log("Données valides :", produits.every(estValide));
if (m !== null) {
  const { nom, prix } = m;
  console.log(`Déstructuration : nom = ${nom}, prix = ${prix}`);
}

// Question 4 : prix de la souris + 10 MAD (sans modifier l'original)
const produitsMaj = produits.map((p) =>
  p.nom === "Souris" ? { ...p, prix: p.prix + 10 } : p
);
console.log("\n=== Question 4 ===");
console.log("Souris +10 MAD, valeur :", valeurStock(produitsMaj), "MAD");
