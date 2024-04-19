function processadorFunction() {
    var processorInfo = document.getElementById("processor-info");

    // Verifica se o navegador suporta o objeto "navigator.hardwareConcurrency"
    if ("hardwareConcurrency" in navigator) {
        var processorCount = navigator.hardwareConcurrency;

        // Define a classe para o elemento processorCount
        processorInfo.innerHTML = "Núcleos do processador: <span class='processor-count'>" + processorCount + "</span>";
    } else {
        processorInfo.textContent = "Informações do processador não disponíveis.";
    }
}
