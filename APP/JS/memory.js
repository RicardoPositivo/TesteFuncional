function memoriaFunction() {
    var memoryInfo = document.getElementById("memory-info");

    if (navigator && navigator.deviceMemory) {
        memoryInfo.innerHTML = "Memória instalada: <span class='memory-info-text'>" + navigator.deviceMemory + " GB</span>";
    } else {
        memoryInfo.textContent = "Informações de memória não disponíveis.";
    }
}
