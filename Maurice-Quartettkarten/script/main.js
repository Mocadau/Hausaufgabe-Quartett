console.log("HERE WE ARE AGAIN");

// Prüfe, ob die Daten geladen sind
console.log("Daten:", data);

// Zeige direkt alle Karten beim Laden der Seite
$(document).ready(function () {
    renderAllCards(data);
});

// Zeige alle Karten an (für den Button „Alle Karten“)
$('#showAll').click(function () {
    renderAllCards(data);
});

// Zeige Karten nach Gruppen an (für den Button „Nach Gruppen anzeigen“)
$('#groupBy').click(function () {
    const groupedData = groupBy(data, 'groupname_german'); // Nach Gruppen sortieren
    renderGroupedCards(groupedData);
});

// Funktion zum Rendern aller Karten
function renderAllCards(data) {
    $('#wrapper').empty(); // Leere den Wrapper, um neue Karten anzuzeigen

    data.forEach((animal) => {
        const imageName = `${animal.name_german}.png`.replace(/\s+/g, "").replace("ß", "ss");
        const imagePath = `images/${imageName}`;

        let divBox = $(`
            <div class="card-wrapper ${animal.groupname_german}">
                <div class="card-content">
                    <div class="card-number">F${animal.id}</div>
                    <div class="card-title">${animal.name_german}</div>
                    <img src="${imagePath}" alt="${animal.name_german}" class="card-image" />
                    <div class="card-trivia">${animal.trivia_german}</div>
                    <div class="stat-icon"><img src="../images/icons/weight.png" alt="Gewicht" /></div>
                    <div class="stat-value">${animal.max_weight} kg</div>
                    <div class="stat-icon"><img src="../images/icons/length.png" alt="Länge" /></div>
                    <div class="stat-value">${animal.max_length} cm</div>
                    <div class="stat-icon"><img src="../images/icons/age.png" alt="Alter" /></div>
                    <div class="stat-value">${animal.max_age} Jahre</div>
                    <div class="stat-icon"><img src="../images/icons/speed.png" alt="Geschwindigkeit" /></div>
                    <div class="stat-value">${animal.top_speed} km/h</div>
                    <div class="stat-icon"><img src="../images/icons/offspring.png" alt="Nachwuchs" /></div>
                    <div class="stat-value">${animal.litter_size}</div>
                </div>
            </div>
        `);
        $('#wrapper').append(divBox); // Füge die Karte zum Wrapper hinzu
    });
}

// Funktion zum Gruppieren der Daten nach einem bestimmten Attribut
function groupBy(data, key) {
    return data.reduce((result, item) => {
        (result[item[key]] = result[item[key]] || []).push(item);
        return result;
    }, {});
}

// Funktion zum Rendern der Karten nach Gruppen
function renderGroupedCards(groupedData) {
    $('#wrapper').empty(); // Leere den Wrapper, um neue Gruppen anzuzeigen

    for (const group in groupedData) {
        const groupWrapper = $(`
            <div class="group-wrapper ${group}">
                <div class="group-title" style="color: var(--${group});">${group}</div>
                <div class="card-grid"></div> <!-- Grid-Container für Karten -->
            </div>
        `);

        const cardGrid = groupWrapper.find('.card-grid');
        groupedData[group].forEach((animal) => {
            const imageName = `${animal.name_german}.png`.replace(/\s+/g, "").replace("ß", "ss");
            const imagePath = `images/${imageName}`;

            const card = $(`
                <div class="card-wrapper ${group}">
                    <div class="card-content">
                        <div class="card-number">F${animal.id}</div>
                        <div class="card-title">${animal.name_german}</div>
                        <img src="${imagePath}" alt="${animal.name_german}" class="card-image" />
                        <div class="card-trivia">${animal.trivia_german}</div>
                        <div class="stat-icon"><img src="../images/icons/weight.png" alt="Gewicht" /></div>
                        <div class="stat-value">${animal.max_weight} kg</div>
                        <div class="stat-icon"><img src="../images/icons/length.png" alt="Länge" /></div>
                        <div class="stat-value">${animal.max_length} cm</div>
                        <div class="stat-icon"><img src="../images/icons/age.png" alt="Alter" /></div>
                        <div class="stat-value">${animal.max_age} Jahre</div>
                        <div class="stat-icon"><img src="../images/icons/speed.png" alt="Geschwindigkeit" /></div>
                        <div class="stat-value">${animal.top_speed} km/h</div>
                        <div class="stat-icon"><img src="../images/icons/offspring.png" alt="Nachwuchs" /></div>
                        <div class="stat-value">${animal.litter_size}</div>
                    </div>
                </div>
            `);
            cardGrid.append(card); // Karte zur Gruppe hinzufügen
        });

        $('#wrapper').append(groupWrapper); // Füge die Gruppe in den Wrapper ein
    }
}
