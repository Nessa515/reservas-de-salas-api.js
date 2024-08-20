const url = "http://localhost:3000";
const tabela = document.querySelector("#tabela")

let reservas = []

function listarReservas(){
    fetch(`${url}/reservas`)
    // Tranformando o response.body em um JSON
    .then(response => {return response.json() })
    // Colocando o response na variável reservas
    .then(response => reservas = response)
    // Caso haja algum problema um catch será lançado
    .catch(error => console.log(error))
}

function renderizarTabela(){
    tabela.innerHTML = `
        <table class="tabela">
            <tr>
                <th>ID</th>
                <th>Sala</th>
            </tr>
            ${reservas.map(reserva => 
                `   
                <tr>
                    <td>${reserva.id}</td>
                    <td>${reserva.sala}</td>
                </tr>
                `
            ).join('')}
        </table>
    `;
}

listarReservas()