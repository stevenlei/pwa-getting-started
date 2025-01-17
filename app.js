window.addEventListener("load", function () {
  loadPosts();

  // Register service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  }
});

async function loadPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  // cache the response right from the fetch
  const clonedResponse = response.clone();
  const cache = await caches.open("pwa_demo_cache");
  cache.put("https://jsonplaceholder.typicode.com/posts", clonedResponse);

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
