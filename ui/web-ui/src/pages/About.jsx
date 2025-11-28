import React from "react";
import { FiGlobe, FiUsers, FiTarget, FiCode } from "react-icons/fi";
import LeaderPhoto from "../assets/leader.jpg";
import Logo from "../assets/logo.png";
import Member1 from "../assets/member 1.jpg";
import Member2 from "../assets/member 2.jpg";
import Member3 from "../assets/member 3.jpg";
import Member4 from "../assets/member 4.jpg";
import Member5 from "../assets/member 5.jpg";
import Member6 from "../assets/member 6.jpg";
import Member7 from "../assets/member 7.jpg";
import Member8 from "../assets/member 8.jpg";

const teamMembers = [
  { name: "Yotcheb KJ", role: " ML-AI & FullStack", photo: LeaderPhoto, leader: true },
  { name: "Emmanuel T", role: "AI & ML Engineer  ", photo: Member1 },
  { name: "Dushime Benue", role: "ML Engineer", photo: Member2 },
  { name: "Malachi Nsona", role: "Dataset Collection", photo: Member3 },
  { name: "Fabiola Furaha", role: "Data Collection", photo: Member4 },
  { name: "Bernice Gerrard", role: "Data Collection", photo: Member5 },
  { name: "Paul .", role: "Data Collection", photo: Member6 },
  { name: "Elia . ", role: "Content info", photo: Member7 },
  // { name: "Henry Zulu", role: "Research Assistant", photo: Member8 },
];

export default function About() {
  return (
    <div className="bg-slate-50">

      {/* HERO SECTION FULL WIDTH */}
      <section className="relative w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white overflow-hidden">
        <div className="w-full max-w-none lg:max-w-7xl mx-auto flex flex-col lg:flex-row items-center py-32 lg:py-4 gap-12 px-4 lg:px-12">
          
          {/* Text */}
          <div className="lg:w-1/2 animate-fade-in-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              LinguaOffline AI
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-white/90">
              Empowering communication in low-connectivity environments with advanced offline translation for text & audio.
            </p>
            <a
              href="#about-section"
              className="inline-block bg-white text-teal-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 animate-fade-in-right">
            <img
              src={Logo}
              alt="LinguaOffline AI Hero"
              className="w-full rounded-3xl shadow-2xl border-4 border-white/20 object-cover"
            />
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </section>

      {/* MAIN CONTENT */}
      <section id="about-section" className="py-16 max-w-6xl mx-auto px-4 lg:px-12">

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <InfoCard icon={<FiGlobe />} title="Our Mission">
            To provide reliable, offline translation capabilities that bridge language barriers in areas with limited internet access, supporting education, healthcare, and community development.
          </InfoCard>

          <InfoCard icon={<FiTarget />} title="What We Do">
            We develop lightweight translation models that work completely offline, supporting text and audio translation between English, Chichewa, French, and more.
          </InfoCard>

          <InfoCard icon={<FiUsers />} title="Our Team">
            A dedicated team of developers and linguists committed to making language technology accessible to underserved communities worldwide.
          </InfoCard>

          <InfoCard icon={<FiCode />} title="Technology">
            Built with modern web technologies and optimized machine learning models for efficient offline performance on resource-constrained devices.
          </InfoCard>
        </div>

        {/* TEAM GRID */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl p-4 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 ${
                  member.leader ? "border-4 border-teal-500" : ""
                }`}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mb-3 shadow-md"
                />
                <h3
                  className={`text-lg font-semibold ${
                    member.leader ? "text-teal-500" : "text-slate-800"
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500">{member.role}</p>
                {member.leader && (
                  <span className="mt-1 text-xs font-bold text-white bg-teal-500 px-2 py-1 rounded-full uppercase tracking-wide">
                    Leader
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-10 text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Join Our Mission</h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            We're always looking for collaborators, researchers, and organizations interested in expanding access to language technology. Contact us to learn how you can contribute.
          </p>
          <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-medium hover:from-teal-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Get Involved
          </button>
        </div>
      </section>
    </div>
  );
}

/* ------------------------
   Info Card Component
------------------------- */
function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 hover:-translate-y-2 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-teal-100 rounded-lg mr-3 text-teal-600">{icon}</div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="text-slate-600">{children}</p>
    </div>
  );
}
