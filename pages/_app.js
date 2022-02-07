import "../styles/globals.css";
import Layout from "../components/layout.js";
import { AuthProvider } from "../components/authcontext.js";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
