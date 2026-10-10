// =====================================================================
// script.js  -  runs on both index.html and subject.html
// It reads the SUBJECTS list from data.js and builds the pages from it.
// =====================================================================

const THEME_KEY = "sd-theme";
const BOOKMARK_KEY = "sd-bookmarks";


// ---------- 1. Small helper to build HTML elements ----------
// el("a", { href: "x", textContent: "Hello" }, [child1, child2])
// creates <a href="x">Hello</a> with the children inside it.
// We use textContent (not innerHTML) so text can never be treated as code.
function el(tag, props, children) {
  const node = document.createElement(tag);
  Object.assign(node, props || {});
  (children || []).forEach(function (child) {
    node.append(child);   // append() accepts both text and elements
  });
  return node;
}


// ---------- 2. Dark mode ----------
const themeButton = document.querySelector("#theme-toggle");

function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

themeButton.addEventListener("click", function () {
  const isDark = document.documentElement.dataset.theme === "dark";
  const newTheme = isDark ? "light" : "dark";

  document.documentElement.dataset.theme = newTheme;   // CSS reacts to this attribute

  try {
    localStorage.setItem(THEME_KEY, newTheme);          // remember the choice
  } catch (error) {
    // Storage is blocked. The theme still changes, it just won't be remembered.
  }
  updateThemeButton();
});


// ---------- 3. Bookmarks (saved in the visitor's own browser) ----------
function loadBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveBookmarks(list) {
  try {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
  } catch (error) {
    // Storage is blocked, so bookmarks can't be saved.
  }
}

function isSaved(url) {
  return loadBookmarks().some(function (item) {
    return item.url === url;
  });
}

// Adds the item if it is not saved yet, removes it if it is.
function toggleBookmark(item) {
  const list = loadBookmarks();
  const exists = list.some(function (saved) {
    return saved.url === item.url;
  });

  if (exists) {
    saveBookmarks(list.filter(function (saved) {
      return saved.url !== item.url;
    }));
  } else {
    list.push(item);
    saveBookmarks(list);
  }
}


// ---------- 4. Building one resource row ----------
function buildResourceRow(resource, subject) {
  const link = el("a", {
    href: resource.url,
    target: "_blank",
    rel: "noopener noreferrer",   // good practice whenever you open a new tab
    textContent: resource.title
  });

  const meta = el("div", { className: "resource-meta" }, [
    el("span", { className: "tag", textContent: resource.type }),
    el("span", { className: "resource-source", textContent: resource.source })
  ]);

  const info = el("div", { className: "resource-info" }, [link, meta]);

  const button = el("button", { className: "btn", type: "button" });

  // Updates the button text to match whether the resource is saved
  function refreshButton() {
    const saved = isSaved(resource.url);
    button.textContent = saved ? "Saved" : "Save";
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", (saved ? "Remove from saved: " : "Save: ") + resource.title);
  }

  refreshButton();

  button.addEventListener("click", function () {
    toggleBookmark({
      title: resource.title,
      url: resource.url,
      subjectName: subject.name
    });
    refreshButton();
  });

  return el("li", { className: "row" }, [info, button]);
}


// ---------- 5. Home page ----------
// All the words a subject can be found by, joined into one lowercase string.
function buildSearchText(subject) {
  const parts = [subject.name, subject.description];

  subject.units.forEach(function (unit) {
    parts.push(unit.title);
    parts.push(unit.topics.join(" "));
  });

  subject.resources.forEach(function (resource) {
    parts.push(resource.title);
  });

  return parts.join(" ").toLowerCase();
}

function renderSubjectList() {
  const list = document.querySelector("#subject-list");

  SUBJECTS.forEach(function (subject) {
    const text = el("span", { className: "subject-text" }, [
      el("span", { className: "subject-name", textContent: subject.name }),
      el("span", { className: "subject-description", textContent: subject.description })
    ]);

    const meta = el("span", {
      className: "subject-meta",
      textContent: subject.units.length + " units"
    });

    const link = el("a", {
      href: "subject.html?id=" + encodeURIComponent(subject.id),
      className: "subject-link"
    }, [text, meta]);

    const item = el("li", {}, [link]);
    item.dataset.search = buildSearchText(subject);   // stored on the element for the search to use
    list.append(item);
  });
}

