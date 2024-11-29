let currentSongIndex = 0; // Índice de la canción actual
const songs = [
  "audio/cancion2.mp3",
  "audio/cancion3.mp3",
  "audio/cancion4.mp3",
  "audio/cancion5.mp3",
  "audio/cancion6.mp3"
];
const audioElement = document.getElementById("fnd");

// Función para reproducir la primera canción al hacer clic en el fondo
function playAudio() {
  if (audioElement.paused) {
    audioElement.volume = 0.4;
    audioElement.play();
  }
}

// Función para cambiar de canción con el botón
function switchSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audioElement.src = songs[currentSongIndex];
  audioElement.play();
}

var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        autoplay:true,
        loop:true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      });

// Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");

//-> Función principal que habilita todas las notas
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%"
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%"
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%"
          });
        }
      }
    });
  }
}

//-> Función que configura el papel superior del sobre.
function set_up_paper() {
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready
  });
}

//-> Función que inicia la transición del papel superior del sobre.
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });
  document.querySelector(".js-up-paper").removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

// Inicia la transición cuando se hace clic en el papel superior
document.querySelector(".js-up-paper").addEventListener("click", envelop_transition);

// Definición de los corazones
var Heart = function(x, y) {
  this.x = x || Math.random() * ww;
  this.y = y || Math.random() * wh;
  this.size = Math.random() * 2 + 1;
  this.shadowBlur = Math.random() * 10;
  this.speedX = (Math.random() + 0.2 - 0.6) * 8;
  this.speedY = (Math.random() + 0.2 - 0.6) * 8;
  this.speedSize = Math.random() * 0.05 + 0.01;
  this.opacity = 1;
  this.vertices = [];
  
  var precision = 20; // Aumentamos la precisión para mayor suavidad en la forma
  
  for (var i = 0; i < precision; i++) {
    var step = (i / precision) * (Math.PI * 2);
    
    // Fórmula ajustada para una forma más redonda
    var vector = {
      x: 16 * Math.pow(Math.sin(step), 3), // Manteniendo la base del corazón
      y: -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step)) 
    };
    this.vertices.push(vector);
  }
};

// Método para dibujar los corazones
Heart.prototype.draw = function() {
  this.size -= this.speedSize;
  this.x += this.speedX;
  this.y += this.speedY;
  
  ctx.save();
  ctx.translate(-1000, this.y); // Ajuste en la posición en el eje Y
  ctx.scale(this.size, this.size); // Ajuste del tamaño del corazón
  ctx.beginPath();
  
  for (var i = 0; i < this.vertices.length; i++) {
    var vector = this.vertices[i];
    ctx.lineTo(vector.x, vector.y);
  }
  
  ctx.globalAlpha = this.size;
  ctx.shadowBlur = Math.round((3 - this.size) * 10);
  ctx.shadowColor = "hsla(0, 100%, 60%, 0.5)";
  ctx.shadowOffsetX = this.x + 1000;
  ctx.globalCompositeOperation = "screen"; // Controla la fusión de colores para crear efectos
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

// Variables para el lienzo
var canvas = document.getElementById("heartCanvas");
var ctx = canvas.getContext("2d");
var hearts = [];
var ww, wh;

// Función para ajustar el tamaño del lienzo
function onResize() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
}

// Función que inicia el renderizado de los corazones
function render() {
  requestAnimationFrame(render);
  
  hearts.push(new Heart());
  ctx.clearRect(0, 0, ww, wh);
  
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].draw();
    if (hearts[i].size <= 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
}

// Ajustar tamaño del lienzo al redimensionar la ventana
onResize();
window.addEventListener("resize", onResize);

// Iniciar la animación
requestAnimationFrame(render);