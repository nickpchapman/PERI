import React from "react";
import { connect } from "react-redux";
import { render } from 'react-dom';
import Login from "./login.jsx";
import OneTrip from "./oneTrip.jsx";
import { fetchTrips } from "../actions/tripsActions";

@connect((store) => {
  return {
    trips: store.trips
  }
})

class Landing extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchTrips());
  }

  render () {
    return (
      <div>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column main-search">
                  <p className="title">Travel that inspires</p>
                  <form>
                    <div className="field is-grouped">
                      <div className="control is-expanded">
                        <input className="input" type="text" placeholder="Find your next adventure..."/>
                      </div>
                    <div className="control">
                      <button className="button is-primary">Submit</button>
                    </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div>{this.props.trips.allTrips.map((tripObj, i) => (
               <OneTrip trip={tripObj} key={i}/>
          ))}</div>
        </div>
      </div>
    )
  }
}

export default Landing;




// axios.get(`https://res.cloudinary.com/peri/image/list/users.json`).then((res) => {
    //   console.log('axios res =', res);
    //   this.props.dispatch(cloudinaryAction(res));
    //   // this.setState({gallery: res.data.resources});
    // }).catch(function (error) {
    //   console.log('cloudinary axios catch error =', error);
    // });
    // console.log('this props cloudinaryGallery =', this.props.cloudinaryGallery)

/* <CloudinaryContext cloudName="peri">
  <Image publicId="users.json" type="list"></Image>
</CloudinaryContext>
 */
  /* <div className="gallery">
    <CloudinaryContext cloudName="peri">
      {
        this.props.cloudinaryGallery.map(data => {
          return (
            <div className="responsive" key={data.public_id}>
              <div className="img">
                <a target="_blank" href={`https://res.cloudinary.com/peri/image/upload/${data.public_id}.jpg`}>
                  <Image publicId={`${data.public_id}.jpg`}>
                    <Transformation
                      crop="scale"
                      width="300"
                      height="300"
                      dpr="auto"
                      responsive_placeholder="blank"
                    />
                  </Image>
                </a>
              <div className="desc">Created at {data.created_at}</div>
            </div>
            </div>
          )
        })
      }
    </CloudinaryContext>
    <div className="clearfix"></div>
  </div> */