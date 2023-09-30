
let langOption = document.querySelectorAll('select');
let fromText = document.querySelector('.fromText');
let transText = document.querySelector('.toTranslate');
let fromVoice = document.querySelector('.from');
let toVoice = document.querySelector('.to');
let cpyBtn = document.querySelector('.bx-copy');
let countValue = document.querySelector('.code_length');
let exchanglang = document.querySelector('.bx-transfer');
let boddy = document.querySelector('.Property_from');
let boddy2 = document.querySelector('.Property_trans');
let area = document.querySelector('.translator_property');

langOption.forEach((get, con) => {
    for (let countryCode in language) {
        let selected;
        if (con == 0 && countryCode == "en-GB") {
            selected = "selected";
        } else if (con == 1 && countryCode == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]} </option>`;
        get.insertAdjacentHTML('beforeend', option);
    }
})

fromText.addEventListener('input', function () {
    let content = fromText.value,
        fromContent = langOption[0].value,
        transContent = langOption[1].value;
    let transLINK = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromContent}&tl=${transContent}&dt=t&q=${encodeURI(
        content
    )}`;

    fetch(transLINK)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            transText.value = json[0].map((item) => item[0]).join("");
        })
        .catch((error) => {
            console.log(error);
        });
})

fromVoice.addEventListener('click', function () {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langOption[0].value;
    speechSynthesis.speak(fromTalk);
})

toVoice.addEventListener('click', function () {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang = langOption[1].value;
    speechSynthesis.speak(fromTalk);
})

cpyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(transText.value);
})

fromText.addEventListener('keyup', function () {
    countValue.innerHTML = `${fromText.value.length}/5,000`;
})

exchanglang.addEventListener('click', function () {
    let tempText = fromText.value;
    fromText.value = transText.value;
    transText.value = tempText;
    let tempOpt = langOption[0].value;
    langOption[0].value = langOption[1].value;
    langOption[1].value = tempOpt;
})

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}


boddy.addEventListener("click", changebg);
boddy2.addEventListener("click", changebg);
function changebg() {
    const randomColor = `rgb(${random(255)},${random(255)},${random(255)})`;
    area.style.borderColor = randomColor;
}
