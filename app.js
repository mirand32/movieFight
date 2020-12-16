// Movie constructor to hold selected movies data
class Movie{
    constructor({Awards,BoxOffice,Metascore,imdbRating,imdbVotes}){
        // filter awards str for nums and add together
        this.awards = Awards.match(/\d+/g).reduce((a = 0, b) => {
          return parseInt(a) + parseInt(b);
        });
        this.boxOffice=parseInt(BoxOffice)
        this.score=parseInt(Metascore)
        this.rating=parseFloat(imdbRating)
        // filter our non digits
        this.votes=parseInt(imdbVotes.replace(/[^\d]+/g, ""))
    }
}

// create config object with funcs to pass into createAutoComplete
const autoCompleteConfig = {
    // get data with axios
    async fetchData(e) {
        const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "841c5c1b",
            s: e.target.value,
        },
    });
    // remove tutorial from screen
    document.querySelector(".tutorial").classList.add("is-hidden");
    // return data array of movies
    return response.data.Search;
  },
    //callback to create element for each movie option      
    renderOption(movie) {
        const option = document.createElement("button");
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
        option.innerHTML = `
            <img src="${imgSrc}" alt="">
            <h6 class="subtitle is-6">${movie.Title}(${movie.Year})</h6>
        `;
    //return new element
    return option;
  },

};
// create autocomplete block of code for left
createAutoComplete({
    // spread through config functions
    ...autoCompleteConfig,
    // spread through config functions
    root: document.querySelector("#left-autocomplete"),
    // handle selected option
    onOptionSelect(movie,input,container){
        //make api req on selected and handle data 
        onMovieSelect(movie,input,container,"left")
    },
});

// create autocomplete block of code for right
createAutoComplete({
  // spread through config functions
  ...autoCompleteConfig,
  // spread through config functions
  root: document.querySelector("#right-autocomplete"),
  // handle selected option
  onOptionSelect(movie, input, container) {
    //make api req on selected and handle data
    onMovieSelect(movie, input, container, "right");
  },
});

// create variables for left and right selected movies
let movieLeft
let movieRight

async function onMovieSelect(movie, input, container,side) {
    // make request and destructure returned data
    const { data } = await axios.get("http://www.omdbapi.com/", {
    params: {
        apikey: "841c5c1b",
        i: movie.imdbID,
    },
    });
    // update input field with selected movies title
    input.value = movie.Title;
    // update dom with selected movie's data
    container.innerHTML = movieDetail(data);
    // check which side movie is for and set the given variable
    if(side==="left"){
        movieLeft=new Movie(data)
    }else{
        movieRight=new Movie(data)
    }
    // if both left and right side have movies chosen compare data
    if(movieLeft && movieRight){
        runCompare(movieLeft,movieRight)
    }
}
// generate html for selected movie
const movieDetail=(movieData)=>{
    return `
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image">
                        <img src="${movieData.Poster}" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">${movieData.Title}</p>
                    <p class="subtitle is-6">${movieData.Genre}</p>
                    <div class="content">
                        ${movieData.Plot}
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
                    <article class="awards notification is-primary">
                        <p class="title">${movieData.Awards}</p>
                        <p class="subtitle is-h6">Awards</p>
                    </article>
                    <article class="boxOffice notification is-primary">
                        <p class="title">${movieData.BoxOffice}</p>
                        <p class="subtitle is-h6">Box Office</p>
                    </article>
                    <article class="score notification is-primary">
                        <p class="title">${movieData.Metascore}</p>
                        <p class="subtitle is-h6"></p>
                    </article>
                    <article class="rating notification is-primary">
                        <p class="title">${movieData.imdbRating}</p>
                        <p class="subtitle is-h6"></p>
                    </article>
                    <article class="votes notification is-primary">
                        <p class="title">${movieData.imdbVotes}</p>
                        <p class="subtitle is-h6"></p>
                    </article>
        </div>    
    </div>
        `;    
}
// compare data from movieleft and movie right
const runCompare=(data1,data2)=>{
    // get dom element with all the data elements inside for left and right
    const left = document.querySelector("#left-autocomplete .main");
    const right = document.querySelector("#right-autocomplete .main");
    // create array for each attribute
    const dataTypes=["awards","boxOffice","score","rating","votes"]
    // loop over data types to compare
    for(type of dataTypes){
        // add chosen classes depending on which side is greater for given data type
        if(data1[type]>data2[type]){
            left.querySelector(`.${type}`).classList.add("is-success")
            right.querySelector(`.${type}`).classList.add("is-warning")
        }
        else if(data1[type]<data2[type]){
            right.querySelector(`.${type}`).classList.add("is-success")
            left.querySelector(`.${type}`).classList.add("is-warning")
        }
    }
}