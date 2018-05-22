//var machina = require('machina');
var machina = require('./node_modules/machina/lib/machina.js')
// var isCanceled = false;
var ryu;

var Ryu = machina.Fsm.extend({
  initialState: 'N',
  states: {  // 状態を定義
    'N': {  // 各状態
      fight: async function() { // その状態が扱う振る舞い（関数）
        console.log('neutral');
        try{
          await send('N', "hello");
          await wait(2000);
          await send('N', " world ");
          await wait(2000);
        }catch (err) {
          console.log(err)
        }
      }
    },
    'Hado': {
      fight: async function() {
        console.log('Hado');
        await send('Hado', "Hadoken");
        await wait(2000);
      }
    },
    'Shoryu': {
      fight: async function() {
        console.log('Shoryu');
        await send('Shoryu', "Shoryuken");
        await wait(2000);;
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
  ryu = new Ryu();
  ryu.fight();
  await wait(1000);
  // await setIsCanceled(true);
  await ryu.shift('Hado');
  await ryu.fight();
  await wait(2000);
  await ryu.shift('Shoryu');
  await ryu.fight();
}
main();

// function setIsCanceled(_isCanceled){
//   return new Promise(function(resolve, reject) {
//       isCanceled = _isCanceled;
//       resolve();
//   });
// }

function send(ifStateIs, GCDSL){
  return new Promise(function(resolve, reject) {
    // if (isCanceled === false){
    if (ifStateIs === ryu.state){
      console.log(GCDSL);
      resolve();
    }else{
      reject("canceled.");
    }
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
