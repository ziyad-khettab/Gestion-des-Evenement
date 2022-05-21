import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect} from "react";

const BarChartCustomized = ({ourData,xAxisName,yAxisName ,size ,title})=>{
    useEffect(()=>{
        let label = document.getElementsByClassName('recharts-default-legend')
        Object.values(label).map(e=> {
            e.style.display = "none"
            return e
        })
    },[])
    return(
        <>
            <h4 className={"chart-title"}>{title}</h4>
            <BarChart
                width={450}
                height={400}
                data={ourData}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
                barSize={size}
            >
                <XAxis
                    tick={false}
                    dataKey={xAxisName}
                    scale="auto"
                    padding={{
                        left: 10,
                        right: 10 ,
                        top: 10
                    }}
                />
                <YAxis />
                <Tooltip animationEasing="ease-in-out" />
                <Legend />
                <CartesianGrid strokeDasharray="3 3"  />
                <defs>
                    <linearGradient id={"key"} x1="0%" y1="0%" x2="0%" y2={"90%"}>
                    <stop offset="5%" stopColor="#356788" />
                    <stop offset="95%" stopColor={"#048eeb"} stopOpacity="1" />
                    </linearGradient>
                </defs>
                <Bar
                    dataKey={yAxisName}
                    fillOpacity={1}
                    fill={`url(#${"key"})`}
                    background={{ fill: 'rgba(180,150,216,0.08)' }}

                />
            </BarChart>
        </>
    )
}
export default BarChartCustomized