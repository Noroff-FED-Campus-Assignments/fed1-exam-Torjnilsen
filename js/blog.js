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

const postsContainer = document.getElementById('posts-container');
const searchBar = document.getElementById('searchBar');
let blogPosts = [];

async function getPosts() {
  try {
    const response = await fetch('https://examcaroclock.flywheelsites.com/?rest_route=/wp/v2/posts&per_page=12');
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
}

async function displayPosts() {
  const posts = await getPosts();
  blogPosts = posts; 
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');

    const author = getAuthorName(post.id);

    postCard.innerHTML = `
      <a href="./details.html?id=${post.id}">
        <h2>${post.title.rendered}</h2>
        <p class="meta">By ${author} on ${new Date(post.date).toLocaleDateString()}</p>
        ${post.content.rendered}
      </a>
    `;

    postsContainer.appendChild(postCard);
  });
}

function getAuthorName(postId) {
  switch (postId) {
    case 1:
      return 'torjus Nilsen';
  }
}

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredPosts = blogPosts.filter((post) => {
    return post.title.rendered.toLowerCase().includes(searchString);
  });

  displayFilteredPosts(filteredPosts);
});

function displayFilteredPosts(filteredPosts) {
  postsContainer.innerHTML = '';

  filteredPosts.forEach(post => {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');

    const author = getAuthorName(post.id);

    postCard.innerHTML = `
      <a href="./details.html?id=${post.id}">
        <h2>${post.title.rendered}</h2>
        <p class="meta">By ${author} on ${new Date(post.date).toLocaleDateString()}</p>
        ${post.content.rendered}
      </a>
    `;

    postsContainer.appendChild(postCard);
  });
}

displayPosts();
 
