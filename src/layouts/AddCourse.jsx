/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { toBase64 } from "../utils/Base64";

const AddCourse = () => {
  const [customError, setCustomError] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  const handleAddNewCourse = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const instructor = e.target.instructor.value;
    const fee = parseFloat(e.target.fee.value);
    const image = e.target.bannerURL.files[0];

    const bannerURL = await toBase64(image);

    const data = {
      title,
      description,
      instructor,
      fee,
      bannerURL,
      videoURL: "/video.mp4",
    };

    try {
      setCustomLoading(true);
      setCustomError("");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_server}/api/course/add`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      e.target.reset();
    } catch (error) {
      setCustomError(error?.response?.data?.message);
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-2xl bg-white p-6 md:my-12 rounded-lg">
        <form onSubmit={handleAddNewCourse} className="card-body">
          <h1 className="text-2xl text-center md:my-4">Add New Course</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="course title"
              name="title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              placeholder="course description"
              name="description"
              className="input input-bordered"
              required
            />
          </div>
          <div className="md:flex md:space-x-4">
            <div className="form-control md:flex-1">
              <label className="label">
                <span className="label-text">Instructor</span>
              </label>
              <input
                type="text"
                placeholder="instructor name"
                name="instructor"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control md:flex-1">
              <label className="label">
                <span className="label-text">Course Fee</span>
              </label>
              <input
                type="number"
                placeholder="course fee (BDT)"
                name="fee"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="md:flex md:space-x-4">
            <div className="form-control md:flex-1">
              <label className="label">
                <span className="label-text">Banner Image</span>
              </label>
              <input
                type="file"
                name="bannerURL"
                className="file-input w-full"
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <h1 className="label-text-alt text-red-600 font-semibold">
                {customError}
              </h1>
            </label>
          </div>
          <div className="form-control">
            <button className="btn btn-neutral" disabled={customLoading}>
              {customLoading ? "Adding Course..." : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
