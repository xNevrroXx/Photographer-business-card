import { FC, useEffect, useState } from "react";
import "./Spinner.scss";

//types
interface IProps {
    textProp: string
}
type charData = {
    char: string,
    firstOffsetChar: number
}

const Spinner: FC<IProps> = ({textProp}) => {
    const [chars, setChars] = useState<charData[]>([]);
    let [coefficient, setCoefficient] = useState<number>(0);
    
    useEffect(() => {
        let space = 0;
        let wasSpace = false;
        let letterSpacing = 0;
        for (let i = 0; i < textProp.length; i++) {
            const char = textProp[i];
            console.log(char)
            if(char == " ") wasSpace = true;
            if(wasSpace) {
                wasSpace = false;
                space += 3;
                // setChars( chars.push({char: char, firstOffsetChar: i+letterSpacing+space}) );
            }

            chars.push({char: char, firstOffsetChar: i+letterSpacing+space})
            letterSpacing += 4;
        }
        console.log(chars)


        let coefficient = 0;
        const spinnerLooping = (coefficient: number) => {
            setTimeout(() => {
                setCoefficient(coefficient);
                console.log(coefficient)

                if(coefficient == 100) coefficient = 0;
                else coefficient++;
                spinnerLooping(coefficient);
            }, 25);
        }
 
        spinnerLooping(coefficient);
    }, [])

    return (
        <div className="spinner">
            <svg viewBox="0 0 70 70" width="150px">
            <defs>
                <path d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0" fill="lightpink" id="tophalf"/>
            </defs>
            <text /* styles={{transform: `rotate(${coefficient}deg)`}} */>
                {
                    chars.map((charData, index) => (
                        <textPath 
                            xlinkHref="#tophalf" 
                            startOffset={`${(charData.firstOffsetChar+coefficient)%100}%`}  
                            style={{height: "10px", width: "10px", display: "block"}}
                            key={index}
                        >
                            {charData.char}
                        </textPath>
                    ))
                }
            </text>
            </svg>

            {/* <div className="disk">
                <b styles={{transform: "rotate(345deg)"}}>П</b>
                <b styles={{transform: "rotate(351deg)"}}>р</b>
                <b styles={{transform: "rotate(357deg)"}}>и</b>
                <b styles={{transform: "rotate(3deg)"}}>в</b>
                <b styles={{transform: "rotate(9deg)"}}>е</b>
                <b styles={{transform: "rotate(15deg)"}}>т</b>
            </div> */}
        </div>
    )
}

export {Spinner};