import { FC } from 'react'
import { ModalConst } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../app/slices/modalSlice'
import { AppStore } from '../@types'

const Navbar: FC = () => {
    const dispatch = useDispatch()
    const {isLoggedIn, email} = useSelector((state: AppStore) => state.user)

    const handleClick = (e: any) => {
        if (e.target.name == ModalConst.SIGNIN) {
            dispatch(openModal(ModalConst.SIGNIN))
        } 
        if (e.target.name == ModalConst.SIGNUP) {
            dispatch(openModal(ModalConst.SIGNUP))
        }
    }
  return (
    <nav className='py-5 grid grid-cols-2 bg-purple-600 text-white'>
        <div>
            <h1 className='ml-32 text-2xl font-cursive font-semibold italic'>DNS Manager</h1>
        </div>
        <div className='flex justify-end'>
            {!isLoggedIn ? <div>
                <ul className='mr-24 flex space-x-9'>
                    <li>
                        <button 
                        className='py-1 px-4 rounded-md bg-teal-500 font-semibold'
                        onClick={handleClick}
                        name={ModalConst.SIGNIN}
                        >
                            SignIn
                        </button>
                    </li>
                    <li>
                        <button 
                        className='py-1 px-4 rounded-md bg-teal-500 font-semibold'
                        onClick={handleClick}
                        name={ModalConst.SIGNUP}
                        >
                            SignUp
                        </button>
                    </li>
                </ul>
            </div> :
            <div className='flex items-center'>
                <span className='mr-40 font-semibold'>{email}</span>
            </div>
            }
        </div>
    </nav>
  )
}

export default Navbar