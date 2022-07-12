//components
import Header from "../../components/header/Header";
import Social from "../../components/social/Social";
import FeedbackForm from "../../components/feedback-form/FeedbackForm";

//styles
import "./contacts.scss";
import "./contacts_Media.scss";


const Contacts = () => {
    return(
        <div className="contacts">
            <div className="container">
                <Header />
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

export default Contacts;