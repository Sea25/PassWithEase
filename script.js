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
    { title: "Computer Networks", author: "James Kurose", name: "Charlie", contact: "charlie@example.com", price: "$20", image: "https://cdn01.sapnaonline.com/product_media/9789381068250/md_9789381068250.jpg" },
    { title: "Database Systems", author: "Raghu Ramakrishnan", name: "David", contact: "david@example.com", price: "$25", image: "https://m.media-amazon.com/images/I/61-2bLQrZ4L._AC_UF1000,1000_QL80_.jpg" },
    { title: "Cybersecurity Essentials", author: "William Stallings", name: "Grace", contact: "grace@example.com", price: "$30", image: "https://m.media-amazon.com/images/I/51KggE97zdL._AC_UF1000,1000_QL80_.jpg" },
    { title: "Web Development", author: "Jon Duckett", name: "Henry", contact: "henry@example.com", price: "$15", image: "https://m.media-amazon.com/images/I/61Yxa2VwECS._AC_UF1000,1000_QL80_FMwebp_.jpg" },
    { title: "Cloud Computing", author: "Rajkumar Buyya", name: "Isla", contact: "isla@example.com", price: "$40", image: "https://media.wiley.com/product_data/coverImage300/90/04708879/0470887990.jpg" },
    { title: "Big Data Analytics", author: "Michael Minelli", name: "Jack", contact: "jack@example.com", price: "$35", image: "https://m.media-amazon.com/images/I/61bZx3TmuML._AC_UF1000,1000_QL80_.jpg" }
];

// Display books in the specified container
function displayBooks(list, elementId, searchQuery = "") {
    const container = document.getElementById(elementId);
    if (!container) {
        console.error(`Container with id "${elementId}" not found!`);
        return;
    }

    container.innerHTML = ""; // Clear previous content

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

        // Add price tag for Sell Section
        const priceTag = elementId === 'sell-list' ? `
            <div class="price-container">
                <p class="price-tag">${book.price}</p>
                <button class="edit-price-button">Edit Price</button>
            </div>
        ` : '';

        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <div class="book-details">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Owner:</strong> ${book.name}</p>
                <p><strong>Contact:</strong> ${book.contact}</p>
                ${priceTag}
            </div>
        `;

        // Add click event for Sell Section
        if (elementId === 'sell-list') {
            bookItem.addEventListener('click', () => showBookDetails(book));
        }

        // Add edit price functionality for Sell Section
        if (elementId === 'sell-list') {
            const editPriceButton = bookItem.querySelector('.edit-price-button');
            const priceTagElement = bookItem.querySelector('.price-tag');

            editPriceButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the book item click event from firing

                // Replace price text with an input field
                const priceInput = document.createElement("input");
                priceInput.type = "text";
                priceInput.value = book.price;
                priceInput.classList.add("price-input");

                // Replace the price tag with the input field
                priceTagElement.replaceWith(priceInput);

                // Add a save button
                const saveButton = document.createElement("button");
                saveButton.textContent = "Save";
                saveButton.classList.add("save-price-button");

                // Append the save button
                priceInput.insertAdjacentElement('afterend', saveButton);

                // Handle save button click
                saveButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent the book item click event from firing

                    const newPrice = priceInput.value.trim();
                    if (newPrice) {
                        // Update the book price
                        book.price = newPrice;

                        // Replace the input field with the updated price
                        priceInput.replaceWith(priceTagElement);
                        priceTagElement.textContent = newPrice;

                        // Remove the save button
                        saveButton.remove();
                    } else {
                        alert("Please enter a valid price.");
                    }
                });
            });
        }

        container.appendChild(bookItem);
    });
}

// Show detailed book information in a modal
function showBookDetails(book) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${book.image}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Owner:</strong> ${book.name}</p>
            <p><strong>Contact:</strong> ${book.contact}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Description:</strong> This is a detailed description of the book. It includes information about the condition, edition, and any additional notes from the seller.</p>
        </div>
    `;

    // Close modal when clicking the close button
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside the modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}

// Handle search input
function searchBooks(event) {
    const searchQuery = event.target.value;
    const sectionId = event.target.closest(".section").id;

    if (sectionId === "exchange-section") {
        displayBooks(exchangeBooks, 'exchange-list', searchQuery);
    } else if (sectionId === "sell-section") {
        displayBooks(sellBooks, 'sell-list', searchQuery);
    }
}

// Clear search and reset book list
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

// Handle Contact Form Submission
function handleContactForm(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Simulate form submission (replace with actual API call)
    console.log('Form Data:', data);
    alert('Thank you for contacting us! We will get back to you soon.');

    // Reset form
    event.target.reset();
}

// Initial display and event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Display books
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

    // Add event listener to contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});