let entries = JSON.parse(localStorage.getItem('calories')) || [];

function updateUI() {
    const list = document.getElementById('entry-list');
    const totalEl = document.getElementById('total-calories');
    list.innerHTML = '';
    let total = 0;

    entries.forEach((entry, index) => {
        total += parseInt(entry.kcal);
        list.innerHTML += `
            <div class="glass p-4 rounded-xl flex justify-between items-center animate-fade-in">
                <div>
                    <div class="font-medium">${entry.name}</div>
                    <div class="text-xs text-slate-500">${entry.time}</div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-blue-400 font-bold">${entry.kcal} kcal</span>
                    <button onclick="deleteEntry(${index})" class="text-red-900 text-xs">Sil</button>
                </div>
            </div>`;
    });

    totalEl.innerText = total;
    localStorage.setItem('calories', JSON.stringify(entries));
}

function addEntry() {
    const name = document.getElementById('food-name').value;
    const kcal = document.getElementById('calorie-amount').value;
    
    if(name && kcal) {
        const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        entries.push({ name, kcal, time });
        document.getElementById('food-name').value = '';
        document.getElementById('calorie-amount').value = '';
        updateUI();
    }
}

function deleteEntry(index) {
    entries.splice(index, 1);
    updateUI();
}

function resetDaily() {
    if(confirm('Tüm veriler silinecek, emin misin?')) {
        entries = [];
        updateUI();
    }
}

updateUI(); // Sayfa açıldığında verileri yükle