import axios from "axios";

export const login = async (login) => {
    try {
        // debugger;
        const res = await axios.post("/api/auth/sign-in", login);
        if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            return res.data;
        }
    } catch (e) {
        throw e;
    }
};

