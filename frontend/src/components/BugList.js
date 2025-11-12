import React from'react';
import {fetchBugs} from'../api/api';
export default function BugList({bugs,onUpdate,onDelete}){if(!bugs.length)return<div>No bugs reported</div>;
return<ul>{bugs.map(b=>(<li key={b.id}><h4>{b.title}</h4><p>{b.description}</p><button onClick={()=>onUpdate(b.id,{status:'resolved'})}>Resolve</button><button onClick={()=>onDelete(b.id)}>Delete</button></li>))}</ul>;}