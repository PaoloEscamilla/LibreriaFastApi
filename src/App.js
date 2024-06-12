import React, { useEffect, useState } from 'react';
import api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookForm from './BookForm';
import DeleteConfirmation from './DeleteConfirmation';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    api.get('/books')
      .then(response => {
        console.log('Datos de la API:', response.data);
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
      });
  };

  const handleSearch = () => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Libros filtrados:', filtered);
    setFilteredBooks(filtered);
  };

  const showAllBooks = () => {
    console.log('Mostrando todos los libros');
    setFilteredBooks(books);
  };

  const handleSave = (savedBook) => {
    setBooks((prevBooks) => {
      const existingBookIndex = prevBooks.findIndex(b => b.id === savedBook.id);
      if (existingBookIndex >= 0) {
        const updatedBooks = [...prevBooks];
        updatedBooks[existingBookIndex] = savedBook;
        return updatedBooks;
      } else {
        return [...prevBooks, savedBook];
      }
    });
    setFilteredBooks((prevFilteredBooks) => {
      const existingBookIndex = prevFilteredBooks.findIndex(b => b.id === savedBook.id);
      if (existingBookIndex >= 0) {
        const updatedBooks = [...prevFilteredBooks];
        updatedBooks[existingBookIndex] = savedBook;
        return updatedBooks;
      } else {
        return [...prevFilteredBooks, savedBook];
      }
    });
    setCurrentBook(null);
    setIsEditing(false);
  };

  const handleDelete = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
    setFilteredBooks(filteredBooks.filter(book => book.id !== bookId));
    setCurrentBook(null);
    setIsDeleting(false);
  };

  const startEditing = (book) => {
    setCurrentBook(book);
    setIsEditing(true);
  };

  const startDeleting = (book) => {
    setCurrentBook(book);
    setIsDeleting(true);
  };

  const cancelEditing = () => {
    setCurrentBook(null);
    setIsEditing(false);
  };

  const cancelDeleting = () => {
    setCurrentBook(null);
    setIsDeleting(false);
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">Libros en la Biblioteca</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por título"
        />
        <button className="btn btn-primary me-2" onClick={handleSearch}>Buscar</button>
        <button className="btn btn-secondary" onClick={showAllBooks}>Mostrar Todos</button>
        <button className="btn btn-success" onClick={() => setIsEditing(true)}>Agregar Libro</button>
      </div>
      
      {isEditing && (
        <BookForm
          book={currentBook}
          onSave={handleSave}
          onCancel={cancelEditing}
        />
      )}
      {isDeleting && (
        <DeleteConfirmation
          book={currentBook}
          onDelete={handleDelete}
          onCancel={cancelDeleting}
        />
      )}
      <div className="row">
        {filteredBooks.map(book => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-subtitle mb-2">Autor: {book.author}</p>
                <p className="card-subtitle mb-2">Año: {book.year}</p>
                <p className="card-subtitle mb-2">Páginas: {book.pages}</p>
                <p className="card-subtitle mb-2">Categoría: {book.category.name}</p>
                <button className="btn btn-warning me-2" onClick={() => startEditing(book)}>Editar</button>
                <button className="btn btn-danger" onClick={() => startDeleting(book)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
