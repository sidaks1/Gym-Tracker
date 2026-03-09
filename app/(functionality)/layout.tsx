import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"



const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className = "font-work-sans">
        <Navbar></Navbar>

        <div className="flex">
          <Sidebar></Sidebar>

          <div className="flex-1">
            {children}
          </div>
          
        </div>

        </main>
        )
  }
  
  export default layout