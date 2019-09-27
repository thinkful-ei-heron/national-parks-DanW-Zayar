// https://developer.nps.gov/api/v1/parks?stateCode=fl,ca&api_key=q4WZlK3hgVBmAJ0LnVmRAxsaZ6GGM8CgdXfJyhG2
const apiKey = 'q4WZlK3hgVBmAJ0LnVmRAxsaZ6GGM8CgdXfJyhG2';
const searchURL = 'https://developer.nps.gov/api/v1/parks';
const stateList = new Array(
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'GU',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MH',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'PW',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VI',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY'
);

function getSelectHTML() {
  let html = '';
  stateList.forEach(state => (html += `<option value="${state}">${state}</option>`));
  console.log(html);
  renderStateFormHTML(html);
}

function renderStateFormHTML(html) {
  $('.states').html(html);
}

function handleStateSubmit() {
  $('.search-form').submit(event => {
    event.preventDefault();
    let states = $('.states').val();
    let maxResults = $('.js-maxresults').val();
    getParksFromStates(states, maxResults);
  });
}

function getParksFromStates(states, maxResults) {
  let url = `${searchURL}?stateCode=${states}&limit=${maxResults}&api_key=${apiKey}`;
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => generateResultHTML(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function generateResultHTML(jsonData) {
  console.log(jsonData);
  console.log('in generateResultHTML');
  let html = '';
  jsonData.data.forEach(park => {
    console.log('in forEach' + park);
    html += `
    <ul>
      <li>Park Name: ${park.fullName}</li>
      <li>Description: ${park.description}</li>
      <li>Website: ${park.url}</li>
    </ul>
    `;
  });

  renderResultHTML(html);
}

function renderResultHTML(html) {
  console.log('In renderResult ' + html);
  $('.results').html(html);
}

function init() {
  getSelectHTML();
  handleStateSubmit();
}

$(init);
