let page = 1;
const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

btnNext.addEventListener('click', () => {
    if (page < 1000) {
        page += 1;
        loadMovies();
    }
});

btnPrevious.addEventListener('click', () => {
    if (page > 1) {
        page -= 1;
        loadMovies();
    }
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        searchMovies(query);
    }
});

const searchMovies = async (query) => {
    try {
        const api = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=798a8b7b717eac7d21066718600a122a&language=en-US&query=${query}&page=${page}`);
        if (api.status === 200) {
            const data = await api.json();
            displayMovies(data.results);
        } else {
            console.log('Error fetching search results');
        }
    } catch (error) {
        console.error(error);
    }
};

const loadMovies = async () => {
    try {
        const api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=798a8b7b717eac7d21066718600a122a&language=en-US&page=${page}`);
        if (api.status === 200) {
            const data = await api.json();
            displayMovies(data.results);
        } else {
            console.log('Error fetching popular movies');
        }
    } catch (error) {
        console.error(error);
    }
};

const displayMovies = (movies) => {
    let moviesHtml = '';
    movies.forEach(movie => {
        moviesHtml += `
            <div class="movie" id="movie-${movie.id}">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                <h3 class="title">${movie.title}</h3>
            </div>
        `;
    });
    document.getElementById('container').innerHTML = moviesHtml;

    // Add event listeners to each movie
    movies.forEach(movie => {
        const movieElement = document.getElementById(`movie-${movie.id}`);
        movieElement.addEventListener('click', () => {
            // Redirect to info.html with the movie ID 
            window.location.href = `info.html?id=${movie.id}`;
        });
    });
};


// Initial load of popular movies
loadMovies();
