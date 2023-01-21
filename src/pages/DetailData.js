import React, {useState, useEffect, Fragment} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import Button from "react-bootstrap/Button";

const DetailData = () => {
    const { no_reg } = useParams();
    const [vehicle, setVehicle] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .get(`http://localhost:8000/vehicle/detail/${no_reg}`)
            .then((response) => {
                setVehicle(response.data.data);
                console.log(vehicle);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container-fluid p-5">
            <div className="row kotak-content p-3">
            <div className="col-md-12">
                <h5>Detail Data Kendaraan</h5>

                <div className="row mt-4">
                    <div className="col-md-5">
                        <div className="form-group">
                            <label for="">No. Registrasi Kendaraan</label>
                            <input type="text" className="form-control mt-1" 
                            defaultValue={vehicle.no_reg} 
                            readOnly/>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Nama Pemilik</label>
                            <input 
                            type="text" className="form-control mt-1"
                            defaultValue={vehicle.name} 
                            readOnly />
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Merk Kendaraan</label>
                            <input type="text" className="form-control mt-1"
                            defaultValue={vehicle.merk} 
                            readOnly />
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Alamat Pemilik Kendaraan</label>
                            <textarea name="" id="" cols="30" rows="3" className="form-control mt-1"
                            defaultValue={vehicle.address} 
                            readOnly></textarea>
                        </div>
                    </div>
    
                    <div className="col-md-5">
                        <div className="form-group">
                            <label for="">Tahun Pembuatan</label>
                            <input type="text" className="form-control mt-1"
                            defaultValue={vehicle.production_year} 
                            readOnly />
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Kapasitas Silinder</label>
                            <input type="text" className="form-control mt-1"
                            defaultValue={vehicle.capacity} 
                            readOnly />
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Warna Kendaraan</label>
                            <input type="text" className="form-control mt-1"
                            defaultValue={vehicle.color} 
                            readOnly />
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Bahan Bakar</label>
                            <input type="text" className="form-control mt-1"
                            defaultValue={vehicle.fuel} 
                            readOnly />
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-5">
                        <Button href={`/update/${vehicle.no_reg}`} className="btn btn-primary">
                            Ubah
                        </Button>

                        <Button href="/" className="btn btn-secondary">
                            Kembali
                        </Button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default DetailData;