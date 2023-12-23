import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../../Redux/UserReducer";

export default function Home(props: any) {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.users);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/cities`);
        console.log(res);

        dispatch(getUser(res.data));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handledelete = (id: any) => {
    axios
      .delete("http://localhost:3000/cities/" + id)
      .then((res) => {
        console.log(res);
        dispatch(deleteUser({ id }));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <div className="card">
          <div className="card-header">
            <Link to={"/create"} className="btn btn-success">
              Add+
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>Title</td>
                  <td>Desc</td>
                  <td>Date</td>
                  <td>active</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, id: number) => {
                  return (
                    <tr key={id}>
                      <td>{user.name}</td>
                      <td>{user.desc}</td>
                      <td>{new Date(user.date).toLocaleString()}</td>

                      {user.active === true ? (
                        <td>
                          <h1> &#x2713;</h1>{" "}
                        </td>
                      ) : (
                        <td>
                          <h1>&#x2717;</h1>
                        </td>
                      )}

                      <td>
                        <Link
                          to={`/edit/${user.id}`}
                          className="btn btn-sm btn-success me-2"
                        >
                          update
                        </Link>
                        <button
                          onClick={() => handledelete(user.id)}
                          className="btn btn-sm btn-danger me-2"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
