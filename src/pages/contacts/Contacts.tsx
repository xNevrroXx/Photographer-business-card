import {FC} from "react";
//styles
import "./contacts.scss";
import "./contacts_Media.scss";
// own modules
import Header from "../../components/header/Header";
import Social from "../../components/social/Social";
import FeedbackForm from "../../components/feedback-form/FeedbackForm";

const Contacts: FC = () => {

    return(
        <div className="contacts">
            <div className="container">
                <Header/>

                <div className="contacts__main">
                    <h1 className="contacts__title">Заполните форму</h1>
                    <FeedbackForm/>
                </div>

                <footer>
                    <Social/>
                </footer>
            </div>
        </div>
    )
}

export default Contacts;