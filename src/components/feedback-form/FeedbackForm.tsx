import { Component, useEffect, useState } from "react";
import $ from "jquery";

//styles
import "./feedback-form.scss";
import "./feedback-form_Media.scss";

//types
import { IStateFeedbackForm } from "../../interfaces/interfaces";

//main
const FeedbackForm = () => {
    const [state, setState] = useState<IStateFeedbackForm>({
            prefferedLinkMethod: "telephone",
            name: "",
            email: "",
            phone: "",
            letter: ""
        });

    const resetForm = () => {
        setState({
            prefferedLinkMethod: "telephone",
            name: "",
            email: "",
            phone: "",
            letter: ""
        })
    }

    const onValueChange = (e: any) => {
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
                setState(state => ({...state, name: newValue}));
                break;
            case "email":
                setState(state => ({...state, email: newValue}));
                break;
            case "phone":
                setState(state => ({...state, phone: newValue}));
                break;
            case "letter":
                setState(state => ({...state, letter: newValue}));
                break;
            case "radioEmail":
                setState(state => ({...state, prefferedLinkMethod: "email"}));
                break;
            case "radioTelephone":
                setState(state => ({...state, prefferedLinkMethod: "telephone"}));
                break;
        }
    }

    const onSubmitValidate = (e: any) => {
        e.preventDefault();
        const   nameInput: any = document.querySelector("input[name='name']"),
                emailInput: any = document.querySelector("input[name='email']"),
                phoneInput: any = document.querySelector("input[name='phone']");

        let isSend: boolean = true;

        if (validatePhone(phoneInput?.value)) {
            phoneInput.classList.remove("feedback-form__wrong-value");

        } else if (!validatePhone(phoneInput?.value)) {
            phoneInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        } 
        
        if (validateEmail(emailInput?.value)) {
            emailInput.classList.remove("feedback-form__wrong-value");
        } else if (!validateEmail(emailInput?.value)) {
            emailInput.classList.add("feedback-form__wrong-value");
            isSend = false;
        }

        if(isSend) onSubmit();
        else alert("Повторите ввод данных, пожалуйста");
    }

    const validatePhone = (inputStr: string) => {
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/im;
        
        if(re.test(inputStr)) {
            return true;
        } else {
            return false;
        }
    }

    const validateEmail = (inputStr: string) => {
        const re = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        );
        
        if (re.test(inputStr)) {
            return true;
        } else {
            return false;
        }
    }

    // validateName = (inputStr: string) => {
    //     const re: RegExp = /^[a-z]/
    // }

    const onSubmit = () => {
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
                resetForm();
            }, 1000);
        }).catch((result) => {
            console.log("Something went wrong with Ajax", result)
        });
    }

    
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
                value={state.name}
                placeholder="Имя"
                required onChange={(e) => onValueChange(e)}
            />


            <label className="feedback-form__label" htmlFor="method-link" >Как удобнее ответить?</label>
            <div id="method-link" className="feedback-form__method-links">
                <input 
                    id="radioEmail"
                    type="radio"
                    name="radioEmail" 
                    checked={state.prefferedLinkMethod === "email"} 
                    onChange={(e) => onValueChange(e)} 
                />
                <label htmlFor="radioEmail">email</label>

                <input
                    id="radioTelephone"
                    type="radio" 
                    name="radioTelephone" 
                    checked={state.prefferedLinkMethod === "telephone"} 
                    onChange={(e) => onValueChange(e)} 
                />
                <label htmlFor="radioTelephone">звонок</label>
            </div>

            <input 
                type="text" 
                name="phone" 
                required={state.prefferedLinkMethod === "telephone" ? true : false} 
                placeholder="8(999)999-99-99" 
                value={state.phone} 
                onChange={(e) => onValueChange(e)}
            />

            <input 
                type="text" 
                name="email"
                required={state.prefferedLinkMethod === "email" ? true : false} 
                placeholder="email@mail.com" 
                value={state.email} 
                onChange={(e) => onValueChange(e)}
            />

            <textarea 
                name="letter" 
                id="letter" 
                cols={30} rows={10} maxLength={300}
                placeholder="Здесь что-то от себя..."
                value={state.letter} 
                required={false}
                onChange={(e) => onValueChange(e)}
            >
                {state.letter}    
            </textarea>

            <button onClick={onSubmitValidate}>Отправить</button>
        </form>
    )
}

export default FeedbackForm;