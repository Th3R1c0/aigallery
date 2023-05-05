import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

export function Header() {
  return (
    <div className="flex h-max w-screen justify-between p-4 text-white">
      <div className="text-4xl font-bold text-white">AI Art Picker App</div>
      <div className="btn text-white">About</div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="  flex h-max w-screen p-4 text-white">
      <div>2022 github discord</div>
    </div>
  );
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="flex h-screen w-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default api.withTRPC(MyApp);
