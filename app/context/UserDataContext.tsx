import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserDataType = {
  photos?: string[];
  socialMediaHandles?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  [key: string]: any;
};

type UserDataContextType = {
  userData: UserDataType;
  updateUserData: (data: Partial<UserDataType>) => void;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDataType>({});

  const updateUserData = (data: Partial<UserDataType>) => {
    setUserData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

export const updateUserData = (data: Partial<UserDataType>) => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('updateUserData must be used within a UserDataProvider');
  }
  context.updateUserData(data);
}; 