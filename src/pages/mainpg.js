// import { error } from "jquery";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';

import '../styles/mainpage.css'
import Header from "../components/header/header";
import logo from '../media/logos/logo3.png'

const Main = () =>{
    const [Vehicle, setVehicle] = useState([]);
    // const [load, setLoad] = useState(false);
    const [make, setMake] = useState([]);
    const [transmission, setTransmission] = useState([]);
    const [condition, setCondition] = useState([]);
    const [body, setBody] = useState([]);
    const [fueltype, setFueltype] = useState([]);
    const [filteredVehicales, setFilteredVehicales] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    
    const [selectionTransmissiion, setSelectionTransmission] = useState("");
    const [selectionbody, setSelectionBody] = useState("");
    const [selectioncondition, setSelectionCondition] = useState("");
    const [selectionfuel, setSelectionFuel] = useState("");
    const [selection, setSelection] = useState("");
    const [clientId, setClientId] = useState();

    const location = useLocation();
    const navigate = useNavigate();
    


    useEffect(() => {
        async function fetch (){
            try{

                const client_id = new URLSearchParams(location.search).get('clientId');
                console.log("Client Id: {}", client_id);
                setClientId(client_id)

                const response = await axios.get("http://127.0.0.1:8085/api/v1/vehicle-genie/vehicle");
                if(response !== null){
                    const vehicle = response.data;
                    console.log("Vehicles: ", vehicle)
                    setVehicle(vehicle);
                    setFilteredVehicales(response.data);

                    const makeSelection = [  ...new Set(response.data.map(vehicle => vehicle.brand))];
                    const transmissionSelection = [  ...new Set(response.data.map(vehicle => vehicle.transmission))];
                    const conditionSelection = [  ...new Set(response.data.map(vehicle => vehicle.condition))];
                    const bodyTypeSelection = [  ...new Set(response.data.map(vehicle => vehicle.body))];
                    const fuelTypeSelection = [  ...new Set(response.data.map(vehicle => vehicle.fuel))];

                    setMake(makeSelection);
                    setTransmission(transmissionSelection);
                    setCondition(conditionSelection);
                    setBody(bodyTypeSelection);
                    setFueltype(fuelTypeSelection);
                }


                const recommendedVehicles = await axios.get(`http://127.0.0.1:8085/api/v1/vehicle-genie/vehicle/recommendations/${client_id}`)
                .then(response => {

                    if(response.data.length === 0){
                        return [{vehicle_Id: 404}]
                    }else{
                        console.log("Recommended Vehicles: ", response.data);
                        return response.data
                    }
                })

                setRecommendations(recommendedVehicles);

                let makefk = make.map((make, index) =>{
                    console.log(make);
                });


            }catch(error){
                console.error(error)
            }
        };

        fetch();
    }, []);

    const handleMakeC = (event) =>{
        setSelection(event.target.value);
    };

    const handleTransmission = (event) => {
        setSelectionTransmission(event.target.value);
    };

    const handleCondition = (event) =>{
        setSelectionCondition(event.target.value);
    };

    const handleBodyType = (event) => {
        setSelectionBody(event.target.value);
    };

    const handleFuelType = (event) => {
        setSelectionFuel(event.target.value);
    };

    const handleFilterSubmition = (event) => {
        console.log("Inside handleFilterSubmition method");
        event.preventDefault();
      
        const selectedMake = selection === "Any" ? "" : selection;
        const selectedTransmission = selectionTransmissiion === "Any" ? "" : selectionTransmissiion;
        const selectedCondition = selectioncondition === "Any" ? "" : selectioncondition;
        const selectBodyType = selectionbody === "Any" ? "" : selectionbody;
        const selectFuel = selectionfuel === "Any" ? "" : selectionfuel;
      
        console.log(event.target.value);
      
        // Filter the Vehicle array based on selected values
        let filterVehicle = Vehicle.filter(vehicle => {
            const makeMatch = selectedMake === "" || vehicle.brand === selectedMake;
            const transmissionMatch = selectedTransmission === "" || vehicle.transmission === selectedTransmission;
            const conditionMatch = selectedCondition === "" || vehicle.condition === selectedCondition;
            const bodyType = selectBodyType === "" || vehicle.body === selectBodyType;
            const matchFuel = selectFuel === "" || vehicle.fuel === selectFuel;
        
            console.log("fuel: ", matchFuel);
            console.log("bodytype: ", bodyType);
        
            return makeMatch && transmissionMatch && conditionMatch && bodyType && matchFuel;
        });
      
        console.log("Filtered list = ", filterVehicle);
        setFilteredVehicales(filterVehicle);
    }

    const topicStyle = {
        padding: '10px',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Montserrat, sans-serif'
    }

    async function goToAdd(id) {

        console.log("Go to add..!!");
        console.log("ClientId: ", clientId);
        console.log("Vehicle Id: ", id);

        navigate(`/view?clientId=${clientId}&vId=${id}`)
    }
      

    return (
        <>
            <Header/>
            <div id='filtering'>
                <div id='filters'>
                    <div id='selectMenu'>
                        <fieldset>
                            <label for="make" className="filterLable">Make</label>
                            <select name="make" id="speed" value={selection.brand} onChange={handleMakeC}>
                                <option value="" >Any</option>
                                {make.map((make, index)=>(
                                    <option key={index} value={make}>{make}</option>
                                ))}
                            </select>
                        </fieldset>
                        <fieldset>
                            <label for="transmission" className="filterLable">Transmission</label>
                            <select name="transmission" id="speed" value={selection.transmission} onChange={handleTransmission}>
                                <option value="" >Any</option>
                                {transmission.map((res, index)=>(
                                    <option key={index} value={res}>{res}</option>
                                ))}
                            </select>
                        </fieldset>
                        <fieldset>
                            <label for="condition" className="filterLable">Condition</label>
                            <select name="condition" id="speed" value={selection.condition} onChange={handleCondition}>
                                <option value="" >Any</option>
                                {condition.map((res, index)=>(
                                    <option key={index} value={res}>{res}</option>
                                ))}
                            </select>
                        </fieldset>
                        <fieldset>
                            <label for="body" className="filterLable">Body Type</label>
                            <select name="body" id="speed" value={selection.body} onChange={handleBodyType}>
                                <option value="" >Any</option>
                                {body.map((res, index)=>(
                                    <option key={index} value={res}>{res}</option>
                                ))}
                            </select>
                        </fieldset>
                        <fieldset>
                            <label for="fuel" className="filterLable">Fuel</label>
                            <select name="fuel" id="speed" value={selection.fuel} onChange={handleFuelType}>
                                <option value="" >Any</option>
                                {fueltype.map((res, index)=>(
                                    <option key={index} value={res}>{res}</option>
                                ))}
                            </select>
                        </fieldset>
                        <button onClick={handleFilterSubmition} className="filterButton">Filter</button>
                    </div>
                </div>
                <hr/>
            </div>
            
            <div class="discussions">
                <h2 id="topic" style={topicStyle}>Recommendations</h2>
                <div id="recommendation-sidescroll-container">
                    
                    {recommendations.map((vehicle, index)=> {
                        if(vehicle.vehicle_Id === 404){
                            return (
                                <h3>There are no recommendations available at the moment. You may wish to browse some vehicles that meet your requirements before checking back later.</h3>
                            )
                        }else{
                            return (
                                <div class="RecommendationContainer" key={vehicle.vehicle_Id} onClick={() => goToAdd(vehicle.vehicle_Id)}>
                                    <div class="recWrapper">
                                        <img src={logo} alt="Vehicle Genie" class="recommondation-log" />
                                        <div class="firstRescommendationWrapper">
                                            <h2>{vehicle.title}</h2>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div class="grid-container"> 
                    {filteredVehicales.map((vehicle, index)=> (
                        <div class="discussion-container" key={vehicle.vehicle_Id} onClick={() => goToAdd(vehicle.vehicle_Id)}>
                            <div class="addWrapper">
                                <img src={logo} alt="Vehicle Genie" class="logo" />
                                <div class="first-wrapper">
                                    <h2>{vehicle.title}</h2>
                                    <h4>Rs.&nbsp;{vehicle.price}.00</h4>
                                    <p>{vehicle.sub_title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Main;