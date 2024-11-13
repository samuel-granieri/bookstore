
//Leitura arquivo json
const dataPath = './api/livros_infantis.json';

//Função para carregar dados json
const loadData = async() => {
  try{
    const response  = await fetch(dataPath);

  if (!response.ok) {
    throw new Error('Erro ao carregar o JSON');
  }
  
  const result = await response.json();

  return result
  

  } catch (error) {
    console.error(error);
  }
}

//Função para renderizar os cards com os dados vindos do json

const displayData = async (filtro) => {
  const data = await loadData();
  let lista = []

  //Filtrar lista se houver parametro de filtro
  if(filtro){
    lista = data.livros.filter(item=>item.titulo.toLowerCase().includes(filtro.toLowerCase()))
  }
  else{
    lista = data.livros
  }
 
  //Retornar quantidade resultados
  const result =  document.getElementById('resultados_encontrados')
  if(result){
    result.innerText = `Resultados encontrados: ${lista.length ? lista.length + ' registros' : 0 + ' registros'} `
  }
  

  const card = document.getElementById('cards-catalogo')
  card.innerHTML = ''

  //retornar card preenchido
  
  lista.forEach(element => {
    card.innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img src="${element.imagem_capa}" class="card-img-top" alt="Livro 1">
          <div class="card-body">
            <h5 class="card-title">${element.titulo}</h5>
            <p class="card-text">${element.sinopse}</p>
            <button class="btn btn-primary navbar-pastel navbar-brand-color border-0" type="button">
              <a href="${element.link}" class="navbar-brand-color text-decoration-none outline: none; box-shadow: none" target="_blank">Mais detalhes</a>
            </button>
          </div>
        </div>
      </div>
    `
  });
  

  

};

//Renderização inicial
displayData()


//Leitura botao e input
const btn_pesquisa = document.getElementById('btn_pesquisa')
const txt_pesquisa = document.getElementById('txt_pesquisa')

//Função para botao de pesquisa
const handleButtonPesquisa = async()=>{

  btn_pesquisa.addEventListener('click', (e)=>{
    e.preventDefault()
    displayData(txt_pesquisa.value)
  })

}

handleButtonPesquisa()

//Função para limpar o campo de pesquisa
const btn_limpar = document.getElementById('btn_limpar')
const handleButtonLimpar = async()=>{

  btn_limpar.addEventListener('click', (e)=>{
    e.preventDefault()
    txt_pesquisa.value  = ''

    displayData()
  })


}

handleButtonLimpar()


// Atualizar data
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const today = new Date().toLocaleDateString('pt-BR', options);
document.getElementById('data').innerHTML = `${today}<br>&copy; Alexia's Bookstore.<br>Todos os direitos reservados.`;


