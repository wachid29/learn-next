import Link from "next/link";
// import homeStyle from "../styles/home.module.css";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import Slider from "react-slick";
import React, { useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
let homeStyle = {};

export default function Home() {
  const [nav2, setNav2] = useState();
  const [newRecipe, setNewRecipe] = useState([]);
  const [allRecipe, setAllRecipe] = useState([]);
  const [search, setSearch] = React.useState(null);
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event?.target[0]?.value);
  };

  React.useEffect(() => {
    if (search !== null) {
      router.push(`/search/${search}`);
    }
  });

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/recipe/get5data`)
      .then((res) => {
        setNewRecipe(res?.data);
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/recipe?filter=DESC`)
      .then((res) => {
        setAllRecipe(res?.data?.recipe.slice(0, 6));
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  }, []);

  return (
    <>
      <div className={homeStyle.home}>
        <div className="container-fluid ">
          <div>
            {/* navbar */}
            <div>
              <nav className="navbar fixed-bottom bg-light">
                <div className={`${homeStyle.navbar} container-fluid `}>
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
            {/* search box */}
            <div className="mt-5 ">
              <div className="mb-5">
                <form className="input-group mb-3" onSubmit={handleSearch}>
                  <span
                    className={`${homeStyle.icon} input-group-text bg-light`}
                    id="basic-addon1"
                  >
                    <FiSearch />
                  </span>
                  <input
                    type="text"
                    className={`${homeStyle.form} form-control bg-light`}
                    placeholder="Search Pasta, Bread, etc"
                    required
                  />
                </form>
              </div>
              {/* new recipe */}
              <section>
                <div className="mb-5">
                  <h3 className="mb-4">New Recipes</h3>
                  <Slider
                    asNavFor={nav2}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  >
                    {newRecipe?.map((item, key) => (
                      <div key={key}>
                        <Link
                          href={`/detailRecipe/${encodeURIComponent(item.id)}`}
                          passHref
                        >
                          <div
                            className={`${homeStyle.newRecipe} card text-bg-light`}
                          >
                            <Image
                              src={item?.image}
                              className={`${homeStyle.newRecipe} card-img`}
                              alt="image"
                              layout="fill"
                              objectFit="cover"
                            />
                            <div
                              className={`${homeStyle.cardOverlay} card-img-overlay`}
                            >
                              <h5 className="card-title">
                                {item?.title_recipe}
                              </h5>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Slider>
                </div>
              </section>
              {/* Popular Recipe */}
              <section>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3>Popular Recipes</h3>

                  <Link href="/popularMenu" passHref>
                    <a style={{ textDecoration: "none", color: "#6D61F2" }}>
                      More info
                    </a>
                  </Link>
                </div>
                {allRecipe?.map((item, key) => (
                  <div key={key}>
                    <Link
                      href={`/detailRecipe/${encodeURIComponent(item?.id)}`}
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
                            <div className={homeStyle.popularRecipe}>
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
                          <div className="col-10">
                            <div style={{ marginLeft: "50px" }}>
                              <h6>{item?.title_recipe}</h6>
                              <p>{item?.description}</p>
                              <div className="d-flex gap-1 align-items-center">
                                <img
                                  src="/images/star.png"
                                  alt="star"
                                  height="12px"
                                />
                                <span>4.7</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
