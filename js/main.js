let elForm = $(".js-form");
let elInput = $(".js-input", elForm);


let elMovieList = $(".js-list");

let elMovieTemplate = $("#movie-template").content;

movies.splice(200)

let normalizedMovies = movies.map((movie, i)=>{
  return{
    id: i + 1,
    title: movie.Title.toString(),
    fullTitle: movie.fulltitle.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split("|").join(", "),
    summary: movie.summary,
    raiting: movie.imdb_rating,
    runTime: movie.runtime,
    language: movie.language,
    trailerLink: `https://www.youtube.com/watch?v=${movie.ytid}`,
    poster:`https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`
  }
})


function makeMovieCard(movie) {
  let newMovieLi = elMovieTemplate.cloneNode(true);

  $(".movie-img", newMovieLi).src = movie.poster;
  $(".card-title", newMovieLi).textContent = movie.title;
  $(".card-text", newMovieLi).textContent = movie.summary;
  $(".card-text", newMovieLi).textContent = movie.summary;
  $(".movie-categories", newMovieLi).textContent = movie.categories;
  $(".movie-year", newMovieLi).textContent = movie.year;
  $(".movie-raiting", newMovieLi).textContent = movie.raiting;
  $(".movie-runtime", newMovieLi).textContent =`${movie.runTime} min`;
  $(".trailer-link", newMovieLi).href = movie.trailerLink;

  return newMovieLi;
}


let renderMovies = function() {
  let newMoviesFragment = document.createDocumentFragment();

  normalizedMovies.forEach(movie => {
    newMoviesFragment.append(makeMovieCard(movie))
  });

  elMovieList.append(newMoviesFragment)
}
renderMovies()


elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elMovieList.innerHTML = "";
  let searchRegex = new RegExp(elInput.value.trim(), "gi");

  normalizedMovies.forEach(function(movie) {
    if (movie.title.match(searchRegex)){
      elMovieList.append(makeMovieCard(movie))
    } 
  })
})