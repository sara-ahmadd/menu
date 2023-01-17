let options = document.querySelectorAll(".options ul li a");
let imageUrl = document.querySelector(
  'input[placeholder="Write URL of Image Here"]'
);
let form = document.querySelector("form");

let imgDiv = document.createElement("div");

let section = document.querySelector(
  '[placeholder="Section(Breakfast,Lunch or Dinner)"]'
);

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    options.forEach((op) => {
      op.classList.remove("active");
    });
    option.classList.add("active");
  });
});
imgDiv.className = "add-img";
imgDiv.innerText = "Image Of The Meal";
imgDiv.style.textAlign = "center";
form.prepend(imgDiv);

imageUrl.addEventListener("focusout", (e) => {
  if (imageUrl.value) {
    imgDiv.innerHTML = `<img src='${imageUrl.value}'>`;
  }
});
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
  elementName.classList.add(`${anotherClass}`, `${id}`);
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
  if (section.value !== "") {
    addIdAndClassName(
      "card",
      `${section.value.toLowerCase()}`,
      customerCard,
      `card-${num}`
    );
    cardData.section = `${section.value.toLowerCase()}`;
  } else {
    return;
  }
  //create button to delete the unavailable dishes.
  let deleteBtn = document.createElement("button");
  addIdAndClassName("delete-me", `btn-${num}`, deleteBtn, `card-${num}`);
  deleteBtn.innerText = "x";
  deleteEvent(deleteBtn, `card-${num}`);
  customerCard.appendChild(deleteBtn);
  customerMeals.appendChild(customerCard);

  //2-create the image card.
  let customerCardImg = document.createElement("div");
  addIdAndClassName("img", `img-${num}`, customerCardImg, `card-${num}`);
  customerCard.appendChild(customerCardImg);

  //3-create the info card.
  let customerCardInfo = document.createElement("div");
  addIdAndClassName("info", `info-${num}`, customerCardInfo, `card-${num}`);
  customerCard.appendChild(customerCardInfo);

  //4-parent of name and price.
  let namePriceParent = document.createElement("div");
  addIdAndClassName(
    "name-price-parent",
    `parent-${num}`,
    namePriceParent,
    `card-${num}`
  );
  customerCardInfo.appendChild(namePriceParent);

  //5-add name of the meal in paragraph.
  let customerCardInfoParag = document.createElement("p");
  addIdAndClassName(
    "name",
    `name-${num}`,
    customerCardInfoParag,
    `card-${num}`
  );
  namePriceParent.appendChild(customerCardInfoParag);

  //6-add price of the meal in paragraph.
  let customerCardInfoPrice = document.createElement("h3");
  addIdAndClassName(
    "price",
    `price-${num}`,
    customerCardInfoPrice,
    `card-${num}`
  );
  namePriceParent.appendChild(customerCardInfoPrice);

  //7-add description of the meal in paragraph.
  let customerCardInfoDesc = document.createElement("div");
  addIdAndClassName(
    "description",
    `desc-${num}`,
    customerCardInfoDesc,
    `card-${num}`
  );
  customerCardInfo.appendChild(customerCardInfoDesc);

  //first add the image of the meal.
  customerCardImg.innerHTML = `${imgDiv.innerHTML}`;
  cardData.image = imgDiv.innerHTML;

  //add name of the meal.
  let mealName = document.querySelector("[placeholder='Name']");
  if (mealName.value !== "") {
    customerCardInfoParag.innerText = `${mealName.value.toUpperCase()}`;
    cardData.name = mealName.value;
  } else {
    return;
  }

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
  window.location.reload();
});

