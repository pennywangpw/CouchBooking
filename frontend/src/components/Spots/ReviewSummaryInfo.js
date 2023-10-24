

const ReviewSummaryInfo = ({ spot }) => {

    //reviewChecker & divider(dot)
    let avgStars = spot.avgRating;
    let divider = " ";
    let reviewNum = spot.numReviews
    let reviewChecker;
    if (reviewNum === 1) {
        reviewChecker = "review"
        avgStars = avgStars.toFixed(2)
        divider = "·"
    } else if (reviewNum === 0) {
        reviewChecker = "New"
        avgStars = ""
        reviewNum = ""
    } else {
        reviewChecker = ' reviews'
        avgStars = avgStars.toFixed(2)
        divider = "·"
    }


    return (
        <div className="reviewInfo">
            <label className="actLabel"><i className="fa-solid fa-star"></i>{avgStars} </label>
            <label className="actLabel">{divider} </label>
            <label className="actLabel">{reviewNum} {reviewChecker}</label>
        </div>
    )
}


export default ReviewSummaryInfo;
