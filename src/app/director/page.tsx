import DirectorClient from "./DirectorClient";

export default async function DirectorPage({
  searchParams,
}: {
  searchParams: Promise<{ scene?: string }>;
}) {
  const { scene } = await searchParams;
  return <DirectorClient initialSceneId={scene ?? ""} />;
}
