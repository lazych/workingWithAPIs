// fetch(`https://dog.ceo/api/breeds/list/all`).then(function (response) {
//     return response.json()
// }).then(function (data) {
//     console.log(data)
// })


let timer
let deleteFirstPhotoDelay
//fetching the breed list
async function start() {  
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createBreedList(data.message)        
    } catch (e) {
        console.log(`wa sf ghayrha!`)
    }
}

start()

//creating the select element
function createBreedList(data) {
    document.getElementById('breed').innerHTML = `
    <select onchange="loadByBreed(this.value)"> 
        <option>choose a dog breed</option>
        ${Object.keys(data).map(item => {
            return `<option>${item}</option>`
        })}
    </select>
    `
}

async function loadByBreed(breed) {
    if (breed !== 'choose a dog breed') {
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
            const data = await response.json()
            createGallery(data.message)
        }
}

function createGallery(breedsImages) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    let slideShow = document.getElementById('slideshow')
    if (breedsImages.length > 1) {
            slideShow.innerHTML = `
        <div class="slide" style="background-image: url('${breedsImages[0]}');"></div>
        <div class="slide" style="background-image: url('${breedsImages[1]}');"></div>
    `
    currentPosition += 2
    if(breedsImages.length == 2) currentPosition += 0

    timer = setInterval(nextSlide, 3000)

    } else {
            slideShow.innerHTML = `
        <div class="slide" style="background-image: url('${breedsImages[0]}');"></div>
        <div class="slide"></div>
    `
    }

    function nextSlide() {
        slideShow.insertAdjacentHTML("beforeend", `
            <div class="slide" style="background-image: url('${breedsImages[currentPosition]}');"></div>
        `)
        deleteFirstPhotoDelay = setTimeout(function() {
            document.querySelector('.slide').remove()
        }, 1000);
        if (currentPosition + 1 >= breedsImages.length) {
            currentPosition = 0
        } else {
            currentPosition++
        }
    }
}