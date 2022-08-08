import React from "react";
import addRecipeStyle from "../styles/pages/addRecipe.module.css";
import Link from "next/link";
import Image from "next/image";
import { ProfileContext } from "../contex";
import axios from "axios";
import { useRouter } from "next/router";

function AddRecipe() {
  const [title_recipe, setTitle_recipe] = React.useState("");
  const [image, setImage] = React.useState({});
  const [ingredients, setIngredients] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [vidio_step, setVidio_step] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSucces, setisSucces] = React.useState(false);
  const [succesMsg, setSuccesMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const UserConsumer = React.useContext(ProfileContext);
  const router = useRouter();

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
      bodyFormData.append("title_recipe", title_recipe);
      bodyFormData.append("image", image);
      bodyFormData.append("ingredients", ingredients);
      bodyFormData.append("description", description);
      bodyFormData.append("vidio_step", vidio_step);
      bodyFormData.append("user_id", UserConsumer.id);
      axios({
        method: "post",
        url: "http://localhost:8001/recipe/add",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setIsError(false);
          setisSucces(true);

          setSuccesMsg(res?.data);
          router.push(`/home`);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          setisSucces(false);
          console.log(UserConsumer);
          setErrorMsg(error?.response?.data);
        });
    }
  };

  return (
    <>
      <div className={addRecipeStyle.page}>
        <div className="container ">
          {/* navbar */}
          <div>
            <nav className="navbar fixed-bottom bg-light">
              <div className={`${addRecipeStyle.navbar} container-fluid `}>
                <Link href="/home" passHref>
                  <a>
                    <Image
                      src="/images/homebutton.png"
                      alt="user"
                      width="97px"
                      height="52px"
                    />
                  </a>
                </Link>
                <Link href="/addRecipe" passHref>
                  <a>
                    <Image
                      src="/images/addbutton.png"
                      alt="user"
                      width="24px"
                      height="24px"
                    />
                  </a>
                </Link>
                <Link href="/massage" passHref>
                  <a>
                    <Image
                      src="/images/messagebutton.png"
                      alt="user"
                      width="24px"
                      height="24px"
                    />
                  </a>
                </Link>
                <Link href="/profile" passHref>
                  <a>
                    <Image
                      src="/images/userbutton.png"
                      alt="user"
                      width="24px"
                      height="24px"
                    />
                  </a>
                </Link>
              </div>
            </nav>
          </div>
          <div className={addRecipeStyle.title}>
            <h3>Add Your Recipe</h3>
          </div>
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
          <div
            className={addRecipeStyle.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="title"
                onChange={(e) => setTitle_recipe(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control form-control-lg"
                id="exampleFormControlTextarea1"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3 3">
              <textarea
                className="form-control form-control-lg "
                id="exampleFormControlTextarea2"
                placeholder="Ingredients"
                onChange={(e) => setIngredients(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3 ">
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput2"
                placeholder="Add Vidio"
                onChange={(e) => setVidio_step(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 fixed-bottom mb-5">
              <label className="btn btn-default">
                Photo Library{" "}
                <input type="file" hidden onChange={handleUpload} />
              </label>
              <label className="btn btn-default mb-5">Take Photo</label>
            </div>
            <div className={addRecipeStyle.button}>
              <label
                className="btn btn-default "
                disabled={isLoading}
                onClick={handleAddRecipe}
              >
                {isLoading ? "Loading..." : "POST"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRecipe;
