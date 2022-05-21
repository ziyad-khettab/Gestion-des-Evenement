import Card from "./Card"

const Cards = ({cards}) => {
    return (
        <div className="cards">
          {
            cards.map(e=>(
              <Card 
                title={e.title}
                data={e.data}
                color={e.color}
              />
            ))
          }
        </div>
    );
}
export default Cards