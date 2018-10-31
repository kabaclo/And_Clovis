
const form_elements_int =()=>{
    const inputElements = document.querySelectorAll('.form-element input');

    Array.from(inputElements)
        .forEach(input => {
            input.onchange = evt =>{
                const label = evt.target.parentNode.querySelector('label');
                if(evt.target.value.length){
                    label.classList.remove('input-empty');
                    label.classList.add('input-not-empty');
                    return;
                }
                console.log('here');
                label.classList.add('input-empty');
                label.classList.remove('input-not-empty');

                
            };
        });
}
(function(){
    form_elements_int();
})();