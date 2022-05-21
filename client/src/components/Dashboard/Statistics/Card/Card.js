const Card = ({title,data,color}) => {
    return (
        <div className={`stat-card ${color}`}>
            <h5 className="title">{title}</h5>
            <h6 className="data">{data}</h6>
        </div>
    );
}
export default Card