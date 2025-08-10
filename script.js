
// Algoritmos de encriptado
function encriptar() {
  const texto = document.getElementById("inputtexto").value.toLowerCase();
  const algoritmo = document.getElementById("algoritmo").value;
  let txtcifrado = "";
  if (!texto.trim()) {
    mostrarMensaje("Por favor ingresa un texto.");
    return;
  }
  switch (algoritmo) {
    case "basico":
      txtcifrado = texto.replace(/e/igm,"enter")
        .replace(/o/igm,"ober")
        .replace(/i/igm,"imes")
        .replace(/a/igm,"ai")
        .replace(/u/igm,"ufat");
      break;
    case "reversa":
      txtcifrado = texto.split("").reverse().join("");
      break;
    case "base64":
      txtcifrado = btoa(unescape(encodeURIComponent(texto)));
      break;
    case "cesar":
      txtcifrado = texto.replace(/[a-z]/g, function(c) {
        return String.fromCharCode((c.charCodeAt(0) - 97 + 3) % 26 + 97);
      });
      break;
    case "rot13":
      txtcifrado = texto.replace(/[a-z]/g, function(c) {
        return String.fromCharCode((c.charCodeAt(0) - 97 + 13) % 26 + 97);
      });
      break;
    case "binario":
      txtcifrado = texto.split("").map(function(c) {
        return c.charCodeAt(0).toString(2).padStart(8, '0');
      }).join(" ");
      break;
    default:
      txtcifrado = texto;
  }
  mostrarResultado(txtcifrado);
}

function desencriptar() {
  const texto = document.getElementById("inputtexto").value.toLowerCase();
  const algoritmo = document.getElementById("algoritmo").value;
  let txtdescifrado = "";
  if (!texto.trim()) {
    mostrarMensaje("Por favor ingresa un texto.");
    return;
  }
  switch (algoritmo) {
    case "basico":
      txtdescifrado = texto.replace(/enter/igm,"e")
        .replace(/ober/igm,"o")
        .replace(/imes/igm,"i")
        .replace(/ai/igm,"a")
        .replace(/ufat/igm,"u");
      break;
    case "reversa":
      txtdescifrado = texto.split("").reverse().join("");
      break;
    case "base64":
      try {
        txtdescifrado = decodeURIComponent(escape(atob(texto)));
      } catch (e) {
        mostrarMensaje("Texto Base64 inválido.");
        return;
      }
      break;
    case "cesar":
      txtdescifrado = texto.replace(/[a-z]/g, function(c) {
        return String.fromCharCode((c.charCodeAt(0) - 97 - 3 + 26) % 26 + 97);
      });
      break;
    case "rot13":
      txtdescifrado = texto.replace(/[a-z]/g, function(c) {
        return String.fromCharCode((c.charCodeAt(0) - 97 + 13) % 26 + 97);
      });
      break;
    case "binario":
      txtdescifrado = texto.split(" ").map(function(b) {
        return String.fromCharCode(parseInt(b, 2));
      }).join("");
      break;
    default:
      txtdescifrado = texto;
  }
  mostrarResultado(txtdescifrado);
}

function mostrarResultado(texto) {
  document.getElementById("imgDer").style.display = "none";
  document.getElementById("texto").style.display = "none";
  document.getElementById("texto2").value = texto;
  document.getElementById("copiar").style.display = "inline-flex";
  document.getElementById("descargar").style.display = "inline-flex";
}

function mostrarMensaje(msg) {
  document.getElementById("imgDer").style.display = "block";
  const texto = document.getElementById("texto");
  texto.style.display = "block";
  texto.textContent = msg;
  document.getElementById("texto2").value = "";
  document.getElementById("copiar").style.display = "none";
  document.getElementById("descargar").style.display = "none";
}

function copia() {
  const contenido = document.getElementById("texto2");
  contenido.select();
  contenido.setSelectionRange(0, 99999);
  document.execCommand('copy');
  alert("¡Texto copiado al portapapeles!");
}

function limpiar() {
  document.getElementById("inputtexto").value = "";
  mostrarMensaje("Ningún mensaje fue encontrado");
}

function descargar() {
  const texto = document.getElementById("texto2").value;
  if (!texto) {
    alert("No hay texto para descargar.");
    return;
  }
  const blob = new Blob([texto], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mensaje_encriptado.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Inicializar estado de botones al cargar
window.onload = function() {
  mostrarMensaje("Ningún mensaje fue encontrado");
};
