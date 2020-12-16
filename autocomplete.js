const createAutoComplete=async ({root,getData,renderOption,onSelectOption})=>{
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
        const data= await getData(e)
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
                onSelectOption(item,input,content)
            })
            content.appendChild(el)
        }
    };

    const textField=root.querySelector("input")
    textField.addEventListener("input", onInput);
}