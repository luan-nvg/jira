import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axiosDf from '../../api/axios';
import SS from '../util/SpinningCircle';
import Form from './Form';

interface Props {
  type: 'LOGIN' | 'REGISTER';
}

const Welcome = (props: Props) => {
  const isLogin = props.type === 'LOGIN';
  const {
    register,
    formState: { errors, isSubmitting: loading, isSubmitSuccessful: success },
    handleSubmit,
  } = useForm();
  const isLoading = loading && !success;

  return ( 
    <div className='bg-jira-gradient min-h-screen w-full h-fit p-24'> 
    <div className='flex justify-between items-center rounded-l-lg
    shadow-[0px_0px_22px_1px_rgba(0,0,0,0.75)
    [-webkit-box-shadow:_0px_0px_22px_1px_rgba(0,0,0,0.75)]
    [-moz-box-shadow:_0px_0px_22px_1px_rgba(0,0,0,0.75)]'
    >
      <div className='flex w-4/12 mx-auto max-w-[35rem] tracking-wide text-white'>
        <h1 className='text-center text-xl font-medium sm:text-2xl lg:text-4xl lg:font-semibold
        animate-scale'>
          The #1 software development tool used by agile teams
        </h1>
      </div>
      <div className={'w-5/12 p-6 flex justify-center bg-white rounded-r-lg'}>
        <div className='mb-12 w-11/12 py-20 max-w-[24rem]'>
          <div className={`h-[40vh] place-items-center ${isLoading ? 'grid' : 'hidden'}`}>
            <SS />
          </div>

          <div className={`w-full rounded-md bg-white ${isLoading ? 'hidden' : 'block'}`}>
            <h2 className='text-center text-3xl font-medium text-gray-800 animate-scale'>
              {isLogin ? 'Welcome back' : 'Get Started'}
            </h2>
            <h3 className='mb-5 text-center text-[15px] text-gray-600 animate-[scaleKey_1.5s_ease-in-out]'>Free for testing</h3>
            <Form
              type={isLogin ? 'LOGIN' : 'SIGNUP'}
              onSubmit={isLogin ? logIn : registerUser}
              {...{ errors, handleSubmit, register, loading }}
            />
            <div className='flex items-center'>
              <hr className='grow border-t-[.5px] border-gray-400' />
              <span className='my-3 block w-fit bg-white px-2 text-center'>OR</span>
              <hr className='grow border-t-[.5px] border-gray-400' />
            </div>
            <Link to={isLogin ? '/register' : '/login'}>
              <span className='block text-center text-blue-600 hover:underline'>
                {isLogin ? 'Join now' : 'Log In'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Welcome;

const logIn = async (body: FieldValues) => {
  const result = await axiosDf.post('auth/login', body);
  return result.data;
};

const registerUser = async (body: FieldValues) => {
  const result = await axiosDf.post('auth/register', body);
  return result.data;
};
