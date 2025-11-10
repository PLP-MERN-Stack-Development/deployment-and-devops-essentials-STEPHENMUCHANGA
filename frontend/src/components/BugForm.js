import React,{useState}from'react';
export default function BugForm({onCreate}){const[title,setTitle]=useState('');const[description,setDescription]=useState('');
return(<form onSubmit={e=>{e.preventDefault();if(title.trim().length<3)return;onCreate({title,description});setTitle('');setDescription('');}}>
<input placeholder='Title'value={title}onChange={e=>setTitle(e.target.value)}/>
<textarea placeholder='Description'value={description}onChange={e=>setDescription(e.target.value)}/>
<button type='submit'>Report Bug</button></form>);}