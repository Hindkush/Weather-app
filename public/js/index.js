const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.getElementById('msg_1');
const para2 = document.getElementById('msg_2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  para1.textContent = 'Loading...';
  para2.textContent = '';
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        para1.textContent = data.error;
        para2.textContent = '';
      } else {
        para1.textContent = data.location;
        console.log(data);
        para2.textContent = `Forecastweather Descriptions:${data.forecast.weather_descriptions} Temperature: ${data.forecast.temperature} Feelslike: ${data.forecast.feelslike}`;
      }
    });
  });
});
