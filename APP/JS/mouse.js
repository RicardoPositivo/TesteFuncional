let clickedSquares = 0;

document.querySelectorAll('.square').forEach(square => {
  square.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
      this.style.backgroundColor = 'green';
      this.querySelector('p').textContent = 'Verde';
      clickedSquares++;
    } else if (event.button === 2) {
      this.style.backgroundColor = 'yellow';
      this.querySelector('p').textContent = 'Amarelo';
      clickedSquares++;
    }

    if (clickedSquares === 4) {
      setTimeout(function() {
        if (document.querySelectorAll('.square p').every(p => p.textContent === 'Amarelo')) {
          document.getElementById('container_mouse').textContent = 'Mouse OK';
        } else {
          document.getElementById('container_mouse').textContent = 'Teste não concluído. Tente novamente.';
        }
      }, 200);
    }
  });
});
