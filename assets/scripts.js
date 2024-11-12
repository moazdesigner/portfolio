document.addEventListener("DOMContentLoaded", ()=>{
    const fadeInAnimate = document.querySelectorAll('.fadeInAnimation');
    const observerOptions = {
        root:null,
        rootMargin:'0px',
        threshold:0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeInAnimate.forEach(box => {
        observer.observe(box); 
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const close = document.querySelector('.close');
    const body = document.body;

    portfolioItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = item.querySelector('img');
            const link = item.querySelector('a');
            if(link){
                window.open(link, '_blank') = link.href;
            }else{
                window.open(img.src, '_blank');
            }
        });
    });

    close.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target !== lightboxImage) {
            lightbox.style.display = 'none';
        }
    });
});
document.addEventListener("DOMContentLoaded", function(){
    const contactFormPopup = document.getElementById('contact-form-popup');
    const contactFormBtn = document.getElementsByClassName('contactformbtn');
    const close = document.querySelector('.close');
    Array.from(contactFormBtn).forEach(btn =>{
        btn.addEventListener("click",()=>{
            contactFormPopup.style.display = 'flex';
            contactFormPopup.style.animation = 'zoomIn 0.5s ease-in forwards';
        })
    })
    close.addEventListener('click', function () {
        contactFormPopup.style.animation = 'zoomOut 0.5s forwards';
        setTimeout(() => {
            contactFormPopup.style.display = 'none';
        }, 500);
    });
    contactFormPopup.addEventListener("click",(e)=>{
        if (e.target === contactFormPopup) {
            contactFormPopup.style.animation = 'zoomOut 0.5s forwards';
            setTimeout(() => {
                contactFormPopup.style.display = 'none';
            }, 500);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('popup');
    const close = document.querySelector('.closefeedback');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); 
        
        if (form.checkValidity()) {
            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    popup.style.display = 'flex';
                    popup.style.animation = 'zoomIn 0.5s forwards';
                    form.reset(); 
                } else {
                    alert('There was a problem submitting your form. Please try again.');
                }
            } catch (error) {
                alert('There was an error submitting the form. Please check your internet connection and try again.');
            }
        } else {
            alert('Please fill out all required fields correctly.');
        }
    });

    close.addEventListener('click', function () {
        popup.style.animation = 'zoomOut 0.5s forwards';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    });

    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.style.animation = 'zoomOut 0.5s forwards';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);
        }
    });
});
document.addEventListener('DOMContentLoaded', ()=>{
    const heading = document.getElementById('my-name');
    const headingText = heading.textContent;
    heading.innerHTML = headingText
    .split('')
    .map((letter, index) => {
        if (letter === ' ') {
            return `<span style="--index:${index}">&nbsp;</span>`;
        }
        return `<span style="--index:${index}">${letter}</span>`;
    })    
    .join('');
});

// carousel animation
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}

// Start the initial animation 
resetTimeAnimation()
