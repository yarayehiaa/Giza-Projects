// Store user data in localStorage if not already set
const defaultUsers = {
    'user1': {
        name: 'Bessie Cooper',
        company: 'IBM',
        user: 'user-1',
        cart: '453 €'
    },
    'user2': {
        name: 'Wade Warren',
        company: 'L\'Oréal',
        user: 'user-2',
        cart: '994 €'
    },
    'user3': {
        name: 'Arlene McCoy',
        company: 'Gillette',
        user: 'user-3',
        cart: '429 €'
    },
    'user4': {
        name: 'Jenny Wilson',
        company: 'MasterCard',
        user: 'user-4',
        cart: '826 €'
    },
    'user5': {
        name: 'Kristin Watson',
        company: 'Gillette',
        user: 'user-5',
        cart: '561 €'
    },
    'user6': {
        name: 'Cameron Williamson',
        company: 'Louis Vuitton',
        user: 'user-6',
        cart: '540 €'
    }
};

// Load users from localStorage or set default users if none exist
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Function to render the table
function renderTable(users) {
    const tableBody = document.getElementById("table-body");
    const fragment = document.createDocumentFragment();

    Object.entries(users).forEach(([id, user]) => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td class="center"><input type="checkbox"></td>
            <td>${user.name}</td>
            <td>${user.company}</td>
            <td class="center"><img src="./assets/users/${user.user}.svg" alt="user picture"></td>
            <td class="right">${user.cart}</td>
            <td class="center">
                <button class="edit-btn" data-id="${id}">
                    <img src="./assets/icons/edit-icon.svg" alt="edit icon">
                </button>
            </td>
        `;

        fragment.appendChild(newRow);
    });

    tableBody.innerHTML = ''; 
    tableBody.appendChild(fragment); 
}


function openEditModal(user, id) {
    const modal = document.getElementById("editModal");
    modal.style.display = "block";

    document.getElementById("name").value = user.name;
    document.getElementById("company").value = user.company;
    document.getElementById("cart").value = user.cart;

    
    document.getElementById("formBtn").onclick = function () {
        saveUserData(id);
    };

    
    document.getElementsByClassName("close")[0].onclick = function () {
        modal.style.display = "none";
    };
}


function saveUserData(id) {
    const users = JSON.parse(localStorage.getItem("users"));

    
    users[id] = {
        name: document.getElementById("name").value,
        company: document.getElementById("company").value,
        cart: document.getElementById("cart").value,
        user: users[id].user // Keep the same user picture
    };

    
    localStorage.setItem("users", JSON.stringify(users));

    
    renderTable(users);

    
    document.getElementById("editModal").style.display = "none";
}


document.getElementById("table-body").addEventListener("click", function (event) {
    if (event.target.closest(".edit-btn")) {
        const id = event.target.closest(".edit-btn").dataset.id;
        const users = JSON.parse(localStorage.getItem("users"));

        // Open the modal with the selected user's data
        openEditModal(users[id], id);
    }
});


document.getElementById("editForm").addEventListener("submit", function (event) {
    event.preventDefault();
});


renderTable(JSON.parse(localStorage.getItem("users")));
