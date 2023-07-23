import ReactDOM from 'react-dom';

const ReserveDevice = ({ deviceId, show, onCloseButtonClick }) => {
    if (!show) {
        return null;
    }
    return ReactDOM.createPortal(
        <div className="modal-wrapper">
            <div className="modal">
            <div className="body">
                Showing {deviceId}
            </div>
            <div className="footer">
                <button onClick={onCloseButtonClick}>Close Modal</button>
            </div>
            </div>
        </div>
        , document.getElementById('root')
        );
};

export default ReserveDevice;