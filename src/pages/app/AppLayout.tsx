import Map from "./Map"
import Sidebar from "./Sidebar"

const AppLayout = () => {
  return (
    <div className="flex relative flex-col-reverse min-h-[100svh] md:flex-row">
        <Sidebar />
        <Map />
    </div>
  )
}

export default AppLayout