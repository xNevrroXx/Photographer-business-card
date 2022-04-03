import { Component } from "react";
import Header from "../../header/Header";
import Social from "../../social/Social";

//images
// import signatureImage from "../../../resources/esignature_cocosign.png";

//styles
import "./about-me.scss";
import "./about-me_Media.scss";

//types
import { namePages } from "../../app/App";
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
                        <h2 className="about-me__title">Обо мне</h2>

                        <div className="about-me__description">
                                Привет! Я Константин Фатеев, с большим интересом и эннтузиазмом занимаюсь фотографией. По поводу и без, буду рад провести с вами фотосессию.
                                <br/>
                                Я делаю все, чтобы после моей работы оставались только довольные клиенты!
                            <br/><br/>
                                Хотите провести фотосессию - обязательно дайте знать, заполнив эту "форму", или свяжитесь со мной по контактам, расположенным чуть ниже на странице)
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