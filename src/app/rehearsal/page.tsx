import { RehearsalClient } from "@/components/RehearsalClient";

export default async function RehearsalPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; scene?: string }>;
}) {
  const { role, scene } = await searchParams;
  return <RehearsalClient initialRoleId={role ?? ""} initialSceneId={scene ?? ""} />;
}
