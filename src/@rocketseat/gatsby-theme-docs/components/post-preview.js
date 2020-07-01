import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"

const PostPreview = ({ hit }) => {
  return (
    <div>
      <div className="hit-title">
        <Link to={hit.slug} className="stretch-link">
          <Highlight hit={hit} attribute="headline" tagName="mark" />
        </Link>
        <div className="hit-category">
          {hit.title}
        </div>
      </div>
      <p>
        <Highlight hit={hit} attribute="excerpt" tagName="mark" />
      </p>
    </div>
  )
}

export default PostPreview
