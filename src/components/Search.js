import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Body from "../styles/Body";

export default function Search(){
    const {type} = useParams();
    const [data,setData] = useState([])
    useEffect(()=>{
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/${type}`)
        promise.then(res=>{
            setData(res.data)
        });
        promise.catch(()=>{
            alert('Houve um erro ao carregar os dados, tente novamente')
        })
    },[type])
    console.log(data)
    return(
        <Body>
            <Link to='/'>RepoProvas</Link>
            <h1>Procurar Provas</h1>
            <List>
                {data.map(d=><div key={d.id}>{d.name}</div>)}
            </List>
        </Body>
    )
}

const List = styled.ul`
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    justify-content: space-between;
    gap: 20px;
    div{
        width: 200px
    }
`