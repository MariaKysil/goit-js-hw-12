import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryTemplate from './templates/country.hbs';
import countriesTemplate from './templates/countries.hbs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputRef: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputRef.addEventListener(
  'input',
  debounce(() => {
    onCountryInput();
  }, DEBOUNCE_DELAY),
);

function onCountryInput() {
  if (!refs.inputRef.value) {
    onClearInput();
    return;
  }

  fetchCountries(refs.inputRef.value)
    .then(value => {
      onClearInput();

      if (value.length === 1) {
        refs.countryInfo.innerHTML = countryTemplate(value);
      } else if (value.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (value.length > 1) {
        refs.countryList.innerHTML = countriesTemplate(value);
      }
    })
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function onClearInput() {
  refs.countryInfo.innerHTML = ' ';
  refs.countryList.innerHTML = ' ';
}
