import Demo from "@/components/demo";
import { headers } from "next/headers";
const HomePage = () => {
  const headersList = headers();
  const origin = headersList.get("origin");

  return (
    <main className="flex min-h-screen flex-col justify-center gap-8">
      <h1 className="text-center text-xl font-bold">Vimeo Thumbnailer</h1>
      <div className="mx-8 flex flex-col gap-4 rounded-xl border-2">
        <h2 className="w-full rounded-t-lg bg-gray-300 text-center text-lg font-semibold">
          Example
        </h2>
        <section className="flex flex-col items-center justify-center px-3 py-2 pb-6">
          <div className="flex w-full flex-col gap-6 border-b-2 pb-6">
            <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
              <strong className="my-auto w-full sm:w-1/6">
                url-structure:
              </strong>
              <code className="flex w-full flex-wrap overflow-x-auto bg-gray-200 px-3 py-2 sm:ml-2 sm:w-5/6">
                {String(origin ?? "") + "/api/thumbnail/[videoID]/data"}
              </code>
            </div>
            <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
              <strong className="my-auto w-full sm:w-1/6">example-url:</strong>
              <code className="flex w-full flex-wrap overflow-x-auto bg-gray-200 px-3 py-2 sm:ml-2 sm:w-5/6">
                {String(origin ?? "") + "/api/thumbnail/883608656/data"}
              </code>
            </div>
          </div>
          <div className="flex w-full pt-6">
            <Demo />
          </div>
        </section>
      </div>
    </main>
  );
};
export default HomePage;
