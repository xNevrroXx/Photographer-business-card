import { FC } from "react";

//styles
import "./modal.scss";

//types
interface IProps {
    url: string,
    onCloseModal: () => void
}

const Modal: FC<IProps> = ({url, onCloseModal: onCloseModalProp}: IProps) => {

    const onCloseModal = (e: any) => {
        console.log(e)
        if(e.target.classList[0] === "my-modal")
            onCloseModalProp();
    }

    return (
        <div 
            className="my-modal"
            onClick={(e) => onCloseModal(e)}    
        >
            <img className="my-modal__image" src={url} alt="zoomed photo" />    
        </div>
    )
}

export default Modal;