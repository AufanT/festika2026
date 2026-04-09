import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { NotificationProvider } from "@/context/NotificationContext";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  // Calling cookies() ensures this page is always rendered dynamically 
  // and not cached by the server or CDN.
  await cookies();
  
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <NotificationProvider>
      <AdminDashboard user={session.user} />
    </NotificationProvider>
  );
}
