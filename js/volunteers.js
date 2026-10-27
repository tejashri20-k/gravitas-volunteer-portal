/* volunteers.js
   Shared data layer (localStorage), navigation toggle, home-page counter
   and the volunteer table renderer. Loaded on every page. */

const STORAGE_KEY = "gravitas2026_volunteers";

const Volunteers = {
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  saveAll(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },

  add(volunteer) {
    const list = this.getAll();
    list.push(volunteer);
    this.saveAll(list);
  },

  remove(regNo) {
    const list = this.getAll().filter(v => v.regNo !== regNo);
    this.saveAll(list);
  },

  exists(regNo, email) {
    return this.getAll().some(
      v => v.regNo.toUpperCase() === regNo.toUpperCase() ||
           v.email.toLowerCase() === email.toLowerCase()
    );
  },

  /* Draw rows into the volunteers table. `list` can be the full or a filtered list. */
  render(list) {
    const tbody = document.getElementById("volunteerBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (list.length === 0) {
      const tr = document.createElement("tr");
      tr.className = "empty-row";
      const td = document.createElement("td");
      td.colSpan = 9;
      td.textContent = this.getAll().length === 0
        ? "No volunteers registered yet. Register the first volunteer from the Register page."
        : "No volunteers match your search.";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    list.forEach((v, index) => {
      const tr = document.createElement("tr");
      const cells = [
        ["#", index + 1],
        ["Name", v.fullName],
        ["Reg. No", v.regNo],
        ["Email", v.email],
        ["Phone", v.phone],
        ["Year", v.year],
        ["Team", v.team],
        ["Availability", v.availability]
      ];

      cells.forEach(([label, value]) => {
        const td = document.createElement("td");
        td.setAttribute("data-label", label);
        td.textContent = value;          // textContent keeps user input safe from HTML injection
        tr.appendChild(td);
      });

      const actionTd = document.createElement("td");
      actionTd.setAttribute("data-label", "Action");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-small btn-danger";
      btn.textContent = "Remove";
      btn.addEventListener("click", () => {
        if (confirm("Remove " + v.fullName + " from the list?")) {
          Volunteers.remove(v.regNo);
          Volunteers.refreshPage();
        }
      });
      actionTd.appendChild(btn);
      tr.appendChild(actionTd);

      tbody.appendChild(tr);
    });
  },

  /* Re-draw the table and the total after any change. search.js re-applies the current query. */
  refreshPage() {
    const total = document.getElementById("totalCount");
    if (total) total.textContent = this.getAll().length;
    if (typeof applySearch === "function") {
      applySearch();
    } else {
      this.render(this.getAll());
    }
  }
};

/* ----- Mobile navigation toggle ----- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* Home page: live volunteer count */
  const homeCount = document.getElementById("homeCount");
  if (homeCount) homeCount.textContent = Volunteers.getAll().length;

  /* Volunteers page: first render */
  if (document.getElementById("volunteerBody")) Volunteers.refreshPage();
});
