import { InputLabel, MenuItem, Select, TextField,FormControl } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import validateURL from "../utils/validateUrl";
import Body from "../styles/Body";

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
    const [professors,setProfessors] = useState([]);
    const history = useHistory();
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

    function changeSubject(e){
        if(!e.target.value) return
        setTest({...test,subject:e.target.value})
        const subject = subjects.find(s=>s.name===e.target.value)
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects/${subject.id}/professors`)
        promise.then(res=>{
            setProfessors(res.data.professors)
        })
        promise.catch(res=>{
            alert("houve um erro ao carregar as informacoes")
        })
    }

    function sendTest(e){
        e.preventDefault();
        const body = {
            name:test.name,
            link:test.link,
            category: categories.find(c=>c.name===test.category),
            subject: subjects.find(s=>s.name===test.subject),
            professor: professors.find(p=>p.name===test.professor)
        }
        
        if(!body.category || !body.subject || !body.professor || !validateURL(body.link)){
            alert('por favor preencha os dados corretamente')
            return
        }

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/tests`,body)
        promise.then(res=>{
            history.push('/')
        })
        promise.catch(res=>{
            alert("houve um erro ao salvar a prova, favor tentar novamente")
        })
    }
    
    return (
        <CreateBody>
            <Link to='/'>RepoProvas</Link>
            <form onSubmit={sendTest}>
                <Input required label='Nome' value={test.name} onChange={e=>setTest({...test,name:e.target.value})} variant="outlined" margin='normal'/>
                <Input required label='Link' value={test.link} onChange={e=>setTest({...test,link:e.target.value})} variant="outlined" margin='normal'/>
                <SelectDiv variant="outlined" margin='normal' required>
                    <InputLabel >Category</InputLabel>
                    <SelectInput label='category' value={test.category} onChange={e=>setTest({...test,category:e.target.value})} >
                        <MenuItem  value={''}>None</MenuItem>
                        {categories?.map(c=><MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}
                    </SelectInput>
                </SelectDiv>
                <SelectDiv variant="outlined" margin='normal' required>
                    <InputLabel >Materias</InputLabel>
                    <SelectInput label='Subjects' value={test.subject} onChange={changeSubject} >
                        <MenuItem  value={''}>None</MenuItem>
                        {subjects?.map(s=><MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>)}
                    </SelectInput>
                </SelectDiv>
                <SelectDiv variant="outlined" margin='normal' disabled={!test.subject} required>
                    <InputLabel >Professores</InputLabel>
                    <SelectInput label='professores' value={test.professor} onChange={e=>setTest({...test,professor:e.target.value})} >
                        <MenuItem  value={''}>None</MenuItem>
                        {professors?.map(s=><MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>)}
                    </SelectInput>
                </SelectDiv>
                <Button type='submit' >Enviar Prova</Button>
            </form>
        </CreateBody>
    );
}



const CreateBody = styled(Body)`
    a{
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
const Button = styled.button`
    margin-top: 15px;
    width: 90%;
    background-color: #fff;
    height: 56px;
    font-size: 25px;
    font-family: 'Roboto', sans-serif;
    color: #333;
    border: 1px solid #adadad;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
        background-color: #adadad;
    }
`