export function renderPostFromApi({posts, element}) {
    let postHtml = posts.map((post) => {
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
              <button data-post-id="642d00579b190443860c2f32" class="like-button">
                <img src="./assets/images/like-active.svg">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>2</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">Иван Иваныч</span>
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