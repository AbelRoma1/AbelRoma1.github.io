document.addEventListener('DOMContentLoaded', () => {
  // 🔽 Menú desplegable
  const botonSecciones = document.getElementById('boton-secciones');
  const submenu = document.getElementById('submenu-secciones');

  botonSecciones?.addEventListener('click', (e) => {
    e.preventDefault();
    submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // 🌦 Clima con OpenWeather
  const climaDiv = document.getElementById('clima');
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=-34.6131&longitude=-58.3772&hourly=temperature_2m&timezone=auto`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const horas = data.hourly.time;
      const temps = data.hourly.temperature_2m;
      const ahora = new Date();
      const horaActual = ahora.toISOString().slice(0, 13);
      const indice = horas.findIndex(h => h.startsWith(horaActual));
      climaDiv.textContent = indice !== -1
        ? `Temperatura actual: ${temps[indice]}°C`
        : "No hay datos disponibles en este momento.";
    })
    .catch(err => {
      console.error(err);
      climaDiv.textContent = "Error al obtener el clima.";
    });

  // 📰 Noticias desde NewsAPI (si usás esto)
  const contenedor = document.querySelector('.noticias-grid');
  if (contenedor) {
    fetch('https://newsapi.org/v2/top-headlines?country=ar&apiKey=TU_API_KEY')
      .then(res => res.json())
      .then(data => {
        data.articles.forEach(n => {
          const noticia = document.createElement('a');
          noticia.className = 'noticia';
          noticia.href = n.url;
          noticia.style.backgroundImage = `url('${n.urlToImage || "../MEDIA/default.jpg"}')`;
          noticia.innerHTML = `<span>${n.title}</span>`;
          contenedor.appendChild(noticia);
        });
      })
      .catch(err => console.error('Error al cargar noticias:', err));
  }

  // 📰 Noticias desde tu JSON local (si usás noticias propias)
  // Descomentá esto si usás noticias.json en lugar de NewsAPI
  
  fetch('DATA/noticias.json')
    .then(res => res.json())
    .then(noticias => {
      noticias.forEach(n => {
        const noticia = document.createElement('a');
        noticia.className = 'noticia';
        noticia.href = n.link;
        noticia.style.backgroundImage = `url('${n.imagen}')`;
        noticia.innerHTML = `<span>${n.titulo}</span>`;
        contenedor.appendChild(noticia);
      });
    })
    .catch(err => console.error('Error al cargar noticias locales:', err));
  
});
// Mostrar resumen de noticias
fetch('DATA/noticias-index.json')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('noticias');
    if (!contenedor) return;
    data.forEach(noticia => {
      const div = document.createElement('div');
      div.innerHTML = `
        <a href="noticia.html?id=${noticia.id}">
          <h2>${noticia.titulo}</h2>
          <img src="${noticia.imagen}" alt="${noticia.titulo}" width="300">
        </a>
      `;
      contenedor.appendChild(div);
    });
  });
// Mostrar noticia completa
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
  fetch(`DATA/noticias/${id}.json`)
    .then(res => res.json())
    .then(noticia => {
      const contenedor = document.getElementById('noticia');
      contenedor.innerHTML = `
        <h1>${noticia.titulo}</h1>
        <img src="${noticia.imagen}" alt="${noticia.titulo}" width="600">
        <p>${noticia.texto}</p>
      `;
    })
    .catch(() => {
      document.getElementById('noticia').innerHTML = `<p>Noticia no encontrada.</p>`;
    });
}
