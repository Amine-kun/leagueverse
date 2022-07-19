const home= document.getElementsByClassName('home'),
		cat= document.getElementsByClassName('cat'),
		lore= document.getElementsByClassName('lore'),
		contact= document.getElementsByClassName('contact');


function scrollCat(){
		for(var i=0; i< cat.length; i++){
		    cat[i].addEventListener('click', () => {
				window.scrollTo(0, 200);
			})
		}
}
scrollCat();

function scrollLore(){
		for(var i=0; i< lore.length; i++){
		   lore[i].addEventListener('click', () => {
				window.scrollTo(0, 700);
		})
		}
}
scrollLore();

function scrollContact(){
		for(var i=0; i< contact.length; i++){
		    contact[i].addEventListener('click', () => {
				window.scrollTo(0, 2350);
			})
		}
}
scrollContact();

