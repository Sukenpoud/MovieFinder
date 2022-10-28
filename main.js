function search() {

    var searchbar = document.getElementById('s');
    var query = searchbar.value;
    var apiKey = "1fccc8c151d0c4dd97228fbb27024b34";
    var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + query;

    const myList = document.querySelector('div.search-results');
    myList.innerHTML ='';

    var films = [];

    fetch(url).then(function(response) {
        response.json().then(function(json) {
            films = json.results;
            console.log(films);

            for (const film of films) {
                const listItem = document.createElement('div');
                listItem.className ='film';

                const title = document.createElement('h3');
                title.className ='titre';
                listItem.appendChild( title ).textContent = film.original_title;

                // Partie scindée
                const bot = document.createElement('div');
                bot.className ='details';
                listItem.appendChild( bot );

                const left = document.createElement('div');
                left.className ='left';
                bot.appendChild( left );

                const right = document.createElement('div');
                right.className ='right';
                bot.appendChild( right );

                // Image
                const posterurl = 'http://image.tmdb.org/t/p/w500/'+film.poster_path;
                const posterimg = document.createElement('img');
                posterimg.src = posterurl;
                if(film.poster_path) {
                    left.append( posterimg );
                }           

                // Synopsis
                const synopsis = document.createElement('div');
                synopsis.className ='synopsis';
                right.appendChild( synopsis );

                synopsis.append( film.overview );

                // Popularité
                const popu = document.createElement('div');
                popu.className ='popularite';
                right.appendChild( popu );

                popu.append( `Popularité : ${film.popularity}` );

                // Ajout du film à la liste
                myList.appendChild(listItem);
              }
        });
    });

    // const textsynopsis = document.querySelector('div.details p');
}

