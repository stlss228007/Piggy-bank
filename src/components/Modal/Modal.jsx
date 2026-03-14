import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

function Modal({ isOpen, onClose, title, children, image }) {
    const modalRef = useRef(null)

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) {
            onClose()
        }
    }

    if (!isOpen) return null

    return createPortal(
        <div 
            className="modal-overlay" 
            ref={modalRef}
            onClick={handleBackdropClick}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-header-content">
                        <h2 className="modal-title">{title}</h2>
                        {image && (
                            <div className="modal-header-image">
                                <img src={image} alt="" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal