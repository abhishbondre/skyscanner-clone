// main.js - Skyscanner UI Clone

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const mockFlights = [
    { id: 1, from: "New York (JFK)", to: "London (LHR)", departure: "2024-06-15T10:00", arrival: "2024-06-15T22:00", airline: "British Airways", price: 450, duration: 450, stops: 0, distance: 5567 },
    { id: 2, from: "Los Angeles (LAX)", to: "Tokyo (NRT)", departure: "2024-06-16T12:00", arrival: "2024-06-17T16:00", airline: "Japan Airlines", price: 780, duration: 690, stops: 0, distance: 8817 },
    { id: 3, from: "London (LHR)", to: "Paris (CDG)", departure: "2024-06-17T08:00", arrival: "2024-06-17T10:30", airline: "Air France", price: 120, duration: 90, stops: 0, distance: 344 },
    { id: 4, from: "Sydney (SYD)", to: "Singapore (SIN)", departure: "2024-06-18T14:00", arrival: "2024-06-18T20:00", airline: "Singapore Airlines", price: 350, duration: 480, stops: 0, distance: 6300 },
    { id: 5, from: "Dubai (DXB)", to: "New York (JFK)", departure: "2024-06-19T22:00", arrival: "2024-06-20T05:00", airline: "Emirates", price: 650, duration: 840, stops: 0, distance: 11000 },
    // Additional flights for Dubai -> New York
    { id: 11, from: "Dubai (DXB)", to: "New York (JFK)", departure: "2024-06-19T09:00", arrival: "2024-06-19T23:00", airline: "Qatar Airways", price: 550, duration: 980, stops: 1, distance: 11500 },
    { id: 12, from: "Dubai (DXB)", to: "New York (JFK)", departure: "2024-06-19T15:00", arrival: "2024-06-20T07:00", airline: "Turkish Airlines", price: 480, duration: 1100, stops: 2, distance: 12000 },
    // Multiple flights for London -> Paris
    { id: 13, from: "London (LHR)", to: "Paris (CDG)", departure: "2024-06-17T09:00", arrival: "2024-06-17T11:30", airline: "British Airways", price: 140, duration: 90, stops: 0, distance: 344 },
    { id: 14, from: "London (LHR)", to: "Paris (CDG)", departure: "2024-06-17T13:00", arrival: "2024-06-17T15:30", airline: "KLM", price: 110, duration: 150, stops: 1, distance: 500 },
    // Multiple flights for Sydney -> Singapore
    { id: 15, from: "Sydney (SYD)", to: "Singapore (SIN)", departure: "2024-06-18T16:00", arrival: "2024-06-18T23:00", airline: "Qantas", price: 370, duration: 420, stops: 0, distance: 6300 },
    { id: 16, from: "Sydney (SYD)", to: "Singapore (SIN)", departure: "2024-06-18T20:00", arrival: "2024-06-19T04:00", airline: "Scoot", price: 290, duration: 480, stops: 1, distance: 6700 },
    // Other original flights
    { id: 6, from: "Delhi (DEL)", to: "Frankfurt (FRA)", departure: "2024-06-20T09:00", arrival: "2024-06-20T15:00", airline: "Lufthansa", price: 400, duration: 480, stops: 1, distance: 6130 },
    { id: 7, from: "Toronto (YYZ)", to: "Vancouver (YVR)", departure: "2024-06-21T07:00", arrival: "2024-06-21T10:00", airline: "Air Canada", price: 220, duration: 300, stops: 0, distance: 3358 },
    { id: 8, from: "Bangkok (BKK)", to: "Sydney (SYD)", departure: "2024-06-22T13:00", arrival: "2024-06-22T23:00", airline: "Qantas", price: 500, duration: 600, stops: 1, distance: 7538 },
    { id: 9, from: "San Francisco (SFO)", to: "Hong Kong (HKG)", departure: "2024-06-23T16:00", arrival: "2024-06-24T21:00", airline: "Cathay Pacific", price: 900, duration: 900, stops: 0, distance: 11128 },
    { id: 10, from: "Istanbul (IST)", to: "Rome (FCO)", departure: "2024-06-24T11:00", arrival: "2024-06-24T13:00", airline: "Turkish Airlines", price: 180, duration: 120, stops: 0, distance: 1378 },
    // Additional flights for New York -> London
    { id: 17, from: "New York (JFK)", to: "London (LHR)", departure: "2024-06-15T14:00", arrival: "2024-06-15T23:30", airline: "Virgin Atlantic", price: 420, duration: 510, stops: 1, distance: 5700 },
    { id: 18, from: "New York (JFK)", to: "London (LHR)", departure: "2024-06-15T18:00", arrival: "2024-06-16T06:00", airline: "Delta", price: 390, duration: 480, stops: 2, distance: 6000 },
    { id: 19, from: "New York (JFK)", to: "London (LHR)", departure: "2024-06-15T20:00", arrival: "2024-06-16T08:00", airline: "United", price: 470, duration: 480, stops: 0, distance: 5567 }
  ];

  const mockLayovers = [
    { airport: "London Heathrow", attraction: "Windsor Castle", distance: "15 km", travelTime: "30 min", duration: "2-3 hours", description: "Visit the oldest and largest inhabited castle in the world." },
    { airport: "Singapore Changi", attraction: "Gardens by the Bay", distance: "20 km", travelTime: "25 min", duration: "2-3 hours", description: "Explore the futuristic Supertree Grove and Cloud Forest." },
    { airport: "Tokyo Narita", attraction: "Narita-san Shinsho-ji Temple", distance: "1 km", travelTime: "10 min", duration: "1-2 hours", description: "Visit this historic Buddhist temple complex." }
  ];

  // --- AIRPORT COORDINATES ---
  const airportCoords = {
    'JFK': [40.6413, -73.7781],
    'LHR': [51.4700, -0.4543],
    'LAX': [33.9416, -118.4085],
    'NRT': [35.7720, 140.3929],
    'CDG': [49.0097, 2.5479],
    'SYD': [-33.9399, 151.1753],
    'SIN': [1.3644, 103.9915],
    'DXB': [25.2532, 55.3657],
    'FRA': [50.0379, 8.5622],
    'DEL': [28.5562, 77.1000],
    'YYZ': [43.6777, -79.6248],
    'YVR': [49.1951, -123.1779],
    'BKK': [13.6900, 100.7501],
    'SFO': [37.6213, -122.3790],
    'HKG': [22.3080, 113.9185],
    'IST': [41.2753, 28.7519],
    'FCO': [41.7999, 12.2462]
  };

  function getAirportCode(str) {
    // Extract code from "City (CODE)"
    const match = str.match(/\((\w{3})\)/);
    return match ? match[1] : null;
  }

  // --- UTILS ---
  function calculateCO2(distance) {
    // 0.15 kg CO2 per km (simple model)
    return +(distance * 0.15).toFixed(1);
  }
  function formatDuration(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  }

  // --- RENDER FLIGHTS ---
  function renderFlights(flights) {
    const results = document.getElementById('results');
    const emptyState = document.getElementById('emptyState');
    results.innerHTML = '';
    if (flights.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    } else {
      emptyState.classList.add('hidden');
    }
    flights.forEach((flight, i) => {
      const co2 = calculateCO2(flight.distance);
      const ecoBadge = co2 < 800 ? '🌱 Eco' : co2 < 1200 ? '♻️ Moderate' : '⚠️ High';
      const ecoColor = co2 < 800 ? 'bg-green-100 text-green-700' : co2 < 1200 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
      const stopsText = flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`;
      results.innerHTML += `
        <div class="flight-card bg-white rounded-xl shadow p-5 flex flex-col gap-2 animate-fade-in-up" style="animation-delay:${i*60}ms">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-bold text-lg">${flight.from} → ${flight.to}</div>
              <div class="text-gray-500 text-sm">${flight.airline}</div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-blue-600">$${flight.price}</div>
              <div class="text-xs text-gray-400">${formatDuration(flight.duration)}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="tooltip ${ecoColor} px-2 py-1 rounded text-xs font-semibold">
              ${ecoBadge}
              <span class="tooltip-text">${ecoBadge === '🌱 Eco' ? 'Lowest emissions' : ecoBadge === '♻️ Moderate' ? 'Medium emissions' : 'High emissions'}</span>
            </span>
            <span class="text-xs text-gray-600">${co2} kg CO₂</span>
            <span class="text-xs text-gray-600">| ${stopsText}</span>
          </div>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Select Flight</button>
        </div>
      `;
    });
  }

  // --- RENDER CARBON CHART ---
  function renderCarbonChart(flights) {
    const ctx = document.getElementById('carbonChart').getContext('2d');
    if (window.carbonChartInstance) window.carbonChartInstance.destroy();
    window.carbonChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: flights.map(f => `${f.from}→${f.to}`),
        datasets: [{
          label: 'CO₂ (kg)',
          data: flights.map(f => calculateCO2(f.distance)),
          backgroundColor: flights.map(f => calculateCO2(f.distance) < 800 ? '#22c55e' : calculateCO2(f.distance) < 1200 ? '#eab308' : '#ef4444')
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `CO₂: ${context.parsed.y} kg`;
              }
            }
          }
        },
        scales: { y: { beginAtZero: true, title: { display: true, text: 'kg CO₂' } } }
      }
    });
  }

  // --- RENDER MAP ---
  function renderMap(flights) {
    if (window.leafletMap) { window.leafletMap.remove(); }
    window.leafletMap = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(window.leafletMap);
    flights.forEach(flight => {
      // Use real coordinates for destination airport
      const code = getAirportCode(flight.to);
      const coords = airportCoords[code];
      if (!coords) return;
      const marker = L.marker(coords).addTo(window.leafletMap);
      marker.bindPopup(`<b>${flight.to}</b><br>From $${flight.price}<br>${calculateCO2(flight.distance)} kg CO₂<br><span style='font-size:0.9em;color:#22c55e;'>${calculateCO2(flight.distance) < 800 ? '🌱 Eco' : calculateCO2(flight.distance) < 1200 ? '♻️ Moderate' : '⚠️ High'}</span>`);
    });
  }

  // --- RENDER LAYOVERS ---
  function renderLayovers() {
    const layoverDiv = document.getElementById('layoverResults');
    layoverDiv.innerHTML = '';
    mockLayovers.forEach((attraction, i) => {
      layoverDiv.innerHTML += `
        <div class="layover-card bg-white rounded-xl shadow p-5 animate-fade-in-up" style="animation-delay:${i*80}ms">
          <div class="font-bold text-lg mb-1">${attraction.attraction}</div>
          <div class="text-gray-500 text-sm mb-2">Near ${attraction.airport}</div>
          <div class="flex gap-4 text-xs mb-2">
            <span>Distance: ${attraction.distance}</span>
            <span>Travel: ${attraction.travelTime}</span>
            <span>Visit: ${attraction.duration}</span>
          </div>
          <div class="mb-2 text-gray-700 text-sm">${attraction.description}</div>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Plan Visit</button>
        </div>
      `;
    });
  }

  // --- POPULATE DROPDOWNS (ALWAYS VALID PAIR) ---
  function getUniqueFroms(toFilter = null) {
    if (toFilter) {
      return [...new Set(mockFlights.filter(f => f.to === toFilter).map(f => f.from))];
    }
    return [...new Set(mockFlights.map(f => f.from))];
  }
  function getUniqueTos(fromFilter = null) {
    if (fromFilter) {
      return [...new Set(mockFlights.filter(f => f.from === fromFilter).map(f => f.to))];
    }
    return [...new Set(mockFlights.map(f => f.to))];
  }
  function setDropdownValue(select, value, fallbackOptions) {
    if (fallbackOptions.includes(value)) {
      select.value = value;
    } else {
      select.value = fallbackOptions[0];
    }
  }
  function getAvailableDates(from, to) {
    return [...new Set(mockFlights.filter(f => f.from === from && f.to === to).map(f => f.departure.split('T')[0]))];
  }
  function updateDepartDate(from, to) {
    const departInput = document.getElementById('depart');
    const dates = getAvailableDates(from, to);
    if (dates.length > 0) {
      departInput.value = dates[0];
      departInput.min = dates[0];
      departInput.max = dates[dates.length - 1];
    } else {
      departInput.value = '';
      departInput.min = '';
      departInput.max = '';
    }
  }
  function syncDropdowns(triggered) {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    let fromVal = fromSelect.value;
    let toVal = toSelect.value;
    if (triggered === 'from') {
      const toOptions = getUniqueTos(fromVal);
      toSelect.innerHTML = toOptions.map(a => `<option value="${a}">${a}</option>`).join('');
      setDropdownValue(toSelect, toVal, toOptions);
      toVal = toSelect.value;
    } else if (triggered === 'to') {
      const fromOptions = getUniqueFroms(toVal);
      fromSelect.innerHTML = fromOptions.map(a => `<option value="${a}">${a}</option>`).join('');
      setDropdownValue(fromSelect, fromVal, fromOptions);
      fromVal = fromSelect.value;
    } else {
      const fromOptions = getUniqueFroms();
      fromSelect.innerHTML = fromOptions.map(a => `<option value="${a}">${a}</option>`).join('');
      setDropdownValue(fromSelect, fromVal, fromOptions);
      fromVal = fromSelect.value;
      const toOptions = getUniqueTos(fromVal);
      toSelect.innerHTML = toOptions.map(a => `<option value="${a}">${a}</option>`).join('');
      setDropdownValue(toSelect, toVal, toOptions);
      toVal = toSelect.value;
    }
    updateDepartDate(fromVal, toVal);
  }

  // --- SEARCH & FILTER ---
  function getSearchFilters() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const depart = document.getElementById('depart').value;
    // Only filter by depart date if set
    return { from, to, depart };
  }

  function filterFlightsBySearch(flights, filters) {
    return flights.filter(f => {
      const matchFrom = f.from === filters.from;
      const matchTo = f.to === filters.to;
      // Date match: only match if depart date is set and matches flight.departure (YYYY-MM-DD)
      const flightDate = f.departure.split('T')[0];
      const matchDate = !filters.depart || filters.depart === flightDate;
      return matchFrom && matchTo && matchDate;
    });
  }

  // --- FILTER & SORT (updated) ---
  function applyFiltersAndRender(searchFilteredFlights = null) {
    let filtered = searchFilteredFlights ? [...searchFilteredFlights] : [...mockFlights];
    const directOnly = document.getElementById('directFlights').checked;
    if (directOnly) filtered = filtered.filter(f => f.stops === 0);
    const sortBy = document.getElementById('sortBy').value;
    if (sortBy === 'eco') filtered.sort((a, b) => calculateCO2(a.distance) - calculateCO2(b.distance));
    else if (sortBy === 'price') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'duration') filtered.sort((a, b) => a.duration - b.duration);
    renderFlights(filtered);
    renderCarbonChart(filtered);
    renderMap(filtered);
  }

  // --- INIT ---
  syncDropdowns();

  // Sync dropdowns on change
  document.getElementById('from').addEventListener('change', () => syncDropdowns('from'));
  document.getElementById('to').addEventListener('change', () => syncDropdowns('to'));

  // Filters
  document.getElementById('sortBy').addEventListener('change', () => applyFiltersAndRender());
  document.getElementById('directFlights').addEventListener('change', () => applyFiltersAndRender());

  // Search form logic
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const filters = getSearchFilters();
    if (!filters.depart) {
      alert('Please select a departure date.');
      return;
    }
    const searchFiltered = filterFlightsBySearch(mockFlights, filters);
    applyFiltersAndRender(searchFiltered);
  });

  // Initial render (show all flights by default)
  applyFiltersAndRender();
  renderLayovers();
}); 