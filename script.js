const questions = [
	{ id: "phy-25", subject: "physics", year: 2025, topic: "Electricity", marks: 2, prompt: "A 6 Ω resistor is connected to a 12 V supply. Calculate the current through the resistor.", answer: "Use I = V ÷ R. So I = 12 ÷ 6 = 2 A. Include the unit: amperes (A)." },
	{ id: "phy-24", subject: "physics", year: 2024, topic: "Forces and motion", marks: 3, prompt: "A 0.8 kg trolley speeds up from 3 m/s to 11 m/s in 4 s. Calculate the resultant force on it.", answer: "First find acceleration: a = (11 − 3) ÷ 4 = 2 m/s². Then use F = ma: F = 0.8 × 2 = 1.6 N." },
	{ id: "phy-23", subject: "physics", year: 2023, topic: "Energy", marks: 2, prompt: "Calculate the gravitational potential energy gained when a 2.0 kg bag is lifted 1.5 m. Use g = 9.8 N/kg.", answer: "Use ΔEₚ = mgh. ΔEₚ = 2.0 × 9.8 × 1.5 = 29.4 J. The energy gained is 29.4 joules." },
	{ id: "phy-22", subject: "physics", year: 2022, topic: "Electricity", marks: 2, prompt: "A lamp is labelled 60 W, 230 V. Calculate the current it draws when operating at 230 V.", answer: "Use P = IV, rearranged to I = P ÷ V. I = 60 ÷ 230 ≈ 0.26 A." },
	{ id: "che-25", subject: "chemistry", year: 2025, topic: "Chemical changes", marks: 2, prompt: "Magnesium reacts with oxygen to form magnesium oxide. Write the balanced symbol equation.", answer: "2Mg + O₂ → 2MgO. There are two magnesium atoms and two oxygen atoms on each side." },
	{ id: "che-24", subject: "chemistry", year: 2024, topic: "Quantitative chemistry", marks: 3, prompt: "Calculate the amount, in moles, of solute in 25.0 cm³ of a 0.20 mol/dm³ solution.", answer: "Convert the volume: 25.0 cm³ = 0.0250 dm³. Use n = cV: n = 0.20 × 0.0250 = 0.0050 mol." },
	{ id: "che-23", subject: "chemistry", year: 2023, topic: "Atomic structure", marks: 2, prompt: "A chlorine atom has atomic number 17. State its electron arrangement and explain how it forms a chloride ion.", answer: "Its electron arrangement is 2,8,7. It gains one electron to fill its outer shell, forming a 1− chloride ion (Cl⁻)." },
	{ id: "che-22", subject: "chemistry", year: 2022, topic: "Acids and alkalis", marks: 2, prompt: "Write a word equation for the reaction between hydrochloric acid and sodium hydroxide.", answer: "Hydrochloric acid + sodium hydroxide → sodium chloride + water. This is a neutralisation reaction." },
	{ id: "mat-25", subject: "maths", year: 2025, topic: "Algebra", marks: 2, prompt: "Solve the equation 3x + 7 = 25.", answer: "Subtract 7 from both sides: 3x = 18. Divide by 3: x = 6. Check: 3(6) + 7 = 25." },
	{ id: "mat-24", subject: "maths", year: 2024, topic: "Graphs", marks: 2, prompt: "Find the gradient of the straight line passing through (2, 3) and (6, 11).", answer: "Gradient = change in y ÷ change in x = (11 − 3) ÷ (6 − 2) = 8 ÷ 4 = 2." },
	{ id: "mat-23", subject: "maths", year: 2023, topic: "Percentages", marks: 2, prompt: "A jacket costs £80. Its price is reduced by 15%. Calculate the sale price.", answer: "Find 15% of £80: 0.15 × 80 = £12. Subtract the discount: £80 − £12 = £68." },
	{ id: "mat-22", subject: "maths", year: 2022, topic: "Pythagoras", marks: 2, prompt: "A right-angled triangle has shorter sides of 9 cm and 12 cm. Find the length of its hypotenuse.", answer: "By Pythagoras, c² = 9² + 12² = 81 + 144 = 225. So c = √225 = 15 cm." },
	{ id: "eng-25", subject: "english", year: 2025, topic: "Language analysis", marks: 3, stimulus: "At dusk, the rain stitched silver lines across the empty road.", prompt: "How does the writer use language to create an atmosphere in this sentence?", answer: "The verb “stitched” is a metaphor that makes the rain seem as if it is sewing the road together. “Silver” suggests reflected light, while “empty” creates a lonely, quiet mood. Credit a clear point supported by a short quotation." },
	{ id: "eng-24", subject: "english", year: 2024, topic: "Persuasive writing", marks: 4, prompt: "Write a short opening to persuade your school to create a quiet study space. Use at least two persuasive methods.", answer: "Example: “Every student deserves a place to think. A quiet study room would give us the focus we need, the calm we rarely find, and the chance to do our best. Why wait to make that possible?” It uses direct address, a rule of three and a rhetorical question. Other convincing responses can also earn credit." },
	{ id: "eng-23", subject: "english", year: 2023, topic: "Poetry comparison", marks: 4, stimulus: "Poem A: “The windows held the last gold of the day.”\nPoem B: “Night poured its ink across the fields.”", prompt: "Compare how the poets present the transition from day to night.", answer: "Both poets present the change as gradual but use contrasting images. “Held the last gold” suggests warmth and light being carefully kept, while “poured its ink” makes night seem dark and fast-moving. Compare a method and its effect in each poem, then link the ideas." },
	{ id: "eng-22", subject: "english", year: 2022, topic: "Language analysis", marks: 3, stimulus: "Mara paused at the station entrance. Beyond the glass, the platform lights flickered like tired stars.", prompt: "How does the writer use language to suggest Mara’s feelings?", answer: "“Paused” hints at hesitation. The simile “like tired stars” makes the lights seem weak and fading, reflecting uncertainty or weariness. A developed answer connects a quoted word or image to a plausible feeling." }
];

