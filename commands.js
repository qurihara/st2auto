exports.dslStr = function(pad,button,dur){
  var tNewAng = [0, 0, 0, 0]
  return JSON.stringify({
        "dpad" : pad,
        "btn" : button,
        "ang" : tNewAng,
        "dur" : dur
    });
}
exports.btns = {
  downleft:1,
  down:2,
  downright:3,
  left:4,
  newtral:5,
  right:6,
  upleft:7,
  up:8,
  upright:9,
  l:64,
  r:128,
  x:8,
  y:16,
  a:1,
  b:2,
  select:1024,
  start:2048,
  ppp:152,
  kkk:67
}
