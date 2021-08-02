import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Body from "../styles/Body";
import loadimg from "../assets/load.gif"

export default function Search(){
    const {type} = useParams();
    const [data,setData] = useState([]);
    const [tests,setTests] = useState(false);
    const [load,setLoad] = useState(false);
    const secondType = type==='subjects' ? 'professors':'subjects'
    useEffect(()=>{
        setLoad(true)
        let getType;
        if(type==='subjects') getType = 'semesters';
        else getType = 'professors'
        console.log()
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/${getType}/complete`)
        promise.then(res=>{
            setLoad(false)
            setData(res.data)
        });
        promise.catch(()=>{
            setLoad(false)
            alert('Houve um erro ao carregar os dados, tente novamente')
        })
    },[type])

    function getTests(e){
        setLoad(true);
        let getType;
        if(type==='subjects') getType = 'subject';
        else getType = 'professor'
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories/tests/${getType}/${e.target.value}`);
        promise.then(res=>{
            setLoad(false)
            setTests(true)
            setData(res.data)
        });
        promise.catch(()=>{
            setLoad(false)
            alert('Houve um erro ao carregar os dados, tente novamente')
        })

    }

    return(
        <Body>
            <Link to='/'>RepoProvas</Link>
            <h1>Procurar Provas</h1>
            {
                load?
                <img src={loadimg} alt='load'/>
                :
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
                                        <span to={`/search/${secondType}`}> - {type==='subjects' ? t.professor?.name:t.subject?.name}</span>
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
                    data.map(p=>
                        <Professor key={p.id}>
                            <button key={p.id} onClick={getTests} value={p.id}>{p.name}</button>
                            <span>({p.tests.length})</span>
                        </Professor>)  
                }
                </List>
            }
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
    gap: 25px;
    button{
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
    img{
        width:200px;
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
    margin:15px;
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
    margin-top:10px;
    span{
        font-size:13px;
        color: #444;
    }
`
const Professor = styled(Subject)`
    width:200px;
`