import react from "react";
import "./About.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { SocialMediaIconsReact } from "social-media-icons-react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import logo from "../Logins/Welcome/Logo_transp.png";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";

function About({ setIsOpen }) {
  return (
    <IonPage className="About">
      <IonHeader className="about-header">
        <IonToolbar>
          <IonTitle>
            <span style={{ color: "white !important" }}>About</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            padding: "2vh",
          }}
        >
          <img style={{ height: "150px" }} src={logo} alt="cc logo" />
        </div>
        <div className="about-body">
          <p>
            We are a platform where Christians can find a place of fellowship
            wherever they are, providing them with sufficient information for
            them to choose a fellowship that best suits their spiritual needs.
            The platform will provide a list of thousands of churches, based on
            a geographic radius in which they can choose from, with our aim
            being to showcase church values, culture, and share daily messages
            so that people can know more about the church to make informed
            decisions and familiarize themselves with the church. Our platform
            aims to also be Christ-based more than being church name focused,
            prioritizing fellowship than the name of the church and enabling
            people to grow in Christ.
          </p>
        </div>

        <div className="social-media">
          {/* instagram */}
          {/* <SocialMediaIconsReact
            borderColor="rgba(255,255,255,0.25)"
            borderWidth="5"
            borderStyle="outset"
            icon="instagram"
            iconColor="rgba(255,255,255,1)"
            backgroundColor="rgba(233,26,227,1)"
            iconSize="3"
            roundness="50%"
            url="https://www.instagram.com/christianconnect_app/"
            size="50"
          /> */}

          {/* twitter */}
          {/* <SocialMediaIconsReact
            borderColor="rgba(255,255,255,0.25)"
            borderWidth="5"
            borderStyle="outset"
            icon="twitter"
            iconColor="rgba(255,255,255,1)"
            backgroundColor="rgba(26,166,233,1)"
            iconSize="3"
            roundness="50%"
            url="https://twitter.com/ChristianCon_"
            size="50"
          /> */}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/christianconnect_app/"
          >
            <BsInstagram color="rgb(255 0 140)" size="2em" />
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/ChristianCon_"
          >
            <FiTwitter color="rgba(26,166,233,1)" size="2em" />
          </a>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            margin: "20px 0 10vh 0",
          }}
        >
          <IonButton onClick={() => setIsOpen(false)}>
            <MdClose />
            <span>Close</span>{" "}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default About;
