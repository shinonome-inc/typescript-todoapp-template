import React, { createContext, useContext, ReactNode, useState } from "react";

interface AlertState {
  visible: boolean;
  errorText: string;
}

interface AlertHandlerContextType extends AlertState {
  setAlert: (errorText: string) => void;
  closeAlert: () => void;
}

const AlertHandlerContext = createContext<AlertHandlerContextType | undefined>(
  undefined
);

interface AlertHandlerProviderProps {
  children: ReactNode;
}

export const AlertHandlerProvider = ({
  children,
}: AlertHandlerProviderProps) => {
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    errorText: "",
  });

  const setAlert = (errorText: string) => {
    setAlertState({
      visible: true,
      errorText: errorText,
    });
  };

  const closeAlert = () => {
    setAlertState({
      ...alertState,
      visible: false,
    });
  };

  const contextValue = {
    ...alertState,
    setAlert: setAlert,
    closeAlert: closeAlert,
  };

  return (
    <AlertHandlerContext.Provider value={contextValue}>
      {children}
    </AlertHandlerContext.Provider>
  );
};

export const useAlertHandlerContext = () => useContext(AlertHandlerContext);
