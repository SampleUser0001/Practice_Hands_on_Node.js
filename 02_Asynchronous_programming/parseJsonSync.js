function parseJsonSync(json,message) {
    try{
        console.log(message);
        return JSON.parse(json);
    } catch(err){
        console.error('エラーキャッチ', err);
    }
}

const okJson = '{ "value": "hoge" }';
const ngJson = '{ "value": "hoge" ';
console.log("parsed:",parseJsonSync(okJson));
console.log("parsed:",parseJsonSync(ngJson));
