(function () {


  const tabs = document.querySelectorAll(".tab");
  const panes = document.querySelectorAll(".tabpane");



  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");

      const tabName = tab.dataset.tab;
      if (tabName) {
        const pane = document.getElementById("pane-" + tabName);
        if (pane) pane.classList.add("active");
      }
    });
  });


  const pnrTab = document.getElementById("pnrTab");
  const bookTab = document.querySelector('[data-tab="search"]');

  const pnrPane = document.getElementById("pane-pnr");
  const bookPane = document.getElementById("pane-search");


  if (pnrTab) {
    pnrTab.addEventListener("click", () => {
      bookPane.classList.remove("active");
      pnrPane.classList.add("active");
    });
  }

  if (bookTab) {
    bookTab.addEventListener("click", () => {
      pnrPane.classList.remove("active");
      bookPane.classList.add("active");
    });
  }


  const swapBtn = document.getElementById("swapBtn");

  if (swapBtn) {
    swapBtn.addEventListener("click", () => {
      const from = document.getElementById("from");
      const to = document.getElementById("to");

      if (from && to) {
        [from.value, to.value] = [to.value, from.value];
      }
    });
  }

if(searchbtn){
  searchbtn.addEventListener("click", () => {
    bookPane.classList.add("active");
    pnrPane.classList.remove("active");
  });
}


})();
