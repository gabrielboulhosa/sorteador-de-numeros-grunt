document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form-serteador').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir comportamento padrão do formulário
        
        let numeromaximo = document.getElementById('numero-maximo').value;
        numeromaximo = parseInt(numeromaximo);

        let numeroaleatorio = Math.random() * numeromaximo;
        numeroaleatorio = Math.floor(numeroaleatorio + 1);
        alert(numeroaleatorio);

        document.getElementById('resultado-valor').innerHTML = numeroaleatorio;
        document.getElementById('resultado').style.display = 'block';
    });

});
