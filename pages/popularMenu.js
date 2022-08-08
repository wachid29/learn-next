import popularStyle from "../styles/pages/popularMenu.module.css";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function PopularMenu() {
  const [recipe, setRecipe] = useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:8001/recipe")
      .then((res) => {
        setRecipe(res?.data?.recipe.slice(0, 6));
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  }, []);
  return (
    <>
      <div className="container mt-4">
        <div className={popularStyle.title}>
          <div
            className="d-flex align-content-center mb-4"
            style={{ justifyContent: "space-between" }}
          >
            <Link href="/home" passHref>
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
            <h3 className="d-flex align-items-center">Popular Menu</h3>
            <div></div>
          </div>
          {recipe.map((item, key) => (
            <div
              className="card"
              style={{
                borderRadius: "15px",
                padding: "10px",
                border: "none",
                "box-shadow": "2px 2px 5px 1px rgba(0,0,0,0.12)",
                marginBottom: "20px",
                cursor: "pointer",
              }}
              key={key}
            >
              <div className="row">
                <div className="col-2">
                  <div className={popularStyle.popularRecipe}>
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
                <div className="col-3 d-flex align-items-center">
                  <span className="d-flex gap-2 ">
                    <Image
                      src="/images/savedbutton.png"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PopularMenu;
