import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ActivityDetails = () => {
    const { activityStore } = useStore();
    const { selectedActivity: activity, openForm, cancelActivitySelection } = activityStore;

    if (!activity) return <></>;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category.toLowerCase()}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button 
                        basic 
                        color='blue' 
                        content='Edit'
                        onClick={() => openForm(activity.id)}
                    />
                    <Button 
                        basic 
                        color='grey' 
                        content='Cancel' 
                        onClick={cancelActivitySelection} 
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default ActivityDetails;
