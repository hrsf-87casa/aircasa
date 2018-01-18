import React from 'react';
import {
  Button,
  Collapse,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Search from './Search.jsx';
import 'bootstrap/dist/css/bootstrap.css';

export default class AddListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_guests: '',
      bedrooms: 0,
      bathrooms: 0,
      name: '',
      description: '',
      summary: '',
      neighborhood: '',
      street_address: '',
      zip_code: 12345,
      city: '',
      state: '',
      cancellation_policy: '',
      nightly_price: 9.99 ,
      pic_url: '',
      rating: 0,
      listingAdded: false,
      displayMessage: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createListing() {
    const {
      num_guests,
      bedrooms,
      bathrooms,
      name,
      description,
      summary,
      neighborhood,
      street_address,
      zip_code,
      city,
      state,
      cancellation_policy,
      nightly_price,
      pic_url,
      rating,
    } = this.state;
    if (rating === '') {
      return this.setState({
        displayMessage: 'You must rate your own property. The Database requires it.',
      });
    }
    if (num_guests === '') {
      return this.setState({
        displayMessage: 'You must enter a maximum capacity',
      });
    }
    if (pic_url === '') {
      return this.setState({
        displayMessage: 'Picture URL is required',
      });
    }
    if (nightly_price === '') {
      return this.setState({
        displayMessage: 'You must set a price',
      });
    }
    if (cancellation_policy === '') {
      return this.setState({
        displayMessage: 'You must choose a cancellation policy',
      });
    }
    if (state === '') {
      return this.setState({
        displayMessage: 'State cannot be empty',
      });
    }
    if (city === '') {
      return this.setState({
        displayMessage: 'City cannot be empty',
      });
    }
    if (zip_code === '') {
      return this.setState({
        displayMessage: 'Zip Code cannot be empty',
      });
    }
    if (street_address === '') {
      return this.setState({
        displayMessage: 'Street address cannot be empty',
      });
    }
    if (neighborhood === '') {
      return this.setState({
        displayMessage: 'Neighborhood cannot be empty',
      });
    }
    if (summary === '') {
      return this.setState({
        displayMessage: 'You must include a summary',
      });
    }
    if (description === '') {
      return this.setState({
        displayMessage: 'You must include a description',
      });
    }
    if (name === '') {
      return this.setState({
        displayMessage: 'Name cannot be empty',
      });
    }
    if (bedrooms === '') {
      return this.setState({
        displayMessage: 'Bedrooms cannot be empty',
      });
    }
    if (bathrooms === '') {
      return this.setState({
        displayMessage: 'Bathrooms cannot be empty',
      });
    }
    fetch('/api/listings/host', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        num_guests,
        bedrooms,
        bathrooms,
        name,
        description,
        summary,
        neighborhood,
        street_address,
        zip_code,
        city,
        state,
        cancellation_policy,
        nightly_price,
        pic_url,
        rating,
      }),
      headers: { 'content-type': 'application/JSON' },
    })
      .then(resp =>
        (resp.status === 200
          ? this.setState({
            listingAdded: true,
          })
          : this.setState({
            displayMessage:
                  'You must be logged in to host!',
          })))
      .catch(console.error); // should be 500 only
  }

  render() {
    const styles = {
      body: {
        color: 'black',
        paddingTop: '40px',
        padding: '15px',
        margin: 'auto',
        textAlign: 'center',
        height: '100vh',
        width: '100%',
        position: 'relative',
      },
      form: {
        color: 'black',
        backgroundColor: '#ff73b3',
        opacity: '1',
        overflow: 'scroll',
      },
      warning: {
        color: '#D8000C',
        backgroundColor: '#FFD2D2',
        position: 'absolute',
        bottom: '80%',
      },
      btn: {
        cursor: 'pointer',
        textAlign: 'center',
        margin: '0 auto',
        color: '#fff',
        backgroundColor: '#ff73b3',
        opacity: '1',

      }, 
      input: {
        textAlign: 'center',
        color: '#000',
        opcaity: '1',
        maxWidth: '100%',
      }
    };

    return (
      <Container className="addListing" style={styles.body}>
        {this.state.listingAdded ? (
          <Redirect
            to={{ pathname: '/listings/hosted' }} // this will be the page they go to after successful post
          />
        ) : (
          
          <div className="Login-Only" style={styles.form}>
            
            {this.state.displayMessage ? (
              <div color="danger" style={styles.warning}>{this.state.displayMessage}</div>
            ) : (
              undefined
            )}
            {this.state.signup ? (
              <div>
                <Redirect to="/signup" />
              </div>
            ) : (
              <div style={styles.body}>
              <h1>LIST SOMETHING</h1>
                <div className="add-form">  
                  <FormGroup>
                    <Label for="propertyName">Property Name</Label>
                    <Input
                      style={styles.input}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="e.g. casa slackk"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="num_guests">Number of Guests</Label>
                    <Input
                      type="number"
                      style={styles.input}
                      name="num_guests"
                      id="num_guests"
                      placeholder="Choose a maximum capacity"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="bathrooms">Number of Bathrooms</Label>
                    <Input
                      style={styles.input}
                      type="number"
                      name="bathrooms"
                      id="bathrooms"
                      placeholder="e.g. 4 or 1.5"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="bedrooms">Number of Bedrooms</Label>
                    <Input
                      style={styles.input}
                      type="number"
                      name="bedrooms"
                      id="bedrooms"
                      placeholder="e.g. 4 or 1.5"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="neighborhood">Neighborhood</Label>
                    <Input
                      style={styles.input}
                      type="text"
                      name="neighborhood"
                      id="neighborhood"
                      placeholder="e.g. 'SOMA' or 'The Hood'"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="street_address">Street Address</Label>
                    <Input
                      style={styles.input}
                      type="text"
                      name="street_address"
                      id="street_address"
                      placeholder="e.g. 1600 Pennsylvania Ave"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="zip_code">ZIP code</Label>
                    <Input
                      style={styles.input}
                      type="number"
                      name="zip_code"
                      id="zip_code"
                      placeholder="e.g. 20500"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      style={styles.input}
                      type="text"
                      name="city"
                      id="city"
                      placeholder="e.g. Washington D.C."
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      style={styles.input}
                      type="text"
                      name="state"
                      id="state"
                      placeholder="e.g. California, Florida, Louisiana, or Washington"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="chooseRating">Select your Cancellation Policy</Label>
                    <Input
                      style={styles.input}
                      type="select"
                      name="cancellation_policy"
                      id="cancellation_policy"
                      onChange={event => this.handleChange(event)}
                    >
                      <option />
                      <option>
                        Flexible (Cancel up to 24 hours before check in and get a full refund) (minus
                        service fees)
                      </option>
                      <option>
                        Moderate (Cancel up to 7 days before check in and get a 50% refund) (minus
                        service fees)
                      </option>
                      <option>Strict</option>
                      <option>Severe</option>
                      <option>Loan Shark</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="nightly_price">Price per Night</Label>
                    <Input
                      style={styles.input}
                      type="number"
                      name="nightly_price"
                      id="zip_code"
                      placeholder="e.g. 69.99"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="pic_url">Choose a picture URL</Label>
                    <Input
                      style={styles.input}
                      type="text"
                      name="pic_url"
                      id="pic_url"
                      placeholder="e.g. https://www.mlbtraderumors.com/files/2018/01/McCutchenInsta-300x300.png"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="chooseRating">Rate your listing</Label>
                    <Input
                      style={styles.input}
                      type="select"
                      name="rating"
                      id="listingRating"
                      onChange={event => this.handleChange(event)}
                    >
                      <option />
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Describe your listing</Label>
                    <Input
                      style={styles.input}
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder="Describe your listing"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="summary">Summarize your listing</Label>
                    <Input
                      style={styles.input}
                      type="textarea"
                      name="summary"
                      id="summary"
                      placeholder="Summarize your listing"
                      onChange={event => this.handleChange(event)}
                    />
                  </FormGroup>
                  <Button style={styles.btn} onClick={() => this.createListing()}>Create your listing</Button>
                </div>
              </div>
            )}
            {this.state.displayMessage ? (
              <div color="danger" style={styles.warning} >{this.state.displayMessage}</div>
            ) : (
              undefined
            )}
          </div>  
        )}
      </Container>
    );
  }
}
