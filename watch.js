
function Update_clock(){
const now = new Date;
let hour = now.getHours().toString().padStart(2,0);
let min = now.getMinutes().toString().padStart(2,0);
let sec = now.getSeconds().toString().padStart(2,0);
let time = `${hour}:${min}:${sec}`;
let display = document.getElementById("display");
display.textContent = `${time}`;
}

Update_clock();
setInterval(Update_clock,1000);