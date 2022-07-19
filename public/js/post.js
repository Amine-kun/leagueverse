let Id= decodeURI(location.pathname.split("/").pop());
const pageTitle = document.getElementById('page-title');
const rlp = document.querySelector('.related-posts-div');
const details= document.querySelector('.champ-details');
const nation2 = document.querySelector('.text2');
const champBG = document.querySelector('.champ-into');

                  
//making fetch request to get the post details
db.collection("Lore").where("title","==", Id).get().then((post) => {
    post.forEach((data) => {
       	setData(data);
    });
});
//making fetch request to get the nations
db.collection("Categories").where("name","==", Id).get().then((post) => {
    post.forEach((data2) => {
       	setData(data2);
    });
});

const setData = (data) =>{
	let ttl = data.data();
	if (ttl.title) {
				pageTitle.innerHTML += `
					Lore | ${ttl.title}
				`;
							let detail = data.data();
							let related = detail.nation;
							champback(detail, ttl);
							postDetails(detail, ttl);
							justauselessfucntion(detail, ttl);
								db.collection("Lore").where("nation","==", related).get().then((data) => {
									let Rel = [];
										 data.forEach((datum) => {
								    	let x =datum.data();
								   		 if(x.title != detail.title) Rel.push(x);
								    });
								    			RelatedPosts(Rel);
								});			
	}
	else if(ttl.name){
				pageTitle.innerHTML += `
					Nation | ${ttl.name}
				`;
							let detail = data.data();
							let related = detail.name;
							champback(detail, ttl);
							postDetails(detail, ttl);
							justauselessfucntion(detail, ttl);
								db.collection("Lore").where("nation","==", related).get().then((data) => {
									let Rel = [];
										 data.forEach((datum) => {
								    	let x =datum.data();
								   		 if(x.title != detail.title) Rel.push(x);
								    });
								    			RelatedPosts(Rel);
								});
	}
}

const champback=(data, col)=>{

	champBG.innerHTML += `
		<img src="${data.image}" alt="img" class="champ-img">
	`;
}

const postDetails = (data, col) =>{
		if(col.title){
				let {title, description, image, lore, nation, postedBy, createdAt}=data;
				details.innerHTML += `
						<div class="postedby floating">
						                        <p class="userName global-color pointer">Posted By: ${postedBy.name}</p>
						                        <p class="userName global-color pointer">At: ${createdAt}</p>                     
						  </div>
							<p class="title">${title}</p>
								<div class="underTitle">
									<span class="line"></span>
									<p class="tag">${description}</p>
									<span class="line"></span>
								</div>
							<p class="lore">${lore}</p>
				`;		
			} else if (col.name){
					let {image, lore, name, tag}=data;
					details.innerHTML += `
								<p class="title">${name}</p>
									<div class="underTitle">
										<span class="line"></span>
										<p class="tag">${tag}</p>
										<span class="line"></span>
									</div>
								<p class="lore">${lore}</p>
					`;
			}
}

const justauselessfucntion = (data, col) =>{
		if (col.title){
			nation2.innerHTML += `
				Other ${data.nation} Champions
			`;
		} else if (col.name){
					nation2.innerHTML += `
					 ${data.name} Champions
				`;
		}
}

const RelatedPosts =(array)=>{
	if (array.length){
	array.forEach((postar)=>{
		let {title, description, image, lore, nation, postedBy, createdAt}=postar;
				rlp.innerHTML +=`
							<div class="champX" onclick="location.href='/${title}'">
					                <p class="lore-cat">${nation}</p>
					                <img src="${image}" alt="img" class="champXimg pointer">
					                <p class="titleX global-color pointer">${title}</p>
					                <p class="descX global-color pointer">${description}</p>
					                  <div class="postedby">
					                    <img src="${postedBy.img}" class="userp-p pointer">
					                      <div class="timeName">
					                        <p class="userName global-color pointer">${postedBy.name}</p>
					                        <p class="time">${createdAt}</p>                       
					                      </div>
					                  </div>
					              </div>
			`;
	})} else {
		rlp.innerHTML += `
			<p>There no related posts rn</p>
		`;
	}
	
}


