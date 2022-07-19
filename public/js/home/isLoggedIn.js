const isSignedBtns = document.querySelector('.header-btns'),
      sidemenu = document.querySelector('.sideMenu'),
      sideMenuUser= document.querySelector('.userP');



//user isLoggedIn check
const isLoggedIn=()=> {
    if (userInfo){ 
           isSignedBtns.innerHTML += `
              
                <div class="action">
                  <div class="profile" onclick="menuToggle();">
                    <img src="${userInfo.userProfile}" />
                  </div>
                  <div class="menu">
                    <h3>Welcome ${userInfo.userName},</h3>
                    <ul>
                      <li>
                        <a href="/path/upload">Upload</a>
                      </li>
                      <li>
                        <a href="/" onclick="signOutFunction();">Inbox</a>
                      </li>
                      <li>
                        <a href="/" onclick="signOutFunction();">Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
         `; 

          sideMenuUser.innerHTML +=`
                <div class="picture">
                    <img src="${userInfo.userProfile}" class="profile-img"/>
                  </div>
                <h3 class="username">${userInfo.userName}</h3>
          `; 
           sidemenu.innerHTML += `
              <a href="/" class="general-btn login-btn" style="margin-top:auto ; margin-bottom:50px;" onclick="signOutFunction();">Logout</a>
                `;
               } else {
           isSignedBtns.innerHTML += `
            <a href="/path/login" class="general-btn login-btn">login</a>
           `;
           sideMenuUser.innerHTML +=`
               <a href="/path/login" class="general-btn login-btn">login</a>
          `;
         }

}
isLoggedIn();


//Loggin out
const signOutFunction = () =>{
     localStorage.clear();
}
