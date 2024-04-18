import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    isSubmitting: boolean
}

const ActivityForm = ({ activity: selectedActivity, closeForm, createOrEdit, isSubmitting }: Props) => {
    
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState<Activity>(initialState);

    const handleSubmit = () => {
        createOrEdit(activity);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setActivity((prevActivity) => ({
            ...prevActivity,
            [name]: value
        }));
    };

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
                        loading={isSubmitting}
                    />
                    <Button 
                        basic color='grey' 
                        type='button' 
                        content='Cancel'
                        onClick={closeForm}
                    />
                </Button.Group>
            </Form>
        </Segment>
    );
};

export default ActivityForm;
