const url = "http://localhost:3000";
const tabela = document.querySelector("#tabela")
const btnReservar = document.querySelector("#btnReservar")
const atividade = document.querySelector("#atividade");
const sala = document.querySelector("#sala");
const dataInicial = document.querySelector("#data_inicial");
const dataFinal = document.querySelector("#data_final");

let reservas = []

async function listarReservas(){
    await fetch(`${url}/reservas`)
    // Tranformando o response.body em um JSON
    .then(response => {return response.json() })
    // Colocando o response na variável reservas
    .then(response => reservas = response)
    // Caso haja algum problema um catch será lançado
    .catch(error => console.log(error))
}

async function addReserva(){
    const reserva = {
        atividade:    atividade.value,
        sala:         sala.value,
        dataInicial:  new Date(dataInicial.value),
        dataFinal:    new Date(dataFinal.value)
    }
    await fetch(`${url}/reservas`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reserva)})
        .then(response => console.log(response))
        .catch(error => console.log(error))
}


async function run(){
    await listarReservas()
    renderizarTabela()
}

run()

function renderizarTabela(){
    tabela.innerHTML = `
        <table class="tabela">
            <tr>
                <th>Atividade</th>
                <th>Sala</th>
                <th>Data Inicial</th>
                <th>Data Inicial</th>
            </tr>
            ${reservas.map(reserva => 
                `   
                <tr>
                    <td>${reserva.atividade}</td>
                    <td>${reserva.sala}</td>
                    <td>${reserva.dataInicial}</td>
                    <td>${reserva.dataFinal}</td>
                </tr>
                `
            ).join('')}
        </table>
    `;
}

listarReservas()

// btnReservar.addEventListener('click', (e) => {
//     e.preventDefault()
//     addReserva(
//         id.value,
//         sala.value,
//         dataInicial.value,
//         dataFinal.value
//     )
// });