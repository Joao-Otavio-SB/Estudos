let smartWatch = document.querySelector("#smartWatch");
smartWatch.src = "./assets/blue.png";

let colorPalette = document.querySelector(".colors");

let time = document.querySelector("#timeText");
let heart = document.querySelector("#heartDiv");
let heartRate = document.querySelector("#heartRate");
heart.style.display = "none";

colorPalette.addEventListener("click", (e) => {
	switch (e.target.id) {
		case "blue":
			smartWatch.src = "./assets/blue.png";
			break;
		case "purple":
			smartWatch.src = "./assets/purple.png";
			break;
		case "black":
			smartWatch.src = "./assets/black.png";
			break;
		case "red":
			smartWatch.src = "./assets/red.png";
			break;
		case "pink":
			smartWatch.src = "./assets/pink.png";
			break;
	}
});

updateClock();

function updateClock() {
	const currentTime = new Date();

	time.innerHTML =
		currentTime
			.getHours()
			.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
		":" +
		currentTime
			.getMinutes()
			.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
		":" +
		currentTime
			.getSeconds()
			.toLocaleString("en-US", { minimumIntegerDigits: 2 });

	setTimeout(updateClock, 1000);
}

function change(event) {
	console.log(event.target);

	if (event.target.id == "heartBtn") {
		time.style.display = "none";
		heart.style.display = "";
		heartRate.innerHTML = Math.floor(Math.random() * 100) + 60;
	} else {
		time.style.display = "";
		heart.style.display = "none";
	}
}

function BUY() {
	alert("BOUGHT!!!");
}
