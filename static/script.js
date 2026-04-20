// ATS SCORE ANIMATION
document.addEventListener("DOMContentLoaded", function(){

    const progress = document.getElementById("progress");
    const scoreText = document.getElementById("scoreText");

    if(progress && scoreText){

        // sirf number extract karo
        let score = parseInt(scoreText.innerText.split(" ")[0]);

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
const dropText = document.getElementById("dropText");

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

        // file name show karo
        if(fileInput.files.length > 0){
            dropText.innerText = fileInput.files[0].name;
        }
    });

}


// FILE NAME SHOW (manual select)
if(fileInput){

    fileInput.addEventListener("change", function(){

        if(this.files.length > 0){
            dropText.innerText = this.files[0].name;
        }

    });

}