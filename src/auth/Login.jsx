import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/login", { email, password });
            localStorage.setItem("token", data.token);
            alert("Login Successful");
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2"
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-2"
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
