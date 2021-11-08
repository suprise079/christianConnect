import Profile from "../../pages/UserProfile/Profile";
import SubscriptionHome from "../../pages/subscription/SubscriptionHome";
import UserHome from "../../pages/userHome/userHome";
import { IonSlides, IonSlide, IonContent, IonPage } from "@ionic/react";
import TabBar from "../tabBar/tabBar";
import { useEffect, useState, useRef } from "react";
import { async } from "@firebase/util";

export default function Slider() {
  const [active, setActive] = useState(0);
  var slider = useRef(null);

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  const slideTo = async (indexTo) => {
    var swiper = await slider.current.getSwiper();
    swiper.slideTo(indexTo);
  };

  const getActiveIndex = async (e) => {
    await e.target.getActiveIndex().then((value) => setActive(value));
  };

  useEffect(() => {
    console.log(active);
  }, [active]);
  return (
    <IonPage>
      <IonContent>
        <IonSlides
          ref={slider}
          id="Slide"
          scrollbar={true}
          options={slideOpts}
          onIonSlideDidChange={(e) => {
            getActiveIndex(e);
          }}
        >
          <IonSlide>
            <IonContent style={{ height: "100vh" }}>
              <UserHome />
            </IonContent>
          </IonSlide>
          <IonSlide>
            <IonContent style={{ height: "100vh" }}>
              <SubscriptionHome />
            </IonContent>
          </IonSlide>
          <IonSlide>
            <IonContent style={{ height: "100vh" }}>
              <Profile />
              {/* <h3>Profile</h3> */}
            </IonContent>
          </IonSlide>
        </IonSlides>
      </IonContent>
      <TabBar active={active} slideTo={slideTo} />
    </IonPage>
  );
}
