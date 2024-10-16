const user1 = {
    name: 'Bessie Cooper',
    company: 'IBM',
    user: 'user-1',
    cart: '453 €',
};

const user2 = {
    name: 'Wade Warren',
    company: 'L\'Oréal',
    user: 'user-2',
    cart: '994 €',
};

const user3 = {
    name: 'Arlene McCoy',
    company: 'Gillette',
    user: 'user-3',
    cart: '429 €',
};

const user4 = {
    name: 'Jenny Wilson',
    company: 'MasterCard',
    user: 'user-4',
    cart: '826 €',
};

const user5 = {
    name: 'Kristin Watson',
    company: 'Gillette',
    user: 'user-5',
    cart: '561 €',
};

const user6 = {
    name: 'Cameron Williamson',
    company: 'Louis Vuitton',
    user: 'user-6',
    cart: '540 €',
};

let users = [user1, user2, user3, user4, user5, user6];


users.forEach(user => {
    let name = user.name;
    let company = user.company;
    let cart = user.cart;
    let pic= user.user;


    let btn = document.createElement("button");
    btn.appendChild(document.createElement("img")).src = "./assets/icons/edit-icon.svg";
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let userImg = document.createElement("img");
    userImg.src = `./assets/users/${pic}.svg`;
    userImg.alt='user picture';

    let table = document.getElementById("table");
    let newRow = table.insertRow(-1);
    let checkCell = newRow.insertCell(0);
    let nameCell = newRow.insertCell(1);
    let companyCell = newRow.insertCell(2);
    let picCell = newRow.insertCell(3);
    let cartCell = newRow.insertCell(4);
    let editCell = newRow.insertCell(5);


    nameCell.innerHTML = name;
    companyCell.innerHTML = company;
    cartCell.innerHTML = cart;
    picCell.appendChild(userImg);
    editCell.appendChild(btn);
    checkCell.appendChild(checkbox);
    cartCell.style.textAlign = "right";
    editCell.style.textAlign = "center";
    checkCell.style.textAlign = "center";
    picCell.style.textAlign = "center";
    

}
);
