import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import LinkedStateMixin from 'react-addons-linked-state-mixin';
import './index.css';


class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      search: 'cats'
    }


  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.state.search}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        console.log(posts);
        this.setState({ posts });
      }).catch(function (error) {
        console.log(error);
      });
  }
  checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  handleChange(e) {
    this.state.search = e.target.value;
    this.componentDidMount();
  }

  render() {

    return (
      <div className='gallery_box'>
      <div className='searchField'>
      <input type='text' id='search'
      value={this.search} onChange={ this.handleChange.bind(this)} placeholder='Type subreddit'/>
      </div>
        <h1>Gallery {this.state.search}</h1>
        <ul>
          {this.state.posts.map(post =>
              <li key={post.id}>
                  <a href={'http://www.reddit.com/' + post.permalink}>  <img src={post.url}  title={post.title}/></a>
              </li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchData subreddit='cats'/>,
  document.getElementById('root')
);
