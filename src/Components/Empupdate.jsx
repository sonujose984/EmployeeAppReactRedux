import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {empupdate} from '../action';
import { connect } from 'react-redux';
import axios from 'axios';

const EmpUpdate = ({empupdate}) => {
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [salary, setSalary] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');

    useEffect(() => {
        setId(localStorage.getItem('EmpId'));
        setName(localStorage.getItem('Name'));
        setDepartment(localStorage.getItem('Department'));
        setAge(localStorage.getItem('Age'));
        setGender(localStorage.getItem('Gender'));
        setSalary(localStorage.getItem('Salary'));
        setYearsOfExperience(localStorage.getItem('Experience'));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !department || !age || !gender || !salary || !yearsOfExperience) {
            // Handle validation
            return;
        }

        const empData = {
            id: id,
            name: name,
            department: department,
            age: age,
            gender: gender,
            salary: salary,
            yearsOfExperience: yearsOfExperience
        };

       
        axios.put(`http://localhost:3001/employee/${id}`, empData)
        .then((res) => {
            empupdate(id, empData); 
            alert('Updated successfully.');
            navigate('/');
        })
        .catch((err) => {
            console.error('Error:', err.message);
        });
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div style={{ "textAlign": "center", color: 'black' }}>
                                <h2>Employee Update</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Employee ID</label>
                                            <input value={id} disabled className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onChange={(e) => setName(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="form-control">
                                                <option value="">Select Department</option>
                                                <option value="Development">Development</option>
                                                <option value="Testing">Testing</option>
                                                <option value="HR">HR</option>
                                                {/* Add other departments as needed */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Age</label>
                                            <input value={age} onChange={(e) => setAge(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-control">
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                {/* Add other genders as needed */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Salary</label>
                                            <input value={salary} onChange={(e) => setSalary(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Years of Experience</label>
                                            <input value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Update</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { empupdate })(EmpUpdate);