const subjectNames = { all: "All subjects", physics: "Physics", chemistry: "Chemistry", maths: "Maths", english: "English" };
const completed = new Set(JSON.parse(localStorage.getItem("exam-room-completed") || "[]"));
let activeSubject = "all";
let activeYear = "all";
let searchTerm = "";
let statusFilter = "all";

const questionList = document.querySelector("#question-list");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");

function filteredQuestions() {
	const term = searchTerm.trim().toLowerCase();
	return questions.filter((question) => {
		const matchesSubject = activeSubject === "all" || question.subject === activeSubject;
		const matchesYear = activeYear === "all" || String(question.year) === activeYear;
		const matchesStatus = statusFilter === "all" || (statusFilter === "complete") === completed.has(question.id);
		const searchable = `${question.topic} ${question.prompt} ${question.stimulus || ""} ${question.answer}`.toLowerCase();
		return matchesSubject && matchesYear && matchesStatus && (!term || searchable.includes(term));
	});
}

function render() {
	const visibleQuestions = filteredQuestions();
	resultCount.textContent = visibleQuestions.length;
	questionList.replaceChildren(...visibleQuestions.map((question, index) => {
		const card = document.createElement("article");
		card.className = "question-card";
		card.dataset.id = question.id;
		const isComplete = completed.has(question.id);
		const answerId = `answer-${question.id}`;
		card.innerHTML = `
			<div class="question-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
			<div class="card-main">
				<div class="card-meta"><span class="subject-tag">${subjectNames[question.subject]}</span><span class="meta-divider"></span><span>${question.year} practice</span><span class="meta-divider"></span><span class="topic-tag">${question.topic}</span></div>
				${question.stimulus ? `<blockquote class="stimulus">${question.stimulus.replaceAll("\n", "<br>")}</blockquote>` : ""}
				<h3>${question.prompt}</h3>
				<div class="marks"><span>${question.marks}</span> marks</div>
				<div class="answer-panel" id="${answerId}" hidden><p class="answer-label">WORKED ANSWER</p><p>${question.answer}</p></div>
			</div>
			<div class="card-actions">
				<button class="answer-toggle" type="button" aria-expanded="false" aria-controls="${answerId}">Show answer <span aria-hidden="true">＋</span></button>
				<button class="complete-toggle${isComplete ? " is-complete" : ""}" type="button" aria-pressed="${isComplete}" aria-label="${isComplete ? "Mark incomplete" : "Mark complete"}"><span class="check-box" aria-hidden="true">${isComplete ? "✓" : ""}</span><span>${isComplete ? "Done" : "Complete"}</span></button>
			</div>`;
		return card;
	}));
	emptyState.hidden = visibleQuestions.length > 0;
	questionList.hidden = visibleQuestions.length === 0;
	updateProgress();
}

