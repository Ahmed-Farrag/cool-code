import { useState } from "react";
import styles from "./Create.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Redux/UserReducer";

export default function Create() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [active, setActive] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/cities`, { name, description, active })
      .then((res) => {
        dispatch(addUser(res.data));
        // console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Add: </h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className="form-control mv-2"
            type="text"
            name="name"
            id="name"
            onChange={(e: any) => setName(e.target.value)}
          />

          <label htmlFor="description">description</label>
          <input
            className="form-control mv-2"
            type="text"
            name="description"
            id="description"
            onChange={(e: any) => setDescription(e.target.value)}
          />

          <label htmlFor="active">active</label>
          <select
            className="form-control mv-2"
            name="active"
            id="active"
            onChange={(e: any) => setActive(e.target.value)}
          >
            <option value="true">Active</option>
            <option value="false">Not-Active</option>
          </select>

          <button type="submit" className="btn btn-success text-white mt-3">
            Add
          </button>
        </form>
      </div>
    </>
  );
}
