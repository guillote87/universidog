(function(){
    
    const sliders = [...document.querySelectorAll('.comentarios-body')];
    const buttonNext = document.querySelector('#next');
    const buttonBefore = document.querySelector('#before');
    let value;   

    buttonNext.addEventListener('click', ()=>{
        changePosition(1);
    });

    buttonBefore.addEventListener('click', ()=>{
        changePosition(-1);
    });

    const changePosition = (add)=>{
        const currentComentary = document.querySelector('.comentarios-body-show').dataset.id;
        value = Number(currentComentary);
        value+= add;


        sliders[Number(currentComentary)-1].classList.remove('comentarios-body-show');
        
        if(value === sliders.length+1 || value === 0){
            value = value === 0 ? sliders.length  : 1;
        }

        sliders[value-1].classList.add('comentarios-body-show');

    }
 
})();