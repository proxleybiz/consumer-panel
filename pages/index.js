import Head from "next/head";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import ExploreProducts from "../components/ExploreProducts";
import MyHero from "../components/MyHero";
import MyNavbar from "../components/MyNavbar";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, []);
  return <Loading />;
}
