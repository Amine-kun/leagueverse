const opt=document.querySelector('.option');
const postName = document.querySelector('.name');
const postTitle = document.querySelector('.title');
const postAbout = document.querySelector('.about');
const image = document.querySelector('.image');
const publish = document.querySelector('.submit');  

let imagePath;
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const userInfo = localStorage.getItem('user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('user'))
                  : localStorage.clear();
                  

//retrieving categories from  firestore
db.collection("Categories").orderBy("id", "asc").get().then((datum) => {
    datum.forEach((category) => {
        showCats(category);

    });
});

const showCats= (category) =>{
    let data=category.data();
        opt.innerHTML += `
        <option>${data.name}</option>
    `;
  }



image.addEventListener('change', ()=>{
    uploadImage(image);
})

const uploadImage = (imagefile) => {
    const file = imagefile.files[0];
            const formdata= new FormData();
            formdata.append('image',file);
                fetch('https://leagueverse.herokuapp.com/path/upload',{
                    method: 'post',
                    body: formdata
                }).then(res=>res.json())
                    .then((data)=>{
                        imagePath = data;
                        console.log(data);
                    })
}


publish.addEventListener('click', () => {
    if(postName.value.length && postTitle.value.length && postAbout.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let name = postName.value.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${name}-${id}`;
        let date = new Date();

       //pucblishing doc to firestore 
        db.collection("Lore").doc(docName).set({
            title: postName.value,
            description: postTitle.value,
            lore: postAbout.value,
            nation:opt.value,
            image: imagePath,
            postedBy:{
                img: userInfo.userProfile,
                name: userInfo.userName,
                userId: userInfo.id
            },
            createdAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {
            location.href = `/${postName.value}`;
        })
        .catch((err) => {
            console.error(err);
        })
    }
})