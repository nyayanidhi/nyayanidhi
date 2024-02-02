import Head from "next/head";

export default function Hero() {
  return (
    <>
      <Head>
        <title>Nyaya Nidhi</title>
      </Head>
      <main className="h-screen flex justify-center items-center w-screen bg-gradient-to-b from-violet-600/[.15] via-transparent bg-slate-900">
        <div>
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
            <div className="flex justify-center">
              <div className="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 ps-4 rounded-full shadow-md">
                <p className="me-2 inline-block text-white text-sm">
                  Nyaya Nidhi is live
                </p>
              </div>
            </div>
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Now it's easier than ever to transform your documents
              </h1>
            </div>

            <div className="max-w-3xl text-center mx-auto">
              <p className="text-lg text-gray-400">
                Nyaya Nidhi is designed to assist lawyers with their legal
                document needs.
              </p>
            </div>
            <div className="text-center flex justify-center gap-6">
              <a
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                href="/api/auth/login"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
