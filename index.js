const namesEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const termsEl = document.getElementById("acceptTerms");
const formEl = document.getElementById("form");
const submitBtnEl = document.getElementById("submit");

const formatDate = (date) =>
	`${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getFullYear()}`;

const minDate = new Date(
	new Date().getFullYear() - 55,
	new Date().getMonth(),
	new Date().getDate()
);
const maxDate = new Date(
	new Date().getFullYear() - 18,
	new Date().getMonth(),
	new Date().getDate()
);

const isDateValid = (givenDate) => {
	const userDate = new Date(givenDate);

	const eighteenYearsAgo = new Date();
	eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

	const fiftyFiveYearsAgo = new Date();
	fiftyFiveYearsAgo.setFullYear(fiftyFiveYearsAgo.getFullYear() - 55);

	return (
		userDate.getTime() <= eighteenYearsAgo.getTime() &&
		userDate.getTime() >= fiftyFiveYearsAgo.getTime()
	);
};

const isFormValid = () => {
	return formEl.checkValidity();
};

const getAllEntries = () => {
	let allEntries = JSON.parse(localStorage.getItem("userData")) || [];
	return allEntries;
};

const displayHistory = () => {
	const allEntries = getAllEntries();
	const historyEl = document.getElementById("userTable");

	historyEl.innerHTML = "";
	historyEl.innerHTML = `<tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
    </tr>`;
	historyEl.innerHTML += allEntries
		.map((entry) => {
			const row = Object.values(entry)
				.map((value) => `<td>${value}</td>`)
				.join("");
			return `<tr>${row}</tr>`;
		})
		.join("\n");
};

const saveToStorage = (name, email, password, dob, terms) => {
	const userData = { name, email, password, dob, terms };
	const allEntries = getAllEntries();
	allEntries.push(userData);
	localStorage.setItem("userData", JSON.stringify(allEntries));
};

formEl.addEventListener("submit", (e) => {
	const dobEl = document.getElementById("dob");

	e.preventDefault();
	if (!isFormValid()) {
		return;
	}

	if (!isDateValid(dobEl.value)) {
		alert(
			`Date must be between ${formatDate(minDate)} and ${formatDate(maxDate)}`
		);
		return;
	}

	if (isDateValid(dobEl.value) && isFormValid()) {
		saveToStorage(
			namesEl.value,
			emailEl.value,
			passwordEl.value,
			dobEl.value,
			termsEl.checked
		);
		displayHistory();
		formEl.reset();
	}
});

displayHistory();
