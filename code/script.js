(function () {

  // ============================
  // 1) TAB SWITCHING (AS IT IS)
  // ============================
  const tabs = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.tabpane');

  tabs.forEach(tab => {
    const switchTab = e => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById("pane-" + tab.dataset.tab).classList.add('active');
    };

    tab.addEventListener("click", switchTab);
    tab.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") switchTab(e);
    });
  });



  // ============================
  // 2) FROM–TO SWAP
  // ============================
  const swapBtn = document.getElementById("swapBtn");
  if (swapBtn) {
    swapBtn.addEventListener("click", () => {
      const from = document.getElementById("from");
      const to = document.getElementById("to");
      [from.value, to.value] = [to.value, from.value];
    });
  }



  // ============================
  // 3) REAL INDIAN TRAIN DATA
  // ============================
  const sampleTrains = [
    { no: '12002', name: 'New Delhi – Bhopal Shatabdi Express', dep: '06:00', arr: '14:40', dur: '8h 40m', days: 'Daily' },
    { no: '12235', name: 'Mumbai – Nagpur Vande Bharat Express', dep: '06:00', arr: '14:50', dur: '8h 50m', days: 'Daily' },
    { no: '12050', name: 'Gatimaan Express (Delhi – Agra)', dep: '08:10', arr: '09:50', dur: '1h 40m', days: 'Daily' },
    { no: '12294', name: 'Prayagraj – New Delhi Tejas Express', dep: '15:00', arr: '21:55', dur: '6h 55m', days: 'Daily' },
    { no: '12423', name: 'Dibrugarh – New Delhi Rajdhani Express', dep: '20:55', arr: '13:55 (+2)', dur: '41h', days: 'Daily' },
  ];



  // ============================
  // 4) RENDER TRAIN RESULTS
  // ============================
  const resultsEl = document.getElementById("results");

  const renderTrains = trains => {
    resultsEl.innerHTML = trains.length
      ? trains.map(r => `
      <div class="result-wrap">
        <div class="result-header">
          <span>${r.name}</span>
          <button class="drop-btn">View Details</button>
        </div>

        <div class="result-body">
          <div class="r-item">
            <div class="r-left">
              <div class="r-title">${r.name} <span>(${r.no})</span></div>
              <div class="muted small">${r.days}</div>
            </div>

            <div class="r-mid">
              <div class="times">
                <div><div class="small">Dep</div><div class="big">${r.dep}</div></div>
                <div class="arrow">→</div>
                <div><div class="small">Arr</div><div class="big">${r.arr}</div></div>
              </div>
              <div class="muted small">${r.dur}</div>
            </div>

            <div class="r-right">
              <button class="btn primary">Book</button>
            </div>
          </div>
        </div>
      </div>`).join("")
      : `<p class="note">No trains found.</p>`;

    resultsEl.scrollIntoView({ behavior: "smooth" });

    const allBodies = document.querySelectorAll(".result-body");

    document.querySelectorAll(".drop-btn").forEach((btn, index) => {
      btn.addEventListener("click", () => {

        allBodies.forEach((b, i) => {
          if (i !== index) b.classList.remove("show");
        });

        allBodies[index].classList.toggle("show");
      });
    });
  };



  // ============================
  // 5) SEARCH BUTTON
  // ============================
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const value = searchInput.value.toLowerCase();

      const filtered = sampleTrains.filter(train =>
        train.name.toLowerCase().includes(value) ||
        train.no.includes(value)
      );

      renderTrains(filtered);
    });
  }



  // ============================
  // 6) LIVE FILTER SEARCH (TYPE KARTE HI SHOW)
  // ============================
  const liveInput = document.getElementById("searchInput");

  if (liveInput) {
    liveInput.addEventListener("input", () => {
      const value = liveInput.value.toLowerCase();

      const filtered = sampleTrains.filter(train =>
        train.name.toLowerCase().includes(value) ||
        train.no.includes(value)
      );

      renderTrains(filtered);
    });
  }

})();
