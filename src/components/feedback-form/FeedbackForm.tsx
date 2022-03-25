import { ExecFileOptionsWithStringEncoding } from "child_process";
import { Component, FC } from "react";

//styles
import "./FeedbackForm.scss";

//types
type linkMethods = "email" | "telephone";

interface IProps {
    prefferedLinkMethod: linkMethods
}

interface IState {
    prefferedLinkMethod: linkMethods,
    name: string,
    email: string,
    telephone: string,
    letter: string
}

//main
class FeedbackForm extends Component<IProps, IState> {
    static defaultProps = {
        prefferedLinkMethod: "telephone"
    }
    constructor(props: IProps) {
        super(props);

        this.state = {
            prefferedLinkMethod: "telephone",
            name: "",
            email: "",
            telephone: "",
            letter: ""
        }
    }

    componentDidMount() {
        if(FeedbackForm.defaultProps.prefferedLinkMethod !== this.props.prefferedLinkMethod)
            this.setState({prefferedLinkMethod: this.props.prefferedLinkMethod})
    }

    onChangePreffered = (e: any) => {
        console.log(e)
    }

    onValueChange = (e: any) => {
        const nameState: string = e.target.name,
              newValue: any = [e.target.value];
        
        // if( nameState === "prefferedLinkMethod" ||
        //     nameState === "name" ||
        //     nameState === "email" ||
        //     nameState === "telephone" ||
        //     nameState === "letter" ) 
        //     {
        //         this.setState({ [nameState]: newValue });
        //     }
        
        switch(nameState) {
            case "name": 
                this.setState({name: newValue});
                break;
            case "email":
                this.setState({email: newValue});
                break;
            case "telephone":
                this.setState({telephone: newValue});
                break;
            case "letter":
                this.setState({letter: newValue});
                break;
            case "radioEmail":
                this.setState({prefferedLinkMethod: "email"});
                break;
            case "radioTelephone":
                this.setState({prefferedLinkMethod: "telephone"});
                break;
        }
    }


    render() {
        const {prefferedLinkMethod, name, email, telephone, letter} = this.state;
        
        return (
            <form className="feedback-form" action="" autoComplete="on">
                <input type="text" name="name" value={name} placeholder="Иван" required onChange={(e) => this.onValueChange(e)}/>


                <h3>Лучше...?</h3>
                <div className="feedback-form__wrapper">
                    <input 
                        id="radioEmail"
                        type="radio" 
                        name="radioEmail" 
                        checked={prefferedLinkMethod === "email"} 
                        onChange={(e) => this.onValueChange(e)} 
                    />
                    <label htmlFor="radioEmail">email</label>

                    <input
                        id="radioTelephone"
                        type="radio" 
                        name="radioTelephone" 
                        checked={prefferedLinkMethod === "telephone"} 
                        onChange={(e) => this.onValueChange(e)} 
                    />
                    <label htmlFor="radioTelephone">звонок</label>
                </div>

                <input 
                    type="text" 
                    name="telephone" 
                    required={prefferedLinkMethod === "telephone" ? true : false} 
                    placeholder="8(999)999-99-99" 
                    value={telephone} 
                    onChange={(e) => this.onValueChange(e)}
                />

                <input 
                    type="email" 
                    name="email" 
                    required={prefferedLinkMethod === "email" ? true : false} 
                    placeholder="ivanIvanov@gmail.com" 
                    value={email} 
                    onChange={(e) => this.onValueChange(e)}
                />

                <textarea 
                    name="letter" 
                    id="letter" 
                    cols={30} rows={10} maxLength={300}
                    value={letter} 
                    required={false}
                    onChange={(e) => this.onValueChange(e)}
                >
                    {letter}    
                </textarea>

                <button>Отправить</button>
            </form>
        )
    }
}

export default FeedbackForm;