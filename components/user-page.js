import { formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale';
import { renderHeaderComponent } from "./header-component.js";
import { addLike, removeLike, getUserPosts } from "../api.js";

export function userPage({userPostId, appEl, posts, token}) {
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
        <div class="posts-user-header" data-user-id="${userPageId}">
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
      const createTime = formatDistanceToNow(new Date(post.createdAt), { locale: ru });
      function isLiked(post) {
        if (post.isLiked === false) { return `./assets/images/like-not-active.svg`;} 
        else { return `./assets/images/like-active.svg`;}
      };
      function likes(post){
        if ( post.likes.length === 0){
          return `0`;
        } else if (post.likes.length === 1) {
          return post.likes[0].name;
        } else {
          return `${post.likes[post.likes.length - 1].name} и еще ${post.likes.length - 1}`;
        }
      };
        if (post.user.id === userPageId){
            return `
        <li class="post">
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button">
                <img src="${isLiked(post)}">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${likes(post)}</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
              ${createTime} назад
            </p>
        </li>
            `;
        }
    }).join("");
    element.innerHTML = postHtml;

    for (const likeButton of document.querySelectorAll(".like-button")){
      likeButton.addEventListener("click", async function() {
        const idPost = likeButton.dataset.postId;
        const post = posts.find((item) => item.id === idPost);
        const id = document.querySelector(".posts-user-header").dataset.userId;

        if (post.isLiked === false){
          await addLike({idPost, token});
          posts = await getUserPosts({ id, token});
          userPage({userPostId, appEl, posts, token})
        }
        if (post.isLiked === true){
          await removeLike({idPost, token});
          posts = await getUserPosts({ id, token});
          userPage({userPostId, appEl, posts, token})
        }
      })
    }
  }
  userPostsPage({
    element: document.querySelector(".posts")
  })
}