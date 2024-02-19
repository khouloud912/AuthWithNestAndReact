import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Auth = () => {
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (authMode === "signin") {
                const response = await api.post("/login", {
                    fullName,
                    password,
                });
                localStorage.setItem('accessToken', response.data.access_token);
                navigate('/profile');
            } else {
                const body = {
                    fullName,
                    password,
                    role,
                }
                const response = await axios.post("/register", body);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">{authMode === "signin" ? "Sign In" : "Sign Up"}</h3>
                    <div className="text-center">
                        {authMode === "signin" ? (
                            <>
                                Not registered yet?{" "}
                                <span className="link-primary" onClick={changeAuthMode}>
                                    Sign Up
                                </span>
                            </>
                        ) : (
                            <>
                                Already registered?{" "}
                                <span className="link-primary" onClick={changeAuthMode}>
                                    Sign In
                                </span>
                            </>
                        )}
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {authMode === "signin" ? (
                        <>
                            <div className="form-group mt-3">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter user name"
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group mt-3">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="e.g Jane Doe"
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Roles</label>
                                <select
                                    className="form-select"
                                    value={role}
                                    onChange={(event) => setRole(event.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="supervisor">Supervisor</option>
                                </select>
                            </div>
                        </>
                    )}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default Auth;
