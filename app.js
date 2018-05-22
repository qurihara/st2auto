//var machina = require('machina');
var machina = require('./node_modules/machina/lib/machina.js')

var Ryu = machina.Fsm.extend({
  initialState: 'N',
  states: {  // 状態を定義
    'N': {  // 各状態
      fight: async function() { // その状態が扱う振る舞い（関数）
        console.log('neutral');
        await send("hello");
        await wait(500);
        await send(" world ");
        await wait(500);
      }
    },
    'Hado': {
      fight: async function() {
        console.log('Hado');
        await send("Hadoken");
        await wait(500);
      }
    },
    'Shoryu': {
      fight: async function() {
        console.log('Shoryu');
        await send("Shoryuken");
        await wait(500);
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
  await wait(1000);
  await ryu.shift('Hado');
  await ryu.fight();
  await wait(1000);
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
