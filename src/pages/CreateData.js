import React, {useState, useEffect, Fragment} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import Button from "react-bootstrap/Button";

const CreateData = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        no_reg : "", 
        name : "", 
        merk : "", 
        address : "", 
        production_year : "", 
        capacity : "", 
        color : "", 
        fuel : ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:8000/vehicle/create`, data)
            .then((res) => {
                Swal.fire({
                    title: "Created Success",
                    text: res.data.message,
                    icon: "success"
                })
                navigate({pathname: "/"})
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="container-fluid p-5">
            <div className="row kotak-content p-3">
            <div className="col-md-12">
                <h5>Tambah Data Kendaraan</h5>

                <form onSubmit={handleSubmit}>
                <div className="row mt-4">
                    <div className="col-md-5">
                        <div className="form-group">
                            <label for="">No. Registrasi Kendaraan</label>
                            <input 
                            type="text" className="form-control mt-1" 
                            name="no_reg"
                            id="no_reg"
                            placeholder="Ex: B-7798-TXT"
                            onChange={handleChange}/>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Nama Pemilik</label>
                            <input 
                            type="text" className="form-control mt-1" 
                            name="name"
                            id="name"
                            placeholder="Ex: Alexander"
                            onChange={handleChange}/>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Merk Kendaraan</label>
                            <input 
                            type="text" className="form-control mt-1"
                            name="merk"
                            id="merk"
                            placeholder="Ex: Honda Beat"
                            onChange={handleChange} />
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Alamat Pemilik Kendaraan</label>
                            <textarea 
                            name="address" id="address" cols="30" rows="3" className="form-control mt-1" 
                            placeholder="Ex: Jl. Asia-Afrika N0.17"
                            onChange={handleChange}/>
                        </div>
                    </div>
    
                    <div className="col-md-5">
                        <div className="form-group">
                            <label for="">Tahun Pembuatan</label>
                            <input type="text" className="form-control mt-1" 
                            name="production_year"
                            id="production_year"
                            placeholder="Ex: 2018"
                            onChange={handleChange}/>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Kapasitas Silinder</label>
                            <input type="text" className="form-control mt-1" 
                            name="capacity"
                            id="capacity"
                            placeholder="Ex: 150"
                            onChange={handleChange}/>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Warna Kendaraan</label>
                            <select name="color" id="color" className="form-control mt-1"
                            onChange={handleChange}>
                                <option value="">Pilih Warna</option>
                                <option value="Merah">Merah</option>
                                <option value="Hitam">Hitam</option>
                                <option value="Biru">Biru</option>
                                <option value="Abu-abu">Abu-abu</option>
                            </select>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Bahan Bakar</label>
                            <input type="text" className="form-control mt-1"
                            name="fuel"
                            id="fuel"
                            placeholder="Ex: Bensin"
                            
                            onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-5">
                          <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
                            Simpan
                          </button>
                        <Button href="/" className="btn btn-secondary">
                            Kembali
                        </Button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default CreateData;