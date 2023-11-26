import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
//page elements
const body = document.querySelector('body');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

select.style.display = 'none';

document.addEventListener('DOMContentLoaded', onDocumentLoad);
select.addEventListener('change', breedClickHandler);
//function to request cat info
async function breedClickHandler(e) {
  const selectedOption = e.target.value;

  try {
    catInfo.style.display = 'none';
    loader.style.display = 'block';
    const breed = await fetchCatByBreed(selectedOption);
    loader.style.display = 'none';
    renderCatInfo(breed);
  } catch (error) {
    body.innerHTML = `Ooops, something went wrong!...Try again later`;
    iziToast.error({
      message: `Failed to load content`,
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'rgb(231, 231, 219)',
      iconColor: 'rgb(231, 231, 219)',
    });
    console.log(`${error.message}`);
  }
}
//function executed on page load
async function onDocumentLoad() {
  try {
    const breeds = await fetchBreeds();
    console.log(breeds);
    loader.style.display = 'none';
    renderBreeds(breeds);
    select.style.display = 'flex';
  } catch (error) {
    // handle error
    body.innerHTML = `Ooops, something went wrong!...Try again later`;
    iziToast.error({
      message: `Failed to load content`,
      position: 'topRight',
    });
    console.log(`${error.message}`);
  }
}
//function to render cat breeds to select elem
function renderBreeds(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  select.innerHTML = `<select class="breed-select" id="selectElement">${markup}</select>`;
}
//function to render info on a selected cat
function renderCatInfo(breed) {
  catInfo.style.display = 'flex';
  const markup = `<img class="cat-img" src="${breed[0].url}" alt="${breed[0].breeds[0].name}"  />
    <div class="breed-info">
      <h1 class="cat-name">${breed[0].breeds[0].name}</h1>
      <p class="description">${breed[0].breeds[0].description}</p>
      <h2 class="temperament">Temperament:</h2>
      <p class="temp-descr">${breed[0].breeds[0].temperament}</p>
    </div>
    `;
  return (catInfo.innerHTML = markup);
}
