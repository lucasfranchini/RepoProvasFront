import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Body from "../styles/Body";

export default function Search(){
    const {type} = useParams();
    const [data,setData] = useState([])
    const [tests,setTests] = useState(false)
    useEffect(()=>{
        let getType;
        if(type==='subjects') getType = 'semesters';
        else getType = 'professors'
        console.log()
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/${getType}/complete`)
        promise.then(res=>{
            setData(res.data)
        });
        promise.catch(()=>{
            alert('Houve um erro ao carregar os dados, tente novamente')
        })
    },[type])

    function getTests(e){
        console.log(e.target.value)
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories/tests/subjects/${e.target.value}`);
        promise.then(res=>{
            setTests(true)
            setData(res.data)
        });
        promise.catch(()=>{
            alert('Houve um erro ao carregar os dados, tente novamente')
        })

    }

    return(
        <Body>
            <Link to='/'>RepoProvas</Link>
            <h1>Procurar Provas</h1>
            <List>
                {
                    tests
                    ? 
                    data.map(d=>
                        <Category key={d.id}>
                            <h1>{d.name}</h1>
                            {
                                d.tests?.map(t=>
                                    <Test key={t.id}>
                                        <TestLink href={t.link} target="_blank" rel="noreferrer">{t.name}</TestLink>
                                        <Link to='/search/professors'> - {t.professor.name}</Link>
                                    </Test>
                                    )
                            }
                        </Category>
                        )
                    :
                    type === 'subjects' ? 
                    data?.map(d=>
                        <Semester key={d.id}>
                            <h1>{d.name}</h1>
                            {
                                d.subjects.map(s=>
                                <Subject key={s.id}>
                                    <button key={s.id} onClick={getTests} value={s.id}>{s.name}</button>
                                    <span>({s.tests.length})</span>
                                </Subject>)   
                            }
                        </Semester>
                        )
                    :
                    data.map(d=><button key={d.id} onClick={getTests} value={d.id}>{d.name}</button>)    
                }
            </List>
        </Body>
    )
}

const TestLink = styled.a`
    color: #000;
`
const List = styled.ul`
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
    justify-content: space-between;
    gap: 20px;
    button{
        margin-top:10px;
        width: 225px;
        border:none;
        cursor: pointer;
        text-align:start;
        &:hover{
            text-decoration: underline;
        }
    }
    h1{
        font-size: 20px;
    }
`
const Semester = styled.div`
    width: 200px;
`
const Category = styled.div`
    width: 100%;
    h1{
        text-align:center;
        font-size: 25px;
    }
`
const Test = styled.div`
    width:500px;
    display:flex;
    justify-content: center;
    margin:10px;
    font-size: 18px;
    color: #444;
    a{
        width:200px;
        font-size:18px;
        word-break:break-all;
    }
    a:hover{
        text-decoration: underline;
    }
`
const Subject = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        font-size:13px;
        color: #444;
    }
`