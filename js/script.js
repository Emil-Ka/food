"use strict";

window.addEventListener("DOMContentLoaded", () => {
   // TABS
   const tabContent = document.querySelectorAll(".tabcontent"),
         tabItems = document.querySelectorAll(".tabheader__item"),
         tabsParent = document.querySelector(".tabheader__items");

   const hideContent = () => {
      tabContent.forEach(tab => {
         tab.style.display = "none";
      });

      tabItems.forEach(item => {
         item.classList.remove("tabheader__item_active");
      });
   };

   const showContent = (i = 0) => {
      tabContent[i].style.display = "block";

      tabItems[i].classList.add("tabheader__item_active");
   };

   hideContent();
   showContent();

   tabsParent.addEventListener("click", (event) => {
      const target = event.target;
      if (target && target.classList.contains("tabheader__item")) {
         target.classList.add("tabheader__item_active");
         tabItems.forEach((item, i) => {
            if (item === target) {
               hideContent();
               showContent(i);
            }
         });
      }
   });

   //TIMER
   const deadline = "1900-12-30T00:00:00";

   function leftTime(endtime) {
      const leftTime = Date.parse(endtime) - Date.parse(new Date()),
            leftDays = Math.floor(leftTime / (1000 * 60 * 60 * 24)),
            leftHours = Math.floor((leftTime / (1000 * 60 * 60)) % 24),
            leftMinutes = Math.floor((leftTime / (1000 * 60)) % 60),
            leftSeconds = Math.floor((leftTime / 1000) % 60);
      
      return {
         "leftTime": leftTime,
         "leftDays": leftDays,
         "leftHours": leftHours,
         "leftMinutes": leftMinutes,
         "leftSeconds": leftSeconds
      };
   }

   function getZero(num) {
      if (num < 10) {
         return "0" + num;
      }
      else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            interval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = leftTime(endtime);

         days.innerHTML = getZero(t.leftDays);
         hours.innerHTML = getZero(t.leftHours);
         minutes.innerHTML = getZero(t.leftMinutes);
         seconds.innerHTML = getZero(t.leftSeconds);

         if (t.leftTime <= 0) {
            clearInterval(interval);
            days.innerHTML = 0;
            hours.innerHTML = 0;
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;

            document.querySelector(".timer__end").classList.remove("hidden");
         }
      }
   }

   setClock(".timer", deadline);

   // MODAL
   const btnModal = document.querySelectorAll("[data-modal]"),
         btnClose = document.querySelector("[data-close]"),
         modalBox = document.querySelector(".modal");

   btnModal.forEach(item => {
      item.addEventListener("click", () => {
         modalBox.style.display = "block";
         document.body.style.overflow = "hidden"; // Когда модальное окно появляется, то скролить нельзя
      });
   });

   function closeModal() {
      modalBox.style.display = "none";
      document.body.style.overflow = "";
   }

   btnClose.addEventListener("click", closeModal);

   modalBox.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
         closeModal();
      }
   });

   // Когда мы нажимаем кнопку "Escape" и когда модальное окно открыто, то мы закрываем его
   document.addEventListener("keydown", (event) => {
      if (event.code === "Escape" && modalBox.style.display === "block") {
         closeModal();
      }
   });

   // CLASS
   class MenuItem {
      constructor(src, alt, title, text, price, parentSelector) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.text = text;
         this.price = price;
         this.transfer = 2;
         this.parent = document.querySelector(parentSelector);
         this.toRub();
      }

      toRub() {
         this.price = this.price * this.transfer;
      }

      render() {
         let element = document.createElement("div");
         element.innerHTML = `
            <div class="menu__item">
               <img src="${this.src}" alt="${this.alt}">
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.text}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
               </div>
            </div>
         `;
         this.parent.append(element);
      }
   }

   new MenuItem(
      "img/tabs/vegy.jpg", 
      "vegy", 
      'Меню "Фитнес"', 
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
      229,
      ".menu .container"
   ).render();

   new MenuItem(
      "img/tabs/elite.jpg", 
      "elite", 
      'Меню “Премиум”', 
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
      550,
      ".menu .container"
   ).render();

   new MenuItem(
      "img/tabs/post.jpg", 
      "post", 
      'Меню "Постное"', 
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
      430,
      ".menu .container"
   ).render();

   //POST

   const forms = document.querySelectorAll("form");
   
   forms.forEach(form => {
      getRequest(form);
   });

   function getRequest(form) {
      form.addEventListener("submit", (event) => {
         event.preventDefault();
         const formData = new FormData(form);
         const obj = {};
         formData.forEach((item, key) => {
            obj[key] = item;
         });
         const json = JSON.stringify(obj);

         fetch("http://localhost:3000/menu")
         .then(response => response.json())
         .then(response => console.log(response));
      });
   }
});

