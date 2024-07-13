import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { GetServerSideProps } from "next";
import { UserModel } from "@/types/user";
import { host } from "@/api";

const Profile = ({ serverUser }) => {
  const [user, setUser] = useState<UserModel>(serverUser);

  return (
    <MainLayout
      title={"Listening ArmoRhythm - " + user.firstName}
      keywords={"Track, Artists, " + user.firstName}
    >
      <h1>Lyrics</h1>
      <p>{user.firstName}</p>
      <h1>Comments</h1>
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await host.get(`/user/` + params.id);
  return {
    props: {
      serverUser: response.data,
    },
  };
};
