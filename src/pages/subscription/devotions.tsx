import { IonCard, IonButton, IonCardContent, IonCardSubtitle } from "@ionic/react";
import fearless from './fearless.jpg';
import play from './play.jpg'
import './devotions.css'

const Devotions: React.FC = () => {

    const loop = [1,2,3,4, 5, 6];

    return ( 
        <div className='body '>
            <h6>Daily devotions:</h6>
            <IonCard className='text-center p-2'>
                <div className='devoPic'>
                    <img src={fearless} alt="example.png" /><br />
                    
                </div>
                <div className='massage'>
                    <h3 >Fearless</h3>
                    <IonCardContent>
                    True remedy against tormenting fear such as the psalmist describes above is faith in God. Strong faith can give you victory over fear no matter what the circumstances are. .....
                    </IonCardContent>
                </div>
                <IonButton style={{backgroundColor:'#8EB9A7'}}>Read</IonButton>
            </IonCard>

            <h5>Sermons:</h5>
            <div className=''>
                {loop.map((e) =>{
                return(
                    <IonCard key={e} className='sermon'>
                        <img src={play} alt="sermon.png" />
                        <IonCardSubtitle>Fearless Man</IonCardSubtitle>
                    </IonCard>
                )
                })}
            </div>
        </div>
     );
}
 
export default Devotions;