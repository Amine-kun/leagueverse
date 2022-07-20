const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const path = require('path'); 
const fileupload = require('express-fileupload');
const bcrypt= require('bcrypt-nodejs');

//firebase SDK
const {initializeApp} = require('firebase/app');
const {collection, getFirestore, getDocs , query, where} = require('firebase/firestore');

//linking to firebase
let firebaseConfig = {
    apiKey: "AIzaSyCWYl3gZhXwc9Dgfw-jQm2MTg77-zJDq7E",
    authDomain: "league-verse.firebaseapp.com",
    projectId: "league-verse",
    storageBucket: "league-verse.appspot.com",
    messagingSenderId: "894553556038",
    appId: "1:894553556038:web:4faf1e5bed3ed9ecd97647"
  };
 //calling the functions
const fire = initializeApp(firebaseConfig);
const db= getFirestore(fire);

let initial_path = path.join(__dirname, "public");

const app = express();


app.use(express.static(initial_path));
app.use(fileupload());
app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res)=>{
	res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/:id', (req, res)=>{
	res.sendFile(path.join(initial_path, "post.html"));
})

app.get('/path/login', (req, res)=>{
	res.sendFile(path.join(initial_path, "login.html"));
})

app.get('/path/request', (req, res)=>{
	res.sendFile(path.join(initial_path, "request.html"));
})

app.get('/posts/search/*', (req, res)=>{
	res.sendFile(path.join(initial_path, "search.html"));
})
	

app.get('/path/upload', (req, res)=>{
	res.sendFile(path.join(initial_path, "upload.html"));
})


app.post('/path/login', (req, res)=>{
	const {email, pass} = req.body;
	const col= collection(db,'Login');

	const col2= collection(db,'Users');
	const q = query(col2, where("Email","==",email));

			if (!email || !pass) 
			return res.status(404).json('fields are empty');

			getDocs(col).then((data)=> {
				let users =[];
				data.docs.forEach((doc)=>{
					let data = doc.data();
					users.push(data);
				})
					const hash = bcrypt.hashSync(pass);
					const isValid = bcrypt.compareSync(pass, users[0].password);	
					if (isValid) {

						getDocs(q).then((data)=> {
							data.docs.forEach((doc)=>{
								let data = doc.data();
									res.json(data);
							})}).catch((err)=>console.log(err))

						} else {
							res.status(404).json('wrong credentials')
						}

			}).catch((err)=> console.log(err));

})

app.post('/path/upload', (req, res)=>{
	let file = req.files.image;
	let date = new Date();
	let imageName = date.getDate() + date.getTime() + file.name;
	let url = 'public/imageHandler/' + imageName;


	file.mv(url, () =>{
			res.json(`imageHandler/${imageName}`)
	})
})

 app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running")
 })