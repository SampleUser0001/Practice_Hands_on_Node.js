const fs = require("fs");

const returnValue = fs.readdir(
    '.',
    (err, files) => {
        console.log('fs.readdir()実行結果');
        console.log('err', err);
        console.log('files', files);
    }
);

// 戻り値はありません。
console.log('returnValue', returnValue);
