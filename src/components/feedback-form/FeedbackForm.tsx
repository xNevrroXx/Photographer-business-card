import { Component } from "react";
import $ from "jquery";

//styles
import "./feedback-form.scss";
import "./feedback-form_Media.scss";
import Validate from "../../services/validateClass";

//types
type linkMethods = "email" | "telephone";

interface IProps {
    prefferedLinkMethod: linkMethods
}

interface IState {
    prefferedLinkMethod: linkMethods,
    name: string,
    email: string,
    phone: string,
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
            phone: "",
            letter: ""
        }
    }

    componentDidMount() {
        if(FeedbackForm.defaultProps.prefferedLinkMethod !== this.props.prefferedLinkMethod)
            this.setState({prefferedLinkMethod: this.props.prefferedLinkMethod})
    }

    resetForm = () => {
        this.setState({
            prefferedLinkMethod: "telephone",
            name: "",
            email: "",
            phone: "",
            letter: ""
        })
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
            case "phone":
                this.setState({phone: newValue});
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

    onSubmitValidate = (e: any) => {
        e.preventDefault();
        const   nameInput: any = document.querySelector("input[name='name']"),
                emailInput: any = document.querySelector("input[name='email']"),
                phoneInput: any = document.querySelector("input[name='phone']");

        const validate: Validate = new Validate;
        let isSend: boolean = true;

        if(validate.validateName(nameInput.value)) {
            nameInput.classList.remove("feedback-form__wrong-value");
        } else if(nameInput.required || nameInput.value.length > 0) {
            nameInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        } else {
            nameInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        }

        if (validate.validatePhone(phoneInput.value)) {
            phoneInput.classList.remove("feedback-form__wrong-value");
        } else if(phoneInput.required || phoneInput.value.length > 0) {
            phoneInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        } else {
            phoneInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        }
        
        if (validate.validateEmail(emailInput.value)) {
            emailInput.classList.remove("feedback-form__wrong-value");
        } else if(emailInput.required || emailInput.value.length > 0) {
            emailInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        } else {
            emailInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        }

        if(isSend) this.onSubmit();
        else alert("Повторите ввод данных, пожалуйста");
    }



    // validateName = (inputStr: string) => {
    //     const re: RegExp = /^[a-z]/
    // }

    onSubmit = () => {
        var formElement = $("form");

        $.ajax({
            type: "POST",
            url: "mailer.php", //Change
            data: formElement.serialize()
        }).done(() =>  {
            console.log(formElement.serialize());
            alert("Спасибо!");
            setTimeout(() => {
                // Done Functions
                formElement.trigger("reset");
                this.resetForm();
            }, 1000);
        }).catch((result) => {
            console.log("Something went wrong with Ajax", result)
        });
    }

    render() {
        const {prefferedLinkMethod, name, email, phone, letter} = this.state;
        
        return (
            <form
                // action="test.php"
                // method="POST"
                className="feedback-form"
            >
                {/* Hidden Required Fields*/}
                <input type="hidden" name="project_name" value="Konstantin Photo" />
                <input type="hidden" name="admin_email" value="bif27948@uooos.com" />
                <input type="hidden" name="form_subject" value="Contact page" />
                {/* <!-- END Hidden Required Fields --> */}


                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Имя"
                    required onChange={(e) => this.onValueChange(e)}
                />


                <label className="feedback-form__label" htmlFor="method-link" >Как удобнее ответить?</label>
                <div id="method-link" className="feedback-form__method-links">
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
                    name="phone" 
                    required={prefferedLinkMethod === "telephone" ? true : false} 
                    placeholder="8(999)999-99-99" 
                    value={phone} 
                    onChange={(e) => this.onValueChange(e)}
                />

                <input 
                    type="text" 
                    name="email"
                    required={prefferedLinkMethod === "email" ? true : false} 
                    placeholder="email@mail.com" 
                    value={email} 
                    onChange={(e) => this.onValueChange(e)}
                />

                <textarea 
                    name="letter" 
                    id="letter" 
                    cols={30} rows={10} maxLength={300}
                    placeholder="Здесь что-то от себя..."
                    value={letter} 
                    required={false}
                    onChange={(e) => this.onValueChange(e)}
                >
                    {letter}    
                </textarea>

                <button onClick={this.onSubmitValidate}>Отправить</button>
            </form>
        )
    }
}

export default FeedbackForm;