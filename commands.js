exports.dslStr = function(pad,button,dur){
  var tNewAng = [0, 0, 0, 0]
  return JSON.stringify({
        dpad : pad,
        btn : button,
        ang : tNewAng,
        dur : dur
    });
}
exports.btns = {
  downleft:1,
  down:2,
  downright:3,
  left:4,
  neutral:5,
  right:6,
  upleft:7,
  up:8,
  upright:9,
  nobtn:0, //no button
  sk:64, //small kick
  sp:128,//small punch
  lp:8,//large punch
  mp:16,//midium punch
  mk:1,//midium kick
  lk:2,//large kick
  select:1024,
  start:2048,
  ppp:152,
  kkk:67
}
