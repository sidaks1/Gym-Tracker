import Navbar from "../components/Navbar"



const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main>
        <Navbar></Navbar>
        {children}



        </main>
        )
  }
  
  export default layout