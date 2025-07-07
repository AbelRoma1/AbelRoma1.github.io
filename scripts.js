document.addEventListener('DOMContentLoaded', () => {
  const botonSecciones = document.getElementById('boton-secciones');
  const submenu = document.getElementById('submenu-secciones');

  // Alternar visibilidad al hacer clic
  botonSecciones.addEventListener('click', (e) => {
    e.preventDefault();
    if (submenu.style.display === 'flex') {
      submenu.style.display = 'none';
    } else {
      submenu.style.display = 'flex';
    }
  });
});

  // Clima con OpenWeather
  document.addEventListener('DOMContentLoaded', () => {
  const climaDiv = document.getElementById('clima');

  // Coordenadas de Buenos Aires (como en tu JSON)
  const lat = -34.75;
  const lon = -58.375;

  // URL con parámetros adecuados
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=-34.6131&longitude=-58.3772&hourly=temperature_2m&timezone=auto`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const horas = data.hourly.time;
      const temps = data.hourly.temperature_2m;

      const ahora = new Date();
      const horaActual = ahora.toISOString().slice(0, 13); // formato "YYYY-MM-DDTHH"

      const indice = horas.findIndex(h => h.startsWith(horaActual));

      if (indice !== -1) {
        const temperatura = temps[indice];
        climaDiv.textContent = `Temperatura actual: ${temperatura}°C`;
      } else {
        climaDiv.textContent = "No hay datos disponibles en este momento.";
      }
    })
    .catch(err => {
      console.error(err);
      climaDiv.textContent = "Error al obtener el clima.";
    });
});
