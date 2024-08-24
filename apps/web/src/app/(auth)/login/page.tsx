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
      <div className="flex items-center h-[90vh]">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
