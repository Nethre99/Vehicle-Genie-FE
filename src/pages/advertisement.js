import React, { useEffect, useState } from "react";
import Header from "../components/header/header";
import '../styles/advertisement.css'
import { useLocation } from "react-router-dom";
import axios from "axios";


const Advertisement = () => {

    const [vehicle, setVehicle] = useState([]);

    const location = useLocation();

    useEffect(() => {
        async function fetch (){
            try{

                const client_Id = new URLSearchParams(location.search).get('clientId');
                const veh_id = new URLSearchParams(location.search).get('vId');

                console.log("client Id: ", client_Id);
                console.log("Vehicle Id: ", veh_id);

                const vehicleModel = await axios.post(`http://127.0.0.1:8085/api/v1/vehicle-genie/add/${client_Id}/${veh_id}`)
                .then(response => {
                    console.log(response);
                    return response.data;
                })

                console.log("Rsponse Vehicle: ", vehicleModel);

            }catch(error){
                console.log(error);
            }
        };

        fetch();
    }, [])


    return (
        <>
            <Header/>
            <div class="container">
                <h1>Topic</h1>
                <div className="wraper1">
                    <img src="https://via.placeholder.com/800x400" alt="Ad Image" class="ad-image"/>
                    <div className="wraper">
                        <h1 className="descriptionTitile" >Luxury Car for Sale</h1>
                        <span className="derscription">This is a beautiful luxury car with low mileage and all the latest features. It's in excellent condition and ready for a new owner.</span>
                        <h2 class="ad-price">$25,000</h2>
                        <div class="ad-contact">
                            <span>Contact Seller:</span> <a href="mailto:seller@example.com">seller@example.com</a>
                        </div>
                    </div>
                </div>
                <p>Sub Topic</p>
            </div>
        </>
    )
} 

export default Advertisement;