function updateProgress() {
	const total = questions.length;
	const done = completed.size;
	const progress = Math.min(done / total * 100, 100);
	document.querySelector("#progress-label").textContent = `${done} / ${total}`;
	document.querySelector("#progress-fill").style.width = `${progress}%`;
	document.querySelector(".progress-track").setAttribute("aria-valuenow", String(done));
	document.querySelector("#progress-note").textContent = done === total ? "Every question, covered." : done ? "Nice work. Keep the rhythm." : "A little practice adds up.";
}

document.querySelectorAll(".subject-link").forEach((button) => {
	button.addEventListener("click", () => {
		activeSubject = button.dataset.subject;
		document.querySelectorAll(".subject-link").forEach((item) => {
			const active = item === button;
			item.classList.toggle("is-active", active);
			item.setAttribute("aria-pressed", String(active));
		});
		document.querySelector("#breadcrumb-subject").textContent = subjectNames[activeSubject].toUpperCase();
		render();
	});
});

document.querySelectorAll(".year-button").forEach((button) => {
	button.addEventListener("click", () => {
		activeYear = button.dataset.year;
		document.querySelectorAll(".year-button").forEach((item) => {
			const active = item === button;
			item.classList.toggle("is-active", active);
			item.setAttribute("aria-pressed", String(active));
		});
		render();
	});
});

searchInput.addEventListener("input", () => { searchTerm = searchInput.value; render(); });
document.querySelector("#status-filter").addEventListener("change", (event) => { statusFilter = event.target.value; render(); });

questionList.addEventListener("click", (event) => {
	const card = event.target.closest(".question-card");
	if (!card) return;
	if (event.target.closest(".answer-toggle")) {
		const button = event.target.closest(".answer-toggle");
		const panel = card.querySelector(".answer-panel");
		const expanded = button.getAttribute("aria-expanded") === "true";
		button.setAttribute("aria-expanded", String(!expanded));
		button.innerHTML = expanded ? 'Show answer <span aria-hidden="true">＋</span>' : 'Hide answer <span aria-hidden="true">−</span>';
		panel.hidden = expanded;
	}
	if (event.target.closest(".complete-toggle")) {
		const button = event.target.closest(".complete-toggle");
		const id = card.dataset.id;
		if (completed.has(id)) completed.delete(id); else completed.add(id);
		localStorage.setItem("exam-room-completed", JSON.stringify([...completed]));
		render();
	}
});

document.querySelector("#clear-filters").addEventListener("click", () => {
	activeSubject = "all";
	activeYear = "all";
	searchTerm = "";
	statusFilter = "all";
	searchInput.value = "";
	document.querySelector("#status-filter").value = "all";
	document.querySelectorAll(".subject-link").forEach((item) => {
		const active = item.dataset.subject === "all";
		item.classList.toggle("is-active", active);
		item.setAttribute("aria-pressed", String(active));
	});
	document.querySelectorAll(".year-button").forEach((item) => {
		const active = item.dataset.year === "all";
		item.classList.toggle("is-active", active);
		item.setAttribute("aria-pressed", String(active));
	});
	document.querySelector("#breadcrumb-subject").textContent = "ALL SUBJECTS";
	render();
});

document.addEventListener("keydown", (event) => {
	if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
		event.preventDefault();
		searchInput.focus();
	}
});

render();
