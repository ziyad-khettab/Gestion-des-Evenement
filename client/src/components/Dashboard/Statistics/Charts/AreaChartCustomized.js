import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";

const AreaChartCustomized = ({data,title,xAxisName,yAxixName,size}) => {
    return (
        <>
            <h4 className={"chart-title"}>{title}</h4>
            <AreaChart
                width={450}
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 0,
                }}
                size={size}
            >
                <defs>
                    <linearGradient id="colorVisites" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#356788" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#048eeb" stopOpacity={0.3}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={xAxisName}
                    tick={false}
                    padding={{
                        left: 10,
                        right: 10 ,
                        top: 10
                    }}
                />
                <YAxis />
                <Tooltip  />
                <Area type="monotone" dataKey={yAxixName} stroke="#123456" fillOpacity={1} fill="url(#colorVisites)" />
            </AreaChart>
        </>
    )
}
export default AreaChartCustomized