
export function renderPostFromApi({posts, element}) {
    let postHtml = posts.map((post) => {
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
        return `
        <li class="post">
            <div class="post-header" data-user-id="${post.id}">
                <img src="${post.user.imageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${post.user.name}</p>
            </div>
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
              19 минут назад
            </p>
        </li>
`;
    }).join("");
    element.innerHTML = postHtml;
}