//create card for each meal with data brought from the local storage.
for (let i = 0; i <= 10000; i++) {
  //get the last image entered from local storage.
  let dataInTheLocalStorage = localStorage.getItem(`card-${i}`);
  let stringObjectOfData = JSON.parse(dataInTheLocalStorage);

  let mealsDiv = document.querySelector("#meals");

  if (stringObjectOfData !== null) {
    //1-create card for each meal.
    let card = document.createElement("div");
    addIdAndClassName(
      "card",
      `${stringObjectOfData.section}`,
      card,
      `card-${i}`
    );
    //create button to delete the unavailable dishes.
    let deleteBtn = document.createElement("button");
    addIdAndClassName("delete-me", `btn-${i}`, deleteBtn, `card-${i}`);
    deleteBtn.innerText = "x";
    card.appendChild(deleteBtn);
    deleteEvent(deleteBtn, `card-${i}`);
    mealsDiv.appendChild(card);

    //2-create the image card.
    let customerCardImg = document.createElement("div");
    addIdAndClassName(
      "img",
      `${stringObjectOfData.section}`,
      customerCardImg,
      `card-${i}`
    );
    customerCardImg.innerHTML = stringObjectOfData.image;
    card.appendChild(customerCardImg);

    //3-create the info card.
    let customerCardInfo = document.createElement("div");
    addIdAndClassName(
      "info",
      `${stringObjectOfData.section}`,
      customerCardInfo,
      `card-${i}`
    );
    card.appendChild(customerCardInfo);

    //4-parent of name and price.
    let namePriceParent = document.createElement("div");
    addIdAndClassName(
      "name-price-parent",
      `${stringObjectOfData.section}`,
      namePriceParent,
      `card-${i}`
    );
    customerCardInfo.appendChild(namePriceParent);

    //5-add name of the meal in paragraph.
    let customerCardInfoParag = document.createElement("p");
    addIdAndClassName(
      "name",
      `${stringObjectOfData.section}`,
      customerCardInfoParag,
      `card-${i}`
    );
    customerCardInfoParag.innerText = stringObjectOfData.name;
    namePriceParent.appendChild(customerCardInfoParag);

    //6-add price of the meal in paragraph.
    let customerCardInfoPrice = document.createElement("h3");
    addIdAndClassName(
      "price",
      `${stringObjectOfData.section}`,
      customerCardInfoPrice,
      `card-${i}`
    );
    customerCardInfoPrice.innerText = stringObjectOfData.price;
    namePriceParent.appendChild(customerCardInfoPrice);

    //7-add description of the meal in paragraph.
    let customerCardInfoDesc = document.createElement("div");
    addIdAndClassName(
      "description",
      `${stringObjectOfData.section}`,
      customerCardInfoDesc,
      `card-${i}`
    );
    customerCardInfoDesc.innerText = stringObjectOfData.description;
    customerCardInfo.appendChild(customerCardInfoDesc);

    let allMealsDescription = document.querySelectorAll(".description");
    let divs = document.querySelectorAll(`.card.card-${i}`);

    //get meals for breakfast.
    let breakfast = document.querySelector("li a#breakfast");
    breakfast.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        div.style.cssText = "display : none";
        if (div.classList.contains("breakfast") || div.id == "breakfast") {
          div.style.display = "flex";
          allMealsDescription.forEach((desc) => {
            desc.style.cssText = 'overflowWrap : "break-word";';
          });
        } else {
          div.style.cssText = "display : none";
        }
      });
    });

    //get meals for lunch.
    let lunch = document.querySelector("li a#lunch");
    lunch.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        div.style.cssText = "display : none";
        if (div.classList.contains("lunch") || div.id == "lunch") {
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
    let dinner = document.querySelector("li a#dinner");
    dinner.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        div.style.cssText = "display : none";
        if (div.classList.contains("dinner") || div.id == "dinner") {
          div.style.display = "flex";
          allMealsDescription.forEach((desc) => {
            desc.style.cssText = 'overflowWrap : "break-word";';
          });
        } else {
          div.style.cssText = "display : none";
        }
      });
    });
    //get shakes.
    let shakes = document.querySelector("li a#shakes");
    shakes.addEventListener("click", (e) => {
      hide();
      divs.forEach((div) => {
        div.style.cssText = "display : none";
        if (div.classList.contains("shakes") || div.id == "shakes") {
          div.style.display = "flex";
          allMealsDescription.forEach((desc) => {
            desc.style.cssText = 'overflowWrap : "break-word";';
          });
        } else {
          div.style.cssText = "display : none";
        }
      });
    });
    //get all meals.
    let allMeals = document.querySelector("li a#all");
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
    behavior: "smooth",
  });
});
//display the up button on scroll > 100px.
document.onscroll = () => {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    upBtn.style.display = "block";
  } else {
    upBtn.style.display = "none";
  }
};
//show or hide the starting paragraph(Add your meals)
if (customerMeals.innerHTML === "") {
  document.querySelector(".add-meals").style.display = "block";
} else {
  document.querySelector(".add-meals").style.display = "none";
}
