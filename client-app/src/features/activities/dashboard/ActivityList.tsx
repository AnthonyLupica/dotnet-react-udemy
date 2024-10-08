import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ActivityList = () => {
    const [target, setTarget] = useState<string>('');

    const { activityStore } = useStore();
    const { activitiesByDate, loading, deleteActivity } = activityStore;

    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id)
    };

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    as={Link} to={`/activities/${activity.id}`}
                                    floated='right' 
                                    content='View' 
                                    color='blue'                                    
                                />
                                <Button 
                                    name={activity.id}
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                    onClick={(e) => handleActivityDelete(e, activity.id)} 
                                    loading={loading && target === activity.id}
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
};

export default observer(ActivityList);
