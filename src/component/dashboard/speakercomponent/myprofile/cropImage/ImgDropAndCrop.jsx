import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import {
  base64StringtoFile,
  // downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef,
} from "./ResuableUtils";

const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";

class ImgDropAndCrop extends Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.state = {
      imgSrc: null,
      cropModal: true,
      imgSrcExt: null,
      crop: {
        aspect: undefined,
      },
    };
  }

  handleOnDrop = (files, rejectedFiles) => {
    if (files && files.length > 0) {
      // imageBase64Data
      const currentFile = files[0];
      const myFileItemReader = new FileReader();
      myFileItemReader.addEventListener(
        "load",
        () => {
          // console.log(myFileItemReader.result)
          const myResult = myFileItemReader.result;
          this.setState({
            imgSrc: myResult,
            imgSrcExt: extractImageFileExtensionFromBase64(myResult),
          });
        },
        false
      );

      myFileItemReader.readAsDataURL(currentFile);
    }
  };

  handleOnCropChange = (crop) => {
    this.setState({ crop: crop });
  };
  handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc } = this.state;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
  };
  handleDownloadClick = (event) => {
    this.setState({ cropModal: false });
    event.preventDefault();
    const { imgSrc } = this.state;
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;

      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);
      // console.log("download image",imageData64);

      const myFilename = "previewFile." + imgSrcExt;

      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      this.setState({
        demo: myNewCroppedFile,
      });
      this.props.cropImage(myNewCroppedFile);
      // console.log("download image 2",myNewCroppedFile)
      // download file
      // downloadBase64File(imageData64, myFilename)
      this.handleClearToDefault();
    }
  };

  handleClearToDefault = (event) => {
    this.setState({ cropModal: false });
    if (event) event.preventDefault();
    const canvas = this.imagePreviewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.setState({
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: undefined,
      },
    });
    this.fileInputRef.current.value = null;
  };

  handleFileSelect = (event) => {
    const files = event.target.files;
    // console.log("selectImage",files[0]);
    this.props.selectImage(files[0]);
    // console.log(event)
    if (files && files.length > 0) {
      // imageBase64Data
      const currentFile = files[0];
      const myFileItemReader = new FileReader();
      myFileItemReader.addEventListener(
        "load",
        () => {
          // console.log(myFileItemReader.result)
          const myResult = myFileItemReader.result;
          this.setState({
            imgSrc: myResult,
            imgSrcExt: extractImageFileExtensionFromBase64(myResult),
          });
        },
        false
      );

      myFileItemReader.readAsDataURL(currentFile);
    }
  };

  render() {
    const { imgSrc } = this.state;
    return (
      <div>
        <input
          ref={this.fileInputRef}
          name="photo"
          id="mp-upload-photo1"
          style={{ display: "none" }}
          onClick={(e) => {
            e.target.value = null;
          }}
          type="file"
          accept={acceptedFileTypes}
          multiple={false}
          onChange={this.handleFileSelect}
        />
        {imgSrc && (
        <Modal
          show={this.state.cropModal || imgSrc}
          // onHide={() => this.setState({ cropModal: false })}
          id="crop-image-pop"
          backdrop="static"
          keyboard={false}
          centered
        >
          {/* <Modal.Header></Modal.Header> */}
          <Modal.Body>
            <h5>Crop image</h5>
            <div>
              <ReactCrop
                src={imgSrc}
                crop={this.state.crop}
                onComplete={this.handleOnCropComplete}
                onChange={this.handleOnCropChange}
              />

              <br />
              {/* {/ <p>Preview Canvas Crop </p> /} */}
              <canvas
                style={{ display: "none" }}
                ref={this.imagePreviewCanvasRef}
              ></canvas>
              <div className="dual-btn">
                <div className="sap-btn-dark mt-4">
                  <button type="button" onClick={this.handleClearToDefault}>
                    Clear
                  </button>
                </div>
                {this.state.crop.height > 0 && (
                  <div className="sap-btn-light mt-4">
                    <button type="button" onClick={this.handleDownloadClick}>
                      Done
                    </button>
                  </div>
                )}
              </div>
              
            </div>
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>
        )} 
        {/* {imgSrc && (
          <div className="sap-btn-dark login-btn">
            <button
              type="button"
              onClick={() => this.setState({ cropModal: true })}
            >
              Crop Image
            </button>
          </div>
        )} */}
      </div>
    );
  }
}

export default ImgDropAndCrop;
