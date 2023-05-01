import React,{ useEffect, useState } from "react";

// React Router Dom Imports
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Editor } from "../components/editor/Editor";
import { getKataByID } from "../services/katasService";
import { AxiosResponse } from "axios";
import { Kata } from "../utils/types/Kata.type";
export const KatasDetailPage = () => {

    
    let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();
    // Find id form params
    let { id } = useParams();
    const [kata, setKata] = useState<Kata | undefined>(undefined); //sin valor por defecto

     const [showSolution, setShowSolution] = useState(false)

    useEffect(() => {
        if(!loggedIn){
            return navigate('/login');
        } else {
            if(id){
                getKataByID(loggedIn, id).then((response: AxiosResponse) => {
    
                    if(response.status === 200 && response.data){
                        let kataData = {
                            _id: response.data._id,
                            name: response.data.name,
                            description: response.data.description,
                            stars: response.data.stars,
                            level: response.data.level,
                            intents: response.data.intents,
                            creator: response.data.creator,
                            solution: response.data.solution,
                            participants: response.data.participants
                        }
                        setKata(kataData);
                        console.table(kataData);
                    }

                }).catch((error) => console.error(`[Kata By Id Error]: ${error}`))

            }else{
                return navigate('/katas')
            }
        }
    }, [loggedIn]) // cada vez que cambie el valor se vuelve a ejecutar


  

    
    return (
        <div>
            <h1>
                Katas Detail Page: { id }
            </h1>
            { kata ? 
                <div className="kata-data">
                    <h2>{kata?.description}</h2>
                    <h3>Rating: {kata.stars}/5</h3>
                    <button onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? 'Show solution': 'Hide Solution'}
                </button>
                 { showSolution ? null: <Editor> 
                 {kata.solution}
                 </Editor>}

                </div>
            : 
                <div>
                    <h2>
                        Loading data...
                    </h2>
                </div>
            }

         
        </div>
    )
}