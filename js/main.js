// Call form elements
let elForm = $(".js-form");
let elSearchInput = $(".js-input-search", elForm);
let elRaitingInput = $(".js-input-raiting", elForm);
let elCategorySelect = $(".js-movie-category", elForm);
let elSortSelect = $(".js-movie-sort", elForm);

// Call movies list
let elMovieList = $(".js-list");

// Call movie templaye
let elMovieTemplate = $("#movie-template").content;

// splice movies
movies.splice(500)

// create arrays
let movieCategories = [];
let movieSort = ["A-Z", "Z-A", "From highest to lowest (raiting)", "From lowest to highest (raiting)", "Old to new", "New to old"]

// Normalized movies array
let normalizedMovies = movies.map((movie, i)=>{
  return{
    id: i + 1,
    title: movie.Title.toString(),
    fullTitle: movie.fulltitle.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split("|"),
    summary: movie.summary,
    raiting: movie.imdb_rating,
    runTime: movie.runtime,
    language: movie.language,
    trailerLink: `https://www.youtube.com/watch?v=${movie.ytid}`,
    poster:`https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`
  }
})



// Display select options function
function displaySelectOptions(){
  normalizedMovies.forEach((movie)=>{
    movie.categories.forEach((category)=>{
      if(!movieCategories.includes(category)){
        movieCategories.push(category);
      }
    })
  })
  movieCategories.unshift("All");
  movieCategories.forEach((category)=>{
    let newOption = createElement("option", "", category);
    newOption.value = category;
    elCategorySelect.append(newOption);
  })
  
  
  movieSort.forEach(sort=>{
    let newOption = createElement("option", "", sort);
    newOption.value = sort;
    elSortSelect.append(newOption);
  })
}
displaySelectOptions()


// Create movie card function
function makeMovieCard(movie) {
  let newMovieLi = elMovieTemplate.cloneNode(true);

  $(".movie-img", newMovieLi).src = movie.poster;
  $(".card-title", newMovieLi).textContent = movie.title;
  $(".card-text", newMovieLi).textContent = movie.summary;
  $(".card-text", newMovieLi).textContent = movie.summary;
  $(".movie-categories", newMovieLi).textContent = movie.categories.join(", ");
  $(".movie-year", newMovieLi).textContent = movie.year;
  $(".movie-raiting", newMovieLi).textContent = movie.raiting;
  $(".movie-runtime", newMovieLi).textContent =`${movie.runTime} min`;
  $(".trailer-link", newMovieLi).href = movie.trailerLink;

  return newMovieLi;
}

// Sort normalizedMovies array
let sortMovies = []
if (elSortSelect.value == movieSort[0]){
  sortMovies = normalizedMovies.sort((a,b)=> a.title.localeCompare(b.title))
}

// Display movies list function
let renderMovies = function(movies) {
  let newMoviesFragment = document.createDocumentFragment();
  movies.forEach(movie => {
    newMoviesFragment.append(makeMovieCard(movie))
  });

  elMovieList.append(newMoviesFragment)

}
renderMovies(sortMovies)



// Search movie function
elSearchInput.addEventListener("change", (evt) => {
  evt.preventDefault();
  elMovieList.innerHTML = "";
  let searchRegex = new RegExp(elSearchInput.value.trim(), "gi");

  let searchResult = normalizedMovies.filter(function(movie) {
    if (movie.title.match(searchRegex)){
      return movie.title.match(searchRegex)
    } 
  })

  renderMovies(searchResult)
})

// Search movies by its raiting function
elRaitingInput.addEventListener("change", (evt)=>{
  evt.preventDefault();
  elMovieList.innerHTML = "";

  let raitingMovies = normalizedMovies.filter(function(movie) {
    if (+elRaitingInput.value < movie.raiting){
      return +elRaitingInput.value < movie.raiting
    } 
  })

  renderMovies(raitingMovies)
})

// Search movies by its category function
elCategorySelect.addEventListener("change", (evt)=>{
  evt.preventDefault();
  elMovieList.innerHTML = "";

  let categoryMovies = normalizedMovies.filter(function(movie) {
    if (movie.categories.includes(elCategorySelect.value)){
      return movie.categories.includes(elCategorySelect.value)
    }else if (elCategorySelect.value == "All"){
      return normalizedMovies
    }
  })

  renderMovies(categoryMovies)
})


// Sort movies function
elSortSelect.addEventListener("change", (evt)=>{
  evt.preventDefault();
  elMovieList.innerHTML = "";
  let sortMovies = [];
    if (elSortSelect.value == movieSort[0]){
      sortMovies = normalizedMovies.sort((a,b)=> a.title.localeCompare(b.title))
    }
    if (elSortSelect.value == movieSort[1]){
      sortMovies = normalizedMovies.sort((a,b)=> b.title.localeCompare(a.title))
    }
    if (elSortSelect.value == movieSort[2]){
      sortMovies = normalizedMovies.sort((a,b)=> b.raiting - a.raiting)
    }
    if (elSortSelect.value == movieSort[3]){
      sortMovies = normalizedMovies.sort((a,b)=> a.raiting - b.raiting)
    }
    if (elSortSelect.value == movieSort[4]){
      sortMovies = normalizedMovies.sort((a,b)=> a.year - b.year)
    }
    if (elSortSelect.value == movieSort[5]){
      sortMovies = normalizedMovies.sort((a,b)=> b.year - a.year)
    }
  renderMovies(sortMovies)
})
