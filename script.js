// Book Exchange and Sell Functionality
const exchangeBooks = [
    { title: "Data Structures", author: "John Doe", name: "Alice", contact: "alice@example.com", image: "https://rukminim2.flixcart.com/image/850/1000/kjabs7k0-0/book/f/a/b/data-structures-original-imafyw45k5wcsbsx.jpeg?q=90&crop=false" },
    { title: "Operating Systems", author: "Andrew Tanenbaum", name: "Bob", contact: "bob@example.com", image: "https://bpbonline.com/cdn/shop/products/9789388511711_-_2_600x.jpg?v=1623759679" },
    { title: "Algorithms", author: "Robert Sedgewick", name: "Chris", contact: "chris@example.com", image: "https://m.media-amazon.com/images/I/61ZYxrQEpCL._AC_UF1000,1000_QL80_.jpg" },
    { title: "Machine Learning", author: "Tom Mitchell", name: "Daniel", contact: "daniel@example.com", image: "https://www.phindia.com/images/bookimages/9789389347463.s.jpg" },
    { title: "Artificial Intelligence", author: "Stuart Russell", name: "Emma", contact: "emma@example.com", image: "https://m.media-amazon.com/images/I/81UcJ68zOuL.jpg" },
    { title: "Computer Architecture", author: "David A. Patterson", name: "Frank", contact: "frank@example.com", image: "https://m.media-amazon.com/images/I/81sISFTwF2L._AC_UF1000,1000_QL80_.jpg" }
];

const sellBooks = [
    { title: "Computer Networks", author: "James Kurose", name: "Charlie", contact: "charlie@example.com", image: "https://cdn01.sapnaonline.com/product_media/9789381068250/md_9789381068250.jpg" },
    { title: "Database Systems", author: "Raghu Ramakrishnan", name: "David", contact: "david@example.com", image: "https://m.media-amazon.com/images/I/61-2bLQrZ4L._AC_UF1000,1000_QL80_.jpg" },
    { title: "Cybersecurity Essentials", author: "William Stallings", name: "Grace", contact: "grace@example.com", image: "https://m.media-amazon.com/images/I/51KggE97zdL._AC_UF1000,1000_QL80_.jpg" },
    { title: "Web Development", author: "Jon Duckett", name: "Henry", contact: "henry@example.com", image: "https://m.media-amazon.com/images/I/61Yxa2VwECS._AC_UF1000,1000_QL80_FMwebp_.jpg" },
    { title: "Cloud Computing", author: "Rajkumar Buyya", name: "Isla", contact: "isla@example.com", image: "https://media.wiley.com/product_data/coverImage300/90/04708879/0470887990.jpg" },
    { title: "Big Data Analytics", author: "Michael Minelli", name: "Jack", contact: "jack@example.com", image: "https://m.media-amazon.com/images/I/61bZx3TmuML._AC_UF1000,1000_QL80_.jpg" }
];

function displayBooks(list, elementId, searchQuery = "") {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    const filteredBooks = list.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredBooks.length === 0) {
        container.innerHTML = `<div class="no-results">No books found matching your search.</div>`;
        return;
    }

    filteredBooks.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <div class="book-details">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Owner:</strong> ${book.name}</p>
                <p><strong>Contact:</strong> ${book.contact}</p>
            </div>
        `;
        container.appendChild(bookItem);
    });
}

function searchBooks(event) {
    const searchQuery = event.target.value;
    const sectionId = event.target.closest(".section").id;

    if (sectionId === "exchange-section") {
        displayBooks(exchangeBooks, 'exchange-list', searchQuery);
    } else if (sectionId === "sell-section") {
        displayBooks(sellBooks, 'sell-list', searchQuery);
    }
}

function clearSearch(event) {
    const sectionId = event.target.closest(".section").id;
    const searchBar = event.target.previousElementSibling;

    searchBar.value = "";

    if (sectionId === "exchange-section") {
        displayBooks(exchangeBooks, 'exchange-list');
    } else if (sectionId === "sell-section") {
        displayBooks(sellBooks, 'sell-list');
    }
}

// Initial display
document.addEventListener("DOMContentLoaded", () => {
    displayBooks(exchangeBooks, 'exchange-list');
    displayBooks(sellBooks, 'sell-list');

    // Add event listeners to search bars
    const searchBars = document.querySelectorAll(".search-bar");
    searchBars.forEach(searchBar => {
        searchBar.addEventListener("input", searchBooks);
    });

    // Add event listeners to clear buttons
    const clearButtons = document.querySelectorAll(".clear-search");
    clearButtons.forEach(button => {
        button.addEventListener("click", clearSearch);
    });
});