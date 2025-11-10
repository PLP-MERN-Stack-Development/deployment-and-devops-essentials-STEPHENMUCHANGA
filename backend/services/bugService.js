const store=require('../db/dataStore');
exports.create=async(b)=>{const nb={...b,status:b.status||'open',createdAt:new Date().toISOString()};return store.insert(nb);};
exports.getAll=async()=>store.findAll();
exports.update=async(id,ch)=>store.update(id,ch);
exports.remove=async(id)=>store.remove(id);