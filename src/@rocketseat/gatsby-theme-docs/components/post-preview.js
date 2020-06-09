import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"

const PostPreview = ({ hit }) => {
  return (
    <div>
      <h3>
        <Link style={{ boxShadow: `none` }} to={hit.slug}>
          <Highlight hit={hit} attribute="title" tagName="mark" />
          <Highlight hit={hit} attribute="headline" tagName="mark" />
        </Link>
      </h3>
      <p>
        <Highlight hit={hit} attribute="excerpt" tagName="mark" />
      </p>
    </div>
  )
}

export default PostPreview
