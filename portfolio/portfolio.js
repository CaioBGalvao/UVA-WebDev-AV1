document.addEventListener('DOMContentLoaded', function () {
    const githubUsername = 'CaioBGalvao';
    const reposContainer = document.getElementById('repos-container');

    // Chamada para a API do GitHub
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                // Cria o elemento card
                const card = document.createElement('div');
                card.className = 'card';

                // Cria o título com o nome do repositório
                const cardTitle = document.createElement('h2');
                cardTitle.textContent = repo.name;

                // Cria um parágrafo para a descrição (ou mensagem padrão caso não haja)
                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description ? repo.description : 'Sem descrição';

                // Cria o botão que redireciona para o repositório
                const cardButton = document.createElement('a');
                cardButton.href = repo.html_url;
                cardButton.target = '_blank';
                cardButton.textContent = 'Acessar Repositório';
                cardButton.className = 'card-btn';

                // Anexa os elementos criados ao card
                card.appendChild(cardTitle);
                card.appendChild(repoDescription);
                card.appendChild(cardButton);

                // Insere o card no container de repositórios
                reposContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar repositórios:', error);
            reposContainer.innerHTML = '<p>Não foi possível carregar os repositórios.</p>';
        });
});