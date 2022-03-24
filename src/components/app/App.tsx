import React, { Component } from 'react';

//pages
import AboutMe from '../pages/about-me/AboutMe';
import Contacts from '../pages/contacts/Contacts';
import Portfolio from '../pages/portfolio/Portfolio';

// styles
import "./app.scss";


export type namePages = "aboutMe" | "portfolio" | "contacts";

interface IState {
    visiblePage: namePages
}
interface IProps {

}

class App extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			visiblePage: "aboutMe"
		}
	}

	onChangePage = (namePage: namePages) => {
		this.setState({visiblePage: namePage})
    }

	render() {
		const {visiblePage} = this.state;

		const aboutMe = visiblePage === "aboutMe" ? <AboutMe onChangePage={this.onChangePage}/> : null,
			  contacts = visiblePage === "contacts" ? <Contacts /> : null,
			  portfolio = visiblePage === "portfolio" ? <Portfolio onChangePage={this.onChangePage}/> : null;
		
		return (
			<div className="App">
				{aboutMe}
				{contacts}
				{portfolio}
			</div>
		);
	}
}

export default App;
