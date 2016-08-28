import React, { Component } from 'react';

class ProfileMenu extends Component {
	constructor() {
		super();
		this.state = {
			showProfileNav: false

		}
	}

	handleClick = () => {
		if (this.state.showProfileNav) {
			this.setState({showProfileNav: false})
		} else {
			this.setState({showProfileNav: true})
		}
	};
	
	handleClickOutside = (e) => {
		if (e.target != this.refs.profileBtn) {
			this.setState({showProfileNav: false})
		}
	};

	componentWillMount() {
		window.addEventListener("click", this.handleClickOutside, false);
	}

	componentWillUnMount() {
		window.removeEventListener("click", this.handleClickOutside, false);
	}

	renderProfileNav() {
		return (
		    <nav className="profile-nav" ref="profileNav">
				<a href="#">My Porfile</a>
				<a href="#">LogOut</a>
		    </nav>
		);
	}

	render() {
		return (
			<section className="profile-menu">
				<img src="/img/Tony.jpg" onClick={this.handleClick} className="profile-btn medium-avatar" ref="profileBtn"/>
				{
					this.state.showProfileNav ? this.renderProfileNav() : null
				}
			</section>
	    );
	}
}

export default ProfileMenu;