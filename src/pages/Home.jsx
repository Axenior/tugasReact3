import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h1>Ini Home</h1>
      <div className="mt-4">
        <button className="p-2 bg-blue-500 rounded" onClick={() => navigate("/prodi")}>Prodi</button>
      </div>
    </div>
  )
}

export default Home