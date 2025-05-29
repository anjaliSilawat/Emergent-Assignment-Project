const questions = [
  {
    question: "Pick a weekend plan:",
    options: [
      { text: "Netflix binge", img: "https://i.pinimg.com/736x/fe/30/fa/fe30fa1243141b73787a7b839c5b64d5.jpg" },
      { text: "Road trip", img: "https://i.pinimg.com/736x/1f/8e/38/1f8e38447c3001c305be169f3b3ea6f0.jpg" },
      { text: "Party all night", img: "https://i.pinimg.com/736x/29/4e/27/294e27e44d1dff7813869c2f7440c77c.jpg" },
      { text: "Reading", img: "https://i.pinimg.com/736x/49/1f/02/491f028feb6c2b671749d5f548e10351.jpg" }
    ]
  },
  {
    question: "Choose a drink:",
    options: [
      { text: "Coffee", img: "https://i.pinimg.com/736x/af/81/7b/af817b6a60d6d56cec16b3f19eca5fa6.jpg" },
      { text: "Smoothie", img: "https://i.pinimg.com/736x/da/49/1b/da491b780c929af1b59b09c77449a7df.jpg" },
      { text: "Cocktail", img: "https://i.pinimg.com/736x/6a/44/65/6a4465a5be355394e46feb9c8a0e6dd5.jpg" },
      { text: "Water", img: "https://i.pinimg.com/736x/a1/72/86/a17286a50a95eb4b972bc804c1a57e11.jpg" }
    ]
  },
  {
    question: "Ideal vacation?",
    options: [
      { text: "Mountains", img: "https://i.pinimg.com/736x/44/b6/c4/44b6c47183447b3a1e304848cf23b0f8.jpg" },
      { text: "Beach", img: "https://i.pinimg.com/736x/d7/8b/51/d78b515a914743b445ce5f352a6c8e16.jpg" },
      { text: "City tour", img: "https://i.pinimg.com/736x/47/9e/97/479e97dd373fbe37bc5d8c1be03cfea2.jpg" },
      { text: "Forest retreat", img: "https://i.pinimg.com/736x/60/bf/9e/60bf9e0d36e8b8dc91542729d7088a15.jpg" }
    ]
  },
  {
    question: "Your playlist vibe:",
    options: [
      { text: "Chillhop", img: "https://i.pinimg.com/736x/ab/77/1a/ab771a0af27866c8b901acfd3881b859.jpg" },
      { text: "EDM", img: "https://i.pinimg.com/736x/d8/b9/ee/d8b9eeeef71b5faba77f0a03163794f2.jpg" },
      { text: "Indie Rock", img: "https://i.pinimg.com/736x/64/14/4c/64144c129e33d1ce37a0859f94eb6c6e.jpg" },
      { text: "Lo-fi", img: "https://i.pinimg.com/736x/03/80/68/0380680868a3a876cf9a21c8b8b87da3.jpg" }
    ]
  },
  {
    question: "Pick a pet:",
    options: [
      { text: "Cat", img: "https://i.pinimg.com/736x/3d/4e/21/3d4e21d84f58a2cd1d8e305c6241c58a.jpg" },
      { text: "Dog", img: "https://i.pinimg.com/736x/e0/cc/0f/e0cc0f5f150e235e67b7925144709219.jpg" },
      { text: "Parrot", img: "https://i.pinimg.com/736x/49/7e/89/497e891a4beb95c51928cac81fbc5e05.jpg" },
      { text: "No pets", img: "https://i.pinimg.com/736x/c6/ba/e4/c6bae4d681b3a85be0ec5e598e827304.jpg" }
    ]
  }
];

const vibes = ["Sunset Vibe", "Hype Beast", "Zen Master", "Party Animal"];
let currentQuestion = 0;
let scores = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz");
const statsEl = document.getElementById("stats");
const restartBtn = document.getElementById("restart-btn");
const shareArea = document.getElementById("share-area");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");

    const img = document.createElement("img");
    img.src = opt.img;
    img.alt = opt.text + " image";
    btn.appendChild(img);

    const text = document.createElement("span");
    text.textContent = opt.text;
    btn.appendChild(text);

    // Highlight if already selected
    if (scores[currentQuestion] === index) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      document.querySelectorAll(".options button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      scores[currentQuestion] = index;
    };

    optionsEl.appendChild(btn);
  });

  if (currentQuestion === 0) {
  backBtn.style.visibility = "hidden";
} else {
  backBtn.style.visibility = "visible";
}

}

nextBtn.onclick = () => {
  if (scores[currentQuestion] === undefined) {
    alert("Please select one option before moving on!");
    return;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

backBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
};

function showResult() {
  const total = scores.reduce((a, b) => a + b, 0);
  const vibe = vibes[total % vibes.length];

  quizContainer.style.display = "none";
  resultContainer.style.display = "flex";

  resultEl.innerHTML = `🎉 Your Vibe is: <strong>${vibe}</strong> 🎉`;

  const statKey = `vibe-${vibe}`;
  const count = localStorage.getItem(statKey) || 0;
  localStorage.setItem(statKey, parseInt(count) + 1);

  shareArea.innerHTML = `
    <p style="display: flex; align-items: center; justify-content: center; gap: 8px;">
      <span id="share-icon" style="cursor: pointer;" title="Share on WhatsApp">📤</span>
      <span>Share your vibe with friends!</span>
    </p>
    <textarea readonly>
I got "${vibe}" on the Vibe Check Quiz 🌈✨. Try yours now!
    </textarea>
  `;

  document.getElementById("share-icon").onclick = function () {
    const message = encodeURIComponent(`I got "${vibe}" on the Vibe Check Quiz 🌈✨. Try yours now!`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  showStats();
}

function showStats() {
  let text = "<h3>Live Stats (Local) 📊</h3><ul style='list-style:none;padding:0;'>";
  vibes.forEach(v => {
    const count = localStorage.getItem(`vibe-${v}`) || 0;
    text += `<li>${v}: <strong>${count}</strong></li>`;
  });
  text += "</ul>";
  statsEl.innerHTML = text;
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  scores = [];
  resultContainer.style.display = "none";
  quizContainer.style.display = "flex";
  statsEl.innerHTML = "";
  showQuestion();
};

showQuestion();