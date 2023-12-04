import { useState } from "react";

export default function HTTPRequester() {
  const [dataFeed, setData] = useState(null);
  const [errorFeed, setError] = useState(null);

  const submitRequest = async (
    path = "",
    req_method = "POST",
    arg_body = {},
    arg_headers = null
  ) => {
    try {
      let request_structure = {
        method: req_method,
      };

      if (arg_headers == null) {
        request_structure.headers = {
          "Content-Type": "application/json",
        };

        if (localStorage.getItem("user_token")) {
          request_structure.headers.Authorization =
            "Bearer " + localStorage.getItem("user_token");
        }
      }

      if (req_method === "POST") {
        request_structure.body = JSON.stringify(arg_body);
      }

      const response = await fetch(
        `http://${process.env.REACT_APP_HOST}:5000/${path}`,
        request_structure
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An HTTP error occurred");
      } else {
        const data = await response.json();
        setData(data);
        setError(null);
      }
    } catch (error) {
      setError("A network error occurred");
    }
  };

  return { dataFeed, errorFeed, submitRequest };
}
