import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-day-picker/dist/style.css";
import App from "./App.jsx";
import { UserProvider } from "../context/userContext.jsx";
import { JournalProvider } from "../context/journalContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserProvider>
            <JournalProvider>
                <App />
            </JournalProvider>
        </UserProvider>
    </StrictMode>
);
