import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaTrash, FaPlus, FaCircleNotch } from "react-icons/fa";

import Auth from "../../../../auth/Auth";
import MyProfileSidebar from "./MyProfileSidebar";
import Loader from "../../../loader/Loader";

const Publication = () => {
  const navigate = useNavigate();
  const expression = /^((http|https|www):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$)/i;
  // const expression = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  const [articleDeleteId, setArticleDeleteId] = useState("");
  const [courseDeleteId, setcourseDeleteId] = useState("");
  const [bookDeleteId, setBookDeleteId] = useState("");
  const [articleDataIndex, setArticleDataIndex] = useState();
  const [courseDataIndex, setCourseDataIndex] = useState();
  const [bookDataIndex, setBookDataIndex] = useState();

  const [commonLoader, setCommonLoader] = useState({
    articleDelete: false,
    articleLoader: false,
    articleButTog: false,
    courseDelete: false,
    courseLoader: false,
    courseButTog: false,
    bookDelete: false,
    bookLoader: false,
    bookButTog: false,
    pageLoader:false
  });

  const [articleData, setArticleData] = useState([
    { articleTitle: "", articleLink: "" },
  ]);

  const [courseData, setCourseData] = useState([
    { courseTitle: "", courseLink: "", courseFiles: "", courseFee: "" },
  ]);

  const [bookData, setBookData] = useState([
    {
      bookTitle: "",
      bookLink: "",
      bookYearPublisher: "",
      bookPublisher: "",
      bookCoverimage: "",
    },
  ]);

  // handle course input change
  const handleCourseInputChange = (e, index) => {
    let { name, value, files } = e.target;
    if (name === "courseFiles") {
      value = files[0];
    }
    const list = [...courseData];
    list[index][name] = value;
    setCourseData(list);
  };

  // handle book input change
  const handleBookInputChange = (e, index) => {
    let { name, value, files } = e.target;
    if (name === "bookCoverimage") {
      value = files[0];
    }
    const list = [...bookData];
    list[index][name] = value;
    setBookData(list);
  };

  // handle course click event of the Remove button
  const handleRemoveClickCourse = (index, delId) => {
    setcourseDeleteId(delId);
    if (!commonLoader.courseButTog && !delId) {
      const list = [...courseData];
      list.splice(index, 1);
      setCourseData(list);
      setCommonLoader({ ...commonLoader, courseButTog: true });
    } else {
      setCommonLoader({ ...commonLoader, courseDelete: true });
    }
  };

  // handle book click event of the Remove button
  const handleRemoveClickBook = (index, delId) => {
    setBookDeleteId(delId);
    if (!commonLoader.bookButTog && !delId) {
      const list = [...bookData];
      list.splice(index, 1);
      setBookData(list);
      setCommonLoader({ ...commonLoader, bookButTog: true });
    } else {
      setCommonLoader({ ...commonLoader, bookDelete: true });
    }
  };

  // handle course click event of the Add button
  const handleAddClickCourse = () => {
    setCourseData([
      ...courseData,
      { courseTitle: "", courseLink: "", courseFiles: "", title: "", link: "" },
    ]);
  };

  // handle book click event of the Add button
  const handleAddClickBook = () => {
    setBookData([
      ...bookData,
      {
        bookTitle: "",
        bookLink: "",
        bookYearPublisher: "",
        bookPublisher: "",
        bookCoverimage: "",
      },
    ]);
  };

  // handle paresent input change
  const handleArticleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...articleData];
    list[index][name] = value;
    setArticleData(list);
  };

  // handle article click event of the Remove button
  const handleRemoveClickArticle = (index, delId) => {
    setArticleDeleteId(delId);
    if (!commonLoader.articleButTog && !delId) {
      const list = [...articleData];
      list.splice(index, 1);
      setArticleData(list);
      setCommonLoader({ ...commonLoader, articleButTog: true });
    } else {
      setCommonLoader({ ...commonLoader, articleDelete: true });
    }
  };

  // handle paresent click event of the Add button
  const handleAddClickArticle = () => {
    setArticleData([...articleData, { articleTitle: "", articleLink: "" }]);
  };

  // Articles post api
  const postArticleApi = async () => {
    setCommonLoader({ ...commonLoader, articleLoader: true });
    const keyValue = {
      article: articleData,
    };
    const requestKey = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
      body: JSON.stringify(keyValue),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/speakerPublicationArticles`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, articleLoader: false });
      articlesGetApi();
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, articleButTog: true });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, articleLoader: false });
      toast.warn(error.message);
    }
  };

  // course post api
  const coursePostApi = async () => {
    setCommonLoader({ ...commonLoader, courseLoader: true });
    const formData = new FormData();

    formData.append(
      "speakerCouresData",
      JSON.stringify(
        courseData?.map((data) => [
          {
            courseTitle: data?.courseTitle,
            courseFee: data?.courseFee,
            courseLink: data.courseLink,
            id: data?._id,
          },
        ])
      )
    );

    courseData
      ?.map((data) => data?.courseFiles)
      ?.map((data) => formData?.append("courseFiles", data));

    const requestKey = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/speakerPublicationEcourses`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, courseLoader: false });
      courseGetApi();
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, courseButTog: true });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, courseLoader: false });
      toast.warn(error.message);
    }
  };

  // book post api
  const bookPostApi = async () => {
    setCommonLoader({ ...commonLoader, bookLoader: true });
    const formData = new FormData();

    formData.append(
      "speakerBooksData",
      JSON.stringify(
        bookData?.map((data) => [
          {
            bookTitle: data?.bookTitle,
            bookPublisher: data?.bookPublisher,
            bookYearPublisher: data?.bookYearPublisher,
            bookLink: data.bookLink,
            id: data?._id,
          },
        ])
      )
    );

    bookData
      ?.map((data) => data?.bookCoverimage)
      ?.map((data) => formData?.append("bookCoverImage", data));

    const requestKey = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/speakerPublicationBooks`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, bookLoader: false });
      bookGetApi();
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, bookButTog: true });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, bookLoader: false });
      toast.warn(error.message);
    }
  };

  // Article get api
  const articlesGetApi = async () => {
    setCommonLoader({commonLoader,pageLoader:true});
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerPublicationArticles`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setCommonLoader({commonLoader,pageLoader:false});
      const data = await res.json();
      if (data?.data?.length > 0) {
        setArticleData(data?.data);
      } else {
        setArticleData([{ articleTitle: "", articleLink: "" }]);
        setCommonLoader({ ...commonLoader, articleButTog: false });
      };
    };
    if (res.status >= 400 && res.status <= 500) {
      setCommonLoader({commonLoader,pageLoader:false});
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
    };
  };

  // cource get api
  const courseGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerPublicationEcourses`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setCourseData(data?.data);
      } else {
        setCourseData([
          { courseTitle: "", courseLink: "", courseFiles: "", courseFee: "" },
        ]);
        setCommonLoader({ ...commonLoader, courseButTog: false });
      }
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
    }
  };

  // book get api
  const bookGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerPublicationBooks`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setBookData(data?.data);
      } else {
        setBookData([
          {
            bookTitle: "",
            bookLink: "",
            bookYearPublisher: "",
            bookPublisher: "",
            bookCoverimage: "",
          },
        ]);
        setCommonLoader({ ...commonLoader, bookButTog: false });
      }
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
    }
  };

  // Delete article data api
  const deleteArticleApi = async () => {
    setCommonLoader({ ...commonLoader, articleLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerPublicationArticles/${articleDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      articlesGetApi();
      setCommonLoader({ ...commonLoader, articleLoader: false });
      setCommonLoader({ ...commonLoader, articleDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, articleLoader: false });
      setCommonLoader({ ...commonLoader, articleDelete: false });
    }
  };

  // Delete course data api
  const deleteCourseApi = async () => {
    setCommonLoader({ ...commonLoader, courseLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerPublicationEcourses/${courseDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      courseGetApi();
      setCommonLoader({ ...commonLoader, courseLoader: false });
      setCommonLoader({ ...commonLoader, courseDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, courseLoader: false });
      setCommonLoader({ ...commonLoader, courseDelete: false });
    }
  };

  // Delete book data api
  const deleteBookApi = async () => {
    setCommonLoader({ ...commonLoader, bookLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerPublicationBooks/${bookDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      bookGetApi();
      setCommonLoader({ ...commonLoader, bookLoader: false });
      setCommonLoader({ ...commonLoader, bookDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, bookLoader: false });
      setCommonLoader({ ...commonLoader, bookDelete: false });
    }
  };

  // Handle Article validation
  const handleArticleValidation = (e) => {
    e.preventDefault();
    if (articleData.map((data) => data.articleTitle).includes("")) {
      toast.warn("Article title field is required");
    } else if (articleData.map((data) => data.articleLink).includes("")) {
      toast.warn("Article link field is required");
    } else if (
      expression.test([articleData.map((data) => data.articleLink)?.at(-1)]) ===
      false
    ) {
      toast.warn("Invalid Link");
    } else {
      postArticleApi();
    }
  };

  //   Handle my courses validation
  const handleCourseValidation = (e) => {
    e.preventDefault();
    if (courseData.map((data) => data.courseTitle).includes("")) {
      toast.warn("Title field is required");
    } else if (courseData.map((data) => data.courseLink).includes("")) {
      toast.warn("Link field is required");
    } else if (
      expression.test([courseData.map((data) => data.courseLink)?.at(-1)]) ===
      false
    ) {
      toast.warn("Invalid Link");
    } else if (courseData.map((data) => data.courseFiles).includes("")) {
      toast.warn("Cover image is required");
    } else if (courseData.map((data) => data.courseFee).includes("")) {
      toast.warn("Course fee field is required");
    } else if (
      (courseData && courseData?.map((data) => data?.courseFiles))
        ?.map((siz) => siz?.size / (1024 * 1024) > 5)
        ?.includes(true)
    ) {
      toast.warn(
        "Please ensure that the uploaded file size does not exceed 5MB"
      );
    } else {
      coursePostApi();
    }
  };

  //   Handle my book validation
  const handleBookValidation = (e) => {
    e.preventDefault();
    if (bookData.map((data) => data.bookTitle).includes("")) {
      toast.warn("Title field is required");
    } else if (bookData.map((data) => data.bookLink).includes("")) {
      toast.warn("Link field is required");
    } else if (
      expression.test([bookData.map((data) => data.bookLink)?.at(-1)]) === false
    ) {
      toast.warn("Invalid Link");
    } else if (bookData.map((data) => data.bookYearPublisher).includes("")) {
      toast.warn("Year publisher field is required");
    } else if (bookData.map((data) => data.bookPublisher).includes("")) {
      toast.warn("Publisher field is required");
    } else if (bookData.map((data) => data.bookFiles).includes("")) {
      toast.warn("Book cover image is required");
    } else {
      bookPostApi();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    articlesGetApi();
    courseGetApi();
    bookGetApi();
    // eslint-disable-next-line
  }, []);

  const fees = ["free", "paid"];

  useEffect(() => {
    articleData?.map((ele, ind) => setArticleDataIndex(ind));
    courseData?.map((ele, ind) => setCourseDataIndex(ind));
    bookData?.map((ele, ind) => setBookDataIndex(ind));
  }, [articleData, courseData, bookData]);

  return (
    <Fragment>
      {commonLoader.pageLoader && <Loader/>}
      <Helmet>
        <title>Publication</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-publication">
          <div className="mp-form-heading">Publication</div>
          <form action="" className="row">
            {/* Article input field*/}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Articles
              </label>
              <div className="generate-panel-head">
                {articleData &&
                  articleData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            TITLE<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.articleTitle}
                            name="articleTitle"
                            onChange={(e) => handleArticleInputChange(e, i)}
                            className="form-control"
                            placeholder="Your title..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            Link<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="articleLink"
                            value={x.articleLink}
                            placeholder="https://..."
                            onChange={(e) => handleArticleInputChange(e, i)}
                            className={`form-control ${
                              expression.test([
                                articleData
                                  .map((data) => data.articleLink)
                                  ?.at(-1),
                              ]) === false &&
                              articleData
                                .map((data) => data.articleLink)
                                .includes("") === false
                                ? `error-message`
                                : ``
                            }`}
                          />
                        </div>
                        {articleData.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveClickArticle(i, x?._id)
                              }
                            >
                              <i>
                                <FaTrash />
                              </i>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
              {articleData.length - 1 === articleDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickArticle();
                      setCommonLoader({
                        ...commonLoader,
                        articleButTog: false,
                      });
                    }}
                  >
                    <i className="add-new-icon">
                      <FaPlus />
                    </i>{" "}
                    &nbsp;add new
                  </button>
                </div>
              )}
            </div>
            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonLoader.articleLoader && { disabled: true })}
                onClick={(e) => handleArticleValidation(e)}
              >
                save articles{" "}
                <span className="btn-loader">
                  {commonLoader.articleLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>

            {/* E-courses input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                E-courses
              </label>
              <div className="generate-panel-head">
                {courseData &&
                  courseData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            E-COURSE'S TITLE<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.courseTitle}
                            name="courseTitle"
                            onChange={(e) => handleCourseInputChange(e, i)}
                            className="form-control"
                            placeholder="Your title..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            E-COURSE'S URL<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="courseLink"
                            value={x.courseLink}
                            placeholder="https://..."
                            onChange={(e) => handleCourseInputChange(e, i)}
                            className={`form-control ${
                              expression.test([
                                courseData
                                  .map((data) => data.courseLink)
                                  ?.at(-1),
                              ]) === false &&
                              courseData
                                .map((data) => data.courseLink)
                                .includes("") === false
                                ? `error-message`
                                : ``
                            }`}
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            E-COURSE'S COVER IMAGE
                          </label>
                          {!(!x.courseFiles?.size && x.courseFiles) && (
                            <input
                              type="file"
                              name="courseFiles"
                              accept=".jpg,.jpeg,.png,.heic"
                              onChange={(e) => handleCourseInputChange(e, i)}
                              className="form-control"
                            />
                          )}
                          <div>
                            {/* response e-course image show */}
                            {x?._id && (
                              <img
                                title={x?.courseFiles?.name}
                                className="gallery-images"
                                src={`${process.env.REACT_APP_IMAGE_URL}${x.courseFiles}`}
                                height="80px"
                                width="80px"
                                style={{ borderRadius: "50%" }}
                                alt={x?.courseFiles?.name}
                              />
                            )}
                          </div>
                          {/* select e-course image show */}
                          <div>
                            {x?.courseFiles?.name && (
                              <img
                                title={x?.courseFiles?.name}
                                className="gallery-images"
                                src={URL.createObjectURL(x.courseFiles)}
                                height="80px"
                                width="80px"
                                style={{ borderRadius: "50%" }}
                                alt={x?.courseFiles?.name}
                              />
                            )}
                          </div>

                          <label htmlFor="" className="form-label">
                            E-COURSE'S FEE
                            <sup className="text-red">*</sup>
                          </label>
                          {fees.map((data,index) => {
                            return (
                              <div className="form-check" key={index}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={data}
                                  checked={data === x.courseFee}
                                  name="courseFee"
                                  // id="free"
                                  onChange={(e) =>
                                    handleCourseInputChange(e, i)
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  // htmlFor="free"
                                >
                                  {data}
                                </label>
                              </div>
                            );
                          })}
                          {/* <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              defaultChecked={x.courseFee==="paid" ? true:false}
                              value="paid"
                              name="courseFee"
                              id="paid"
                              onChange={(e) => handleCourseInputChange(e, i)}
                            />
                            <label className="form-check-label" htmlFor="paid">Paid</label>
                          </div> */}
                        </div>
                        {courseData.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleRemoveClickCourse(i, x?._id)}
                            >
                              <i>
                                <FaTrash />
                              </i>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
              {courseData.length - 1 === courseDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickCourse();
                      setCommonLoader({ ...commonLoader, courseButTog: false });
                    }}
                  >
                    <i className="add-new-icon">
                      <FaPlus />
                    </i>
                    &nbsp;add new
                  </button>
                </div>
              )}
            </div>
            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonLoader.courseLoader && { disabled: true })}
                onClick={(e) => handleCourseValidation(e)}
              >
                save e-courses{" "}
                <span className="btn-loader">
                  {commonLoader.courseLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* Book input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Books
              </label>
              <div className="generate-panel-head">
                {bookData &&
                  bookData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            BOOK'S TITLE
                            <sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.bookTitle}
                            name="bookTitle"
                            onChange={(e) => handleBookInputChange(e, i)}
                            className="form-control"
                            placeholder="Your title..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            BOOK'S LINK<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="bookLink"
                            value={x.bookLink}
                            placeholder="https://..."
                            onChange={(e) => handleBookInputChange(e, i)}
                            className={`form-control ${
                              expression.test([
                                bookData.map((data) => data.bookLink)?.at(-1),
                              ]) === false &&
                              bookData
                                .map((data) => data.bookLink)
                                .includes("") === false
                                ? `error-message`
                                : ``
                            }`}
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            YEAR PUBLISHED
                            <sup className="text-red">*</sup>
                          </label>
                          <input
                            type="month"
                            value={x.bookYearPublisher}
                            name="bookYearPublisher"
                            onChange={(e) => handleBookInputChange(e, i)}
                            className="form-control"
                            placeholder="Your title..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            PUBLISHER
                            <sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.bookPublisher}
                            name="bookPublisher"
                            onChange={(e) => handleBookInputChange(e, i)}
                            className="form-control"
                            placeholder="Enter your publisher..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            BOOK'S COVER IMAGE
                          </label>
                          {!(!x.bookCoverImage?.size && x.bookCoverImage) && (
                            <input
                              type="file"
                              name="bookCoverimage"
                              accept=".jpg,.jpeg,.png,.heic"
                              onChange={(e) => handleBookInputChange(e, i)}
                              className="form-control"
                            />
                          )}
                          <div>
                            {/* response book image show */}
                            {x?._id && (
                              <img
                                title={x?.bookCoverImage?.name}
                                className="gallery-images"
                                src={`${process.env.REACT_APP_IMAGE_URL}${x.bookCoverImage}`}
                                height="80px"
                                width="80px"
                                style={{ borderRadius: "50%" }}
                                alt={x?.bookCoverImage?.name}
                              />
                            )}
                          </div>
                          {/* select book image show */}
                          <div>
                            {x?.bookCoverimage?.name && (
                              <img
                                title={x?.bookCoverimage?.name}
                                className="gallery-images"
                                src={URL.createObjectURL(x.bookCoverimage)}
                                height="80px"
                                width="80px"
                                style={{ borderRadius: "50%" }}
                                alt={x?.bookCoverimage?.name}
                              />
                            )}
                          </div>
                        </div>

                        {bookData.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleRemoveClickBook(i, x._id)}
                            >
                              <i>
                                <FaTrash />
                              </i>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
              {bookData.length - 1 === bookDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickBook();
                      setCommonLoader({ ...commonLoader, bookButTog: false });
                    }}
                  >
                    <i className="add-new-icon">
                      <FaPlus />
                    </i>{" "}
                    &nbsp;add new
                  </button>
                </div>
              )}
            </div>
            {/* <div className="divider"></div> */}
            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonLoader.bookLoader && { disabled: true })}
                onClick={(e) => handleBookValidation(e)}
              >
                save books{" "}
                <span className="btn-loader">
                  {commonLoader.bookLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* article delete modal section start */}
      <Modal
        show={commonLoader.articleDelete}
        onHide={() =>
          setCommonLoader({ ...commonLoader, articleDelete: false })
        }
        className="article-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete article data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, articleDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.articleLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteArticleApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.articleLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* E-course delete modal section start */}
      <Modal
        show={commonLoader.courseDelete}
        onHide={() => setCommonLoader({ ...commonLoader, courseDelete: false })}
        className="ecource-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete e-cource data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, courseDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.courseLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteCourseApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.courseLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* books delete modal section start */}
      <Modal
        show={commonLoader.bookDelete}
        onHide={() => setCommonLoader({ ...commonLoader, bookDelete: false })}
        id="books-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete book data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, bookDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.bookLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteBookApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.bookLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Publication;
