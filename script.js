// Așteaptă ca întregul document HTML să fie încărcat și parsat înainte de a executa codul JavaScript.
document.addEventListener("DOMContentLoaded", function () {
  // Obține referința către containerul principal unde va fi randat conținutul.
  const appContainer = document.getElementById("app-container"); // Obține referința către elementul pentru imaginea de fundal (deși nu o manipulăm direct aici, e bine de știut). // const backgroundOverlay = document.getElementById('background-overlay'); // Funcție pentru a curăța conținutul existent dintr-un container (mai specific, din #page-content).
  function clearPageContent() {
    // Găsește elementul #page-content.
    const pageContent = document.getElementById("page-content"); // Dacă există, golește conținutul său.
    if (pageContent) {
      pageContent.innerHTML = ""; // Elimină toți copiii elementului.
    }
  }

  // Funcție pentru a genera și randa header-ul (titlul și navigația).
  function renderHeader() {
    // Verifică dacă header-ul a fost deja randat pentru a evita duplicarea.
    if (document.querySelector(".main-title")) {
      // Actualizează link-ul activ, dar nu re-randa tot header-ul
      updateActiveNavLink();
      return; // Ieși din funcție dacă header-ul există
    }

    // Creează elementul H1 pentru titlu.
    const title = document.createElement("h1");
    title.className = "main-title"; // Adaugă clasă pentru stilizare.
    title.textContent = "Cabana Balada Beliș"; // Setează textul titlului.
    appContainer.appendChild(title); // Adaugă titlul în containerul principal. // Creează elementul NAV pentru bara de navigare.

    const nav = document.createElement("nav");
    nav.className = "main-nav navbar navbar-expand-sm justify-content-center"; // Adaugă clase Bootstrap și personalizate. // Creează o listă UL pentru linkurile de navigație.

    const ul = document.createElement("ul");
    ul.className = "navbar-nav"; // Clasă Bootstrap pentru lista de navigație. // Definește elementele de navigare (textul linkului și funcția de randare a paginii asociate).

    const navItems = [
      { text: "Acasă", href: "#home", pageRenderer: renderHomePage },
      {
        text: "Poze & Video",
        href: "#gallery",
        pageRenderer: renderGalleryPage,
      },
      {
        text: "Contact & Rezervare",
        href: "#contact",
        pageRenderer: renderContactPage,
      },
    ];

    // Iterează prin elementele de navigare și creează linkurile.
    navItems.forEach((item) => {
      const li = document.createElement("li"); // Creează un element LI.
      li.className = "nav-item"; // Clasă Bootstrap.

      const a = document.createElement("a"); // Creează un element A (link).
      a.className = "nav-link"; // Clasă Bootstrap.
      a.href = item.href; // Setează atributul href (pentru routing și accesibilitate).
      a.textContent = item.text; // Setează textul linkului. // Adaugă un event listener pentru click pe link.

      a.addEventListener("click", function (event) {
        event.preventDefault(); // Previne comportamentul implicit al linkului (navigarea directă). // Actualizează hash-ul URL-ului pentru a reflecta pagina curentă.
        window.location.hash = item.href; // Nu mai apelăm direct item.pageRenderer() aici, lăsăm router-ul să se ocupe.
      });

      li.appendChild(a); // Adaugă linkul în elementul LI.
      ul.appendChild(li); // Adaugă elementul LI în lista UL.
    });

    nav.appendChild(ul); // Adaugă lista UL în elementul NAV.
    appContainer.appendChild(nav); // Adaugă navigația în containerul principal. // Creează containerul pentru conținutul specific paginii, dacă nu există.

    if (!document.getElementById("page-content")) {
      const pageContentContainer = document.createElement("div");
      pageContentContainer.id = "page-content"; // ID pentru a-l putea referi ușor.
      appContainer.appendChild(pageContentContainer); // Adaugă la containerul principal.
    }
  }

  // Funcție pentru a actualiza care link de navigare este marcat ca 'activ'.
  function updateActiveNavLink() {
    // Obține hash-ul curent din URL (partea de după '#').
    const currentHash = window.location.hash || "#home"; // Default la #home dacă nu există hash. // Găsește toate linkurile de navigație.
    const navLinks = document.querySelectorAll(".main-nav .nav-link");

    navLinks.forEach((link) => {
      // Verifică dacă href-ul linkului corespunde hash-ului curent.
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active"); // Adaugă clasa 'active'.
      } else {
        link.classList.remove("active"); // Elimină clasa 'active'.
      }
    });
  }

  // Funcție pentru a randa conținutul paginii Acasă.
  function renderHomePage() {
    clearPageContent(); // Golește conținutul paginii anterioare.
    const pageContent = document.getElementById("page-content"); // Obține containerul de conținut. // Creează o secțiune pentru descriere.

    const descriptionSection = document.createElement("div");
    descriptionSection.className = "home-description-section text-center"; // Adaugă clase pentru stilizare. // Creează un element H2 pentru placeholder-ul de descriere.

    const descriptionText = document.createElement("h2");
    descriptionText.textContent =
      "Se află în Beliș la ieșire spre Lacul Fântânele, într-o zonă exclusivă de pensiuni și de cabane. Dispune de 5 camere, toate cu paturi matrimoniale foarte mari, tv și balcoane, două băi, bucătărie complet utilată ( cuptor electric, aragaz, frigider, cuptor cu microunde, prăjitor de pâine, expresor de cafea, ceainic, veselă completă etc. ) și living de 36mp, terasă mare, curte, foișor cu masă și bănci, grătar, ceaune, disc, hamace, balansoare, trambulină, groapă de nisip pentru copii, Wi fi etc. Încălzire cu centrală pe lemne. Ideală pentru 10 persoane adulți + copii. Se asigură patuț suplimentar de copii. Ciubărul cu apă caldă se achită separat, minim două zile. Se acceptă plata on-line, se eliberează factură și bon fiscal. Nu acceptăm animale de companie în interiorul cabanei. ( doar în camera tehnică). Nu se fumează în interiorul cabanei, aceasta fiind prevăzută cu senzori de fum. Se acordă reducere la fiecare grup care a mai fost cazat cel puțin odată. Ne rezervăm dreptul de a ne selecta clienții, nu acceptăm persoane dificile.   Vă așteptăm cu drag!"; // Textul placeholder.
    descriptionSection.appendChild(descriptionText); // Adaugă textul în secțiunea de descriere.

    pageContent.appendChild(descriptionSection); // Adaugă secțiunea de descriere în containerul de conținut. // Fundalul este global, textul se va suprapune conform CSS.
  }

  // Funcție pentru a randa conținutul paginii Galerie. (Funcție actualizată)
  function renderGalleryPage() {
    clearPageContent(); // Golește conținutul paginii anterioare.
    const pageContent = document.getElementById("page-content"); // Obține containerul de conținut. // Creează secțiunea principală pentru galerie.

    const gallerySection = document.createElement("div");
    gallerySection.className = "gallery-section container"; // Container Bootstrap pentru padding și aliniere. // Adaugă titlu pentru secțiunea de poze.

    const imagesTitle = document.createElement("h2");
    imagesTitle.textContent = "Poze"; // Textul titlului.
    imagesTitle.className = "text-center my-4"; // Clase Bootstrap pentru stilizare.
    gallerySection.appendChild(imagesTitle); // Adaugă titlul. // Creează un rând pentru poze.

    const imagesRow = document.createElement("div");
    imagesRow.className = "gallery-row"; // Clasă personalizată pentru stilizarea rândului. // ============================================================= // AICI PUI LISTA CU CĂILE CĂTRE CELE 10 POZE ALE TALE // Asigură-te că aceste căi sunt corecte și fișierele există la aceste locații // relative la fișierul tău HTML (de ex. dacă pozele sunt în folderul 'images' lângă index.html) // =============================================================

    const imagePaths = [
      "poze/poza1.jpg",
      "poze/poza2.jpg",
      "poze/poza3.jpg",
      "poze/poza4.jpg",
      "poze/poza5.jpg",
      "poze/poza6.jpg",
      "poze/poza7.jpg",
      "poze/poza8.jpg",
      "poze/poza9.jpg",
      "poze/poza10.jpg", // Adaugă sau modifică aceste linii cu căile exacte către pozele tale
    ];

    // Iterează prin căile imaginilor și creează elemente <img>
    imagePaths.forEach((imgPath) => {
      const imgWrapper = document.createElement("div"); // Un div wrapper pentru fiecare imagine
      imgWrapper.className = "gallery-item"; // Clasă pentru stilizare (pentru layout, margini etc.)

      const imgElement = document.createElement("img"); // Creează elementul IMG
      imgElement.src = imgPath; // <<=== AICI SE SETEAZĂ CALEA FIȘIERULUI
      imgElement.alt = "Poză din galerie"; // Text alternativ - MODIFICĂ ACESTA CU DESCRIERI RELEVANTE
      imgElement.className = "img-fluid"; // Clasă Bootstrap pentru imagini responsive (opțional) // === ADĂUGARE EVENT LISTENER PE WRAPPER-UL IMAGINII PENTRU LIGHTBOX ===

      imgWrapper.addEventListener("click", () => {
        openLightbox(imgPath); // Apelez funcția openLightbox când se dă click, cu calea pozei
      });
      imgWrapper.appendChild(imgElement); // Adaugă imaginea în wrapper
      imagesRow.appendChild(imgWrapper); // Adaugă wrapper-ul în rând
    });

    gallerySection.appendChild(imagesRow); // Adaugă rândul de imagini în secțiunea galeriei. // Adaugă titlu pentru secțiunea de video-uri.

    const videosTitle = document.createElement("h2");
    videosTitle.textContent = "Video"; // Textul titlului.
    videosTitle.className = "text-center my-4 mt-5"; // Clase Bootstrap pentru stilizare și spațiere.
    gallerySection.appendChild(videosTitle); // Adaugă titlul. // Creează un rând pentru video-uri.

    const videosRow = document.createElement("div");
    videosRow.className = "gallery-row"; // Clasă personalizată pentru stilizarea rândului. // ============================================================= // AICI PUI LISTA CU SURSELE PENTRU CELE 4 VIDEO-URI LOCALE // =============================================================

    const videoSources = [
      { type: "file", src: "video/video1.mp4" },
      { type: "file", src: "video/video2.mp4" },
      { type: "file", src: "video/video3.mp4" },
      { type: "file", src: "video/video4.mp4" },
    ];

    videoSources.forEach((videoItem) => {
      const videoWrapper = document.createElement("div"); // Un div wrapper pentru fiecare video
      videoWrapper.className = "gallery-item video-item"; // Clasă pentru stilizare // Creează un element <video> pentru fișiere locale

      const videoElement = document.createElement("video");
      videoElement.src = videoItem.src; // <<=== AICI SE SETEAZĂ CALEA FIȘIERULUI VIDEO
      videoElement.controls = true; // <<=== ACESTA ADĂUGĂ BUTOANELE DE PLAY/PAUZĂ, VOLUM ETC. // !! Stilurile de lățime și înălțime vor fi gestionate prin CSS !! // videoElement.style.width = "100%"; // videoElement.style.height = "auto";

      videoWrapper.appendChild(videoElement); // Opțional: adaugă un titlu sub video (textul din proprietatea 'title' din lista videoSources)

      if (videoItem.title) {
        const videoTitleElement = document.createElement("p");
        videoTitleElement.textContent = videoItem.title;
        videoTitleElement.className = "text-center mt-2"; // Clasă Bootstrap pentru text centrat și margine sus
        videoWrapper.appendChild(videoTitleElement);
      }

      videosRow.appendChild(videoWrapper); // Adaugă wrapper-ul în rând
    });

    gallerySection.appendChild(videosRow); // Adaugă rândul de video-uri în secțiunea galeriei.

    pageContent.appendChild(gallerySection); // Adaugă secțiunea galeriei în containerul de conținut.
  }

  // Funcție pentru a randa conținutul paginii Contact și Rezervare.
  function renderContactPage() {
    clearPageContent(); // Golește conținutul paginii anterioare.
    const pageContent = document.getElementById("page-content"); // Obține containerul de conținut. // Creează containerul principal pentru ambele formulare, folosind Flexbox pentru aranjare.

    const formsWrapper = document.createElement("div");
    formsWrapper.className = "contact-booking-section"; // Clasă pentru stilizare și aranjare. // --- Formularul de Contact ---

    const contactFormContainer = document.createElement("div"); // Container pentru formularul de contact.
    contactFormContainer.className = "form-container"; // Clasă pentru stilizare.

    const contactTitle = document.createElement("h3"); // Titlul formularului.
    contactTitle.textContent = "Contactează-ne"; // Textul titlului.
    contactFormContainer.appendChild(contactTitle); // Adaugă titlul.

    const contactForm = document.createElement("form"); // Elementul FORM.
    contactForm.id = "contactForm"; // ID pentru formular. // Câmp Nume

    contactForm.appendChild(createFormGroup("text", "contactNume", "Nume:")); // Câmp Prenume
    contactForm.appendChild(
      createFormGroup("text", "contactPrenume", "Prenume:")
    ); // Câmp Email
    contactForm.appendChild(createFormGroup("email", "contactEmail", "Email:")); // Câmp Telefon
    contactForm.appendChild(
      createFormGroup("tel", "contactTelefon", "Număr Telefon:")
    ); // Câmp Mesaj NOU

    contactForm.appendChild(
      createFormGroupTextarea("contactMesaj", "Mesajul tău:")
    );

    // Buton Submit pentru formularul de contact
    const submitContactButton = document.createElement("button"); // Creează butonul.
    submitContactButton.type = "submit"; // Tipul butonului.
    submitContactButton.className = "btn btn-primary mt-3"; // Clase Bootstrap.
    submitContactButton.textContent = "Trimite Mesaj"; // Textul butonului.
    contactForm.appendChild(submitContactButton); // Adaugă butonul la formular.

    contactForm.addEventListener("submit", function (e) {
      // Adaugă event listener pentru submit.
      e.preventDefault(); // Previne trimiterea efectivă a formularului.
      alert("Mesaj de contact trimis!"); // Afișează o alertă (simulare).
      contactForm.reset(); // Resetează câmpurile formularului.
    });

    contactFormContainer.appendChild(contactForm); // Adaugă formularul în containerul său.
    formsWrapper.appendChild(contactFormContainer); // Adaugă containerul formularului de contact la wrapper. // --- Formularul de Rezervare ---

    const bookingFormContainer = document.createElement("div"); // Container pentru formularul de rezervare.
    bookingFormContainer.className = "form-container"; // Clasă pentru stilizare.

    const bookingTitle = document.createElement("h3"); // Titlul formularului.
    bookingTitle.textContent = "Rezervă Acum"; // Textul titlului.
    bookingFormContainer.appendChild(bookingTitle); // Adaugă titlul.

    const bookingForm = document.createElement("form"); // Elementul FORM.
    bookingForm.id = "bookingForm"; // ID pentru formular. // Câmp Număr Camere (Select)

    const roomOptions = [
      // Opțiuni pentru numărul de camere.
      { value: "1", text: "1 Cameră" },
      { value: "2", text: "2 Camere" },
      { value: "3", text: "3 Camere" },
      { value: "4", text: "4 Camere" },
      { value: "5", text: "5 Camere" },
    ];
    bookingForm.appendChild(
      createFormGroupSelect("bookingCamere", "Număr Camere:", roomOptions)
    );

    // Câmp Număr Persoane (Total)
    bookingForm.appendChild(
      createFormGroup("number", "bookingPersoane", "Număr Total Persoane:", {
        min: "1",
      })
    );

    // Câmp Număr Adulți
    bookingForm.appendChild(
      createFormGroup("number", "bookingAdulti", "Adulți:", { min: "1" })
    );

    // Câmp Număr Copii
    bookingForm.appendChild(
      createFormGroup("number", "bookingCopii", "Copii (0-17 ani):", {
        min: "0",
      })
    );

    // Câmp Data Check-in
    bookingForm.appendChild(
      createFormGroup("date", "bookingCheckIn", "Data Check-in:")
    );

    // Câmp Data Check-out
    bookingForm.appendChild(
      createFormGroup("date", "bookingCheckOut", "Data Check-out:")
    );

    // Buton Submit pentru formularul de rezervare

    const submitBookingButton = document.createElement("button"); // Creează butonul.
    submitBookingButton.type = "submit"; // Tipul butonului.
    submitBookingButton.className = "btn btn-primary mt-3"; // Clase Bootstrap.
    submitBookingButton.textContent = "Verifică Disponibilitatea"; // Textul butonului.
    bookingForm.appendChild(submitBookingButton); // Adaugă butonul la formular.

    bookingForm.addEventListener("submit", function (e) {
      // Adaugă event listener pentru submit.
      e.preventDefault(); // Previne trimiterea efectivă a formularului.
      alert("Cerere de rezervare trimisă!"); // Afișează o alertă (simulare).
      bookingForm.reset(); // Resetează câmpurile formularului.
    });

    bookingFormContainer.appendChild(bookingForm); // Adaugă formularul în containerul său.
    formsWrapper.appendChild(bookingFormContainer); // Adaugă containerul formularului de rezervare la wrapper.

    pageContent.appendChild(formsWrapper); // Adaugă wrapper-ul cu formulare la conținutul paginii. // Fundalul este global, formularele se vor suprapune conform CSS.
  }

  // Funcție ajutătoare pentru a crea un grup de formular (label + input).
  function createFormGroup(type, id, labelText, attributes = {}) {
    const div = document.createElement("div"); // Creează un div container.
    div.className = "mb-3"; // Clasă Bootstrap pentru margine inferioară.

    const label = document.createElement("label"); // Creează eticheta.
    label.htmlFor = id; // Asociază eticheta cu input-ul.
    label.className = "form-label"; // Clasă Bootstrap.
    label.textContent = labelText; // Textul etichetei.

    const input = document.createElement("input"); // Creează input-ul.
    input.type = type; // Setează tipul input-ului.
    input.id = id; // Setează ID-ul input-ului.
    input.name = id; // Setează numele input-ului.
    input.className = "form-control form-control-sm"; // Clase Bootstrap (form-control-sm pentru input mai mic).
    input.required = true; // Marchează câmpul ca obligatoriu. // Setează atribute suplimentare (de ex. min, max pentru number).

    for (const key in attributes) {
      input.setAttribute(key, attributes[key]);
    }

    div.appendChild(label); // Adaugă eticheta în div.
    div.appendChild(input); // Adaugă input-ul în div.
    return div; // Returnează grupul de formular creat.
  }

  // Funcție ajutătoare pentru a crea un grup de formular (label + textarea).
  function createFormGroupTextarea(id, labelText, attributes = {}) {
    const div = document.createElement("div"); // Creează un div container.
    div.className = "mb-3"; // Clasă Bootstrap pentru margine inferioară.

    const label = document.createElement("label"); // Creează eticheta.
    label.htmlFor = id; // Asociază eticheta cu textarea-ul.
    label.className = "form-label"; // Clasă Bootstrap.
    label.textContent = labelText; // Textul etichetei.

    const textarea = document.createElement("textarea"); // Creează elementul TEXTAREA.
    textarea.id = id; // Setează ID-ul.
    textarea.name = id; // Setează numele.
    textarea.className = "form-control form-control-sm"; // Clase Bootstrap.
    textarea.required = true; // Marchează câmpul ca obligatoriu (opțional, poți schimba).
    textarea.rows = 4; // Setează numărul de rânduri vizibile. // Setează atribute suplimentare.

    for (const key in attributes) {
      textarea.setAttribute(key, attributes[key]);
    }

    div.appendChild(label); // Adaugă eticheta în div.
    div.appendChild(textarea); // Adaugă textarea-ul în div.
    return div; // Returnează grupul de formular creat.
  }

  // Funcție ajutătoare pentru a crea un grup de formular (label + select).
  function createFormGroupSelect(id, labelText, options) {
    const div = document.createElement("div"); // Creează un div container.
    div.className = "mb-3"; // Clasă Bootstrap.

    const label = document.createElement("label"); // Creează eticheta.
    label.htmlFor = id; // Asociază cu select-ul.
    label.className = "form-label"; // Clasă Bootstrap.
    label.textContent = labelText; // Textul etichetei.

    const select = document.createElement("select"); // Creează elementul SELECT.
    select.id = id; // ID-ul.
    select.name = id; // Numele.
    select.className = "form-select form-select-sm"; // Clase Bootstrap (form-select-sm pentru select mai mic).
    select.required = true; // Obligatoriu. // Adaugă opțiunile în select.

    options.forEach((opt) => {
      const option = document.createElement("option"); // Creează un element OPTION.
      option.value = opt.value; // Setează valoarea opțiunii.
      option.textContent = opt.text; // Setează textul afișat al opțiunii.
      select.appendChild(option); // Adaugă opțiunea în select.
    });

    div.appendChild(label); // Adaugă eticheta.
    div.appendChild(select); // Adaugă select-ul.
    return div; // Returnează grupul.
  } // FUNȚII PENTRU LIGHTBOX (Adăugate pentru mărirea pozelor)  // Funcție pentru a deschide lightbox-ul cu o imagine specifică

  function openLightbox(imgPath) {
    // Verifică dacă lightbox-ul există deja, pentru a nu crea duplicate
    if (document.getElementById("lightbox-overlay")) {
      return; // Ieși dacă lightbox-ul este deja deschis
    } // Creează overlay-ul (fundalul întunecat)

    const overlay = document.createElement("div");
    overlay.id = "lightbox-overlay"; // Adaugă un ID pentru stilizare și referință
    overlay.className = "lightbox-overlay"; // Adaugă o clasă pentru stilizare // Creează containerul pentru imaginea mărită

    const imgContainer = document.createElement("div");
    imgContainer.id = "lightbox-container"; // Adaugă un ID
    imgContainer.className = "lightbox-container"; // Adaugă o clasă // Creează elementul <img> pentru imaginea mărită

    const lightboxImg = document.createElement("img");
    lightboxImg.src = imgPath; // Setează sursa imaginii la calea primită
    lightboxImg.alt = "Imagine mărită"; // Text alternativ // Adaugă elementul <img> în container

    imgContainer.appendChild(lightboxImg); // Adaugă overlay-ul și containerul imaginii în corpul documentului

    document.body.appendChild(overlay);
    document.body.appendChild(imgContainer); // --- Adaugă evenimente pentru închiderea lightbox-ului --- // Închide lightbox-ul când se dă click pe overlay

    overlay.addEventListener("click", closeLightbox); // Închide lightbox-ul când se dă click pe containerul imaginii (sau pe imagine)

    imgContainer.addEventListener("click", closeLightbox); // Închide lightbox-ul când se apasă tasta Escape

    document.addEventListener("keydown", handleEscapeKey);
  }

  // Funcție pentru a închide lightbox-ul
  function closeLightbox() {
    const overlay = document.getElementById("lightbox-overlay");
    const imgContainer = document.getElementById("lightbox-container");

    if (overlay && imgContainer) {
      document.body.removeChild(overlay);
      document.body.removeChild(imgContainer); // Elimină event listener-ul pentru tasta Escape

      document.removeEventListener("keydown", handleEscapeKey);
    }
  }

  // Funcție pentru a gestiona tasta Escape
  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  } // --- Router Simplu Bazat pe Hash --- // Funcție pentru a determina ce pagină să randeze pe baza hash-ului din URL.

  function router() {
    const hash = window.location.hash; // Obține hash-ul curent. // Asigură-te că header-ul este randat (conține și containerul #page-content).

    renderHeader(); // Apoi actualizează link-ul activ din navigație.
    updateActiveNavLink(); // Decide ce funcție de randare să apeleze.

    if (hash === "#gallery") {
      renderGalleryPage(); // Randează pagina Galerie.
    } else if (hash === "#contact") {
      renderContactPage(); // Randează pagina Contact.
    } else {
      // Implicit (fără hash sau #home)
      window.location.hash = "#home"; // Setează hash-ul la #home dacă nu e specificat.
      renderHomePage(); // Randează pagina Acasă.
    }
  }

  // --- Inițializare --- // Adaugă un event listener pentru evenimentul 'hashchange' (când se schimbă hash-ul URL-ului).
  window.addEventListener("hashchange", router); // Apelează router-ul la încărcarea inițială a paginii pentru a afișafie pagina corectă.

  router();
}); // Sfârșitul event listener-ului DOMContentLoaded.
