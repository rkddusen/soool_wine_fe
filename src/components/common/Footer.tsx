import { Link } from "react-router-dom";
import SooolLogoWine from "/src/assets/soool_logo_wine.svg?react";

const Footer = () => {
  return (
    <div className="w-full h-200">
      <div className="flex items-center justify-center w-full h-full px-40 mx-auto md:justify-start max-w-1280">
        <div className="flex flex-col items-center justify-center md:items-start">
          <Link to="/" className="h-30">
            <SooolLogoWine className="h-full" />
          </Link>
          <p className="mt-10 text-14">
            Copyright JeongKangE. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
