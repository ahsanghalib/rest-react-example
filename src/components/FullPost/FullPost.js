import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {
	state = {
		selectedPost: null
	};

	// don't update state here
	componentDidUpdate() {
		if (this.props.id) {
			if (
				!this.state.selectedPost ||
				(this.state.selectedPost &&
					this.state.selectedPost.id !== this.props.id)
			) {
				Axios.get(
					'https://jsonplaceholder.typicode.com/posts/' +
						this.props.id
				).then(response => {
					this.setState({ selectedPost: response.data });
				});
			}
		}
	}

	deletePostHanlder = () => {
		Axios.delete('/posts/' +
		this.props.id)
			.then(response => {
				console.log(response);
			});
	}

	render() {
		let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
		if (this.props.id) {
			post = <p style={{ textAlign: 'center' }}>Loading... </p>;
		}
		if (this.state.selectedPost) {
			post = (
				<div className="FullPost">
					<h1>{this.state.selectedPost.title}</h1>
					<p>{this.state.selectedPost.body}</p>
					<div className="Edit">
						<button className="Delete" onClick={this.deletePostHanlder}>Delete</button>
					</div>
				</div>
			);
		}
		return post;
	}
}

export default FullPost;
