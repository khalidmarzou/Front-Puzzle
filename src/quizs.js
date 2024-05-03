const slideQuiz = document.getElementById("slide1");
slideQuiz.classList.add("flex", "justify-center", "items-center");
const containerCheck = document.createElement("div");

containerCheck.innerHTML = `
                            <div class="flex flex-col justify-center items-center gap-5">
                                <h1 class="text-2xl font-bold text-purple-950">Check your level and let's get started.</h1>
                                <div class="flex gap-10">
                                <div class="inline-flex items-center">
                                <label class="relative flex items-center p-3 rounded-full cursor-pointer" for="dificult">
                                    <input name="level" type="radio"
                                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    id="dificult" />
                                    <span
                                    class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                    </svg>
                                    </span>
                                </label>
                                <label class="mt-px text-black font-extrabold cursor-pointer select-none" for="dificult">
                                    Dificult
                                </label>
                                </div>
                                <div class="inline-flex items-center">
                                <label class="relative flex items-center p-3 rounded-full cursor-pointer" for="easy">
                                    <input name="level" type="radio"
                                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    id="easy" checked />
                                    <span
                                    class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                    </svg>
                                    </span>
                                </label>
                                <label class="mt-px font-extrabold text-black cursor-pointer select-none" for="easy">
                                    Easy
                                </label>
                                </div>
                                <div class="inline-flex items-center">
                                <label class="relative flex items-center p-3 rounded-full cursor-pointer" for="combination">
                                    <input name="level" type="radio"
                                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    id="combination" checked />
                                    <span
                                    class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                    </svg>
                                    </span>
                                </label>
                                <label class="mt-px font-extrabold text-black cursor-pointer select-none" for="combination">
                                    Combination
                                </label>
                                </div>
                                </div>
                                <div class="inline-flex" id='numberQs'>
                                  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:bg-gray-400" onclick="tenisFocused()">
                                    10 Qs
                                  </button>
                                  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:bg-gray-400" onclick="twentyisFocused()">
                                    20 Qs
                                  </button>
                                </div>
                                <button onclick="startQuiz(event)" class="bg-white hover:bg-black hover:text-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                    Start
                                </button>
                            </div>
                        `;

slideQuiz.append(containerCheck);

// Fill Questions from server :

// Fill Questions from json File :

let difficultQs = [];
let easyQs = [];

document.addEventListener("DOMContentLoaded", function () {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://getpantry.cloud/apiv1/pantry/48db89c1-ef9c-4410-b945-2c1a51212191/basket/questions",
    true
  );
  xhr.onload = function () {
    if (this.readyState == 4) {
      if (this.status >= 200 && this.status < 300) {
        difficultQs = JSON.parse(this.responseText).difficultQuestions;
        easyQs = JSON.parse(this.responseText).easyQuestions;
      } else {
        console.error("Failed to get data questions. Status:", this.status);
      }
    }
  };
  xhr.onerror = function (error) {
    console.error("Failed to send request", error);
  };
  xhr.send();
});

// ///////////////////
let Qsnumber;
function tenisFocused() {
  Qsnumber = 10;
}
function twentyisFocused() {
  Qsnumber = 20;
}

function getQuestions(list, number) {
  const shuffledList = list.sort(() => Math.random() - 0.5);
  return shuffledList.slice(0, number);
}

function startQuiz(e) {
  const level = containerCheck.querySelector('input[type="radio"]:checked').id;
  if (Qsnumber !== undefined) {
    slideQuiz.innerHTML = "";
    if (level === "dificult") {
      const currentQs = getQuestions(difficultQs, Qsnumber);
    } else if (level == "easy") {
      const currentQs = getQuestions(easyQs, Qsnumber);
    } else {
      const currentQs = getQuestions(difficultQs.concat(easyQs), Qsnumber);
    }
  } else {
    getID("numberQs").classList.add("border", "border-red-700");
  }
}

function buildQCMinHTML(list) {}
