
(function () {

  // ============================
  // 1) TAB SWITCHING (AS IT IS)
  // ============================
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.tabpane');

tabs.forEach(tab => {

  tab.addEventListener("click", e => {
    e.preventDefault();

    // sabse active class hatao
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));

    // jo tab dabaya gaya use active karo
    tab.classList.add('active');

    // pane ko dhoondo: pane-{data-tabValue}
    const pane = document.getElementById("pane-" + tab.dataset.tab);
    pane.classList.add('active');
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
