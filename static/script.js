// ATS SCORE ANIMATION

document.addEventListener("DOMContentLoaded", function(){

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

});


// DRAG & DROP UPLOAD

const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");

if(dropArea){

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

dropArea.style.background="#f8f9ff";

});

}


// FILE NAME SHOW

if(fileInput){

fileInput.addEventListener("change", function(){

let fileName = this.files[0].name;

dropArea.querySelector("p").innerText = fileName;

});

}