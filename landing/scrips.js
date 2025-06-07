// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      })
    }
  })
})

// Back to top button visibility
window.addEventListener("scroll", () => {
  const backToTopButton = document.querySelector(".back-to-top")
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = "flex"
  } else {
    backToTopButton.style.display = "none"
  }
})

// Form submission (for demo purposes)
const forms = document.querySelectorAll("form")
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.")
    form.reset()
  })
})

// Add animation to elements when they come into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  },
  { threshold: 0.1 },
)

document.querySelectorAll(".service-card, .about-img, h2, .lead").forEach((el) => {
  observer.observe(el)
})


///validation 
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contactForm");

  const nombreInput = document.querySelector("#nombre");
  const correoInput = document.querySelector("#correo");
  const telefonoInput = document.querySelector("#telefono");
  const mensajeInput = document.querySelector("#mensaje");

  function mostrarError(input, mensaje) {
    let errorSpan = input.nextElementSibling;
    if (!errorSpan || !errorSpan.classList.contains('error-message')) {
      errorSpan = document.createElement('div');
      errorSpan.classList.add('error-message', 'text-danger', 'small', 'mt-1');
      input.parentNode.appendChild(errorSpan);
    }
    errorSpan.textContent = mensaje;
  }

  function limpiarError(input) {
    let errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-message')) {
      errorSpan.textContent = '';
    }
  }

  // Validaciones en tiempo real
  nombreInput.addEventListener('input', () => {
    const nombreVal = nombreInput.value.trim();
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,100}$/;
    if (!nombreRegex.test(nombreVal)) {
      mostrarError(nombreInput, "Solo letras y espacios (máx 100 caracteres).");
    } else {
      limpiarError(nombreInput);
    }
  });

  correoInput.addEventListener('input', () => {
    const correoVal = correoInput.value.trim();
    if (correoVal.length > 50 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoVal)) {
      mostrarError(correoInput, "Correo inválido o muy largo (máx 50 caracteres).");
    } else {
      limpiarError(correoInput);
    }
  });

  telefonoInput.addEventListener('input', () => {
    const telefonoVal = telefonoInput.value.trim();
    const telefonoRegex = /^[0-9]{0,50}$/; // Permitimos vacío también
    if (!telefonoRegex.test(telefonoVal)) {
      mostrarError(telefonoInput, "Solo números (máx 50 caracteres).");
    } else {
      limpiarError(telefonoInput);
    }
  });

  function mostrarAlerta(mensaje) {
    let alerta = document.createElement('div');
    alerta.className = 'alert alert-success position-fixed bottom-0 end-0 m-3';
    alerta.style.zIndex = 1050;
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 10000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar campos al enviar
    const nombreVal = nombreInput.value.trim();
    const correoVal = correoInput.value.trim();
    const telefonoVal = telefonoInput.value.trim();

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,100}$/;
    if (!nombreRegex.test(nombreVal)) {
      mostrarError(nombreInput, "Solo letras y espacios (máx 100 caracteres).");
      nombreInput.focus();
      return;
    } else {
      limpiarError(nombreInput);
    }

    if (correoVal.length > 50 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoVal)) {
      mostrarError(correoInput, "Correo inválido o muy largo (máx 50 caracteres).");
      correoInput.focus();
      return;
    } else {
      limpiarError(correoInput);
    }

    const telefonoRegex = /^[0-9]{0,50}$/; // Permitimos vacío
    if (!telefonoRegex.test(telefonoVal)) {
      mostrarError(telefonoInput, "Solo números (máx 50 caracteres).");
      telefonoInput.focus();
      return;
    } else {
      limpiarError(telefonoInput);
    }

    if (mensajeInput.value.trim() === "") {
      mostrarAlerta("Por favor, escriba un mensaje antes de enviar.");
      mensajeInput.focus();
      return;
    }

    // Si todo bien, enviar formulario
    mostrarAlerta("¡Gracias por su mensaje! Nos pondremos en contacto pronto.");
    form.reset();
  });
});
