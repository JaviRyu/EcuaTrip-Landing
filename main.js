/* Seccion de Caracteristicas */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeUp 0.8s ease forwards";
      } else {
        entry.target.style.animation = "fadeDown 0.5s ease forwards";
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".animar").forEach((el) => {
  observer.observe(el);
});

/* Regiones */
const regiones = [
  {
    nombre: "Costa",
    descripcion:
      "Descubre playas cálidas, gastronomía marina y atardeceres únicos.",
    imagen: "assets/Costa.webp",
  },
  {
    nombre: "Sierra",
    descripcion: "Montañas imponentes, ciudades coloniales y cultura andina.",
    imagen: "assets/Sierra.jpg",
  },
  {
    nombre: "Amazonía",
    descripcion:
      "Selva profunda, biodiversidad única y comunidades ancestrales.",
    imagen: "assets/Oriente.jpg",
  },
  {
    nombre: "Galápagos",
    descripcion: "Islas volcánicas, fauna endémica y paisajes inigualables.",
    imagen: "assets/Galapagos.webp",
  },
];

let indiceActual = 0; // Costa inicia

function cambiarRegion(indice) {
  const region = regiones[indice];
  const regionPrincipal = document.getElementById("regionPrincipal");
  const info = document.getElementById("infoRegion");

  regionPrincipal.style.backgroundImage = `url(${region.imagen})`;
  info.innerHTML = `
      <h3>${region.nombre}</h3>
      <p>${region.descripcion}</p>
    `;

  // Generar miniaturas
  const cartas = document.getElementById("regionCartas");
  cartas.innerHTML = "";

  regiones.forEach((r, i) => {
    if (i !== indice) {
      const carta = document.createElement("div");
      carta.classList.add("carta");
      carta.onclick = () => cambiarRegion(i);

      const img = document.createElement("img");
      img.src = r.imagen;
      img.alt = r.nombre;

      carta.appendChild(img);
      cartas.appendChild(carta);
    }
  });

  indiceActual = indice;
}

window.addEventListener("DOMContentLoaded", () => {
  cambiarRegion(indiceActual);
});

/* Leyendas */
const leyendas = [
    {
      titulo: "La Dama Tapada",
      descripcion: "Una figura misteriosa recorre los caminos solitarios en las noches sin luna...",
      imagen: "assets/DamaNegra.png"
    },
    {
      titulo: "El Padre Almeida",
      descripcion: "Un sacerdote que cada noche escapaba del convento para disfrutar de la vida... hasta que fue sorprendido por una aparición.",
      imagen: "assets/PadreAlmeida.jpg"
    },
    {
      titulo: "La Caja Ronca",
      descripcion: "Dicen que por los ríos suena una caja pesada, arrastrada por ánimas... quien la abre, desaparece.",
      imagen: "assets/CajaRonca.png"
    }
  ];

  let actual = 0;

  function actualizarLeyendas() {
    const izq = (actual - 1 + leyendas.length) % leyendas.length;
    const der = (actual + 1) % leyendas.length;

    document.getElementById("imgPrincipal").src = leyendas[actual].imagen;
    document.getElementById("imgIzquierda").src = leyendas[izq].imagen;
    document.getElementById("imgDerecha").src = leyendas[der].imagen;

    document.getElementById("textoLeyenda").innerHTML = `
      <h3>${leyendas[actual].titulo}</h3>
      <p>${leyendas[actual].descripcion}</p>
    `;
  }

  function cambiarLeyenda(direccion) {
    actual = (actual + direccion + leyendas.length) % leyendas.length;
    actualizarLeyendas();
  }

  actualizarLeyendas();