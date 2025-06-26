const usernameInput = document.querySelector('.user');
const form = document.querySelector('#my-form');
const display = document.querySelector('.display');

form.addEventListener('submit', onSubmit);

function onSubmit(e){
        e.preventDefault();

    const username = usernameInput.value.trim();
    if(!username){
        alert("Please enter a username");
        return;
    }


    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        if(!response.ok){
            throw new Error("User not found");
        }
        return response.json();
    })
    .then(data =>{
        display.innerHTML = `

        <div class="image-wrapper">
            <a href="${data.html_url}" target="_blank">
                <img src="${data.avatar_url}" alt="Avatar" width="100" />
            </a>
        </div>
        <h3>${data.name || "No name provided"}</h3>
        <p><strong>Username:</strong> ${data.login}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
    `;
    })
    .catch(error =>{
        display.textContent = "Error";
    });


    usernameInput = "";
}