const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

btn.addEventListener('click', () => {
    search.classList.toggle('active')
    input.focus()
    if(!input.value == ''){
    window.location = "https://www.google.com/search?q=" + input.value;
    }
})