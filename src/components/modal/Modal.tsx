//styles
import "./modal.scss";

//types
import { IPropsZoomedPhoto } from "../../interfaces/interfaces";

const Modal = ({url, onCloseModal}: IPropsZoomedPhoto) => {
    const onKeyCloseModal = (e: any) => {
        if(e.code === "Escape") 
            onCloseModal();
    }


    // click
    const onClickCloseModal = () => {
        onCloseModal();
    }

    return (
        <div 
            className="my-modal"
            onClick={onClickCloseModal}
            onKeyDown={onKeyCloseModal}
        >
            <img className="my-modal__image" src={url} alt="zoomed photo" />    
        </div>
    )
}

export default Modal;