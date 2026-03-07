document.addEventListener("DOMContentLoaded", function(){

const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const dropText = document.getElementById("dropText");


// CLICK UPLOAD (MOBILE + DESKTOP)

dropArea.addEventListener("click", function(){
    fileInput.click();
});


// FILE NAME SHOW AFTER SELECT

fileInput.addEventListener("change", function(){

    if(fileInput.files.length > 0){
        dropText.innerText = fileInput.files[0].name;
    }

});


// DRAG OVER (DESKTOP)

dropArea.addEventListener("dragover", function(e){

    e.preventDefault();
    dropArea.style.background = "#eef2ff";

});


// DRAG LEAVE

dropArea.addEventListener("dragleave", function(){

    dropArea.style.background = "#f8f9ff";

});


// DROP FILE (DESKTOP)

dropArea.addEventListener("drop", function(e){

    e.preventDefault();

    const files = e.dataTransfer.files;

    if(files.length > 0){
        dropText.innerText = files[0].name;
    }

    dropArea.style.background = "#f8f9ff";

});

});