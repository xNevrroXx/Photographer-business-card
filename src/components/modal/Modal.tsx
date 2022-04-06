import { Component, FC } from "react";

//styles
import "./modal.scss";

//types
interface IProps {
    url: string,
    onCloseModal: () => void
}

class Modal extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyCloseModal);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyCloseModal);
    }

    onKeyCloseModal = (e: any) => {
        if(e.code === "Escape") 
            this.props.onCloseModal();
    }

    onClickCloseModal = (e: any) => {
        if(e.target.classList[0] === "my-modal")
            this.props.onCloseModal();
    }

    render() {
        const {url} = this.props;

        return (
            <div 
                className="my-modal"
                onClick={(e) => this.onClickCloseModal(e)}    
            >
                <img className="my-modal__image" src={url} alt="zoomed photo" />    
            </div>
        )
    }
}

export default Modal;