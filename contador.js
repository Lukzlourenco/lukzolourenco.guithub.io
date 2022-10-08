function inicio() {

    // Filtrando o texto para tirar caracteres especiais tipo ponto e virgulas
    let texto = filtrar(document.getElementById("texto").value);

    // Dividindo o texto em um array de palavras
    texto = texto.split(" ");

    // O resultado vai ser em forma de objeto e inserido nesse Array
    var resultado = new Array();

    // For para acessar os índices do texto depois do Split
    for (i=0 ; i<texto.length ; i++) {
       
        // Se texto[i] estiver em branco, pula para o próximo
        if (texto[i] == "") {
            continue;
        }

        // contador para contar as vezes que a palavra se repetiu
        let contador = 0;

        // Outro for, mas, dessa vez para comparar o primeiro texto[i] 
        //                  com todas as palavras existentes em texto
        for (j=0 ; j<texto.length ; j++){
            
            // Se a comparação der == 0, é porque as palavras são iguais
            if ((texto[i].localeCompare(texto[j]) == 0)) {
                contador++;

                // Se o contador passar pela segunda vez na mesma palavra,
                //      a palavra é 'deletada' para evitar que conte outra vez
                if (contador>1) {
                    texto[j] = "";
                }
                
            }

        }

        // Objeto que vai guardar as informações de qual a palavra e a frequência
        var objeto = {
            palavra: texto[i],
            frequencia: contador
        };

        // Jogando o objeto para dentro do Array resultado.
        resultado.push(objeto);

    }

    // Ordenando os objetos do Array resultado
    resultado.sort(ordenar);

    // Selecionando o elemento de id = tabela
    var tabela = document.querySelector("#tabela");

    // Deletando os Elementos tr e td anteriores se existirem
    let deletarAnterior = tabela.getElementsByClassName("trContador");

    let qnt = deletarAnterior.length;

    // Tive que remover do ultimo para o primeiro
    //  Porque aparentemente quando deleta o primeiro,
    //   o índice é reconstruído e muda
    for (i=qnt-1; i >=0  ; i--) {
        tabela.removeChild(deletarAnterior[i]);
    }


    // For para percorrer o array com os resultados
    for (i=0 ; i<resultado.length ; i++) {

        // Criando os elementos tr e td da tabela
        let tdPosicao = document.createElement("td");
        let tdPalavra = document.createElement("td");
        let tdFrequencia = document.createElement("td");
        let tr = document.createElement("tr");

        tr.className = "trContador";

        // Preenchendo os valores de dentro do elemento td
        tdPosicao.innerText = i+1;
        tdPalavra.innerText = resultado[i].palavra;
        tdFrequencia.innerText = resultado [i].frequencia;

        // Adicionando os elementos td dentro do elemento tr
        tr.appendChild(tdPosicao);
        tr.appendChild(tdPalavra);
        tr.appendChild(tdFrequencia);

        // Adicionando o elemento tr dentro da tabela
        tabela.appendChild(tr);

    }
 
}

// Função que vai ser usada para ordenar os objetos do array resultado
function ordenar(a, b) {
    return a.frequencia < b.frequencia ? 1 : a.frequencia > b.frequencia ? -1 : 0;
}

// Filtro para tirar pontuações da frase.
// Para facilitar na contagem da quantidade.
function filtrar(texto) {

    let textoRetorno = "";

    // deixando o texto em minúsculo para facilitar
    texto = texto.toLowerCase();

    // For para percorrer todas as letras da string texto
    for (i=0 ; i<texto.length ; i++) {   
       
        // Só vai para o textoRetorno se...
        //      for letras do alfabeto (ascii 97 a 122), 
        //      letras com acentuação (ascii 192 a 255) e...
        //      barra de espaço (ascii 32).
        if ((texto.charCodeAt(i) >= 97) &&
                    (texto.charCodeAt(i) <= 122) ||
                    (texto.charCodeAt(i) >= 192)  &&
                    (texto.charCodeAt(i) <= 255) ||
                    (texto.charCodeAt(i) == 32)) {
            textoRetorno = textoRetorno.concat(texto[i]);
        }

    }

    return textoRetorno;
}