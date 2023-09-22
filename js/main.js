const form = document.getElementById("novoItem");
const list = document.getElementById("lista");
const dataList = JSON.parse(localStorage.getItem('itens')) || [];

dataList.forEach((element) => {
    createElement(element);
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const exist = dataList.find(element => element.nome === nome.value);

    const data = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (exist) {
        data.id = exist.id;

        dataList[dataList.findIndex(element => element.id === exist.id)] = data;

        updateElement(data);

    } else {
        data.id = dataList[dataList.length - 1] ? (dataList[dataList.length - 1]).id + 1 : 0;
        dataList.push(data);

        createElement(data);
    }

    localStorage.setItem('itens', JSON.stringify(dataList));

    nome.value = '';
    quantidade.value = '';
})

function createElement(item) {
    const newItem = document.createElement('li');
    newItem.classList.add('item');

    const itemQuantity = document.createElement('strong');
    itemQuantity.innerHTML = item.quantidade;
    itemQuantity.dataset.id = item.id;
    newItem.appendChild(itemQuantity);

    newItem.innerHTML += item.nome;

    newItem.appendChild(deleteButton(item.id));

    list.appendChild(newItem);
}

function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function deleteButton(item) {
    const button = document.createElement('button');
    button.innerText = 'X';

    button.addEventListener('click', function() {
        deleteElement(this.parentNode, item);
    })

    return button;
}

function deleteElement(tag, id) {
    tag.remove();

    dataList.splice(dataList.findIndex(element => element.id === id), 1);

    localStorage.setItem('itens', JSON.stringify(dataList));
}
