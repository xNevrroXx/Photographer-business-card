import { Component } from "react";

import { tns } from "../../../../node_modules/tiny-slider/src/tiny-slider"; // slider
import Header from "../../header/Header";
import Social from "../../social/Social";
import {getPhotos} from "../../../services/service";

// styles
import "./portfolio.scss";
import "./portfolioMedia.scss";

// types
import { namePages } from "../../app/App";
import Modal from "../../modal/Modal";
interface IProps {
    onChangePage: (namePage: namePages) => void
}

interface IState {
    listPhotos: {url: string}[],
    currentSlide: string,
    selectorContainerSlider: string,
    modal: {
        isOpenModal: boolean,
        modalUrl: string
    }
}


class Portfolio extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            listPhotos: [],
            currentSlide: "01",
            selectorContainerSlider: '.slider',
            modal: {
                isOpenModal: false,
                modalUrl: ""
            }
        }
    }

    componentDidMount() {
        getPhotos("images.json")
        .then(result => {
            this.setState({listPhotos: result.images}) //временно, пока не получится вернуть оригинальные фото
        })
        .then(() => {
            const slider = tns({
                container: this.state.selectorContainerSlider,
                items: 1,
                slideBy: 1,
                autoHeight: false,
                autoWidth: false,
                autoplay: false,
                mode: "carousel",
                useLocalStorage: false,
                center: true,
                gutter: 0,
                edgePadding: 200,
                speed: 800,
                //controls
                prevButton: ".slider__prev-button",
                nextButton: ".slider__next-button",
                navContainer: ".slider__nav-container",
                responsive: {
                    320: {
                        nav: true,
                        controls: false,
                        touch: true,
                        edgePadding: 20,
                        gutter: 20,
                    },
                    700: {
                      gutter: 30
                    },
                    1000: {
                        nav: false,
                        controls: true,
                        touch: false,
                        edgePadding: 100,
                        gutter: 0
                    },
                    1200: {
                        edgePadding: 150,
                        gutter: 0
                    },
                    1750: {
                        edgePadding: 200,
                        gutter: 0
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
              nextButton = document.querySelector(".slider__next-button"),
              docElement = document.querySelector(".portfolio");

        prevButton?.addEventListener("click", this.onPrevClick);
        nextButton?.addEventListener("click", this.onNextClick);
    }
    deleteListeners = () => {
        const prevButton = document.querySelector(".slider__prev-button"),
              nextButton = document.querySelector(".slider__next-button");

        prevButton?.removeEventListener("click", this.onPrevClick)
        nextButton?.removeEventListener("click", this.onNextClick);
    }

    onPrevClick = () => this.onChangeSlide("prev");
    onNextClick = () => this.onChangeSlide("next");

    onChangeSlide = (direction: "prev" | "next") => { // меняет счетчик слайдов
        let {currentSlide: numSlide, listPhotos} = this.state;
        switch (direction) {
            case "prev": 
                if(+numSlide === 1)
                    numSlide = String(listPhotos.length > 9 ? listPhotos.length : ("0" + listPhotos.length))
                else
                    numSlide = +numSlide > 10 ? String(+numSlide-1) : ("0" + (+numSlide-1))

                this.setState(({currentSlide: numSlide}));
                break;

            case "next":
                if(+numSlide === listPhotos.length)
                    numSlide = "01";
                else
                    numSlide = +numSlide >= 9 ? String(+numSlide+1) : String("0" + (+numSlide+1));
                
                this.setState(({currentSlide: numSlide}));
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
        const {listPhotos, currentSlide: numSlide, modal: {modalUrl, isOpenModal}} = this.state;
        console.log(listPhotos)
        return(
            <>
                {isOpenModal ? <Modal url={modalUrl} onCloseModal={this.onCloseModal} /> : null}
                
                <div className="portfolio">
                    <div className="container">
                        <Header onChangePage={this.props.onChangePage}/>
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

                    <div className="container">
                        <div className="slider__nav-container" style={{width: listPhotos.length*25 + "px"}}>
                            {
                                listPhotos.map(() => <button className="slider__nav-dot"></button> )
                            }
                        </div>
                    </div>
                    
                    <div className="slider__counter">
                        <div className="slider__current">{numSlide}</div>
                        <div className="slider__counter-divider"></div>
                        <div className="slider__total">{listPhotos.length > 9 ? listPhotos.length : "0" + listPhotos.length}</div>    
                    </div>
                    
                    
                    <footer>
                        <div className="container">
                            <Social/>
                        </div>
                    </footer>
                </div>
            </>
        )
    }
}

export default Portfolio;