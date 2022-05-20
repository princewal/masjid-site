AOS.init({
  easing: 'fade-up',
  duration: 700,
});

let todaysDate = {

};

(function() {
  let currentDate = new Date()
  let cDay = currentDate.getDate()
  let cMonth = currentDate.getMonth() + 1
  let cYear = currentDate.getFullYear()
  todaysDate.cDay = cDay
  todaysDate.cMonth = cMonth
  todaysDate.cYear = cYear
})()

const request = (url, params = {}, method = 'GET') => {
  let options = {
    method
  };
  if ('GET' === method) {
    url += '?' + (new URLSearchParams(params)).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  return fetch(url, options).then(response => response.json());
};

function setHijri(hijri) {
  const todayHijri= hijri
  let hDay = todayHijri.day
  let hMonth = todayHijri.month.en
  let hYear = todayHijri.year
  document.querySelector('.feature .islamic-date span').innerHTML = `${hDay} ${hMonth} ${hYear}`
}

function setPrayerTime(timings) {
  let todaysPrayers = timings.data[todaysDate.cDay - 1]
  console.log('prayer time', todaysPrayers)
  
  
  for(prayer in todaysPrayers.timings) {
    let prayerTimes = document.querySelector(`.prayer-times .${prayer.toLowerCase()}`);
    if(prayerTimes) {
      console.log(`prayer`, todaysPrayers.timings[prayer]);
      prayerTimes.querySelector('.time').innerHTML=todaysPrayers.timings[prayer]
    }
  }
  
}

window.addEventListener('load', async (e) => {

  let todayHijri;
  request('http://api.aladhan.com/v1/gToH', {
      date: todaysDate.cDay + "-" + todaysDate.cMonth + "-" + todaysDate.cYear
    })
    .then(response => {
      // Do something with response.
     setHijri(response.data.hijri);
    });

  let prayerTime = request('https://api.aladhan.com/v1/calendarByCity', {
      city: 'Toronto',
      country: 'Canada',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      method: 2,
    })
    .then(response => {
      // Do something with response.
      setPrayerTime(response)
    });
})