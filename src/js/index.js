import { refs } from './refs';
import PixabyApiService from './apiService';

import { alert, defaultModules, success, error } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import galleryCards from '../templates/image.hbs';

const pixabyApi = new PixabyApiService(); 

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    pixabyApi.query = e.currentTarget.elements.query.value;
    pixabyApi.resetPage();
    pixabyApi.fetchArticles().then(hits => {
        clearArticlesContainer();
        appendGalleryMarkup(hits)
    })
        .catch(err => onFetchError(err));
    refs.loadMoreBtn.classList.add('is-shown');
}

function onLoadMore(e) {
    e.preventDefault();

    pixabyApi.fetchArticles()
        .then(appendGalleryMarkup)
        .then(() => {
            refs.loadMoreBtn.scrollIntoView({ block: 'end', behavior: 'smooth' });
            success({
                text: 'Load more images'
            });
        });
}

function appendGalleryMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', galleryCards(hits));
 }

function clearArticlesContainer() {
    refs.galleryContainer.innerHTML = '';
}

function onFetchError(err) {
    if (err.status === 404) {
      error({ text: `Error! This country not find.` });
      return;
    } 
  }