import { Component } from "react";

//styles
import "./contacts.scss";

//types
import { namePages } from "../../app/App";
import Header from "../../header/Header";
import Social from "../../social/Social";
import FeedbackForm from "../../feedback-form/FeedbackForm";
interface IProps {
    onChangePage: (namePage: namePages) => void
}

class Contacts extends Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div className="contacts">
                <div className="container">
                    <Header onChangePage={this.props.onChangePage}/>   
                </div>

                <div className="container">
                    <h1 className="contacts__title">Свяжитесь с нами</h1> 
                    
                    <FeedbackForm/>
                </div>

                <div className="container">
                    <footer>
                        <Social/>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Contacts;