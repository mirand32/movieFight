const createAutoComplete=({
    root,
    fetchData,
    renderOption,
    onOptionSelect
})=>{
    root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input type="text" class="dropdown-trigger input">
    <div class="dropdown">
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            
            </div>
        </div>
    </div>
    `;
    
    const onInput = debounce(async (e) => {
        root.querySelector(".dropdown")
            .classList.add("is-active");
        root.querySelector(".dropdown-content").innerHTML=""
        const data= await fetchData(e)
        handleData(data)
    }, 500);
    
    const handleData = (data) => {
        const content = root.querySelector(".dropdown-content");
        content.innerHTML=""
        const input = root.querySelector("input")
        for(let item of data){
            const el = renderOption(item);
            el.classList.add("dropdown-item");
            el.addEventListener("click",()=>{
                onOptionSelect(item,input,content)
            })
            content.appendChild(el)
        }
    };

    const textField=root.querySelector("input")
    textField.addEventListener("input", onInput);
}