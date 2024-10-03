var servico = window.document.querySelector('.img-servico');

var img = window.document.createElement('img');

img.setAttribute('id','foto-servico');

img.setAttribute('src', '../assets/img/Serviços_Shape_consulta_corpo.jpg');

servico.appendChild(img);

var buttonitem = window.document.querySelectorAll('.item-menu');

function select(){

    buttonitem.forEach((item)=>
        item.classList.remove('ativo')
    )

    this.classList.add('ativo')

    // Atualiza a imagem com base no data attribute do botão
    var imgSrc = this.getAttribute('data-img');
    img.setAttribute('src', imgSrc);
}

buttonitem.forEach((item)=>
    item.addEventListener('click',select)
)

