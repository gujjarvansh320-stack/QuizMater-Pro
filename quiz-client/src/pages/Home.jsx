import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import Features from "../components/Features/Features";
import Statistics from "../components/Statistics/Statistics";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
       <Categories />
     <Features />
       <Statistics />
      <HowItWorks />
     <Leaderboard />
       <Testimonials />
      <FAQ/>
      <Footer/>
    </>
  );
};

export default Home;