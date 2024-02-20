import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {BASE_API} from "../../utils/api_constants";
import {UserModel} from "../../types/user";

const Profile = ({serverUser}) => {
    const router = useRouter()
    const [user, setUser] = useState<UserModel>(serverUser)

    return (
        <MainLayout
            title={"Listening ArmoRhythm - " + user.firstName }
            keywords={'Track, Artists, ' + user.firstName }
        >

            <h1>Lyrics</h1>
            <p>{user.firstName}</p>
            <h1>Comments</h1>


        </MainLayout>
    );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get(`${BASE_API}/user/` + params.id)
    return {
        props: {
            serverUser: response.data
        }
    }
}
