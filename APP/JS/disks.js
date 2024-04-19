// Função para obter informações do disco rígido
function diskInfo(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
                callback(null, xhr.responseText);
            } else {
                callback('Erro ao executar o arquivo batch: ' + xhr.status);
            }
        }
    };
    xhr.open('GET', 'disk.bat', true);
    xhr.send();
}

// Função para exibir informações na página
function displayInfo(error, info) {
    var diskInfoDiv = document.getElementById('disk-info');
    if (!error) {
        diskInfoDiv.innerHTML = '<pre>' + info + '</pre>';
    } else {
        diskInfoDiv.innerHTML = 'Erro ao executar o arquivo batch.';
    }
}

// Chama a função diskInfo quando a página for carregada
window.onload = function() {
    diskInfo(displayInfo);
};
