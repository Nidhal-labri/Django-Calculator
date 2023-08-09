window.onload = function showTime(){
  let date = new Date(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds(),
      session = 'AM';

  if (h == 0){
    h = 12;
  }

  if (h > 12){
    h -=  12;
    session = 'PM';
  }

  h = (h < 10) ? '0' + h : h;
  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;

  let time = h + ':' + m + ':' + s + ' ' + session;

  document.getElementById('MyClockDisplay').innerHTML = time;

  setTimeout(showTime, 1000);
}

showTime();
