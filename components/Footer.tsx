import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const techStack = [
    { name: "Next.js", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", url: "https://nextjs.org/" },
    { name: "Sanity.io", logo: "https://www.sanity.io/static/images/logo_rounded_square.png", url: "https://www.sanity.io/" },
    { name: "NextAuth", logo: "https://next-auth.js.org/img/logo/logo-sm.png", url: "https://next-auth.js.org/" },
    { name: "Sentry", logo: "https://sentry-brand.storage.googleapis.com/sentry-logo-black.png", url: "https://sentry.io/welcome/" },
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                {/* Tech Stack */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    {techStack.map((tech) => (
                        <a
                            key={tech.name}
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity bg-gray-300 text-black p-3 rounded-xl"
                        >
                            <Image src={tech.logo} alt={tech.name} width={40} height={40} className="rounded-md" />
                            <span className="hidden sm:inline text-lg font-medium">{tech.name}</span>
                        </a>
                    ))}
                </div>

                {/* Developer Info */}
                <div className="mt-4 md:mt-0">
                    <p className="font-semibold text-lg">Developed by Saksham Verma</p>
                    <div className="flex justify-center md:justify-start gap-4 mt-2">
                        <a
                            href="https://github.com/69GliTcH"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaGithub size={28} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/saksham-verma-82bb8722a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaLinkedin size={28} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
