import { FC } from "react";
// styles
import "./spinner.scss";

//types
interface IProps {
    textProp: string
}

const Spinner: FC<IProps> = ({textProp}) => {

    return (
        <div className="circle__svg spinner" style={{transitionProperty: "opacity, transform", transition: "2s"}}>
            <svg x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enableBackground="new 0 0 200 300" xmlSpace="preserve">
                <defs>
                    <path id="circlePath" fill="none" d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "/>
                </defs>

                <circle cx="150" cy="100" r="75" fill="none"/>
                <g>
                    <use xlinkHref="#circlePath" fill="none"/>
                    <text x="100px" id="text-dyno-width" fill="black">
                        <textPath xlinkHref="#circlePath" startOffset="-20%" >{textProp}</textPath>
                        <textPath xlinkHref="#circlePath" startOffset="55%" >{textProp}</textPath>
                    </text>
                </g>
            </svg>
        </div>
    )
}

export {Spinner};