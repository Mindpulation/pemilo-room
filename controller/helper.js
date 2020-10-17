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
  
  const generateUniqCode = (now = new Date(), uniq = new String()) => {
    return `${now.getFullYear()}${now.getMonth()}${now.getMilliseconds()}${now.getDate()}(${uniq})${uuid()}`;
}

const objRoom = (obj = {}) => {
    const now = new Date();
    obj.codeRoom = generateUniqCode(now, obj.emailAdmin);
    return obj;

}

module.exports = { generateAnggota, generateUniqCode, objRoom, uuid }