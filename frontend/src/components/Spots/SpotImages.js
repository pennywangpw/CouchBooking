import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//iterate through spotImg to check if there's url
//if yes, return img tag
//if no, return img tag with error
const ImageCreator = ({ spotImg }) => {
    const [imgSrc, setImgSrc] = useState("")

    useEffect(() => {
        setImgSrc(spotImg)
    }, [spotImg])

    const onError = () => {
        setImgSrc("https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png")
    }
    return <img className="sImgSize" src={imgSrc} onError={onError} alt="image" />;
}
export default ImageCreator
