export default class PixabyApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        const API_KEY = '23231107-e9f176d7a1963d9cef653b860';
        const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}`;

        return fetch(URL)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
            })
            .catch(err => console.log('Error'));
    }

    incrementPage() {  
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}