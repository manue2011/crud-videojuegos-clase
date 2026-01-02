const API_URL = '/api/videojuegos';
const gamesList = document.getElementById('gamesList');
const gameForm = document.getElementById('gameForm');
const btnSave = document.getElementById('btnSave');
const btnCancel = document.getElementById('btnCancel');

let isEditing = false; // Bandera para saber si estamos creando o editando

// 1. Función para obtener y mostrar juegos (READ)
async function fetchGames() {
    const res = await fetch(API_URL);
    const games = await res.json();
    renderGames(games);
}

// 2. Función para pintar las tarjetas en el HTML
function renderGames(games) {
    gamesList.innerHTML = '';
    games.forEach(game => {
        const card = `
            <div class="col-md-6 mb-3">
                <div class="card game-card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${game.titulo} <span class="badge bg-secondary">${game.anio}</span></h5>
                        <h6 class="card-subtitle mb-2 text-muted">${game.consola} - ${game.genero}</h6>
                        <p class="card-text">Estado: <strong>${game.estado}</strong></p>
                        
                        <button class="btn btn-sm btn-warning" onclick="fillForm(${game.id}, '${game.titulo}', '${game.consola}', ${game.anio}, '${game.genero}', '${game.estado}')">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteGame(${game.id})">Borrar</button>
                    </div>
                </div>
            </div>
        `;
        gamesList.innerHTML += card;
    });
}

// 3. Manejar el envío del formulario (CREATE y UPDATE)
gameForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('gameId').value;
    const titulo = document.getElementById('titulo').value;
    const consola = document.getElementById('consola').value;
    const anio = document.getElementById('anio').value;
    const genero = document.getElementById('genero').value;
    const estado = document.getElementById('estado').value;

    const gameData = { titulo, consola, anio, genero, estado };

    try {
        if (isEditing) {
            // Modo Edición (PUT)
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gameData)
            });
            isEditing = false;
            btnSave.textContent = 'Guardar Juego';
            btnCancel.classList.add('d-none');
        } else {
            // Modo Creación (POST)
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gameData)
            });
        }
        
        gameForm.reset();
        fetchGames(); // Recargar la lista
    } catch (error) {
        console.error('Error:', error);
    }
});

// 4. Función para borrar (DELETE)
async function deleteGame(id) {
    if(confirm('¿Seguro que quieres borrar este juego?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchGames();
    }
}

// 5. Función para rellenar formulario al editar
window.fillForm = (id, titulo, consola, anio, genero, estado) => {
    document.getElementById('gameId').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('consola').value = consola;
    document.getElementById('anio').value = anio;
    document.getElementById('genero').value = genero;
    document.getElementById('estado').value = estado;

    isEditing = true;
    btnSave.textContent = 'Actualizar Juego';
    btnCancel.classList.remove('d-none');
};

function resetForm() {
    isEditing = false;
    gameForm.reset();
    btnSave.textContent = 'Guardar Juego';
    btnCancel.classList.add('d-none');
}

// Cargar juegos al iniciar
fetchGames();