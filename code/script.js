(function() {
  const tabs = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.tabpane');

  // Tab switching with click & keyboard, scroll prevent
  tabs.forEach(tab => {
    const switchTab = e => {
      e.preventDefault(); // scroll prevent
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('pane-' + tab.dataset.tab).classList.add('active');
    };
    tab.addEventListener('click', switchTab);
    tab.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') switchTab(e);
    });
  });

  // Swap from-to inputs
  const swapBtn = document.getElementById('swapBtn');
  swapBtn.addEventListener('click', () => {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    [from.value, to.value] = [to.value, from.value];
  });

  // Realistic Indian trains data
  const sampleTrains = [
    { no: '12002', name: 'New Delhi‑Bhopal Shatabdi Express', dep: '06:00', arr: '14:40', dur: '8h 40m', days: 'Daily' },
    { no: '12001', name: 'Bhopal‑New Delhi Shatabdi Express', dep: '15:20', arr: '00:00', dur: '8h 40m', days: 'Daily' },
    { no: '12621', name: 'Tamil Nadu Express', dep: '20:00 (Chennai)', arr: '04:00 (Delhi +1)', dur: '32h', days: 'Daily' },
    { no: '12622', name: 'New Delhi‑Tamil Nadu Express', dep: '08:40 (Delhi)', arr: '16:40 (Chennai +1)', dur: '32h', days: 'Daily' },
    { no: '12441', name: 'Bilaspur‑New Delhi Rajdhani Express', dep: '18:45', arr: '15:25 (Next Day)', dur: '20h 40m', days: 'Bi-Weekly' },
    { no: '12442', name: 'New Delhi‑Bilaspur Rajdhani Express', dep: '12:30', arr: '09:10 (Next Day)', dur: '20h 40m', days: 'Bi-Weekly' },
    { no: '12617', name: 'Mangala Lakshadweep Express', dep: '08:00 (New Delhi)', arr: '09:00 (Kochi +2)', dur: '49h', days: 'Daily' },
    { no: '12618', name: 'Kochi‑New Delhi Mangala Lakshadweep Express', dep: '11:15 (Kochi)', arr: '14:00 (New Delhi +2)', dur: '49h', days: 'Daily' },
    { no: '12049', name: 'Gatimaan Express (Delhi‑Agra)', dep: '08:10', arr: '09:50', dur: '1h 40m', days: 'Daily' },
    { no: '13005', name: 'Amritsar Mail (Howrah‑Amritsar)', dep: '18:45 (Howrah)', arr: '07:30 (Amritsar +1)', dur: '36h 45m', days: 'Daily' },
    { no: '13006', name: 'Amritsar Mail (Amritsar‑Howrah)', dep: '10:00 (Amritsar)', arr: '22:45 (Howrah)', dur: '36h 45m', days: 'Daily' },
  ];

  const resultsEl = document.getElementById('results');
  const renderTrains = trains => {
    resultsEl.innerHTML = trains.length
      ? trains.map(r => `
          <div class="result-item">
            <div class="r-left">
              <div class="r-title">${r.name} <span class="muted">(${r.no})</span></div>
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
          </div>`).join('')
      : '<p class="note">No trains found.</p>';
    resultsEl.scrollIntoView({ behavior: 'smooth' });
  };

  // Search button click
document.getElementById('searchBtn').addEventListener('click', () => {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();

  const filteredTrains = sampleTrains.filter(train =>
    train.name.toLowerCase().includes(searchValue) ||
    train.number.toString().includes(searchValue) ||
    train.route.toLowerCase().includes(searchValue)
  );

  renderTrains(filteredTrains);
});


  // Optional: live filter by input
  const searchInput = document.getElementById('from');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const filtered = sampleTrains.filter(t => 
        t.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        t.no.includes(searchInput.value)
      );
      renderTrains(filtered);
    });
  }

  // Menu toggle
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.main-nav').classList.toggle('open');
  });

})();
