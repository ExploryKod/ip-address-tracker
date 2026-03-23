import { HomeInteractive } from "@components/containers/HomeInteractive";
import { Header } from "@modules/app/react/layout/Header";
import { presentHomeViewModel } from "@presenters/presentHome.server";

export default async function Home() {
  const vm = await presentHomeViewModel();

  return (
    <>
    <Header />
    <main className="flex min-h-[calc(100vh-var(--header-height)-var(--banner-height))] w-full flex-col">
      <HomeInteractive initialViewModel={vm} />
    </main>
    </>
  );
}
