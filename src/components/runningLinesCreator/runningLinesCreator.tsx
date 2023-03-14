// styles
import "./running-line.scss";
import "./running-line_Media.scss";

function runningLinesCreator(countWords: number, direction: "toRight" | "toLeft", word: string): JSX.Element[] {
    const partsLine: JSX.Element[] = [];

    for (let i = 1; i <= 3; i++) {
        const repeatWords: JSX.Element[] = [];

        for (let j = 0; j < countWords; j++) {
            repeatWords.push(<span key={j + direction + "word"}>{word}</span>);
        }

        partsLine.push(<div key={i + direction + "container"} className={`running-line__${i}`}>{repeatWords}</div>)
    }

    return partsLine;
}

export {runningLinesCreator};
export default runningLinesCreator;