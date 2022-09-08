import React from "react";
import Image from "next/image";
import editProfileStyle from "../styles/pages/editProfile.module.css";
import { ProfileContext } from "../contex";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function EditProfile() {
  const router = useRouter();
  const [image, setImage] = React.useState({});
  const UserConsumer = React.useContext(ProfileContext);
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSucces, setisSucces] = React.useState(false);
  const [succesMsg, setSuccesMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpload = (e) => {
    let uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setImage(uploadedImage);
    }
  };
  const handleAddRecipe = () => {
    setIsLoading(true);
    if (!image) {
      console.log("error here");
    } else {
      let bodyFormData = new FormData();
      bodyFormData.append("email", UserConsumer.email);
      bodyFormData.append("profile", image);
      axios({
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_API}/userdata/editPhoto`,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setIsError(false);
          setisSucces(true);
          setSuccesMsg(res?.data);
          router.push("/profile");
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          setisSucces(false);
          setErrorMsg(error?.response?.data);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className={editProfileStyle.title}>
          <div
            className="d-flex align-content-center mt-2 mb-4"
            style={{ justifyContent: "space-between" }}
          >
            <Link href="/profile" passHref>
              <a>
                <button type="button" className="btn btn-light">
                  <Image
                    src="/images/backbutton.png"
                    alt="back"
                    width="48px"
                    height="48px"
                  />
                </button>
              </a>
            </Link>
            <h3 className="d-flex align-items-center">Edit Profile</h3>
            <div></div>
          </div>
          <div className={editProfileStyle.changesItem}>
            <h4>Change Profile Picture</h4>
            <hr />
            <h4>Change Password</h4>
            <hr />
          </div>
          <div>
            <div className={editProfileStyle.buttonInput}>
              <div
                className="d-grid gap-2 fixed-bottom"
                onSubmit={(e) => e.preventDefault()}
              >
                {isError ? (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                ) : null}
                {isSucces ? (
                  <div className="alert alert-warning" role="alert">
                    {succesMsg}
                  </div>
                ) : null}
                <label className="btn btn-default">
                  Photo Library
                  <input type="file" hidden onChange={handleUpload} />
                </label>
                <label className="btn btn-default">Take Photo</label>
                <div className="d-grid gap-2 mt-3 mb-4">
                  <label
                    className="btn btn-default "
                    style={{ background: "#EFC81A" }}
                    disabled={isLoading}
                    onClick={handleAddRecipe}
                  >
                    {isLoading ? "Loading..." : "EDIT"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
