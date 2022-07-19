let Id= decodeURI(location.pathname.split("/").pop());
console.log(Id);
const champsx=document.querySelector('.searched');



 const searchByTitle = ()=>{
      db.collection("Lore").where("title","==", Id).get().then((posts) => {
                      posts.forEach((post) => {
                        showLore(post);
                    });
                });
 }       
searchByTitle();


const searchByNation =()=>{
        db.collection("Lore").where("nation","==", Id).get().then((posts) => {
                        posts.forEach((post) => {
                            showLore(post);
                        })
                    });  
}
searchByNation();



 const showLore= (post) =>{
      let data = post.data();
      let {image, title, description, lore, postedBy ,nation ,createdAt} = data;
        champsx.innerHTML += `
       <div class="${nation} Runeterra filterDiv champX" onclick="location.href='/${title}'">
                <p class="lore-cat">${nation}</p>
                <img src="${image}" class="champXimg pointer">
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
  }