import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import YearSelect from "../components/year/year";
import '../styles/addlistening.css'

const AddListening = () => {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [make, setMake] = useState([]);
    const [transmission, setTransmission] = useState([]);
    const [condition, setCondition] = useState([]);
    const [body, setBody] = useState([]);
    const [fueltype, setFueltype] = useState([]);

    function handleYearChange(event) {
        setSelectedYear(parseInt(event.target.value));
    }

    useEffect(() =>{
        async function fetch (){
            try{
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
            }catch(error){
                console.error(error);
            }
        }
    })

    return (
        <>
            <div className="div3">
                <div className="div2">
                    <div className="header">
                    <h1>Add a Vehicle Listening</h1>
                    </div>
                    <form className="add-form">
                        <div className="formdiv">
                            <div className="label-input">
                                <label htmlFor="">Title</label>
                                    <input
                                        type="text"
                                        id=""
                                        name=""
                                        maxLength="1280"
                                    />
                            </div>
                            <div className="label-input">
                                <label htmlFor="">Sub Title</label>
                                    <input
                                        type="text"
                                        id=""
                                        name=""
                                        maxLength="1280"
                                    />
                            </div>
                            <div className="label-input">
                                <label htmlFor="">Price</label>
                                    <input
                                        type="text"
                                        id=""
                                        name=""
                                        maxLength="1280"
                                    />
                            </div>
                            <div className="label-input">
                                <fieldset className="field">
                                    <label for="make" className="">Make</label>
                                    <select name="make" id="speed">
                                        <option value="" >Any</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div className="label-input">
                                <fieldset className="field">
                                    <label for="make" className="">Brand</label>
                                    <select name="make" id="speed">
                                        <option value="" >Any</option>
                                    </select>
                                </fieldset>
                            </div>

                            <div className="label-input">
                                <fieldset className="">
                                    <label for="make" className="">Fuel</label>
                                    <select name="make" id="speed">
                                        <option value="" >Any</option>
                                    </select>
                                </fieldset>
                            </div>

                            <div className="label-input">
                                <label htmlFor="">Condition:</label>
                                    <input
                                        type="text"
                                        id=""
                                        name=""
                                        maxLength="1280"
                                    />
                            </div>
                            <div className="label-input">
                                <label htmlFor="">Capacity</label>
                                    <input
                                        type="text"
                                        id=""
                                        name=""
                                        maxLength="1280"
                                    />
                            </div>
                            <div className="label-input">
                                <label htmlFor="">Selected year</label>
                                <YearSelect selectedYear={selectedYear} onYearChange={handleYearChange} />
                            </div>

                            <div className="label-input">
                                <label htmlFor="">Location</label>
                                <input
                                    type="text"
                                    id=""
                                    name=""
                                    maxLength="500"
                                />
                            </div>
                            <div className="label-input">
                                <label htmlFor="">Description:</label>
                                <textarea
                                    id=""
                                    name=""
                                ></textarea>
                            </div>
                            <div className="">
                                <button type="submit" id="b2">Submit</button> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddListening;
