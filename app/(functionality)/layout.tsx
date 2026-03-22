import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"



const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className = "flex flex-col font-work-sans h-screen">
          <Navbar></Navbar>

          <div className="flex flex-1 overflow-hidden">
            <Sidebar></Sidebar>

            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          
          </div>

        </main>
        )
  }
  
  export default layout