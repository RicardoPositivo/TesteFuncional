document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const captureButton = document.getElementById('captureButton');
    const startIntervalCaptureButton = document.getElementById('startIntervalCapture');
    const stopIntervalCaptureButton = document.getElementById('stopIntervalCapture');
    const cameraSelection = document.getElementById('cameraSelection');
    const filterSelection = document.getElementById('filterSelection');
  
    let stream;
  
    // Função para obter e listar dispositivos de vídeo
    function getVideoDevices() {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          devices.forEach(device => {
            if (device.kind === 'videoinput') {
              const option = document.createElement('option');
              option.text = device.label || `Camera ${cameraSelection.options.length + 1}`;
              option.value = device.deviceId;
              cameraSelection.add(option);
            }
          });
        })
        .catch(err => {
          console.error('Erro ao listar dispositivos de vídeo: ', err);
        });
    }
  
    // Função para capturar foto
    function capturePhoto() {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      // Você pode fazer algo com a imagem capturada, como exibi-la em uma tag <img> ou enviá-la para o servidor.
    }
  
    // Função para iniciar a captura automática de fotos em intervalos
    let intervalId;
    function startIntervalCapture() {
      intervalId = setInterval(capturePhoto, 5000); // Captura uma foto a cada 5 segundos
    }
  
    // Função para parar a captura automática de fotos em intervalos
    function stopIntervalCapture() {
      clearInterval(intervalId);
    }
  
    // Função para iniciar ou parar a captura de vídeo
    function toggleVideo() {
      if (!stream) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(mediaStream) {
            stream = mediaStream;
            video.srcObject = mediaStream;
            captureButton.textContent = 'Parar';
          })
          .catch(function(err) {
            console.error('Erro ao acessar a câmera: ', err);
          });
      } else {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
        captureButton.textContent = 'Iniciar';
      }
    }
  
    // Evento para iniciar ou parar a captura de vídeo ao clicar no botão
    captureButton.addEventListener('click', toggleVideo);
  
    // Evento para capturar foto ao clicar no botão
    captureButton.addEventListener('click', capturePhoto);
  
    // Eventos para iniciar e parar a captura automática de fotos em intervalos
    // startIntervalCaptureButton.addEventListener('click', startIntervalCapture);
    // stopIntervalCaptureButton.addEventListener('click', stopIntervalCapture);
  
    // Listar dispositivos de vídeo ao carregar a página
    getVideoDevices();
  });
  