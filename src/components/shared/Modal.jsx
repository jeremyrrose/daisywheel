import React from 'react';
import '../../styles/Modal.css';

const Modal = ({action, toggle, callback}) => {
    return (
        <div className="modalCover">
            <div className="modalContent">
                <h2>Are you sure you want to {action}?</h2>
                <p>This change will immediately affect the reader view as well.</p>
                <p>Click below to confirm or cancel.</p>
                <button onClick={(e) => toggle(e)}>Cancel</button><button onClick={(e) => callback(e)}>Confirm</button>
            </div>
        </div>
    )
}

export default Modal;