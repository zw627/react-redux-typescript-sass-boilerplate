import { connect } from "react-redux";

// Component
import AddPlayerForm from "Components/Scoreboard/AddPlayerForm";

// Store
import { add } from "Store/scoreboard/player/actions";

export interface AddPlayerFormProps {
  add: typeof add;
}

const actionCreators = { add };

export default connect(null, actionCreators)(AddPlayerForm);
