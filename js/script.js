// --------------------
// alert
// --------------------
var alertIcon = document.querySelector('.alertIcon');
var alertText = document.querySelector('.alertText');
// change scale on mobile device
if (screen.width < 500){
  alertText.classList.add('show')
  let scale = screen.width / (500 * 1.1);
  document.querySelector("meta[name=viewport]").setAttribute('content',`width=device-width, initial-scale=${scale}, user-scalable=0`);
}
alertIcon.onclick = function(e){
  e.stopPropagation();
  alertText.classList.toggle('show');
}
document.onclick = function(){
  alertText.classList.remove('show')
}
// --------------------
// pen color
// --------------------

var pensBox = document.querySelector('.pens');
var penIds = pensBox.querySelectorAll('i');
let colors = ['#9F161D', '#ED6517', '#ffd24c', '#3B8F2F',
'#10B5AE', '#19199F', '#7A55B5', '#96189D', '#A37C63',
'#783B10', '#000000', '#929290', '#ffffff'];
for (let i=0; i<penIds.length; i++){
  penIds[i].color = colors[i];
  penIds[i].style.color = colors[i];
}
//default color : black
let blackPen = document.querySelector('#pen11');
blackPen.checked = true;
let penColor = colors[colors.length-3];
penIds.forEach(function(item){
  item.onclick = function(){
    penColor = item.color
  }
})
// --------------------
// pen size
// --------------------
var sizeBox = document.querySelector('.size');
var sizeItem = sizeBox.querySelectorAll('span');
let sizeArray = [5, 10, 15];
for (let i=0; i<sizeItem.length; i++){
  sizeItem[i].size = sizeArray[i];
}
//default size : small
let sizeS = document.querySelector('#sizeS');
sizeS.checked = true;
let penSize = sizeArray[0];
sizeItem.forEach(function(item){
  item.onclick = function(){
    penSize = item.size
  }
})

// --------------------
// canvas : drawing
// --------------------
var canvas = document.querySelector('#doodle');
var context = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
context.lineJoin = 'round';
context.lineCap = 'round';

let penStatus = {
  x: 0,
  y:0,
  drawing: false
};

// mouse event
canvas.addEventListener('mousedown',startPen);
canvas.addEventListener('mousemove',movePen);
canvas.addEventListener('mouseup',stopPen);
canvas.addEventListener('mouseout',stopPen);
// touch event
canvas.addEventListener('touchstart',startPen);
canvas.addEventListener('touchmove',movePen);
canvas.addEventListener('touchend',stopPen);

function startPen(e){
  penStatus.drawing = true;
  // getBoundingClientRect(): get space relative to screen
  // clientLeft / clientTop: get border width
  let getX = e.offsetX || e.touches[0].pageX - this.getBoundingClientRect().x - this.clientLeft;
  let getY = e.offsetY || e.touches[0].pageY - this.getBoundingClientRect().y - this.clientTop;
  [penStatus.x, penStatus.y] = [getX, getY];
  e.preventDefault();
  console.log(e.touches[0])
}

function movePen(e){
  if (penStatus.drawing){
    let getX = e.offsetX || e.touches[0].pageX - this.getBoundingClientRect().x - this.clientLeft;
    let getY = e.offsetY || e.touches[0].pageY - this.getBoundingClientRect().y - this.clientTop;
    context.strokeStyle = penColor;
    context.lineWidth = penSize;
    context.beginPath();
    context.moveTo(penStatus.x, penStatus.y);
    context.lineTo(getX, getY);
    context.stroke();
    [penStatus.x, penStatus.y] = [getX, getY];
    e.preventDefault();
  } else {
      return
  }
}

function stopPen(){
  penStatus.drawing = false;
}

// --------------------
// canvas : erase page
// --------------------
var erase = document.querySelector('.erase');
var drawBox = document.querySelector('.drawBox');
erase.onclick = function(){
  let img = document.createElement('img');
  img.classList.add('delImg');
  img.src = canvas.toDataURL('image/png');
  let div = document.createElement('div');
  div.classList.add('tempCanvas');
  drawBox.appendChild(div);
  drawBox.appendChild(img);
  setTimeout(function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBox.removeChild(div);
    drawBox.removeChild(img);
  }, 1000)
}

// --------------------
// canvas : save canvas
// --------------------
var save = document.querySelector('.save');
save.onclick = function(){
  let tempLink = document.createElement('a');
  let imgName = `doodle${Math.floor(Date.now()/1000)}.png`;
  tempLink.href = canvas.toDataURL('image/png');
  tempLink.setAttribute('download', imgName);
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
