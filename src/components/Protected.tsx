"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Access the user object from the authentication context
  // const { user } = useAuthContext();
  const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (user != null) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
    // }, [ user ] );
  }, [user, router]); // Include 'router' in the dependency array to resolve eslint warning

  return <>{user && children}</>;
};

export default ProtectedRoute;
