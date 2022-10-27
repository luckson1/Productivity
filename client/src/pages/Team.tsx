import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { Button } from "../components/Button";
import InviteUser from "../components/users/InviteUser";
import TeamList from "../components/users/TeamList";
import { useStateContext } from "../context/ContextProvider";
import { appDispatch, getState } from "../redux/Hooks";
import { isShowModal } from "../redux/usersSlices";

function Team() {
  const { currentColor } = useStateContext();
  const dispatch=appDispatch()


  const teamState = getState((state) => state?.users);
  const { showModal } = teamState;


  return (
    <div>
      <Button
        onClick={() => {
          dispatch(isShowModal());
        }}
        size="md"
        text="Add Member"
        bgColor={currentColor}
        borderRadius="10px"
        animationType="bounce"
      />
      <div className="mt-7">
        <TeamList />
      </div>

      {showModal && <InviteUser />}
    </div>
  );
}

export default Team;
