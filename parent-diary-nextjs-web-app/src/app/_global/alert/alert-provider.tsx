"use client"
import { createContext, useContext, useState } from "react";
import AlertWrapper from "./alert-wrapper";

export const AlertContext = createContext<((variant: string, message: string) => void)>(() => {});
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertVariant, setAlertVariant] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("This is an alert—check it out!");
    function showAlert(variant: string, message: string) {
        setAlertVariant(variant);
        setAlertMessage(message);
        setAlertVisible(true);
    }
    // Logique de gestion des alertes
    return (
      <AlertContext.Provider value={showAlert}>
        {children}
        <AlertWrapper variant={alertVariant} message={alertMessage} setShow={setAlertVisible} show={alertVisible} />
      </AlertContext.Provider>
    );
  };