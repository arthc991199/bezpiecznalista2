// Zmienna do przechowywania wybranego poziomu szczegółowości
let selectedLevel = null;
// Zmienna do przechowywania wybranego obszaru
let selectedArea = null;

// Obsługa kliknięć na przyciskach poziomu szczegółowości
document.querySelectorAll('.level-btn').forEach(button => {
    button.addEventListener('click', function() {
        selectedLevel = this.getAttribute('data-level');

        // Debug: logowanie do konsoli, aby sprawdzić, czy kliknięcie jest rejestrowane
        console.log(`Wybrany poziom: ${selectedLevel}`);

        clearActiveButtons('level-btn');
        this.classList.add('active');

        // Debug: sprawdzenie, czy aktywny przycisk ma odpowiednią klasę
        console.log(`${this.innerText} przycisk został aktywowany`);
    });
});

// Obsługa kliknięć na przyciskach wyboru obszaru
document.querySelectorAll('.area-btn').forEach(button => {
    button.addEventListener('click', function() {
        selectedArea = this.getAttribute('data-area');

        // Debug: logowanie do konsoli, aby sprawdzić, czy kliknięcie jest rejestrowane
        console.log(`Wybrany obszar: ${selectedArea}`);

        clearActiveButtons('area-btn');
        this.classList.add('active');

        // Debug: sprawdzenie, czy aktywny przycisk ma odpowiednią klasę
        console.log(`${this.innerText} przycisk został aktywowany`);
    });
});

// Funkcja do usuwania aktywnej klasy ze wszystkich przycisków
function clearActiveButtons(buttonClass) {
    document.querySelectorAll(`.${buttonClass}`).forEach(btn => {
        btn.classList.remove('active');
        // Debug: logowanie, aby sprawdzić, czy klasy zostały usunięte
        console.log(`Usunięto aktywną klasę z: ${btn.innerText}`);
    });
}

// Generowanie checklisty po kliknięciu przycisku "Generuj Checklistę"
document.getElementById('generate-checklist').addEventListener('click', function() {
    if (!selectedArea || !selectedLevel) {
        alert("Proszę wybrać obszar i poziom szczegółowości.");
        // Debug: komunikat do konsoli, jeśli obszar lub poziom nie został wybrany
        console.log("Brak wybranego obszaru lub poziomu szczegółowości");
    } else {
        console.log(`Generowanie checklisty dla obszaru: ${selectedArea}, poziom: ${selectedLevel}`);
        generateChecklist(selectedArea, selectedLevel);
    }
});

// Funkcja do generowania checklisty



// Funkcja do generowania checklisty
function generateChecklist(area, level) {
    let checklistItems;

    // Pobranie odpowiednich danych w zależności od wybranego obszaru
    if (area === 'Zarządzanie hasłami') {
        checklistItems = checklistDataPasswordManagement["Zarządzanie hasłami"][level];
    } else if (area === 'Ochrona przed oszustwami e-mail') {
        checklistItems = checklistDataPhishingProtection["Ochrona przed oszustwami e-mail"][level];
    } else if (area === 'Bezpieczeństwo w mediach społecznościowych') {
        checklistItems = checklistDataSocialMediaSecurity["Bezpieczeństwo w mediach społecznościowych"][level];
    } else {
        
        checklistItems = [];
        console.log("Nieznany obszar: " + area);
    }

    const checklistContainer = document.getElementById('checklist-container');
    checklistContainer.innerHTML = ''; // Wyczyść poprzednią checklistę

    // Dodanie pozycji checklisty do HTML
    checklistItems.forEach(item => {
        const checklistItem = document.createElement('div');
        checklistItem.classList.add('checklist-item');

        const title = document.createElement('h3');
        title.innerText = item.title;
        checklistItem.appendChild(title);

        const description = document.createElement('p');
        description.innerHTML = item.description; // Użycie innerHTML do obsługi linków
        checklistItem.appendChild(description);

        checklistContainer.appendChild(checklistItem);
    });

    document.getElementById('checklist-section').classList.remove('hidden');
}

// Debug: logowanie, że plik script.js został załadowany poprawnie
console.log("Plik script.js załadowany poprawnie");
