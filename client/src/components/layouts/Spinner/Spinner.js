import { Fragment } from 'react'
import spinner from './spinner.gif'


const Spinner = () => (
  <Fragment>
    <div className='my-4'>
      <img
        src={spinner}
        style={{ width: '80px', margin: 'auto', display: 'block' }}
        alt='Loading...'
        />
    </div>
  </Fragment>
)

export default Spinner