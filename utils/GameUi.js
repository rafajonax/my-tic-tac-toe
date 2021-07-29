export class GameUi {
	testCollision(el1 = {}, el2 = {}, direction) {
		if (
			!el1.element ||
			!el2.element ||
			!el1.element.getClientRects().length ||
			!el2.element.getClientRects().length
		)
			return;
		const adjusts = {
			top: 0,
			right: 0,
			left: 0,
			bottom: 0,
		};

		el1.adjusts = Object.assign({}, adjusts, el1.adjusts);
		el2.adjusts = Object.assign({}, adjusts, el2.adjusts);

		const el1Rects = JSON.parse(
			JSON.stringify(el1.element.getClientRects()[0])
		);
		const el2Rects = JSON.parse(
			JSON.stringify(el2.element.getClientRects()[0])
		);

		Object.keys(adjusts).forEach((key) => {
			el1Rects[key] += el1.adjusts[key];
			el2Rects[key] += el2.adjusts[key];
		});

		const leftObject = el1Rects.left <= el2Rects.left ? el1Rects : el2Rects;
		const rightObject = leftObject === el1Rects ? el2Rects : el1Rects;
		const topObject = el1Rects.top <= el2Rects.top ? el1Rects : el2Rects;
		const bottomObject = topObject === el1Rects ? el2Rects : el1Rects;
		switch (direction) {
			case "vertical":
				if (leftObject.right >= rightObject.left) return true;
				break;
			case "vertical-top":
				if (leftObject.right >= rightObject.left && topObject === el1Rects)
					return true;
				break;
			case "vertical-bottom":
				if (leftObject.right >= rightObject.left && bottomObject === el1Rects)
					return true;
				break;
			case "horizontal":
				if (topObject.bottom >= bottomObject.top) return true;
				break;
			case "horizontal-left":
				if (topObject.bottom >= bottomObject.top && leftObject === el1Rects)
					return true;
				break;
			case "horizontal-rigth":
				if (topObject.bottom >= bottomObject.top && rightObject === el1Rects)
					return true;
				break;
			default:
				if (
					leftObject.right >= rightObject.left &&
					topObject.bottom >= bottomObject.top
				)
					return true;
		}
		return false;
	}
	hideElement(element) {
		element.classList.add("hide");
	}
	showElement(element) {
		element.classList.remove("hide");
	}
	playAudio(audioOptions) {
		const audio = audioOptions.audio;
		audio.pause();
		audio.currentTime = 0;
		setTimeout(() => audio.play(), 10);
	}
	createAudios(audios) {
		Object.keys(audios).forEach((key) => {
			const audioOptions = audios[key];
			const audio = new Audio(audioOptions.path);
			if (audioOptions.loop) audio.loop = true;
			if (audioOptions.volume != null) audio.volume = audioOptions.volume;
			audios[key].audio = audio;
		});
	}
}
