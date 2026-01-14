import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token") || null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,

    reducers: {
        // You just pass the token (or null when logging out)
        setAdminToken: (state, action) => {
            const newToken = action.payload;

            state.token = newToken;

            // Optional: keep localStorage in sync (most apps do this)
            if (newToken) {
                localStorage.setItem("token", newToken);
            } else {
                localStorage.removeItem("token");
            }
        },

        // Optional: clear on logout / token expire
        clearAdmin: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

// ── Selectors ──────────────────────────────────────────────
// Get full decoded admin object (or null if no valid token)
export const selectAdmin = (state) => {
    const token = state.admin.token;

    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (e) {
        console.warn("Invalid JWT token:", e);
        return null;
    }
};

// Get just the token (useful for requests)
export const selectAdminToken = (state) => state.admin.token;

// Get common fields (optional convenience selectors)
export const selectAdminId = (state) => {
    const admin = selectAdmin(state);
    return admin?._id || admin?.id || null;
};

export const selectAdminName = (state) => {
    const admin = selectAdmin(state);
    return admin?.name || admin?.username || null;
};

export const selectIsAdminAuthenticated = (state) => {
    console.log('state', state);
    
    return !!state.admin.token || false;
}


export const { setAdminToken, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;