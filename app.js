window.addEventListener("load", function () {
  loadPosts();
});

async function loadPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  const listContainer = document.getElementById("list");

  for (let post of posts) {
    const listItem = `<li>
      <h4>${post.title}</h4>
      <p>${post.body}</p>
    </li>`;

    listContainer.innerHTML += listItem;
  }
}
