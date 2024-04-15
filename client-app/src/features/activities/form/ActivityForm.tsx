import { Button, Form, Segment } from "semantic-ui-react";

const ActivityForm = () => {
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
                    <Button basic color='grey' type='button' content='Cancel'/>
                </Button.Group>
            </Form>
        </Segment>
    );
};

export default ActivityForm;
