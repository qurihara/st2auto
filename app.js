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
          await send('back', com.dslStr(com.btns.left,com.btns.nobtn,-1));//"backing");
          await wait(2000);
          // await shift('back','back');
          await this.handle('fight');
        }catch (canceled) {}
      },
      _onExit: async function() {
        await send('back', com.dslStr(com.btns.left,com.btns.nobtn,2));
      },
    },
    'sonic': {
      fight: async function() {
        console.log('sonic mode');
        try{
          await send('sonic', com.dslStr(com.btns.right,com.btns.lp,2));//"sonicboom!");
          await send('sonic', com.dslStr(com.btns.downleft,com.btns.nobtn,-1));//"and machi!");
          await wait(2000);
          // await shift('sonic','sonic');
          await this.handle('fight');
        }catch (canceled) {}
      },
      _onExit: async function() {
        await send('sonic', com.dslStr(com.btns.downleft,com.btns.nobtn,2));
      },
    },
    'summer': {
      fight: async function() {
        console.log('summer mode');
        try{
          await send('summer', com.dslStr(com.btns.up,com.btns.lk,2));// "summersolt!");
          await send('summer', com.dslStr(com.btns.downleft,com.btns.nobtn,-1));// "and machi!");
          await wait(2000);
          // await shift('summer','summer');
          await this.handle('fight');
        }catch (canceled) {}
      },
      _onExit: async function() {
        await send('summer', com.dslStr(com.btns.downleft,com.btns.nobtn,2));
      },
    },
    'attack': {
      fight: async function() {
        console.log('atack mode');
        try{
          await send('attack', com.dslStr(com.btns.upright,com.btns.nobtn,2));// "jump!");
          await wait(500);
          await send('attack', com.dslStr(com.btns.neutral,com.btns.lk,2));// "and attack!");
          await shift('attack','back');
          await this.handle('fight');
        }catch (canceled) {}
      },
      _onExit: async function() {
      },
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
      console.log(GCDSL);
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
