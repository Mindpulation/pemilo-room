const generateAnggota = (obj = {}) => {
    obj.status = false;
    return obj;
}

const uuid = () =>  {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
  }

function undian(index = 1){
  const defaultValue = "00000";
  const ctx = index.toString();
  return defaultValue.substr(0, defaultValue.length - ctx.length) + ctx;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
  
const tiket = (email = "") => {
  return `${email.charAt(0)}${email.charAt(1)}-${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}`
}

  const generateUniqCode = (now = new Date(), uniq = new String()) => {
    return `${now.getFullYear()}${now.getMonth()}${now.getMilliseconds()}${now.getDate()}(${uniq})${uuid()}`;
}

const objRoom = (obj = {}) => {
    const now = new Date();
    obj.codeRoom = generateUniqCode(now, obj.emailAdmin);
    obj.start = new Date(),
    obj.status = true
    return obj;

}

module.exports = { generateAnggota, generateUniqCode, objRoom, uuid, tiket, undian }
