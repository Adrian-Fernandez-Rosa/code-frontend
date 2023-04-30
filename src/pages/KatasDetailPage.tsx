import React,{ useEffect } from "react";

// React Router Dom Imports
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Editor } from "../components/editor/Editor";
export const KatasDetailPage = () => {

    
    let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();
    // Find id form params
    let { id } = useParams();
    

    useEffect(() => {
        if(!loggedIn){
            return navigate('/login');
        }
    }, [loggedIn]) // cada vez que cambie el valor se vuelve a ejecutar


  

    
    return (
        <div>
            <h1>
                Katas Detail Page: { id }
            </h1>
             <Editor ></Editor>
        </div>
    )
}