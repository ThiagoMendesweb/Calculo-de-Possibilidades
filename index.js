// Selecionando o corpo das tabelas
const tbody = document.getElementById('resultados');
const tbodyCombinacoes = document.getElementById('todas-combinacoes');

// Função para calcular o fatorial de um número
function fatorial(num) {
    if (num === 0 || num === 1) return 1;
    return num * fatorial(num - 1);
}

// Função para calcular a combinação C(8, n)
function calcularCombinacao(n) {
    return fatorial(8) / (fatorial(n) * fatorial(8 - n));
}

// Função para calcular os dígitos baseando-se no número de setas
function calcularDigitos(n) {
    return n === 0 ? 1 : n; // Se for 0, é 1 dígito, senão é o próprio número de setas
}

// Função para calcular o máximo de combinações (D = C)
function calcularMaximoDC(digitos) {
    let maximo = 0;
    for (let i = 0; i <= digitos; i++) {
        maximo += calcularCombinacao(i);
    }
    return maximo;
}

// Função para preencher a tabela com números de setas, combinações, dígitos e máximo D=C
function preencherTabelaCombinacoes() {
    tbody.innerHTML = ''; // Limpa a tabela antes de preencher
    for (let i = 0; i <= 8; i++) {
        const linha = document.createElement('tr');

        const celulaNumero = document.createElement('td');
        celulaNumero.textContent = i;

        const celulaCombinacao = document.createElement('td');
        const combinacao = calcularCombinacao(i);
        celulaCombinacao.textContent = combinacao;

        const celulaDigitos = document.createElement('td');
        const digitos = calcularDigitos(i);
        celulaDigitos.textContent = digitos;

        const celulaMaximoDC = document.createElement('td');
        const maximoDC = calcularMaximoDC(digitos);
        celulaMaximoDC.textContent = maximoDC;

        linha.appendChild(celulaNumero);
        linha.appendChild(celulaCombinacao);
        linha.appendChild(celulaMaximoDC);
        linha.appendChild(celulaDigitos);

        tbody.appendChild(linha);
    }
}

// Função para preencher a tabela com todas as combinações possíveis
function preencherTodasCombinacoes() {
    tbodyCombinacoes.innerHTML = ''; // Limpa a tabela antes de preencher
    let setas = Array.from({ length: 9 }, (_, i) => i);
    let contador = 1;

    for (let tamanho = 1; tamanho <= 8; tamanho++) {
        let elementos = tamanho === 1 ? setas : setas.slice(1);
        let combinacoes = gerarCombinacoes(elementos, tamanho);

        combinacoes.forEach(comb => {
            let linha = document.createElement('tr');

            let celulaContador = document.createElement('td');
            celulaContador.textContent = contador;

            let celulaCombinacao = document.createElement('td');
            celulaCombinacao.textContent = comb.join(',');

            let celulaDigitos = document.createElement('td');
            celulaDigitos.textContent = comb.length;

            linha.appendChild(celulaContador);
            linha.appendChild(celulaCombinacao);
            linha.appendChild(celulaDigitos);

            tbodyCombinacoes.appendChild(linha);
            contador++;
        });
    }
}

// Função para gerar combinações sem repetição
function gerarCombinacoes(arr, tamanho) {
    if (tamanho === 1) return arr.map(el => [el]);
    let combinacoes = [];
    for (let i = 0; i < arr.length; i++) {
        let elemAtual = arr[i];
        let combinacoesRestantes = gerarCombinacoes(arr.slice(i + 1), tamanho - 1);
        combinacoesRestantes.forEach(comb => {
            combinacoes.push([elemAtual, ...comb]);
        });
    }
    return combinacoes;
}

