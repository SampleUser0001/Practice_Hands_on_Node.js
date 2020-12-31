function parseJsonAsync(json, callback){
    setTimeout(() => {
        try {
            callback(null, JSON.parse(json));
        } catch(err) {
            callback(err);
        }
    }, 1000);
}

const ngJson = '{ "value": "hoge" ';
parseJsonAsync(ngJson, (err, result) => {
    console.log('parse結果:', err, result);
});