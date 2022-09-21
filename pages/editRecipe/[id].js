import React, { useEffect } from "react";
import EditRecipeStyle from "../../styles/EditRecipe.module.css";
import Link from "next/link";
import Image from "next/image";
// import { ProfileContext } from "../../contex";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function EditRecipe() {
  const [title_recipe, setTitle_recipe] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [vidio_step, setVidio_step] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSucces, setisSucces] = React.useState(false);
  const [succesMsg, setSuccesMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  // const UserConsumer = React.useContext(ProfileContext);
  const { profile } = useSelector((state) => state?.auth);
  const router = useRouter();
  const [recipe, setRecipe] = React.useState([]);
  const { query } = useRouter();

  const handleEditRecipe = () => {
    setIsLoading(true);
    if (query?.id) {
      setIsLoading(true);
      axios
        .patch(`${process.env.NEXT_PUBLIC_API}/recipe/edit`, {
          title_recipe: title_recipe,
          ingredients: ingredients,
          description: description,
          vidio_step: vidio_step,
          user_id: profile?.id,
          id: query.id,
        })
        .then((res) => {
          setIsError(false);
          setisSucces(true);
          setSuccesMsg(res?.data);
          router.push(`/myRecipe`);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          setisSucces(false);
          setErrorMsg(error?.response?.data);
        });
    }
  };

  React.useEffect(() => {
    if (query.id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/recipe/findByID?id=${query.id}`)
        .then((res) => {
          setRecipe(res?.data?.recipe);
        });
    }
  }, [query]);

  const handleDeleted = () => {
    if (query.id) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_API}/recipe/delete/${query?.id}`)
        .then((res) => {
          setIsError(false);
          setisSucces(true);
          setSuccesMsg(res?.data);
          router.push(`/myRecipe`);
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
      <div className={EditRecipeStyle.page}>
        <div className="container ">
          {/* navbar */}
          <div>
            <nav className="navbar fixed-bottom bg-light">
              <div className={`${EditRecipeStyle.navbar} container-fluid `}>
                <Link href="/" passHref>
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
          <div className={EditRecipeStyle.title}>
            <h3>Edit Your Recipe</h3>
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
          {recipe?.map((item, index) => (
            <div
              className={EditRecipeStyle.form}
              onSubmit={(e) => e.preventDefault()}
              key={index}
            >
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleFormControlInput1"
                  placeholder={item.title_recipe}
                  onChange={(e) => setTitle_recipe(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control form-control-lg"
                  id="exampleFormControlTextarea1"
                  placeholder={item.description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3 3">
                <textarea
                  className="form-control form-control-lg "
                  id="exampleFormControlTextarea2"
                  placeholder={item.ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3 ">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleFormControlInput2"
                  placeholder={item.vidio_step}
                  onChange={(e) => setVidio_step(e.target.value)}
                />
              </div>
              <div
                className={EditRecipeStyle.button}
                style={{ marginBottom: "10vh" }}
              >
                <label
                  className="btn btn-default mb-5"
                  disabled={isLoading}
                  onClick={handleEditRecipe}
                >
                  {isLoading ? "Loading..." : "Edit"}
                </label>
                <label
                  className="btn btn-default mb-5"
                  style={{ backgroundColor: " #F24545" }}
                  disabled={isLoading}
                  onClick={handleDeleted}
                >
                  {isLoading ? "Loading..." : "Delete"}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EditRecipe;
