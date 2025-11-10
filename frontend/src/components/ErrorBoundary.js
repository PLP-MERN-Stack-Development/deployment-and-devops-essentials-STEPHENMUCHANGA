import React from'react';
export default class ErrorBoundary extends React.Component{constructor(p){super(p);this.state={hasError:false};}
static getDerivedStateFromError(){return{hasError:true};}
componentDidCatch(e){console.error('ErrorBoundary:',e);}
render(){return this.state.hasError?<div>Something went wrong.</div>:this.props.children;}}