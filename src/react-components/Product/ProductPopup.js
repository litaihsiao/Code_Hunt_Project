import React, { Component } from 'react';
import Popup from '../Navbar/Popup';

class ProductPopup extends Component {
	constructor () {
		super();
		this.state = {
			product: {
				id: 1,
		        name: 'Codecademy',
		        link: 'https://codecademy.com',
		        media: '/img/codecademy.jpeg',
		        upvote: 169,
		        description: 'Code for anyone',
		        maker: {
		            name: 'Tony',
		            avatar: '/img/Tony.jpg'
		        }
			},
			comments: [
				{
					name: "Tony",
					avatar: '/img/Tony.jpg',
					content: "I love this product"
				},
				{
					name: "Tony2",
					avatar: '/img/Tony2.jpg',
					content: "I love this product 2"
				},
			]
		}
	}


	renderUpvoteButton() {
	  	return (
		    <a className="upvote-button" href="#">
	          <span>
	            <i className="fa fa-sort-asc"></i>
	          </span>
	          {this.state.product.upvote}
	        </a>
	  	);
	}

	renderHeader() {
		return (
			<header style={{backgroundImage: 'url(' + this.state.product.media + ')'}}>
				<section className="header-shadow">
					<h1>{this.state.product.name}</h1>
					<p>{this.state.product.description}</p>
					<section>
						{this.renderUpvoteButton()}
						<a href={this.state.product.link} target="_blank" className="getit-btn">GET IT</a>
					</section>
				</section>
			</header>
		);
	}

	renderBodyDiscussion() {
		return (
			<section className="discussion">
				<h2>Discussion</h2>
				<section className="post-comment">
					<img className="medium-avatar" src="/img/Tony.jpg"/>
					<input placeholder="What do you think of this product?" />
				</section>
				{this.renderComments()}
			</section>
		);
	}

	renderBody() {
		return (
			<section className="product-popup-body">
				<main>
					{this.renderBodyDiscussion()}
				</main>
			</section>
		);
	}

	renderComments() {
		return (
			<ul className="comment-list">
				{
					this.state.comments.map(function(comment, idx) {
						return (
							<li key={idx}>
								<img src={comment.avatar} className="medium-avatar"/>
								<section>
									<strong>{comment.name}</strong>
									<p>{comment.content}</p>
								</section>
							</li>
						);
					})
				}
			</ul>
		);
	}

	render() {
		return (
			<Popup {...this.props} style="product-popup">
				{this.renderHeader()}
				{this.renderBody()}
			</Popup>
		);

	}
}

export default ProductPopup;