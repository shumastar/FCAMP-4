import {
  countries,
  countryList,
} from '../Utils/const';

function showCountryList() {
  countryList.innerHTML = (countries.map(
    country => `<li class="country-list_item">
                  <a class="country-list_item__link" href="#" data-country="${country}">
                    ${country.toString().toUpperCase()}
                  </a>
                </li>`
              )).join('');
};

export default showCountryList;