function setupSearch() {
  const searchBox = document.querySelector("#search");
  const noResults = document.querySelector("#no-results");
  const items = document.querySelectorAll("#subject-list li");

  searchBox.addEventListener("input", function () {
    const query = searchBox.value.toLowerCase().trim();
    let visibleCount = 0;

    items.forEach(function (item) {
      const isMatch = item.dataset.search.includes(query);
      item.hidden = !isMatch;
      if (isMatch) {
        visibleCount++;
      }
    });

    noResults.hidden = visibleCount !== 0;
  });

  // Press "/" anywhere to jump to the search box
  document.addEventListener("keydown", function (event) {
    if (event.key === "/" && document.activeElement !== searchBox) {
      event.preventDefault();
      searchBox.focus();
    }
  });
}

function renderSaved() {
  const list = document.querySelector("#saved-list");
  const emptyMessage = document.querySelector("#saved-empty");
  const saved = loadBookmarks();

  list.replaceChildren();               // clear the old rows
  list.hidden = saved.length === 0;
  emptyMessage.hidden = saved.length > 0;

  saved.forEach(function (item) {
    const link = el("a", {
      href: item.url,
      target: "_blank",
      rel: "noopener noreferrer",
      textContent: item.title
    });

    const meta = el("div", { className: "resource-meta" }, [
      el("span", { className: "resource-source", textContent: item.subjectName })
    ]);

    const info = el("div", { className: "resource-info" }, [link, meta]);

    const removeButton = el("button", { className: "btn", type: "button", textContent: "Remove" });
    removeButton.setAttribute("aria-label", "Remove from saved: " + item.title);
    removeButton.addEventListener("click", function () {
      toggleBookmark(item);
      renderSaved();                    // redraw the list without it
    });

    list.append(el("li", { className: "row" }, [info, removeButton]));
  });
}


// ---------- 6. Subject page ----------
function renderSubjectPage() {
  const root = document.querySelector("#subject-root");

  // The web address looks like subject.html?id=maths. This reads the "maths" part.
  const params = new URLSearchParams(window.location.search);
  const subject = SUBJECTS.find(function (item) {
    return item.id === params.get("id");
  });

  if (!subject) {
    document.title = "Subject not found | notavgcoder";
    root.append(
      el("h1", { textContent: "Subject not found" }),
      el("p", { className: "intro" }, [
        "That subject does not exist. ",
        el("a", { href: "index.html", textContent: "Go back to all subjects." })
      ])
    );
    return;
  }

  document.title = subject.name + " | notavgcoder";

  root.append(
    el("h1", { textContent: subject.name }),
    el("p", { className: "intro", textContent: subject.description })
  );

  // Start-here resources
  const resourceList = el("ul", { className: "list-box" });
  subject.resources.forEach(function (resource) {
    resourceList.append(buildResourceRow(resource, subject));
  });
  root.append(el("h2", { textContent: "Start here" }), resourceList);

  // Units
  root.append(
    el("h2", { textContent: "Units and topics" }),
    el("p", {
      className: "hint",
      textContent: "Topic links open a web search. Check your own syllabus for what your teacher expects."
    })
  );

  subject.units.forEach(function (unit, index) {
    const topicList = el("ul", { className: "topics" });

    unit.topics.forEach(function (topic) {
      const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(topic + " " + subject.name + " notes");
      topicList.append(el("li", {}, [
        el("a", { href: searchUrl, target: "_blank", rel: "noopener noreferrer", textContent: topic })
      ]));
    });

    const section = el("section", { className: "unit" }, [
      el("h3", { textContent: "Unit " + (index + 1) + ": " + unit.title }),
      topicList
    ]);

    // Optional: a unit can have its own resources list in data.js
    if (unit.resources && unit.resources.length > 0) {
      const unitResources = el("ul", { className: "list-box unit-resources" });
      unit.resources.forEach(function (resource) {
        unitResources.append(buildResourceRow(resource, subject));
      });
      section.append(unitResources);
    }

    root.append(section);
  });
}


// ---------- 7. Start everything ----------
updateThemeButton();

if (document.body.dataset.page === "home") {
  renderSubjectList();
  setupSearch();
  renderSaved();
}

if (document.body.dataset.page === "subject") {
  renderSubjectPage();
}
