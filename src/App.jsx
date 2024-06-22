import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'



function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed , setnumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState (true);
  const [password , setPassword] = useState("");

  const passwordGenerator = useCallback( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed)str+="0123456789"
    if(charAllowed)str+="+_)(*&^%$#@!~?/>.<,':;}]{[|\=-`]}"

    for(let i=1 ; i<=length ; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }
    setPassword(pass)

    
  } , [length , numberAllowed , charAllowed , setPassword])
  useEffect(()=>{
    passwordGenerator()
  } , [length , numberAllowed , charAllowed , passwordGenerator])

  const passwordRef = useRef(null);

  const coptToClipboard = () => {
    window.navigator.clipboard.writeText(password);
  }

  
  

  return (
    <div style = {{height:"100vh",display:"flex",alignItems:"center"}}className='flex w-full  justify-center bg-black' id='mainBox'>
      <div  style = {{width:"60%",height:"13rem" , flexDirection:"column", display:"flex", justifyContent:"center", backgroundColor:"teal", alignItems:"center",borderRadius:"1rem"}}id='box2' >
        <h1 className='text-white px-3 py-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 ' >
          <input type="text"
                value = {password}
                readOnly
                className='px-4 py-2'
                placeholder='Password'
                ref={passwordRef}
          />

          <button 
          className='p-2 bg-gray-500 text-white'
          onClick={coptToClipboard}
          >Copy</button>
        </div>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 'id='box'>
            <input type="range" 
                   min = {6}
                   max = {30}
                   value={length}
                   className='cursor-pointer'
                   onChange={(e) => {setlength(e.target.value)}}
            /> 
            <label className='text-white mx-5'>Length : {length}</label>
            <input type="checkbox" 
             defaultChecked = {numberAllowed}
             onChange={() => {setnumberAllowed((prev)=>!prev)}}
            />
            <label className='text-white mx-2'>Number</label>

            <input type="checkbox" 
             defaultChecked = {charAllowed}
             onChange={() => {setCharAllowed((prev)=>!prev)}}
            />
            <label className='text-white mx-2'>Characters</label>
          </div>

      </div>
    </div>
  )
}

export default App
