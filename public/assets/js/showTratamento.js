var servico = window.document.querySelector('.img-servico');

var img = window.document.createElement('img');
img.setAttribute('id','foto-servico');
img.setAttribute('src', '../assets/img/Serviços_Shape_consulta_corpo.jpg');
servico.appendChild(img);

var buttonitem = window.document.querySelectorAll('.item-menu');
var selectMenu = window.document.getElementById('menu-select');

// Função para atualizar a imagem
function updateImage(src) {
    img.setAttribute('src', src);
}

// Função para selecionar item do botão
function select() {
    buttonitem.forEach((item) =>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo');

    // Atualiza a imagem com base no data attribute do botão
    var imgSrc = this.getAttribute('data-img');
    updateImage(imgSrc);
}

// Adiciona o evento de clique para cada botão
buttonitem.forEach((item) =>
    item.addEventListener('click', select)
);

// Adiciona o evento de mudança no select
selectMenu.addEventListener('change', function () {
    var selectedValue = this.value;
    updateImage(selectedValue);
});
