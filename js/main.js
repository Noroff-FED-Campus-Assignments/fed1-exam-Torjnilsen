import $ from "jquery";
import 'slick-carousel';



console.log("hereeee",$)

let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
}


let header = document.querySelector('header');

window.addEventListener('scroll' , () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});


async function getPosts() {
      try {
        const response = await fetch('https://examcaroclock.flywheelsites.com/?rest_route=/wp/v2/posts&per_page=12');
        const posts = await response.json();
        return posts;
      } catch (error) {
        console.error(error);
      }
    }

    async function getAuthorName(postId) {
      switch (postId) {
        case 1:
          return 'torjus Nilsen';
      }
    }

    function renderCarousel(posts) {
      const carouselContainer = $('#posts-carousel');
      posts.forEach(post => {
        const author = getAuthorName(post.id);
        const postCard = `
        <a href="details.html?id=${post.id}">
          <div class="post-card">
            <h2 class="post-title">${post.title.rendered}</h2>
            <p class="post-meta">By ${author} on ${new Date(post.date).toLocaleDateString()}</p>
            <div class="post-content">${post.content.rendered}</div>
          </div>
        `;
        carouselContainer.append(postCard);
      });
    }



    function showCarousel() {
      getPosts()
        .then(posts => {
          renderCarousel(posts);
          const carousel = $('#posts-carousel').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 2000,
          });

          $('#prev-btn').on('click', function() {
            carousel.slick('slickPrev');
          });

          $('#next-btn').on('click', function() {
            carousel.slick('slickNext');
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

    $(document).ready(() => {
      showCarousel();
    });