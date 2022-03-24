import { Component } from "react";

import { tns } from "../../../../node_modules/tiny-slider/src/tiny-slider"; // slider
import Header from "../../header/Header";
import Social from "../../social/Social";
import {getPhotos} from "../../../services/service";

// temp photos
import image1 from "../../../resources/photos/1.jpg";
import image2 from "../../../resources/photos/57.jpg";
import image3 from "../../../resources/photos/DSC0рр4882.jpg";
import image4 from "../../../resources/photos/DSC04758.jpg";
import image5 from "../../../resources/photos/DSC05767.jpg";
import image6 from "../../../resources/photos/DSC06049.jpg";


// styles
import "./portfolio.scss";

// types
import { namePages } from "../../app/App";
import Modal from "../../modal/Modal";
interface IProps {
    onChangePage: (namePage: namePages) => void
}
interface IState {
    listPhotos: {url: string}[],
    numSlide: string,
    modal: {
        isOpenModal: boolean,
        modalUrl: string
    }
}


class Portfolio extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            listPhotos: [
                {url: image1},
                {url: image2},
                {url: image3},
                {url: image4},
                {url: image5},
                {url: image6}
            ],
            numSlide: "01",
            modal: {
                isOpenModal: false,
                modalUrl: ""
            }
        }
    }

    componentDidMount() {
        getPhotos("http://localhost:3000/images")
        .then(result => {
            // this.setState({listPhotos: result}) //временно, пока не получится вернуть оригинальные фото
        })
        .then(() => {
            const slider = tns({
                container: ".slider",
                items: 1,
                slideBy: 1,
                autoHeight: false,
                autoWidth: false,
                autoplay: false,
                mode: "carousel",
                useLocalStorage: false,
                center: true,
                gutter: 0,
                edgePadding: 325,
                speed: 800,
                //controls
                prevButton: ".slider__prev-button",
                nextButton: ".slider__next-button",
                nav: false,
                responsive: {
                    320: {
                        edgePadding: 0
                    },
                    1300: {
                        edgePadding: 200
                    },
                    1800: {
                        edgePadding: 300
                    }
                }
            });
        })

        this.setListeners();
    }

    componentWillUnmount() {
        this.deleteListeners();
    }

    setListeners = () => {
        const prevButton = document.querySelector(".slider__prev-button"),
              nextButton = document.querySelector(".slider__next-button");

        prevButton?.addEventListener("click", this.prevFunction);
        nextButton?.addEventListener("click", this.nextFunction);
    }
    deleteListeners = () => {
        const prevButton = document.querySelector(".slider__prev-button"),
              nextButton = document.querySelector(".slider__next-button");

        prevButton?.removeEventListener("click", this.prevFunction)
        nextButton?.removeEventListener("click", this.nextFunction);
    }

    prevFunction = () => this.onChangeSlide("prev");
    nextFunction = () => this.onChangeSlide("next");

    onChangeSlide = (direction: "prev" | "next") => { // меняет счетчик слайдов
        let {numSlide, listPhotos} = this.state;
        switch (direction) {
            case "prev": 
                if(+numSlide === 1)
                    numSlide = String(listPhotos.length > 9 ? listPhotos.length : ("0" + listPhotos.length))
                else
                    numSlide = +numSlide > 10 ? String(+numSlide-1) : ("0" + (+numSlide-1))

                this.setState(({numSlide}));
                break;

            case "next":
                if(+numSlide === listPhotos.length)
                    numSlide = "01";
                else
                    numSlide = +numSlide >= 9 ? String(+numSlide+1) : String("0" + (+numSlide+1));
                
                this.setState(({numSlide}));
                break;
        }
    }

    onCloseModal = () => {
        this.setState({
            modal: {
                ...this.state.modal,
                isOpenModal: false
            }
        });
    }
    onOpenModal = (url: string) => {
        console.log("done")
        this.setState({
            modal: {
                modalUrl: url,
                isOpenModal: true
            }
        });
    }

    render() {
        const {listPhotos, numSlide, modal: {modalUrl, isOpenModal}} = this.state;

        return(
            <>
                {isOpenModal ? <Modal url={modalUrl} onCloseModal={this.onCloseModal} /> : null}
                
                <div className="portfolio">
                    <div className="container">
                        <Header onChangePage={this.props.onChangePage} mb="40px"/>
                    </div>
    
                    <div className="portfolio__wrapper-photos slider">
                        {
                            listPhotos.map((item, index) => {
                                return (
                                    <div className="portfolio__wrapper-photo" key={"photo" + index} onClick={() => this.onOpenModal(item.url)}>
                                        <img className="portfolio__photo" src={item.url} alt="" key={"photo" + index}/>
                                    </div>
                                )
                            })
                        }
                    </div>
    
                    <div className="slider__control-container">
                        <button className="slider__prev-button"></button>
                        <button className="slider__next-button"></button>
                    </div>
                    
                    <div className="slider__counter">
                        <div className="slider__current">{numSlide}</div>
                        <div className="slider__counter-divider"></div>
                        <div className="slider__total">{listPhotos.length > 9 ? listPhotos.length : "0" + listPhotos.length}</div>    
                    </div>
                    
                    <div className="container">
                        <Social/>
                    </div>
                </div>
            </>
        )
    }
}

export default Portfolio;