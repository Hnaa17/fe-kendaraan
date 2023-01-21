import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Swal from "sweetalert2";
import VehicleList from "../../pages/VehicleList";
import DetailData from "../../pages/DetailData";
import CreateData from "../../pages/CreateData";
import UpdateData from "../../pages/UpdateData";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={<Navigate to="/Data-Kendaraan" replace="true" />} 
                />

                <Route 
                    path="/Data-Kendaraan" element={<VehicleList />} 
                />

                <Route 
                    path="/detail/:no_reg" element={
                    <DetailData />
                } />

                <Route 
                    path="/create" element={
                    <CreateData />
                } />

                <Route 
                    path="/update/:no_reg" element={
                    <UpdateData />
                } />

            </Routes>
        </BrowserRouter>
    );
}

export default Router;