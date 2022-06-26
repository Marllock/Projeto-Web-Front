import '../styles/cardPost.scss'

function SearchPost({ post }) {
    if (post) {
        return (
            <div className="card-publi">
                <h1>{post.title}</h1>
                <p>{post.text}</p>
                <img src={post.path} alt="aeho" />
            </div>
        );
    }
}

export default SearchPost;