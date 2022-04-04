const canvas = document.querySelector("#canvasId");
const ctx = canvas.getContext("2d");
const elem = document.querySelector("#hBody");
const elem1 = document.querySelector("#aResult");
const result = document.querySelector("#result");
let ANIM;
const scoreTable = new ScoreTable();
const eventManager = new EventManager();
const gameManager = new GameManager();
const soundManager = new SoundManager();
let mapManager = new MapManager();
const spriteManager = new SpriteManager();
const physicManager = new PhysicManager();

let step = 1 / 15;
let counter = 0;
let dt = 0;
let now, last = timestamp();

window.onload = function () {
    document.querySelector("#records").innerHTML = scoreTable.get();
};
