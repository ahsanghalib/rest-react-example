import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Axios from 'axios';

class Blog extends Component {
	state = {
		posts: [],
		selectedPostId: null,
		error: null
	};

	componentDidMount() {
		Axios.get('/posts')
			.then(response => {
				const posts = response.data.slice(0, 4);
				const updatedPosts = posts.map(post => {
					return {
						...post,
						author: 'Ahsan'
					};
				});
				this.setState({ posts: updatedPosts });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}

	postSelectedHanlder = id => {
		this.setState({ selectedPostId: id });
	};

	render() {
		let posts = (
			<p style={{ textAlign: 'center' }}>Something went wrong...!</p>
		);

		if (!this.state.error) {
			posts = this.state.posts.map(post => {
				return (
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						clicked={() => this.postSelectedHanlder(post.id)}
					/>
				);
			});
		}

		return (
			<div>
				<section className="Posts">{posts}</section>
				<section>
					<FullPost id={this.state.selectedPostId} />
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;
