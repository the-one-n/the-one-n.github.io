$(function name(params) {
  $('.tabgroup > div').hide();
  $('.tabgroup > div:first-of-type').show();
  $('.tabs a').click(function (e) {
    e.preventDefault();
    var $this = $(this),
      tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
      others = $this.closest('li').siblings().children('a'),
      target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();

  })


  // $("#phone").mask("+999 (99) 999-99-99");

  $('.telegram-form').on('submit', function (event) {

    event.stopPropagation();
    event.preventDefault();

    let form = this,
      submit = $('.submit', form),
      data = new FormData(),
      files = $('input[type=file]')


    $('.submit', form).val('Отправка...');
    $('input, textarea', form).attr('disabled', '');

    data.append('Имя', $('[name="name"]', form).val());
    data.append('Телефон', $('[name="phone"]', form).val());
    data.append('Сообщения', $('[name="massage"]', form).val());


    files.each(function (key, file) {
      let cont = file.files;
      if (cont) {
        $.each(cont, function (key, value) {
          data.append(key, value);
        });
      }
    });

    $.ajax({
      url: '../ajax.php',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      xhr: function () {
        let myXhr = $.ajaxSettings.xhr();

        if (myXhr.upload) {
          myXhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
              let percentage = (e.loaded / e.total) * 100;
              percentage = percentage.toFixed(0);
              $('.submit', form)
                .html(percentage + '%');
            }
          }, false);
        }

        return myXhr;
      },
      error: function (jqXHR, textStatus) {
        // Тут выводим ошибку
      },
      complete: function () {
        // Тут можем что-то делать ПОСЛЕ успешной отправки формы
        console.log('Complete')
        form.reset()
      }
    });

    return false;
  });

  $(".menu").on("click", "a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),

      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({ scrollTop: top }, 1500);
  });

  $('.open-popup').on('click', function(e){
    e.preventDefault();
    $('.popup-bg').fadeIn(600);
    $('html').addClass('no-scroll');
  });
  $('.close-popup').on('click', function(){
    $('.popup-bg').fadeOut(600);
    $('html').removeClass('no-scroll');
  });

  $('.price__items').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    prevArrow: '<button type="button" class="slick-prev"><svg svg svg width = "50" height = "40" viewBox = "0 0 50 40" fill = "none" xmlns = "http://www.w3.org/2000/svg" ><path d="M24.4972 17.7042L41.2359 0.872525C42.3929 -0.290842 44.2636 -0.290842 45.4083 0.872525L48.1899 3.66955C49.3468 4.83292 49.3468 6.71411 48.1899 7.8651L36.3374 19.8082L48.2022 31.7389C49.3591 32.9022 49.3591 34.7834 48.2022 35.9344L45.4206 38.7438C44.2636 39.9072 42.3929 39.9072 41.2482 38.7438L24.5096 21.9121C23.3403 20.7488 23.3403 18.8676 24.4972 17.7042ZM0.866171 21.9121L17.6048 38.7438C18.7618 39.9072 20.6326 39.9072 21.7772 38.7438L24.5588 35.9468C25.7157 34.7834 25.7157 32.9022 24.5588 31.7512L12.7063 19.8082L24.5711 7.87748C25.728 6.71411 25.728 4.83292 24.5711 3.68193L21.7895 0.872525C20.6326 -0.290842 18.7618 -0.290842 17.6172 0.872525L0.878479 17.7042C-0.290767 18.8676 -0.290767 20.7488 0.866171 21.9121Z" fill="#8C12BC" /></svg></button>',

    nextArrow: '<button type="button" class="slick-next"><svg svg width = "50" height = "40" viewBox = "0 0 50 40" fill = "none" xmlns = "http://www.w3.org/2000/svg" ><path d="M24.5603 21.9121L7.82164 38.7438C6.6647 39.9072 4.79391 39.9072 3.64928 38.7438L0.867703 35.9468C-0.289234 34.7834 -0.289234 32.9022 0.867703 31.7512L12.7325 19.8205L0.867703 7.88985C-0.289234 6.72648 -0.289234 4.8453 0.867703 3.69431L3.63697 0.872525C4.79391 -0.290842 6.6647 -0.290842 7.80933 0.872525L24.548 17.7042C25.7173 18.8676 25.7173 20.7488 24.5603 21.9121ZM48.1914 17.7042L31.4527 0.872525C30.2958 -0.290842 28.425 -0.290842 27.2803 0.872525L24.4988 3.66955C23.3418 4.83292 23.3418 6.71411 24.4988 7.8651L36.3635 19.7958L24.4988 31.7265C23.3418 32.8898 23.3418 34.771 24.4988 35.922L27.2803 38.7191C28.4373 39.8824 30.3081 39.8824 31.4527 38.7191L48.1914 21.8874C49.3483 20.7488 49.3483 18.8676 48.1914 17.7042Z" fill="#8C12BC" /></svg ></button>',
    
  });

  $('.paket-tabs__item').on('click', function (e) {
    e.preventDefault();
    $('.paket-tabs__item').removeClass('paket-tabs__item--active');
    $(this).addClass('paket-tabs__item--active');

    $('.paket-tabs__content-item').removeClass('paket-tabs__content-item--active');
    $($(this).attr('href')).addClass('paket-tabs__content-item--active');

  });

  $('.menu__btn').on('click', function(){
    $('.menu__list, .menu__btn-link').toggleClass('menu__list--active');
  });

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function initializeClock(id, endtime) {
    const clock = document.querySelector('.promo__clock');
    const daysSpan = clock.querySelector('.promo__days');
    const hoursSpan = clock.querySelector('.promo__hours');
    const minutesSpan = clock.querySelector('.promo__minutes');
    const secondsSpan = clock.querySelector('.promo__seconds');

    function updateClock() {
      const t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  const deadline = $('.promo__clock').attr('data-time');
  initializeClock('promo__clock', deadline);

})
