import './index.css'

const FailureRender = () => (
  <div className="image-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-image"
    />
    <h1 className="ops-style">Oops! Something went wrong</h1>
    <p className="looking-for">
      We cannot seem to find the page you are looking for
    </p>
  </div>
)

export default FailureRender
