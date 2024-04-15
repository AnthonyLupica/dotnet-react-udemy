import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    isEditMode: boolean;
    selectActivity: (id: string) => void;
    cancelActivitySelection: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
}

const ActivityDashboard = ({ 
    activities,
    selectedActivity,
    isEditMode,
    selectActivity,
    cancelActivitySelection,
    openForm,
    closeForm
}: Props) => {

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width='6'> { selectedActivity && !isEditMode &&
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelActivitySelection={cancelActivitySelection} 
                        openForm={openForm}
                    />
                } { isEditMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} />
                }
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;
