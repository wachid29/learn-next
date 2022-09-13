import React, { useRef } from "react";
import detailRecipeStyle from "../../styles/DetailRecipe.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ProfileContext } from "../../contex";
import { useRouter } from "next/router";

function DetailRecipe(props) {
  const recipe = props?.recipe?.recipe;
  const comment = props?.recipe?.comment;
  const [addComment, setAddComment] = React.useState("");
  const UserConsumer = React.useContext(ProfileContext);
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSucces, setisSucces] = React.useState(false);
  const [succesMsg, setSuccesMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { query } = useRouter();

  const handleComment = () => {
    setIsLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/comment/add`, {
        comment: addComment,
        user_id: UserConsumer.id,
        recipe_id: query.id,
      })
      .then((res) => {
        setIsError(false);
        setisSucces(true);
        setSuccesMsg(res?.data);
        router.push(`/detailRecipe/${query.id}`);
        setIsLoading(false);
        setisSucces(false);
      })
      .catch((error) => {
        setIsError(true);
        setisSucces(false);
        setErrorMsg(error?.response?.data);
      });
  };

  return (
    <>
      <div className={detailRecipeStyle.page}>
        {recipe?.map((item, index) => (
          <div key={index}>
            <div
              className={`${detailRecipeStyle.detaileUpper} d-flex justify-content-center`}
              style={{
                backgroundImage: `url(${item?.image})`,
              }}
            >
              <div className={`${detailRecipeStyle.titleRecipe}`}>
                <Link href="/" passHref>
                  <a>
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      style={{ border: "none" }}
                    >
                      <Image
                        src="/images/backpolos.png"
                        alt="back"
                        width="15px"
                        height="15px"
                      />
                    </button>
                  </a>
                </Link>
                <span
                  className="d-flex gap-2 mt-5"
                  style={{ paddingTop: "40px", marginBottom: "-20px" }}
                >
                  <Image
                    src="/images/savebutton.png"
                    alt="save"
                    width="36px"
                    height="36px"
                  />
                  <Image
                    src="/images/likesbutton.png"
                    alt="save"
                    width="36px"
                    height="36px"
                  />
                </span>
                <h2>{item.title_recipe}</h2>
              </div>
            </div>
            <div className={detailRecipeStyle.profileLower}>
              <div className={`${detailRecipeStyle.container} container-fluid`}>
                <div className={`${detailRecipeStyle.cardMenu} card`}>
                  <div className={detailRecipeStyle.editMenu}>
                    <h3>Ingredients</h3>
                    <h3>Vidio Step</h3>
                  </div>
                  <div className={detailRecipeStyle.itemDisplay}>
                    <div
                      className={`${detailRecipeStyle.cardItemDisplay} card mb-4`}
                    >
                      <div className="card-body">
                        <p>Ingredient</p>
                        <p>{item.ingredients}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={detailRecipeStyle.commentForm}
                    onSubmit={(e) => e.preventDefault()}
                    // ref={{ formRef }}
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
                    <textarea
                      className="form-control "
                      id="exampleFormControlTextarea1"
                      placeholder="comment :"
                      onChange={(e) => setAddComment(e.target.value)}
                    ></textarea>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-lg"
                        type="button"
                        onClick={handleComment}
                        disabled={!addComment}
                      >
                        {isLoading ? "Loading..." : "Post Comment"}
                      </button>
                    </div>
                  </div>
                  <div className={detailRecipeStyle.commmentView}>
                    <h4>Comment :</h4>
                    {comment?.map((item, index) => (
                      <div className="row mb-2" key={index}>
                        <div
                          className="col-2 card"
                          style={{ borderStyle: "none" }}
                        >
                          <img
                            src={item?.photo_profile}
                            className="card-img-bottom"
                            alt="photo profile"
                            width="32px"
                            height="32px"
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div className="col-6">
                          <h5>{item.name}</h5>
                          <h5>{item.comment}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const dataRecipe = await fetch(
    `${process.env.NEXT_PUBLIC_API}/recipe?filter=ASC`
  ).then((response) => response.json());
  return {
    paths: dataRecipe?.recipe?.map((item) => ({
      params: { id: item?.id?.toString() },
    })),
    fallback: false, // can also be true or 'blocking'
    // revalidate: 60 * 60, //In second
  };
  // revalidate: 10, //In second
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const { id } = context.params;
  const recipe = await fetch(
    `${process.env.NEXT_PUBLIC_API}/commentbyrecipe?id=${id}`
  ).then((response) => response.json());

  return {
    // Passed to the page component as props
    props: { recipe: recipe },
    revalidate: 60 * 60, //In second
  };
}

export default DetailRecipe;
