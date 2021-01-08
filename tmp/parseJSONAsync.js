'use strict';

function parseJSONAsync(json , callback){
    setTimeout(() => {
        try {
            callback(null, JSON.parse(json));
        } catch(err){
            callback(err);
        }
    }, 1000);
}

parseJSONAsync('{"value":"hoge"}', (err, result) => {
    console.log("コールバックで呼ばれる");
    console.log('実行結果:', err, result);
});
