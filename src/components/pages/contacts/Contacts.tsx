import { Component } from "react";

//styles
import "./contacts.scss";
import "./contacts_Media.scss";

//types
import Header from "../../header/Header";
import Social from "../../social/Social";
import FeedbackForm from "../../feedback-form/FeedbackForm";
interface IProps {
    // onChangePage: (namePage: namePages) => void
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
                    <Header/>

                    <div className="contacts__main">
                        <h1 className="contacts__title">Заполните форму</h1> 
                        <div className="contacts__tout">
                            {/* У вас есть проект, который вы хотели бы обсудить c нами? Напишите ниже, мы бы хотели поговорить. 
                            <br/> */}
                            {/* По поводу и "без" готовы вас фотографировать. <br/>Напишите ниже - поможем друг другу сделать красивые фотографии! */}
                        </div>
                        
                        <FeedbackForm/>
                    </div>

                    <footer>
                        <Social/>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Contacts;