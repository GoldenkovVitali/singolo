const MENU = document.getElementById("menu");
const BUTTON = document.getElementById("submitbtn");
const CLOSE_BUTTON = document.getElementById("close-btn");
const TAB = document.getElementById("tab");
const PORTPHOLIOIMAGE = document.getElementById("portfolio-image");
const VERTMOBILE = document.getElementById("mobile-vertical");
const VERTMOBILEBLACK = document.getElementById("mobile-vertical-black");
const HORMOBILE = document.getElementById("mobile-horisontal");
const HORMOBILEBLACK = document.getElementById("mobile-horisontal-black");

//--------------------MENU-------------------------------
MENU.addEventListener("click", event => {
  MENU.querySelectorAll("a").forEach(el => el.classList.remove("active"));
  if (event.target.tagName == "A") {
    event.target.classList.add("active");
  }
});

//------------------mobile-section--------display----------------
VERTMOBILE.onclick = function() {
  VERTMOBILE.style.display = VERTMOBILE.style.display == "none" ? "" : "none";
  VERTMOBILEBLACK.style.display =
    VERTMOBILEBLACK.style.display == "inline-block" ? "" : "inline-block";
};
VERTMOBILEBLACK.onclick = function() {
  VERTMOBILE.style.display =
    VERTMOBILE.style.display == "inline-block" ? "" : "inline-block";
  VERTMOBILEBLACK.style.display =
    VERTMOBILEBLACK.style.display == "none" ? "" : "none";
};
HORMOBILE.onclick = function() {
  HORMOBILE.style.display = HORMOBILE.style.display == "none" ? "" : "none";
  HORMOBILEBLACK.style.display =
    HORMOBILEBLACK.style.display == "inline-block" ? "" : "inline-block";
};
HORMOBILEBLACK.onclick = function() {
  HORMOBILE.style.display =
    VERTMOBILE.style.display == "inline-block" ? "" : "inline-block";
  HORMOBILEBLACK.style.display =
    HORMOBILEBLACK.style.display == "none" ? "" : "none";
};
//------------------mobile-section--------slider----------------

let items = document.querySelectorAll(".item");
let currentItem = 0;
let isEnabled = true;
function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
    document.querySelectorAll(".item-wrapper").style.display = "none";
  });
}

console.log(document.querySelectorAll(".item-wrapper"));

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
  document.querySelectorAll(".item-wrapper").style.display = "none";
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

document.querySelector(".arrow-left").addEventListener("click", function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector(".arrow-right").addEventListener("click", function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

//---------------------portfolio-section------------------------

TAB.addEventListener("click", event => {
  TAB.querySelectorAll("button").forEach(el => el.classList.remove("active"));
  if (event.target.tagName == "BUTTON") {
    event.target.classList.add("active");
  }

  const mixRand = (a, b) => Math.random() - 0.5;
  let arrImg = Array.from(
      document.getElementById("portfolio-image").getElementsByTagName("img")
    ),
    arrImgSrcMix = arrImg.map(e => e.src).sort(mixRand);
  arrImg.map((e, i) => (e.src = arrImgSrcMix[i]));
});

PORTPHOLIOIMAGE.addEventListener("click", event => {
  PORTPHOLIOIMAGE.querySelectorAll("img").forEach(el =>
    el.classList.remove("actives")
  );
  event.target.classList.add("actives");
});

//---------section-contact-information--------------
BUTTON.addEventListener("click", () => {
  let subject = document.getElementById("subject").value;
  let describe = document.getElementById("describe").value;
  const name = document.getElementById("name").checkValidity();
  const email = document.getElementById("email").checkValidity();

  if (!name || !email) {
    document.getElementById("sendLetter").classList.add("hidden-email");
    document.getElementById("result_subject").innerText =
      "Введите данные в полях Name или Email в нужном формате";
    document.getElementById("message-block").classList.remove("hidden");
  }

  if (name && email) {
    if (subject && describe) {
      document.getElementById("result_subject").innerText = "Тема: " + subject;
      document.getElementById("result_describe").innerText =
        "Описание: " + describe;
      document.getElementById("message-block").classList.remove("hidden");
    }

    if (!subject && describe) {
      document.getElementById("result_subject").innerText = "Без темы";
      document.getElementById("result_describe").innerText =
        "Описание: " + describe;
      document.getElementById("message-block").classList.remove("hidden");
    }

    if (subject && !describe) {
      document.getElementById("result_subject").innerText = "Тема: " + subject;
      document.getElementById("result_describe").innerText = "Без описания";
      document.getElementById("message-block").classList.remove("hidden");
    }

    if (!subject && !describe) {
      document.getElementById("result_subject").innerText = "Без темы";
      document.getElementById("result_describe").innerText = "Без описания";
      document.getElementById("message-block").classList.remove("hidden");
    }
  }
});

CLOSE_BUTTON.addEventListener("click", event => {
  document.getElementById("result_subject").innerText = "";
  document.getElementById("result_describe").innerText = "";
  document.getElementById("message-block").classList.add("hidden");
  document.getElementById("sendLetter").classList.remove("hidden-email");
  document.getElementById("form").reset();
});