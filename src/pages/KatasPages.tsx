import React, {useEffect} from "react";

import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasPage = () => {

    let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();


    useEffect(() => {
        if(!loggedIn){
            return navigate('/login');
        }
    }, [loggedIn]) // cada vez que cambie el valor se vuelve a ejecutar

    /**
     * Method to navigate to Kata Details
     * @param id 
     */
    const navigateToKataDetail = (id: number) => {

        navigate(`/katas/${id}`)
    }
    return (
        <div>
            <h1>
               Katas Page
            </h1>
            {/*  TODO: Real Katas */}
            <ul>
                <li onClick={ () => navigateToKataDetail(1)}>
                    First Kata
                </li>
                <li onClick={ () => navigateToKataDetail(2)}>
                    Second Kata
                </li>
            </ul>
        </div>
    )
}