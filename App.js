import React, { useState, useEffect } from "react";
import Loading from "./screens/Loading";
import _layout from "./app/(public)/_layout";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); 
  }, []);

  return loading ? <Loading /> : <_layout />;
}
