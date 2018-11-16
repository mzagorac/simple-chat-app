export const parseText = (text) => {
  
  var arrFromString = text.split(' ');

  let textCheck = '';
  return arrFromString.reduce((acc, val, i, arr) => {
    
    textCheck += val + ' ';

    if (textCheck.length >= 25 || i === arr.length - 1) {
      acc.push(textCheck);
      textCheck = '';
    }

    return acc;
  }, []);
}

