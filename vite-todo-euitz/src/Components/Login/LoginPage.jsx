
import LoginForm from './Login';
import SignupForm from './Signup';

function LoginPage() {
    return (
        <div className='ContainerAuth'>
            <LoginForm />
            <SignupForm />
        </div>
    );
}

export default LoginPage;
