document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('bookTable');
    const addBookButton = document.getElementById('addBookButton');
    const editModal = document.getElementById('editModal');
    const closeModal = document.getElementById('closeModal');
    const saveChangesButton = document.getElementById('saveChangesButton');
    
    let currentRow; 
    let books = [];  
  
 
    function Book(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  

    function displayBooks() {
      table.innerHTML = `
        <tr>
          <th>Book</th>
          <th>Author</th>
          <th>Pages</th>
          <th>Read?</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      `;
  
      books.forEach((book, index) => {
        const row = document.createElement('tr');
        

        const bookCell = document.createElement('td');
        bookCell.textContent = book.title;
        
        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        
        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages;
        
        const readCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = book.read;
        readCell.appendChild(checkbox);
  

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {

          document.getElementById('editBookTitle').value = book.title;
          document.getElementById('editBookAuthor').value = book.author;
          document.getElementById('editBookPages').value = book.pages;
          document.getElementById('editBookRead').checked = book.read;
  

          currentRow = index;

          editModal.style.display = 'block';
        };
  

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
          books.splice(index, 1); 
          displayBooks(); 
        };
  
       
        editCell.appendChild(editButton);
        deleteCell.appendChild(deleteButton);
  

        row.appendChild(bookCell);
        row.appendChild(authorCell);
        row.appendChild(pagesCell);
        row.appendChild(readCell);
        row.appendChild(editCell);
        row.appendChild(deleteCell);

        table.appendChild(row);
      });
    }
  

    closeModal.onclick = function () {
      editModal.style.display = 'none';
    };
  

    saveChangesButton.onclick = function () {
      const title = document.getElementById('editBookTitle').value;
      const author = document.getElementById('editBookAuthor').value;
      const pages = document.getElementById('editBookPages').value;
      const read = document.getElementById('editBookRead').checked;
  
      if (title && author && pages) {

        books[currentRow].title = title;
        books[currentRow].author = author;
        books[currentRow].pages = pages;
        books[currentRow].read = read;

        displayBooks();
  

        editModal.style.display = 'none';
      } else {
        alert("Please fill in all fields.");
      }
    };
  

    addBookButton.addEventListener('click', function () {
      const title = document.getElementById('bookTitle').value;
      const author = document.getElementById('bookAuthor').value;
      const pages = document.getElementById('bookPages').value;
      const read = document.getElementById('bookRead').checked;
  
      if (title && author && pages) {

        const newBook = new Book(title, author, pages, read);
        books.push(newBook);
  

        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookPages').value = '';
        document.getElementById('bookRead').checked = false;

        displayBooks();
      } else {
        alert("Please fill in all fields.");
      }
    });
  });
  