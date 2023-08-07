const apiKey = "1f6a9f4182e44b998953aef347cdfc63";
const apiUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey;

// Function to fetch news data from the API
async function getNews() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status !== "ok" || !data.articles) {
            throw new Error("Invalid API response");
        }
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error.message);
        return [];
    }
}

// Function to display the news articles on the page
function displayNews(articles) {
    const articlesContainer = document.getElementById("articles");

    if (!Array.isArray(articles) || articles.length === 0) {
        console.error("No news articles found");
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");

        const titleElement = document.createElement("h2");
        titleElement.classList.add("article-title");
        titleElement.textContent = article.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("article-description");
        descriptionElement.textContent = article.description;

        const imageElement = document.createElement("img");
        imageElement.classList.add("article-image");
        imageElement.src = article.urlToImage; // Assuming the API response includes an image URL

        articleElement.appendChild(titleElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(imageElement); // Append the image to the article element

        articlesContainer.appendChild(articleElement);
    });
}

// Call the functions to fetch and display news
getNews()
    .then(articles => displayNews(articles))
    .catch(error => console.error("Error:", error.message));