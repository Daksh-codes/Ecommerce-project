import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent: "center",
        flexDirection: "column",
        height: '70vh'
    }}>
        <h1>404 Error Page not Found</h1>
        <h3> Go back to <Link to='/'>Home page</Link></h3>
    </div>
  )
}

export default ErrorPage