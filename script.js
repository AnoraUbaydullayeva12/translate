const apiUrl = `https://api.mymemory.translated.net/get`;
const languages = {
  en: "English",
  uz: "Uzbek",
  ru: "Russian",
  fr: "French",
  de: "German",
  es: "Spanish",
  zh: "Chinese",
  ar: "Arabic",
};

document.addEventListener("DOMContentLoaded", () => {
  const inputLang = document.getElementById("inputLang");
  const outputLang = document.getElementById("outputLang");
  Object.entries(languages).forEach(([code, name]) => {
    inputLang.innerHTML += `<option value="${code}">${name}</option>`;
    outputLang.innerHTML += `<option value="${code}">${name}</option>`;
  });
});

document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value;
  const fromLang = document.getElementById("inputLang").value;
  const toLang = document.getElementById("outputLang").value;
  if (!text) return;

  try {
    const response = await fetch(
      `${apiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
    );

    if (!response.ok) throw new Error("Failed to fetch translation");

    const data = await response.json();

    if (data.responseData.translatedText) {
      document.getElementById("outputText").value =
        data.responseData.translatedText;
    } else {
      document.getElementById("outputText").value =
        "Translation not available.";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("outputText").value =
      "An error occurred while translating.";
  }
});

document.querySelectorAll(".speak-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const textToRead = document.getElementById(targetId).value;
    if (textToRead) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      const selectedLang = document.getElementById("outputLang").value;
      utterance.lang = selectedLang;
      window.speechSynthesis.speak(utterance);
    }
  });
});
