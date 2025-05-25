import { renderHomePage } from "./home.js";
import { renderGalleryPage } from "./poze-video.js";
import { renderContactPage } from "./contact.js";
import { renderRezervarePage } from "./rezervare.js";
import { renderLocatiePage } from "./locatie.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app-container");

  function clearPageContent() {
    const pageContent = document.getElementById("page-content");
    if (pageContent) pageContent.innerHTML = "";
  }

  function renderHeader() {
    if (document.querySelector(".main-title")) {
      updateActiveNavLink();
      return;
    }

    const title = document.createElement("h1");
    title.className = "main-title";
    title.textContent = "Cabana Balada";
    appContainer.appendChild(title);

    const nav = document.createElement("nav");
    nav.className = "main-nav navbar navbar-expand-sm justify-content-center";

    const ul = document.createElement("ul");
    ul.className = "navbar-nav";

    const navItems = [
      { text: "Acasă", href: "#home" },
      { text: "Poze și Video", href: "#gallery" },
      { text: "Contact", href: "#contact" },
      { text: "Rezervare", href: "#rezervare" },
      { text: "Locație", href: "#locatie" },
    ];

    navItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "nav-item";

      const a = document.createElement("a");
      a.className = "nav-link";
      a.href = item.href;
      a.textContent = item.text;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = item.href;
      });

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    appContainer.appendChild(nav);

    if (!document.getElementById("page-content")) {
      const pageContentContainer = document.createElement("div");
      pageContentContainer.id = "page-content";
      appContainer.appendChild(pageContentContainer);
    }
  }

  function updateActiveNavLink() {
    const currentHash = window.location.hash || "#home";
    const navLinks = document.querySelectorAll(".main-nav .nav-link");

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function router() {
    const hash = window.location.hash;

    renderHeader();
    updateActiveNavLink();

    if (hash === "#gallery") {
      renderGalleryPage();
    } else if (hash === "#contact") {
      renderContactPage();
    } else if (hash === "#rezervare") {
      renderRezervarePage();
    } else if (hash === "#locatie") {
      renderLocatiePage();
    } else {
      window.location.hash = "#home"; // fallback
      renderHomePage();
    }
  }

  window.addEventListener("hashchange", router);

  router();
});
