const name = document.querySelector('.name');
const email = document.querySelector('.email');
const desc = document.querySelector('.desc');
const submit = document.querySelector('.sbm-btn');

const joinUsEmail = document.querySelector('.email2');
const joinUsSubmit = document.querySelector('.submit-icon');

submit.addEventListener('click', () => {
    if(name.value.length && email.value.length && desc.value.length){



            db.collection("Request").doc(name.value).set({
            name: name.value,
            email: email.value,
            desc: desc.value,

        })
        .then(() => {
            location.reload();
        })
        .catch((err) => {
            console.error(err);
        })
    }
})


joinUsSubmit.addEventListener('click', () => {
    if(joinUsEmail.value.length){


            db.collection("Joining Requests").add({
            RequestEmail: joinUsEmail.value,

        })
        .then(() => {
            location.reload();
        })
        .catch((err) => {
            console.error(err);
        })
    }
})