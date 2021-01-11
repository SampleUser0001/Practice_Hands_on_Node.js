
const ok_json = '{"Foo": 1}';
console.log(JSON.parse(ok_json));

function parseJsonAsync(json){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(JSON.parse(json));
            } catch(err) {
                reject(err);
            }
        }, 1000);
    });
}

const toBeFulfilled = parseJsonAsync(ok_json);
const toBeRejected = parseJsonAsync('NG');

console.log('*************** Promise生成直後 ***************') ;
console.log(toBeFulfilled) ;
console.log(toBeRejected) ;
setTimeout(() => { 
  console.log('******************** 1秒後 ********************') ;
  console.log(toBeFulfilled) ;
  console.log(toBeRejected) ;
}, 1000) 

