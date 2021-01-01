function parseJSONAsync(json, callback){
    setTimeout(() => {
        try {
            callback(null, JSON.parse(json));
        } catch(err) {
            callback(err);
        }
    }, 1000);
}

exports.parseJSONAsync = parseJSONAsync
