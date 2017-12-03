// import Excuses from './excuses';
const Excuses = require('./excuses')

class Generator {
  init() {

  }
  generate(name) {
    let t = this;
    let text = [];
    
    //Check if we have empty name
    if(!name){
      name = t.choose(Excuses.names)
    }

    //Get hello part
    text.push(
      t.insertName(t.choose(Excuses.hello), name)
    );

    //Get fail
    text.push(
      t.choose(Excuses.fail)
    );

    //Get action and date
    text.push(
      t.concat(t.choose(Excuses.action), t.choose(Excuses.date))
    );

    //Get last part
    text.push(
      t.choose(Excuses.general)
    );

    //Create single string
    return t.concatAll(text);
  }
  insertName(str, name) {
    return str.replace('[name]', name);
  }
  needComma(str) {
    let substring = "як";
    return str.indexOf(substring) === 0;
  }
  concat(str1, str2, separator) {
    if(this.needComma(str2)){
      return str1 + ", " + str2;
    }else{
      if (separator) {
        return str1 + separator + " " + str2;
      } else {
        return str1 + " " + str2;
      }
    }
  }
  concatAll(arr) {
    let str = "";
    arr.forEach(function (item, i) {
      str += item + ". ";
    });
    return str;
  }
  choose(arr) {
    return arr[getRandom(0, arr.length - 1)];
  }
};

module.exports = new Generator();

// export default new Generator();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
