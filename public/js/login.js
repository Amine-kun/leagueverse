const email = document.getElementById('email');
const pass = document.getElementById('pass');
const errMsg = document.querySelector('.err-msg');
const Logining = document.querySelector('.login');
var data1 = '';
var data2 = '';



		email.addEventListener('change', () => {
	    	data1 = email.value;
		});
		pass.addEventListener('change', () => {
		    data2 = pass.value;
		})

const sendData = async() =>{
			Logining.innerText="Logining...";
			await fetch('https://leagueverse-production.up.railway.app/path/login',{
					method:'post',
					headers:{'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: data1,
						pass: data2
					})
				})
				.then(res=>res.json())
				.then(data =>{
					Logining.innerText="Logining...";
					if (data.id){
						localStorage.setItem('user', JSON.stringify(data));
						location.href='/';
					}
					else {
						errMsg.style.display = "block";
						setTimeout(()=>{errMsg.style.display = "none";},1000)
						Logining.innerText="Try Again";
					}
				})

			}
