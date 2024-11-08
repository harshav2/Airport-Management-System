import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          router.push("/login");
        } else {
          try {
            // Verify token with the server
            const response = await fetch("/api/verify-token", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error("Token invalid");
            }
          } catch (error) {
            console.error("Authentication error:", error);
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("refresh_token");
            router.push("/login");
          }
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
