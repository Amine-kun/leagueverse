const champsx = document.querySelector('.champs'),
      fotCat = document.querySelector('.for-cat'),
      nationIntro = document.querySelector('.lore-content'),
      searchTerm = document.querySelector('.searchElem');




//retrieving categories from  firestore
db.collection("Categories").orderBy("id", "asc").get().then((datum) => {
    datum.forEach((category) => {
          showCats(category);
          showforCat(category);
          showIntro(category);
    });
});

//displaying them
  const showCats= (category) =>{
    let data=category.data();
        content.innerHTML += `
        <div class="container" onclick="filterSelection('${data.name}'); getIntro('${data.name}') ">
              <img src="${data.image}" alt="Avatar" class="image">
              <div class="overlay">
                <div class="text">${data.name}</div>
              </div>
         </div>
    `;
  }

//displaying footer cat section
  const showforCat= (category) =>{
    let data=category.data();
        fotCat.innerHTML += `
        <p class="forcat pointer" onclick="filterSelection('${data.name}')">${data.name}</p>
    `;
  }

const showIntro = (x) => {
  let dat =x.data();
    nationIntro.innerHTML += `
        <div class="lore-content2 filter ${dat.name}">
            <div class="cat-intro">
              <div class="cat-img">
                <img src="${dat.image}" class="img-cat pointer" onclick="location.href='/${dat.name}'">
              </div>
              <div class="cat-info">
                <p class="title pointer" onclick="location.href='/${dat.name}'">${dat.name}</p>
                <p class="special-line pointer" onclick="location.href='/${dat.name}'">${dat.tag}</p>
                <p class="desc pointer" onclick="location.href='/${dat.name}'">${dat.lore}</p>
              </div>
            </div>
              <span class="split2"></span>
              <a class="readmore pointer" onclick="location.href='/${dat.name}'">Read more about ${dat.name}</a>
      </div>
    `;
}

//filtering intro
  function getIntro(c){
  var i;
  let x = document.getElementsByClassName("filter");
        for (i = 0; i < x.length; i++) {
          w3RemoveClass(x[i], "show");
          if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
        }
}




//retrieving posts from  firestore
db.collection("Lore").get().then((posts) => {
    posts.forEach((post) => {
        showLore(post);
        getIntro("Runeterra")
    });
});

//displaying them
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





