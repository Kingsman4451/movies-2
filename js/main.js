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
movies.splice(1000)

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
  $(".movie-img", newMovieLi).alt = movie.title;
  let movieTitle = movie.title;
  if (elSearchInput.value.trim() !== null && elSearchInput.value.trim() !== "") {
    let searchTitle = new RegExp(elSearchInput.value.trim(), 'i');
    movieTitle = movieTitle.replace(searchTitle, `<mark class="fw-bold text-white p-0 bg-primary bg-opacity-75">${movieTitle.match(searchTitle)}</mark>`);
  }

  $(".card-title", newMovieLi).innerHTML = movieTitle;
  $(".card-text", newMovieLi).textContent = movie.summary;
  $(".card-text", newMovieLi).textContent = movie.summary;
  $(".movie-categories", newMovieLi).textContent = movie.categories.join(", ");
  $(".movie-year", newMovieLi).textContent = movie.year;
  $(".movie-raiting", newMovieLi).textContent = movie.raiting;
  $(".movie-runtime", newMovieLi).textContent =`${movie.runTime} min`;
  $(".trailer-link", newMovieLi).href = movie.trailerLink;

  return newMovieLi;
}

// Form listener
elForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();
  if(searchMovieText !== ""){
    renderCards(normalizedMovies)
  }
})

// Search input listener
elSearchInput.addEventListener("input", ()=>{
  renderCards(normalizedMovies)
})

// Raiting input listener
elRaitingInput.addEventListener("input", ()=>{
  renderCards(normalizedMovies)
})

// Sort selecter listener
elSortSelect.addEventListener("change", ()=>{
  renderCards(normalizedMovies)
})

// Category selecter listener
elCategorySelect.addEventListener("change", ()=>{
  renderCards(normalizedMovies)
})

// Render movie cards function
let renderCards = function (movies) {
  elMovieList.innerHTML = "";
  let newMoviesFragment = document.createDocumentFragment();

  let sortedMovies = []
  let searchMovieText = elSearchInput.value.trim()
  
  // For search input
  if(searchMovieText !== null && searchMovieText !== ""){
    let searchRegex = new RegExp(searchMovieText, "gi");
    sortedMovies = movies.filter((movie)=>{
      return movie.title.match(searchRegex)
    })
  }else{
    sortedMovies = movies;
  }

  // For catergory selector
  sortedMovies = sortedMovies.filter(function(movie) {
    if (elCategorySelect.value !== "All"){
      return movie.categories.includes(elCategorySelect.value)
    }else if(elCategorySelect.value == "All") {
      return sortedMovies 
    }
  })

  // For raiting input
  if(elRaitingInput.value !== "" && !isNaN(parseFloat(elRaitingInput.value))){
    sortedMovies = sortedMovies.filter((movie)=>{
      return movie.raiting >= parseFloat(elRaitingInput.value)
    })
  }

  // For sort selector
  if (elSortSelect.value == movieSort[0]){
    sortedMovies = sortedMovies.sort((a,b)=> a.title.localeCompare(b.title))
  }
  if (elSortSelect.value == movieSort[1]){
    sortedMovies = sortedMovies.sort((a,b)=> b.title.localeCompare(a.title))
  }
  if (elSortSelect.value == movieSort[2]){
    sortedMovies = sortedMovies.sort((a,b)=> b.raiting - a.raiting)
  }
  if (elSortSelect.value == movieSort[3]){
    sortedMovies = sortedMovies.sort((a,b)=> a.raiting - b.raiting)
  }
  if (elSortSelect.value == movieSort[4]){
    sortedMovies = sortedMovies.sort((a,b)=> a.year - b.year)
  }
  if (elSortSelect.value == movieSort[5]){
    sortedMovies = sortedMovies.sort((a,b)=> b.year - a.year)
  }

  sortedMovies.forEach(movie => {
    newMoviesFragment.append(makeMovieCard(movie))
  });
  elMovieList.append(newMoviesFragment)
}
renderCards(normalizedMovies)


