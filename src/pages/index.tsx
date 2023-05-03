import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { type InferGetServerSidePropsType } from "next";
import { api } from "~/utils/api";
import { db, users } from "./db/drizzleDB";
import { type User, type NewUser } from "./db/drizzleDB";
const Home: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  console.log(props);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        ai gallery{" "}
        {props.data.map((user: User) => {
          return <div key={user.id}>{user.fullName}</div>;
        })}
      </main>
    </>
  );
};

export async function getServerSideProps() {
  // async function insertUser(user: NewUser): Promise<User> {
  //   return db.insert(users).values(user).returning();
  // }
  // const newUser: NewUser = {
  //   fullName: "maxxyyy",
  //   phone: "4",
  // };

  // const insertedUser: User = await insertUser(newUser);
  // console.log(insertedUser);
  const allUsers = await db.select().from(users);
  return {
    props: {
      data: allUsers,
    }, // will be passed to the page component as props
  };
}

export default Home;
