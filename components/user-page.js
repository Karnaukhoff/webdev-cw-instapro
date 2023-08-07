import { renderHeaderComponent } from "./header-component.js";

export function userPage({userPostId, appEl, posts}) {
    //post.user.id
    let userImageUrl = ``;
    let userName = ``;
    let userPageId = ``;
    for (let i in posts){
        if (posts[i].id === userPostId){
            userImageUrl = posts[i].user.imageUrl;
            userName = posts[i].user.name;
            userPageId = posts[i].user.id
        };
    }
    const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
        <div class="posts-user-header">
            <img src="${userImageUrl}" class="posts-user-header__user-image">
            <p class="posts-user-header__user-name">${userName}</p>
        </div>
        <ul class="posts"></ul>
    </div>
  `;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container")
  });

  //функция показа постов конкретного пользователя
  function userPostsPage({element}) {
    let postHtml = posts.map((post) => {
        if (post.user.id === userPageId){
            return `
        <li class="post">
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="642d00579b190443860c2f32" class="like-button">
                <img src="./assets/images/like-active.svg">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>2</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
              19 минут назад
            </p>
        </li>
            `;
        }
    }).join("");
    element.innerHTML = postHtml;
  }
  userPostsPage({
    element: document.querySelector(".posts")
  })
}