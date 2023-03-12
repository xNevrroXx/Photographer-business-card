import { Component, CSSProperties, FC, PointerEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import Header from "../../components/header/Header";
import Social from "../../components/social/Social";
import { setLoopHorizontalWheel, setListenerDesktopHorizontalWheel, setListenerTapHorizontalWheel } from "../../components/horizontalWheelFunc/horizontalWheel";
import Modal from "../../components/modal/Modal";
import createCollageFlex from "../../components/collagePhotoPlugin/collagePhotoPluginFlex";
import { Spinner2 } from "../../components/loading/Spinner2";
import { cacheImages, getData } from "../../services/service";
import { getNumFromStr } from "../../components/collagePhotoPlugin/techFunctions";

// styles
import "./portfolio-collection.scss";
import "./portfolio-collection_Media.scss";

// types
import { TCollectionPhoto } from "../../components/types/types";
interface IPropsRedirect {
    collectionsPhotoProp: TCollectionPhoto[],
    urlJson: string,
}
interface IPropsComponent {
    nameCollection: string,
    collectionsPhoto: TCollectionPhoto[],
    urlJson: string,
}
interface IStateComponent {
    collageWrapper: HTMLElement | undefined

    data: {
        collectionsPhoto: TCollectionPhoto[],
        needfulCollection: TCollectionPhoto | undefined,
    }

    forRender: {
        listSubtitles: string[],
        styleSubtitles: CSSProperties,
        styleCollageContainer: {
            width: string
        },
    }

    triggers: {
        isContentReady: boolean,
        isSetLoopWheel: boolean,
        isLoadingImages: boolean,
    }

    zoomImage: {
        isOpen: boolean, 
        urlImage: string
    },
}

const RedirectToCollection: FC<IPropsRedirect> = ({collectionsPhotoProp, urlJson}: IPropsRedirect) => {
    const nameCollection = useParams().nameCollection;

    return (
        <>
            <PortfolioCollection collectionsPhoto={collectionsPhotoProp} urlJson={urlJson} nameCollection={nameCollection!}></PortfolioCollection>
        </>
    )
}


class PortfolioCollection extends Component<IPropsComponent, IStateComponent>{
    constructor(props: IPropsComponent) {
        super(props);

        this.state = {
            collageWrapper: undefined,

            data: {
                collectionsPhoto: [],
                needfulCollection: undefined,
            },

            forRender: {
                listSubtitles: [],
                styleSubtitles: {},
                styleCollageContainer: {
                    width: ""
                },
            },

            zoomImage: {
                isOpen: false, 
                urlImage: ""
            },

            triggers: {
                isContentReady: false,
                isSetLoopWheel: false,
                isLoadingImages: false,
            }
        }
    }

    componentDidMount() {
        if(this.props.collectionsPhoto.length == 0)
        {
            getData(this.props.urlJson)
            .then((result: {collections: TCollectionPhoto[]}) => {
                const collectionsPhotoTemp: TCollectionPhoto[] = result.collections;

                this.setState({
                    data: {
                        ...this.state.data,
                        collectionsPhoto: collectionsPhotoTemp
                    }
                })
            });
        }
        else
        {
            this.setState({
                data: {
                    ...this.state.data,
                    collectionsPhoto: this.props.collectionsPhoto
                }
            })
        }

        const mainCollageWrapper: HTMLElement | null = document.querySelector(".portfolio-collection__wrapper-collage");
        this.setState({
            collageWrapper: document.querySelector(".portfolio-collection__wrapper-photos") as HTMLElement
        }); 
        if(mainCollageWrapper) {
            setListenerDesktopHorizontalWheel(mainCollageWrapper);
            setListenerTapHorizontalWheel({
                element: mainCollageWrapper, 
                sensetivity: 20, 
                sprayingTime: 5, 
                ratio: 5
            });
        }
    }

    componentDidUpdate(prevProps: IPropsComponent, prevState: IStateComponent) {
        const {
            collageWrapper,
            
            data: {
                collectionsPhoto,
                needfulCollection,
            },

            forRender: {
                listSubtitles,
                styleSubtitles,
                styleCollageContainer,
            },

            zoomImage: {
                isOpen, 
                urlImage
            },

            triggers: {
                isContentReady,
                isSetLoopWheel,
                isLoadingImages,
            }
        } = this.state;
        

        if(this.state != prevState) {
            if(collageWrapper != prevState.collageWrapper && collageWrapper) {
                collageWrapper.addEventListener("transitionend", this.transitionEndFunc); // try to move to the mount
            }

            if(collectionsPhoto != prevState.data.collectionsPhoto && collectionsPhoto.length != 0) {
                const collectionTemp = collectionsPhoto.find(element => element.nameUrl == this.props.nameCollection);
        
                if(collectionTemp != undefined) {                
                    this.setState({
                        data: {
                            ...this.state.data,
                            needfulCollection: collectionTemp 
                        }
                    });
                    
                    cacheImages(collectionTemp.images)
                        .catch(console.log)
                        .finally(() => {
                            this.setState({
                                triggers: {
                                    ...this.state.triggers,
                                    isLoadingImages: true
                                }
                            })
                        })
                }
            }

            if(needfulCollection != prevState.data.needfulCollection && needfulCollection) {
                createCollageFlex({
                    selectorContainer: ".portfolio-collection__wrapper-photos",
                    responsive: {
                        300: {
                            heightRow: "150px",
                            rowGap: 5,
                            columnGap: 0,
                            widthColumn: "80vw"
                        },
                        500: {
                            heightRow: "220px",
                            rowGap: 0,
                            columnGap: 0,
                            widthColumn: "80vw"
                        },
                        800: {
                            heightRow: "220px",
                            rowGap: 0,
                            columnGap: 0,
                            countRows: 2
                        },
                        1000: {
                            heightRow: "250px",
                            rowGap: 5,
                            columnGap: 8,
                            // countColumns: "auto-fit",
                            countRows: 2
                        },
                        1500: {
                            heightRow: "300px",
                            rowGap: 5,
                            columnGap: 2,
                            // countColumns: "auto-fit",
                            countRows: 2
                        }
                    }
                });
            
                let subtitlesTemp: string[] = [needfulCollection.name];
                if(window.innerWidth > 800) {
                    for(let i = 0; i < needfulCollection.images.length; i++) {
                        subtitlesTemp[i] = needfulCollection.name;
                    }
                }
                this.setState({
                    forRender: {
                        ...this.state.forRender,
                        listSubtitles: subtitlesTemp
                    }
                });
            }

            if(styleCollageContainer != prevState.forRender.styleCollageContainer && isLoadingImages) {
                // const collageContainer: HTMLElement | null = document.querySelector(".collage");

                if(collageWrapper && styleCollageContainer.width != "") {
                    const coumputedWidthCollageContainer: string = styleCollageContainer.width;
        
                    this.setState({
                        forRender: {
                            ...this.state.forRender,
                            styleSubtitles: {
                                display: "flex",
                                width: `${getNumFromStr(coumputedWidthCollageContainer) / listSubtitles.length + "px"}`
                            }
                        }
                    });
                    
                    if(getNumFromStr(coumputedWidthCollageContainer) > window.innerWidth) {
                        this.setState({
                            triggers: {
                                ...this.state.triggers,
                                isSetLoopWheel: true
                            }
                        });
                        this.setLoopWheelSubtitles();
                    }

                    this.animateDisappear();
                }
            }
        }
    }

    transitionEndFunc = () => {
        const {collageWrapper, forRender: {styleCollageContainer}} = this.state;
        
        const widthCollageContainer = window.getComputedStyle(collageWrapper!).width;
        
        if(widthCollageContainer != styleCollageContainer.width) {
            this.setState({
                forRender: {
                    ...this.state.forRender,
                    styleCollageContainer: {
                        width: widthCollageContainer
                    }
                }
            })
        }
    }
    setLoopWheelSubtitles = () => {
        const {collageWrapper, forRender: {styleCollageContainer}} = this.state;

        if(collageWrapper) {
            const elements: NodeListOf<HTMLElement> | null = document.querySelectorAll(".portfolio-collection__list-subtitles");
                    
            elements.forEach((element, index) => {
                if(window.innerWidth > getNumFromStr(styleCollageContainer.width)) return;
                if(index == 0) setLoopHorizontalWheel(element, "left", -(getNumFromStr(styleCollageContainer.width) - window.innerWidth), 0);
                else setLoopHorizontalWheel(element, "right", 0, -(getNumFromStr(styleCollageContainer.width) - window.innerWidth));
            })
        }
    }

    animateDisappear() {
        const spinner: HTMLElement | null = document.querySelector(".spinner");
        
        if(spinner) {
            spinner.style.opacity = "0";
            setTimeout(() => {
                this.setState({
                    triggers: {
                        ...this.state.triggers,
                        isContentReady: true
                    }
                })
            }, 1000);
        }
    }
    
    onCloseModal = () => {
        this.setState({
            zoomImage: {
                ...this.state.zoomImage,
                isOpen: false
            }
        })
    }
    
    onOpenModal = (url: string) => {
        this.setState({
            zoomImage: {
                ...this.state.zoomImage,
                urlImage: url,
                isOpen: true
            }
        })
    }

    setListenerPointerUpZoomImage = (e: PointerEvent) => {
        const element = e.currentTarget as HTMLElement;
        const url = element.getAttribute("data-url-image");
        const pointDown = {x: e.clientX, y: e.clientY};
        
        const checkCoincidence = (e: any) => {
            const pointUp = {x: e.clientX, y: e.clientY};

            if(pointUp.x == pointDown.x && pointUp.y == pointDown.y && url) {
                this.onOpenModal(url);
            }

            element.releasePointerCapture(e.pointerId);
            element.removeEventListener("pointerup", checkCoincidence);
        }
        
        element.setPointerCapture(e.pointerId);
        element.addEventListener("pointerup", checkCoincidence);
    }

    render() {
        const {
            collageWrapper,
            
            data: {
                collectionsPhoto,
                needfulCollection,
            },

            forRender: {
                listSubtitles,
                styleSubtitles,
                styleCollageContainer,
            },

            zoomImage,

            triggers: {
                isContentReady,
                isSetLoopWheel,
                isLoadingImages,
            }
        } = this.state;

        return (
            <>
                {zoomImage.isOpen ? <Modal url={zoomImage.urlImage} onCloseModal={this.onCloseModal} /> : null}
    
                <div className="portfolio-collection">
                    <div className="container">
                        <Header/>
                    </div>
    
                    {
                        isContentReady == false ? <Spinner2 textProp="ищу фотографии" /> : null
                    }
    
                    <div style={isContentReady ? {transition: "opacity 0.2s"} : {opacity: "0", height: 0, zIndex: -100}}>  
                        <main className="portfolio-collection__wrapper-list-subtitles" >
                            <div className="portfolio-collection__list-subtitles" style={{width: styleCollageContainer.width}}>
                                {
                                    listSubtitles.length > 0 ? (
                                        listSubtitles.map((subtitle, index) => 
                                                <div
                                                    className="portfolio-collection__wrapper-subtitle" 
                                                    style={styleSubtitles}
                                                    key={`upSubtitle-${index}`}
                                                >
                                                    <div className="portfolio-collection__subtitle">
                                                        {subtitle}
                                                    </div>
                                                </div>
                                            )
                                        ) : null
                                }
                            </div>
                        </main>
                        <main className="portfolio-collection__wrapper-collage" >
                            {
                                <div className="portfolio-collection__wrapper-photos"
                                    style={styleCollageContainer}
                                >
                                    {
                                        needfulCollection != undefined ? (
                                            needfulCollection.images.map((image, index) => (
                                                <div
                                                    className="portfolio-collection__wrapper-photo"
                                                    key={`image-${index}`}
                                                    data-url-image={image.url}
                                                    onPointerDown={this.setListenerPointerUpZoomImage}    
                                                    >
                                                    <img src={image.url} alt={needfulCollection.name} className="portfolio-collection__photo" />
                                                </div>
                                            ))
                                        ) : null
                                    }
                                </div>
                            }
                        </main>
                        <main className="portfolio-collection__wrapper-list-subtitles portfolio-collection__wrapper-list-subtitles_left">
                            <div className="portfolio-collection__list-subtitles" style={{width: styleCollageContainer.width}}>
                                {
                                    listSubtitles.length > 0 ? (
                                        listSubtitles.map((subtitle, index) => 
                                                <div
                                                    className="portfolio-collection__wrapper-subtitle" 
                                                    style={styleSubtitles}
                                                    key={`upSubtitle-${index}`}
                                                >
                                                    <div className="portfolio-collection__subtitle">
                                                        {subtitle}
                                                    </div>
                                                </div>
                                            )
                                        ) : null
                                }
                            </div>
                        </main>
                    </div>
    
                    <div className="container">
                        <Social/>
                    </div>
                </div>
            </>
        )
    }
}

export {RedirectToCollection};