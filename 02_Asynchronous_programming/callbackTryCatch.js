function parseJsonAsync(json, callback){
    try {
        setTimeout(() => {
            callback(JSON.parse(json));
        }, 1000)
    } catch(err) {
        console.error('エラーキャッチ', err);
        // エラー発生時にcallbackが実行される。
        callback({});
    }
}

const ngJson = '{ "value": "hoge" ';
parseJsonAsync(ngJson, result => {
    console.log('parse結果:',result);
});