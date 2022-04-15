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
    collectionsPhoto: collectionPhoto[];
    urlJson: string
}



interface IState {
    currentSlide: string,
    selectorContainerSlider: string,
    collectionsPhoto: collectionPhoto[]
    // modal: {
    //     isOpenModal: boolean,
    //     modalUrl: string
    // }
}


class PortfolioCollections extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentSlide: "01",
            selectorContainerSlider: '.slider',
            collectionsPhoto: []
            // modal: {
            //     isOpenModal: false,
            //     modalUrl: ""
            // }
        }
    }

    componentDidMount() {
        if(this.props.collectionsPhoto.length == 0) 
        {
            getPhotos(this.props.urlJson)
            .then((result: {collections: collectionPhoto[]}) => {
                const collectionsPhotoTemp: collectionPhoto[] = result.collections;

                this.setState({collectionsPhoto: collectionsPhotoTemp});
            }); 
        }
        else 
        {
            this.setState({collectionsPhoto: this.props.collectionsPhoto});
        }
    }

    render() {
        const {collectionsPhoto} = this.props;

        return(
            <>                
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
                                                <video autoPlay muted loop disablePictureInPicture playsInline className="portfolio-collections__wrapper-video">
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