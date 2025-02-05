import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/register", { name, email, password });
            alert("Registration Successful");
        } catch (err) {
            alert("Error: User may already exist");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Register</h2>
                <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-2"
                    onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2"
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-2"
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
