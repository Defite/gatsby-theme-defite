/**
 * Get plural by number
 * @param {Number} value - number
 * @param {Array} cases - array of cases
 * @returns {String} case
 */

const plural = (value, cases) => {
	let n = Math.abs(value);
	n %= 100;
	if (n >= 5 && n <= 20) {
		return cases[2];
	}
	n %= 10;
	if (n === 1) {
		return cases[0];
	}
	if (n >= 2 && n <= 4) {
		return cases[1];
	}
	return cases[2];
};

export default plural;
