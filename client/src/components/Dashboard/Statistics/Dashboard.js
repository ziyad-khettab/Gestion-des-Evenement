import SideBar from "../Sidebar/Sidebar";
import "./style.css"
import Cards from "./Card/Cards"
import { useEffect, useState } from "react"
import AreaChartCustomized from "./Charts/AreaChartCustomized"
import BarChartCustomized from "./Charts/BarChartCustomized"
import axios from "axios";

const Dashboard = () => {
  const [cards,setCards] = useState([])
  const [eventsPerClub,setEventsPerClub] = useState([])
  const [membresPerEvent,setMembresPerEvent] = useState([])
  const [membresPerClub,setMembresPerClub] = useState([])
  const [visitors,setVisitors] = useState([])
  const [isPendingChart1,setIsPendingChart1] = useState(true)
  const [isPendingChart2,setIsPendingChart2] = useState(true)
  const [isPendingChart3,setIsPendingChart3] = useState(true)
  const [isPendingChart4,setIsPendingChart4] = useState(true)
  let data
  useEffect(()=>{
    const callAPI = async () => {
      try
        {
            const response = await axios.get(`/api/v1/statistics`)
            data = response.data
            setEventsPerClub(data.eventsPerClub)
            setIsPendingChart1(false)
            setMembresPerEvent(data.membresPerEvent)
            setIsPendingChart2(false)
            setMembresPerClub(data.membresPerClub)
            setIsPendingChart3(false)
            setVisitors(data.visitors)
            setIsPendingChart4(false)
            let arr=[]
            let card1 = {
              color:"rose",
              title:"nombre de club",
              data:data.eventsPerClub.length
            }
            let card2 = {
              color:"blue",
              title:"nombre d'evenements",
              data:data.membresPerEvent.length
            }
            let card3 = {
              color:"cyan",
              title:"nombre d'adherants",
              data:data.membresPerClub.reduce((p,c)=>p+c.totalMembres,0)
            }
            let card4 = {
              color:"yellow",
              title:"nombre de visiteurs",
              data:data.nbrVisitors
            }
            console.log("visitors => ",data.visitors)
            arr.push(card1)
            arr.push(card2)
            arr.push(card3)
            arr.push(card4)
            setCards(arr)
        }
        catch (e)
        {
            alert(e.message)
        }
    }
    callAPI()
    
  },[])
  return (
    <div className="wrapper body">
      <SideBar />
      <div className="main-container">
        <Cards cards={cards} />
        <div className="charts-container">
          <div className="charts-row">
            <div className="charts-col">
                <BarChartCustomized 
                  ourData={membresPerClub} 
                  xAxisName={"abbreviation"}
                  yAxisName={"totalMembres"} 
                  size={450/membresPerClub.length}
                  title={"Nombre de membre par club"}
                />
            </div>
            <div className="charts-col">
              <BarChartCustomized
                ourData={membresPerEvent} 
                xAxisName={"eventName"}
                yAxisName={"totalMembres"} 
                size={450/membresPerEvent.length}
                title={"Nombre de membre par événement"}
              />
            </div>
          </div>
          <div className="charts-row">
            <div className="charts-col">
              <BarChartCustomized
                ourData={eventsPerClub} xAxisName={"abbreviation"}
                yAxisName={"totalEvents"} size={450/eventsPerClub.length}
                title={"Nombre d'événements réalisés par club"}
              />
            </div>
            <div className="charts-col">
              <AreaChartCustomized
                title={"Nombre de visites du site"}
                data={visitors}
                xAxisName={"jour"}
                yAxixName={"number"}
                size={450/visitors.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
export default Dashboard;