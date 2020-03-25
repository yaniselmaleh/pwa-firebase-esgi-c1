'use strict';

(async () => {
  const app = document.querySelector('#app main');

  const result = await fetch('/data/spacex.json');
  const data = await result.json();

  const skeleton = app.querySelector('.skeleton');
  skeleton.setAttribute('hidden', '');

  const constructor = document.createElement('div');
  constructor.innerHTML = `
    <section class="card">
      <header>
        <figure>
          <div class="placeholder"></div>
          <img src="" alt="">
        </figure>
      </header>
      <main>
        <h1></h1>
        <p></p>
      </main>
    </section>
  `;

  const cards = data.map(item => {
    const card = constructor
      .querySelector('.card')
      .cloneNode(true);

    const cover = card.querySelector('img');
    cover.dataset.src = item.image;
    cover.alt = item.content.title;

    const placeholder = card.querySelector('.placeholder');
    placeholder.style.cssText = `background-image: url(${item.placeholder})`;

    // Title
    // Description

    app.appendChild(card);

    return card;
  });
  // setTimeout(() => {
  //   cards.forEach(card => {
  //     const cover = card.querySelector('img');
  //     cover.src = cover.dataset.src;

  //     const placeholder = card.querySelector('.placeholder');
  //     placeholder.classList.add('fade');
  //   })
  // }, 2000);
      
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   */
  const options = {
    rootMarging : '0px 0px 0px 0px'
  };

  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;

        image.src = image.dataset.src;
        image.onload = () => {
          const placeholder = image.parentNode.querySelector('.placeholder');
          placeholder.classList.add('fade');
        }
      }
    });
  };

  const io = new IntersectionObserver(callback, options);
  cards.forEach(card => {
    const image = card.querySelector('img');
    io.observe(image);
  });
})();
