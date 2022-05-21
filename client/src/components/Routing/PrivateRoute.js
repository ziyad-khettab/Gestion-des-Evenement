import { Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({
                          element: Element,
                          auth: { isAuthenticated, loading },
                          ...rest
                      }) => (
    <Route
        {...rest}
        render={() =>
            !isAuthenticated && !loading ? (
                <Navigate to='/login' />
            ) : (
                Element
            )
        }
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)