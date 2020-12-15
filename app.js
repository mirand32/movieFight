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

const fetchData = async (el)=> {
    const dropdownList = el.nextElementSibling
    dropdownList.innerHTML = ""
    const response = await axios.get("http://www.omdbapi.com/", {
        params:{
            apikey: "841c5c1b",
            s:el.value
        }
    })
    
    const movies=response.data.Search
    displaySearchRes(movies, dropdownList)
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

function displaySearchRes(movies,dropdownList){
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

const debounce = (func, delay) =>{
    console.log("1")
    let timeoutID
    return (...args)=>{
        if (timeoutID){
            clearTimeout(timeoutID)
        }
        timeoutID=setTimeout(()=>{
            func.apply(null, args)
        },delay)
    }
}

const hello=(x)=>{
    alert(x)
}

movieQuery1.addEventListener("input",debounce((e)=>{
    fetchData(e.target)
},2000))

// on keypress run search
// for search get info 
