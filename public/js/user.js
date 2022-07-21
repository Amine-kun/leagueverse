//retrieve cashed user
const userInfo = localStorage.getItem('user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('user'))
                  : localStorage.clear();

module.exports = {
  userInfo,
};