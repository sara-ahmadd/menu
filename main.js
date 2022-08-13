let options = document.querySelectorAll(".options ul li a");
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    options.forEach((op) => {
      op.classList.remove("active");
    });
    option.classList.add("active");
  });
});
let form = document.querySelector("form");

let imgDiv = document.createElement("div");
imgDiv.className = "add-img";
imgDiv.innerText = "Image Of The Meal";
imgDiv.style.textAlign = "center";
form.prepend(imgDiv);
let imagesArray = [
  "item-1.jpeg",
  "item-2.jpeg",
  "item-3.jpeg",
  "item-4.jpeg",
  "item-5.jpeg",
  "item-6.jpeg",
  "item-7.jpeg",
  "item-8.jpeg",
  "item-9.jpeg",
  "item-10.jpeg",
  "item-11.jpeg",
  "item-12.jpeg",
  "item-13.jpeg",
  "item-14.jpeg",
  "item-15.jpeg",
  "item-16.jpg",
];
let inputImg = document.querySelector("#names");
inputImg.addEventListener("click", (e) => {
  e.preventDefault();
  let itemsCard = document.createElement("div");
  itemsCard.style.cssText =
    "padding:10px; border-radius:10px; display:flex; flex-wrap:wrap";

  inputImg.insertAdjacentElement("afterend", itemsCard);
  itemsCard.append(`Choose Any Of Those Images:  `);
  imagesArray.forEach((img) => {
    let eachImage = document.createTextNode(`   ${img} / `);
    itemsCard.appendChild(eachImage);
  });
  setTimeout(() => {
    itemsCard.style.display = "none";
  }, 3000);
});
let inputImageName = document.querySelector(
  '[placeholder="Write Name of Image Here"]'
);

inputImageName.addEventListener("input", (e) => {
  for (let i = 0; i < imagesArray.length; i++) {
    if (inputImageName.value === imagesArray[i]) {
      imgDiv.innerHTML = `<img src='images/${inputImageName.value}'>`;
    }
  }
});
let section = document.querySelector(
  '[placeholder="Section(Breakfast,Lunch or Dinner)"]'
);
//get the customer meals card and append data to it.
let customerMeals = document.querySelector(".meals");

//function add event listener to deletebutton.
function deleteEvent(button, item) {
  button.addEventListener("click", (e) => {
    button.parentElement.remove();
    localStorage.removeItem(item);
  });
}
//function to add classname and id.
function addIdAndClassName(className, id, elementName, anotherClass) {
  elementName.className = `${className}`;
  elementName.id = `${id}`;
  elementName.classList.add(`${anotherClass}`);
}

/*created variable to count how many times the form submitted, and create new card each time.
starting from the index of the last item in local storage*/
let num = localStorage.length;
//on submitting the form, data entered is added to the menu.
form.addEventListener("submit", (e) => {
  //num value increases by one every time the form submitted.
  num++;
  //create Object to store data in local storage.
  let cardData = {};
  //prevent page refresh.
  e.preventDefault();
  //1-create card for each meal.
  let customerCard = document.createElement("div");
  addIdAndClassName("card", `${section.value.toLowerCase()}`, customerCard, `card-${num}`)
  cardData.section = `${section.value.toLowerCase()}`;

  //create button to delete the unavailable dishes.
  let deleteBtn = document.createElement("button");
  addIdAndClassName("delete-me", `btn-${num}`, deleteBtn, `card-${num}`)
  deleteBtn.innerText = "x";
  deleteEvent(deleteBtn, `card-${num}`);
  customerCard.appendChild(deleteBtn);
  customerMeals.appendChild(customerCard);

  //2-create the image card.
  let customerCardImg = document.createElement("div");
  addIdAndClassName("img", `img-${num}`, customerCardImg, `card-${num}`)
  customerCard.appendChild(customerCardImg);

  //3-create the info card.
  let customerCardInfo = document.createElement("div");
  addIdAndClassName("info", `info-${num}`, customerCardInfo, `card-${num}`);
  customerCard.appendChild(customerCardInfo);

  //4-parent of name and price.
  let namePriceParent = document.createElement("div");
  addIdAndClassName("name-price-parent", `parent-${num}`, namePriceParent, `card-${num}`)
  customerCardInfo.appendChild(namePriceParent);

  //5-add name of the meal in paragraph.
  let customerCardInfoParag = document.createElement("p");
  addIdAndClassName("name", `name-${num}`, customerCardInfoParag, `card-${num}`)
  namePriceParent.appendChild(customerCardInfoParag);

  //6-add price of the meal in paragraph.
  let customerCardInfoPrice = document.createElement("h3");
  addIdAndClassName("price", `price-${num}`, customerCardInfoPrice, `card-${num}`)
  namePriceParent.appendChild(customerCardInfoPrice);

  //7-add description of the meal in paragraph.
  let customerCardInfoDesc = document.createElement("div");
  addIdAndClassName("description", `desc-${num}`, customerCardInfoDesc, `card-${num}`)
  customerCardInfo.appendChild(customerCardInfoDesc);

  //first add the image of the meal.
  customerCardImg.innerHTML = `${imgDiv.innerHTML}`;
  cardData.image = imgDiv.innerHTML;

  //add name of the meal.
  let mealName = document.querySelector("[placeholder='Name']");
  customerCardInfoParag.innerText = `${mealName.value.toUpperCase()}`;
  cardData.name = mealName.value;

  //add price of the meal.
  let mealPrice = document.querySelector("[placeholder='Price']");
  customerCardInfoPrice.innerHTML = `$${mealPrice.value.toUpperCase()}`;
  cardData.price = `$${mealPrice.value}`;

  //add description of meal.
  let mealDesc = document.querySelector("[placeholder='Description']");
  customerCardInfoDesc.innerHTML = `${mealDesc.value}`;
  cardData.description = mealDesc.value;

  //store data in local storage as a json object.
  let jsonData = JSON.stringify(cardData);
  localStorage.setItem(`card-${num}`, jsonData);
});

