import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Body from "../styles/Body";

export default function Options(){
    const history = useHistory();
    const path = history.location.pathname;
    return(
        <Body>
            <Link to='/'>RepoProvas</Link>
            <h1>{path==='/options' && 'Procurar Provas'}</h1>
            <Buttons>
                <Link to={path==='/options'?'/search/professors':'/create'}>{path==='/options'?'por Professores':'Enviar Provas'}</Link>
                <Link to={path==='/options'?'/search/subjects':'/options'}>{path==='/options'?'por Materias':'Procurar Provas'}</Link>
            </Buttons>
        </Body>
    );
}

const Buttons =styled.div`
    width: 800px;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    a{
        width: 250px;
        font-size: 25px;
        background-image: linear-gradient(to bottom right,#333,#4f4f4f);
        color: #fff;
        border-radius: 5px;
        border: none;
        text-align: center;
        padding: 5px;
        cursor: pointer;
        &:hover{
            background: #222;
        }
    }
`