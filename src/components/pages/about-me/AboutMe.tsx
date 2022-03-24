import { Component } from "react";
import Header from "../../header/Header";
import Social from "../../social/Social";

//images
// import signatureImage from "../../../resources/esignature_cocosign.png";

//styles
import "./aboutMe.scss";

//types
import { namePages } from "../../app/App";
interface IProps {
    onChangePage: (namePage: namePages) => void
}

class AboutMe extends Component<IProps> {
    constructor(props: IProps) {
		super(props);
	}

    render() {
        return (
            <div className="about-me">
                <div className="container">
                    <Header onChangePage={this.props.onChangePage} mb="0"/>

                    <main>
                        <h2>Обо мне</h2>

                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, dolorem? Accusamus ullam qui voluptatibus facere asperiores, doloremque quod sapiente nobis ab, ex minima dignissimos iste rerum voluptatem consequatur. Necessitatibus, nemo!
                            Repellendus fugiat omnis, molestiae velit magni blanditiis, consequatur nobis repellat cupiditate earum sed ex voluptatum fuga dolorem, veritatis labore nulla. Corrupti corporis cupiditate quaerat provident eligendi unde a iure ullam.
                        </p>
                        <p>
                            Esse ad, laudantium harum sint quaerat dicta tempore nostrum minus odit unde tempora quis quisquam quod voluptatum aliquam vero facere eius aut.    Delectus quaerat, molestiae alias sed quo ratione sunt.
                            Omnis libero cupiditate magni eligendi a unde perspiciatis excepturi ab molestiae quasi nemo natus nam, quis dolor alias, accusamus cum accusantium. Nulla ut quod, cupiditate earum magni enim deleniti quae!
                        </p>
                    </main>

                    <Social/>
                </div>
            </div>
        )
    }
}

export default AboutMe;