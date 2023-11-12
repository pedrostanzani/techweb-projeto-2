import React, { useEffect } from "react";
import { redirect, useNavigate, useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Callback = () => {
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = query.get("access_token");
    const refresh_token = query.get("refresh_token");
    const expires_at = query.get("expires_at");

    if (access_token) window.localStorage.setItem("access_token", access_token);
    if (refresh_token)
      window.localStorage.setItem("refresh_token", refresh_token);
    if (expires_at) window.localStorage.setItem("expires_at", expires_at);

    const destinationMood = window.localStorage.getItem("mood");

    navigate(`/moods/${destinationMood}`);
  }, []);

  return <div></div>;
};

export default Callback;
