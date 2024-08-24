import Header from '@/components/Header';
import { Metadata } from 'next';
import RegisterForm from './components/RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register bang hehe',
};

const Register = () => {
  return (
    <div className="container">
      <Header />
      <div className="flex items-center h-[90vh]">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
