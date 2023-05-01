import React, {useEffect, useState} from "react";

import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllKatas } from "../services/katasService";
import { AxiosResponse } from "axios";
import { Kata } from "../utils/types/Kata.type";

export const KatasPage = () => {

    let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();
    // State of component
    const [katas, setKatas] = useState([]); // initial katas is empty
    const [totalPages, setTotalPages] = useState(1); // initial default value
    const [currentPage, setCurrentPage] = useState(1); // initial default value
    
    useEffect(() => {
        if(!loggedIn){
            return navigate('/login');
        }else {
            getAllKatas(loggedIn, 2, 1).then((response: AxiosResponse) => {

                if(response.status === 200 && response.data.katas && response.data.totalPages && response.data.currentPage){
                    
                    let { katas, totalPages, currentPage} = response.data;

                    console.table(response.data);

                    setKatas(response.data.katas);
                    setTotalPages(totalPages);
                    setCurrentPage(currentPage);


                }else{
                    throw new Error(`Error obtaining katas: ${response.data}`);
                }
            }).catch((error) => console.error(`[Get All Katas Error] ${error}`));
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
           {/* En caso de que no exista katas */}
           { katas.length > 0 ? 
            <div> 
               {/* TODO:  Export to isolated Component*/}     
                 { katas.map((kata: Kata) => 
                 (
                    <div key={kata._id}>
                       <h3 onClick={() => navigateToKataDetail(kata._id)}> {kata.name}</h3>
                       <h4>{kata.description}</h4>
                       <h5>Creator:  {kata.creator}</h5>
                       <p>Rating: {kata.stars}/5</p>
                    </div>
                 ))}
            

            </div>
            :
            
                <div>
                    <h5>
                        No Katas Found
                    </h5>
                    </div>
            

        }
        </div>
    )
}