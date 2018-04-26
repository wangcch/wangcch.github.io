const fs = require("fs");
const path = '../../gallery';
const cdnUrl = 'https://cdn.wangcch.cc/blog/'

const _formatName = (name) => {
  let data = name;
  data = data.replace('.jpg', '');
  data = data.replace('.png', '');
  data = data.replace('.jpeg', '');
  data = data.replace('.gif', '');
  return data;
}

const _formateDate = (arr) => {
  let date = '';
  for (let i = 0; i < 3; i++) {
    date += arr[i] + (i < 2 ? '/' : '');
  }
  return date
}

fs.readdir(path, function (err, files) {
  if (err) {
    return;
  }
  let arr = [];
  (function iterator(index) {
    if (index == files.length) {
      let reArr = arr.reverse();
      fs.writeFile("output.js", JSON.stringify(reArr, null, "\t"));
      return;
    }
    fs.stat(path + "/" + files[index], function (err, stats) {
      if (err) {
        return;
      }
      if (stats.isFile()) {
        let cutArr = files[index].split('-');
        if (cutArr.length > 3) {
          cutArr[cutArr.length - 1] = _formatName(cutArr[cutArr.length - 1]);
          let Obj = {};
          Obj.title = cutArr[3];
          Obj.date = _formateDate(cutArr);
          Obj.url = cdnUrl + files[index];
          arr.push(Obj);
        }
      }
      iterator(index + 1);
    })
  }(0));
});
