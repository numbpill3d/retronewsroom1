// Sidebar Toggle
document.querySelector('.start-button').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
});

// News Ticker
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://rss.usatoday.com/feed')
    .then(response => response.json())
    .then(data => {
        const headlines = data.items.map(item => `<span><a href="${item.link}" target="_blank">${item.title}</a></span>`).join('');
        document.querySelector('.ticker-content').innerHTML = headlines;
    });

// Reddit Feed
fetch('https://www.reddit.com/r/politics/top.json?limit=5')
    .then(response => response.json())
    .then(data => {
        const posts = data.data.children.map(post => `
            <div class="post">
                <h3><a href="https://reddit.com${post.data.permalink}" target="_blank">${post.data.title}</a></h3>
                <p>Upvotes: ${post.data.ups} | Comments: ${post.data.num_comments}</p>
            </div>
        `).join('');
        document.querySelector('.reddit-posts').innerHTML = posts;
    });

// Image Gallery
let currentIndex = 0;
const images = document.querySelectorAll('.gallery img');
setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}, 10000);

// Lightbox for Screenshots
document.querySelectorAll('.lightbox-trigger').forEach(image => {
    image.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        document.body.appendChild(lightbox);
        lightbox.addEventListener('click', () => lightbox.remove());
    });
});

// Favorites Box
function saveFavorite(article) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.unshift(article);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavorites();
}

function updateFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesList = document.querySelector('.favorites-list');
    favoritesList.innerHTML = favorites.map(article => `
        <div class="favorite-item">
            <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
        </div>
    `).join('');
}