//create card foe each meal with data brought from the local storage.
for (let i = 1; i <= 10000; i++) {
  //get the last image entered from local storage.
  let dataInTheLocalStorage = localStorage.getItem(`card-${i}`);
  let stringObjectOfData = JSON.parse(dataInTheLocalStorage);

  let mealsDiv = document.querySelector("#meals");

  if (stringObjectOfData !== null) {
    //1-create card for each meal.
    let card = document.createElement("div");
    addIdAndClassName("card", `${stringObjectOfData.section}`, card, `card-${i}`)
    //create button to delete the unavailable dishes.
    let deleteBtn = document.createElement("button");
    addIdAndClassName("delete-me", `btn-${i}`, deleteBtn, `card-${i}`);
    deleteBtn.innerText = "x";
    card.appendChild(deleteBtn);
    deleteEvent(deleteBtn, `card-${i}`)
    mealsDiv.appendChild(card);

    //2-create the image card.
    let customerCardImg = document.createElement("div");
    addIdAndClassName("img", `${stringObjectOfData.section}`, customerCardImg, `card-${i}`)
    customerCardImg.innerHTML = stringObjectOfData.image;
    card.appendChild(customerCardImg);

    //3-create the info card.
    let customerCardInfo = document.createElement("div");
    addIdAndClassName("info", `${stringObjectOfData.section}`, customerCardInfo, `card-${i}`)
    card.appendChild(customerCardInfo);

    //4-parent of name and price.
    let namePriceParent = document.createElement("div");
    addIdAndClassName("name-price-parent", `${stringObjectOfData.section}`, namePriceParent, `card-${i}`)
    customerCardInfo.appendChild(namePriceParent);

    //5-add name of the meal in paragraph.
    let customerCardInfoParag = document.createElement("p");
    addIdAndClassName("name", `${stringObjectOfData.section}`, customerCardInfoParag, `card-${i}`)
    customerCardInfoParag.innerText = stringObjectOfData.name;
    namePriceParent.appendChild(customerCardInfoParag);

    //6-add price of the meal in paragraph.
    let customerCardInfoPrice = document.createElement("h3");
    addIdAndClassName("price", `${stringObjectOfData.section}`, customerCardInfoPrice, `card-${i}`)
    customerCardInfoPrice.innerText = stringObjectOfData.price;
    namePriceParent.appendChild(customerCardInfoPrice);

    //7-add description of the meal in paragraph.
    let customerCardInfoDesc = document.createElement("div");
    addIdAndClassName("description", `${stringObjectOfData.section}`, customerCardInfoDesc, `card-${i}`)
    customerCardInfoDesc.innerText = stringObjectOfData.description;
    customerCardInfo.appendChild(customerCardInfoDesc);

    let allMealsDescription = document.querySelectorAll(".description");
    let divs = document.querySelectorAll(`.card-${i}`);

    //get meals for breakfast.
    let breakfast = document.querySelector("#breakfast");
    breakfast.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        if (div.id === "breakfast") {
          div.style.display = "flex";
          allMealsDescription.forEach((desc) => {
            desc.style.cssText = 'overflowWrap : "break-word";';
          });
        } else {
          div.style.display = "none";
        }
      });
    });

    //get meals for lunch.
    let lunch = document.querySelector("#lunch");
    lunch.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        if (div.id === "lunch") {
          div.style.display = "flex";
          allMealsDescription.forEach((desc) => {
            desc.style.cssText = 'overflowWrap : "break-word";';
          });
        } else {
          div.style.display = "none";
        }
      });
    });
    //get meals for dinner.
    let dinner = document.querySelector("#dinner");
    dinner.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        if (div.id === "dinner") {
          div.style.display = "flex";
          allMealsDescription.forEach((desc) => {
            desc.style.cssText = 'overflowWrap : "break-word";';
          });
        } else {
          div.style.display = "none";
        }
      });
    });
    //get shakes.
    let shakes = document.querySelector("#shakes");
    shakes.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        div.style.display = "none";
        if (div.id === "shakes") {
          div.style.display = "flex";
          allMealsDescription.forEach((desc) => {
            desc.style.cssText = 'overflowWrap : "break-word";';
          });
        } else {
          div.style.display = "none";
        }
      });
    });
    //get all meals.
    let allMeals = document.querySelector("#all");
    allMeals.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        div.style.display = "flex";
        allMealsDescription.forEach((desc) => {
          desc.style.cssText = 'overflowWrap : "break-word";';
        });
      });
    });
  }
}

//hide the form to see users view.
let userView = document.querySelector("#click-me");
userView.addEventListener("click", (e) => {
  hide();
});

//display the form to see owner view.
let ownerView = document.querySelector("#click");
ownerView.addEventListener("click", (e) => {
  displyFlex();
});

//function to display the delete button.
function displyFlex() {
  form.style.display = "flex";
  document.querySelectorAll(".delete-me").forEach((btn) => {
    btn.style.display = "flex";
  });
}
//function to undisplay the delete button.
function hide() {
  form.style.display = "none";
  document.querySelectorAll(".delete-me").forEach((btn) => {
    btn.style.display = "none";
  });
}
//event to scroll the window up using the up button.
let upBtn = document.querySelector("#up");
upBtn.addEventListener("click", (e) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
//display the up button on scroll > 100px.
document.onscroll = () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    upBtn.style.display = "block";
  } else {
    upBtn.style.display = "none";
  }
};