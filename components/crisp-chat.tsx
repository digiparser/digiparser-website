"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a5dfcf57-ee9f-41c4-927d-35221781fd1a");
  });

  return null;
}

export default CrispChat;