import React from "react";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";
// import Link from "next/link";

const Profile = () => {
  const followingList = [
    { nickname: "lee" },
    { nickname: "kim" },
    { nickname: "park" },
  ];
  const followerList = [
    { nickname: "lee" },
    { nickname: "kim" },
    { nickname: "park" },
  ];
  return (
    <>
      <Head>
        <title>내 프로필 | nextweet</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
