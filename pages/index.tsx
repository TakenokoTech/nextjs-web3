import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

// noinspection JSUnusedGlobalSymbols
export default function Index({ post }) {
  console.log("Index");
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   console.log("getStaticProps");
//   return {
//     props: {},
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("getStaticPaths");
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     console.log("getServerSideProps")
//     return {
//         props: {}
//     }
// }
