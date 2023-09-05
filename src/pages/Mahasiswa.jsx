import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import prodi from "../api/prodi.json"

const App = () =>{
    const NPM = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [mahasiswa, setMahasiswa] = useState(null)

    const fetchData = async () => {
        setData(prodi[0])
    }
    
    useEffect(() =>{
        fetchData()
    })
    
    function getKodeProdi(){
        return parseInt(NPM.id.slice(4,6))
    }
    
    function getTahunMasuk(){
        return '20' + NPM.id.slice(0,2)
    }

    function getKodeUnik(){
        return NPM.id.slice(-4)
    }
    
    const cekMahasiswa = () =>{
        const namaProdi = data?.find((data) => data.kode_prodi === getKodeProdi())
        const tahunMasuk = namaProdi?.mahasiswa.find((mahasiswa) => mahasiswa.tahun_masuk === getTahunMasuk())
        if (tahunMasuk != null){
            const mahasiswa = Object.keys(tahunMasuk?.data).map((kelas, index) => (
                tahunMasuk.data[kelas].find((kelas) => kelas.id == getKodeUnik())
            )).filter(mahasiswa => mahasiswa != undefined)[0]

            return mahasiswa
        }
    }
    
    useEffect(() => {
        setMahasiswa(cekMahasiswa())
    })

    return (
        <div>
            <h1 className="text-2xl">Data Mahasiswa</h1>
            {mahasiswa ? 
            <div>
                <h3 className="mt-4">NPM : {NPM.id}</h3>
                <h3>Nama : {mahasiswa.nama}</h3>
                <h3>Jenis Kelamin : {mahasiswa.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan'} </h3>
                <h3>Alamat : {mahasiswa.alamat}</h3>
                <h3>Hobi : {mahasiswa.hobi.join(', ')}</h3>
            </div>
            :<div>
                <h3 className="mt-4">Mahasiswa Tidak Terdata!</h3>
            </div>
            }
            <div className="mt-2">
                    <button className="p-1 px-5 bg-blue-500 rounded" onClick={() => navigate("/prodi")}>Prodi</button>
            </div>
        </div>
    )
}
export default App