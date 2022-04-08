import { Component } from "react";

import Header from "../../components/header/Header";
import Social from "../../components/social/Social";
import {getPhotos} from "../../services/service";
import Modal from "../../components/modal/Modal";

// styles
import "./portfolio-collections.scss";
import "./portfolio-collections_Media.scss";
import { Link } from "react-router-dom";
import { collectionPhoto } from "../../components/types/types";

// types
interface IProps {
    // onChangePage: (namePage: namePages) => void
}



interface IState {
    collectionsPhoto: collectionPhoto[];
    currentSlide: string,
    selectorContainerSlider: string,
    // modal: {
    //     isOpenModal: boolean,
    //     modalUrl: string
    // }
}


class PortfolioCollections extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            collectionsPhoto: [],
            currentSlide: "01",
            selectorContainerSlider: '.slider',
            // modal: {
            //     isOpenModal: false,
            //     modalUrl: ""
            // }
        }
    }

    componentDidMount() {
        getPhotos("imagesTest.json")
        .then(result => {
            this.setState({collectionsPhoto: result.collections});
        })

        // document.addEventListener("mousemove", function(e: any) {
        //     if(e.target != null && e.target.classList.contains("portfolio-collections__darkening"))
        //         e.target.style.opacity = 0.8;
        //     else {

        //     }
        // })
    }

    // onCloseModal = () => {
    //     this.setState({
    //         modal: {
    //             ...this.state.modal,
    //             isOpenModal: false
    //         }
    //     });
    // }
    // onOpenModal = (url: string) => {
    //     this.setState({
    //         modal: {
    //             modalUrl: url,
    //             isOpenModal: true
    //         }
    //     });
    // }

    render() {
        const {collectionsPhoto} = this.state;

        return(
            <>
                {/* {isOpenModal ? <Modal url={modalUrl} onCloseModal={this.onCloseModal} /> : null} */}
                
                <div className="portfolio-collections">
                    <div className="container">
                        <Header/>

                        <main>
                            <div className="portfolio-collections__wrapper-collections">
                                <div className="portfolio-collections__wrapper-title">
                                    <h2 className="portfolio-collections__title">
                                        фотоколлекции
                                    </h2>
                                </div>

                                {
                                    collectionsPhoto.map((collection, index) => {
                                        return (
                                            <Link 
                                                to={`/Portfolio/${collection.nameUrl}`} 
                                                className="portfolio-collections__wrapper-collection"
                                                key={`collection-${index}`}
                                            >
                                                <div className="portfolio-collections__darkening"></div>
                                                <h3 className="portfolio-collections__title-collection">{collection.name}</h3>
                                                <video autoPlay muted loop playsInline className="portfolio-collections__wrapper-video">
                                                    <source src={collection.mainImgUrl}/>
                                                </video>
                                            </Link>
                                        )
                                    })
                                }
                                {/* <div className="portfolio-collections__decorate-corner"></div> */}
                            </div>
                        </main>

                        <footer>
                            <Social/>
                        </footer>
                    </div>
                </div>
            </>
        )
    }
}

export default PortfolioCollections;