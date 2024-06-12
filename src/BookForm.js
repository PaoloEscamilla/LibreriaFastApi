import React, { useState, useEffect } from 'react';
import api from './api';

function BookForm({ book, onSave, onCancel }) {
  const [title, setTitle] = useState(book ? book.title : '');
  const [author, setAuthor] = useState(book ? book.author : '');
  const [year, setYear] = useState(book ? book.year : '');
  const [pages, setPages] = useState(book ? book.pages : '');
  const [categoryName, setCategoryName] = useState(book ? book.category.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = { title, author, year, pages, category_name: categoryName };
    if (book) {
      // Editar libro existente
      api.put(`/books/${book.id}`, bookData)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error('Error al editar el libro', error);
        });
    } else {
      // Crear nuevo libro
      api.post('/books', bookData)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error('Error al crear el libro', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Autor</label>
        <input
          type="text"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Año</label>
        <input
          type="number"
          className="form-control"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Páginas</label>
        <input
          type="number"
          className="form-control"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <input
          type="text"
          className="form-control"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default BookForm;
