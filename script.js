const exchangeBooks = [
    { title: "Data Structures", author: "John Doe", name: "Alice", contact: "alice@example.com", image: "https://m.media-amazon.com/images/I/71NZEvk6qHS._UF1000,1000_QL80_.jpg" },
    { title: "Operating Systems", author: "Andrew Tanenbaum", name: "Bob", contact: "bob@example.com", image: "book2.jpg" },
    { title: "Algorithms", author: "Robert Sedgewick", name: "Chris", contact: "chris@example.com", image: "book5.jpg" },
    { title: "Machine Learning", author: "Tom Mitchell", name: "Daniel", contact: "daniel@example.com", image: "book6.jpg" },
    { title: "Artificial Intelligence", author: "Stuart Russell", name: "Emma", contact: "emma@example.com", image: "book7.jpg" },
    { title: "Computer Architecture", author: "David A. Patterson", name: "Frank", contact: "frank@example.com", image: "book8.jpg" }
];

const sellBooks = [
    { title: "Computer Networks", author: "James Kurose", name: "Charlie", contact: "charlie@example.com", image: "book3.jpg" },
    { title: "Database Systems", author: "Raghu Ramakrishnan", name: "David", contact: "david@example.com", image: "book4.jpg" },
    { title: "Cybersecurity Essentials", author: "William Stallings", name: "Grace", contact: "grace@example.com", image: "book9.jpg" },
    { title: "Web Development", author: "Jon Duckett", name: "Henry", contact: "henry@example.com", image: "book10.jpg" },
    { title: "Cloud Computing", author: "Rajkumar Buyya", name: "Isla", contact: "isla@example.com", image: "book11.jpg" },
    { title: "Big Data Analytics", author: "Michael Minelli", name: "Jack", contact: "jack@example.com", image: "book12.jpg" }
];

function displayBooks(list, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";
    list.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `<img src="${book.image}" alt="Book"> <div><strong>${book.title}</strong> by ${book.author}<br>Owner: ${book.name}<br>Contact: ${book.contact}</div>`;
        container.appendChild(bookItem);
    });
}

displayBooks(exchangeBooks, 'exchange-list');
displayBooks(sellBooks, 'sell-list');