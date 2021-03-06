import React from 'react';
import Banner from '../banner/banner';
import Modal from 'react-modal';
import { CSSTransitionGroup } from 'react-transition-group';
import { hashHistory } from 'react-router';

const modalLinks = {
  Support: [
    "Account",
    "Contact",
    "FAQ",
    "My Order",
    "Payment Options",
    "See All"],
  About: [
    "Flagship Store",
    "Our Philosophy",
    "Made by KENDO",
    "B2B",
    "Gift service",
    "The Team"]
};

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = { modalType: undefined };
  }

  setModalType(type) {
    this.setState({ type });
  }

  renderModal(type){
    if(!type) return;

    const contactText =
      <p>
        <strong>Contact Us</strong>
        <br/> +31 (020) 612 1216
        <br/> service@mendo.nl
        <br/> Chat with us
      </p>;

    const visitUsText =
      <p>
        <strong>Visit Us</strong>
        <br/>  Berenstraat 11,
        <br/> 1016 GG Amsterdam
        <br/> The Netherlands
      </p>;

    const linkTexts = modalLinks[type].map( link => {
      return(
        <li key={link}>{ link }</li>
      );
    });

    return(
      <CSSTransitionGroup
        transitionName="info-modal"
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeave={false}>
        <section className={`info-section ${type}`}>
          <h2> { type }</h2>
          <ul className="info-section-links">
            { linkTexts }
          </ul>
          <div className="contact-visit-section">
            {contactText}
            {visitUsText}
          </div>
        </section>
      </CSSTransitionGroup>
    );
  }

  render(){
    const modal = this.renderModal(this.state.type);
    return (
      <CSSTransitionGroup
        transitionName="header-transition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <div>
          <div onMouseLeave={ () => this.setModalType() } className="header">
            <nav className="nav-bar">
              <ul>
                <li onClick={ () => hashHistory.push('/homepage')}>HOME</li>
                <li onClick={ () => hashHistory.push('/books')}>BOOKS</li>
              </ul>
              <ul>
                <li onMouseEnter={ () => this.setModalType("About")}>ABOUT</li>
                <li onMouseEnter={ () => this.setModalType("Support")}>SUPPORT</li>
              </ul>
            </nav>
            { modal }
            <h2 className="logo">MENDO</h2>
          </div>
          { this.props.children }
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default Header;
