import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import TranslationForm from "./TranslationForm";

export default function Create() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div>Create new translation</div>
      <TranslationForm input="" output="" />
    </div>
  );
}
