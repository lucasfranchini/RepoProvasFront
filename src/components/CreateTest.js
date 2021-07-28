import { TextField } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function CreateTest(){
    const [test,setTest] = useState({
        name: '',
        Link: '',
        categoryId: 0,
        subjectId:0,
        ProfessorId:0
    })
    return (
        <Body>
            <Link to='/'>RepoProvas</Link>
            <form>
                <Input required label='Nome' value={test.name} onChange={e=>setTest({...test,name:e.target.value})} variant="outlined"margin='normal'/>
                <Input required label='Link' value={test.link} onChange={e=>setTest({...test,link:e.target.value})} variant="outlined"margin='normal'/>
            </form>
        </Body>
    );
}

const Body = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    a{
        font-size: 100px;
        color: #333;
        margin-bottom: 100px;
    }
    form{
        width: 100%;
    }
`
const Input = styled(TextField)`
    margin-top: 10px;
    width: 90%;
    background-color: #fff;
`