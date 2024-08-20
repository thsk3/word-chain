const API_KEY = "";
const url = new URL("https://opendict.korean.go.kr/api/search");
url.searchParams.set("key", API_KEY);
url.searchParams.set("req_type", "json");
url.searchParams.set("advanced", "y");
url.searchParams.set("pos", "1");

const $gameReadyWrap = document.querySelector(".game-ready-wrap");
const $gameResultWrap = document.querySelector(".game-result-wrap");
const $startBtn = document.querySelector(".start-btn");
const $retryBtn = document.querySelector(".retry-btn");
const $resultScore = document.querySelector(".game-result-score");
const $highScore = document.querySelector(".game-high-score");

const $gameLife = document.querySelector(".game-life");
const $gameScore = document.querySelector(".game-score > span");
const $gameWord = document.querySelector(".game-word > span");
const $gameDes = document.querySelector(".game-description");
const $gameInput = document.querySelector(".game-input-wrap > input");
const $gameBtn = document.querySelector(".game-input-wrap > button");

const $timerLine = document.querySelector(".timer-line");
const $timerSec = document.querySelector(".timer-sec");

let startWord = ["참치", "라면", "양파", "피자", "우유", "감자", "보리차", "딸기", "토마토", "김치"];
let usedWord = [];
/** [마지막 글자, 두음 법칙이 적용된 마지막 글자] */
let lastText = ["", ""];
let dText = "";
let gameScore = 0;
let lifeSize = 3;
let highScore = 0;
let intervalId;

const renderGame = () => {
    highScore = localStorage.getItem("gameScore") || 0;
    usedWord = [];
    let word = startWord[Math.floor(Math.random() * startWord.length)];
    usedWord.push(word);
    gameScore = 0;
    lifeSize = 3;
    lastText[0] = word[word.length - 1];
    lastText[1] = dueum(word[word.length - 1]);
    if (lastText[0] !== lastText[1]) {
        dText = `(${lastText[1]})`;
    }
    $gameDes.textContent = "";
    $gameWord.textContent = word + dText;
    $gameScore.textContent = gameScore;
    resetLife();
    timer();
};

const resetLife = () => {
    let life = [...$gameLife.children];
    life.forEach((l) => {
        l.classList.remove("broken");
    });
};

const checkWord = async (inputWord) => {
    let word = inputWord.trim();
    if (word.length <= 1) {
        calculateScore("wrongWord");
        return;
    }
    let isStartLastText = lastText.includes(word[0]);
    let isExistWord = (await fetchData(word)).length > 0 ? true : false;
    let isUsedWord = usedWord.includes(word);

    if (isStartLastText && isExistWord && !isUsedWord) {
        lastText[0] = word[word.length - 1];
        lastText[1] = dueum(word[word.length - 1]);
        if (lastText[0] !== lastText[1]) {
            dText = `(${lastText[1]})`;
        } else {
            dText = "";
        }
        $gameWord.textContent = word + dText;
        usedWord.push(word);
        calculateScore("ok");
    } else if (!isStartLastText || !isExistWord) {
        calculateScore("wrongWord");
    } else if (isUsedWord) {
        calculateScore("usedWord");
    }
};

const fetchData = async (query) => {
    try {
        let data = [];
        url.searchParams.set("q", query);
        await fetch(url)
            .then((r) => r.json())
            .then((result) => (data = result.channel.item));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const calculateScore = (type) => {
    switch (type) {
        case "ok":
            $gameDes.textContent = "잘 하셨습니다!";
            $gameDes.style.color = "#c7ffc4";
            gameScore += 10;
            timer();
            break;
        case "wrongWord":
            $gameDes.textContent = "잘못된 단어입니다.";
            $gameDes.style.color = "#ffcbcb";
            gameScore -= 30;
            editLife();
            break;
        case "usedWord":
            $gameDes.textContent = "이미 사용한 단어입니다.";
            $gameDes.style.color = "#ffcbcb";
            gameScore -= 10;
            editLife();
            break;
        default:
        // console.log("e");
    }
    $gameScore.textContent = gameScore;
};

const editLife = () => {
    let life = [...$gameLife.children];
    lifeSize -= 1;
    if (lifeSize < 1) {
        stopGame();
        return;
    } else {
        life.forEach((l, i) => {
            if (i >= lifeSize) {
                l.classList.add("broken");
            }
        });
        timer();
    }
};

const timer = () => {
    clearInterval(intervalId);
    intervalId = null;
    let endTime = new Date(Date.now() + 10000);
    $timerSec.textContent = 10;
    $timerLine.style.animation = "none";
    void $timerLine.offsetWidth;
    $timerLine.style.animation = "timer 10s linear";

    intervalId = setInterval(() => {
        const now = Date.now();
        const end = endTime.getTime();
        const timeLeft = Math.ceil((end - now) / 1000);
        $timerSec.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            editLife();
        }
    }, 1000);
};

const stopGame = () => {
    $gameResultWrap.classList.remove("hidden");
    $resultScore.textContent = gameScore;
    let max = Math.max(gameScore, highScore);
    localStorage.setItem("gameScore", max);
    $highScore.textContent = max;
    clearInterval(intervalId);
};

const jongseong = "Xㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
const dueum = (word) => {
    if (!word) return "";
    let charCode = word.charCodeAt();
    if (charCode < "가".charCodeAt() || charCode > "힣".charCodeAt()) return word;
    switch (0 | ((charCode - "가".charCodeAt()) / jongseong.length)) {
        // 녀, 뇨, 뉴, 니
        case 48:
        case 54:
        case 59:
        case 62:
            charCode += 5292;
            break;
        // 랴, 려, 례, 료, 류, 리
        case 107:
        case 111:
        case 112:
        case 117:
        case 122:
        case 125:
            charCode += 3528;
            break;
        // 라, 래, 로, 뢰, 루, 르
        case 105:
        case 106:
        case 113:
        case 116:
        case 118:
        case 123:
            charCode -= 1764;
            break;
    }
    return String.fromCharCode(charCode);
};

$gameInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWord(e.target.value);
        $gameInput.focus();
        $gameInput.value = "";
    }
});
$gameBtn.addEventListener("click", () => {
    checkWord($gameInput.value);
    $gameInput.focus();
    $gameInput.value = "";
});
$startBtn.addEventListener("click", () => {
    renderGame();
    $gameReadyWrap.classList.add("hidden");
});
$retryBtn.addEventListener("click", () => {
    $gameResultWrap.classList.add("hidden");
    $gameReadyWrap.classList.remove("hidden");
});
