//var machina = require('machina');
var machina = require('./node_modules/machina/lib/machina.min.js')
var com = require('./commands.js');
var player;

var player = machina.Fsm.extend({
  initialState: 'back',
  states: {  // 状態を定義
    'back': {  // 各状態
      fight: async function() { // その状態が扱う振る舞い（関数）
        console.log('back mode');
        try{
          await send('back', "backing");
          await wait(2000);
          await shift('back','back');
          await this.handle('fight');
        }catch (canceled) {
          console.log(canceled)
        }
      }
    },
    'sonic': {
      fight: async function() {
        console.log('sonic mode');
        try{
          await send('sonic', "sonicboom!");
          await send('sonic', "and machi!");
          await wait(2000);
          await shift('sonic','sonic');
          await this.handle('fight');
        }catch (canceled) {
          console.log(canceled)
        }
      }
    },
    'summer': {
      fight: async function() {
        console.log('summer mode');
        try{
          await send('summer', "summersolt!");
          await send('summer', "and machi!");
          await wait(2000);
          await shift('summer','summer');
          await this.handle('fight');
        }catch (canceled) {
          console.log(canceled)
        }
      }
    },
    'attack': {
      fight: async function() {
        console.log('atack mode');
        try{
          await send('attack', "jump!");
          await wait(500);
          await send('attack', "and attack!");
          await shift('attack','back');
          await this.handle('fight');
        }catch (canceled) {
          console.log(canceled)
        }
      }
    },
  },
    fight: async function() {
      this.handle('fight');
    },
    shift: async function(newS) {
      this.transition(newS);
    },
});

async function main(){
  player = new player();
  player.fight();
  await wait(5000);
  await player.shift('sonic');
  await player.fight();
  await wait(5000);
  await player.shift('summer');
  await player.fight();
  await wait(5000);
  await player.shift('attack');
  await player.fight();
}
main();

function shift(ifStateIs, newState){
  return new Promise(function(resolve, reject) {
    if (ifStateIs === player.state){
      player.shift(newState);
      resolve();
    }else{
      reject("canceled.");
    }
  });
}
function send(ifStateIs, GCDSL){
  return new Promise(function(resolve, reject) {
    // if (isCanceled === false){
    if (ifStateIs === player.state){
      console.log(GCDSL);
      resolve();
    }else{
      reject("canceled.");
    }
  });
}

// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
function wait(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, delay);
    });
}
