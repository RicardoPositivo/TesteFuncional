function statusACFunction() {
    var statusElement = document.getElementById('status_ac');

    function verificarConexaoAdaptador() {
        if (navigator.getBattery) {
            navigator.getBattery().then(function(battery) {
                if (battery.charging) {
                    statusElement.textContent = "On";
                    statusElement.classList.remove('Off');
                    statusElement.classList.add('On');
                } else {
                    statusElement.textContent = "Off";
                    statusElement.classList.remove('On');
                    statusElement.classList.add('Off');
                }
            });
        } else if (navigator.getBattery || navigator.battery) {
            var battery = navigator.getBattery || navigator.battery;
            if (battery.charging) {
                statusElement.textContent = "On";
                statusElement.classList.remove('Off');
                statusElement.classList.add('On');
            } else {
                statusElement.textContent = "Off";
                statusElement.classList.remove('On');
                statusElement.classList.add('Off');
            }
        } else {
            statusElement.textContent = "Não é possível verificar o status do adaptador de energia neste navegador.";
        }
    }

    verificarConexaoAdaptador(); // Chamada inicial

    // Chama a função verificarConexaoAdaptador a cada 1 segundo
    setInterval(verificarConexaoAdaptador, 1000);
}

