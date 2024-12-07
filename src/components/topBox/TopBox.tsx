import "./TopBox.scss"
import { keywordResume } from "../../data"

const TopBox = () => {
    return (
        <div className="topBox">
            <h1>Keyword </h1>
            {keywordResume.map(keyword =>
                <div className="keyword" key={keyword.id}>
                    <span className="keywordTitle">Keyword: {keyword.keywordName}
                    </span>

                    <div className="keywordInfo">
                        <span className="resume">Resumen: {keyword.resume}</span>

                        <span className="tone">Tono: {keyword.tone}</span>

                        <span className="numMention">Numero de veces que se menciona: {keyword.numMention}</span>

                    </div>
                </div>
            )}
        </div>
    )
}

export default TopBox