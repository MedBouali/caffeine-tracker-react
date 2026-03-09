import ReactDom from 'react-dom';

export default function Modal(props) {
    const { children, handleCloseModal } = props;

    return ReactDom.createPortal (
         <div onClick={handleCloseModal} className='modal-underlay'>
            <div className='modal-container'>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}