document.addEventListener("DOMContentLoaded", function(){

const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const dropText = document.getElementById("dropText");

// CLICK UPLOAD (WORKS MOBILE + DESKTOP)

dropArea.addEventListener("click", () => {
fileInput.click();
});

// FILE NAME SHOW

fileInput.addEventListener("change", function(){

if(this.files.length > 0){
dropText.innerText = this.files[0].name;
}

});

// DRAG OVER

dropArea.addEventListener("dragover",(e)=>{
e.preventDefault();
dropArea.style.background="#eef2ff";
});

// DRAG LEAVE

dropArea.addEventListener("dragleave",()=>{
dropArea.style.background="#f8f9ff";
});

// DROP FILE

dropArea.addEventListener("drop",(e)=>{

e.preventDefault();

fileInput.files = e.dataTransfer.files;

dropText.innerText = e.dataTransfer.files[0].name;

dropArea.style.background="#f8f9ff";

});

});