// 1. pass
//create A spot info -- city, avgRating, price

const SpotInfo = ({ spotObj }) => {

    if (spotObj.avgRating === undefined) {
        spotObj.avgRating = "New"
    } else {
        if (typeof spotObj.avgRating === "number") {
            spotObj.avgRating = (spotObj.avgRating.toFixed(2))

        }
    }

    return (
        <div className="cityNpriceNrate">
            <div className="city">{spotObj.city},{spotObj.state}</div>
            <div className="rate"><i className="fa-solid fa-star"></i> {spotObj.avgRating}</div>
            <div className="price">
                ${spotObj.price}
                <label for="price"> night</label>
            </div>
        </div>
    )

}
export default SpotInfo;
