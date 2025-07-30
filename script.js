const ramos = [
  { id: 1, nombre: "Introducción a la salud comunitaria", semestre: 1, prereqs: [] },
  { id: 2, nombre: "Biología Celular", semestre: 1, prereqs: [] },
  { id: 3, nombre: "Introducción a la matemática aplicada", semestre: 1, prereqs: [] },
  { id: 4, nombre: "Introducción a la matronería", semestre: 1, prereqs: [] },
  { id: 5, nombre: "Morfología y función I", semestre: 1, prereqs: [] },
  { id: 6, nombre: "Salud de la mujer, sexualidad y género", semestre: 1, prereqs: [] },

  { id: 7, nombre: "Comunicación en salud comunitaria", semestre: 2, prereqs: [] },
  { id: 8, nombre: "Química", semestre: 2, prereqs: [] },
  { id: 9, nombre: "Inglés I", semestre: 2, prereqs: [] },
  { id: 10, nombre: "Embriología Humana", semestre: 2, prereqs: [2] },
  { id: 11, nombre: "Morfología y función en matronería", semestre: 2, prereqs: [5] },
  { id: 12, nombre: "Fundamentos de enfermería en ginecoobstetricia", semestre: 2, prereqs: [2,5] },

  { id: 13, nombre: "Ética en salud comunitaria", semestre: 3, prereqs: [7] },
  { id: 14, nombre: "Bioquímica", semestre: 3, prereqs: [8] },
  { id: 15, nombre: "Inglés II", semestre: 3, prereqs: [9] },
  { id: 16, nombre: "Bioestadística", semestre: 3, prereqs: [3] },
  { id: 17, nombre: "Fisiología general", semestre: 3, prereqs: [4,5] },
  { id: 18, nombre: "Fundamentos en enfermería medicoquirúrgica", semestre: 3, prereqs: [5,11,12] },

  { id: 19, nombre: "Promoción de salud en comunidad", semestre: 4, prereqs: [1,13] },
  { id: 20, nombre: "Microbiología y parasitología en matronería", semestre: 4, prereqs: [2,8,14] },
  { id: 21, nombre: "Obstetricia fisiológica", semestre: 4, prereqs: [11,17,18] },
  { id: 22, nombre: "Ginecología fisiológica", semestre: 4, prereqs: [11,17,18] },
  { id: 23, nombre: "Fisiopatología", semestre: 4, prereqs: [17] },
  { id: 24, nombre: "Farmacología general", semestre: 4, prereqs: [14,17] },

  { id: 25, nombre: "Neonatología Fisiología", semestre: 5, prereqs: [21,23] },
  { id: 26, nombre: "Farmacología ginecoobstetrica", semestre: 5, prereqs: [24] },
  { id: 27, nombre: "Obstetricia patológica", semestre: 5, prereqs: [21,23] },
  { id: 28, nombre: "Ginecología patológica", semestre: 5, prereqs: [21,23] },
  { id: 29, nombre: "Salud pública y salud comunitaria", semestre: 5, prereqs: [19] },
  { id: 30, nombre: "Práctica integrada I", semestre: 5, prereqs: [21,22,23] },

  { id: 31, nombre: "Manejo clínico en ginecoobstétrica", semestre: 6, prereqs: [23,27,28] },
  { id: 32, nombre: "Recién nacido patológico", semestre: 6, prereqs: [21,25,27] },
  { id: 33, nombre: "Ginecología infanto juvenil", semestre: 6, prereqs: [26,28] },
  { id: 34, nombre: "Práctica integrada II", semestre: 6, prereqs: [25,26,27,28,29,30] },

  { id: 35, nombre: "Metodología de la investigación", semestre: 7, prereqs: [31,32,33,34] },
  { id: 36, nombre: "Climaterio y oncología en ginecología", semestre: 7, prereqs: [26,28,34] },
  { id: 37, nombre: "Cuidados del recién nacido patológico", semestre: 7, prereqs: [32,34] },
  { id: 38, nombre: "Educación para la salud", semestre: 7, prereqs: [19,29] },
  { id: 39, nombre: "Gestión y emprendimiento en salud", semestre: 7, prereqs: [34] },
  { id: 40, nombre: "Práctica integrada III", semestre: 7, prereqs: [31,32,33,34] },

  { id: 41, nombre: "Proyectos en salud comunitaria", semestre: 8, prereqs: [7,29] },
  { id: 42, nombre: "Seminario de grado", semestre: 8, prereqs: [35,36,37,38,39,40] },
  { id: 43, nombre: "Infertilidad humana", semestre: 8, prereqs: [28,36] },
  { id: 44, nombre: "Empleabilidad, mercado laboral y emprendimiento en matronería", semestre: 8, prereqs: [] },
  { id: 45, nombre: "Salud familiar", semestre: 8, prereqs: [29] },
  { id: 46, nombre: "Práctica integrada IV", semestre: 8, prereqs: [35,36,37,38,39,40] },

  { id: 47, nombre: "Implementación de proyectos en salud comunitaria", semestre: 9, prereqs: [41] },
  { id: 48, nombre: "Internado profesional I", semestre: 9, prereqs: [41,42,43,44,45,46] },

  { id: 49, nombre: "Preparación de examen de título", semestre: 10, prereqs: [47,48] },
  { id: 50, nombre: "Internado profesional II", semestre: 10, prereqs: [47,48] }
];

const mallaContainer = document.getElementById("malla");
let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

function crearMalla() {
  const maxSemestre = Math.max(...ramos.map(r => r.semestre));

  for (let s = 1; s <= maxSemestre; s++) {
    const semestreBox = document.createElement("div");
    semestreBox.classList.add("semestre");

    const titulo = document.createElement("h3");
    titulo.textContent = `Semestre ${s}`;
    semestreBox.appendChild(titulo);

    const delSemestre = ramos.filter(r => r.semestre === s);

    delSemestre.forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("ramo");
      div.dataset.id = ramo.id;
      div.textContent = ramo.nombre;

      if (aprobados.includes(ramo.id)) {
        div.classList.add("aprobado");
      } else if (!puedeAprobar(ramo.id)) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => marcarRamo(ramo.id));
      semestreBox.appendChild(div);
    });

    mallaContainer.appendChild(semestreBox);
  }
}

function puedeAprobar(id) {
  const ramo = ramos.find(r => r.id === id);
  return ramo.prereqs.every(p => aprobados.includes(p));
}

function marcarRamo(id) {
  const ramo = ramos.find(r => r.id === id);

  if (aprobados.includes(id)) {
    aprobados = aprobados.filter(x => x !== id);
  } else {
    if (!puedeAprobar(id)) {
      const faltantes = ramo.prereqs
        .filter(p => !aprobados.includes(p))
        .map(fid => ramos.find(r => r.id === fid).nombre)
        .join(", ");
      alert(`No puedes aprobar "${ramo.nombre}" aún. Faltan: ${faltantes}`);
      return;
    }
    aprobados.push(id);
  }

  localStorage.setItem("aprobados", JSON.stringify(aprobados));
  mallaContainer.innerHTML = "";
  crearMalla();
}

crearMalla();

