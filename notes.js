// console.log(allspots)
    //change promise into json object & save in array
    let allspotsarr =[]

    allspots.forEach(spot=>{allspotsarr.push(spot.toJSON())})
    console.log(allspotsarr)

    //nested loop to get each spot > review > stars
    allspotsarr.forEach(spot=>{
        if(spot.Reviews.length > 0){
        // console.log("每一個spot: ",spot)
        // console.log("每一個start:",spot.Reviews)
        let total = 0
        spot.Reviews.forEach(review=>{
            console.log("評價: ",review.stars)
            console.log("check the type: ", typeof review.stars)
            total += review.stars
        })
        // console.log("total: ", total)
        // console.log("all the reviews: ",spot.Reviews.length)
        let avgRating = total/ spot.Reviews.length
        console.log(avgRating)
    }

    })
    res.json(allspots)



// //solution1
// router.get('/', async (req,res)=>{
//     const spots = await Spot.findAll()
//     let spotsArray= []
//     for(let spot of spots){
//         console.log('spot: ', spot)
//         const spotJSON = spot.toJSON()

//         let reviews = await Review.findAll({
//             where:{spotId: spotJSON.id},
//             attributes:[[Sequelize.fn('AVG', Sequelize.col('stars')),'avRating']]
//         })
//         spotJSON.avgRating = reviews[0].toJSON().avgRating
//         spotsArray.push(spotJSON)
//     }

//     return res.json({Sport: spotsArray})
// })



const postmanobj ={
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "avgRating": 4.5,
        "previewImage": "image url"
    }
