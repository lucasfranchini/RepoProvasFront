import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Home(){
    return(
        <Body>
            <Link to='/'>RepoProvas</Link>
            <Buttons>
                <Link to='/create'>Enviar Provas</Link>
                <Link to='/search'>Procurar Provas</Link>
            </Buttons>
        </Body>
    );
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    a{
        font-size: 100px;
        color: #333;
    }
`
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