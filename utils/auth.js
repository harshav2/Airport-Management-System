import { useRouter } from "next/navigation";

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch("/api/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

export function useAuth() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  const getToken = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      try {
        token = await refreshToken();
      } catch (error) {
        logout();
      }
    }
    return token;
  };

  return { getToken, logout };
}
