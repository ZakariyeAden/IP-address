
// Elements
const currentIp = document.getElementById('ip');
const currentLocation = document.getElementById('location');
const currentTimezone = document.getElementById('timezone');
const currentIsp = document.getElementById('isp');
// Form
const ipAddress = document.getElementById('ip-address');
const searchBtn = document.getElementById('search-btn');

const usersApi = 'Enter_your_api';
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/';
const api_uri = 'https://geo.ipify.org/api/';
let current_verion = 'v1';

const headersOption = {
  headers: {
      'Access-Control-Allow-Origin': '*',
  }
}

const map = L.map('map', {
  'center': [0,0],
  'zoom': 0,
  'layers': [
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
  ]
})

updateMarker = (update_marker = [-33.665, 18.993]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
}

getIPDetails = (default_ip) => {
  if(default_ip == undefined){
      var ipUrl = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${usersApi}`
  }  else {
    var ipUrl = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${usersApi}&ipAddress=${default_ip}`
  }
  fetch(ipUrl, headersOption)
  .then( results => results.json())
  .then( data => {
      currentIp.innerHTML = data.ip
      currentLocation.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
      currentTimezone.innerHTML = data.location.timezone
      currentIsp.innerHTML = data.isp
  
      // update map marker 
      updateMarker([data.location.lat, data.location.lng])
  })
  .catch(error => {
      alert("Unable to get IP details")
      console.log(error)
    })
}

document.addEventListener('load', updateMarker())

searchBtn.addEventListener('click', e => {
    e.preventDefault()
    if (ipAddress.value != '' && ipAddress.value != null) {
        getIPDetails(ipAddress.value)
        return
    }
    alert("Please enter a valid IP address");
})