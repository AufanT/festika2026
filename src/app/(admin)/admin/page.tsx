import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { NotificationProvider } from "@/context/NotificationContext";
import { headers } from "next/headers";

export default async function AdminPage() {
  // Calling headers() makes this route dynamic and prevents static caching on many hosts
  await headers();
  
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <NotificationProvider>
      <AdminDashboard user={session.user} />
    </NotificationProvider>
  );
}
