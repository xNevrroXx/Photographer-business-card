import { Component } from "react";
import $ from "jquery";

//styles
import "./feedback-form.scss";
import "./feedback-form_Media.scss";

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
        const   emailInput: any = document.querySelector("input[name='email']"),
                phoneInput: any = document.querySelector("input[name='phone']");

        let isSend: boolean = true;

        if (this.validatePhone(phoneInput?.value)) {
            phoneInput.classList.remove("feedback-form__wrong-value");

        } else if (!this.validatePhone(phoneInput?.value)) {
            phoneInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        } 
        
        if (this.validateEmail(emailInput?.value)) {
            emailInput.classList.remove("feedback-form__wrong-value");
        } else if (!this.validateEmail(emailInput?.value)) {
            emailInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        }

        if(isSend) this.onSubmit();
        else alert("Повторите ввод данных, пожалуйста");
    }

    validatePhone = (inputStr: string) => {
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/im;
        
        if(re.test(inputStr)) {
            return true;
        } else {
            return false;
        }
    }

    validateEmail = (inputStr: string) => {
        const re = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        );
        
        if (re.test(inputStr)) {
            return true;
        } else {
            return false;
        }
    }

    onSubmit = () => {
        var formElement = $("form");

        $.ajax({
            type: "POST",
            url: "test.php", //Change
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
                    placeholder="Иван"
                    required onChange={(e) => this.onValueChange(e)}
                />


                <label className="feedback-form__label" htmlFor="method-link" >Лучше...?</label>
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

                <button onClick={this.onSubmitValidate}>Отправить</button>
            </form>
        )
    }
}

export default FeedbackForm;