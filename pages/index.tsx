import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [generatedBios, setGeneratedBios] = useState<string>("");

  const gameChangerRef = useRef<null | HTMLDivElement>(null);
  const [gameCount, setGameCount] = useState(
    Math.floor(Math.random() * 10000) + 20000
  ); // Random initial value between 20000 and 29999
  const [isClient, setIsClient] = useState(false);

  const scrollToBios = () => {
    if (gameChangerRef.current !== null) {
      gameChangerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setIsClient(true);
    const incrementInterval = setInterval(() => {
      setGameCount(
        (prevCount) => prevCount + Math.floor(Math.random() * 20) + 1
      ); // Random increment value between 1 and 20
    }, 1000); // Increment every 1000 milliseconds (1 second)

    return () => clearInterval(incrementInterval); // Clear interval on component unmount
  }, []); // Empty dependency array means this useEffect runs once, similar to componentDidMount

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }


      const message = (await response.text()).replace(/"/g, '');
      console.log("message", message);
      setGeneratedBios(message);
      scrollToBios();
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Game Changer Generator for LLM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="http://thecloudtimes.substack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>The Cloud Times Newsletter</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate next LLM Game Changer
        </h1>
        {isClient && (
          <p className="text-slate-500 mt-5">
            We helped change {gameCount.toLocaleString()} games so far.
          </p>
        )}
        <div className="max-w-xl w-full">
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              I am ready to change my LLM game &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={gameChangerRef}
                >
                  The next game-changer is here!
                </h2>
              </div>
              <div
                className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                onClick={() => {
                  navigator.clipboard.writeText(generatedBios);
                  toast("Game changer copied to clipboard", {
                    icon: "✂️",
                  });
                }}
              >
                <p>{generatedBios}</p>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
