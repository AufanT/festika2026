import StaffView from "@/components/staff/StaffView";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Our Staff - Festika",
  description: "Daftar susunan kepanitiaan Festival Informatika.",
};

async function getData() {
  const [divRes, coreRes] = await Promise.all([
    fetch(process.env.NEXTAUTH_URL + "/api/divisions", { cache: "no-store" }),
    fetch(process.env.NEXTAUTH_URL + "/api/staff?divisionId=core", { cache: "no-store" })
  ]);
  
  const divJson = await divRes.json();
  const coreJson = await coreRes.json();
  
  return {
    divisions: divJson.data || [],
    coreLeaders: coreJson.data || []
  };
}

export default async function StaffPage() {
  const { divisions, coreLeaders } = await getData();

  return (
    <div className="min-h-screen bg-white">
      <Reveal>
      {/* Header */}
      <div className="text-center py-12 bg-white">
        <h1 
          className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-extrabold text-festika-orange mx-auto"
          style={{ textShadow: "4px 4px 0 #0F2A36" }}
        >
          Our<br/>Staff!
        </h1>
      </div>
      </Reveal>
      
      {/* Container */}
      <Reveal><StaffView divisions={divisions} coreLeaders={coreLeaders} /></Reveal>
    </div>
  );
}
