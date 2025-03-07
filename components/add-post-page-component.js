import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // +TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container"></div>
              <label>
                Опишите фотографию:
                <textarea id="description-photo" class="input textarea" rows="4"></textarea>
              </label>
              <button class="button" id="add-button">Добавить</button>
          </div>
      </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container")
    });

    let imageUrl = "";
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      let description = document.getElementById("description-photo");
      if (imageUrl === ''){
        alert("Фото не выбрано");
      } else if (description.value === ''){
        alert("Описание не заполнено");
      }
      else{
        onAddPostClick({
          description: description.value,
          imageUrl: imageUrl,
        });
      }
      
    });


  };

  render();
}