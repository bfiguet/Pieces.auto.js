import { afficherAvis, afficherGraphiqueAvis, ajoutListenerAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

////Récupération des pièces depuis le fichier JSON
//const reponse = await fetch('pieces-autos.json'); // AVANT s'ecrivait const reponse = fetch("....").then(fuction(){//code;});
//const pieces = await reponse.json();
////await makes a function wait for a Promise

//for (let i = 0; i < pieces.length; i++){
//	//Creation tags
//	const article = pieces[i];
//	// Récupération de l'élément du DOM qui accueillera les fiches
//	const sectionFiches = document.querySelector(".fiches");
//	// Création d’une balise dédiée à une pièce automobile
//	const pieceElement = document.createElement("article");
//	//Creation des balises
//	const imageElement = document.createElement("img");
//	imageElement.src = article.image;
//	const nomElement = document.createElement("h2");
//	nomElement.innerText = article.nom;
//	const prixElement = document.createElement("p");
//	prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
//	const categorieElement = document.createElement("p");
//	categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
//	const descriptionElement = document.createElement("p");
//	descriptionElement.innerText = article.description ?? "Pas de description pour le moment";
//	const stockElement = document.createElement("p");
//	stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

//	// On rattache la balise article a la section Fiches
//    sectionFiches.appendChild(pieceElement);
//    // On rattache l’image à pieceElement (la balise article)
//	pieceElement.appendChild(imageElement);
//	pieceElement.appendChild(nomElement);
//	pieceElement.appendChild(prixElement);
//	pieceElement.appendChild(categorieElement);
//	pieceElement.appendChild(descriptionElement);
//	pieceElement.appendChild(stockElement);
//}

//const boutonTrier = document.querySelector(".btn-trier");
//boutonTrier.addEventListener("click", function(){
//	const piecesOrdonnees = Array.from(pieces);
//	piecesOrdonnees.sort(function(a, b){
//		return a.prix - b.prix;
//	});
//	console.log(piecesOrdonnees);
//});

//const boutonFilter = document.querySelector(".btn-filter");
//boutonFilter.addEventListener("click", function(){
//	const piecesFilter = pieces.filter(function (piece){
//		return piece.prix <= 35;
//	});
//	console.log(piecesFilter);
//});

//const boutonDecroissant = document.querySelector(".btn-decroissant");
//boutonDecroissant.addEventListener("click", function(){
//	const piecesOrdonnees = Array.from(pieces);
//	piecesOrdonnees.sort(function(a, b){
//		return b.prix - a.prix;
//	});
//	console.log(piecesOrdonnees);
//});

//const boutonNoDescription = document.querySelector(".btn-nodesc");
//boutonNoDescription.addEventListener("click", function(){
//	const piecesFilter = pieces.filter(function (piece){
//		return piece.description;
//	});
//	console.log(piecesFilter);
//});

//const noms = pieces.map(piece => piece.nom); //retourner la val de nom de l'obj piece
////fonction lambda piece => piece.nom
////fonction normale function(piece){return piece.nom;}
////ex d'utilisation const prix_double = pieces.map(piece =>.prix * 2);

//for (let i = pieces.length - 1; i >= 0; i--){
//	if(pieces[i].prix > 35)
//		noms.splice(i,1); // supp 
//}
////console.log(noms);

////Creation de liste
//const abordablesElements = document.createElement('ul');
////Ajout de chaque nom a la list
//for (let i = 0; i < noms.length; i++){
//	const nomElement = document.createElement('li');
//	nomElement.innerText = noms[i];
//	abordablesElements.appendChild(nomElement);
//}

////Ajout de l'en-tete puis de la liste au bloc resultat filtre
//document.querySelector('.abordables')
//	.appendChild(abordablesElements)

//const noms2 = pieces.map(piece => piece.nom); //retourner la val de nom de l'obj piece
//const prix = pieces.map(piece => piece.prix);
//for (let i = pieces.length - 1; i >= 0; i--){
//	if(!pieces[i].disponibilite){
//		noms2.splice(i,1); // supp 
//		prix.splice(i,1);
//	}
//}
////console.log(noms2);

//const disponiblesElements = document.createElement('ul');
//for (let i = 0; i < noms2.length; i++){
//	const nomElement = document.createElement('li');
//	nomElement.innerText = `${noms2[i]} - ${prix[i]} €`;
//	disponiblesElements.appendChild(nomElement);
//}
//document.querySelector('.disponibles')
//	.appendChild(disponiblesElements)

////Efface le contenu de la balise body ==> dc de l'ecran
//document.querySelector(".fiches").innerHTML = '';

///-----------------NEW VERSION --------------------------

//save name in localStorage
//const nomEntreprise = window.localStorage.getItem("nom");
//Recuperation des pieces eventuellement stockees dans localStorage
let pieces = window.localStorage.getItem("pieces");
if (pieces === null){
	//Recuperation des pieces depuis le fichier JSON
	//const reponse = await fetch('pieces-autos.json'); // fichier local
	const reponse = await fetch('http://localhost:8081/pieces/');
	pieces = await reponse.json();
	//LES DEUX LIGNES EGALE CELLE-CI const pieces = await fetch("http://localhost:8081/pieces/").then(pieces => pieces.json());

	//Transformation des pieces en JSON
	const valeurPieces = JSON.stringify(pieces);
	//Stockage des info dans le localStorage
	window.localStorage.setItem("pieces", valeurPieces);	
}else{
	pieces = JSON.parse(pieces);
}

ajoutListenerEnvoyerAvis();

//Fonc genere page web
function generePieces(pieces){
	for(let i = 0; i < pieces.length; i++){
		console.log("Article");
		const article = pieces[i];
		//Recuperation elemnt du DOM qui recevra les fiches
		const sectionFiches = document.querySelector(".fiches");
		//Creation balise pr 1 piece
		const pieceElement = document.createElement("article");
		
		//Creer element img
		const imgElement = document.createElement("img");
		//config source img
		imgElement.src = article.image;
		
		const nomElement = document.createElement("h2");
		nomElement.src = article.nom;
		nomElement.innerText = article.nom;

		const prixElement = document.createElement("p");
		prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

		const categorieElement = document.createElement("p");
		categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
		
		const descriptionElement = document.createElement("p");
		descriptionElement.innerText = article.description ?? "Pas de description pour le moment";

		const dispoElement = document.createElement("p");
		dispoElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
		
		const avisBtn = document.createElement("button");
		avisBtn.dataset.id = article.id;
		avisBtn.textContent = "Afficher les avis";

		//join balise a section Fiches
		sectionFiches.appendChild(pieceElement);
		//join image a pieceElement(balise article)
		pieceElement.appendChild(imgElement);
		pieceElement.appendChild(nomElement);
		pieceElement.appendChild(prixElement);
		pieceElement.appendChild(categorieElement);
		pieceElement.appendChild(descriptionElement);
		pieceElement.appendChild(dispoElement);
		pieceElement.appendChild(avisBtn);
	}
	//console.log("fin function generePieces");
	ajoutListenerAvis();
}

//Affichage de la page
generePieces(pieces);

for(let i = 0; i < pieces.length;i++){
	const id = pieces[i].id;
	const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
	const avis = JSON.parse(avisJSON);

	if (avis !== null){
		const pieceElement = document.querySelector(`article[data-id="${id}"]`);
		afficherAvis(pieceElement, avis);
	}
}

//Ajout du listener pr trier les pieces croissant
const btnTrier = document.querySelector(".btn-trier");
btnTrier.addEventListener("click", function(){
	const piecesOrdonnees = Array.from(pieces)
	piecesOrdonnees.sort(function(a, b){
		return a.prix - b.prix;
	});
	//clean ecran + display page
	document.querySelector(".fiches").innerHTML = "";
	generePieces(piecesOrdonnees);
	console.log("fin btn-trier");
});

const btnFiler = document.querySelector(".btn-filter");
btnFiler.addEventListener("click", function(){
	const pieceFilter = pieces.filter(function(piece){
		return piece.prix <= 35;
	});
	document.querySelector(".fiches").innerHTML = "";
	generePieces(pieceFilter);
	console.log("fin btn-filter");
});

const btnDecroissant = document.querySelector(".btn-decroissant");
btnDecroissant.addEventListener("click", function(){
	const piecesDecroissant = Array.from(pieces);
	piecesDecroissant.sort(function(a, b){
		return b.prix - a.prix;
	});
	document.querySelector(".fiches").innerHTML = "";
	generePieces(piecesDecroissant);
	console.log("fin btn-decroissant");
});

const btnNoDes = document.querySelector(".btn-nodesc");
btnNoDes.addEventListener("click", function(){
	const piecesNoDes = pieces.filter(function(piece){
		return piece.description;
	});
	document.querySelector(".fiches").innerHTML = "";
	generePieces(piecesNoDes);
	console.log("fin btn-nodesc");
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length - 1; i >= 0; i--){
	if(pieces[i].prix > 35)
		noms.splice(i,1);
}
console.log(noms);

const pElement = document.createElement('p');
pElement.innerText = "Pieces abordables";
const abordablesElements = document.createElement('ul');
for (let i = 0; i < noms.length; i++){
	const nomElement = document.createElement('li');
	nomElement.innerText = noms[i];
	abordablesElements.appendChild(nomElement);
}
document.querySelector('.abordables')
	.appendChild(pElement)
	.append(abordablesElements);

const nomDispo = pieces.map(piece => piece.nom);
const prixDispo = pieces.map(piece => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--){
	if(pieces[i].disponibilite == false){
		nomDispo.splice(i,1);
		prixDispo.splice(i,1);
	}
}

const dispoElement = document.createElement('ul');

for(let i = 0;i < nomDispo.length; i++){
	const nomElement = document.createElement('li');
	nomElement.innerText = `${nomDispo[i]} - ${prixDispo[i]} €`;
	dispoElement.appendChild(nomElement);
}

const pElementDispo = document.createElement('p')
pElementDispo.innerText = "Pieces disponibles: ";
document.querySelector('.disponibles').appendChild(pElementDispo).appendChild(dispoElement);

const inputPrixMax = document.querySelector('#prix-max');
inputPrixMax.addEventListener('input', function(){
	const piecesFiltrees = pieces.filter(function(piece){
		return piece.prix <= inputPrixMax.value;
	});
	document.querySelector(".fiches").innerHTML = "";
	generePieces(piecesFiltrees);
});

//Ajou du listener MAJ des donnes du localstorage
const btnMAJ = document.querySelector(".btn-maj");
btnMAJ.addEventListener("click", function(){
	window.localStorage.removeItem("pieces");
});

await afficherGraphiqueAvis();