// Função para alternar a exibição/ocultação da tabela de combinações e seus valores
function toggleTabelaCombinacoesValores() {
    const tabela = document.getElementById('tabela-combinacoes-valores');
    const h3Combinacoes = document.querySelector('h3:nth-of-type(1)');
    const botaoCombinacoes = document.getElementById('btn-combinacoes-valores');

    if (tabela.style.display === 'none' || tabela.style.display === '') {
        tabela.style.display = 'table';
        h3Combinacoes.textContent = "Remover a Tabela de Combinações e Seus Valores";
        botaoCombinacoes.textContent = 'Remover';
        preencherTabelaCombinacoes();
    } else {
        tabela.style.display = 'none';
        h3Combinacoes.textContent = "Exibir a Tabela de Combinações e Seus Valores";
        botaoCombinacoes.textContent = 'Exibir';
    }
}

// Função para alternar a exibição/ocultação da tabela de todas as combinações
function toggleTabelaTodasCombinacoes() {
    const tabela = document.getElementById('tabela-todas-combinacoes');
    const h3TodasCombinacoes = document.querySelector('h3:nth-of-type(2)');
    const botaoTodasCombinacoes = document.getElementById('btn-todas-combinacoes');

    if (tabela.style.display === 'none' || tabela.style.display === '') {
        tabela.style.display = 'table';
        h3TodasCombinacoes.textContent = "Remover a Tabela de Todas as Combinações";
        botaoTodasCombinacoes.textContent = 'Remover';
        preencherTodasCombinacoes();
    } else {
        tabela.style.display = 'none';
        h3TodasCombinacoes.textContent = "Exibir a Tabela de Todas as Combinações";
        botaoTodasCombinacoes.textContent = 'Exibir';
    }
}

// Funções para preencher as tabelas
function preencherTabelaCombinacoes() {
    // Verifica se a tabela já foi preenchida
    if (document.getElementById('resultados').children.length === 0) {
        for (let i = 0; i <= 8; i++) {
            const linha = document.createElement('tr');
            const celulaNumero = document.createElement('td');
            const celulaCombinacao = document.createElement('td');
            const celulaMaximoDC = document.createElement('td');
            const celulaDigitos = document.createElement('td');

            celulaNumero.textContent = i;
            celulaCombinacao.textContent = calcularCombinacao(i);
            celulaMaximoDC.textContent = calcularMaximoDC(calcularDigitos(i));
            celulaDigitos.textContent = calcularDigitos(i);

            linha.appendChild(celulaNumero);
            linha.appendChild(celulaCombinacao);
            linha.appendChild(celulaMaximoDC);
            linha.appendChild(celulaDigitos);
            document.getElementById('resultados').appendChild(linha);
        }
    }
}

function preencherTodasCombinacoes() {
    if (document.getElementById('todas-combinacoes').children.length === 0) {
        let setas = Array.from({ length: 9 }, (_, i) => i);
        let contador = 1;

        for (let tamanho = 1; tamanho <= 8; tamanho++) {
            let elementos = tamanho === 1 ? setas : setas.slice(1);
            let combinacoes = gerarCombinacoes(elementos, tamanho);

            combinacoes.forEach(comb => {
                const linha = document.createElement('tr');
                const celulaContador = document.createElement('td');
                const celulaCombinacao = document.createElement('td');
                const celulaDigitos = document.createElement('td');

                celulaContador.textContent = contador;
                celulaCombinacao.textContent = comb.join(',');
                celulaDigitos.textContent = comb.length;

                linha.appendChild(celulaContador);
                linha.appendChild(celulaCombinacao);
                linha.appendChild(celulaDigitos);
                document.getElementById('todas-combinacoes').appendChild(linha);
                contador++;
            });
        }
    }
}

// Função para gerar combinações
function gerarCombinacoes(arr, tamanho) {
    if (tamanho === 1) return arr.map(el => [el]);
    let combinacoes = [];
    for (let i = 0; i < arr.length; i++) {
        let elemAtual = arr[i];
        let combinacoesRestantes = gerarCombinacoes(arr.slice(i + 1), tamanho - 1);
        combinacoesRestantes.forEach(comb => {
            combinacoes.push([elemAtual, ...comb]);
        });
    }
    return combinacoes;
}

// Adicionando os eventos de clique aos botões
document.getElementById('btn-combinacoes-valores').addEventListener('click', toggleTabelaCombinacoesValores);
document.getElementById('btn-todas-combinacoes').addEventListener('click', toggleTabelaTodasCombinacoes);