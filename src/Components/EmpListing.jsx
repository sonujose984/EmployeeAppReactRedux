import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import EmpProfileModal from './EmpProfileModal';
import {fetchData,empdelete} from '../action';
import { connect } from 'react-redux';
import axios from 'axios';

const EmpListing = ({data,loading,error,fetchData,empdelete }) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const handleDelete = (id) => {
        empdelete(id);
        axios.delete(`http://localhost:3001/employee/${id}`)
        .then((res) => {
            alert('Employee deleted successfully.');
            fetchData();
        })
        .catch((err) => {
            console.error('Error:', err.message);
        });
    };


    const setData = (data) => {
        let { id, name, department,age,gender,salary,yearsOfExperience } = data;
        localStorage.setItem('EmpId', id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Department', department);
        localStorage.setItem('Age', age);
        localStorage.setItem('Gender', gender);
        localStorage.setItem('Salary', salary);
        localStorage.setItem('Experience', yearsOfExperience);
     
    }
    useEffect(() => {
        fetchData();
    },[])

    const handleDetailsClick = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
   

    if(loading){
        return <div>loading...</div>
    }
    else if(error){
        return <div>
        Error in fetching.....
      </div>
    }

    return (
        <Container className="container-center">
            <div className="card-title">
                <h2>EMPLOYEE DETAILS</h2>
            </div>
            <div className="card-body">
                <div className="divbtn">
                    <Link to="employee/create" className="btn btn-success">Add New Employee</Link>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(data => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.department}</td>
                                    <td>
                                        <Link to='/Empupdate'>
                                            <button onClick={() => setData(data)} className="btn btn-success">Edit</button>
                                        </Link>
                                        <button  onClick={() => handleDelete(data.id)} className="btn btn-danger">Delete</button>
                                        <button onClick={() => handleDetailsClick(data)} className="btn btn-primary">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <EmpProfileModal 
                employee={selectedEmployee} 
                showModal={showModal} 
                handleCloseModal={handleCloseModal} 
            />
        </Container>
    );
}


const mapStateToProps = (state) => ({
    data: state.data,
    loading: state.loading,
    error: state.error,
    selectedEmployee: state.modal.selectedEmployee,
    showModalState: state.modal.showModal
  });
  
  export default connect(mapStateToProps, {
    fetchData,
    empdelete
  })(EmpListing);