/* global data */

const $navBar = document.querySelector('.landing-navbar');
const $allCategoryBtn = document.querySelector('.all-category');
const $savedBtn = document.querySelector('.saved-btn');
const $barsBtn = document.querySelector('.fa-bars');
const $xBtn = document.querySelector('.fa-x');
const $homeBtn = document.querySelector('.home');

$navBar.addEventListener('click', function (event) {
  if (
    event.target.tagName === 'I' &&
    event.target.className === 'fa-solid fa-bars'
  ) {
    $allCategoryBtn.classList.remove('hidden');
    $savedBtn.classList.remove('hidden');
    $xBtn.classList.remove('hidden');
    $barsBtn.classList.add('hidden');
  } else if (
    event.target.tagName === 'I' &&
    event.target.className === 'fa-solid fa-x'
  ) {
    $allCategoryBtn.classList.add('hidden');
    $savedBtn.classList.add('hidden');
    $xBtn.classList.add('hidden');
    $barsBtn.classList.remove('hidden');
  }
});

let text = '';

const $categoryContainer = document.querySelector('.h-category');

$categoryContainer.addEventListener('click', function (event) {
  event.preventDefault();
  if ((event.target.tagName = 'BUTTON')) {
    text = event.target.textContent;
  }
  if (text === 'random') {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      const generatedJoke = {};
      generatedJoke.categories = xhr.response.categories;
      generatedJoke.value = xhr.response.value;
      generatedJoke.entryId = data.nextEntryId;
      data.joke.unshift(generatedJoke);
      data.nextEntryId++;
      $jokeArea.appendChild(renderOneJoke(data.joke[0]));
    });
    xhr.send();
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random?category=' + text);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      const generatedJoke = {};
      generatedJoke.categories = xhr.response.categories;
      generatedJoke.value = xhr.response.value;
      generatedJoke.entryId = data.nextEntryId;
      data.joke.unshift(generatedJoke);
      data.nextEntryId++;
      $jokeArea.appendChild(renderOneJoke(data.joke[0]));
    });
    xhr.send();
  }
  viewSwap('joke');
});

const $jokeHeader = document.querySelector('.joke-header');
const $jokeNav = document.querySelector('.joke-navbar');
const $jokePage = document.querySelector('.joke');

const $savedHeader = document.querySelector('.saved-header');
const $savedPage = document.querySelector('.saved');

const $landingHeader = document.querySelector('.landing-header');
const $landingNav = document.querySelector('.landing-navbar');
const $landingPage = document.querySelector('.landing');

function viewSwap(view) {
  if (view === 'landing') {
    $landingHeader.classList.remove('hidden');
    $landingNav.classList.remove('hidden');
    $landingPage.classList.remove('hidden');

    $savedHeader.classList.add('hidden');
    $savedPage.classList.add('hidden');

    $jokeHeader.classList.add('hidden');
    $jokeNav.classList.add('hidden');
    $jokePage.classList.add('hidden');
  } else if (view === 'joke') {
    $landingHeader.classList.add('hidden');
    $landingNav.classList.add('hidden');
    $landingPage.classList.add('hidden');

    $savedHeader.classList.add('hidden');
    $savedPage.classList.add('hidden');

    $jokeHeader.classList.remove('hidden');
    $jokeNav.classList.remove('hidden');
    $jokePage.classList.remove('hidden');
  } else if (view === 'saved') {
    $landingHeader.classList.add('hidden');
    $landingNav.classList.add('hidden');
    $landingPage.classList.add('hidden');

    $savedHeader.classList.remove('hidden');
    $jokeNav.classList.remove('hidden');
    $savedPage.classList.remove('hidden');

    $jokeHeader.classList.add('hidden');
    $jokePage.classList.add('hidden');
  }
}

const $jokeArea = document.querySelector('.joke-container');
const $jokeView = document.querySelector('[data-view="joke"]');
const $savedView = document.querySelector('[data-view="saved"]');
const $savedJokeArea = document.querySelector('ul');

function renderOneJoke(joke) {
  const $jokeP = document.createElement('p');
  $jokeP.setAttribute('class', 'flex center-all text-center font-small');
  $jokeP.textContent = joke.value;

  return $jokeP;
}

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.joke.length; i++) {
    $savedJokeArea.appendChild(renderOneJoke(data.joke[i]));
  }
});

$savedBtn.addEventListener('click', function () {
  viewSwap('saved');
});

$homeBtn.addEventListener('click', function () {
  location.reload();
  viewSwap('landing');
});
