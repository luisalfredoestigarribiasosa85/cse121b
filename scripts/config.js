// IMPORTANT: In a production environment, these values should be handled securely
// through environment variables and a proper build process
const config = {
    API_KEY: '798a8b7b717eac7d21066718600a122a',  // Replace with your TMDB API key
    BASE_URL: 'https://api.themoviedb.org/3',
    MAX_PAGES: 500
};

// Validate that required values are set
if (!config.API_KEY) {
    console.error('API_KEY is not set in config.js');
}

if (!config.BASE_URL) {
    console.error('BASE_URL is not set in config.js');
}

export default config; 