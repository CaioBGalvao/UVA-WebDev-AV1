document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var emailInput = document.getElementById("email").value;
    // Regex simples para validação de e-mail
    var regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!regex.test(emailInput)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    // Simula o envio do formulário exibindo a mensagem de sucesso
    var messageDiv = document.getElementById("message");
    messageDiv.style.display = "block";

    // Opcional: esconde a mensagem após 3 segundos
    setTimeout(function () {
        messageDiv.style.display = "none";
    }, 3000);
});