import { Metadata } from 'next';
import LoginForm from './components/LoginForm';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login bang hehe',
};

const Login = () => {
  return (
    <div className="container">
      <Header />
      <LoginForm />
    </div>
  );
};

export default Login;
