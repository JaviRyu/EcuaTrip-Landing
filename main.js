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
      descripcion: "La Costa ecuatoriana destaca por sus playas cálidas, gastronomía fresca y vida vibrante. Desde Montañita hasta Esmeraldas, cada rincón ofrece aventura y sabor tropical.",
      imagen: "assets/Costa.webp"
    },
    {
      nombre: "Sierra",
      descripcion: "La Sierra es el corazón andino del Ecuador, con volcanes majestuosos, ciudades coloniales y tradiciones vivas. Quito y Cuenca son joyas culturales rodeadas de naturaleza imponente.",
      imagen: "assets/Sierra.jpg"
    },
    {
      nombre: "Amazonía",
      descripcion: "Selvas exuberantes, biodiversidad única y comunidades indígenas que mantienen vivas sus costumbres. La Amazonía ecuatoriana es un paraíso para los amantes de la naturaleza y la aventura.",
      imagen: "assets/Amazonia.webp"
    },
    {
      nombre: "Galápagos",
      descripcion: "Un archipiélago legendario que alberga especies únicas y paisajes volcánicos impresionantes. Galápagos es un destino para descubrir la vida marina y la naturaleza en su estado más puro.",
      imagen: "assets/Galapagos.webp"
    }
  ];

  const container = document.querySelector('.region-section');
  let currentIndex = 0;
  let previousIndex = null;

  function createSlide(region) {
    const slide = document.createElement('article');
    slide.classList.add('region-slide');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', region.nombre);

    slide.style.backgroundImage = `url('${region.imagen}')`;

    slide.innerHTML = `
      <h2 class="region-title">${region.nombre}</h2>
      <p class="region-desc">${region.descripcion}</p>
    `;
    return slide;
  }

  function showSlide(index) {
    // Si ya hay un slide activo, se anima a salir a la izquierda
    if(previousIndex !== null) {
      const oldSlide = container.children[0];
      oldSlide.classList.remove('active');
      oldSlide.classList.add('exit-left');
      // Después de la transición eliminar
      setTimeout(() => {
        if(container.children.length > 0) container.removeChild(oldSlide);
      }, 1200);
    }

    // Crear nuevo slide y mostrarlo
    const newSlide = createSlide(regiones[index]);
    container.appendChild(newSlide);

    // Forzar repaint para activar transición
    newSlide.offsetHeight;

    newSlide.classList.add('active');

    previousIndex = index;
  }

  // Mostrar el primer slide
  showSlide(currentIndex);

  // Cambiar cada 7 segundos
  setInterval(() => {
    currentIndex++;
    if(currentIndex >= regiones.length) currentIndex = 0;
    showSlide(currentIndex);
  }, 7000);

/* Leyendas */
const leyendas = [
  {
    titulo: "La Dama Tapada",
    descripcion:
      "Una figura misteriosa recorre los caminos solitarios en las noches sin luna...",
    imagen: "assets/DamaNegra.png",
  },
  {
    titulo: "El Padre Almeida",
    descripcion:
      "Un sacerdote que cada noche escapaba del convento para disfrutar de la vida... hasta que fue sorprendido por una aparición.",
    imagen: "assets/PadreAlmeida.jpg",
  },
  {
    titulo: "La Caja Ronca",
    descripcion:
      "Dicen que por los ríos suena una caja pesada, arrastrada por ánimas... quien la abre, desaparece.",
    imagen: "assets/CajaRonca.png",
  },
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

/* Comentarios */
function toggleComments() {
  const form = document.getElementById("commentsForm");
  const arrow = document.getElementById("arrow");

  form.classList.toggle("expanded");
  arrow.classList.toggle("rotated");
}

// Efecto de escritura en el placeholder
const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => {
  textarea.addEventListener("focus", function () {
    this.style.transform = "scale(1.02)";
  });

  textarea.addEventListener("blur", function () {
    this.style.transform = "scale(1)";
  });
});

// Animación al enviar el formulario
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.innerHTML = "✨ Enviando...";
  submitBtn.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
});
