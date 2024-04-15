import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
}

const ActivityForm = ({ activity, closeForm }: Props) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='City' />
                <Form.Input placeholder='Venue' />
                
                <Button.Group widths={1} floated="right">
                    <Button basic positive type='submit' content='Submit'/>
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
