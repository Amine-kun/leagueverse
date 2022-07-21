//retrieve cashed user
export const userInfo = localStorage.getItem('user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('user'))
                  : localStorage.clear();
