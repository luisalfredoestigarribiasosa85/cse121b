import config from './config.js';

let page = 1;
const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const container = document.getElementById('container');

btnNext.addEventListener('click', () => {
    if (page < config.MAX_PAGES) {
        page += 1;
        loadUpcomingMovies();
    }
});

btnPrevious.addEventListener('click', () => {
    if (page > 1) {
        page -= 1;
        loadUpcomingMovies();
    }
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        page = 1;
        searchMovies(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            page = 1;
            searchMovies(query);
        }
    }
});

const searchMovies = async (query) => {
    try {
        showLoading();
        const api = await fetch(`${config.BASE_URL}/search/movie?api_key=${config.API_KEY}&language=en-US&query=${query}&page=${page}`);
        if (api.status === 200) {
            const data = await api.json();
            displayMovies(data.results);
        } else {
            showError('Error fetching search results. Please try again later.');
        }
    } catch (error) {
        console.error(error);
        showError('An error occurred while searching. Please try again later.');
    } finally {
        hideLoading();
    }
};

const loadUpcomingMovies = async () => {
    try {
        showLoading();
        const api = await fetch(`${config.BASE_URL}/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=${page}`);
        if (api.status === 200) {
            const data = await api.json();
            displayMovies(data.results);
        } else {
            showError('Error fetching upcoming movies. Please try again later.');
        }
    } catch (error) {
        console.error(error);
        showError('An error occurred while loading movies. Please try again later.');
    } finally {
        hideLoading();
    }
};

const displayMovies = (movies) => {
    if (!movies || movies.length === 0) {
        container.innerHTML = '<p class="no-results">No movies found</p>';
        return;
    }

    let moviesHtml = '';
    movies.forEach(movie => {
        const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'path/to/default-poster.jpg';
        const releaseDate = new Date(movie.release_date).toLocaleDateString();
        moviesHtml += `
            <div class="movie" id="movie-${movie.id}">
                <img class="poster" src="${posterPath}" alt="${movie.title}">
                <h3 class="title">${movie.title}</h3>
                <p class="release-date">Release: ${releaseDate}</p>
            </div>
        `;
    });
    container.innerHTML = moviesHtml;

    // Add event listeners to each movie
    movies.forEach(movie => {
        const movieElement = document.getElementById(`movie-${movie.id}`);
        movieElement.addEventListener('click', () => {
            window.location.href = `info.html?id=${movie.id}`;
        });
    });
};

const showLoading = () => {
    container.innerHTML = '<div class="loading">Loading...</div>';
};

const hideLoading = () => {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
};

const showError = (message) => {
    container.innerHTML = `<div class="error">${message}</div>`;
};

// Initial load of upcoming movies
loadUpcomingMovies(); 