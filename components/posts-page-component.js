import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { renderPostFromApi } from "./upload-post-from-api.js";
import { addLike, removeLike, getPosts } from "../api.js";

export function renderPostsPageComponent({ appEl, token, posts }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts"></ul>
              </div>`;

  appEl.innerHTML = appHtml;

  //функция добавления постов из api
  renderPostFromApi({
    posts,
    element: appEl.querySelector(".posts"),
  });

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (const likeButton of document.querySelectorAll(".like-button")){
    likeButton.addEventListener("click", async function() {
      const idPost = likeButton.dataset.postId;
      const post = posts.find((item) => item.id === idPost);

      if (post.isLiked === false){
        await addLike({idPost, token});
        posts = await getPosts({ token });
        renderPostsPageComponent({ appEl, token, posts });
      }
      if (post.isLiked === true){
        await removeLike({idPost, token});
        posts = await getPosts({ token });
        renderPostsPageComponent({ appEl, token, posts });
      }
    })
  }
}
