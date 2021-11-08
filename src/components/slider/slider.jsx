import Profile from "../../pages/UserProfile/Profile";
import SubscriptionHome from "../../pages/subscription/SubscriptionHome";
import UserHome from "../../pages/userHome/userHome";
import { IonSlides, IonSlide, IonContent, IonPage } from "@ionic/react";

export default function Slider() {
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  return (
    <IonPage>
      <IonContent>
        <IonSlides pager={false} options={slideOpts}>
          <IonSlide>
            <IonContent style={{ height: "100vh" }}>
              {/* <h3>UserHome</h3> */}
              <UserHome />
            </IonContent>
          </IonSlide>
          <IonSlide>
            <h1>hey</h1>
            <SubscriptionHome />
            <IonContent style={{ height: "100vh" }}>
              
              {/* <h3>Subscription</h3> */}
            </IonContent>
          </IonSlide>
          <IonSlide>
            <IonContent style={{ height: "100vh" }}>
              <Profile />
              <h3>Profile</h3>
            </IonContent>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
}
