export const comma = (target, symbol = ",", fixed = 2) => {
	if (!target) return 0

	let num = parseFloat(target)

	if (num % 1 === 0) {
		num = num.toFixed(0)
	} else {
		num = num.toFixed(fixed)
	}

	if (num.includes(".")) {
		while (num[num.length - 1] === "0") {
			num = num.slice(0, num.length - 1)
		}
		if (num[num.length - 1] === ".") {
			num = num.slice(0, num.length - 1)
		}
	}

	if (num.split(".").length > 1 && fixed !== 2) {
		return `${num
			.split(".")[0]
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, symbol)}.${num.split(".")[1]}`
	} else {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol)
	}
}

export const purgeNumber = (target) => {
	// remove all non-digit symbols except first dot, add zero to start if dot is a first symbol
	// changes first coma to dot
	// returns in format 1012.123124324 or 0.123124214
	const numArray = target.replace(",", ".").replace(/[^0-9.]/g, "").split(".");
	const afterDot = numArray.slice(1).join("");
	const purgedString = BigInt(numArray[0] || '0').toString() + (numArray.length > 1 ? '.' + afterDot : '')
	return purgedString;
}

export const prettyNumber = (target, decimalsCount = 12) => {
	// gets purged num string returns i
	// returns number in format 10 122.123213213
	const targetNumber = parseFloat(target)
	const targetStringWithComas = targetNumber.toLocaleString('en-us', {
		maximumFractionDigits: decimalsCount,
	})
	const lastSymbol = target[target.length - 1] === "." ? "." : ""
	return targetStringWithComas.replaceAll(",", "\xa0") + lastSymbol
}
