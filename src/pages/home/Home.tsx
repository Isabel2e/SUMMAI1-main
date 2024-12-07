
import ChartBox from "../../components/ChartBox/ChartBox"
import TopBox from "../../components/topBox/TopBox"
import InfoTable from "../../components/InformationTable/InfoTable"
import "./home.scss"
const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox/>
      </div>
      <div className="box box2"><ChartBox/></div>
      <div className="box box3"><InfoTable/></div>
      
    </div>
  )
}

export default Home