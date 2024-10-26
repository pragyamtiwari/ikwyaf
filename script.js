const questions = [
    {
        question: "How do you pronounce \"Forget about it\"?",
        options: ["Fuhgeddaboudit", "Forget about it", "Bananas"],
    },
    {
        question: "What do you ask for if you're thirsty?",
        options: ["A bottle of water", "A bo'oh'o'wa'er", "I go to a water fountain"],
    },
    {
        question: "Is deep-dish pizza good?",
        options: ["No", "Nope", "Nyet"],
    },
    {
        question: "Spell what blue, green, and red are.",
        freeResponse: true
    }
];

let currentQuestion = 0;

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("submit-button").addEventListener("click", showSuspense);
document.getElementById("proceed-button").addEventListener("click", showResult);

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const freeResponseContainer = document.getElementById("free-response-container");

    if (currentQuestion < questions.length - 1) {
        const question = questions[currentQuestion];
        document.getElementById("question-text").innerText = question.question;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";
        question.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-button");
            button.addEventListener("click", nextQuestion);
            optionsContainer.appendChild(button);
        });
        questionContainer.classList.remove("hidden");
        freeResponseContainer.classList.add("hidden");
    } else {
        document.getElementById("free-response-text").innerText = questions[currentQuestion].question;
        questionContainer.classList.add("hidden");
        freeResponseContainer.classList.remove("hidden");
    }
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showSuspense() {
    document.getElementById("free-response-container").classList.add("hidden");
    document.getElementById("suspense-screen").classList.remove("hidden");
}

function showResult() {
    document.getElementById("suspense-screen").classList.add("hidden");

    fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(data => {
            // Update the header to display the city name dynamically
            document.querySelector(".final").innerHTML = `You are in ${data.city}!`;

            const locationDetails = `
                City: ${data.city}<br>
                Region: ${data.region}<br>
                Region Code: ${data.region_code}<br>
                Country: ${data.country}<br>
                Country Name: ${data.country_name}<br>
                Postal Code: ${data.postal}<br>
                Latitude: ${data.latitude}<br>
                Longitude: ${data.longitude}<br>
                IP Address: ${data.ip}<br>
                Timezone: ${data.timezone}<br>
                Network Provider: ${data.org}<br>
                Device: ${navigator.userAgent}<br>
                Current Time: <span id="current-time"></span>
            `;
            document.getElementById("location-details").innerHTML = locationDetails;
            document.getElementById("result-screen").classList.remove("hidden");
            updateTime(data.timezone);
        })
        .catch(error => {
            document.querySelector(".final").innerText = "Unable to determine location.";
            console.error(error);
        });
}

function updateTime(timezone) {
    function updateClock() {
        const now = new Date().toLocaleString("en-US", { timeZone: timezone });
        document.getElementById("current-time").innerText = now;
    }
    updateClock();
    setInterval(updateClock, 1000);
}
