const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

// Quando o usuário interage com o botão, ele captura o atributo do input do tipo 'file' 
// que está escondido na interface.
uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

// Essa função lê o conteúdo de um arquivo e retorna uma promessa que, ao ser resolvida, entrega
// um objeto contendo a URL e o nome do arquivo. Se for rejeitada, passa uma mensagem personalizada
// indicando o nome do arquivo que causou o erro.
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        }
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo}`);
        }
        leitor.readAsDataURL(arquivo);
    })
}

// ao selecionar o arquivo, o input detecta essa mudança e aguarda a resolução da 
// função que lê o conteudo do arquivo, se a leitura tiver dado certo, ele altera o conteudo da imagem
// e do nome do arquivo na interface da aplicação. Caso contrário, imprime uma mensagem de erro
// de leitura no console.
const imagemPrincipal = document.querySelector('.main-imagem');
const nomeDaImagem = document.querySelector('.container-imagem-nome p');

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error('Erro na leitura do arquivo');
        }
    }
})

// função que insere as tags na aplicação.

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags');

listaTags.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('remove-tag')) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

const tagsDisponiveis = ['Front-end', 'Back-end', 'Full-stack', 'HTML', 'CSS', 'JavaScript', 'Data Science', 'Programação'];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    })
}

inputTags.addEventListener('keypress', async (evento) => {
    if (evento.key === 'Enter') { // define a tecla a ser detectada quando ocorrer o evento.
        evento.preventDefault(); // previne o comportamento padrão da tecla 'enter'.
        const tagTexto = inputTags.value.trim(); // trim() é usado para eliminar os espaços antes e depois das palavras.
        if (tagTexto !== '') {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto); // verifica se a tag existe dentro da lista ou não.
                if (tagExiste) {
                    const tagNova = document.createElement('li');
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = '';
                } else {
                    alert('Tag não foi encontrada.');
                }
            } catch (error) {
                console.error('Erro ao verificar a existência da tag');
                alert('Erro ao verificar a existência da tag. Verifique o console.');
            }
        }
    }
})

const botaoPublicar = document.querySelector('.botao-publicar');

// Simulação de entrega de formulário para uma API.

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve('Projeto publicado com sucesso!');
            } else {
                reject('Erro ao publicar o projeto.');
            }

        }, 2000)
    })
}

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById('nome').value;
    const descricaoDoProjeto = document.getElementById('descricao').value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll('P')).map(tag => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert('Deu tudo certo!');
    } catch (error) {
        console.log('Deu errado: ', error);
        alert('Deu tudo errado! =(');
    }
})