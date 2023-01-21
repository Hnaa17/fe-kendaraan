import React, {useState, useEffect, Fragment} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import Button from "react-bootstrap/Button";

const VehicleList = () => {
    const [vehicle, setVehicle] = useState([]);
    const navigate = useNavigate();
    console.log(navigate);
    const [show, setShow] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");

    const [formSearch, setFormSearch] = useState({
        no_reg: "", 
        name: "",
    });

    const handleChange = (e) => {
        setFormSearch({
            ...formSearch,
            [e.target.name]: e.target.value,
        });
    };
    console.log(formSearch.no_reg)

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     axios
    //         .post(`http://localhost:8000/vehicle/search`, formSearch)
    //         .then((response) => {
    //             console.log(response.data.data.data);
    //             setFormSearch(response.data.data.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    const getVehicles = async () => {
        const searching =
          searchParams.get("search") === null ? "" : searchParams.get("search");
        axios
          .get(
            `http://localhost:8000/vehicle?search=${searching}`
          )
          .then((response) => {
            console.log(response.data.data);
            setVehicle(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    const handleSearch = (e) => {
    e.preventDefault();
    getVehicles();
    setSearchParams({
        search,
    });
    };
    console.log(search)

    useEffect(() => {
        getVehicles();
        setSearch(searchParams.get("search"));
        searchParams.get("search");
    }, [searchParams]);
    

    // async function fetchData() {
    //     try {
    //         const createdAt = await axios.get(`http://localhost:8000/vehicle`);
    //         console.log(createdAt.data.data);
    //         getVehicle(createdAt.data.data);
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     fetchData();
    //     setShow(false)
    //     setShow(true)
    // }, []);

    const deleteVehicle = async(no_reg) => {
        Swal.fire({
            text: `Anda yakin menghapus data ${no_reg} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#32C33B",
            cancelButtonColor: "#d33",
        }).then(async(result) => {
            if (result.isConfirmed) {
                await axios .delete(`http://localhost:8000/vehicle/${no_reg}`)
                .then(() => {
                    Swal.fire("Deleted!", "Data berhasil di hapus", "success");
                    setShow(false)
                    window.location.reload(false);
                })
                .catch(() => {
                    Swal.fire("Deleted Failed!", "Gagal menghapus data", "error");
                    setShow(false)
                });
            }
        });
    };

    return (
        <div className="container-fluid p-5">
            <div className="row kotak-content p-3">
                <div className="col-md-12">
                    <h3>Aplikasi Data Kendaraan</h3>

                    <form onSubmit={handleSearch}>
                    <div className="kotak-form pt-3 mt-3">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label for="no_registrasi" className="mb-2">No Registrasi</label>
                                <input type="text" class="form-control"
                                name="no_reg"
                                id="no_reg" />
                            </div>

                            <div className="form-group">
                                <label for="nama_pemilik" className="mb-2 mt-4">Nama Pemilik</label>
                                <input type="text" class="form-control"
                                name="name"
                                id="name" />
                            </div>
                        </div>
                    </div>
                    </form>

                    <div className="tombol mt-2">
                    <Button variant="primary" size="lg" active onSubmit={handleSearch}>
                        Search
                    </Button>

                    <Button href="/create" variant="primary" size="lg" active>
                        Add
                    </Button>
                        {/* <Button className="btn btn-primary mr-2">
                            Search
                        </Button>
                        <Button href="/create-data">Add</Button> */}
                        {/* <Link to="/create-data" >
                            Add
                        </Link> */}
                    </div>

                    <div className="table mt-2">
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr className="text-center head">
                                <th>No</th>
                                <th>No Registrasi</th>
                                <th>Nama Pemilik</th>
                                <th>Merk Kendaraan</th>
                                <th>Tahun Pembelian</th>
                                <th>Kapasitas</th>
                                <th>Warna</th>
                                <th>Bahan Bakar</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {vehicle.map((item, index) => (

                                <tr key={item.no_reg} className="text-center">
                                    <td>{index + 1}</td>
                                    <td>{item.no_reg}</td>
                                    <td>{item.name}</td>
                                    <td>{item.merk}</td>
                                    <td>{item.production_year}</td>
                                    <td>{item.capacity} cc</td>
                                    <td>{item.color}</td>
                                    <td>{item.fuel}</td>
                                    <td>
                                        <Link to={`/detail/${item.no_reg}`}>
                                            <span className="text-warning font-weight-bold">Detail</span>
                                        </Link>
                                        <Link to={`/update/${item.no_reg}`}>
                                            <span className="text-primary font-weight-bold">Edit</span>
                                        </Link>
                                        <Link onClick={() => deleteVehicle(item.no_reg)}>
                                            <span className="text-danger font-weight-bold">Delete</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleList;