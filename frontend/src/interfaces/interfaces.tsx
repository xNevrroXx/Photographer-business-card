type TRoutes = {path: string, name: string, Component: any, props?: {[nameProp: string]: any}}[]

type TNamePages = "aboutMe" | "portfolio" | "contacts";

type TCollectionPhoto = {
    nameUrl: string,
    name: string,
    mainImgUrl: string,
    images: {
        url: string
    }[]
};

type TLinkMethods = "email" | "telephone"; // for feedback form

// state
interface IStateApp {
    visiblePage: TNamePages,
	collectionsPhoto: TCollectionPhoto[],
	isLoading: boolean
}

interface IStateFeedbackForm {
    preferredLinkMethod: TLinkMethods,
    name: string,
    email: string,
    phone: string,
    letter: string
}

interface IStatePortfolioCollections {
    collectionsPhoto: TCollectionPhoto[]
}


// props
interface IPropsSpinner {
    textProp: string
}

interface IPropsZoomedPhoto {
    url: string,
    onCloseModal: () => void
}

interface IPropsPortfolioCollections {
    collectionsPhoto: TCollectionPhoto[];
    urlJson: string
}

export type {TRoutes, TNamePages, TCollectionPhoto, TLinkMethods, IStateApp, IStateFeedbackForm, IStatePortfolioCollections, IPropsSpinner, IPropsZoomedPhoto, IPropsPortfolioCollections}