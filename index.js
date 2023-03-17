let modal=document.querySelector('.modal');
let overlay=document.querySelector('.overlay');

function openMod()
{
    console.log("modal active")
    //adding the overlay-active to overlay to change opacity of modal to 1
modal.classList.add("modal-active");
  //adding the overlay-active to overlay to change opacity of overlay to 1
overlay.classList.add("overlay-active");
}
function closemodal()
{
    console.log("modal closed");
    //removing the modal view
    modal.classList.remove("modal-active");
    //removing the overlay
    overlay.classList.remove("overlay-active");
}