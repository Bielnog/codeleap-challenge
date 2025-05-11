import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export function useSignUp() {
  const [name, setName] = useState<string>("");
  const haveName: boolean = name.trim().length > 0;

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function onSubmit() {
    if (!haveName) return false;
    AsyncStorage.setItem("username", name);
    return true;
  }

  return {
    name,
    haveName,
    handleNameChange,
    onSubmit,
  };
}