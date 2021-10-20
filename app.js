// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");
var isChrome = !!window.chrome && !!window.chrome.webstore;
// Init SpeechSynth API
const synth = window.speechSynthesis;

let voices = [];

const getVoices = function () {
  voices = synth.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.textContent = voice.name + "(" + voice.lang + ")";

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
synth.onvoiceschanged = getVoices;

const speak = function () {
  if (synth.speaking) {
    console.error("already speaking ...");
    return;
  }
  if (textInput.value !== "") {
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = (e) => {
      console.log("done speaking ...");
    };

    speakText.onerror = (e) => {
      console.error("something is wrong ...");
    };

    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// Text form submit
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener("change", (e) => speak());
