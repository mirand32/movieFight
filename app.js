const movieQuery1=document.querySelector(".movie1 input")
const movieQuery2=document.querySelector(".movie2 input")
class Movie{
    constructor({ Title, Year, Poster, imdbID}){
        this.title=Title
        this.year=Year
        this.poster=Poster
        this.id=imdbID
    }
}

const fetchData = async (e)=> {
    const response = await axios.get("http://www.omdbapi.com/", {
        params:{
            apikey: "841c5c1b",
            s:e.target.value
        }
    })
    if (response.data.Error){
        return []
    }
    return response.data.Search
}

const displaySearchRes=(movies,dropdownList)=>{
    for (movieData of movies) {
        const movie= new Movie(movieData)
        const newMovie = document.createElement("button")
        newMovie.classList.add("dropdown-item")
        newMovie.id = movie.id
        newMovie.addEventListener("click",displayMovie)
        newMovie.innerHTML = `
                <img src="${movie.poster}" alt="">
                <h4 class="subtitle is-h4">${movie.title}(${movie.year})</h4>
            `
        dropdownList.appendChild(newMovie)
    }
}

async function displayMovie(e){
    const movieID=this.id
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "841c5c1b",
            i: movieID
        }
    })
    this.parentElement.innerHTML=""
    console.log(response.data)
}

const displayError = (content) => {
    const errorItem=document.createElement("h4")
    errorItem.classList.add("dropdown-item")
    errorItem.innerHTML="No Results Found"
    content.appendChild(errorItem)
}

const onInput = debounce(async (e) => {
    const movies=await fetchData(e);
    const dropdownList = e.target.nextElementSibling
    dropdownList.innerHTML=""
    if (movies.length===0)displayError(dropdownList)
    displaySearchRes(movies, dropdownList);
}, 500);

movieQuery1.addEventListener("input",onInput)
movieQuery2.addEventListener("input",onInput)