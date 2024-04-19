document.addEventListener("DOMContentLoaded", function() {
    var statusDiv = document.getElementById("status");
    var progressBar = document.getElementById("progressBar");

    // Função para exibir status na página
    function displayStatus(message) {
        statusDiv.innerHTML += message + "<br>";
    }

    // Função para atualizar a barra de progresso
    function updateProgress(value) {
        progressBar.value = Math.round(value);
        statusDiv.innerText = `Progresso: ${Math.round(value)}%`;
    }

    // Verifica se o carregador AC está conectado
    navigator.getBattery().then(function(battery) {
        if (!battery.charging) {
            displayStatus("Carregador AC não está conectado.");
            return;
        }

        // Gravação do status atual da bateria
        var status_antes;
        navigator.getBattery().then(function(battery) {
            status_antes = battery.level * 100;
        });

        // Leitura do status atual e leitura da carga em 3 minutos
        var timeout1 = setTimeout(function() {
            var status_depois;
            navigator.getBattery().then(function(battery) {
                status_depois = battery.level * 100;
                var diff = status_depois - status_antes;
                if (diff > 3) {
                    displayStatus("Bateria aumentando a carga rápido demais");
                } else {
                    // Pedir para remover o carregador AC
                    displayStatus("Por favor, remova o carregador AC.");
                }
            });
        }, 300000); // 3 minutos

        // Verificar o status de descarga em 3 minutos
        var timeout2 = setTimeout(function() {
            var status_antes;
            navigator.getBattery().then(function(battery) {
                status_antes = battery.level * 100;
            });

            var timeout3 = setTimeout(function() {
                var status_depois;
                navigator.getBattery().then(function(battery) {
                    status_depois = battery.level * 100;
                    var diff = status_antes - status_depois;
                    if (diff > 3) {
                        displayStatus("Bateria descarregando rápido demais");
                    } else {
                        displayStatus("Bateria OK");
                    }
                });
            }, 300000); // 3 minutos
        }, 360000); // 6 minutos

        // Atualizar a barra de progresso a cada segundo
        var timeElapsed = 0;
        var interval = setInterval(function() {
            timeElapsed++;
            var progress = (timeElapsed / 900) * 100; // 900 segundos total (3 + 3 minutos)
            updateProgress(progress);
            if (timeElapsed >= 900) {
                clearInterval(interval);
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                clearTimeout(timeout3);
            }
        }, 1000); // 1 segundo
    });
});
