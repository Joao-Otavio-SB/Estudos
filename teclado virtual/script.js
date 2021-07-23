window.addEventListener('keydown', (e) => {
	audio = document.querySelector(`audio[data-key='${e.key}']`);
	var keyWhite = document.querySelector(`.white[data-key='${e.key}']`);
	var keyBlack = document.querySelector(`.black[data-key='${e.key}']`);

	if (keyWhite) keyWhite.classList.add('white-active');

	if (keyBlack) keyBlack.classList.add('black-active');

	const keysWhite = document.querySelectorAll('.white');
	const keysBlack = document.querySelectorAll('.black');

	if (keyWhite || keyBlack) {
		var play = new Audio(audio.getAttribute('src'));
		play.currentTime = 0;
		play.play();
	}

	keysWhite.forEach((key) =>
		key.addEventListener('transitionend', () => {
			key.classList.remove('white-active');
		})
	);

	keysBlack.forEach((key) =>
		key.addEventListener('transitionend', () => {
			key.classList.remove('black-active');
		})
	);
});

function playSound(e) {
	audio = document.querySelector(
		`audio[data-key='${e.srcElement.getAttribute('data-key')}']`
	);
	var keyWhite = document.querySelector(
		`.white[data-key='${e.srcElement.getAttribute('data-key')}']`
	);
	var keyBlack = document.querySelector(
		`.black[data-key='${e.srcElement.getAttribute('data-key')}']`
	);

	if (keyWhite) keyWhite.classList.add('white-active');

	if (keyBlack) keyBlack.classList.add('black-active');

	if (keyWhite || keyBlack) {
		var play = new Audio(audio.getAttribute('src'));
		play.currentTime = 0;
		play.play();
	}

	const keysWhite = document.querySelectorAll('.white');
	const keysBlack = document.querySelectorAll('.black');

	keysWhite.forEach((key) =>
		key.addEventListener('transitionend', () => {
			key.classList.remove('white-active');
		})
	);

	keysBlack.forEach((key) =>
		key.addEventListener('transitionend', () => {
			key.classList.remove('black-active');
		})
	);
}
