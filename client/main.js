const btn = document.querySelector('#btn')

btn.addEventListener('click', ()=>{
    fetch('http://localhost:3000/pets')
    .then(response => response.json())
    .then(data => console.log(data));
})