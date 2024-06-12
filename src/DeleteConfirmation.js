import React from 'react';
import api from './api';

function DeleteConfirmation({ book, onDelete, onCancel }) {
  const handleDelete = () => {
    api.delete(`/books/${book.id}`)
      .then(response => {
        onDelete(book.id);
      })
      .catch(error => {
        console.error('Error al eliminar el libro', error);
      });
  };

  return (
    <div>
      <p>¿Estás seguro de que deseas eliminar el libro "{book.title}"?</p>
      <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
      <button className="btn btn-secondary ms-2" onClick={onCancel}>Cancelar</button>
    </div>
  );
}

export default DeleteConfirmation;
