fetch("data/juegos.json")
  .then(r => r.json())
  .then(juegos => {
    const cont = document.getElementById("games");
    const search = document.getElementById("searchInput");
    const filtros = document.querySelectorAll("#filters input");

    function render(lista) {
      cont.innerHTML = "";
      lista.forEach(j => {
        cont.innerHTML += `
          <div class="game-card">
            <img src="${j.image}">
            <h3>${j.title}</h3>
            <div class="genres">
              ${j.genres.map(g => `<span class="genre">${g}</span>`).join("")}
            </div>
            <button class="button-download"
              onclick="location.href='${j.cutie}'">
              Descargar
            </button>
          </div>
        `;
      });
    }

    function filtrar() {
      const texto = search.value.toLowerCase();
      const activos = [...filtros].filter(f => f.checked).map(f => f.value);

      render(juegos.filter(j =>
        j.title.toLowerCase().includes(texto) &&
        (activos.length === 0 || activos.some(g => j.genres.includes(g)))
      ));
    }

    search.oninput = filtrar;
    filtros.forEach(f => f.onchange = filtrar);
    render(juegos);
  });
