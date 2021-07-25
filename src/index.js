import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryTemplate from './templates/country.hbs';
import countriesTemplate from './templates/countries.hbs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputRef.addEventListener(
  'input',
  debounce(() => {
    onCountryInput();
  }, DEBOUNCE_DELAY),
);

function onCountryInput() {
  if (!inputRef.value) {
    countryInfo.innerHTML = ' ';
    countryList.innerHTML = ' ';
    return;
  }

  fetchCountries(inputRef.value)
    .then(value => {
      countryInfo.innerHTML = ' ';
      countryList.innerHTML = ' ';

      if (value.length === 1) {
        countryInfo.innerHTML = countryTemplate(value);
      } else if (value.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (value.length > 1) {
        countryList.innerHTML = countriesTemplate(value);
      }
    })
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
}
