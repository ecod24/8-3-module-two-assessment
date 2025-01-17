const BASE_URL = `https://ghibliapi.herokuapp.com/`;
const movies = document.querySelector("#titles");
const selector = document.querySelector(".selector form");
const reviewForm = document.querySelector("#review-form form");
const reviewText = document.querySelector("#review-form input#review");
const dropdown = document.querySelector("select");
const resetButton = document.querySelector("#reset-reviews");
const reviewList = document.querySelector("#review-list ul");
const showPeopleButton = document.querySelector("#show-people");

let obj;

const populateFilms = (file) => {
	obj = file;
	for (let movie in file) {
		let entry = document.createElement("option");
		entry.value = file[movie].id;
		entry.textContent = file[movie].title;
		movies.append(entry);
	}
};

fetch(BASE_URL + "films")
	.then((response) => response.json())
	.then((json) => populateFilms(json))
	.catch((error) => console.log(error));

selector.addEventListener("change", (event) => {
	let movieId = event.target.value;
	for (let movie in obj) {
		if (obj[movie].id === movieId) {
			document.querySelector("#display-info h3").textContent = obj[movie].title;
			document.querySelector("#display-info p#release-year").textContent =
				obj[movie].release_date;
			document.querySelector("#display-info p#description").textContent =
				obj[movie].description;
		}
	}
});

reviewForm.addEventListener("submit", (event) => {
	event.preventDefault();
	if (!dropdown.value) {
		alert("Please select a movie first");
		return;
	}
	let review = reviewText.value;
	reviewText.value = "";
	let listItem = document.createElement("li");
	listItem.innerHTML = `<strong>${
		obj.find((item) => item.id === dropdown.value).title
	}.</strong> - ${review}`;
	reviewList.append(listItem);
});

resetButton.addEventListener("click", (event) => {
	event.preventDefault();
	reviewList.innerHTML = "";
});

showPeopleButton.addEventListener("click", (event) => {
	event.preventDefault();
	if (!dropdown.value) {
		alert("Please select a movie first");
		return;
	}
	obj.find((item) => item.id === dropdown.value).people.forEach((person) => {
		fetch(person)
			.then((response) => response.json())
			.then((obj) => addToList(obj.name))
			.catch((error) => console.log(error));
	});
});

const addToList = (name) => {
	let listItem = document.createElement("li");
	listItem.textContent = name;
	document.querySelector("#people").append(listItem);
};
