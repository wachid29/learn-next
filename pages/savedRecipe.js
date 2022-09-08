import React from "react";
import Image from "next/image";
import savedRecipeStyle from "../styles/pages/savedRecipe.module.css";
import Link from "next/link";

function SavedRecipe() {
  return (
    <>
      <div className="container mt-4">
        <div className={savedRecipeStyle.title}>
          <div
            className="d-flex align-content-center mb-4"
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

            <h3 className="d-flex align-items-center">Saved Recipe</h3>
            <div></div>
          </div>
          {[...new Array(6)].map((item, index) => (
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
              key={index}
            >
              <div className="row">
                <div className="col-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotek_Indonesian_food.jpg/1507px-Lotek_Indonesian_food.jpg"
                    width="80px"
                    height="80px"
                    style={{ borderRadius: "16px", objectFit: "cover" }}
                    alt="image"
                  />
                </div>
                <div className="col-10">
                  <div style={{ marginLeft: "20px" }}>
                    <h6>Test title</h6>
                    <p>Spicy, Salted, Tasty</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SavedRecipe;
