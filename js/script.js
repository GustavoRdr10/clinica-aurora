

let linkWhatsapp = "";

function enviarWhatsApp() {

    document.getElementById("modalSucesso").style.display = "none";

    window.open(linkWhatsapp, "_blank");

    document.getElementById("formVisita").reset();
}

function abrirModal(src) {

    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");

    modal.style.display = "flex";
    modalImg.src = src;

    // pausa o carrossel
    carrosselAtivo = false;
}

function fecharModal() {

    document.getElementById("modal").style.display = "none";

    // volta o carrossel
    carrosselAtivo = true;
}
window.onclick = function (event) {
    const modal = document.getElementById("modal");

    if (event.target === modal) {
        fecharModal();
    }
}

function mostrarSecao(id) {

    document.querySelectorAll("section").forEach(secao => {
        secao.style.display = "none";
    });

    const secaoAtiva = document.getElementById(id);

    if (secaoAtiva) {
        secaoAtiva.style.display = "block";
        window.location.hash = id;

        //SEMPRE VOLTA PRO TOPO (instantâneo, mais confiável)
        window.scrollTo(0, 0);
    }

    //FECHA MENU AUTOMATICAMENTE AO CLICAR
    const menu = document.getElementById("menu");
    const title = document.querySelector(".menu-title");

    if (menu.classList.contains("ativo")) {
        menu.classList.remove("ativo");
        title.classList.remove("oculto");
    }
}

function carregarRota() {
    const rota = window.location.hash.replace("#", "");

    if (rota && document.getElementById(rota)) {
        mostrarSecao(rota);
    } else {
        mostrarSecao("inicio");
    }
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    const title = document.querySelector(".menu-title");

    menu.classList.toggle("ativo");

    if (menu.classList.contains("ativo")) {
        title.classList.add("oculto");
    } else {
        title.classList.remove("oculto");
    }
}

function abrirDate(el) {
    el.showPicker();
}

let slideIndex = 1;
let carrosselAtivo = true;

mostrarSlide(slideIndex);

function mudarSlide(n) {

    if (!carrosselAtivo) return;

    mostrarSlide(slideIndex += n);
}

function mostrarSlide(n) {
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

setInterval(() => mudarSlide(1), 4000);

window.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formVisita");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const tipo = document.getElementById("tipo").value;
        const data = document.getElementById("data").value;
        const mensagem = document.getElementById("mensagem").value;

        const texto = `*Nova solicitação de visita*

Nome: ${nome}
Tipo: ${tipo}
Data: ${data}

Mensagem:
${mensagem}

⏳ Aguarde em instantes, a equipe entrará em contato com você.`;

        const numeroClinica = "5551994628077";

        linkWhatsapp = `https://wa.me/${numeroClinica}?text=${encodeURIComponent(texto)}`;

        document.getElementById("modalSucesso").style.display = "flex";
    });

});
