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

    // key
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


    // click
    onClickCloseModal = () => {
        this.props.onCloseModal();
    }

    render() {
        const {url} = this.props;

        return (
            <div 
                className="my-modal"
                onClick={this.onClickCloseModal}    
            >
                <img className="my-modal__image" src={url} alt="zoomed photo" />    
            </div>
        )
    }
}

export default Modal;