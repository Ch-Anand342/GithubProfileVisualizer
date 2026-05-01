import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noData: 'NO_DATA',
}

const Repositories = () => {
  const [username, setUsername] = useState('')
  const [reposData, setReposData] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const history = useHistory()

  const fetchRepositories = async user => {
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const apiUrl = `https://apis2.ccbp.in/gpv/repos/${user}?api_key=REACT_APP_GITHUB_TOKEN=your_token_here`
      const response = await fetch(apiUrl)

      if (response.ok) {
        const data = await response.json()
        if (data.length === 0) {
          setApiStatus(apiStatusConstants.noData)
        } else {
          setReposData(data)
          setApiStatus(apiStatusConstants.success)
        }
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('githubUsername')
    if (storedUsername) {
      setUsername(storedUsername)
      fetchRepositories(storedUsername)
    } else {
      setApiStatus(apiStatusConstants.noData)
    }
  }, [])

  const handleTryAgain = () => {
    if (username) {
      fetchRepositories(username)
    }
  }

  const handleGoToHome = () => {
    history.push('/')
  }

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => (
    <div className="repos-content">
      <h1 className="page-title">Repositories</h1>
      <div className="user-info">
        <img
          src={reposData[0]?.owner?.avatar_url}
          alt={reposData[0]?.owner?.login}
          className="user-avatar"
        />
        <h2 className="user-name">{reposData[0]?.owner?.login}</h2>
      </div>
      <ul className="repos-list">
        {reposData.map(repo => (
          <li key={repo.id} className="repo-item">
            <Link to={`/repositories/${repo.name}`} className="repo-link">
              <div className="repo-content">
                <h3 className="repo-name">{repo.name}</h3>
                <p className="repo-description">
                  {repo.description || 'No description available'}
                </p>
                <div className="repo-stats">
                  <p className="repo-stat">⭐ {repo.stargazers_count}</p>
                  <p className="repo-stat">🍴 {repo.forks_count}</p>
                  <p className="repo-language">{repo.language || 'N/A'}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/demo/image/upload/v1/samples/failure-view"
        alt="failure view"
        role="img"
        className="failure-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button className="try-again-btn" onClick={handleTryAgain} type="button">
        Try Again
      </button>
    </div>
  )

  const renderNoRepositoriesView = () => (
    <div className="no-data-container">
      <img
        src="https://res.cloudinary.com/demo/image/upload/v1/samples/no-repositories"
        alt="no repositories"
        role="img"
        className="no-data-image"
      />
      <h2 className="no-data-title" role="heading">
        No Repositories Found
      </h2>
    </div>
  )

  const renderNoDataView = () => (
    <div className="no-data-container">
      <img
        src="https://res.cloudinary.com/demo/image/upload/v1/samples/empty-repositories"
        alt="empty repositories"
        role="img"
        className="no-data-image"
      />
      <h2 className="no-data-title" role="heading">
        No Data Found
      </h2>
      <p className="no-data-message">
        GitHub username is empty, please provide a valid username for
        Repositories
      </p>
      <button className="go-home-btn" onClick={handleGoToHome} type="button">
        Go to Home
      </button>
    </div>
  )

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        if (reposData && reposData.length === 0) {
          return renderNoRepositoriesView()
        }
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.noData:
        return renderNoDataView()
      default:
        return renderNoDataView()
    }
  }

  return (
    <div className="repositories">
      <div className="repositories-container">{renderContent()}</div>
    </div>
  )
}

export default Repositories
