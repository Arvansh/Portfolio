
let sb = document.querySelector(".sidebar");
let sbtn = document.getElementById("sb");
let cbtn = document.getElementById("cb");

sbtn.onclick = function(){
  sb.style.display = 'flex';
}
cbtn.onclick = function(){
  sb.style.display = 'none';
}
