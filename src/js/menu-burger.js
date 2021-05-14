const iconMenu = document.querySelector('.menu-burger');
const bodyMenu = document.querySelector('.header__list');
const header = document.querySelector('.header');


// Menu-burger

iconMenu.addEventListener('click', () => {
  document.body.classList.toggle('_lock');
  iconMenu.classList.toggle('_active');
  bodyMenu.classList.toggle('_active');
});

// Fixed Menu

// document.addEventListener('scroll', () => {
//   if(window.scrollY > 0) {

//     header.classList.add("shadow");
//  }
//  else
//     header.classList.remove("shadow");

// });



// navigation

// const menuLinks = document.querySelectorAll('.header__item');

// if(menuLinks.length > 0){
//   menuLinks.forEach(link => {
//     link.addEventListener('click', onMenuLinkClick)
//   });
// }

// function onMenuLinkClick(e) {
//   const menuLink = e.target;
//   if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
//     const gotoBlock = document.querySelector(menuLink.dataset.goto);
//     const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

//     if(iconMenu.classList.contains('_active')){
//       document.body.classList.remove('_lock');
//       iconMenu.classList.remove('_active');
//       bodyMenu.classList.remove('_active');
//       document.body.style.overflow = "scroll";
//     }

//     window.scrollTo({
//       top: gotoBlockValue,
//       behavior: "smooth"
//     });
//     e.preventDefault();
//   }
// }