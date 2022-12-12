//assinig variables
let timer;
let deleteFirstPhotoDelay;

//fetching the breed list function
async function start() {
  // we use try/catch in case an error is happened. internet down or smthg.
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    //calling createBreedList function and passing the fectched data as an argument
    createBreedList(data.message);
  } catch (e) {
    // e means error, it contain error information in case
    console.log(e);
  }
}

//fetching the breed list
start();

//creating breed list selector
// Object.keys(object) ==> The Object.keys() method returns an array.
// this.value == african, agita, beagle..
function createBreedList(data) {
  document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)"> 
        <option>choose a dog breed</option>
        ${Object.keys(data).map((item) => {
          return `<option>${item}</option>`;
        })}
    </select>
    `;
}

async function loadByBreed(breed) {
  if (breed !== "choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    //calling createGallery function and passing the fectched data as an argument
    createGallery(data.message);
  }
}

function createGallery(breedsImages) {
  let currentPosition = 0;

  // Clear time out and interval for every item selected.
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  // selecting the slideshow div
  let slideShow = document.getElementById("slideshow");

  // check if there's only one image per breed, two, or more.. and set the currentPosition value for every situation
  if (breedsImages.length > 1) {
    slideShow.innerHTML = `
        <div class="slide" style="background-image: url('${breedsImages[0]}');"></div>
        <div class="slide" style="background-image: url('${breedsImages[1]}');"></div>
    `;
    // currentPosition = currentPosition + 2
    currentPosition += 2;

    // in case there's exactly two images per breed
    if (breedsImages.length == 2) {
      // currentPosition = currentPosition + 0
      currentPosition += 0;
    }

    //run the nextSlide function
    timer = setInterval(nextSlide, 3000);
  } else {
    // in case there's only one image for a dog breed
    slideShow.innerHTML = `
        <div class="slide" style="background-image: url('${breedsImages[0]}');"></div>
        <div class="slide"></div>
    `;
    //     .slide:nth-last-child(2) {
    //     opacity: 1;
    // }
  }

  function nextSlide() {
    slideShow.insertAdjacentHTML(
      "beforeend",
      `
            <div class="slide" style="background-image: url('${breedsImages[currentPosition]}');"></div>
        `
    );

    deleteFirstPhotoDelay = setTimeout(function () {
      // automatically js select the first element that contain ".slide" class
      document.querySelector(".slide").remove();
    }, 1000);

    // incrementing currentPosition value
    if (currentPosition + 1 >= breedsImages.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
