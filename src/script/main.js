AOS.init({
  easing: 'fade-up',
  duration: 700,
});



async function fetchHijriJSON() {
  let todayDate = getCurrentDate()
  const response = await fetch(`http://api.aladhan.com/v1/gToH?date=${getCurrentDate()}`)
  const hijriDate = await response.json()
  return await hijriDate.data.hijri
}

function getCurrentDate() {
  let currentDate = new Date()
  let cDay = currentDate.getDate()
  let cMonth = currentDate.getMonth() + 1
  let cYear = currentDate.getFullYear()
  return cDay + "-" + cMonth + "-" + cYear
}

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



window.addEventListener('load', async (e) => {
  let todayHijri = await fetchHijriJSON();
  console.log('hijri', todayHijri)
  let hDay = todayHijri.day
  let hMonth = todayHijri.month.en
  let hYear = todayHijri.year

  document.querySelector('header .islamic-date span').innerHTML = `${hDay} ${hMonth} ${hYear}`

  let prayerTime = request('https://api.aladhan.com/v1/calendarByCity', {
      city: 'Toronto',
      country: 'Canada',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      method: 2,
    })
    .then(response => {
      // Do something with response.
      console.log('prayer time', response)
    });
})