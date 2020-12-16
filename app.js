class Movie{
    constructor({Awards,BoxOffice,Metascore,imdbRating,imdbVotes}){
        this.awards = Awards.match(/\d+/g).reduce((a = 0, b) => {
          return parseInt(a) + parseInt(b);
        });
        this.boxOffice=parseInt(BoxOffice)
        this.score=parseInt(Metascore)
        this.rating=parseFloat(imdbRating)
        this.votes=parseInt(imdbVotes.replace(/[^\d]+/g, ""))
    }
}

const autoCompleteConfig = {
  async fetchData(e) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "841c5c1b",
        s: e.target.value,
      },
    });
    document.querySelector(".tutorial").classList.add("is-hidden");
    return response.data.Search;
  },
  renderOption(movie) {
    const option = document.createElement("button");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    option.innerHTML = `
                <img src="${imgSrc}" alt="">
                <h6 class="subtitle is-6">${movie.Title}(${movie.Year})</h6>
            `;
    return option;
  },

};

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#left-autocomplete"),
    onOptionSelect(movie,input,container){
        onMovieSelect(movie,input,container,"left")
    },
});

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#right-autocomplete"),
    onOptionSelect(movie, input, container) {
        onMovieSelect(movie, input, container, "right");
    },
});

let movieLeft
let movieRight
async function onMovieSelect(movie, input, container,side) {
    const { data } = await axios.get("http://www.omdbapi.com/", {
    params: {
        apikey: "841c5c1b",
        i: movie.imdbID,
    },
    });
    input.value = movie.Title;
    container.innerHTML = movieDetail(data);
    if(side==="left"){
        movieLeft=new Movie(data)
    }else{
        movieRight=new Movie(data)
    }
    if(movieLeft && movieRight){
        runCompare(movieLeft,movieRight)
    }
}

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

const runCompare=(data1,data2)=>{
    const left = document.querySelector("#left-autocomplete .main");
    const right = document.querySelector("#right-autocomplete .main");
    const dataTypes=["awards","boxOffice","score","rating","votes"]
    for(type of dataTypes){
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

const deactivateDropdown = (e) =>{
    const dropdrowns=document.querySelectorAll(".dropdown")
    if(!main.contains(e.target)){
        dropdrowns.forEach((dropdown)=>{
            console.log(dropdown)
            dropdown.classList.remove("is-active")
        })
    }
}