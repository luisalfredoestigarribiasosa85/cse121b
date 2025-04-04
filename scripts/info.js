import config from './config.js';

// Get movie ID from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// DOM Elements
const movieDetailsContainer = document.getElementById('movie-details');

const displayMovieDetails = async () => {
    try {
        showLoading(movieDetailsContainer);
        const response = await fetch(`${config.BASE_URL}/movie/${movieId}?api_key=${config.API_KEY}&language=en-US`);
        if (response.ok) {
            const movieData = await response.json();
            const imageUrl = movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                : 'path/to/default-poster.jpg';

            movieDetailsContainer.innerHTML = `
                <div class="movie-details-content">
                    <img class="poster" src="${imageUrl}" alt="${movieData.title}">
                    <div class="movie-info">
                        <h1 class="movie-title">${movieData.title}</h1>
                        <div class="movie-rating">
                            <i class="fas fa-star"></i>
                            <span>${movieData.vote_average.toFixed(1)}/10</span>
                            <span class="vote-count">(${movieData.vote_count} votes)</span>
                        </div>
                        <p class="movie-overview">${movieData.overview}</p>
                        <div class="movie-meta">
                            <span><i class="fas fa-calendar"></i> ${movieData.release_date}</span>
                            <span><i class="fas fa-clock"></i> ${movieData.runtime} min</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            showError(movieDetailsContainer, 'Error fetching movie details');
        }
    } catch (error) {
        console.error(error);
        showError(movieDetailsContainer, 'An error occurred while loading movie details');
    }
};

const displayMovieTrailer = async () => {
    const trailerContainer = document.getElementById('trailer');
    try {
        showLoading(trailerContainer);
        const response = await fetch(`${config.BASE_URL}/movie/${movieId}/videos?api_key=${config.API_KEY}`);
        if (response.ok) {
            const data = await response.json();
            const trailer = data.results.find(video => video.type === 'Trailer');
            if (trailer) {
                trailerContainer.innerHTML = `
                    <iframe 
                        width="100%" 
                        height="400" 
                        src="https://www.youtube.com/embed/${trailer.key}"
                        title="Movie Trailer"
                        frameborder="0" 
                        allowfullscreen>
                    </iframe>
                `;
            } else {
                trailerContainer.innerHTML = '<p class="no-trailer">No trailer available for this movie.</p>';
            }
        } else {
            showError(trailerContainer, 'Error loading trailer');
        }
    } catch (error) {
        console.error(error);
        showError(trailerContainer, 'An error occurred while loading the trailer');
    }
};

const displayAdditionalMovieDetails = async () => {
    try {
        const response = await fetch(
            `${config.BASE_URL}/movie/${movieId}?api_key=${config.API_KEY}&language=en-US&append_to_response=credits`
        );

        if (response.ok) {
            const movieData = await response.json();

            // Update each detail with error handling
            updateElement('genre', movieData.genres.map(genre => genre.name).join(', ') || 'N/A');
            updateElement('release-date', movieData.release_date || 'N/A');
            updateElement('runtime', movieData.runtime || 'N/A');

            const director = movieData.credits.crew.find(member => member.job === 'Director');
            updateElement('director', director ? director.name : 'N/A');

            const mainCast = movieData.credits.cast
                .slice(0, 5)
                .map(member => member.name)
                .join(', ');
            updateElement('cast', mainCast || 'N/A');

            updateElement('production-studio',
                movieData.production_companies.map(company => company.name).join(', ') || 'N/A'
            );

            updateElement('plot-summary', movieData.overview || 'No plot summary available.');
        } else {
            showError(document.querySelector('.additional-details'), 'Error fetching additional movie details');
        }
    } catch (error) {
        console.error(error);
        showError(document.querySelector('.additional-details'), 'An error occurred while loading additional details');
    }
};

// Utility functions
const showLoading = (container) => {
    container.innerHTML = '<div class="loading">Loading...</div>';
};

const showError = (container, message) => {
    container.innerHTML = `<div class="error">${message}</div>`;
};

const updateElement = (id, content) => {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = content;
    }
};

// Check if movie ID exists
if (!movieId) {
    showError(movieDetailsContainer, 'No movie ID provided');
} else {
    // Initialize all data fetching
    displayMovieDetails();
    displayMovieTrailer();
    displayAdditionalMovieDetails();
}

