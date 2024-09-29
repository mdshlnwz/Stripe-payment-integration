import axios from 'axios'

function App() {
  const buy=async()=>{
    let response=await axios.post('http://localhost:3000/pay')
    if(response && response.status===200){
      window.location.href=response.data.url
      console.log(response.data)
    }
  }

  return (
<>
<button onClick={buy}>Click here to pay your all previos dues</button>
</>
    
  )
}

export default App
