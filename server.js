const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const path = require('path'); 
const {uuid} = require("uuidv4");
const fileupload = require('express-fileupload');
const bcrypt= require('bcrypt-nodejs');
const app = express();

const admin = require('firebase-admin');
const {cert } = require('firebase-admin/app');
const { getStorage, ref} = require('firebase-admin/storage');

const serviceAccount = require('./serviceAccountKey.json');



//firebase SDK
const {initializeApp} = require('firebase/app');
const {collection, getFirestore, getDocs , query, where} = require('firebase/firestore');

//linking to firebase
let firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: "league-verse.firebaseapp.com",
    projectId: "league-verse",
    storageBucket: "league-verse.appspot.com",
    messagingSenderId: "894553556038",
    appId: process.env.APP_ID
  };

 // Initialize Firebase-admin-storage (for storing the uploaded imgs)
admin.initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'league-verse.appspot.com/'
});
const firebaseStorage = getStorage();
const bucket = firebaseStorage.bucket();


 //calling the functions
const fire = initializeApp(firebaseConfig);
const db= getFirestore(fire);

let initial_path = path.join(__dirname, "public");





app.use(express.static(initial_path));
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
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

	//validatin the email
	let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
	
	if (!email || !pass) 
			return res.status(404).json('fields are empty');

	if (emailRegex.test(email)){
			const q = query(col2, where("Email","==",email));

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
	} else {
		return res.status(404).json('enter a valid email form');
	}	

})

app.post('/path/upload', (req, res)=>{
	let file = req.files.image;

	let date = new Date();
	let imageName = date.getDate() + date.getTime() + file.name;
	let url = 'public/imageHandler/' + imageName;
	const imgID = uuid();


			file.mv(url, () =>{
					console.log("file uploaded");
			})

			bucket.upload(file.tempFilePath, {
		                          destination:`champs/${imageName}`,
		                          gzip: true,
		                          metadata: {
		                            cacheControl: 'public, max-age=31536000',
		                              firebaseStorageDownloadTokens: imgID
		                          }

		                        }).then((data)=>{
		                        	let file = data[0];
		                        		 let imageUrl= Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name 
                                            + "/o/" 
                                            + encodeURIComponent(file.name)  
                                            + "?alt=media&token=" 
                                            + imgID)

		                        		 .then((url)=> res.json(url))

		                        }).catch((err)=>
		                        console.error('ERROR:', err));
				})


 app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running")
 })