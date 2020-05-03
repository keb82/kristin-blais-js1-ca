const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id;
if(params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "/";
}

const baseUrl = "https://www.boardgameatlas.com/api/search";
const detailsUrl = `${baseUrl}?client_id=QQJNQUML3j&ids=${id}`;

fetch(detailsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        createDetails(json);
    })
    .catch(function (error) {
        let heading1 = document.createElement("h1");
        heading1.innerHTML = "Could not load game";
        let detailContainer = document.querySelector(".detail-container");
        detailContainer.innerHTML = "";
        detailContainer.appendChild(heading1);
    });

    function createDetails(json){
        const titleName = json.games[0].name;
        const gameDetails = json.games[0];
        const image = gameDetails.images.original;
        const descriptionShort = json.games[0].description_preview;
        const minAge = json.games[0].min_age;
        const price = json.games[0].price;
        const minPlayers = json.games[0].min_players;
        const maxPlayers = json.games[0].max_players;

        let detailContainer = document.querySelector(".detail-container");
        
        let imageHtml = document.createElement("img");
        imageHtml.className = "details-image";
        imageHtml.src = image;
        imageHtml.alt = titleName;
        detailContainer.appendChild(imageHtml);

        let detailsHtml = document.createElement("div");
        detailsHtml.className = "details-details";
        detailContainer.appendChild(detailsHtml);

        let heading1 = document.createElement("h1");
        heading1.innerHTML = titleName;
        detailsHtml.appendChild(heading1);
        
        let paragraph = document.createElement("p");
        let span = document.createElement("span");
        span.className = "value";
        span.id = "propertyName";
        span.innerHTML = descriptionShort;
        paragraph.innerHTML = "Description: " + span.outerHTML;
        detailsHtml.appendChild(paragraph);

        paragraph = document.createElement("p");
        span.innerHTML = minAge;
        paragraph.innerHTML = "Min. Age: " + span.outerHTML + " ";
        detailsHtml.appendChild(paragraph);

        paragraph = document.createElement("p");
        const players = minPlayers + " - " + maxPlayers;
        span.innerHTML = players;
        paragraph.innerHTML = "Players: " + span.outerHTML + " ";;
        detailsHtml.appendChild(paragraph);

        paragraph = document.createElement("p");
        span.innerHTML = " $" + price;
        paragraph.innerHTML = "Price:" + span.outerHTML;
        detailsHtml.appendChild(paragraph);

        document.title = titleName;
    }


