(function(){
    const openButton = document.querySelector('.nav-menu');
    const menu = document.querySelector('.navlink');
    const closeMenu = document.querySelector('.nav-close');

    openButton.addEventListener('click', ()=>{
        menu.classList.add('navlink-show');
    });

    closeMenu.addEventListener('click', ()=>{
        menu.classList.remove('navlink-show');
    });


})();

const nav= document.querySelector(".nav")

window.addEventListener("scroll", function(){
    nav.classList.toggle('active',window.scrollY >0)
})