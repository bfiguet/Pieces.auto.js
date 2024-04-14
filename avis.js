/* global Chart */
export function ajoutListenerAvis(){
	const piecesElements = document.querySelectorAll(".fiches article button");

	for(let i = 0; i < piecesElements.length; i++){
		piecesElements[i].addEventListener("click", async function (event){
			const id = event.target.dataset.id;
			const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
			const avis = await reponse.json();// deserialiser
			window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));
			const pieceElement = event.target.parentElement;// ajout au DOM
			afficherAvis(pieceElement, avis);
		});
	}
}

export function afficherAvis(pieceElement, avis){
	const avisElement = document.createElement("p");
	for (let i = 0; i < avis.length;i++)
		avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
	pieceElement.appendChild(avisElement);
}

export function ajoutListenerEnvoyerAvis(){
	const formulaireAvis = document.querySelector(".formulaire-avis");
	formulaireAvis.addEventListener("submit", function (event){
		event.preventDefault(); //Desactiv comportement par default du navigateur
		//Creation obj nouvel avis
		const avis = {
			pieceId: parseInt(event.target.querySelector("[name=piece-id").value),
			utilisateur: event.target.querySelector("[name=utilisateur]").value,
			commentaire: event.target.querySelector("[name=commentaire]").value,
			nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles").value)
		};
		//Creation charge utile au format JSON
		const chargUtile = JSON.stringify(avis);
		//Appel fonction fetch avec toutes les info necessaires
		fetch("http://localhost:8081/avis", {
			method: "POST",
			headers: {"Content-Type": "applications/json"},
			body: chargUtile
		});
	});
}

export async function afficherGraphiqueAvis(){
	//Calcul du nbr total commentaires par étoiles
	const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
	const nb_com = [0, 0, 0, 0, 0];
	for(let commentaire of avis)
		nb_com[commentaire.nbEtoiles - 1]++;
	//Legende qui s'affiche sur la gauche a cote de la barre horizontale
	const labels = ["5", "4", "3", "2", "1"];
	//Donnees et personnalisation du graphique
	const data = {
		labels: labels,
		datasets: [{
			label: "Etoiles attribuées",
			data: nb_com.reverse(),
			backgroundColor: "rgba(255, 230, 0, 1)", //jaune
		}],
	};
	const config = {
		type: "bar",
		data: data,
		options: {
			indexAxis: "y",
		},
	};
	//Rendu graphique dans l'element canvas
	new Chart(
		document.querySelector("#graphique-avis"),
		config,
	);

	//Recupération des pieces depuis localStorage
	const piecesJSON = window.localStorage.getItem("pieces");

	const pieces = JSON.parse(piecesJSON);
	//Calcul nb comm
	let nbCommDispo = 0;
	let nbCommNoDispo = 0;

	for(let i = 0; 1 < avis.length; i++){
		const piece = pieces.find(p => p.id === avis[i].pieceId);

		if (piece){
			if (piece.disponibilite)
				nbCommDispo++;
			else
				nbCommNoDispo++;
		}
	}
	//Legende qui afficherq sur la gauch a cote de la barre horizontale
	const labelsDispo = ["Disponibles", "Non Disponible"];

	//Donnees et personnalisation du graphiq
	const dataDispo = {
		labels: labelsDispo,
		datasets: [{
			label: "Nombre de commentaires",
			data: [nbCommDispo, nbCommNoDispo],
			backgroundColor: "rgba(0, 230, 255, 1", //turquoise
		}],
	};

	//Obj condig final
	const configDispo = {
		type: "bar",
		data: dataDispo,
	};

	//Rendu du graphiq dans l'element canvas
	new Chart(
		document.querySelector("#graphique-dispo"),
		configDispo,
	);
}