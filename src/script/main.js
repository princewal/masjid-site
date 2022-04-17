
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
  return  cDay + "-" + cMonth + "-" + cYear
}


window.addEventListener('load', async (e) => {
  let todayHijri = await fetchHijriJSON();
  console.log('hijri', todayHijri)
  let hDay = todayHijri.day
  let hMonth = todayHijri.month.en
  let hYear = todayHijri.year

  document.querySelector('header .islamic-date span').innerHTML = `${hDay} ${hMonth} ${hYear}`
})