window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    function hideTabContent(a) {
        for (let i = a; i<tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.contains('show');
        }
    }
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i <tab.length; i++) {
                if (target ==tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
//Таймер
let deadline = '2019-02-11';

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime)-Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));
        
        //Красивый формат таймера 03:02:09
        if (seconds < 10) {
            seconds = '0' + Math.floor((t/1000) % 60);
        }
        if (minutes < 10) {
            minutes = '0' + Math.floor((t/1000/60) % 60);
        }
        if (hours < 10) {
            hours = '0' + Math.floor((t/(1000*60*60)));
        }
        
        //Если акция закончилась, то таймер показывает 00:00:00
        if (t < 0) {
            seconds = '00';
            minutes = '00';
            hours = '00';
        }

        return {
            'total' : t,
            'hours' : hours,
            'minutes': minutes,
            'seconds' : seconds
        };
}

function setClock(id,endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        let t = getTimeRemaining(endtime);
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;
        if (t.total<=0) {
            clearInterval(timeInterval);
        }
    }
}
setClock('timer', deadline);

//Модальное окно
let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');
more.addEventListener('click', function() {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    //Запрет прокрутки страницы при открытом модальном окне
    document.body.style.overflow = 'hidden';
});

close.addEventListener('click', function() {
    overlay.style.display = 'none';
    this.classList.remove('more-splash');
    //Отмена запрета
    document.body.style.overflow = '';
});

//Позвоночник[0], Антистресс[1], Природа[2], Йога[3] Узнать подробнее 
let moreSpine = document.querySelectorAll('.description-btn');
for (let i=0; i < moreSpine.length; i++) {
    moreSpine[i].addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
//Запрет прокрутки страницы при открытом модальном окне
        document.body.style.overflow = 'hidden';
    });
    }

    //Form

//     let message = {
//         loading:'Загрузка...',
//         success: 'Спасибо! Скоро мы с Вами свяжесмся!',
//         failure:'Что-то пошло не так'
//     };

//     let form = document.querySelector('.main-form'),
//         input = form.getElementsByTagName('input'),
//         statusMesssage = document.createElement('div');
    
//         statusMesssage.classList.add('status');

//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         form.appendChild(statusMesssage);

//         let request = new XMLHttpRequest();
//         request.open('POST','server.php');
//         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//         let formData = new FormData(form);
//         request.send(formData);

//         request.addEventListener('readystatechange', function() {
//             if (request.readyState < 4) {
//                 statusMesssage.innerHTML = message.loading;
//             } else if (request.readyState === 4 && request.status == 200) {
//                 statusMesssage.innerHTML = message.success;
//             } else {statusMesssage.innerHTML = message.failure;
//             }
//         });

//         for (let i = 0; i < input.length; i++) {
//             input[i].value = '';
//         }
//     });
// });    
//Отправкка данных пользователя в JSON
    let message = {
        loading:'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжесмся!',
        failure:'Что-то пошло не так'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMesssage = document.createElement('div');
    
    statusMesssage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMesssage);

        let request = new XMLHttpRequest();
        request.open('POST','server.php');
        //JSON 
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
// formData в JSON
        formData.forEach(function(value,key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMesssage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMesssage.innerHTML = message.success;
            } else {statusMesssage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        slides.forEach((item) => item.style.display = 'none');
        // 
        // for (let i =0; i<slides.length;i++){
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('.dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex-1].classList.add('.dot-active');
    }
});
