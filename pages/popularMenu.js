import popularStyle from "../styles/PopularMenu.module.css";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function PopularMenu() {
  const [recipe, setRecipe] = useState([]);

  const [filter, setFilter] = useState("DESC");

  function handleAddrTypeChange(e) {
    setFilter(e.target.value);
  }

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/recipe?filter=${filter}`)
      .then((res) => {
        setRecipe(res?.data?.recipe.slice(0, 6));
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  }, [recipe]);
  return (
    <>
      <div className="container mt-4">
        <div className={popularStyle.title}>
          <div
            className="d-flex align-content-center mb-3"
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
            <h3 className="d-flex align-items-center">Popular Menu</h3>
            <div></div>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <span>
              <h5>Sort By:</h5>
            </span>
            <select
              defaultValue={filter}
              onChange={handleAddrTypeChange}
              className="Default select example "
              style={{ borderRadius: "10px", marginLeft: "5px" }}
            >
              <option selected value="DESC">
                Newest
              </option>
              <option value="ASC">Latest</option>
            </select>
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
              </Link>
            </div>
          ))}
          {/* pagination */}
          {/* <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example ">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default PopularMenu;
