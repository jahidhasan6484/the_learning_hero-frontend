import { useParams } from "react-router-dom";
import LoadingPage from "../shared/LoadingPage";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { toBase64 } from "../../utils/Base64";

const UpdateCourse = () => {
  const { id } = useParams();
  const [customLoading, setCustomLoading] = useState(true);
  const [customError, setCustomError] = useState("");
  const [course, setCourse] = useState({});

  useEffect(() => {
    setCustomLoading(true);
    setCustomError("");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_server}/api/course/one?courseId=${id}`
        );

        setCourse(response?.data?.data);
      } catch (error) {
        setCustomError(error?.response?.data?.message);
      } finally {
        setCustomLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  if (customLoading) {
    return <LoadingPage />;
  }

  if (customError && Object.keys(course).length < 0) {
    toast.error(customError);
  }

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const instructor = e.target.instructor.value;
    const fee = parseFloat(e.target.fee.value);
    const image = e.target.bannerURL.files[0];

    const data = {};

    if (title && title !== course.title) {
      data.title = title;
    }
    if (description && description !== course.description) {
      data.description = description;
    }
    if (instructor && instructor !== course.instructor) {
      data.instructor = instructor;
    }
    if (fee && fee !== course.fee) {
      data.fee = fee;
    }

    if (image) {
      try {
        data.bannerURL = await toBase64(image);
      } catch (error) {
        setCustomError("An error occurred while converting the image");
        return;
      }
    }

    if (Object.keys(data).length === 0) {
      setCustomError("There is no changes in your course information");
      return;
    }

    try {
      setCustomLoading(true);
      setCustomError("");
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${import.meta.env.VITE_server}/api/course/update?courseId=${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setCourse({});
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
        <form onSubmit={handleUpdateCourse} className="card-body">
          <h1 className="text-2xl text-center md:my-4">Update Course</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="course title"
              name="title"
              defaultValue={course?.title}
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
              defaultValue={course?.description}
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
                defaultValue={course?.instructor}
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
                defaultValue={course?.fee}
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
              />
            </div>
            {course.bannerURL && (
              <div className="md:flex-1 mt-2 md:mt-0">
                <span className="label-text">Current Image:</span>
                <img
                  src={course.bannerURL}
                  alt="Current blog cover"
                  className="mt-2 rounded-md max-h-48"
                />
              </div>
            )}
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
              {customLoading ? "Updating Course..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
