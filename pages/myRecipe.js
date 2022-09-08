import React from "react";
import Image from "next/image";
import myRecipeStyle from "../styles/myRecipe.module.css";
import Link from "next/link";
import { ProfileContext } from "../contex";
import axios from "axios";

function MyRecipe() {
  const [recipe, setRecipe] = React.useState([]);
  const UserConsumer = React.useContext(ProfileContext);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/recipebyuser?id=${UserConsumer.id}`)
      .then((res) => {
        setRecipe(res?.data?.recipe);
      })
      .catch((error) => {
        console.log("err", error);
      });
  });

  return (
    <>
      <div className="container mt-4">
        <div className={myRecipeStyle.title}>
          <div
            className="d-flex align-content-center mb-4"
            style={{ justifyContent: "space-between" }}
          >
            <Link href="/" passHref>
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
            <h3 className="d-flex align-items-center">My Recipe</h3>
            <div></div>
          </div>
          {recipe.map((item, key) => (
            <div key={key}>
              <Link
                href={`/detailRecipe/${encodeURIComponent(item.id)}`}
                passHref
              >
                <div
                  className="card"
                  style={{
                    borderRadius: "15px",
                    padding: "10px",
                    border: "none",
                    boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.12)",
                    marginBottom: "20px",
                    cursor: "pointer",
                  }}
                >
                  <div className="row">
                    <div className="col-2">
                      <div className={myRecipeStyle.popularRecipe}>
                        <Image
                          src={item?.image}
                          width="80px"
                          height="80px"
                          objectFit="cover"
                          style={{
                            borderRadius: "15px",
                          }}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="col-7 d-flex align-items-center">
                      <div style={{ marginLeft: "50px" }}>
                        <h6>{item?.title_recipe}</h6>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyRecipe;
