import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityForm = () => {
    const { activityStore } = useStore();
    const { 
        loading,
        createActivity, 
        updateActivity,
        loadActivity,
        loadingInitial
    } = activityStore;

    const {id} = useParams();
    
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) {
            loadActivity(id)
                .then(activity => setActivity(activity!))
        }
    }, [id, loadActivity]);

    const handleSubmit = () => {
        activity.id 
            ? updateActivity(activity)
            : createActivity(activity);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setActivity((prevActivity) => ({
            ...prevActivity,
            [name]: value
        }));
    };

    if (loadingInitial) return <LoadingComponent content='loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleChange} />
                
                <Button.Group widths={1} floated="right">
                    <Button 
                        basic 
                        positive 
                        type='submit' 
                        content='Submit'
                        loading={loading}
                    />
                    <Button 
                        basic color='grey' 
                        type='button' 
                        content='Cancel'
                    />
                </Button.Group>
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);
