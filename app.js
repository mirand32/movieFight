const fetchData = async (e)=> {
    console.log()
    const response = await axios.get("http://www.omdbapi.com/", {
        params:{
            apikey: "841c5c1b",
            s:e.target.value
        }
    })
    if (response.data.Error){
        displayError(e.target.nextElementSibling);
    }else{
        return response.data.Search
    }
}

const createSearchRes=(movie)=>{
    const option = document.createElement("button")
    const imgSrc=(movie.Poster==="N/A") ? "" : movie.Poster
    option.innerHTML = `
        <img src="${imgSrc}" alt="">
        <h6 class="subtitle is-6">${movie.Title}(${movie.Year})</h6>
    `
    return option
}

async function selectMovie(movie,input,container){
    const {data} = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "841c5c1b",
            i: movie.imdbID
        }
    })
    input.value=movie.Title
    container.innerHTML=movieDetail(data)
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
                    <article class="notification is-primary">
                        <p class="title">${movieData.Awards}</p>
                        <p class="subtitle is-h6">Awards</p>
                    </article>
                    <article class="notification is-primary">
                        <p class="title">${movieData.BoxOffice}</p>
                        <p class="subtitle is-h6">Box Office</p>
                    </article>
                    <article class="notification is-primary">
                        <p class="title">${movieData.Metascore}</p>
                        <p class="subtitle is-h6"></p>
                    </article>
                    <article class="notification is-primary">
                        <p class="title">${movieData.imdbRating}</p>
                        <p class="subtitle is-h6"></p>
                    </article>
                    <article class="notification is-primary">
                        <p class="title">${movieData.imdbVotes}</p>
                        <p class="subtitle is-h6"></p>
                    </article>
        </div>    
    </div>
        `;    
}

const displayError = (content) => {
    const errorItem=document.createElement("h4")
    errorItem.classList.add("dropdown-item")
    errorItem.innerHTML="No Results Found"
    content.appendChild(errorItem)
}

const deactivateDropdown = (e) =>{
    const main=document.querySelector(".main")
    const dropdrowns=document.querySelectorAll(".dropdown")
    if(!main.contains(e.target)){
        dropdrowns.forEach((dropdown)=>{
            console.log(dropdown)
            dropdown.classList.remove("is-active")
        })
    }
}

createAutoComplete({
    root: document.querySelector(".movie1"),
    getData: fetchData,
    renderOption: createSearchRes,
    onSelectOption:selectMovie
});

createAutoComplete({
    root: document.querySelector(".movie2"),
    getData: fetchData,
    renderOption: createSearchRes,
    onSelectOption:selectMovie
});

// document.addEventListener("click", deactivateDropdown)