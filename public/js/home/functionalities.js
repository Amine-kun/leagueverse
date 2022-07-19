//toggle user menu 
function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
        toggleMenu.classList.toggle("active");
      }


//toggle side menu
function sideMenuToggle() {
  sidemenu.classList.toggle("show-sideMenu");
}


//set search Term
function searchLocation(){
  location.href=`/posts/search/${searchTerm.value}`;
}