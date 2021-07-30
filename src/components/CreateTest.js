import { InputLabel, MenuItem, Select, TextField,FormControl } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function CreateTest(){
    const [test,setTest] = useState({
        name: '',
        link: '',
        category: '',
        subject:'',
        Professor:''
    })
    const [categories,setCategories] = useState([]);
    const [subjects,setSubjects] = useState([]);
    useEffect(()=>{
        const res = axios.get(`${process.env.REACT_APP_API_BASE_URL}/category`)
        res.then(res=>{
            setCategories(res.data)
        })
        res.catch(res=>{
            alert("houve um erro ao carregar as informacoes")
        })

        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)

        promise.then(res=>{
            setSubjects(res.data)
        })
        promise.catch(res=>{
            alert("houve um erro ao carregar as informacoes")
        })

    },[])
    console.log(test.subject)
    return (
        <Body>
            <Link to='/'>RepoProvas</Link>
            <form >
                <Input required label='Nome' value={test.name} onChange={e=>setTest({...test,name:e.target.value})} variant="outlined" margin='normal'/>
                <Input required label='Link' value={test.link} onChange={e=>setTest({...test,link:e.target.value})} variant="outlined" margin='normal'/>
                <SelectDiv variant="outlined" margin='normal' required>
                    <InputLabel >Category</InputLabel>
                    <SelectInput label='category' value={test.category} onChange={e=>setTest({...test,category:e.target.value})} >
                        <MenuItem  value={null}>None</MenuItem>
                        {categories?.map(c=><MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}
                    </SelectInput>
                </SelectDiv>
                <SelectDiv variant="outlined" margin='normal' required>
                    <InputLabel >Subjects</InputLabel>
                    <SelectInput label='Subjects' value={test.subject} onChange={e=>setTest({...test,subject:e.target.value})} >
                        <MenuItem  value={null}>None</MenuItem>
                        {subjects?.map(s=><MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>)}
                    </SelectInput>
                </SelectDiv>
                
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        
    }
    
`
const Input = styled(TextField)`
    width: 90%;
    background-color: #fff;
`
const SelectInput = styled(Select)`
    width: 100%;
    background-color: #fff;
    height: 56px;
`
const SelectDiv = styled(FormControl)`
    width: 90%;
`