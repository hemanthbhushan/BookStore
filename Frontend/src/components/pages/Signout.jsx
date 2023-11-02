import React from 'react'

const Signout = () => {
       
       const signOut = ()=>{
        console.log("first")
        localStorage.clear();
       }
    
  return (
    <div>
       <button onClick={signOut}>Signout</button>
    </div>
  )
}

export default Signout