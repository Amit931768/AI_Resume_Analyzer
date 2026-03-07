document.addEventListener("DOMContentLoaded", function(){

const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const dropText = document.getElementById("dropText");

// ATS SCORE ANIMATION

const progress = document.getElementById("progress");
const scoreText = document.getElementById("scoreText");

if(progress && scoreText){

let score = parseInt(scoreText.innerText);

let current = 0;

let interval = setInterval(()=>{

current++;

progress.style.width = current + "%";

if(current >= score){

clearInterval(interval);

}

},20);

}

// MOBILE CHECK

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if(!isMobile){

// DRAG & DROP ONLY FOR DESKTOP

dropArea.addEventListener("dragover",(e)=>{
e.preventDefault();
dropArea.style.background="#eef2ff";
});

dropArea.addEventListener("dragleave",()=>{
dropArea.style.background="#f8f9ff";
});

dropArea.addEventListener("drop",(e)=>{

e.preventDefault();

fileInput.files = e.dataTransfer.files;

if(dropText){
dropText.innerText = e.dataTransfer.files[0].name;
}

dropArea.style.background="#f8f9ff";

});

}

// FILE NAME SHOW

fileInput.addEventListener("change", function(){

if(this.files.length > 0 && dropText){
dropText.innerText = this.files[0].name;
}

});

});