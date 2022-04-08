import { Component } from "react";
import Header from "../../components/header/Header";
import Social from "../../components/social/Social";

//images
import photo from "../../resources/own-photo/500x500.png";

//styles
import "./about-me.scss";
import "./about-me_Media.scss";

//types
import { namePages } from "../../components/app/App";
import { Link } from "react-router-dom";
interface IProps {
    // onChangePage: (namePage: namePages) => void
}

class AboutMe extends Component<IProps> {
    constructor(props: IProps) {
		super(props);
	}

    render() {
        return (
            <div className="about-me">
                <div className="container">
                    <Header/>

                    <main>
                        <div className="about-me__tech-wrapper">
                            <div className="about-me__wrapper-photo">
                                <img src={photo} alt="me in the photo" className="about-me__photo" />
                            </div>

                            <div className="about-me__wrapper-content">
                                <h2 className="about-me__title">Обо мне</h2>

                                <div className="about-me__description">
                                        Привет! Я Константин Фатеев, с большим интересом и эннтузиазмом занимаюсь фотографией. По поводу и без, буду рад провести с вами фотосессию.
                                        <br/>
                                        Я делаю все, чтобы после моей работы оставались только довольные клиенты!
                                    <br/><br/>
                                        Хотите провести фотосессию - обязательно дайте знать, заполнив эту <Link to="/Contacts" className="about-me__link-form"><span>форму</span></Link>, или свяжитесь со мной по контактам, расположенным чуть ниже на странице)
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer>
                        <Social/>
                    </footer>
                </div>
            </div>
        )
    }
}

export default AboutMe;