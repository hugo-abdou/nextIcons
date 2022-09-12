import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <div className="bg-gray-900 min-h-screen">
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
