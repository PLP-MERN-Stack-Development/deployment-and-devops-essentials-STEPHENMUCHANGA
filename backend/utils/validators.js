exports.validateBug=(b)=>{if(!b)return{error:'No bug provided'};
if(!b.title||b.title.trim().length<3)return{error:'Title must be at least 3 characters'};
if(!b.description)return{error:'Description is required'};
if(b.status&&!['open','in-progress','resolved'].includes(b.status))return{error:'Invalid status'};
return{error:null};};