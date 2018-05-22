//var machina = require('machina');
var machina = require('./node_modules/machina/lib/machina.js')
var isCanceled = false;

var Ryu = machina.Fsm.extend({
  initialState: 'N',
  states: {  // 状態を定義
    'N': {  // 各状態
      fight: async function() { // その状態が扱う振る舞い（関数）
        console.log('neutral');
        await send("hello");
        await wait_with_flag(2000,isCanceled);
        await send(" world ");
        await wait_with_flag(2000,isCanceled);
      }
    },
    'Hado': {
      fight: async function() {
        console.log('Hado');
        await send("Hadoken");
        await wait_with_flag(2000,isCanceled);
      }
    },
    'Shoryu': {
      fight: async function() {
        console.log('Shoryu');
        await send("Shoryuken");
        await wait_with_flag(2000,isCanceled);
      }
    },
  },
    fight: function() {
      this.handle('fight');
    },
    shift: function(newS) {
      this.transition(newS);
    },
});

async function main(){
  var ryu = new Ryu();
  ryu.fight();
  await wait_with_flag(1000,isCanceled);
  isCanceled = false;
  await ryu.shift('Hado');
  await ryu.fight();
  await wait_with_flag(2000,isCanceled);
  await ryu.shift('Shoryu');
  await ryu.fight();
}
main();

function send(GCDSL){
  return new Promise(function(resolve, reject) {
    console.log(GCDSL);
    resolve();
    // SEND(function(err,data){
    //   if (!err){
    //     resolve(data);
    //   }else{
    //     reject({err:err, data:data});
    //   }
    // });
  });
}

function wait_with_flag(delay,isCanceled) {
    return new Promise(function(resolve, reject) {
        if(isCanceled === true){
            reject();
        }else{
          setTimeout(resolve, delay);
        }
    });
}

// function wait_with_flag(delay,isCanceled) {
//   return new Promise(function(resolve, reject) {
//       setTimeout(
//         function(resolve, reject,isCanceled) {
//           if(isCanceled === true){
//             reject();
//           }else{
//             resolve();
//           }
//         }
//         , delay);
//   });
// }


// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
function wait(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, delay);
    });
}
// // 使い方
// wait(1000)
//     .then(function() {
//         // 処理
//     });
