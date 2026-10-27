/* search.js
   Live search on the Registered Volunteers page.
   Matches name, registration number, email, phone, year, team and availability. */

function applySearch() {
  const input = document.getElementById("searchInput");
  const info = document.getElementById("resultInfo");
  const all = Volunteers.getAll();
  const query = input ? input.value.trim().toLowerCase() : "";

  const filtered = query === ""
    ? all
    : all.filter(v =>
        [v.fullName, v.regNo, v.email, v.phone, v.year, v.team, v.availability]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );

  Volunteers.render(filtered);

  if (info) {
    info.textContent = query === ""
      ? ""
      : "Showing " + filtered.length + " of " + all.length + " volunteers for \"" + input.value.trim() + "\"";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (input) input.addEventListener("input", applySearch);
});
