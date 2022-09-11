// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home({ icons }) {
    return (
        <div>
            {Object.keys(icons).map((name) => {
                return <svg key={name}>{icons[name].body}</svg>;
            })}
        </div>
    );
}
export async function getServerSideProps({ req }) {
    console.log(req.query);
    const res = await axios.get("http://localhost:3000/api/hello");
    return {
        props: { icons: res.data.items.icons },
    };
}

// export async function getStaticProps(cont) {
//     const res = await axios.get("http://localhost:3000/api/hello");
//     return {
//         props: { icons: res.data.items.icons },
//     };
// }
