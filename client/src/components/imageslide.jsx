import React from "react";
import SimleImageSlide from "react-simple-image-slider";
class ImageSlide extends React.Component {
  render() {
    let img = [];
    let name = this.props.name;
    const create = (err) => {
      for (let i = 1; i < 5; i++) {
        if (name !== "room") {
          let num = this.props.num;
          img.push({
            url: process.env.PUBLIC_URL + `/${name}/${num + 1}/${i}.jpg`,
          });
        } else {
          let num = this.props.num;
          img.push({
            url: process.env.PUBLIC_URL + `/${name}/${num}/${i}.jpg`,
          });
        }
      }
      return img;
    };

    return (
      <div>
        <SimleImageSlide
          width={600}
          height={450}
          images={create()}
          autoPlay={true}
          navStyle={2}
          slideDuration={0.3}
          style={{
            backgroundPosition: "center center",
            backgroundImage: "contain",
          }}
          showBullets={true}
          showNavs={false}
        />
      </div>
    );
  }
}

export default ImageSlide;
