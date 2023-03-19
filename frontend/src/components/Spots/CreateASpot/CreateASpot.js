import SpotForm from "../SpotForm/SpotForm";

//empty data
const CreateASpotForm = () => {

    const spot = {
        country: "",
        address: "",
        city: "",
        state: "",
        description: "",
        name: "",
        price: "",
        url1: "",
        url2: "",
        url3: "",
        url4: "",
        url5: "",
        lat: "",
        lng: ""

    }


    return (

        <SpotForm spot={spot} formType="Create a New Spot" />

    )
}


export default CreateASpotForm;
