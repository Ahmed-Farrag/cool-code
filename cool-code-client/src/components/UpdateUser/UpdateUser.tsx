import { useState } from "react";
import styles from "./UpdateUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Updat } from "../../Redux/UserReducer";

export default function UpdateUser() {
  const { id } = useParams();
  const users = useSelector((state: any) => state.users.users);
  const user = users.find((u: any) => u.id === id);

  const [name, setName] = useState(user?.name || "");
  const [description, setDescription] = useState(user?.description || "");
  const [active, setActive] = useState(user?.active || false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e: any) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3000/cities/${id}`, {
        name,
        description,
        active,
      })
      .then((res) => {
        dispatch(Updat(res.data));
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Update: </h3>
        <form onSubmit={handleUpdate}>
          <label htmlFor="name">Name</label>
          <input
            className="form-control mv-2"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />

          <label htmlFor="description">description</label>
          <input
            className="form-control mv-2"
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />

          <label htmlFor="active">active</label>
          <select
            className="form-control mv-2"
            name="active"
            id="active"
            value={active}
            onChange={(e: any) => setActive(e.target.value)}
          >
            <option value="true">Active</option>
            <option value="false">Not-Active</option>
          </select>

          <button type="submit" className="btn btn-success text-white mt-3">
            Update
          </button>
        </form>
      </div>
    </>
  );
}
