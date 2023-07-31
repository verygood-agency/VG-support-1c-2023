document.addEventListener("DOMContentLoaded", () => {
  // Аккондеон
  const accordions = document.querySelector('.accordions');
  if (document.querySelector('.accordions')) {
    const faqItems = document.querySelectorAll('.accordion');
    const accordionHeaders = document.querySelectorAll('.accordion__question'); // Добавить эту строку

    // Expand the first accordion by default
    faqItems[0].classList.add('active');

    accordions.addEventListener('click', (event) => {
      const item = event.target.closest('.accordion');

      // Добавить проверку на то, что клик произошел на заголовке аккордеона
      const isHeaderClicked = [...accordionHeaders].some(header => header.contains(event.target));

      // Если клик произошел на заголовке, то обрабатываем событие
      if (isHeaderClicked) {
        // Collapse all other accordions
        faqItems.forEach(faqItem => {
          if (faqItem !== item && faqItem.classList.contains('active')) {
            faqItem.classList.remove('active');
          }
        });

        // Expand/collapse the clicked accordion
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      }
    });
  };

  // прилипающая шапка
  let lastKnownScrollY = 0;
  let ticking = false;

  // console.log(lastKnownScrollY);
  // console.log(ticking);

  function headerChange() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 160) {
      document.body.classList.add("scroll");
    } else {
      document.body.classList.remove("scroll");
    }

    ticking = false;
  }

  function onScroll() {
    lastKnownScrollY = window.scrollY;
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(headerChange);
    }
    ticking = true;
  }

  headerChange();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Анимация кнопок
  // Ищем все кнопки с классом .btn-animate
  var buttons = document.querySelectorAll(".btn-animate");

  buttons.forEach(function (button) {
    // Добавляем в содержимое кнопок блок .decorate
    var decoration = document.createElement('span');
    decoration.classList.add('decorate');
    button.insertBefore(decoration, button.firstChild);

    button.addEventListener("mouseover", function (e) {
      var pos = button.getBoundingClientRect();
      var elem_left = pos.left;
      var elem_top = pos.top;

      var Xinner = e.clientX - elem_left;
      var Yinner = e.clientY - elem_top;

      var maxDist = Math.max(
        Math.sqrt(Math.pow(Xinner, 2) + Math.pow(Yinner, 2)),
        Math.sqrt(Math.pow(button.clientWidth - Xinner, 2) + Math.pow(Yinner, 2)),
        Math.sqrt(
          Math.pow(Xinner, 2) + Math.pow(button.clientHeight - Yinner, 2)
        ),
        Math.sqrt(
          Math.pow(button.clientWidth - Xinner, 2) +
          Math.pow(button.clientHeight - Yinner, 2)
        )
      );

      var decoration = button.querySelector(".decorate");
      decoration.style.left = Xinner + "px";
      decoration.style.top = Yinner + "px";
      decoration.style.width = maxDist * 2 + "px";
      decoration.style.height = maxDist * 2 + "px";
    });

    button.addEventListener("mouseout", function (e) {
      var decoration = button.querySelector(".decorate");
      decoration.style.width = "0";
      decoration.style.height = "0";
    });
  });


});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));
