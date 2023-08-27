// Modal.js
import React from 'react';
import '../css/modal.css'; 

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
       <div className='diV__close__btn'>
       <button className="close-button" onClick={onRequestClose}>
          &times;
        </button>
       </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;