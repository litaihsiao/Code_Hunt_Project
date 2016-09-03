import React from 'react';
import Popup from './Popup';
import Actions from '../../actions';

class PostPopup extends React.Component {
    constructor() {
        super();
    }
    handlePost = () => {
        var newProduct = {
            name: this.refs.name.value,
            link: this.refs.link.value,
            description: this.refs.description.value,
            media: this.refs.media.value,
            upvote: 0,
            maker: {
                name: this.props.user.name,
                avatar: this.props.user.avatar
            }
        }
        Actions.addProduct(newProduct);
    };

    render() {
        return (
            <Popup {...this.props} style="post-popup" >
                <header className="post-header">Post a new product</header>
                <section>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td><input placeholder="Enter product's name" ref="name"/></td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td><input placeholder="Enter product's Description" ref="description"/></td>
                            </tr>
                            <tr>
                                <td>Link</td>
                                <td><input placeholder="http://www..." ref="link"/></td>
                            </tr>
                            <tr>
                                <td>Media</td>
                                <td><input placeholder="Paste a direct link to an image" ref="media"/></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <footer className="post-footer">
                    <button onClick={this.handlePost} className="post-btn">Hunt it!</button>
                </footer>
            </Popup>
        );
    }
}

export default PostPopup;