import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../header/Header";
import Social from "../../social/Social";
import { collectionPhoto } from "../../types/types";

//styles
import "./portfolio-collection.scss";

//types
interface IProps {
    collectionsPhoto: collectionPhoto[]
}

const PortfolioCollection: FC<IProps> = ({collectionsPhoto}) => {
    const nameUrl = useParams().collectionName;

    let numCollection: number = 0;
    useEffect(() => {
        collectionsPhoto.forEach((element, index) => {
            if(element.nameUrl === nameUrl) {
                numCollection = index;
                return;
            }
        });
        console.log(numCollection);
    }, []);

    const collection = collectionsPhoto[numCollection];

    return (
        <div className="portfolio-collection">
            <div className="container">
                <Header/>
            </div>            

            <div className="portfolio-collection__wrapper-photos"
                style={{width: `calc(${collection.images.length/2}*650px)`}}
            >
                {
                    collection.images.map(image => (
                        <div 
                            className="portfolio-collection__wrapper-photo" 
                            key={image.url}
                            style={{flex: `3 3 calc((100% / ${collection.images.length / 2}) - (3 * 2px))`}}>
                            <img src={image.url} alt={collection.name} className="portfolio-collection__photo"/>
                        </div>
                    ))
                }
            </div>

            <div className="container">
                <Social/>
            </div>
        </div>
    )
}

export default PortfolioCollection;