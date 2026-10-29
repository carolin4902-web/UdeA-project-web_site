// Galerias: cada <div class="gallery" data-folder="tema" data-captions="a|b|c">
// busca img/tema/1.jpg, 2.jpg, 3.jpg y, si no existen, usa 1.svg, 2.svg, 3.svg.
// Opcional: data-images="foto1.jpg|foto2.jfif" para usar nombres propios.

const visor = document.getElementById("visor");
const visorImg = visor.querySelector("img");
const visorCap = visor.querySelector("figcaption");

document.querySelectorAll(".gallery").forEach((galeria) => {
  const carpeta = galeria.dataset.folder;
  const textos = (galeria.dataset.captions || "").split("|");
  const archivos = (galeria.dataset.images || "").split("|");

  textos.forEach((texto, i) => {
    const rutas = archivos[i]
      ? [`img/${carpeta}/${archivos[i]}`]
      : [`img/${carpeta}/${i + 1}.jpg`, `img/${carpeta}/${i + 1}.svg`];
    let intento = 0;

    const figura = document.createElement("figure");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.setAttribute("aria-label", `Ampliar imagen: ${texto}`);

    const img = new Image();
    img.src = rutas[0];
    img.alt = texto;
    img.loading = "lazy";

    img.addEventListener("error", () => {
      intento++;
      if (intento < rutas.length) {
        img.src = rutas[intento];
        return;
      }
      const vacia = document.createElement("div");
      vacia.className = "vacia";
      vacia.textContent = `Agrega tu imagen en ${rutas[0]}`;
      img.replaceWith(vacia);
      boton.disabled = true;
    });

    const pie = document.createElement("figcaption");
    pie.textContent = texto;

    boton.appendChild(img);
    figura.append(boton, pie);
    galeria.appendChild(figura);

    boton.addEventListener("click", () => {
      visorImg.src = img.src;
      visorImg.alt = texto;
      visorCap.textContent = texto;
      visor.showModal();
    });
  });
});

visor.querySelector(".cerrar").addEventListener("click", () => visor.close());
visor.addEventListener("click", (e) => {
  if (e.target === visor) visor.close();
});