const baseUrl = "https://www.boardgameatlas.com/api/search";
const gamesUrl = `${baseUrl}?&limit=20&client_id=QQJNQUML3j`;

fetch(gamesUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        displayResults(json);
    })
    .catch(function (error) {
        const heading = document.querySelector("h1");
        heading.innerHTML = "Could not load games";
    });

    function displayResults(json){
        let mainDiv = document.querySelector(".col-sm-6.col-md-4.col-lg-3");
        let newInnerHtml = "";

        const container = document.querySelector(".row");
        const loader = document.querySelector(".loader");
        container.removeChild(loader);

        for(let i = 0; i < json.games.length; i++) {
            const titleName = json.games[i].name;
            const image = json.games[i].images.original;
            const descriptionShort = json.games[i].description_preview;
            const minAge = json.games[i].min_age;
            const price = json.games[i].price;
            const minPlayers = json.games[i].min_players;
            const maxPlayers = json.games[i].max_players;
            const id = json.games[i].id;

            let divCard = document.createElement("div");
            divCard.className = "card";

            let imageHtml = document.createElement("img");
            imageHtml.className = "image";
            imageHtml.src = image;
            imageHtml.alt = titleName;
            divCard.appendChild(imageHtml);
            
            let detailsHtml = document.createElement("div");
            detailsHtml.className = "details";
            divCard.appendChild(detailsHtml);

            let heading4 = document.createElement("h4");
            heading4.className = "name";
            heading4.innerHTML = titleName;
            detailsHtml.appendChild(heading4);

            let paragraph = document.createElement("p");
            paragraph.innerHTML = "<b>Description:</b> " + descriptionShort.substring(0, 100) + "...";
            detailsHtml.appendChild(paragraph);

            paragraph = document.createElement("p");
            paragraph.innerHTML = "<b>Min. Age:</b> " + minAge;
            detailsHtml.appendChild(paragraph);

            paragraph = document.createElement("p");
            paragraph.innerHTML = "<b>Players: </b>" + minPlayers + " - " + maxPlayers;
            detailsHtml.appendChild(paragraph);


            paragraph = document.createElement("p");
            paragraph.innerHTML = "<b>Price:</b> $" + price;
            detailsHtml.appendChild(paragraph);

            let detailsButton = document.createElement("a");
            detailsButton.className = "btn";
            detailsButton.classList.add("btn-primary");
            detailsButton.href = "details.html?id=" + id;
            detailsButton.innerHTML = "Details";

            detailsHtml.appendChild(detailsButton);

            mainDiv.appendChild(divCard);

        }
    }